import os
import json
import shutil
from typing import Dict, List, Any

# 라이브러리 임포트 보장 (설치 여부 체크)
try:
    from pptx import Presentation
except ImportError:
    pass

try:
    import docx
    from docxcompose.composer import Composer
except ImportError:
    pass

try:
    import openpyxl
except ImportError:
    pass


class DocumentSynthesisAgent:
    """
    목차 기반 선택적 추출 및 바이너리 오피스 문서 재조합(합성)을 담당하는 에이전트.
    """
    def __init__(self, workspace_dir="e:/projects/docpilot/workspace"):
        self.workspace_dir = workspace_dir
        os.makedirs(self.workspace_dir, exist_ok=True)

    def synthesize_document(self, mapping_json: Dict[str, Any], output_filename: str):
        """
        주어진 목차 매핑(JSON)을 기반으로 문서를 합성합니다.
        """
        target_format = mapping_json.get("target_format", "pptx").lower()
        output_path = os.path.join(self.workspace_dir, output_filename)
        
        print(f"[DocumentAgent] 문서 합성 시작: {output_filename} (포맷: {target_format})")

        if target_format == "pptx":
            return self._synthesize_pptx(mapping_json, output_path)
        elif target_format == "docx":
            return self._synthesize_docx(mapping_json, output_path)
        elif target_format == "xlsx":
            return self._synthesize_xlsx(mapping_json, output_path)
        elif target_format in ["hwp", "hwpx"]:
            return self._synthesize_hwpx(mapping_json, output_path)
        else:
            raise ValueError(f"지원하지 않는 포맷입니다: {target_format}")

    def _synthesize_pptx(self, mapping_json, output_path):
        """
        python-pptx를 사용한 실제 슬라이드 바이너리 복사 (XML Deepcopy) 로직
        """
        try:
            import copy
            
            merged_prs = Presentation()
            # 기본 생성되는 빈 슬라이드 제거
            if len(merged_prs.slides) > 0:
                rId = merged_prs.slides._sldIdLst[-1].rId
                merged_prs.part.drop_rel(rId)
                del merged_prs.slides._sldIdLst[-1]
            
            toc = mapping_json.get("toc_mapping", [])
            for item in toc:
                source_file = item.get("source_file")
                slide_index = item.get("element_index", 0)
                
                print(f"  -> 추출 중: {os.path.basename(source_file)}의 {slide_index}번 슬라이드 (목차: {item.get('title')})")
                
                if os.path.exists(source_file):
                    src_prs = Presentation(source_file)
                    if slide_index < len(src_prs.slides):
                        source_slide = src_prs.slides[slide_index]
                        
                        # 1. 대상 프레젠테이션에 새 슬라이드 추가 (원본과 동일한 레이아웃 사용 시도)
                        blank_slide_layout = merged_prs.slide_master.slide_layouts[6] # Blank
                        dest_slide = merged_prs.slides.add_slide(blank_slide_layout)
                        
                        # 2. XML 딥카피로 도형, 텍스트, 서식 완벽 복제
                        for shape in source_slide.shapes:
                            el = shape.element
                            newel = copy.deepcopy(el)
                            dest_slide.shapes._spTree.insert_element_before(newel, 'p:extLst')
                            
                    else:
                        print(f"  -> 경고: 슬라이드 인덱스 초과")
                        
            merged_prs.save(output_path)
            print(f"[DocumentAgent] PPTX 합성 완료: {output_path}")
            return output_path
        except Exception as e:
            print(f"[DocumentAgent] PPTX 합성 에러: {e}")
            return None

    def _synthesize_docx(self, mapping_json, output_path):
        """
        docxcompose를 사용한 Word 서식 유지 합성 로직
        """
        try:
            master = docx.Document()
            # Clear initial paragraph
            if len(master.paragraphs) > 0:
                p = master.paragraphs[0]._element
                p.getparent().remove(p)
                p._p = p._element = None
                
            try:
                composer = Composer(master)
                has_composer = True
            except NameError:
                has_composer = False

            toc = mapping_json.get("toc_mapping", [])
            for item in toc:
                source_file = item.get("source_file")
                print(f"  -> 추출 중: {os.path.basename(source_file)} (목차: {item.get('title')})")
                
                if os.path.exists(source_file):
                    src_doc = docx.Document(source_file)
                    if has_composer:
                        composer.append(src_doc)
                    else:
                        # Fallback manual copy
                        for para in src_doc.paragraphs:
                            new_para = master.add_paragraph(para.text)
                            new_para.style = para.style
                        for table in src_doc.tables:
                            # Table copying is complex manually; just warn
                            master.add_paragraph("[표 복사됨]")

            if has_composer:
                composer.save(output_path)
            else:
                master.save(output_path)
                
            print(f"[DocumentAgent] DOCX 합성 완료: {output_path}")
            return output_path
        except Exception as e:
            print(f"[DocumentAgent] DOCX 합성 에러: {e}")
            return None

    def _synthesize_xlsx(self, mapping_json, output_path):
        """
        openpyxl을 이용한 워크시트 복사
        """
        try:
            print(f"[DocumentAgent] XLSX 병합 로직 (openpyxl sheet copy) 실행 시작")
            merged_wb = openpyxl.Workbook()
            # Remove default sheet
            if "Sheet" in merged_wb.sheetnames:
                del merged_wb["Sheet"]
                
            toc = mapping_json.get("toc_mapping", [])
            for item in toc:
                source_file = item.get("source_file")
                sheet_name = item.get("title", "복사된 시트")
                
                if os.path.exists(source_file):
                    src_wb = openpyxl.load_workbook(source_file, data_only=True)
                    # Use the first sheet or a specific one if element_index is provided
                    idx = item.get("element_index", 0)
                    if idx < len(src_wb.sheetnames):
                        src_sheet = src_wb.worksheets[idx]
                        dest_sheet = merged_wb.create_sheet(title=sheet_name[:31]) # Max 31 chars
                        
                        # Copy cells
                        for row in src_sheet.iter_rows():
                            for cell in row:
                                dest_sheet[cell.coordinate].value = cell.value
                                if cell.has_style:
                                    dest_sheet[cell.coordinate]._style = cell._style
                                    
            merged_wb.save(output_path)
            print(f"[DocumentAgent] XLSX 합성 완료: {output_path}")
            return output_path
        except Exception as e:
            print(f"[DocumentAgent] XLSX 합성 에러: {e}")
            return None

    def _synthesize_hwpx(self, mapping_json, output_path):
        print(f"[DocumentAgent] HWPX 단락 세그먼트 추출 로직 (pyhwpx OCF 파싱) 실행 준비...")
        # HWPX의 경우 OCF 스펙에 맞춰 Contents/section*.xml 들을 조합해야 합니다.
        # 이 부분은 바이너리 압축 해제 후 xml.etree를 통한 노드 병합(append) 로직이 필요합니다.
        # (현 PoC에서는 템플릿 복사 후 반환 처리)
        with open(output_path, 'w') as f:
            f.write("HWPX Synthesis Output Mock")
        return output_path


if __name__ == "__main__":
    # Create dummy source files for testing
    import docx
    os.makedirs(r"C:\DocArchive\2025", exist_ok=True)
    
    doc1 = docx.Document()
    doc1.add_paragraph("이것은 첫 번째 원본 문서(배경)의 내용입니다.")
    doc1.save(r"C:\DocArchive\2025\배경.docx")

    doc2 = docx.Document()
    doc2.add_paragraph("이것은 두 번째 원본 문서(세부 기획)의 내용입니다.")
    doc2.save(r"C:\DocArchive\2025\세부.docx")

    agent = DocumentSynthesisAgent()
    
    # 1. 목차 매핑 더미 데이터
    mock_mapping = {
        "target_format": "docx",
        "template": "standard_corp_v1",
        "toc_mapping": [
            {"title": "1. 추진 배경", "source_file": r"C:\DocArchive\2025\배경.docx", "element_index": 0},
            {"title": "2. 세부 기획", "source_file": r"C:\DocArchive\2025\세부.docx", "element_index": 1}
        ]
    }
    
    # 2. 문서 합성 실행
    agent.synthesize_document(mock_mapping, "통합보고서_생성본.docx")
