# [개발계획서 v3] 로컬-클라우드 하이브리드 AI 기반 통합 문서·미디어 자동화 플랫폼 (DocPilot)

---

## 1. 프로젝트 개요 (Executive Summary)

### 1.1 추진 배경 및 목적
기업 및 기관 내에서 생산·유통되는 핵심 지식 자산은 MS 오피스(PPTX, XLSX, DOCX), 한글(HWP/HWPX), PDF 등 다양한 포맷으로 파편화되어 관리되고 있습니다. 특히 국내 실무 환경에서는 한글(HWP/HWPX) 포맷의 비중이 높고, 보고서나 제안서의 최종 유통 형태는 수정 불가능한 PDF로 저장되는 경우가 대다수입니다.

기존의 기성 생성형 AI 및 RAG 플랫폼(AnythingLLM, RAGFlow, Dify 등)은 다음과 같은 치명적인 실무 한계를 안고 있습니다:
1. **국내 필수 포맷(HWP/HWPX) 파싱 불가**: 해외 주도 플랫폼으로 한글 바이너리 문서에 대한 구조적 파싱을 지원하지 못함.
2. **실물 위치 추적 불능**: 문서를 단순 일정 길이(청크)로 분할하여 검색하므로 원본 파일의 정확한 물리적 위치(몇 페이지, 몇 번째 슬라이드, 무슨 시트)를 매핑하지 못함.
3. **오피스 바이너리 재조합 기능 부재**: 검색된 내용이나 제공된 목차에 맞춰 원본 서식을 유지한 채 실물 파일(.pptx, .docx, .hwpx)로 잘라내어 신규 파일로 정교하게 합성해 주는 엔진이 없음.
4. **PDF 자산의 재활용성 저해**: PDF 내 표, 서식, 레이아웃을 편집 가능한 오피스 객체로 양방향 변환하는 파이프라인 부재.
5. **독립 미디어 검색 결여**: 로컬 폴더 내 독립된 이미지 및 동영상 파일에서 자연어 특징 설명만으로 원하는 장면을 찾아내는 멀티모달 비전 검색 지원 미흡.
6. **개인정보 유출 위협, 서식 불일치 & 인덱싱 오버헤드**: PII 유출 우려, 단락 간 레이아웃 불일치 및 대용량 폴더 색인 시 전체 재인덱싱에 따른 자원 낭비 문제 존재.

본 프로젝트는 이러한 한계를 완벽히 극복하여 **5대 문서 포맷(PPT, Word, Excel, HWP, PDF)과 로컬 미디어(이미지/동영상)의 탐색, 위치 추적 검색, 목차 기반 선택 추출 및 바이너리 파일 합성, 다중 문서 Diff 비교(수치 변동 전용 탭 포함), PDF 양방향 변환, 멀티모달 미디어 검색, AI DLP 마스킹, 표준 템플릿 자동 매핑, In-App 플러그인, 하드웨어 진단 & 폴더별 보안 격리**를 단일 시스템에서 제공하는 **통합 AI 자동화 웹/데스크톱 플랫폼(DocPilot)** 구축을 목적으로 합니다.

### 1.2 핵심 비전 및 운영 아키텍처
* **100% 오프라인 프라이버시 보장 (Zero-Cloud Data Leakage)**: 단독 실행형 데스크톱 프로그램(Tauri v2) 기반으로 모든 AI 모델과 DB가 사용자 PC/사내 서버 내부에서 동작하는 **Local Enterprise Edition**을 제공합니다.
* **하이브리드 확장성 (Hybrid Switcher)**: 저사양 PC 사용자를 위해 클라우드 GPU AI 서버 및 클라우드 API를 연동할 수 있는 **Cloud SaaS Edition**을 동적으로 교체하는 하이브리드 아키텍처를 구현합니다.
* **폴더 단위 보안 격리 (`local_only` vs `cloud_allowed`)**: 민감 대외비 폴더는 클라우드 AI 모드 상태에서도 외부 전송을 소켓 수준에서 100% 차단합니다.

---

## 2. 시장 및 경쟁사 분석 & 초격차 핵심 기능 (Competitive Moat)

### 2.1 국내외 유사 솔루션 현황 분석

| 솔루션 명 | 주요 특징 | 본 프로젝트 대비 명확한 한계점 |
| :--- | :--- | :--- |
| **AnythingLLM** (Mintplex) | 데스크톱/Docker 기반 프라이빗 RAG 워크스페이스 | HWP/HWPX 파싱 불가, 물리적 페이지 위치 매핑 불능, 바이너리 문서 추출/합성 기능 전무 |
| **RAGFlow** (InfiniFlow) | DeepDoc 레이아웃 인지 파서 기반 Citation RAG | 높은 인프라 자원 요구, HWP 미지원, 목차 기반 오피스 바이너리 재조합/합성 기능 부재 |
| **Dify** (LangGenius) | 노드 기반 LLM 에이전트 오케스트레이션 플랫폼 | 계층적 디렉토리 스캔 및 바이너리 오피스 파일 조작, 로컬 멀티모달 이미지/동영상 벡터 인덱싱 결여 |
| **LightRAG** (HKUDS) | 지식 그래프(Knowledge Graph) 기반 교차 문서 RAG | 대화형 질의응답에 특화되어 있으며 실물 문서 편집/합성 및 미디어 검색 지원 안 됨 |
| **한컴 데이터 로더** | HWP/HWPX 문서 파싱 및 JSON 구조화 | 단순 전처리 파서 엔진으로, 대화형 RAG, 위치 추적, 문서 비교, 바이너리 재조합이 결합된 통합 플랫폼이 아님 |

### 2.2 본 프로젝트만의 12대 초격차 핵심 차별화 포인트

1. **HWP/HWPX 포함 5대 오피스 포맷 바이너리 완전 지원**
   * `pyhwp`, `pyhwpx`, `python-docx`, `python-pptx`, `openpyxl` 전용 파서를 결합하여, 한글 포맷을 포함한 5대 문서의 디렉토리 재귀 스캔, 메타데이터 수집, 계층 구조 파싱을 완벽히 수행합니다.
2. **가변 오피스 문서의 물리적 위치(페이지/슬라이드/시트) 정밀 매핑 (LibreOffice PDF 렌더링 표준)**
   * Word 문서의 `w:lastRenderedPageBreak` XML 태그 해석, HWP 단락 위치 정밀 계산 및 **LibreOffice Headless PDF 렌더링 물리 페이지 오차 교정**을 적용하여 원본 파일의 위치를 100% 정밀 매핑합니다.
3. **목차 기반 선택적 추출 및 원본 서식 유지 바이너리 파일 재조합 (Document Synthesis)**
   * 제공된 목차 명세(JSON)에 맞춰 원본 서식, 스타일, 레이아웃을 그대로 유지한 채 물리적 바이너리 객체(슬라이드, 단락, 시트)를 추출하여 **단일 신규 오피스 파일(.pptx, .docx, .hwpx)로 정교하게 합성**합니다.
4. **다중 문서 라인 Diff + 수치 변동 전용 탭 + 로컬 LLM 의미론적 차이점 분석**
   * `diff_match_patch` 기반 문단 라인 비교, **계약금/수치 변동 전용 비교 탭**, 로컬 LLM(`llama3.2`, `deepseek-r1`)의 문맥 분석을 결합하여 고차원 비교 리포트를 제공합니다.
5. **PDF ⇄ 5대 포맷 양방향 자유 변환 & Local OCR 엔진 연동 (Pre-flight 호환성 진단)**
   * 변환 전 사전 레이아웃 호환성을 진단하고 `pdf2docx`, `python-pptx`, `pyhwpx` 파이프라인으로 PDF를 오피스 객체로 복원하며, 스캔본은 **Local OCR(`RapidOCR` / `Tesseract`)**로 텍스트화합니다.
6. **🛡️ AI DLP & PII 개인정보 자동 마스킹**
   * 로컬 NER 모델 및 정규식을 통해 주민등록번호, 계좌번호, 대외비 문구를 자동 블라인드 처리하여 B2B 보안 승인 문턱 제거.
7. **🎨 기업 표준 템플릿 자동 매핑 엔진**
   * 서로 다른 원본의 추출 단락/슬라이드를 기업 전용 PPT/Word/HWP Master 템플릿(CI, 표준 폰트, 헤더/푸터)에 맞춰 자동 레이아웃 정렬.
8. **🕸️ GraphRAG 지식 그래프 기반 엔티티 복합 관계 추론**
   * 텍스트 벡터 검색과 더불어 인물, 기업, 금액, 조항 간의 지식 그래프(LightRAG)를 구축하여 고차원 교차 문서 추론 수행.
9. **📌 Document Lineage & Watermarking 출처 역방향 추적**
   * 합성 문서의 각 페이지/단락 구석에 원천 파일명 및 위치 메타 배지를 삽입하고, 클릭 시 원본 파일의 위치로 즉시 이동하는 역방향 추적권 확보.
10. **🔌 MS 오피스 & 한글 내장 In-App 플러그인 (Add-In)**
    * MS Office 및 아래한글 상단 리본 메뉴에 AI 통합 검색 & 재조합 탭을 내장하여 오피스 앱 내부에서 즉시 파이프라인 연동.
11. **⚙️ 하드웨어 자동 진단 (Auto-Diagnosis) & 등급별 사양 가이드 (Lite/Standard/Pro/Server)**
    * 앱 최초 가동 시 CPU, RAM, VRAM을 자동 진단하여 최적의 AI 구동 모델 및 인퍼런스 파라미터를 자동 설정.
12. **⚡ SHA-256 해시 기반 증분 인덱싱 (Incremental Indexing) & 폴더 보안 격리 (`local_only`)**
    * 수정되거나 신규 추가된 파일만 선택적으로 색인하여 처리 속도를 극대화하고, 암호/손상 파일은 에러 패널에 기록. 민감 폴더는 `local_only` 격리 적용.

---

## 3. 비즈니스 및 하이브리드 수익모델 전략 (Hybrid Business & Revenue Model)

글로벌 대표 소프트웨어 성공 사례(Adobe, MongoDB, GitLab)의 수익화 모델을 벤치마크하여, B2B 대기업/공공 시장과 B2C/SOHO 시장을 동시 공략하는 **이원화 GTM(Go-To-Market) 체계**를 구축합니다.

### 3.1 벤치마크 사례 적용
* **Adobe (CS → Creative Cloud)**: 영구 라이선스에서 구독형 SaaS로의 전면 전환을 통해 예측 가능한 ARR(연간 반복 매출)을 확립한 모델 적용.
* **MongoDB (Enterprise + Atlas SaaS)**: 보안 폐쇄망 대기업을 위한 **On-Premise Enterprise** 라이선스와 일반 사용자를 위한 사용량 기반(Consumption-based) **Cloud SaaS**를 병행 운용.
* **GitLab (PLG & Risk Transfer)**: 핵심 기초 기능은 무료 배포(Community Edition)로 사용자를 확보하고, 보안·컴플라이언스 및 위험 이관(Risk Transfer) 기능은 유료 Enterprise 및 SaaS 구독으로 전환.

### 3.2 4-Tier 요금 체계 명세 (4-Tier Pricing Structure)

| 구분 | Local Free (Community) | Local Desktop Pro | Cloud SaaS Pro | Enterprise Hybrid |
| :--- | :--- | :--- | :--- | :--- |
| **주요 대상** | 개인, 학생, 탐색 사용자 | 프리랜서, 전문직, 소호 | 저사양 PC 사용자, 일반 기업 | 대기업, 공공기관, 금융사 |
| **AI 구동 방식** | 로컬 CPU/GPU 100% | 로컬 CPU/GPU 100% | 클라우드 GPU Server / API | 하이브리드 (로컬 + 사내 Private Server) |
| **문서/미디어 용량** | 최대 100개 / 1GB | 무제한 (로컬 자원 한도) | 월 1,000p 기본 + 사용량 종량제 | 맞춤형 무제한 슬롯 |
| **핵심 제공 기능** | 디렉토리 분석, 기본 검색 | 12대 기능 전체, PDF 변환 | 12대 기능 + 고성능 AI, 크레딧 충전 | 12대 기능 + 커스텀 보안, 노드락, SLA, DRM 연동 |
| **과금 체계** | 무료 (Free) | 연간 노드락 라이선스 | 월/연간 구독료 + Metered Billing | 연간 B2B 계약 + Risk Transfer 유지보수 |

### 3.3 3대 B2B 상용화 & 초격차 GTM 전략
1. **🏆 GS인증 1등급 & 공공/폐쇄망 NUC/서버 턴키 패키지**: 인터넷 완전 차단 폐쇄망 전용 턴키 패키지 및 Docker 인스톨러를 제공하여 조달청 제3자 단가 계약 등록 및 공공/국방 우선 구매 시장 석권.
2. **🧩 HWP 파서 & PDF 변환 B2B REST API / SDK 상품화**: 원천 파싱/변환 엔진을 모듈화하여 타 ERP/그룹웨어/CRM 개발사에 제공함으로써 지속적인 기술 라이선스 로열티 창출.
3. **🤝 기업용 문서 DRM(Fasoo, MarkAny, SoftCamp) 연동 파트너십**: 암호화 문서의 복호화 권한을 가진 로컬 보안 영역에서 원활하게 파싱 및 인덱싱을 수행하여 대기업 도입 문턱 완벽 제거.

---

## 4. 12대 핵심 기능 요구사항 명세 (Functional Requirements)

### FR-01: 다중 문서 스캔 & 디렉토리 메타데이터 대시보드
* 지정된 폴더 및 하위 폴더를 재귀적(`pathlib`, `os.walk`)으로 탐색하고, SHA-256 해시 비교 기반 **증분 인덱싱(Incremental Indexing)**을 구동합니다.
* PPTX, XLSX, DOCX, HWP/HWPX, PDF 5대 포맷별 동적 선택 필터를 제공합니다.
* 포맷별 파일 수량, 총 용량, 작성자, 슬라이드/시트/페이지 수 통계를 디렉토리 트리를 통해 대시보드 시각화하며, 암호/손상 파일은 접이식 에러 목록 패널에 표기합니다.

### FR-02: 위치 추적형 하이브리드 검색 & 분할 미리보기 (Location-Aware Search & Split-Pane Preview)
* 키워드, 제목, 문맥 묘사를 입력받아 **Dense Vector(LanceDB) + Sparse BM25 + Cross-Encoder Reranker + GraphRAG** 하이브리드 파이프라인을 구동합니다.
* 검색 결과 카드에 **정확한 파일 경로, 물리적 위치 배지([X페이지 / Y번째 슬라이드 / Z시트]), 하이라이팅 문맥 스니펫**을 실시간 매핑합니다.
* 우측 **분할 미리보기 패널(Split-Pane Preview)**을 통해 선택 페이지의 고화질 렌더링 이미지 및 전후 페이지 이동(`<`, `>`)을 원본 프로그램 실행 없이 즉시 제공합니다.

### FR-03: 목차 기반 선택적 추출 & 오피스 바이너리 재조합 (Document Synthesis)
* 사용자가 제공한 목차와 원본 문서 페이지 매핑 명세(JSON)를 수신합니다.
* `python-pptx`(슬라이드 복사), `docxcompose`(Word 서식 유지 합성), `pyhwpx`(HWP 단락 세그먼트 복사), `openpyxl`(시트/셀 복사)을 호출합니다.
* **기업 표준 템플릿 매핑 엔진**을 적용해 CI 및 표준 글꼴로 자동 재정렬 후 **단일 신규 파일(.pptx, .docx, .hwpx, .xlsx)을 생성**합니다.

### FR-04: 다중 문서 라인 Diff, 수치 변동 탭 & LLM 의미론적 차이점 분석
* 2개 이상의 문서(계약서, 제안서 등)의 텍스트, 표, 구조를 추출하고 정규화합니다.
* **3원화 비교 뷰어**: ① AI 종합 문맥 요약, ② Side-by-Side 라인 Diff(추가/삭제/수정), ③ **표·수치 변경 전용 탭(Numerical Change Tab)**을 제공합니다.
* 로컬 LLM(`llama3.2`, `deepseek-r1`) 또는 클라우드 LLM을 호출하여 조항 변동, 수치 인상/인하 등 **의미론적 영향력을 분석한 종합 비교 리포트**를 생성합니다.

### FR-05: 로컬 미디어(이미지/동영상) 시각-언어 자연어 특징 검색
* 로컬 폴더 내 이미지(.jpg, .png) 및 동영상 파일의 프레임을 주기적으로 스캔합니다.
* OpenVINO INT8 양자화가 적용된 Google **`SigLIP 2` 및 한국어 특화 `KoCLIP`** 비전 모델을 사용하여 자연어 문장을 벡터 공간으로 투영합니다.
* k-NN 코사인 유사도 검색을 통해 부합하는 이미지 및 **동영상 타임스탬프 구간(예: 01:23 ~ 01:45)**을 갤러리 형태로 출력합니다.

### FR-06: 하드웨어 자동 진단 & AI 구동 모드 스위처 (Hardware Diagnostic & Mode Switcher)
* 앱 시작 시 CPU 코어, RAM, VRAM을 자동 진단하여 사양 등급(Lite/Standard/Pro/Server)을 추천 및 자동 설정합니다.
* UI 상단에 **🟢 로컬 AI 모드** (100% 보안, Air-Gapped) ↔ **☁️ 클라우드 AI 모드** (고성능 GPU 클라우드) 토글 스위치를 제공하여 동작 모드를 즉시 교체합니다.

### FR-07: PDF ⇄ 5대 포맷 양방향 변환 & Local OCR 파이프라인 (Pre-flight Check)
* 변환 전 레이아웃 및 스캔본 복잡도를 평가하는 **사전 호환성 진단(Pre-flight Check)**을 수행합니다.
* `pdf2docx`, `python-pptx`, `pyhwpx` 파이프라인으로 PDF를 오피스 객체로 복원하며, 스캔본은 **Local OCR(`RapidOCR` / `Tesseract`)**로 텍스트화합니다.

### FR-08: AI DLP & PII 개인정보 자동 마스킹
* 문서 수집 및 색인 시 로컬 NER 모델과 정규식 기반 알고리즘을 구동합니다.
* 주민등록번호, 계좌번호, 전화번호, 이메일, 대외비 문구를 자동 탐지하여 블라인드/마스킹 처리합니다.

### FR-09: Document Lineage & Watermarking 출처 역방향 추적
* 합성 문서의 개별 페이지 및 단락에 원천 파일명 및 페이지 위치 메타 배지를 자동 기록합니다.
* 결과물 내에서 출처 클릭 시 원본 파일의 해당 물리적 위치로 역방향 이동하는 추적권을 제공합니다.

### FR-10: MS 오피스 & 한글 내장 In-App 플러그인
* MS Word, PowerPoint 및 아래한글(HWP) 상단 리본 메뉴에 'AI 통합 검색' 탭을 플러그인으로 내장합니다.
* 편집 도중 앱 내 사이드바 팝업을 통해 이전 문서 검색, 파싱 및 단락/표 즉시 삽입을 실행합니다.

### FR-11: 폴더별 보안 격리 정책 (`local_only` vs `cloud_allowed`)
* 폴더 설정에서 민감 폴더에 `local_only` 태그를 부여하여, 클라우드 AI 모드가 활성화되어 있더라도 해당 폴더의 파일은 외부 네트워크 전송을 100% 차단합니다.

### FR-12: 작업 내역 로그 & 비동기 일시정지/재개 (Job History & Pause/Resume)
* 색인 작업 중 **실시간 WebSocket 진행바**와 함께 **일시정지/재개(Pause/Resume)** 기능을 제공하며, 완료된 모든 합성/변환/색인 이력을 **작업 내역(Job History)** 패널에서 관리합니다.

---

## 5. 시스템 아키텍처 및 기술 스택 (System Architecture)

### 5.1 전체 시스템 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 [Tauri v2 Desktop App Shell / Responsive Web SPA]           │
│    React 18 + Vite + TailwindCSS + Lucide + MS Office/Hancom Ribbon Add-In │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ (IPC / HTTP WebSocket API)
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                    [Python Embedded Sidecar Engine]                         │
│  ┌───────────────────────┐ ┌───────────────────────┐ ┌───────────────────┐  │
│  │ Office & PDF Parsers  │ │  Binary Synthesizer   │ │ Bidirectional PDF │  │
│  │ (pyhwpx, python-docx, │ │ (docxcompose, pyhwpx, │ │ Converter & OCR   │  │
│  │  LibreOffice PDF Rndr)│ │  Smart Template Mpr)  │ │ (pdf2docx, OCR)   │  │
│  └───────────────────────┘ └───────────────────────┘ └───────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ Local AI Engine: OpenVINO INT8 SigLIP 2/KoCLIP + Ollama + GraphRAG    │  │
│  │ Security Engine: AI DLP / PII Masking + Folder Isolation (local_only) │  │
│  │ Index Engine: Incremental SHA-256 Hash Scanner + Task Queue Worker    │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ (Local Storage)
┌──────────────────────────────────────▼──────────────────────────────────────┐
│  Embedded LanceDB (Vector) + LightRAG (Graph) + SQLite + System Storage     │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 상세 기술 스택 명세 (Tech Stack Specifications)

* **Desktop Shell & Web Frontend**: Tauri v2, React 18, Vite, TailwindCSS, Lucide Icons, MS Office / Hancom C# VSTO & JS Add-In
* **Backend API & Async Engine**: Python FastAPI, Uvicorn, Celery / asyncio worker (WebSocket 진행률 통신)
* **Document Parsing & Synthesis Engine**:
  * PowerPoint: `python-pptx`
  * Excel: `openpyxl`
  * Word: `python-docx`, `docx2python`, `docxcompose`, LibreOffice Headless (렌더링 오차 교정)
  * Hancom HWP/HWPX: `pyhwp`, `pyhwpx`
  * PDF & OCR: `pypdf`, `pdfplumber`, `pdf2docx`, `RapidOCR`, `Tesseract`
* **AI & Security Engine**:
  * Local LLM Engine: `Ollama` (`llama3.2:3b/8b`, `deepseek-r1:7b`)
  * Text Embeddings & Graph: `nomic-embed-text`, `bge-m3`, `LightRAG` (지식 그래프)
  * Multimodal Vision: Google `SigLIP 2` (ViT-B/L), `KoCLIP` (KLUE RoBERTa + ViT)
  * Reranker: `bge-reranker-large`
  * Security & DLP: Local SpaCy NER + Regex PII Engine + `local_only` Firewall Guard
  * Acceleration: Intel OpenVINO NNCF INT8 Quantization, PyTorch
* **Embedded Database & Storage**:
  * Vector Database: `LanceDB` (Serverless, File-based Embedded Vector DB)
  * Metadata Database: `SQLite` / `SQLAlchemy` (FTS5 키워드 인덱스 병행)

### 5.3 하드웨어 등급별 자동 진단 및 가변 제어 매트릭스 (Hardware Auto-Diagnostic Matrix)

| 구분 | Lite Tier (CPU Only) | Standard Tier (Mid-End GPU) | Pro Tier (High-End GPU) | Server Tier (Enterprise) |
| :--- | :--- | :--- | :--- | :--- |
| **사양 가이드** | CPU Only, RAM 16GB | VRAM 8~12GB (RTX 3060/4060) | VRAM 16~24GB (RTX 3090/4090) | VRAM 48GB+ / Multi-GPU Server |
| **로컬 LLM** | `llama3.2:1b` / `qwen2.5:3b` (Q4) | `llama3.2:8b` / `deepseek-r1:7b` (Q4) | `llama3.1:14b~32b` | `llama3.1:70b` / `deepseek-r1:32b` |
| **멀티모달 모델**| SigLIP 2 ViT-B (OpenVINO INT8) | SigLIP 2 ViT-L (FP16 GPU) | SigLIP 2 ViT-So400m (FP32 GPU) | SigLIP 2 / KoCLIP Full Batch |
| **인덱싱 처리** | 단일 스레드 증분 인덱싱 | Multi-Worker Celery (4 Workers) | GPU-Accelerated Batch | High-Throughput Multi-Node |

---

## 6. 단계별 구축 및 출시 로드맵 (Implementation Roadmap)

```
[Phase 0: 설계 & PoC] ──► [Phase 1: MVP 구현] ──► [Phase 2: 업무 기능] ──► [Phase 3: 확장 & 출시]
  • 파서 5종 위치 검증     • 스캐너, 증분 인덱스    • 목차 바이너리 병합     • 미디어 검색, PDF 변환
  • 하드웨어 진단 PoC      • 위치추적 검색 UI       • 3원화 Diff 비교        • In-App Add-In, Tauri 패키징
```

### Phase 0 (Month 1): 설계, PoC & 위치 정밀도 확정
* 5대 포맷 파서 파이프라인 검증 및 LibreOffice PDF 렌더링 기준 위치 오차 교정.
* 하드웨어 자동 진단 모듈 및 백엔드 스키마(SQLite + LanceDB) 설계.

### Phase 1 (Month 2): 디렉토리 증분 스캐너, 위치추적 검색 & MVP 구축
* SHA-256 해시 기반 증분 인덱서 및 `local_only` 보안 격리 로직 구현.
* 위치추적 하이브리드 검색 및 우측 분할 미리보기(Split-Pane Preview) UI 완성.

### Phase 2 (Month 3): 오피스 바이너리 재조합 & 3원화 Diff 비교 엔진 구현
* 목차 명세 기반 오피스 바이너리 재조합 및 기업 표준 템플릿 매핑 모듈 완성.
* 3원화 문서 비교(AI 요약 / 라인 Diff / **수치 변동 전용 탭**) 및 리포트 생성기 개발.

### Phase 3 (Month 4): 멀티모달 미디어 검색, PDF 양방향 변환, Add-In & 상용화 패키징
* OpenVINO INT8 SigLIP 2 / KoCLIP 비전 검색 및 PDF ⇄ 오피스 양방향 변환(Pre-flight 호환성 점검) 완성.
* MS 오피스/한글 In-App 플러그인, Tauri v2 데스크톱 패키징 및 하이브리드 SaaS 크레딧 결제 체계 구축.
