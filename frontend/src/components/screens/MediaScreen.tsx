import React from 'react';

export default function MediaScreen() {
  return (
    <>
      <div className="flex flex-col w-full">

<section className="bg-surface-card shadow-sm px-gutter py-space-md mb-space-md">
<div className="flex flex-col gap-space-md">

<div className="flex items-center gap-space-sm">
<div className="relative flex-1 flex items-center">
<span className="material-symbols-outlined text-secondary absolute left-space-md text-[20px]">manage_search</span>
<input className="w-full h-10 pl-11 pr-24 bg-surface-container rounded-lg font-body-default text-body-default text-text-primary focus:bg-surface-card focus:outline-none transition-all" id="main-search-input" placeholder="검색어를 입력하거나 자연어 질의를 입력하세요..." type="text" value="2026년도 신규 클라우드 데이터센터 전력 효율성(PUE) 및 비용 분석"/>
<div className="absolute right-space-sm flex items-center gap-1">
<span className="px-space-xs py-0.5 rounded bg-surface-card text-text-muted font-code-mono text-code-mono shadow-sm">Enter</span>
<button className="w-7 h-7 flex items-center justify-center text-text-secondary hover:text-text-primary rounded hover:bg-surface-card transition-colors" type="button">
<span className="material-symbols-outlined text-[16px]">close</span>
</button>
</div>
</div>
<button className="h-10 px-space-xl bg-primary text-on-primary rounded-lg font-body-semibold text-body-semibold flex items-center gap-space-xs hover:bg-primary-container transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">search</span>
<span>하이브리드 정밀 검색</span>
</button>
<button className="h-10 px-space-md bg-surface-container text-text-secondary rounded-lg font-body-default text-body-default flex items-center gap-space-xs hover:text-on-surface hover:bg-surface-container-high transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">tune</span>
<span>고급 옵션</span>
</button>
</div>

<div className="flex flex-wrap items-center justify-between gap-space-md pt-space-xs">

<div className="flex items-center gap-space-md bg-surface-container px-space-md py-1.5 rounded-lg">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-secondary">psychology</span>
<span className="font-caption text-caption font-semibold text-text-secondary uppercase">하이브리드 가중치</span>
</div>
<div className="flex items-center gap-space-sm">
<span className="font-body-dense text-body-dense text-secondary font-semibold">의미(Dense) <span id="dense-val">70%</span></span>
<div className="w-32 flex items-center">
<input className="w-full h-1.5 bg-surface-card rounded-lg appearance-none cursor-pointer accent-secondary" id="hybrid-slider" max="100" min="0" oninput="document.getElementById('dense-val').innerText = this.value + '%'; document.getElementById('sparse-val').innerText = (100 - this.value) + '%';" type="range" value="70"/>
</div>
<span className="font-body-dense text-body-dense text-text-muted">키워드(BM25) <span id="sparse-val">30%</span></span>
</div>
</div>

<div className="flex items-center gap-space-sm flex-wrap">

<button className="flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg bg-surface-container text-secondary font-body-dense text-body-dense transition-all shadow-sm" id="graph-rag-toggle" type="button">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="material-symbols-outlined text-[16px]">account_tree</span>
<span className="font-semibold">GraphRAG 지식망 맵 ON</span>
</button>

<div className="flex items-center gap-1 bg-surface-container p-1 rounded-lg">
<span className="px-space-sm py-1 rounded-md bg-surface-card text-text-primary font-caption text-caption font-semibold shadow-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">folder</span>
              전체 폴더 (D:\Enterprise_Data)
            </span>
<span className="px-space-sm py-1 rounded-md bg-surface-card text-format-docx-text font-caption text-caption font-semibold shadow-sm flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">filter_alt</span>
              PPTX, DOCX, PDF (3개)
            </span>
<span className="px-space-sm py-1 rounded-md bg-status-local-bg text-status-local-text font-caption text-caption font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">format_image_left</span>
              로컬 NPU 온디바이스
            </span>
</div>
</div>
</div>

<div className="flex items-center justify-between text-caption font-caption text-text-muted bg-surface-canvas px-space-md py-1.5 rounded">
<div className="flex items-center gap-space-sm">
<span className="flex items-center gap-1 text-primary font-body-semibold text-body-semibold">
<span className="material-symbols-outlined text-[16px] text-secondary">analytics</span>
            총 14개 문서에서 28개 세부 위치 일치
          </span>
<span className="text-outline-variant">&bull;</span>
<span>임베딩 모델: BGE-M3-Korean (512-dim)</span>
<span className="text-outline-variant">&bull;</span>
<span className="font-code-mono text-code-mono text-status-local-text font-semibold">지연 시간: 42ms (NPU 하드웨어 가속)</span>
</div>
<div className="flex items-center gap-space-sm">
<span className="text-text-secondary">정렬 기준:</span>
<span className="font-body-dense text-body-dense font-semibold text-text-primary bg-surface-card px-space-xs py-0.5 rounded shadow-sm">종합 유사도 내림차순 &dtrif;</span>
</div>
</div>
</div>
</section>

<div className="flex gap-gutter px-gutter pb-space-xl items-start">

<div className="w-1/2 flex flex-col gap-space-md">

<div className="flex items-center justify-between px-space-xs">
<div className="flex items-center gap-space-xs">
<span className="font-title-sm text-title-sm font-semibold text-text-primary">위치 기반 검색 결과</span>
<span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-code-mono text-code-mono font-bold">28 Locations</span>
</div>
<div className="flex items-center gap-1">
<button className="p-1 rounded bg-surface-card hover:bg-surface-container text-text-secondary shadow-sm" title="카드 압축 모드" type="button">
<span className="material-symbols-outlined text-[16px]">view_compact</span>
</button>
<button className="p-1 rounded bg-surface-card hover:bg-surface-container text-text-secondary shadow-sm" title="내보내기" type="button">
<span className="material-symbols-outlined text-[16px]">download</span>
</button>
</div>
</div>

<article className="bg-surface-card rounded-xl p-space-md shadow-md transition-all cursor-pointer relative overflow-hidden">
<div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>

<div className="flex items-start justify-between gap-space-sm mb-space-xs pl-space-xs">
<div className="flex items-center gap-space-xs flex-wrap min-w-0">
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label font-bold bg-format-pptx-bg text-format-pptx-text">PPTX</span>
<h3 className="font-body-semibold text-body-semibold text-text-primary truncate" title="2026_ESG_인프라투자계획서_최종.pptx">
              2026_ESG_인프라투자계획서_최종.pptx
            </h3>
</div>
<div className="flex items-center gap-space-xs shrink-0">
<span className="px-space-sm py-0.5 rounded bg-surface-container font-code-mono text-code-mono font-semibold text-secondary">
              96.4% 유사도
            </span>
</div>
</div>

<div className="flex items-center gap-space-sm my-space-xs pl-space-xs">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-secondary/10 text-secondary font-caption text-caption font-bold">
<span className="material-symbols-outlined text-[14px]">pin_drop</span>
            물리적 위치: 14번째 슬라이드 (본문 표 &amp; KPI 비교 차트)
          </span>
<span className="font-code-mono text-code-mono text-text-muted">수정일: 2025.02.18</span>
</div>

<div className="bg-surface-container rounded-lg p-space-sm text-body-default font-body-default text-text-primary my-space-xs leading-relaxed">
<p>
            ...차세대 AI 하이퍼스케일 IDC의 목표 
            <mark className="bg-diff-modified-bg text-diff-modified-text px-1 py-0.5 rounded font-semibold">전력 효율성(PUE)을 1.15 이하</mark>로 
            달성하기 위한 액침냉각(Immersion Cooling) 전면 도입 및 
            <mark className="bg-diff-modified-bg text-diff-modified-text px-1 py-0.5 rounded font-semibold">연간 운영비용 절감 분석</mark> 산출표를 통해 
            기존 공랭식 설비 대비 연간 전력비 184억 원 절감 산출 방안...
          </p>
</div>

<div className="flex items-center justify-between pt-space-xs pl-space-xs">
<div className="flex items-center gap-1.5 text-text-muted font-caption text-caption">
<span className="flex items-center gap-0.5"><span className="material-symbols-outlined text-[13px]">folder</span> D:\Enterprise_Data\2026_전략기획실</span>
<span>&bull;</span>
<span className="text-security-dlp-pass flex items-center gap-0.5 font-medium">
<span className="material-symbols-outlined text-[13px]">verified_user</span> PII 검증 완료
            </span>
</div>
<div className="flex items-center gap-1">
<button className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-text-secondary hover:text-text-primary text-caption font-caption flex items-center gap-0.5 transition-colors" title="원본 파워포인트 열기" type="button">
<span className="material-symbols-outlined text-[14px]">open_in_new</span> 원본 열기
            </button>
<button className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-text-secondary hover:text-text-primary text-caption font-caption flex items-center gap-0.5 transition-colors" title="병합 워크스페이스에 추가" type="button">
<span className="material-symbols-outlined text-[14px]">add_circle</span> 병합 추가
            </button>
<button className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-text-secondary hover:text-text-primary text-caption font-caption flex items-center gap-0.5 transition-colors" title="다중 문서 비교창으로 전송" type="button">
<span className="material-symbols-outlined text-[14px]">difference</span> 비교
            </button>
<button className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-text-secondary hover:text-text-primary text-caption font-caption flex items-center gap-0.5 transition-colors" title="인용구 서식 복사" type="button">
<span className="material-symbols-outlined text-[14px]">content_copy</span> 인용
            </button>
</div>
</div>
</article>

<article className="bg-surface-card rounded-xl p-space-md shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden">
<div className="flex items-start justify-between gap-space-sm mb-space-xs">
<div className="flex items-center gap-space-xs flex-wrap min-w-0">
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label font-bold bg-format-pdf-bg text-format-pdf-text">PDF</span>
<h3 className="font-body-semibold text-body-semibold text-text-primary truncate" title="2025_4분기_데이터센터_에너지감사보고서.pdf">
              2025_4분기_데이터센터_에너지감사보고서.pdf
            </h3>
</div>
<span className="px-space-sm py-0.5 rounded bg-surface-container font-code-mono text-code-mono font-semibold text-text-secondary">
            91.8% 유사도
          </span>
</div>
<div className="flex items-center gap-space-sm my-space-xs">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container text-text-primary font-caption text-caption font-semibold">
<span className="material-symbols-outlined text-[14px] text-format-pdf-text">picture_as_pdf</span>
            물리적 위치: p.42 제3장 2절 (단락 4, 데이터 표 3-4)
          </span>
<span className="font-code-mono text-code-mono text-text-muted">수정일: 2025.01.12</span>
</div>
<div className="bg-surface-container rounded-lg p-space-sm text-body-default font-body-default text-text-primary my-space-xs leading-relaxed">
<p>
            ...기존 공랭식 설비 대비 <mark className="bg-diff-modified-bg text-diff-modified-text px-1 py-0.5 rounded font-semibold">전력 소비량 28% 감축 효과</mark> 및 
            초기 인프라 설비투자 CAPEX 대비 OPEX 손익분기점(BEP)은 도입 2.4년 후로 수렴함을 확인하였으며, 
            <mark className="bg-diff-modified-bg text-diff-modified-text px-1 py-0.5 rounded font-semibold">평균 PUE 1.21 달성 추이</mark> 검증 완료...
          </p>
</div>
<div className="flex items-center justify-between pt-space-xs">
<div className="flex items-center gap-1.5 text-text-muted font-caption text-caption">
<span>D:\Audits\Facility_Report_2025</span>
</div>
<div className="flex items-center gap-1">
<button className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-text-secondary text-caption font-caption flex items-center gap-0.5" type="button">
<span className="material-symbols-outlined text-[14px]">pin_drop</span> 위치 보기
            </button>
<button className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-text-secondary text-caption font-caption flex items-center gap-0.5" type="button">
<span className="material-symbols-outlined text-[14px]">add_circle</span> 병합 추가
            </button>
</div>
</div>
</article>

<article className="bg-surface-card rounded-xl p-space-md shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden">
<div className="flex items-start justify-between gap-space-sm mb-space-xs">
<div className="flex items-center gap-space-xs flex-wrap min-w-0">
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label font-bold bg-format-xlsx-bg text-format-xlsx-text">XLSX</span>
<h3 className="font-body-semibold text-body-semibold text-text-primary truncate" title="IDC_전력사용단가_비교시뮬레이션_v4.xlsx">
              IDC_전력사용단가_비교시뮬레이션_v4.xlsx
            </h3>
</div>
<span className="px-space-sm py-0.5 rounded bg-surface-container font-code-mono text-code-mono font-semibold text-text-secondary">
            88.5% 유사도
          </span>
</div>
<div className="flex items-center gap-space-sm my-space-xs">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-format-xlsx-bg/60 text-format-xlsx-text font-caption text-caption font-bold">
<span className="material-symbols-outlined text-[14px]">table_chart</span>
            물리적 위치: '비용시뮬레이션' 시트 (셀 범위 C12:F48)
          </span>
<span className="font-code-mono text-code-mono text-text-muted">수정일: 2025.02.05</span>
</div>
<div className="bg-surface-container rounded-lg p-space-sm text-body-default font-body-default text-text-primary my-space-xs leading-relaxed">
<p>
            ...시뮬레이션 변수: 한전 산업용(을) 고압A 선택 II 단가 기준, 하절기 첨두부하 시 <mark className="bg-diff-modified-bg text-diff-modified-text px-1 py-0.5 rounded font-semibold">PUE 1.15 조건 하 연간 전력비 산출</mark> 결과: 총액 721.4억 원 (절감율 19.8% 달성)...
          </p>
</div>
<div className="flex items-center justify-between pt-space-xs">
<div className="flex items-center gap-1.5 text-text-muted font-caption text-caption">
<span>D:\Finance\Model_Simulations</span>
</div>
<div className="flex items-center gap-1">
<button className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-text-secondary text-caption font-caption flex items-center gap-0.5" type="button">
<span className="material-symbols-outlined text-[14px]">open_in_new</span> 스프레드시트 열기
            </button>
<button className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-text-secondary text-caption font-caption flex items-center gap-0.5" type="button">
<span className="material-symbols-outlined text-[14px]">difference</span> 비교
            </button>
</div>
</div>
</article>

<article className="bg-surface-card rounded-xl p-space-md shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden">
<div className="flex items-start justify-between gap-space-sm mb-space-xs">
<div className="flex items-center gap-space-xs flex-wrap min-w-0">
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label font-bold bg-format-hwp-bg text-format-hwp-text">HWPX</span>
<h3 className="font-body-semibold text-body-semibold text-text-primary truncate" title="국내외_친환경_데이터센터_가이드라인_검토.hwpx">
              국내외_친환경_데이터센터_가이드라인_검토.hwpx
            </h3>
</div>
<span className="px-space-sm py-0.5 rounded bg-surface-container font-code-mono text-code-mono font-semibold text-text-secondary">
            85.1% 유사도
          </span>
</div>
<div className="flex items-center gap-space-sm my-space-xs">
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-format-hwp-bg/70 text-format-hwp-text font-caption text-caption font-bold">
<span className="material-symbols-outlined text-[14px]">description</span>
            물리적 위치: p.8 표 2-1 (정부 권고 친환경 지표 표준)
          </span>
<span className="font-code-mono text-code-mono text-text-muted">수정일: 2025.01.29</span>
</div>
<div className="bg-surface-container rounded-lg p-space-sm text-body-default font-body-default text-text-primary my-space-xs leading-relaxed">
<p>
            ...과기정통부 2026 권고안 제4조: 신규 허가 데이터센터 기준 <mark className="bg-diff-modified-bg text-diff-modified-text px-1 py-0.5 rounded font-semibold">설계 PUE 1.3 이하 의무화</mark> 및 
            재생에너지 사용 비율 30% 초과 시 취득세 및 지방세 감면 특례 인센티브 규정...
          </p>
</div>
<div className="flex items-center justify-between pt-space-xs">
<div className="flex items-center gap-1.5 text-text-muted font-caption text-caption">
<span>C:\HQ_Legal\HWP_Vault\Guideline_2026</span>
</div>
<div className="flex items-center gap-1">
<button className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-text-secondary text-caption font-caption flex items-center gap-0.5" type="button">
<span className="material-symbols-outlined text-[14px]">open_in_new</span> 한글 뷰어 열기
            </button>
<button className="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-text-secondary text-caption font-caption flex items-center gap-0.5" type="button">
<span className="material-symbols-outlined text-[14px]">content_copy</span> 인용 복사
            </button>
</div>
</div>
</article>

<div className="flex items-center justify-between py-space-sm px-space-xs text-caption font-caption text-text-muted">
<span>1 - 4 / 28개 위치 일치 표시 중</span>
<div className="flex items-center gap-1">
<button className="px-space-sm py-1 rounded bg-surface-card text-text-secondary hover:bg-surface-container shadow-sm" type="button">이전</button>
<button className="px-space-sm py-1 rounded bg-primary text-on-primary font-bold" type="button">1</button>
<button className="px-space-sm py-1 rounded bg-surface-card text-text-secondary hover:bg-surface-container shadow-sm" type="button">2</button>
<button className="px-space-sm py-1 rounded bg-surface-card text-text-secondary hover:bg-surface-container shadow-sm" type="button">3</button>
<button className="px-space-sm py-1 rounded bg-surface-card text-text-secondary hover:bg-surface-container shadow-sm" type="button">다음</button>
</div>
</div>
</div>

<div className="w-1/2 flex flex-col gap-space-md sticky top-16">

<div className="bg-surface-card rounded-xl shadow-sm p-space-md flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs min-w-0">
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label font-bold bg-format-pptx-bg text-format-pptx-text">PPTX</span>
<span className="font-body-semibold text-body-semibold text-text-primary truncate">2026_ESG_인프라투자계획서_최종.pptx</span>
<span className="material-symbols-outlined text-[16px] text-text-secondary">chevron_right</span>
<span className="font-body-semibold text-body-semibold text-secondary font-code-mono">Slide 14</span>
</div>

<div className="flex items-center gap-1 bg-surface-container p-1 rounded-lg shrink-0">
<button className="h-6 px-2 rounded bg-surface-card hover:bg-surface-canvas text-text-secondary hover:text-text-primary text-caption font-caption flex items-center gap-0.5 shadow-sm" title="이전 슬라이드로 이동" type="button">
<span className="material-symbols-outlined text-[14px]">arrow_back</span> 13
            </button>
<span className="px-2 font-code-mono text-code-mono font-bold text-text-primary">14 / 36</span>
<button className="h-6 px-2 rounded bg-surface-card hover:bg-surface-canvas text-text-secondary hover:text-text-primary text-caption font-caption flex items-center gap-0.5 shadow-sm" title="다음 슬라이드로 이동" type="button">
              15 <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</button>
</div>
</div>

<div className="flex items-center justify-between text-caption font-caption pt-1 text-text-muted">
<span className="truncate max-w-[340px]">D:\Enterprise_Data\2026_전략기획실\ESG_Infrastructure_Plan_vFinal.pptx</span>
<div className="flex items-center gap-space-sm">
<div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded text-text-secondary">
<span className="material-symbols-outlined text-[14px]">zoom_in</span>
<span className="font-code-mono text-code-mono font-semibold">100%</span>
</div>
<button className="p-1 rounded hover:bg-surface-container text-text-secondary" title="전체화면" type="button">
<span className="material-symbols-outlined text-[16px]">fullscreen</span>
</button>
<button className="p-1 rounded hover:bg-surface-container text-text-secondary" title="렌더링 새로고침" type="button">
<span className="material-symbols-outlined text-[16px]">refresh</span>
</button>
</div>
</div>
</div>

<div className="bg-diff-modified-bg px-space-md py-2 rounded-lg flex items-center justify-between text-diff-modified-text shadow-sm">
<div className="flex items-center gap-space-xs font-body-dense text-body-dense font-semibold">
<span className="material-symbols-outlined text-[18px]">gps_fixed</span>
<span>검색된 문맥 일치 영역: 본문 표 2행(액침냉각) 및 하단 연간 비용 절감 요약 박스</span>
</div>
<span className="font-code-mono text-code-mono font-bold bg-white/70 px-1.5 py-0.5 rounded">Hit Match</span>
</div>

<div className="bg-surface-card rounded-xl shadow-lg p-6 min-h-[460px] flex flex-col justify-between relative overflow-hidden">

<div className="flex items-center justify-between pb-3">
<div>
<span className="font-caption text-caption text-secondary font-bold tracking-wider uppercase">ESG GREEN DATA CENTER INITIATIVE 2026</span>
<h2 className="font-title-sm text-title-sm font-bold text-primary">AI IDC 전력 효율성(PUE) 및 냉각 방식별 전력소비 비교 분석</h2>
</div>
<div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-on-primary font-bold font-code-mono text-code-mono">
            14
          </div>
</div>

<div className="flex flex-col gap-4 my-2">

<div className="rounded-lg overflow-hidden bg-surface-container shadow-sm">
<table className="w-full text-left font-body-dense text-body-dense">
<thead className="bg-surface-container-high text-text-secondary uppercase font-caption text-caption">
<tr>
<th className="py-2 px-3">냉각 기술 방식</th>
<th className="py-2 px-3">목표 PUE</th>
<th className="py-2 px-3">연간 전력소비량 (MWh)</th>
<th className="py-2 px-3">연간 추정 전기요금</th>
<th className="py-2 px-3">비고</th>
</tr>
</thead>
<tbody className="text-text-primary">
<tr className="hover:bg-surface-card transition-colors">
<td className="py-2.5 px-3 font-semibold">기존 공랭식 (CRAC)</td>
<td className="py-2.5 px-3 font-code-mono">1.45</td>
<td className="py-2.5 px-3 font-code-mono">182,400 MWh</td>
<td className="py-2.5 px-3 font-code-mono">312.8억 원</td>
<td className="py-2.5 px-3 text-text-muted">기존 1~2센터 적용</td>
</tr>
<tr className="hover:bg-surface-card transition-colors">
<td className="py-2.5 px-3 font-semibold">수랭식 하이브리드 (DLC)</td>
<td className="py-2.5 px-3 font-code-mono">1.25</td>
<td className="py-2.5 px-3 font-code-mono">157,200 MWh</td>
<td className="py-2.5 px-3 font-code-mono">269.5억 원</td>
<td className="py-2.5 px-3 text-text-muted">3센터 고밀도 랙</td>
</tr>

<tr className="bg-diff-modified-bg/70 text-diff-modified-text font-semibold relative">
<td className="py-2.5 px-3 flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-status-danger-text animate-ping"></span>
<span className="font-bold">단상 액침냉각 (Immersion)</span>
</td>
<td className="py-2.5 px-3 font-code-mono font-bold text-primary">1.12 ~ 1.15</td>
<td className="py-2.5 px-3 font-code-mono font-bold">140,800 MWh</td>
<td className="py-2.5 px-3 font-code-mono font-bold text-secondary">241.4억 원</td>
<td className="py-2.5 px-3 font-bold text-status-danger-text">&starf; 2026 신규 도입안</td>
</tr>
</tbody>
</table>
</div>

<div className="grid grid-cols-3 gap-3">
<div className="bg-surface-container p-3 rounded-lg flex flex-col justify-between">
<span className="font-caption text-caption text-text-secondary font-medium">연간 예상 절감 비용</span>
<div className="flex items-baseline gap-1 my-1">
<span className="font-display-lg text-display-lg text-secondary font-bold">-71.4</span>
<span className="font-body-dense text-body-dense text-text-secondary font-semibold">억 원/년</span>
</div>
<div className="w-full bg-surface-card h-1.5 rounded-full overflow-hidden">
<div className="bg-secondary h-full rounded-full"></div>
</div>
</div>
<div className="bg-surface-container p-3 rounded-lg flex flex-col justify-between">
<span className="font-caption text-caption text-text-secondary font-medium">PUE 효율 개선율</span>
<div className="flex items-baseline gap-1 my-1">
<span className="font-display-lg text-display-lg text-status-local-text font-bold">22.8%</span>
<span className="font-body-dense text-body-dense text-text-secondary font-semibold">개선</span>
</div>
<div className="w-full bg-surface-card h-1.5 rounded-full overflow-hidden">
<div className="bg-status-local-text h-full rounded-full"></div>
</div>
</div>
<div className="bg-surface-container p-3 rounded-lg flex flex-col justify-between">
<span className="font-caption text-caption text-text-secondary font-medium">설비투자 회수 기간 (BEP)</span>
<div className="flex items-baseline gap-1 my-1">
<span className="font-display-lg text-display-lg text-primary font-bold">2.4</span>
<span className="font-body-dense text-body-dense text-text-secondary font-semibold">년</span>
</div>
<div className="w-full bg-surface-card h-1.5 rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full"></div>
</div>
</div>
</div>

<div className="p-3 rounded-lg bg-surface-container-high text-body-dense font-body-dense text-text-primary flex items-start gap-2">
<span className="material-symbols-outlined text-[16px] text-secondary shrink-0 mt-0.5">info</span>
<p className="leading-tight">
<strong>요약 결론:</strong> 신규 IDC 전산실 4개 룸 전체에 액침냉각 설비 구축 시, 설계 목표 PUE 1.15를 안정적으로 달성하며 하계 피크 전력 35% 컷오프를 통해 운영비용(OPEX) 극대화 가능.
            </p>
</div>
</div>

<div className="flex items-center justify-between pt-2 text-text-muted font-caption text-caption">
<span>문서 보안 등급: 대외비 (전략기획실 보안 인가)</span>
<span className="font-code-mono text-code-mono">DocPilot Dynamic Native Render v3.2</span>
</div>
</div>

<div className="bg-surface-card rounded-xl p-space-md shadow-sm flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<button className="h-9 px-space-md bg-secondary text-on-secondary rounded-lg font-body-semibold text-body-semibold flex items-center gap-space-xs hover:bg-secondary-container transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px]">launch</span>
<span>MS PowerPoint로 원본 슬라이드 열기</span>
</button>
<button className="h-9 px-space-md bg-surface-container hover:bg-surface-container-high text-text-primary rounded-lg font-body-default text-body-default flex items-center gap-space-xs transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
<span>이 슬라이드만 PDF 추출</span>
</button>
</div>
<button className="h-9 px-space-md bg-surface-container hover:bg-surface-container-high text-text-secondary hover:text-text-primary rounded-lg font-body-default text-body-default flex items-center gap-space-xs transition-colors" id="copy-deeplink-btn" type="button">
<span className="material-symbols-outlined text-[16px]">link</span>
<span id="copy-btn-text">위치 딥링크 복사</span>
</button>
</div>
</div>
</div>
</div>

    </>
  );
}
