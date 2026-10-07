import os
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker
from datetime import datetime

# 1. SQLite Metadata Database Setup (SQLAlchemy)
Base = declarative_base()

class DocumentMetadata(Base):
    __tablename__ = 'documents'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    file_name = Column(String, nullable=False)
    file_path = Column(String, nullable=False, unique=True)
    file_hash = Column(String, nullable=False)  # For incremental indexing
    format = Column(String, nullable=False)     # pptx, docx, hwpx, pdf, xlsx
    is_local_only = Column(Boolean, default=False) # Security isolation flag
    total_pages = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class DocumentChunk(Base):
    __tablename__ = 'document_chunks'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    document_id = Column(Integer, ForeignKey('documents.id', ondelete="CASCADE"))
    chunk_index = Column(Integer, nullable=False)
    page_or_slide_num = Column(Integer)  # Physical location mapping
    content_text = Column(String, nullable=False)
    vector_id = Column(String)  # Maps to LanceDB vector ID

# GraphRAG Entities & Relations (Knowledge Graph)
class GraphEntity(Base):
    __tablename__ = 'graph_entities'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False, unique=True)
    entity_type = Column(String) # PERSON, ORG, CONCEPT, EVENT, etc.
    description = Column(String)

class GraphRelation(Base):
    __tablename__ = 'graph_relations'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    source_entity_id = Column(Integer, ForeignKey('graph_entities.id', ondelete="CASCADE"))
    target_entity_id = Column(Integer, ForeignKey('graph_entities.id', ondelete="CASCADE"))
    relation_type = Column(String, nullable=False) # e.g. "OWNED_BY", "RELATES_TO", "MENTIONED_IN"
    document_id = Column(Integer, ForeignKey('documents.id', ondelete="CASCADE"))
    evidence_text = Column(String)

class DatabaseAgent:
    """
    RDB(SQLite) 및 VectorDB(LanceDB) 연결 및 스키마 관리를 담당하는 에이전트.
    """
    def __init__(self, db_path="sqlite:///docpilot_meta.db", vector_dir="./lancedb_data"):
        self.engine = create_engine(db_path, echo=False)
        self.SessionLocal = sessionmaker(bind=self.engine)
        self.vector_dir = vector_dir
        
        # Initialize DB Schema
        Base.metadata.create_all(self.engine)
        
    def init_vector_db(self):
        """
        LanceDB 테이블 초기화 (PoC)
        실제 환경에서는 lancedb 라이브러리를 임포트하여 사용.
        """
        try:
            import lancedb
            import pyarrow as pa
            
            os.makedirs(self.vector_dir, exist_ok=True)
            db = lancedb.connect(self.vector_dir)
            
            # Define Vector Schema (id, vector(384/1024), text)
            schema = pa.schema([
                pa.field("id", pa.string()),
                pa.field("vector", pa.list_(pa.float32())),
                pa.field("document_id", pa.int32()),
                pa.field("page_num", pa.int32()),
                pa.field("text", pa.string())
            ])
            
            # Create table if not exists
            if "doc_vectors" not in db.list_tables():
                db.create_table("doc_vectors", schema=schema)
                return "LanceDB 'doc_vectors' table created."
            return "LanceDB 'doc_vectors' table already exists."
        except ImportError:
            return "lancedb or pyarrow not installed. Please install them to initialize Vector DB."

if __name__ == "__main__":
    db_agent = DatabaseAgent()
    print("SQLite Schema Initialized.")
    print("VectorDB Status:", db_agent.init_vector_db())
