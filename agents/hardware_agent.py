import psutil
import shutil
import platform
import subprocess

class HardwareAgent:
    """
    하드웨어 자동 진단 및 AI 구동 모드 스위칭을 담당하는 에이전트.
    """
    def __init__(self):
        self.os_info = platform.system()

    def get_cpu_info(self):
        return {
            "cores": psutil.cpu_count(logical=False),
            "logical_cores": psutil.cpu_count(logical=True),
            "usage_percent": psutil.cpu_percent(interval=1)
        }

    def get_ram_info(self):
        vm = psutil.virtual_memory()
        return {
            "total_gb": round(vm.total / (1024**3), 2),
            "available_gb": round(vm.available / (1024**3), 2),
            "percent_used": vm.percent
        }

    def get_gpu_info(self):
        """
        간단한 VRAM/GPU 체크 (nvidia-smi 기반 PoC)
        실제 상용에서는 pynvml 라이브러리를 사용 권장.
        """
        gpu_info = {"status": "not_found", "vram_gb": 0, "name": "Unknown"}
        try:
            # 윈도우 환경에서 nvidia-smi 호출
            result = subprocess.run(['nvidia-smi', '--query-gpu=name,memory.total', '--format=csv,noheader'], 
                                    capture_output=True, text=True)
            if result.returncode == 0:
                output = result.stdout.strip().split(',')
                if len(output) >= 2:
                    name = output[0].strip()
                    vram_mb = int(output[1].strip().replace(' MiB', ''))
                    gpu_info = {
                        "status": "found",
                        "name": name,
                        "vram_gb": round(vram_mb / 1024, 2)
                    }
        except FileNotFoundError:
            pass
        return gpu_info

    def diagnose_tier(self):
        ram = self.get_ram_info()["total_gb"]
        gpu = self.get_gpu_info()
        vram = gpu["vram_gb"]

        if vram >= 48:
            return "Server Tier (Enterprise)"
        elif vram >= 16:
            return "Pro Tier (High-End GPU)"
        elif vram >= 8:
            return "Standard Tier (Mid-End GPU)"
        else:
            return "Lite Tier (CPU Only)"

if __name__ == "__main__":
    agent = HardwareAgent()
    print("CPU Info:", agent.get_cpu_info())
    print("RAM Info:", agent.get_ram_info())
    print("GPU Info:", agent.get_gpu_info())
    print("Assigned Tier:", agent.diagnose_tier())
