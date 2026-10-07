import re
import diff_match_patch as dmp_module

class DiffAgent:
    """
    3원화 다중 문서 라인 Diff 및 수치 변동 전용 비교 로직을 수행하는 에이전트.
    """
    def __init__(self):
        self.dmp = dmp_module.diff_match_patch()

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
        for op, data in diffs:
            if op == self.dmp.DIFF_INSERT:
                parsed_diff.append({"type": "added", "text": data.strip()})
            elif op == self.dmp.DIFF_DELETE:
                parsed_diff.append({"type": "removed", "text": data.strip()})
            else:
                parsed_diff.append({"type": "equal", "text": data.strip()})
                
        return parsed_diff

    def detect_numerical_changes(self, text_a: str, text_b: str):
        """
        문서 내 수치(금액, 비율 등) 변동 전용 탭 데이터를 생성하기 위한 로직.
        간단한 정규식을 통해 수치가 포함된 문장이나 단락을 추출 후 비교.
        """
        # 금액(원, 달러) 및 퍼센트(%) 패턴 매칭
        pattern = re.compile(r'(\d{1,3}(?:,\d{3})*(?:\.\d+)?(?:원|달러|%|만원|억원))')
        
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
        라인 Diff, 수치 변동 내역 및 종합 리포트 반환
        """
        line_diffs = self.line_diff(text_a, text_b)
        num_changes = self.detect_numerical_changes(text_a, text_b)
        
        return {
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
