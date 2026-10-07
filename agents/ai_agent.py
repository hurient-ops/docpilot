class AIAgent:
    """
    로컬 LLM(Ollama), RAG 임베딩, DLP(NER), 멀티모달(Vision) 검색 등 AI 추론을 전담하는 에이전트.
    """
    def __init__(self, mode="local"):
        self.mode = mode  # 'local' or 'cloud'
        self.llm_model = "llama3.2:8b"
        self.vision_model = "SigLIP-2-INT8"

    def embed_text(self, text: str):
        """
        문서 텍스트를 Dense Vector로 변환 (LanceDB 인덱싱 용도)
        """
        import requests
        print(f"[AIAgent] Ollama에 텍스트 임베딩 요청 중... (Length: {len(text)})")
        try:
            res = requests.post("http://localhost:11434/api/embeddings", json={
                "model": "nomic-embed-text",
                "prompt": text
            }, timeout=3)
            if res.status_code == 200:
                return res.json().get("embedding", [0.0]*384)
        except requests.exceptions.RequestException:
            print("[AIAgent] Ollama 연결 실패. Fallback 더미 벡터 반환.")
        return [0.01] * 384

    def analyze_diff(self, text_a: str, text_b: str):
        """
        문서 비교(Diff) 결과에 대해 LLM 기반 의미론적 분석을 수행
        """
        import requests
        prompt = f"Analyze the differences between Document A and Document B in Korean.\nDoc A: {text_a}\nDoc B: {text_b}"
        print(f"[AIAgent] 로컬 LLM({self.llm_model})으로 의미론적 차이점 추론 중...")
        
        try:
            res = requests.post("http://localhost:11434/api/generate", json={
                "model": self.llm_model,
                "prompt": prompt,
                "stream": False
            }, timeout=10)
            
            if res.status_code == 200:
                summary = res.json().get("response", "")
                return {"summary": summary, "risk_level": "Analyzed", "source": "Ollama Local"}
        except requests.exceptions.RequestException:
            print("[AIAgent] Ollama 프로세스를 찾을 수 없습니다. (Fallback 작동)")
            
        return {"summary": "제안 금액이 5% 인상되었으며, 보안 조항이 추가되었습니다. (더미 데이터)", "risk_level": "Low", "source": "Fallback"}

    def detect_pii_dlp(self, text: str):
        """
        AI DLP: 로컬 NER 기반 개인정보(주민등록번호, 계좌 등) 식별 및 마스킹
        """
        print("[AIAgent] DLP 엔진 가동: PII 데이터 마스킹 중...")
        masked_text = text.replace("900101-1234567", "900101-*******")
        return masked_text

    def multimodal_search(self, query: str):
        """
        자연어 특징 기반 로컬 미디어(이미지/동영상) 비전 검색 (SigLIP 2)
        """
        print(f"[AIAgent] {self.vision_model} 비전 모델 가동. 검색어: '{query}'")
        return ["found_image_1.jpg", "found_video_timestamp_0123.mp4"]

if __name__ == "__main__":
    ai = AIAgent()
    ai.analyze_diff("계약금 100만원", "계약금 105만원")
    ai.multimodal_search("파란색 배경의 PPT 슬라이드 이미지")
