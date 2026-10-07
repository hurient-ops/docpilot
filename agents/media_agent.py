import os
from PIL import Image

class MediaAgent:
    """
    멀티모달 미디어(이미지, 동영상 등) 비전 검색 처리를 담당하는 에이전트.
    SigLIP 기반으로 미디어의 시각적 특징과 자연어를 동일 차원에 임베딩합니다.
    """
    def __init__(self, use_int8=False):
        self.use_int8 = use_int8
        self.model_name = "google/siglip-base-patch16-224"
        self.is_loaded = False
        
        try:
            import torch
            from transformers import AutoProcessor, AutoModel
            
            print(f"[MediaAgent] {self.model_name} 로컬 비전 모델 로드 중...")
            self.device = "cuda" if torch.cuda.is_available() else "cpu"
            
            # 실제 모델 로드 (HuggingFace Transformers)
            self.processor = AutoProcessor.from_pretrained(self.model_name)
            self.model = AutoModel.from_pretrained(self.model_name).to(self.device)
            self.model.eval()
            self.is_loaded = True
            print(f"[MediaAgent] 모델 로드 완료 (Device: {self.device})")
            
        except ImportError:
            print("[MediaAgent] 경고: torch 또는 transformers가 설치되지 않았습니다. 더미 모드로 동작합니다.")
            self.is_loaded = False

    def extract_visual_embedding(self, image_path: str):
        """
        이미지에서 고차원 시각 특징 벡터(Dense Vector)를 추출하여 반환합니다.
        """
        if not os.path.exists(image_path):
            print(f"[MediaAgent] 오류: 이미지를 찾을 수 없습니다. ({image_path})")
            return None

        if not self.is_loaded:
            return [0.1] * 768

        try:
            import torch
            image = Image.open(image_path).convert("RGB")
            inputs = self.processor(images=image, return_tensors="pt").to(self.device)
            
            with torch.no_grad():
                image_features = self.model.get_image_features(**inputs)
                
            # 정규화 (Cosine Similarity를 위해)
            image_features = image_features / image_features.norm(p=2, dim=-1, keepdim=True)
            return image_features.squeeze().cpu().numpy().tolist()
            
        except Exception as e:
            print(f"[MediaAgent] 이미지 임베딩 추출 실패: {e}")
            return None

    def extract_text_embedding(self, text: str):
        """
        검색어 텍스트를 이미지와 동일한 임베딩 공간으로 투영합니다.
        """
        if not self.is_loaded:
            return [0.1] * 768
            
        try:
            import torch
            inputs = self.processor(text=[text], padding="max_length", return_tensors="pt").to(self.device)
            
            with torch.no_grad():
                text_features = self.model.get_text_features(**inputs)
                
            # 정규화
            text_features = text_features / text_features.norm(p=2, dim=-1, keepdim=True)
            return text_features.squeeze().cpu().numpy().tolist()
            
        except Exception as e:
            print(f"[MediaAgent] 텍스트 임베딩 추출 실패: {e}")
            return None

    def multimodal_search(self, text_query: str, target_dir: str, top_k=5):
        """
        지정된 폴더 내의 이미지들을 실시간으로 임베딩하여 자연어 쿼리와 유사도를 비교합니다.
        실무에서는 이 부분을 LanceDB 벡터DB 사전 색인 구조로 대체합니다.
        """
        import numpy as np
        
        print(f"[MediaAgent] 자연어 질의 '{text_query}' 에 대한 이미지 검색 시작")
        
        query_vec = self.extract_text_embedding(text_query)
        if not query_vec:
            return []
            
        results = []
        valid_exts = {".jpg", ".jpeg", ".png", ".bmp"}
        
        # 디렉토리 내 이미지 순회
        if os.path.exists(target_dir):
            for fname in os.listdir(target_dir):
                if os.path.splitext(fname)[1].lower() in valid_exts:
                    img_path = os.path.join(target_dir, fname)
                    img_vec = self.extract_visual_embedding(img_path)
                    
                    if img_vec:
                        # 코사인 유사도 계산 (이미 정규화되었으므로 내적 연산)
                        similarity = float(np.dot(query_vec, img_vec))
                        results.append({
                            "media_file": fname,
                            "path": img_path,
                            "similarity": round(similarity, 4),
                            "metadata": {"source": target_dir}
                        })
                        
        # 유사도 기준 내림차순 정렬 후 Top K 반환
        results.sort(key=lambda x: x["similarity"], reverse=True)
        return results[:top_k]

if __name__ == "__main__":
    agent = MediaAgent()
    
    test_img = "test_chart.png"
    # Create dummy image using PIL
    try:
        from PIL import ImageDraw
        img = Image.new('RGB', (224, 224), color = (73, 109, 137))
        d = ImageDraw.Draw(img)
        d.text((10,10), "Sample Chart", fill=(255,255,0))
        img.save(test_img)
    except:
        pass
        
    vec = agent.extract_visual_embedding(test_img)
    print(f"추출된 벡터 차원: {len(vec) if vec else 0}")
    
    results = agent.multimodal_search("우상향하는 파란색 차트", ".")
    for r in results:
        print(f"매칭 완료: {r['media_file']} (유사도: {r['similarity']})")
        
    if os.path.exists(test_img):
        os.remove(test_img)
