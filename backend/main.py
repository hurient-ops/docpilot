from fastapi import FastAPI, UploadFile, File, Body, HTTPException, WebSocket, WebSocketDisconnect
import uvicorn
import os
import sys
import asyncio
from pydantic import BaseModel
from typing import Dict, Any, List

# agents 폴더를 파이썬 경로에 추가하여 모듈 임포트 가능하도록 설정
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'agents')))

from hardware_agent import HardwareAgent
from scanner_agent import ScannerAgent
from search_agent import SearchAgent
from document_agent import DocumentSynthesisAgent
from diff_agent import DiffAgent
from media_agent import MediaAgent
from pdf_agent import PDFAgent
from frontend_agent import FrontendAgent

app = FastAPI(
    title="DocPilot API",
    description="Backend API for Document parsing, synthesis, and AI processing",
    version="0.2.0"
)
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ----------------- WebSocket Manager -----------------
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception:
                pass

manager = ConnectionManager()

# 싱글톤 에이전트 인스턴스화
hw_agent = HardwareAgent()
frontend_agent = FrontendAgent(ws_manager=manager)
scanner_agent = ScannerAgent(frontend_agent=frontend_agent)
search_agent = SearchAgent()
doc_agent = DocumentSynthesisAgent()
diff_agent = DiffAgent()
media_agent = MediaAgent()
pdf_agent = PDFAgent()

# ----------------- Models -----------------

class ScanRequest(BaseModel):
    directory_path: str
    is_local_only: bool = False

class SearchQuery(BaseModel):
    query: str
    top_k: int = 5
    ai_mode: str = "local"

class DiffRequest(BaseModel):
    doc_a_text: str
    doc_b_text: str

class PDFConvertRequest(BaseModel):
    pdf_path: str
    output_docx_name: str

# ----------------- Routes -----------------

@app.get("/api/v1/browse")
def browse_directory(path: str = ""):
    import os
    if not path or path.strip() == "":
        # Default to showing drives on Windows
        if os.name == 'nt':
            import string
            from ctypes import windll
            drives = []
            bitmask = windll.kernel32.GetLogicalDrives()
            for letter in string.ascii_uppercase:
                if bitmask & 1:
                    drives.append(letter + ":\\")
                bitmask >>= 1
            return {"directories": drives, "current_path": "", "parent_path": ""}
        else:
            path = "/"
            
    try:
        # Ensure path uses correct separators
        path = os.path.abspath(path)
        if not os.path.isdir(path):
            return {"directories": [], "current_path": path, "error": "Not a directory"}
            
        directories = []
        for item in os.listdir(path):
            full_item = os.path.join(path, item)
            if os.path.isdir(full_item):
                directories.append(item)
                
        parent = os.path.dirname(path)
        if parent == path and os.name == 'nt':
            parent = ""
            
        return {"directories": sorted(directories), "current_path": path, "parent_path": parent}
    except Exception as e:
        return {"directories": [], "current_path": path, "error": str(e)}

@app.get("/")
def read_root():
    return {"status": "ok", "message": "DocPilot AI Orchestration Backend is running"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # We don't expect client to send much, just keep alive
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.get("/api/v1/system/hardware")
def get_hardware_specs():
    """하드웨어 사양을 진단하고 AI 구동 Tier를 반환합니다."""
    return hw_agent.detect_specs()

@app.post("/api/v1/scan")
def scan_directory(req: ScanRequest):
    """디렉토리를 스캔하고 증분 해시 비교를 통해 인덱싱합니다."""
    stats = scanner_agent.scan_directory(req.directory_path, req.is_local_only)
    return {"status": "success", "stats": stats}

@app.post("/api/v1/search/hybrid")
def hybrid_search(req: SearchQuery):
    """텍스트 기반 문서 문맥(위치 추적) 검색을 수행합니다."""
    results = search_agent.hybrid_search(req.query, req.top_k, req.ai_mode)
    return {"status": "success", "results": results}

@app.post("/api/v1/search/multimodal")
def multimodal_search(req: SearchQuery):
    """SigLIP-2 기반 이미지 비전 검색을 수행합니다."""
    results = media_agent.multimodal_search(req.query, req.top_k)
    return {"status": "success", "results": results}

@app.post("/api/v1/document/synthesize")
def synthesize_document(mapping_json: Dict[str, Any] = Body(...), output_filename: str = "merged_output.docx"):
    """여러 문서의 목차 조각을 하나로 병합(재조합)합니다."""
    try:
        out_path = doc_agent.synthesize_document(mapping_json, output_filename)
        if not out_path:
            raise HTTPException(status_code=500, detail="Document synthesis failed.")
        return {"status": "success", "output_path": out_path}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/v1/document/diff")
def compare_documents(req: DiffRequest):
    """3원화 다중 문서 라인 Diff 및 수치 변동 내역을 생성합니다."""
    report = diff_agent.generate_diff_report(req.doc_a_text, req.doc_b_text)
    return report

@app.post("/api/v1/pdf/convert")
def convert_pdf_to_office(req: PDFConvertRequest):
    """PDF를 DOCX 등 편집 가능한 오피스 문서로 양방향 변환합니다."""
    out_path = pdf_agent.convert_pdf_to_docx(req.pdf_path, req.output_docx_name)
    if not out_path:
        raise HTTPException(status_code=400, detail="PDF conversion failed or rejected during pre-flight check.")
    return {"status": "success", "output_path": out_path}

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
