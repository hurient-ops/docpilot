import re
import diff_match_patch as dmp_module
from ai_agent import AIAgent

class DiffAgent:
    """
    3원화 다중 문서 라인 Diff 및 수치 변동 전용 비교 로직을 수행하는 에이전트.
    """
    def __init__(self):
        self.dmp = dmp_module.diff_match_patch()
        self.ai = AIAgent()

    def line_diff(self, text_a: str, text_b: str):
        """
        diff-match-patch를 활용하여 라인 단위 Diff(추가, 삭제, 수정)를 계산합니다.
        """
        # 줄 단위로 나누어 토큰화
        a, b, linearray = self.dmp.diff_linesToChars(text_a, text_b)
        diffs = self.dmp.diff_main(a, b, False)
        # 토큰을 다시 텍스트 줄로 변환
        self.dmp.diff_charsToLines(diffs, linearray)
        # 가독성 좋게 정리
        self.dmp.diff_cleanupSemantic(diffs)
        
        parsed_diff = []
        i = 0
        while i < len(diffs):
            op, data = diffs[i]
            if op == self.dmp.DIFF_DELETE and i + 1 < len(diffs) and diffs[i+1][0] == self.dmp.DIFF_INSERT:
                before_text = data.strip()
                after_text = diffs[i+1][1].strip()
                char_diffs = self.dmp.diff_main(before_text, after_text)
                self.dmp.diff_cleanupSemantic(char_diffs)
                
                fragments_before, fragments_after = [], []
                for cop, cdata in char_diffs:
                    if cop == self.dmp.DIFF_EQUAL:
                        fragments_before.append({"type": "equal", "text": cdata})
                        fragments_after.append({"type": "equal", "text": cdata})
                    elif cop == self.dmp.DIFF_DELETE:
                        fragments_before.append({"type": "removed", "text": cdata})
                    elif cop == self.dmp.DIFF_INSERT:
                        fragments_after.append({"type": "added", "text": cdata})
                        
                parsed_diff.append({"type": "modified", "before": before_text, "after": after_text, "fragments_before": fragments_before, "fragments_after": fragments_after})
                i += 2
            elif op == self.dmp.DIFF_INSERT and i + 1 < len(diffs) and diffs[i+1][0] == self.dmp.DIFF_DELETE:
                before_text = diffs[i+1][1].strip()
                after_text = data.strip()
                char_diffs = self.dmp.diff_main(before_text, after_text)
                self.dmp.diff_cleanupSemantic(char_diffs)
                
                fragments_before, fragments_after = [], []
                for cop, cdata in char_diffs:
                    if cop == self.dmp.DIFF_EQUAL:
                        fragments_before.append({"type": "equal", "text": cdata})
                        fragments_after.append({"type": "equal", "text": cdata})
                    elif cop == self.dmp.DIFF_DELETE:
                        fragments_before.append({"type": "removed", "text": cdata})
                    elif cop == self.dmp.DIFF_INSERT:
                        fragments_after.append({"type": "added", "text": cdata})
                        
                parsed_diff.append({"type": "modified", "before": before_text, "after": after_text, "fragments_before": fragments_before, "fragments_after": fragments_after})
                i += 2
            else:
                if op == self.dmp.DIFF_INSERT:
                    parsed_diff.append({"type": "added", "text": data.strip()})
                elif op == self.dmp.DIFF_DELETE:
                    parsed_diff.append({"type": "removed", "text": data.strip()})
                else:
                    parsed_diff.append({"type": "equal", "text": data.strip()})
                i += 1
                
        import difflib
        unpaired_removed = []
        unpaired_added = []
        for idx, item in enumerate(parsed_diff):
            if item["type"] == "removed":
                unpaired_removed.append((idx, item["text"]))
            elif item["type"] == "added":
                unpaired_added.append((idx, item["text"]))
                
        matched_removed = set()
        matched_added = set()
        
        for r_idx, r_text in unpaired_removed:
            if r_idx in matched_removed or not r_text.strip(): continue
            
            best_match = None
            best_score = 0.6
            
            for a_idx, a_text in unpaired_added:
                if a_idx in matched_added or not a_text.strip(): continue
                score = difflib.SequenceMatcher(None, r_text, a_text).ratio()
                if score > best_score:
                    best_score = score
                    best_match = a_idx
                    
            if best_match is not None:
                matched_removed.add(r_idx)
                matched_added.add(best_match)
                
                a_text = parsed_diff[best_match]["text"]
                char_diffs = self.dmp.diff_main(r_text, a_text)
                self.dmp.diff_cleanupSemantic(char_diffs)
                
                fragments_before, fragments_after = [], []
                for cop, cdata in char_diffs:
                    if cop == self.dmp.DIFF_EQUAL:
                        fragments_before.append({"type": "equal", "text": cdata})
                        fragments_after.append({"type": "equal", "text": cdata})
                    elif cop == self.dmp.DIFF_DELETE:
                        fragments_before.append({"type": "removed", "text": cdata})
                    elif cop == self.dmp.DIFF_INSERT:
                        fragments_after.append({"type": "added", "text": cdata})
                        
                parsed_diff[r_idx] = {
                    "type": "modified",
                    "before": r_text,
                    "after": a_text,
                    "fragments_before": fragments_before,
                    "fragments_after": fragments_after
                }
                
        final_diff = []
        for idx, item in enumerate(parsed_diff):
            if idx in matched_added:
                continue
            final_diff.append(item)
            
        return final_diff

    def detect_numerical_changes(self, text_a: str, text_b: str):
        """
        문서 내 수치(금액, 비율 등) 변동 전용 탭 데이터를 생성하기 위한 로직.
        간단한 정규식을 통해 수치가 포함된 문장이나 단락을 추출 후 비교.
        """
        # 금액(원, 달러), 기간(년, 분기), 개수(대), 데이터(Gbps) 등 패턴 매칭
        pattern = re.compile(r'(\d+(?:,\d+)*(?:\.\d+)?(?:억)?\s*(?:원|달러|%|만원|억원|년|분기|대|Gbps))')
        
        nums_a = pattern.findall(text_a)
        nums_b = pattern.findall(text_b)
        
        changes = []
        # PoC: 단순히 발견된 수치의 차이를 추출 (실제로는 같은 항목 매핑 로직 필요)
        for num_a, num_b in zip(nums_a, nums_b):
            if num_a != num_b:
                changes.append({"before": num_a, "after": num_b})
                
        # 리스트 길이가 다를 경우 추가/삭제된 수치 기록
        if len(nums_b) > len(nums_a):
            for n in nums_b[len(nums_a):]:
                changes.append({"before": None, "after": n})
        elif len(nums_a) > len(nums_b):
            for n in nums_a[len(nums_b):]:
                changes.append({"before": n, "after": None})
                
        return changes

    def generate_diff_report(self, text_a: str, text_b: str):
        """
        라인 Diff, 수치 변동 내역 및 종합 리포트 반환.
        text_a 또는 text_b가 'FILE_PATH:'로 시작하면 해당 실제 파일을 읽어옵니다.
        """
        import os
        
        def extract_text(input_text):
            if input_text.startswith("FILE_PATH:"):
                filepath = input_text.replace("FILE_PATH:", "").strip()
                if not os.path.exists(filepath):
                    return f"[파일을 찾을 수 없습니다: {filepath}]"
                    
                ext = filepath.lower().split('.')[-1]
                
                # Import parser_poc
                import sys
                backend_dir = os.path.join(os.path.dirname(__file__), '..', 'backend')
                if backend_dir not in sys.path:
                    sys.path.append(backend_dir)
                import parser_poc
                
                if ext in ['txt', 'md', 'json', 'csv']:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        return f.read()
                elif ext == 'docx':
                    res = parser_poc.parse_docx(filepath)
                    return res.get('text', '')
                elif ext == 'pdf':
                    res = parser_poc.parse_pdf(filepath)
                    return res.get('text', '')
                elif ext == 'pptx':
                    res = parser_poc.parse_pptx(filepath)
                    return res.get('text', '')
                elif ext == 'xlsx':
                    res = parser_poc.parse_xlsx(filepath)
                    return res.get('text', '')
                elif ext == 'hwpx':
                    res = parser_poc.parse_hwpx(filepath)
                    return res.get('text', '')
                elif ext == 'hwp':
                    # HWP OLE parsing
                    try:
                        import olefile
                        import zlib
                        import struct
                        f = olefile.OleFileIO(filepath)
                        dirs = f.listdir()
                        sections = [d for d in dirs if d[0] == 'BodyText']
                        text = ''
                        for sec in sections:
                            data = f.openstream(sec).read()
                            try:
                                decomp = zlib.decompress(data, -15)
                            except:
                                decomp = data
                            i = 0
                            while i < len(decomp):
                                header = struct.unpack_from('<I', decomp, i)[0]
                                tag = header & 0x3FF
                                size = (header >> 20) & 0xFFF
                                i += 4
                                if tag == 67:
                                    rec_data = decomp[i:i+size]
                                    j = 0
                                    while j < len(rec_data):
                                        if j + 2 > len(rec_data):
                                            break
                                        ch = struct.unpack_from('<H', rec_data, j)[0]
                                        if ch in (9, 10, 13):
                                            if ch == 13 or ch == 10:
                                                text += '\n'
                                            else:
                                                text += '\t'
                                            j += 2
                                        elif 1 <= ch <= 31:
                                            j += 18
                                        else:
                                            try:
                                                text += rec_data[j:j+2].decode('utf-16le')
                                            except:
                                                pass
                                            j += 2
                                i += size
                        return text
                    except Exception as e:
                        return f"[HWP 파싱 오류: {str(e)}]"
                else:
                    return f"[{ext.upper()} 지원되지 않는 파일 포맷]"
            return input_text
            
        real_text_a = extract_text(text_a)
        real_text_b = extract_text(text_b)

        line_diffs = self.line_diff(real_text_a, real_text_b)
        num_changes = self.detect_numerical_changes(real_text_a, real_text_b)
        
        # AI 의미론적 분석 수행 (AIAgent 호출)
        ai_analysis = self.ai.analyze_diff(real_text_a, real_text_b, num_changes)
        
        return {
            "executive_summary": ai_analysis.get("executive_summary", ""),
            "key_clauses": ai_analysis.get("key_clauses", []),
            "vector_drift": ai_analysis.get("vector_drift", {}),
            "risk_level": ai_analysis.get("risk_level", "Low"),
            "line_diff": line_diffs,
            "numerical_changes": num_changes,
            "status": "Success"
        }

if __name__ == "__main__":
    agent = DiffAgent()
    doc_a = "본 계약의 착수금은 100만원으로 한다.\n또한 개발 기간은 3개월로 지정한다."
    doc_b = "본 계약의 착수금은 150만원으로 한다.\n또한 개발 기간은 3개월로 지정하되 연장 가능하다.\n보안 규정을 엄수한다."
    
    print("[DiffAgent] 3원화 비교 로직 테스트 시작")
    report = agent.generate_diff_report(doc_a, doc_b)
    
    print("\n--- [1] 라인 Diff 결과 ---")
    for diff in report["line_diff"]:
        if diff["text"]:  # 빈 문자열 제외
            print(f"[{diff['type'].upper():^7}] {diff['text']}")
            
    print("\n--- [2] 수치 변동 탭 (Numerical Changes) ---")
    for change in report["numerical_changes"]:
        print(f"변경 전: {change['before']} -> 변경 후: {change['after']}")
