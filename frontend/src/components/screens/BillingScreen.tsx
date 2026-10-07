import React from 'react';

export default function BillingScreen() {
  return (
    <>
      <div className="flex flex-col w-full">
<div className="p-space-lg flex flex-col gap-space-lg w-full">

<section className="bg-surface-card rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
<div className="flex flex-wrap items-center justify-between gap-space-md">

<div className="flex flex-wrap items-center gap-space-sm min-w-0">

<div className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-1.5 rounded-lg shadow-sm">
<span className="font-caption text-caption text-text-secondary font-semibold">기준(A)</span>
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label font-bold bg-format-docx-bg text-format-docx-text">DOCX</span>
<span className="font-body-semibold text-body-semibold text-text-primary truncate max-w-[200px]" title="2025_사업계획서_최종본_v1.2.docx">2025_사업계획서_최종본_v1.2.docx</span>
<span className="material-symbols-outlined text-[16px] text-text-secondary cursor-pointer">arrow_drop_down</span>
</div>
<span className="material-symbols-outlined text-[16px] text-text-muted">compare_arrows</span>

<div className="flex flex-wrap items-center gap-space-xs">
<div className="flex items-center gap-space-xs bg-surface-container px-space-sm py-1.5 rounded-lg">
<span className="font-caption text-caption text-text-secondary font-semibold">비교 1</span>
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label font-bold bg-format-docx-bg text-format-docx-text">DOCX</span>
<span className="font-body-dense text-body-dense text-text-primary truncate max-w-[190px]">2026_신규_사업계획서_수정안_v2.0.docx</span>
<button aria-label="문서 제거" className="w-4 h-4 rounded flex items-center justify-center text-text-secondary hover:text-error" type="button">
<span className="material-symbols-outlined text-[13px]">close</span>
</button>
</div>
<div className="flex items-center gap-space-xs bg-surface-container px-space-sm py-1.5 rounded-lg">
<span className="font-caption text-caption text-text-secondary font-semibold">비교 2</span>
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label font-bold bg-format-pptx-bg text-format-pptx-text">PPTX</span>
<span className="font-body-dense text-body-dense text-text-primary truncate max-w-[170px]">2026_이사회_제출용_요약본.pptx</span>
<button aria-label="문서 제거" className="w-4 h-4 rounded flex items-center justify-center text-text-secondary hover:text-error" type="button">
<span className="material-symbols-outlined text-[13px]">close</span>
</button>
</div>
<button className="flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg bg-surface-container text-text-secondary hover:bg-surface-container-high hover:text-text-primary transition-colors" type="button">
<span className="material-symbols-outlined text-[15px]">add</span>
<span className="font-caption text-caption font-semibold">비교 대상 추가</span>
</button>
</div>
</div>

<div className="flex items-center gap-space-xs shrink-0">
<button className="flex items-center gap-space-xs px-space-md py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-text-primary font-body-semibold text-body-semibold shadow-sm transition-all active:scale-95" id="btn-recompare" type="button">
<span className="material-symbols-outlined text-[16px] text-secondary">refresh</span>
<span>비교 분석 다시 실행</span>
</button>
<button className="flex items-center gap-space-xs px-space-md py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-body-semibold text-body-semibold shadow-sm transition-all active:scale-95" type="button">
<span className="material-symbols-outlined text-[16px]">download</span>
<span>비교 리포트 다운로드</span>
<span className="px-space-xs py-0.5 rounded bg-surface-card/20 text-on-primary font-badge-label text-badge-label">DOCX/PDF</span>
</button>
</div>
</div>

<div className="flex items-center justify-between pt-space-xs">
<div className="flex items-center gap-space-sm">
<span className="font-caption text-caption text-text-secondary font-semibold">비교 정밀도</span>
<div className="inline-flex p-0.5 bg-surface-container rounded-lg" id="granularity-toggles">
<button className="granularity-btn px-space-md py-1 rounded font-caption text-caption font-semibold bg-surface-card text-primary shadow-sm" data-mode="sentence" type="button">
              단락 / 문장 단위
            </button>
<button className="granularity-btn px-space-md py-1 rounded font-caption text-caption text-text-secondary hover:text-text-primary" data-mode="line" type="button">
              원자적 라인 (Line Diff)
            </button>
<button className="granularity-btn px-space-md py-1 rounded font-caption text-caption text-text-secondary hover:text-text-primary" data-mode="numerical" type="button">
              수치 / 표 (Numerical)
            </button>
</div>
</div>
<div className="flex items-center gap-space-md font-caption text-caption text-text-secondary">
<span className="flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-security-dlp-pass"></span>
            로컬 NPU 하이브리드 토크나이저 연동 완료
          </span>
<span className="text-text-muted">|</span>
<span className="font-code-mono text-code-mono">Similarity Index: 88.4%</span>
</div>
</div>
</section>

<nav aria-label="비교 분석 뷰" className="bg-surface-card rounded-xl p-1 shadow-sm flex items-center justify-between">
<div className="flex items-center gap-space-xs" id="diff-tabs">

<button className="tab-btn active-tab flex items-center gap-space-xs px-space-lg py-2 rounded-lg bg-surface-container font-body-semibold text-body-semibold text-primary shadow-sm transition-colors" data-target="tab-summary" type="button">
<span className="material-symbols-outlined text-[18px] text-secondary">auto_awesome</span>
<span>AI 문맥 요약 (LLM Report)</span>
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label bg-secondary-fixed text-primary font-bold">PRO</span>
</button>

<button className="tab-btn flex items-center gap-space-xs px-space-lg py-2 rounded-lg hover:bg-surface-container-low font-body-default text-body-default text-text-secondary hover:text-text-primary transition-colors" data-target="tab-diff" type="button">
<span className="material-symbols-outlined text-[18px]">difference</span>
<span>좌우 상세 Line Diff (Visual Side-by-Side)</span>
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label bg-diff-modified-bg text-diff-modified-text font-bold">24곳 변경</span>
</button>

<button className="tab-btn flex items-center gap-space-xs px-space-lg py-2 rounded-lg hover:bg-surface-container-low font-body-default text-body-default text-text-secondary hover:text-text-primary transition-colors" data-target="tab-numerical" type="button">
<span className="material-symbols-outlined text-[18px]">query_stats</span>
<span>표&middot;수치 변동 전용 탭 (Numerical Changes)</span>
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label bg-diff-added-bg text-diff-added-text font-bold">8건 주요 수치 변동</span>
</button>
</div>
<div className="flex items-center gap-space-sm pr-space-md">
<span className="font-code-mono text-code-mono text-text-muted">Diff Engine: DocPilot v3.2-Unified</span>
<button className="w-7 h-7 rounded flex items-center justify-center text-text-secondary hover:bg-surface-container" title="보기 설정" type="button">
<span className="material-symbols-outlined text-[18px]">tune</span>
</button>
</div>
<div className="flex items-center gap-1.5 px-space-sm py-1.5 ml-space-sm rounded-lg bg-status-local-bg border border-status-local-text/30 cursor-pointer hover:bg-surface-container transition-colors shrink-0">
<span className="w-2 h-2 rounded-full bg-status-local-text animate-pulse"></span>
<span className="font-caption text-caption font-semibold text-status-local-text">로컬 AI [NPU 가속 Standard]</span>
<span className="material-symbols-outlined text-[14px] text-status-local-text">arrow_drop_down</span>
</div></nav>

<div className="bg-gradient-to-r from-surface-container via-surface-card to-surface-container-low p-space-md rounded-xl shadow-sm flex items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md min-w-0">
<div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-on-secondary shrink-0 shadow-sm">
<span className="material-symbols-outlined text-[20px]">analytics</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-sm flex-wrap">
<span className="font-body-semibold text-body-semibold text-text-primary">총 24개 단락 변동 감지됨</span>
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label bg-diff-added-bg text-diff-added-text">추가 8건</span>
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label bg-diff-removed-bg text-diff-removed-text">삭제 4건</span>
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label bg-diff-modified-bg text-diff-modified-text">수정 12건</span>
</div>
<span className="font-caption text-caption text-text-secondary truncate mt-0.5">
            수치 변동률: <strong className="text-status-danger-text font-semibold">CAPEX +28.5% 상향</strong>, <strong className="text-security-dlp-pass font-semibold">납기일정 2개월 단축</strong>, 연간 전력비용 38.7% 절감 모델 반영
          </span>
</div>
</div>
<div className="flex items-center gap-space-md shrink-0">
<div className="flex items-center gap-space-xs font-caption text-caption bg-surface-card px-space-md py-1 rounded-lg shadow-sm">
<span className="text-text-secondary">엔진 신뢰도</span>
<span className="font-code-mono text-code-mono font-bold text-status-local-text">99.2% (Deterministic)</span>
</div>
<div className="flex items-center gap-space-xs font-caption text-caption bg-surface-card px-space-md py-1 rounded-lg shadow-sm">
<span className="text-text-secondary">소요 시간</span>
<span className="font-code-mono text-code-mono text-text-primary">482ms</span>
</div>
</div>
</div>

<div className="grid grid-cols-12 gap-space-lg w-full items-start">

<section className="col-span-12 xl:col-span-5 flex flex-col gap-space-md">

<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[20px] text-secondary">psychology</span>
<h2 className="font-headline-md text-headline-md text-text-primary">AI 문맥 종합 요약 리포트</h2>
</div>
<span className="px-space-sm py-0.5 rounded bg-status-local-bg text-status-local-text font-caption text-caption font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">memory</span>
            온디바이스 LLM 추출
          </span>
</div>

<div className="bg-surface-card rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md relative overflow-hidden">
<div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-secondary/5 pointer-events-none"></div>
<div className="flex items-center justify-between">
<span className="font-caption text-caption uppercase text-text-secondary font-bold tracking-wider">Executive Summary</span>
<span className="font-code-mono text-code-mono text-text-muted">Model: Llama-3-Korean-8B-Q4</span>
</div>
<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-xs">
<p className="font-body-default text-body-default text-text-primary leading-relaxed font-medium">
              1. 데이터센터 신규 냉각 방식이 기존 수랭식에서 <span className="bg-diff-modified-bg px-1 font-semibold text-diff-modified-text rounded">액침냉각(Immersion)</span>으로 전격 변경되어 초기 투자비 <strong className="text-primary underline decoration-secondary">71.4억원 절감</strong> 계획이 새롭게 반영되었습니다.
            </p>
<p className="font-body-dense text-body-dense text-text-secondary leading-normal">
              - 2026 수정안에서는 연간 PUE 지표를 1.45에서 글로벌 탑티어 수준인 1.15로 대폭 강화하였으며, 이로 인해 연간 운영비용(OPEX) 추정치가 184.2억원에서 112.8억원으로 38.8% 감축 편성되었습니다.
            </p>
</div>

<div className="flex items-center justify-between pt-space-xs">
<span className="font-caption text-caption text-text-secondary font-semibold">의사결정 영향도 평가</span>
<div className="flex items-center gap-space-xs">
<span className="px-space-sm py-0.5 rounded-lg font-caption text-caption font-semibold bg-surface-container text-text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-security-dlp-pass">verified</span>
                법무 리스크 낮음
              </span>
<span className="px-space-sm py-0.5 rounded-lg font-caption text-caption font-semibold bg-status-danger-bg text-status-danger-text flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">trending_up</span>
                재무 영향도 높음
              </span>
</div>
</div>
</div>

<div className="bg-surface-card rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[18px] text-text-secondary">gavel</span>
<h3 className="font-title-sm text-title-sm text-text-primary">주요 조항 및 계약 조건 변동 분석</h3>
</div>
<span className="font-caption text-caption text-text-muted">4건 주요 변동</span>
</div>
<div className="space-y-space-sm">

<div className="p-space-sm bg-surface-container rounded-lg flex flex-col gap-1">
<div className="flex items-center justify-between">
<span className="font-body-semibold text-body-semibold text-text-primary">제4조 계약이행보증금 상향</span>
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label bg-diff-modified-bg text-diff-modified-text font-bold">10% &rarr; 20%</span>
</div>
<p className="font-body-dense text-body-dense text-text-secondary">
                시공사 부도 및 납기 지연 방지를 위해 이행보증 요율이 상향 조정되었습니다. 자금 조달 계획 재검토가 필요합니다.
              </p>
</div>

<div className="p-space-sm bg-surface-container rounded-lg flex flex-col gap-1">
<div className="flex items-center justify-between">
<span className="font-body-semibold text-body-semibold text-text-primary">제12조 전력단가 연동제 도입 합의</span>
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label bg-diff-added-bg text-diff-added-text font-bold">신규 조항 추가</span>
</div>
<p className="font-body-dense text-body-dense text-text-secondary">
                한전 전기요금 인상 시 분기별 데이터센터 입주고객 분담금에 직접 연동하는 에스컬레이션 조항이 명문화되었습니다.
              </p>
</div>

<div className="p-space-sm bg-surface-container rounded-lg flex flex-col gap-1">
<div className="flex items-center justify-between">
<span className="font-body-semibold text-body-semibold text-text-primary">제18조 SLA(서비스 가용율) 보장 기준 강화</span>
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label bg-diff-modified-bg text-diff-modified-text font-bold">99.98% &rarr; 99.995%</span>
</div>
<p className="font-body-dense text-body-dense text-text-secondary">
                글로벌 CSP 요구사항 반영에 따른 무중단 운영 요건 상향으로 예비 UPS 배터리 셀 2조 추가 증설안이 채택되었습니다.
              </p>
</div>
</div>
</div>

<div className="bg-surface-card rounded-xl p-space-lg shadow-sm flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<span className="font-title-sm text-title-sm text-text-primary">의미론적 변경 강도 (Vector Drift)</span>
<span className="font-code-mono text-code-mono text-secondary font-bold">&Delta; = 0.418</span>
</div>
<div className="flex items-center gap-space-md pt-space-xs">

<svg aria-label="벡터 드리프트 레이더 다이어그램" className="w-24 h-24 shrink-0" viewBox="0 0 100 100">
<polygon fill="none" points="50,10 90,50 50,90 10,50" stroke="#E2E8F0" strokeWidth="2"></polygon>
<polygon fill="none" points="50,25 75,50 50,75 25,50" stroke="#CBD5E1" strokeWidth="1.5"></polygon>
<polygon fill="#0051d5" fill-opacity="0.2" points="50,18 84,48 50,68 32,50" stroke="#0051d5" strokeWidth="2"></polygon>
<circle cx="50" cy="18" fill="#0051d5" r="3"></circle>
<circle cx="84" cy="48" fill="#0051d5" r="3"></circle>
<circle cx="50" cy="68" fill="#0051d5" r="3"></circle>
<circle cx="32" cy="50" fill="#0051d5" r="3"></circle>
</svg>
<div className="flex flex-col gap-1 w-full font-caption text-caption text-text-secondary">
<div className="flex justify-between items-center">
<span>기술 규격 변경:</span>
<span className="font-code-mono text-code-mono font-semibold text-text-primary">82% 변동</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
<div className="bg-secondary h-full rounded-full w-[82%]"></div>
</div>
<div className="flex justify-between items-center mt-1">
<span>재무 예산 변경:</span>
<span className="font-code-mono text-code-mono font-semibold text-text-primary">64% 변동</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
<div className="bg-format-docx-text h-full rounded-full w-[64%]"></div>
</div>
<div className="flex justify-between items-center mt-1">
<span>법률 및 분쟁 책임:</span>
<span className="font-code-mono text-code-mono font-semibold text-text-primary">28% 변동</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
<div className="bg-security-dlp-pass h-full rounded-full w-[28%]"></div>
</div>
</div>
</div>
</div>
</section>

<section className="col-span-12 xl:col-span-7 flex flex-col gap-space-md">

<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[20px] text-secondary">compare</span>
<h2 className="font-headline-md text-headline-md text-text-primary">좌우 대조 Line Diff 및 수치 변동</h2>
</div>
<div className="flex items-center gap-space-xs">
<button className="w-7 h-7 rounded flex items-center justify-center bg-surface-card hover:bg-surface-container text-text-secondary shadow-sm" title="이전 변경점" type="button">
<span className="material-symbols-outlined text-[16px]">expand_less</span>
</button>
<span className="font-code-mono text-code-mono text-text-secondary px-1">Diff 3 / 24</span>
<button className="w-7 h-7 rounded flex items-center justify-center bg-surface-card hover:bg-surface-container text-text-secondary shadow-sm" title="다음 변경점" type="button">
<span className="material-symbols-outlined text-[16px]">expand_more</span>
</button>
<button className="px-space-sm py-1 rounded bg-surface-card hover:bg-surface-container text-text-secondary font-caption text-caption shadow-sm flex items-center gap-1" type="button">
<span className="material-symbols-outlined text-[14px]">wrap_text</span>
              줄바꿈
            </button>
</div>
</div>

<div className="grid grid-cols-2 gap-space-xs bg-surface-card rounded-t-xl p-space-sm shadow-sm">
<div className="flex items-center justify-between px-space-sm py-1 bg-surface-container-low rounded-lg">
<div className="flex items-center gap-space-xs min-w-0">
<span className="w-2.5 h-2.5 rounded-full bg-status-danger-text"></span>
<span className="font-body-semibold text-body-semibold text-text-primary truncate">2025 기준본 (v1.2)</span>
</div>
<span className="px-space-xs py-0.5 rounded font-code-mono text-code-mono text-text-muted">Section 3.2</span>
</div>
<div className="flex items-center justify-between px-space-sm py-1 bg-surface-container-low rounded-lg">
<div className="flex items-center gap-space-xs min-w-0">
<span className="w-2.5 h-2.5 rounded-full bg-security-dlp-pass"></span>
<span className="font-body-semibold text-body-semibold text-text-primary truncate">2026 수정안 (v2.0)</span>
</div>
<span className="px-space-xs py-0.5 rounded font-code-mono text-code-mono text-text-muted">Section 3.2</span>
</div>
</div>

<div className="bg-surface-card rounded-b-xl shadow-sm overflow-hidden flex flex-col font-code-mono text-code-mono">

<div className="flex items-stretch hover:bg-surface-container-low transition-colors">
<div className="w-12 py-1 px-space-xs text-right text-text-muted select-none bg-surface-container/50">142</div>
<div className="w-12 py-1 px-space-xs text-right text-text-muted select-none bg-surface-container/30">142</div>
<div className="w-6 py-1 text-center text-text-muted select-none"> </div>
<div className="flex-1 py-1 px-space-sm text-text-secondary overflow-x-auto whitespace-pre">### 3.2 센터 냉각 인프라 설계 사양 및 에너지 효율 목표</div>
</div>

<div className="flex items-stretch hover:bg-surface-container-low transition-colors">
<div className="w-12 py-1 px-space-xs text-right text-text-muted select-none bg-surface-container/50">143</div>
<div className="w-12 py-1 px-space-xs text-right text-text-muted select-none bg-surface-container/30">143</div>
<div className="w-6 py-1 text-center text-text-muted select-none"> </div>
<div className="flex-1 py-1 px-space-sm text-text-primary overflow-x-auto whitespace-pre">본 센터는 고밀도 AI 랙 클러스터(최대 40kW/랙) 운영을 지원하기 위하여</div>
</div>

<div className="flex items-stretch bg-diff-removed-bg text-diff-removed-text transition-colors">
<div className="w-12 py-1 px-space-xs text-right font-bold select-none bg-status-danger-bg">144</div>
<div className="w-12 py-1 px-space-xs text-right text-text-muted select-none opacity-20"> </div>
<div className="w-6 py-1 text-center font-bold select-none">-</div>
<div className="flex-1 py-1 px-space-sm overflow-x-auto whitespace-pre font-medium"><del className="no-underline">기존 공랭식 및 수랭식 복합 칠러를 통해 연간 PUE 1.45 목표 달성</del></div>
</div>

<div className="flex items-stretch bg-diff-added-bg text-diff-added-text transition-colors">
<div className="w-12 py-1 px-space-xs text-right text-text-muted select-none opacity-20"> </div>
<div className="w-12 py-1 px-space-xs text-right font-bold select-none bg-format-xlsx-bg">144</div>
<div className="w-6 py-1 text-center font-bold select-none">+</div>
<div className="flex-1 py-1 px-space-sm overflow-x-auto whitespace-pre font-medium"><ins className="no-underline">단상 액침냉각(Immersion Cooling) 시스템을 도입하여 연간 목표 PUE 1.15 달성</ins></div>
</div>

<div className="flex items-stretch hover:bg-surface-container-low transition-colors">
<div className="w-12 py-1 px-space-xs text-right text-text-muted select-none bg-surface-container/50">145</div>
<div className="w-12 py-1 px-space-xs text-right text-text-muted select-none bg-surface-container/30">145</div>
<div className="w-6 py-1 text-center text-text-muted select-none"> </div>
<div className="flex-1 py-1 px-space-sm text-text-primary overflow-x-auto whitespace-pre">를 목적으로 다음의 전력 효율 가이드라인을 엄격히 준수한다.</div>
</div>

<div className="flex items-stretch bg-diff-modified-bg text-diff-modified-text transition-colors">
<div className="w-12 py-1 px-space-xs text-right font-bold select-none bg-yellow-200/50">146</div>
<div className="w-12 py-1 px-space-xs text-right font-bold select-none bg-yellow-200/50">146</div>
<div className="w-6 py-1 text-center font-bold select-none">~</div>
<div className="flex-1 py-1 px-space-sm overflow-x-auto whitespace-pre font-semibold">연간 전력비: 184.2억원 -&gt; 112.8억원 (71.4억원 감축)</div>
</div>

<div className="flex items-stretch bg-diff-removed-bg text-diff-removed-text transition-colors">
<div className="w-12 py-1 px-space-xs text-right font-bold select-none bg-status-danger-bg">147</div>
<div className="w-12 py-1 px-space-xs text-right text-text-muted select-none opacity-20"> </div>
<div className="w-6 py-1 text-center font-bold select-none">-</div>
<div className="flex-1 py-1 px-space-sm overflow-x-auto whitespace-pre">[냉각수 배관 직경: 150mm STS 강관, 항온항습기 12기 병렬배치 구성]</div>
</div>

<div className="flex items-stretch bg-diff-added-bg text-diff-added-text transition-colors">
<div className="w-12 py-1 px-space-xs text-right text-text-muted select-none opacity-20"> </div>
<div className="w-12 py-1 px-space-xs text-right font-bold select-none bg-format-xlsx-bg">147</div>
<div className="w-6 py-1 text-center font-bold select-none">+</div>
<div className="flex-1 py-1 px-space-sm overflow-x-auto whitespace-pre">[불활성 유전체 절연유(Dielectric Fluid) 1차 탱크 8기 및 열교환기 4기 모듈]</div>
</div>

<div className="flex items-stretch hover:bg-surface-container-low transition-colors">
<div className="w-12 py-1 px-space-xs text-right text-text-muted select-none bg-surface-container/50">148</div>
<div className="w-12 py-1 px-space-xs text-right text-text-muted select-none bg-surface-container/30">148</div>
<div className="w-6 py-1 text-center text-text-muted select-none"> </div>
<div className="flex-1 py-1 px-space-sm text-text-secondary overflow-x-auto whitespace-pre">※ 세부 장비 납품 및 시운전 일정표는 별첨 F-3를 참조할 것.</div>
</div>
</div>

<div className="bg-surface-card rounded-xl p-space-md shadow-sm flex items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md min-w-0">
<div className="w-16 h-16 rounded-lg bg-surface-container flex items-center justify-center shrink-0 overflow-hidden">
<img className="w-full h-full object-cover" data-alt="Technical blueprint diagram comparing standard data center water chiller cooling pipes against modern immersion cooling tanks with dielectric fluids, clean minimal technical vector line art in enterprise slate and navy blue style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyVVtGME3ECNbS9FOKxzAmdOeFP5dwAoDBhCwrjLN1yjOmu0xcujNnt05C63cPvRKtP4NW_isAGeokUtKy-wpKk8_Fnp4Hs_OZ50o0DZlNzFVsCoQzsaaR0nPjdUtv1AKaBDprRSBAfyMRe-JuSSlKDSgxqxzfEfHXB27XJHexeBVSWVYQSHTZwqdGe4NBftQBCF6z4JYQF_5XyZol_J3Oph22BmJE8wrnm7QryOG1hkhZr1RNYHLMZw"/>
</div>
<div className="flex flex-col min-w-0">
<span className="font-body-semibold text-body-semibold text-text-primary truncate">냉각 시스템 아키텍처 변경 대조도 (참조 첨부)</span>
<span className="font-caption text-caption text-text-secondary truncate">도면 번호: DWG-DC-2026-COOL-01 &middot; 2개 문서 간 기술 불일치 자동 플래깅 완료</span>
</div>
</div>
<button className="px-space-md py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-caption text-caption font-semibold shrink-0" type="button">
            전체 도면 검토
          </button>
</div>
</section>
</div>

<section className="bg-surface-card rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<div className="w-7 h-7 rounded bg-surface-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[18px]">table_chart</span>
</div>
<h3 className="font-headline-md text-headline-md text-text-primary">표&middot;수치 변동 전용 분석 테이블 (Numerical Delta Matrix)</h3>
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label bg-status-local-bg text-status-local-text">정량적 검증 완료</span>
</div>
<div className="flex items-center gap-space-xs">
<button className="px-space-sm py-1 rounded bg-surface-container hover:bg-surface-container-high text-text-secondary font-caption text-caption" type="button">
            CSV 내보내기
          </button>
<button className="px-space-sm py-1 rounded bg-surface-container hover:bg-surface-container-high text-text-secondary font-caption text-caption" type="button">
            수치 변동만 필터
          </button>
</div>
</div>

<div className="overflow-x-auto rounded-lg">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container text-text-secondary font-caption text-caption uppercase">
<th className="py-2.5 px-space-md font-semibold">항목명</th>
<th className="py-2.5 px-space-md font-semibold">2025 기준안 (v1.2)</th>
<th className="py-2.5 px-space-md font-semibold">2026 수정안 (v2.0)</th>
<th className="py-2.5 px-space-md font-semibold">변동폭 (Delta)</th>
<th className="py-2.5 px-space-md font-semibold">비고 및 주요 원인</th>
</tr>
</thead>
<tbody className="divide-y divide-border-subtle font-body-dense text-body-dense">

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-space-md font-body-semibold text-body-semibold text-text-primary">총 사업비 (CAPEX)</td>
<td className="py-3 px-space-md font-code-mono text-code-mono text-text-secondary">350.0 억원</td>
<td className="py-3 px-space-md font-code-mono text-code-mono font-bold text-text-primary">421.4 억원</td>
<td className="py-3 px-space-md">
<span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded font-code-mono text-code-mono font-bold bg-diff-removed-bg text-diff-removed-text">
<span className="material-symbols-outlined text-[12px]">arrow_upward</span>
                  +71.4 억원 (+20.4%)
                </span>
</td>
<td className="py-3 px-space-md text-text-secondary">
                액침냉각 모듈 신규 편입 및 특수 유전체 냉매 초기 충진비 반영
              </td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-space-md font-body-semibold text-body-semibold text-text-primary">연간 목표 PUE</td>
<td className="py-3 px-space-md font-code-mono text-code-mono text-text-secondary">1.45</td>
<td className="py-3 px-space-md font-code-mono text-code-mono font-bold text-text-primary">1.15</td>
<td className="py-3 px-space-md">
<span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded font-code-mono text-code-mono font-bold bg-diff-added-bg text-diff-added-text">
<span className="material-symbols-outlined text-[12px]">arrow_downward</span>
                  -0.30 개선 (-20.7%)
                </span>
</td>
<td className="py-3 px-space-md text-text-secondary">
                글로벌 Tier 4 인증 기준 충족, 연간 전력비 71.4억원 지속 절감 효과
              </td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-space-md font-body-semibold text-body-semibold text-text-primary">계약 보증금율</td>
<td className="py-3 px-space-md font-code-mono text-code-mono text-text-secondary">10 %</td>
<td className="py-3 px-space-md font-code-mono text-code-mono font-bold text-text-primary">20 %</td>
<td className="py-3 px-space-md">
<span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded font-code-mono text-code-mono font-bold bg-diff-modified-bg text-diff-modified-text">
<span className="material-symbols-outlined text-[12px]">add</span>
                  +10 %p
                </span>
</td>
<td className="py-3 px-space-md text-text-secondary">
                위험관리 규정 및 이사회 승인 가이드라인 제4조에 의거 보증 요율 상향
              </td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="py-3 px-space-md font-body-semibold text-body-semibold text-text-primary">준공 및 시운전 일정</td>
<td className="py-3 px-space-md font-code-mono text-code-mono text-text-secondary">2026. 11. 30</td>
<td className="py-3 px-space-md font-code-mono text-code-mono font-bold text-text-primary">2026. 09. 30</td>
<td className="py-3 px-space-md">
<span className="inline-flex items-center gap-1 px-space-xs py-0.5 rounded font-code-mono text-code-mono font-bold bg-diff-added-bg text-diff-added-text">
<span className="material-symbols-outlined text-[12px]">schedule</span>
                  2개월 단축 (Early Completion)
                </span>
</td>
<td className="py-3 px-space-md text-text-secondary">
                모듈형 사전조립(Prefab) 공법 적용으로 현장 배관 공정 60일 축소
              </td>
</tr>
</tbody>
</table>
</div>
</section>
</div>
</div>

    </>
  );
}
