import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
try:
    from db_agent import DatabaseAgent
except ImportError:
    pass

class SearchAgent:
    """
    하이브리드 검색(Dense Vector + Sparse) 및 물리적 위치(페이지/슬라이드) 추적을 담당하는 에이전트.
    """
    def __init__(self, vector_dir="e:/projects/docpilot/agents/lancedb_data"):
        self.vector_dir = vector_dir
        self.is_ready = False
        try:
            import lancedb
            self.db = lancedb.connect(self.vector_dir)
            self.is_ready = True
        except Exception as e:
            print(f"[SearchAgent] Warning: LanceDB not loaded - {e}")

    def hybrid_search(self, query: str, top_k: int = 5, ai_mode: str = "local"):
        """
        벡터 유사도 검색 및 위치 메타데이터(page_num 등)를 결합하여 반환합니다.
        보안 필터: ai_mode가 'cloud'일 경우 is_local_only=True인 문서는 검색에서 제외합니다.
        """
        print(f"[SearchAgent] 위치 추적형 하이브리드 검색 실행: '{query}' (Mode: {ai_mode})")
        
        # 1. 보안 필터링: 차단해야 할 문서 목록(file_path)을 SQLite에서 가져오기
        blocked_paths = set()
        if ai_mode == "cloud":
            try:
                from sqlalchemy import create_engine
                from sqlalchemy.orm import sessionmaker
                from db_agent import DocumentMetadata
                
                engine = create_engine("sqlite:///e:/projects/docpilot/agents/docpilot_meta.db")
                Session = sessionmaker(bind=engine)
                session = Session()
                
                # 로컬 전용 문서 목록 조회
                blocked_docs = session.query(DocumentMetadata).filter_by(is_local_only=True).all()
                blocked_paths = {doc.file_path for doc in blocked_docs}
                session.close()
                print(f"[SearchAgent] 보안 격리 작동: 클라우드 모드이므로 {len(blocked_paths)}개의 문서를 차단합니다.")
            except Exception as e:
                print(f"[SearchAgent] Security Filter Error: {e}")

        # LanceDB가 연결되었고 테이블이 있다면 실제 쿼리 실행
        if self.is_ready and "doc_vectors" in self.db.list_tables():
            # 실제로는 AIAgent의 embed_text(query) 결과를 넘겨야 함
            from ai_agent import AIAgent
            ai = AIAgent()
            query_vector = ai.embed_text(query)
            
            table = self.db.open_table("doc_vectors")
            try:
                # 2. Vector DB 조회 후 후처리 필터링 (Pre-filter 기능이 제한적일 경우 Post-filter 사용)
                raw_results = table.search(query_vector).limit(top_k * 2).to_list() # 넉넉히 가져옴
                
                # 3. [GraphRAG] 검색어 기반 연관 지식 그래프(Entity/Relation) 추출
                graph_context = ""
                try:
                    from sqlalchemy import create_engine
                    from sqlalchemy.orm import sessionmaker
                    from db_agent import GraphEntity, GraphRelation
                    
                    engine = create_engine("sqlite:///e:/projects/docpilot/agents/docpilot_meta.db")
                    Session = sessionmaker(bind=engine)
                    g_session = Session()
                    
                    # 쿼리에 포함된 단어와 일치하는 엔티티 검색 (간단한 LIKE)
                    search_words = query.split()
                    for word in search_words:
                        if len(word) > 1:
                            entities = g_session.query(GraphEntity).filter(GraphEntity.name.like(f"%{word}%")).all()
                            for ent in entities:
                                # 해당 엔티티와 관련된 관계(Edge)를 가져와 컨텍스트로 추가
                                rels = g_session.query(GraphRelation).filter(
                                    (GraphRelation.source_entity_id == ent.id) | (GraphRelation.target_entity_id == ent.id)
                                ).limit(3).all()
                                for r in rels:
                                    src_ent = g_session.query(GraphEntity).get(r.source_entity_id)
                                    tgt_ent = g_session.query(GraphEntity).get(r.target_entity_id)
                                    graph_context += f"[지식그래프] {src_ent.name} --({r.relation_type})--> {tgt_ent.name}\n"
                    g_session.close()
                except Exception as e:
                    print(f"[SearchAgent] GraphRAG 추출 오류: {e}")

                filtered_results = []
                for res in raw_results:
                    if ai_mode == "cloud" and res.get("document_id") in blocked_paths:
                        print(f"  [Security Blocked] {res.get('document_id')} (Local-only)")
                        continue
                    
                    snippet = res.get("text", "")[:100] + "..."
                    if graph_context:
                        snippet = f"<div class='text-xs text-brand-primary mb-1'>{graph_context}</div>" + snippet
                        
                    filtered_results.append({
                        "file_name": os.path.basename(res.get("document_id", "Unknown")),
                        "file_path": res.get("document_id"),
                        "location_badge": f"[페이지 {res.get('page_num', 1)}]",
                        "snippet": snippet,
                        "score": 1.0 - res.get("_distance", 0.0) # 코사인 유사도 점수화
                    })
                    if len(filtered_results) >= top_k:
                        break
                        
                if filtered_results:
                    return filtered_results
            except Exception as e:
                print(f"[SearchAgent] Vector search error: {e}")
                
        # Fallback PoC Mock Data (여기서도 필터링 로직 통과 시뮬레이션)
        mock_results = [
            {
                "file_name": "2025_사업계획서_최종.pptx",
                "file_path": "C:\\DocArchive\\2025\\2025_사업계획서_최종.pptx",
                "location_badge": "[12번째 슬라이드]",
                "snippet": "...따라서 이번 <mark>전략기획</mark>의 핵심은 비용 절감에 있습니다...",
                "score": 0.95
            },
            {
                "file_name": "보안_규정_가이드라인.hwpx",
                "file_path": "C:\\HQ_Legal\\보안_규정_가이드라인.hwpx",
                "location_badge": "[3페이지 2단락]",
                "snippet": "...망분리 환경 하에서 <mark>전략기획</mark> 데이터를 외부로 유출하는 것을 금합니다...",
                "score": 0.88
            }
        ]
        
        # 모의 데이터에 대해서도 보안 필터 적용 테스트
        final_mock = []
        for mr in mock_results:
            if ai_mode == "cloud" and mr["file_path"] in blocked_paths:
                continue
            final_mock.append(mr)
            
        return final_mock

if __name__ == "__main__":
    search_agent = SearchAgent()
    results = search_agent.hybrid_search("전략기획 핵심 가이드")
    for r in results:
        print(r)
