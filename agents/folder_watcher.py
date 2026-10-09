import time
import os
import threading
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

from scanner_agent import ScannerAgent

class AutoScanHandler(FileSystemEventHandler):
    def __init__(self, scanner, watch_dir):
        self.scanner = scanner
        self.watch_dir = watch_dir
        self._timer = None

    def on_modified(self, event):
        if not event.is_directory:
            self._trigger_scan()

    def on_created(self, event):
        if not event.is_directory:
            self._trigger_scan()
            
    def _trigger_scan(self):
        # 여러 파일이 동시에 변경될 때 중복 스캔 방지 (디바운스)
        if self._timer:
            self._timer.cancel()
        self._timer = threading.Timer(2.0, self._run_scan)
        self._timer.start()
        
    def _run_scan(self):
        print(f"[AutoWatcher] 폴더 내 파일 변경 감지. '{self.watch_dir}' 파이프라인(스캔->파싱->AI->DB) 자동 가동...")
        self.scanner.scan_directory(self.watch_dir)
        print(f"[AutoWatcher] 자동 파이프라인 처리 완료.")

def start_watching(directory_path, scanner=None):
    if not os.path.exists(directory_path):
        os.makedirs(directory_path)
    
    if scanner is None:
        scanner = ScannerAgent()
        
    event_handler = AutoScanHandler(scanner, directory_path)
    observer = Observer()
    observer.schedule(event_handler, directory_path, recursive=True)
    observer.start()
    print(f"[AutoWatcher] 백그라운드 자동 파이프라인 감시가 시작되었습니다: {directory_path}")
    return observer
