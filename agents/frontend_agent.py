import asyncio

class FrontendAgent:
    """
    Tauri 기반 프론트엔드 Web SPA와 백엔드 간의 IPC 및 WebSocket 통신을 담당하는 에이전트.
    """
    def __init__(self, ws_manager=None):
        self.ws_manager = ws_manager

    def send_progress_update(self, task_id: str, progress: int, status: str):
        """
        프론트엔드 UI의 실시간 WebSocket 진행바 업데이트(Progress Bar)를 전송합니다.
        """
        payload = {
            "type": "progress",
            "task_id": task_id,
            "progress": progress,
            "status": status
        }
        print(f"[FrontendAgent] UI 업데이트 전송: {payload}")
        if self.ws_manager:
            try:
                # FastAPI synchronous route context safe call
                loop = asyncio.get_event_loop()
                if loop.is_running():
                    loop.create_task(self.ws_manager.broadcast(payload))
                else:
                    asyncio.run(self.ws_manager.broadcast(payload))
            except Exception as e:
                print(f"[FrontendAgent] WS Broadcast Error: {e}")
        return payload

    def send_error_alert(self, error_msg: str, is_critical: bool = False):
        """
        파일 손상 또는 보안 격리 폴더 위반 등의 에러를 프론트엔드 토스트 알림으로 전송합니다.
        """
        print(f"[FrontendAgent] 에러 알림 전송 (Critical: {is_critical}): {error_msg}")
        return {"error": error_msg, "critical": is_critical}

if __name__ == "__main__":
    frontend = FrontendAgent()
    frontend.send_progress_update("idx_001", 45, "PDF 스캐닝 중...")
