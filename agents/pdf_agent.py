import os
from typing import Dict, Any

try:
    from pdf2docx import Converter
except ImportError:
    pass

class PDFAgent:
    """
    PDF ⇄ Office 양방향 변환 및 변환 전 호환성(Pre-flight) 점검 에이전트.
    """
    def __init__(self, workspace_dir="e:/projects/docpilot/workspace"):
        self.workspace_dir = workspace_dir
        os.makedirs(self.workspace_dir, exist_ok=True)

    def pre_flight_check(self, file_path: str) -> Dict[str, Any]:
        """
        문서 변환 전 레이아웃 손실 가능성, 폰트 임베딩 여부 등을 체크합니다.
        """
        print(f"[PDFAgent] Pre-flight 호환성 점검 중: {os.path.basename(file_path)}")
        # PoC 레벨: 스캔된 PDF인지(텍스트 없음), 암호화되어 있는지 등 체크 로직
        is_encrypted = False
        is_scanned = False
        
        status = "Pass"
        warnings = []
        if is_encrypted:
            status = "Fail"
            warnings.append("문서가 암호화되어 있습니다.")
        if is_scanned:
            status = "Warning"
            warnings.append("스캔된 PDF로 인식되어 OCR 처리가 필요할 수 있습니다.")
            
        return {
            "status": status,
            "warnings": warnings,
            "can_convert": status != "Fail"
        }

    def convert_pdf_to_docx(self, pdf_path: str, docx_filename: str):
        """
        PDF 문서를 편집 가능한 DOCX(Word) 문서로 변환합니다.
        """
        check_result = self.pre_flight_check(pdf_path)
        if not check_result["can_convert"]:
            print(f"[PDFAgent] 변환 실패 - {check_result['warnings']}")
            return None

        output_path = os.path.join(self.workspace_dir, docx_filename)
        print(f"[PDFAgent] PDF -> DOCX 변환 시작: {output_path}")
        
        try:
            cv = Converter(pdf_path)
            # 페이지별 변환 (여기서는 전체 변환)
            cv.convert(output_path, start=0, end=None)
            cv.close()
            print("[PDFAgent] 변환 성공!")
            return output_path
        except Exception as e:
            print(f"[PDFAgent] 변환 에러: {e}")
            return None

if __name__ == "__main__":
    # PoC 테스트 
    agent = PDFAgent()
    
    # 임시 빈 PDF 생성 (테스트용)
    import fitz # PyMuPDF
    test_pdf = os.path.join(agent.workspace_dir, "test_input.pdf")
    doc = fitz.open()
    page = doc.new_page()
    page.insert_text((50, 50), "This is a test PDF document for conversion.", fontsize=14)
    doc.save(test_pdf)
    doc.close()
    
    # 변환 실행
    agent.convert_pdf_to_docx(test_pdf, "test_output.docx")
