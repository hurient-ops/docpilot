import time
try:
    import win32com.client
except ImportError:
    print("[HWP Plugin] pywin32 패키지가 필요합니다. (pip install pywin32)")

class HwpAutomationPlugin:
    """
    한글(HWP/HWPX) 프로그램에 OLE Automation으로 붙어서 
    백엔드 AI 모듈(DocPilot)과 직접 통신하는 In-App Add-in 래퍼.
    """
    def __init__(self):
        self.hwp = None
        self.is_connected = False

    def connect(self):
        """현재 실행 중인 한글 프로그램에 연결하거나 새로 실행합니다."""
        try:
            # 한글 객체 생성 (이미 실행 중이면 가져옴)
            self.hwp = win32com.client.Dispatch("HWPFrame.HwpObject")
            # 보안 승인 창 억제 설정 (사전 레지스트리 등록 필요)
            self.hwp.RegisterModule("FilePathCheckDLL", "SecurityModule")
            self.hwp.XHwpWindows.Item(0).Visible = True
            self.is_connected = True
            print("[HWP Plugin] 한글 프로그램 연결 성공!")
        except Exception as e:
            print(f"[HWP Plugin] 한글 프로그램 연결 실패: {e}")

    def insert_ai_text(self, text: str):
        """현재 커서 위치에 AI가 생성한 텍스트를 즉시 삽입합니다."""
        if not self.is_connected:
            return
        
        act = self.hwp.CreateAction("InsertText")
        pset = act.CreateSet()
        act.GetDefault(pset)
        pset.SetItem("Text", text)
        act.Execute(pset)
        print("[HWP Plugin] AI 텍스트 삽입 완료.")

if __name__ == "__main__":
    plugin = HwpAutomationPlugin()
    plugin.connect()
    if plugin.is_connected:
        # FastAPI 백엔드 호출 대신 더미 작동 시뮬레이션
        print("[HWP Plugin] DocPilot 백엔드에서 텍스트 수신 중...")
        time.sleep(1)
        plugin.insert_ai_text("DocPilot AI가 한글 문서 커서 위치에 즉시 텍스트를 삽입합니다.\n(Pre-flight 검증 통과)")
