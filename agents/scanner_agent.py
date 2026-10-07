import os
import hashlib
from datetime import datetime
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import sys

# 상위 폴더인 docpilot/agents 안에서 실행될 수 있도록 경로 추가 처리
# 실제 모듈 연결은 환경에 맞게 조정 (여기서는 SQLite 연동 위주)
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
try:
    from db_agent import DocumentMetadata, Base
except ImportError:
    pass

class ScannerAgent:
    """
    디렉토리 재귀 스캔 및 SHA-256 해시 기반 증분 인덱싱(Incremental Indexing)을 담당하는 에이전트.
    """
    SUPPORTED_FORMATS = {'.pptx', '.xlsx', '.docx', '.hwp', '.hwpx', '.pdf'}

    def __init__(self, db_path="sqlite:///e:/projects/docpilot/agents/docpilot_meta.db", frontend_agent=None):
        self.engine = create_engine(db_path)
        # 테이블이 없으면 생성
        Base.metadata.create_all(self.engine)
        self.Session = sessionmaker(bind=self.engine)
        self.frontend_agent = frontend_agent

    def calculate_hash(self, file_path):
        """파일의 SHA-256 해시 계산"""
        sha256 = hashlib.sha256()
        try:
            with open(file_path, "rb") as f:
                for chunk in iter(lambda: f.read(4096), b""):
                    sha256.update(chunk)
            return sha256.hexdigest()
        except Exception as e:
            print(f"Hash error for {file_path}: {e}")
            return None

    def scan_directory(self, root_dir: str, is_local_only: bool = False):
        """
        주어진 디렉토리를 순회하며 신규 및 수정된 파일을 색인합니다.
        """
        session = self.Session()
        stats = {"added": 0, "updated": 0, "skipped": 0, "errors": 0, "files": []}

        if not os.path.exists(root_dir):
            print(f"[ScannerAgent] Directory not found: {root_dir}")
            return stats

        print(f"[ScannerAgent] Starting scan on: {root_dir}")

        # 전체 파일 수 계산 (진행바 표시용)
        all_files = []
        for dirpath, _, filenames in os.walk(root_dir):
            for filename in filenames:
                ext = os.path.splitext(filename)[1].lower()
                if ext in self.SUPPORTED_FORMATS:
                    all_files.append(os.path.join(dirpath, filename))
        
        total_files = len(all_files)

        for index, file_path in enumerate(all_files):
            filename = os.path.basename(file_path)
            ext = os.path.splitext(filename)[1].lower()

            # WS Progress 브로드캐스트
            if self.frontend_agent and total_files > 0:
                progress_pct = int(((index + 1) / total_files) * 100)
                self.frontend_agent.send_progress_update(
                    task_id="scan_dir",
                    progress=progress_pct,
                    status=f"스캐닝 중: {filename}"
                )
                
            # 파일 해시 계산
            file_hash = self.calculate_hash(file_path)
            if not file_hash:
                stats["errors"] += 1
                continue

            # DB에서 기존 파일 확인 (경로 기준)
            existing_doc = session.query(DocumentMetadata).filter_by(file_path=file_path).first()

            is_changed = False
            if existing_doc:
                # 파일 내용이 변경되었는지 해시로 비교
                if existing_doc.file_hash != file_hash:
                    existing_doc.file_hash = file_hash
                    existing_doc.updated_at = datetime.utcnow()
                    stats["updated"] += 1
                    stats["files"].append({"file_name": filename, "file_path": file_path})
                    print(f"  [UPDATE] {filename}")
                    is_changed = True
                else:
                    stats["skipped"] += 1
                    stats["files"].append({"file_name": filename, "file_path": file_path})
            else:
                # 신규 파일 추가
                new_doc = DocumentMetadata(
                    file_name=filename,
                    file_path=file_path,
                    file_hash=file_hash,
                    format=ext.replace('.', ''),
                    is_local_only=is_local_only
                )
                session.add(new_doc)
                session.commit() # Commit early to get ID if needed
                stats["added"] += 1
                stats["files"].append({"file_name": filename, "file_path": file_path})
                print(f"  [NEW] {filename}")
                is_changed = True

                # ==============================================================
                # Task 2: 자동화 릴레이 (Scanner -> Parser -> AI -> VectorDB)
                # ==============================================================
                if is_changed:
                    try:
                        # 1. 텍스트 추출 (현재는 PoC로 가짜 텍스트 생성)
                        # 실제로는 backend.parser_poc 의 함수를 사용해 추출
                        extracted_text = f"{filename} 문서의 본문 내용입니다."
                        
                        # 2. 임베딩 벡터 생성
                        from ai_agent import AIAgent
                        ai = AIAgent()
                        vector = ai.embed_text(extracted_text)
                        
                        # 3. LanceDB에 삽입 (SearchAgent를 통해)
                        from search_agent import SearchAgent
                        search_api = SearchAgent()
                        if search_api.is_ready and "doc_vectors" in search_api.db.list_tables():
                            table = search_api.db.open_table("doc_vectors")
                            # doc_vectors 스키마: id, vector, document_id, page_num, text
                            import uuid
                            chunk_id = str(uuid.uuid4())
                            
                            # LanceDB Insert
                            table.add([{
                                "id": chunk_id,
                                "vector": vector,
                                "document_id": file_path, # Using file path as ID for simplicity
                                "page_num": 1,
                                "text": extracted_text
                            }])
                            print(f"    -> [Pipeline] '{filename}' 벡터 변환 및 LanceDB 적재 완료.")
                            
                        # 4. GraphRAG 지식 그래프 추출 및 저장 (LightRAG 개념 도입)
                        from db_agent import GraphEntity, GraphRelation
                        
                        # AI 에이전트를 통한 엔티티 추출 시뮬레이션 (실제로는 LLM Prompt를 통해 JSON 반환)
                        # "엔티티1, 관계, 엔티티2" 형태
                        print(f"    -> [GraphRAG] '{filename}' 지식 엔티티 분석 중...")
                        mock_extracted_entities = [
                            {"name": "DocPilot", "type": "PRODUCT", "desc": "통합 문서 자동화 플랫폼"},
                            {"name": "오피스 병합", "type": "CONCEPT", "desc": "문서 조각 결합 알고리즘"}
                        ]
                        mock_relations = [
                            ("DocPilot", "SUPPORTS", "오피스 병합")
                        ]
                        
                        # 엔티티 DB 삽입 (Upsert)
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
                                
                        # 관계 DB 삽입
                        for src, rel, tgt in mock_relations:
                            if src in entity_ids and tgt in entity_ids:
                                new_rel = GraphRelation(
                                    source_entity_id=entity_ids[src],
                                    target_entity_id=entity_ids[tgt],
                                    relation_type=rel,
                                    document_id=new_doc.id if not existing_doc else existing_doc.id,
                                    evidence_text=extracted_text[:100]
                                )
                                session.add(new_rel)
                        session.commit()
                        print(f"    -> [GraphRAG] '{filename}' 지식 그래프 (엔티티/관계) 저장 완료.")
                        
                    except Exception as e:
                        print(f"    -> [Pipeline Error] {filename} 파이프라인 처리 중 에러: {e}")

        session.commit()
        session.close()
        
        print(f"[ScannerAgent] Scan complete: {stats}")
        return stats

if __name__ == "__main__":
    scanner = ScannerAgent()
    # 자체 디렉토리(루트) 스캔 PoC 테스트
    scanner.scan_directory("e:/projects/docpilot/doc")
