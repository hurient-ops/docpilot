import os
import hashlib
from datetime import datetime
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import sys
from concurrent.futures import ThreadPoolExecutor

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
try:
    from db_agent import DocumentMetadata, Base
except ImportError:
    pass

class ScannerAgent:
    SUPPORTED_FORMATS = {'.pptx', '.xlsx', '.docx', '.hwp', '.hwpx', '.pdf', '.ppt', '.xls', '.doc'}

    def __init__(self, db_path="sqlite:///e:/projects/docpilot/agents/docpilot_meta.db", frontend_agent=None):
        self.engine = create_engine(db_path)
        Base.metadata.create_all(self.engine)
        self.Session = sessionmaker(bind=self.engine)
        self.frontend_agent = frontend_agent
        self.executor = ThreadPoolExecutor(max_workers=4)

    def calculate_hash(self, file_path):
        sha256 = hashlib.sha256()
        try:
            with open(file_path, "rb") as f:
                for chunk in iter(lambda: f.read(4096), b""):
                    sha256.update(chunk)
            return sha256.hexdigest()
        except Exception as e:
            print(f"Hash error for {file_path}: {e}")
            return None

    def _process_ai_pipeline(self, file_path, filename, extracted_text, existing_doc_id=None, new_doc_id=None):
        doc_id = new_doc_id if new_doc_id else existing_doc_id
        session = self.Session()
        try:
            from ai_agent import AIAgent
            ai = AIAgent()
            vector = ai.embed_text(extracted_text)
            
            from search_agent import SearchAgent
            search_api = SearchAgent()
            if search_api.is_ready and "doc_vectors" in search_api.db.list_tables():
                table = search_api.db.open_table("doc_vectors")
                import uuid
                chunk_id = str(uuid.uuid4())
                table.add([{
                    "id": chunk_id,
                    "vector": vector,
                    "document_id": file_path,
                    "page_num": 1,
                    "text": extracted_text
                }])
                print(f"    -> [Pipeline] '{filename}' 벡터 변환 및 LanceDB 적재 완료.")
                
            from db_agent import GraphEntity, GraphRelation
            print(f"    -> [GraphRAG] '{filename}' 지식 엔티티 분석 중...")
            mock_extracted_entities = [
                {"name": "DocPilot", "type": "PRODUCT", "desc": "통합 문서 자동화 플랫폼"},
                {"name": "오피스 병합", "type": "CONCEPT", "desc": "문서 조각 결합 알고리즘"}
            ]
            mock_relations = [
                ("DocPilot", "SUPPORTS", "오피스 병합")
            ]
            
            entity_ids = {}
            for ent in mock_extracted_entities:
                existing = session.query(GraphEntity).filter_by(name=ent["name"]).first()
                if not existing:
                    new_ent = GraphEntity(name=ent["name"], entity_type=ent["type"], description=ent["desc"])
                    session.add(new_ent)
                    session.commit()
                    entity_ids[ent["name"]] = new_ent.id
                else:
                    entity_ids[ent["name"]] = existing.id
                    
            for src, rel, tgt in mock_relations:
                if src in entity_ids and tgt in entity_ids:
                    new_rel = GraphRelation(
                        source_entity_id=entity_ids[src],
                        target_entity_id=entity_ids[tgt],
                        relation_type=rel,
                        document_id=doc_id,
                        evidence_text=extracted_text[:100]
                    )
                    session.add(new_rel)
            session.commit()
            print(f"    -> [GraphRAG] '{filename}' 지식 그래프 (엔티티/관계) 저장 완료.")
        except Exception as e:
            print(f"    -> [Pipeline Error] {filename} 파이프라인 처리 중 에러: {e}")
        finally:
            session.close()

    def scan_directory(self, root_dir: str, is_local_only: bool = False):
        session = self.Session()
        stats = {"added": 0, "updated": 0, "skipped": 0, "errors": 0, "files": []}

        if not os.path.exists(root_dir):
            print(f"[ScannerAgent] Directory not found: {root_dir.encode('utf-8', 'replace').decode('utf-8', 'ignore')}")
            return stats

        print(f"[ScannerAgent] Starting scan on: {root_dir.encode('utf-8', 'replace').decode('utf-8', 'ignore')}")

        all_files = []
        for dirpath, _, filenames in os.walk(root_dir):
            for filename in filenames:
                ext = os.path.splitext(filename)[1].lower()
                if ext in self.SUPPORTED_FORMATS:
                    all_files.append(os.path.join(dirpath, filename))
        
        total_files = len(all_files)
        
        # 최적화 1: DB 일괄 조회
        existing_docs = {doc.file_path: doc for doc in session.query(DocumentMetadata).all()}

        for index, file_path in enumerate(all_files):
            filename = os.path.basename(file_path)
            ext = os.path.splitext(filename)[1].lower()

            if self.frontend_agent and total_files > 0:
                progress_pct = int(((index + 1) / total_files) * 100)
                # WebSocket 폭주/UI 프리징 방지를 위한 쓰로틀링: 50개마다 혹은 마지막에만 업데이트
                if index % 50 == 0 or index == total_files - 1:
                    self.frontend_agent.send_progress_update(
                        task_id="scan_dir",
                        progress=progress_pct,
                        status=f"스캐닝 중: {filename}"
                    )
                
            try:
                mtime = os.path.getmtime(file_path)
                fsize = os.path.getsize(file_path)
            except OSError:
                stats["errors"] += 1
                continue

            existing_doc = existing_docs.get(file_path)
            
            # 최적화 2: 수정 시간/크기로 해시 계산 생략
            if existing_doc and existing_doc.last_modified == mtime and existing_doc.file_size == fsize:
                stats["skipped"] += 1
                stats["files"].append({"file_name": filename, "file_path": file_path, "size": fsize, "extension": ext.replace(".", "")})
                continue
                
            file_hash = self.calculate_hash(file_path)
            if not file_hash:
                stats["errors"] += 1
                continue

            is_changed = False
            if existing_doc:
                if existing_doc.file_hash != file_hash:
                    existing_doc.file_hash = file_hash
                    existing_doc.updated_at = datetime.utcnow()
                    existing_doc.last_modified = mtime
                    existing_doc.file_size = fsize
                    stats["updated"] += 1
                    stats["files"].append({"file_name": filename, "file_path": file_path, "size": fsize, "extension": ext.replace(".", "")})
                    safe_filename = filename.encode('utf-8', 'replace').decode('utf-8', 'ignore')
                    print(f"  [UPDATE] {safe_filename}")
                    is_changed = True
                    doc_id = existing_doc.id
                else:
                    existing_doc.last_modified = mtime
                    existing_doc.file_size = fsize
                    stats["skipped"] += 1
                    stats["files"].append({"file_name": filename, "file_path": file_path, "size": fsize, "extension": ext.replace(".", "")})
            else:
                new_doc = DocumentMetadata(
                    file_name=filename,
                    file_path=file_path,
                    file_hash=file_hash,
                    format=ext.replace('.', ''),
                    is_local_only=is_local_only,
                    last_modified=mtime,
                    file_size=fsize
                )
                session.add(new_doc)
                session.commit()
                doc_id = new_doc.id
                stats["added"] += 1
                stats["files"].append({"file_name": filename, "file_path": file_path, "size": fsize, "extension": ext.replace(".", "")})
                safe_filename = filename.encode('utf-8', 'replace').decode('utf-8', 'ignore')
                print(f"  [NEW] {safe_filename}")
                is_changed = True

            if is_changed:
                try:
                    import parser_poc
                    parse_result = parser_poc.parse_document(file_path)
                    extracted_text = parse_result.get("text", "")
                    if not extracted_text or not extracted_text.strip():
                        extracted_text = f"{filename} 문서의 본문 내용입니다. (추출 실패 또는 내용 없음)"
                except Exception as e:
                    print(f"  [Parse Error] {e}")
                    extracted_text = f"{filename} 문서의 본문 내용입니다. (추출 오류)"
                
                # 최적화 3: 백그라운드 스레드로 AI 처리 위임
                self.executor.submit(
                    self._process_ai_pipeline,
                    file_path, filename, extracted_text, doc_id if existing_doc else None, doc_id if not existing_doc else None
                )

        session.commit()
        session.close()
        
        print(f"[ScannerAgent] Scan complete: {stats}")
        return stats

if __name__ == "__main__":
    scanner = ScannerAgent()
    scanner.scan_directory("e:/projects/docpilot/doc")
