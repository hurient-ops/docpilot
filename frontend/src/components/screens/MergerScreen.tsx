import React from 'react';

export default function MergerScreen() {
  return (
    <>
      <div className="flex flex-col w-full">



<section className="w-full px-gutter pt-space-md pb-space-sm bg-surface-card shadow-sm flex flex-col gap-space-sm">
<div className="flex items-center justify-between flex-wrap gap-space-md">

<div className="flex items-center gap-space-sm min-w-0">
<div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shadow-sm shrink-0">
<span className="material-symbols-outlined text-[18px]">account_tree</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs text-text-muted font-caption text-caption">
<span>스마트 파이프라인</span>
<span className="material-symbols-outlined text-[12px]">chevron_right</span>
<span className="text-text-secondary font-medium">문서 조립 워크스페이스</span>
</div>
<h1 className="font-headline-md text-headline-md font-bold text-primary tracking-tight truncate">
            새 보고서 합성 파이프라인 (신규 오피스 생성 / 바이너리 변환)
          </h1>
</div>
</div>

<div className="flex items-center gap-space-md flex-wrap">

<div className="flex items-center p-0.5 rounded-lg bg-surface-container shadow-inner">
<button className="flex items-center gap-space-xs px-space-md py-1.5 rounded-lg bg-surface-card text-primary font-body-semibold text-body-dense shadow-sm transition-all" id="modeBtnReassembly" type="button">
<span className="material-symbols-outlined text-[15px] text-secondary">layers</span>
<span>바이너리 재조합 (오피스 합성)</span>
</button>
<button className="flex items-center gap-space-xs px-space-md py-1.5 rounded-lg text-text-secondary hover:text-primary font-body-dense text-body-dense transition-all" id="modeBtnConverter" type="button">
<span className="material-symbols-outlined text-[15px]">swap_horiz</span>
<span>PDF &rlarr; 5대 포맷 변환</span>
</button>
</div>

<div className="relative flex items-center">
<div className="absolute left-3 flex items-center pointer-events-none">
<span className="material-symbols-outlined text-[16px] text-secondary">style</span>
</div>
<select className="pl-8 pr-12 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer text-text-primary font-body-dense text-body-dense font-medium border border-border-subtle focus:outline-none focus:ring-1 focus:ring-secondary appearance-none">
<option value="none">[기본 원본 서식 유지]</option>
<option defaultValue="" value="pptx-a">[기업 표준 PPTX 템플릿 A - 전략기획실 공통]</option>
<option value="word-hwp">[기업 표준 Word/HWP 양식]</option>
</select>
<div className="absolute right-2 flex items-center pointer-events-none text-text-muted">
<span className="material-symbols-outlined text-[16px]">expand_more</span>
</div>
</div>

<button className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-text-secondary hover:text-primary flex items-center justify-center transition-colors" title="작업 히스토리 복원" type="button">
<span className="material-symbols-outlined text-[18px]">history</span>
</button>
</div>
</div>

<div className="w-full flex items-center justify-between px-space-md py-2 rounded-lg bg-gradient-to-r from-format-hwp-bg via-surface-container-low to-status-local-bg">
<div className="flex items-center gap-space-sm min-w-0">
<span className="material-symbols-outlined text-format-docx-text text-[18px] shrink-0">verified</span>
<p className="font-body-dense text-body-dense text-text-primary truncate">
<span className="font-body-semibold text-format-docx-text">호환성 사전 점검 완료:</span> 
          스캔본 비트맵 이미지 감지 2건
</p>
<label className="flex items-center gap-1.5 cursor-pointer text-status-local-text bg-status-local-bg/80 hover:bg-status-local-bg px-2 py-0.5 rounded font-body-semibold text-[12px] shadow-sm ml-2 border border-status-local-text/30 transition-colors">
<input className="text-status-local-text focus:ring-0 rounded-sm w-3.5 h-3.5 cursor-pointer" defaultChecked="" type="checkbox"/>
<span>Local OCR 적용</span>
</label>
</div>
<div className="flex items-center gap-space-sm shrink-0">
<span className="px-space-xs py-0.5 rounded bg-surface-card text-text-secondary font-code-mono text-caption shadow-xs">
          Engine: Tesseract v5 + CoreML v3.2
        </span>
<button className="font-caption text-caption text-secondary font-semibold hover:underline flex items-center gap-0.5" type="button">
          옵션 변경 <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
</button>
</div>
</div>
</section>

<div className="w-full px-gutter py-space-md grid grid-cols-12 gap-gutter items-start pb-24">

<section className="col-span-12 lg:col-span-5 flex flex-col gap-space-sm">

<div className="p-space-md rounded-xl bg-surface-card shadow-sm flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-[20px]">format_list_bulleted</span>
<div className="flex flex-col">
<h2 className="font-title-sm text-title-sm font-bold text-primary">합성 목차 및 추출 명세</h2>
<span className="font-caption text-caption text-text-muted">Outline Tree &amp; Slice Mapping</span>
</div>
</div>
<div className="flex items-center gap-space-xs">
<button className="px-space-sm py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-caption text-caption font-semibold flex items-center gap-1 transition-colors" type="button">
<span className="material-symbols-outlined text-[14px]">library_add</span>
<span>검색서재 추가</span>
</button>
<button className="px-space-md py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-caption text-caption font-semibold flex items-center gap-1 shadow-sm transition-all active:scale-95" type="button">
<span className="material-symbols-outlined text-[14px]">add</span>
<span>목차 노드 추가</span>
</button>
</div>
</div>

<div className="flex flex-col gap-space-sm">

<article className="p-space-md rounded-xl bg-surface-card shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-format-pptx-text"></div>
<div className="flex items-start justify-between gap-space-sm">
<div className="flex items-start gap-space-sm min-w-0">
<span className="material-symbols-outlined text-text-muted group-hover:text-text-secondary cursor-grab pt-0.5 text-[18px]">drag_indicator</span>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label bg-format-pptx-bg text-format-pptx-text border border-format-pptx-border">PPTX</span>
<h3 className="font-body-semibold text-body-semibold text-text-primary truncate">I. 2026 AI IDC 인프라 투자 개요</h3>
</div>
<div className="flex items-center gap-space-xs mt-1 text-text-secondary font-caption text-caption">
<span className="material-symbols-outlined text-[13px] text-text-muted">folder_open</span>
<span className="truncate max-w-[190px]">2026_ESG_인프라투자계획서.pptx</span>
<span className="text-border-strong">&bull;</span>
<span className="font-code-mono text-secondary font-medium">슬라이드 14~16</span>
</div>
</div>
</div>
<div className="flex items-center gap-space-xs shrink-0">
<span className="px-space-xs py-0.5 rounded bg-surface-container font-code-mono text-caption font-bold text-text-primary">3 Slides</span>
<button className="w-7 h-7 rounded hover:bg-surface-container text-text-secondary hover:text-primary flex items-center justify-center" title="슬라이드 미리보기" type="button">
<span className="material-symbols-outlined text-[16px]">visibility</span>
</button>
<button className="w-7 h-7 rounded hover:bg-format-pdf-bg text-text-secondary hover:text-format-pdf-text flex items-center justify-center" title="노드 삭제" type="button">
<span className="material-symbols-outlined text-[16px]">delete</span>
</button>
</div>
</div>

<div className="mt-space-sm pt-space-xs flex items-center justify-between bg-surface-container-low px-space-sm py-1.5 rounded-lg text-caption font-caption">
<div className="flex items-center gap-space-xs">
<span className="text-text-muted">추출 범위:</span>
<input className="w-14 px-1.5 py-0.5 bg-surface-card rounded font-code-mono text-center text-text-primary focus:outline-none focus:ring-1 focus:ring-secondary" type="text" value="14-16"/>
<span className="text-text-muted text-[10px]">(총 38P 중)</span>
</div>
<label className="flex items-center gap-1 cursor-pointer select-none text-text-secondary">
<input className="w-3.5 h-3.5 rounded text-secondary focus:ring-0" defaultChecked="" type="checkbox"/>
<span>슬라이드 마스터 강제 일치</span>
</label>
</div>
</article>

<article className="p-space-md rounded-xl bg-surface-card shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-format-pdf-text"></div>
<div className="flex items-start justify-between gap-space-sm">
<div className="flex items-start gap-space-sm min-w-0">
<span className="material-symbols-outlined text-text-muted group-hover:text-text-secondary cursor-grab pt-0.5 text-[18px]">drag_indicator</span>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label bg-format-pdf-bg text-format-pdf-text border border-format-pdf-border">PDF</span>
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label bg-status-local-bg text-status-local-text">OCR 활성</span>
<h3 className="font-body-semibold text-body-semibold text-text-primary truncate">II. 전력 소비량 및 PUE 효율성 검증</h3>
</div>
<div className="flex items-center gap-space-xs mt-1 text-text-secondary font-caption text-caption">
<span className="material-symbols-outlined text-[13px] text-text-muted">folder_open</span>
<span className="truncate max-w-[190px]">2025_4분기_데이터센터_에너지감사보고서.pdf</span>
<span className="text-border-strong">&bull;</span>
<span className="font-code-mono text-secondary font-medium">42p ~ 45p</span>
</div>
</div>
</div>
<div className="flex items-center gap-space-xs shrink-0">
<span className="px-space-xs py-0.5 rounded bg-surface-container font-code-mono text-caption font-bold text-text-primary">4 Pages</span>
<button className="w-7 h-7 rounded hover:bg-surface-container text-text-secondary hover:text-primary flex items-center justify-center" type="button">
<span className="material-symbols-outlined text-[16px]">visibility</span>
</button>
<button className="w-7 h-7 rounded hover:bg-format-pdf-bg text-text-secondary hover:text-format-pdf-text flex items-center justify-center" type="button">
<span className="material-symbols-outlined text-[16px]">delete</span>
</button>
</div>
</div>

<div className="mt-space-sm pt-space-xs flex items-center justify-between bg-surface-container-low px-space-sm py-1.5 rounded-lg text-caption font-caption">
<div className="flex items-center gap-space-xs">
<span className="text-text-muted">페이지 지정:</span>
<input className="w-24 px-1.5 py-0.5 bg-surface-card rounded font-code-mono text-center text-text-primary focus:outline-none focus:ring-1 focus:ring-secondary" type="text" value="42, 43, 44, 45"/>
</div>
<span className="flex items-center gap-1 text-status-local-text font-medium">
<span className="material-symbols-outlined text-[14px]">spellcheck</span>
              벡터 텍스트 + 테이블 객체 추출
            </span>
</div>
</article>

<article className="p-space-md rounded-xl bg-surface-card shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-format-xlsx-text"></div>
<div className="flex items-start justify-between gap-space-sm">
<div className="flex items-start gap-space-sm min-w-0">
<span className="material-symbols-outlined text-text-muted group-hover:text-text-secondary cursor-grab pt-0.5 text-[18px]">drag_indicator</span>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label bg-format-xlsx-bg text-format-xlsx-text border border-format-xlsx-border">XLSX</span>
<h3 className="font-body-semibold text-body-semibold text-text-primary truncate">III. 한전 요금 단가 변동 시뮬레이션</h3>
</div>
<div className="flex items-center gap-space-xs mt-1 text-text-secondary font-caption text-caption">
<span className="material-symbols-outlined text-[13px] text-text-muted">table_view</span>
<span className="truncate max-w-[170px]">IDC_전력사용단가_비교시뮬레이션_v4.xlsx</span>
<span className="text-border-strong">&bull;</span>
<span className="font-code-mono text-format-xlsx-text font-medium">'비용시뮬레이션'!C12:F48</span>
</div>
</div>
</div>
<div className="flex items-center gap-space-xs shrink-0">
<span className="px-space-xs py-0.5 rounded bg-format-xlsx-bg text-format-xlsx-text font-code-mono text-caption font-bold">1개 표 개체</span>
<button className="w-7 h-7 rounded hover:bg-surface-container text-text-secondary hover:text-primary flex items-center justify-center" type="button">
<span className="material-symbols-outlined text-[16px]">visibility</span>
</button>
<button className="w-7 h-7 rounded hover:bg-format-pdf-bg text-text-secondary hover:text-format-pdf-text flex items-center justify-center" type="button">
<span className="material-symbols-outlined text-[16px]">delete</span>
</button>
</div>
</div>

<div className="mt-space-sm pt-space-xs flex items-center justify-between bg-surface-container-low px-space-sm py-1.5 rounded-lg text-caption font-caption">
<div className="flex items-center gap-space-xs">
<span className="text-text-muted">시트/셀:</span>
<span className="font-code-mono text-text-primary font-medium">Sheet1 &rarr; C12:F48</span>
</div>
<label className="flex items-center gap-1 cursor-pointer select-none text-text-secondary">
<input className="w-3.5 h-3.5 rounded text-secondary focus:ring-0" defaultChecked="" type="checkbox"/>
<span>수식 보존형 오피스 네이티브 표로 변환</span>
</label>
</div>
</article>

<article className="p-space-md rounded-xl bg-surface-card shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-format-hwp-text"></div>
<div className="flex items-start justify-between gap-space-sm">
<div className="flex items-start gap-space-sm min-w-0">
<span className="material-symbols-outlined text-text-muted group-hover:text-text-secondary cursor-grab pt-0.5 text-[18px]">drag_indicator</span>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs flex-wrap">
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label bg-format-hwp-bg text-format-hwp-text border border-format-hwp-border">HWPX</span>
<h3 className="font-body-semibold text-body-semibold text-text-primary truncate">IV. 과기정통부 친환경 데이터센터 가이드라인</h3>
</div>
<div className="flex items-center gap-space-xs mt-1 text-text-secondary font-caption text-caption">
<span className="material-symbols-outlined text-[13px] text-text-muted">article</span>
<span className="truncate max-w-[170px]">국내외_친환경_데이터센터_가이드라인_검토.hwpx</span>
<span className="text-border-strong">&bull;</span>
<span className="font-code-mono text-format-hwp-text font-medium">8p [표 2-1]</span>
</div>
</div>
</div>
<div className="flex items-center gap-space-xs shrink-0">
<span className="px-space-xs py-0.5 rounded bg-format-hwp-bg text-format-hwp-text font-code-mono text-caption font-bold">1개 복합 표</span>
<button className="w-7 h-7 rounded hover:bg-surface-container text-text-secondary hover:text-primary flex items-center justify-center" type="button">
<span className="material-symbols-outlined text-[16px]">visibility</span>
</button>
<button className="w-7 h-7 rounded hover:bg-format-pdf-bg text-text-secondary hover:text-format-pdf-text flex items-center justify-center" type="button">
<span className="material-symbols-outlined text-[16px]">delete</span>
</button>
</div>
</div>

<div className="mt-space-sm pt-space-xs flex items-center justify-between bg-surface-container-low px-space-sm py-1.5 rounded-lg text-caption font-caption">
<div className="flex items-center gap-space-xs">
<span className="text-text-muted">요소 태그:</span>
<span className="font-code-mono bg-surface-card px-1.5 py-0.5 rounded text-text-primary">HWP_TABLE_ID#2041</span>
</div>
<span className="text-text-muted">폰트 스타일 자동 치환 (함초롬돋움 &rarr; 프리텐다드)</span>
</div>
</article>

<div className="p-space-lg rounded-xl bg-surface-container-low border-2 border-dashed border-border-strong flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-[28px] text-secondary mb-1">library_books</span>
<span className="font-body-semibold text-body-semibold text-primary">파일 서재 또는 검색 결과에서 드래그하여 목차 추가</span>
<span className="font-caption text-caption text-text-muted mt-0.5">PDF, HWP, HWPX, DOCX, XLSX, PPTX 문서 바이트 슬라이스 지원</span>
</div>
</div>
</section>

<section className="col-span-12 lg:col-span-7 flex flex-col gap-space-sm">

<div className="p-space-md rounded-xl bg-surface-card shadow-sm flex items-center justify-between flex-wrap gap-space-sm">
<div className="flex items-center gap-space-sm">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-[20px]">grid_view</span>
<h2 className="font-title-sm text-title-sm font-bold text-primary">실시간 페이지 레이아웃 프리뷰</h2>
</div>
<span className="px-space-xs py-0.5 rounded bg-surface-container font-code-mono text-caption text-text-secondary">
            총 9페이지 / 예상 용량 14.2MB
          </span>
</div>

<div className="flex items-center gap-space-xs">
<div className="flex items-center p-0.5 rounded bg-surface-container text-text-secondary">
<button className="px-2 py-0.5 hover:text-primary font-caption text-caption font-medium" type="button">75%</button>
<button className="px-2 py-0.5 bg-surface-card rounded shadow-xs text-primary font-caption text-caption font-bold" type="button">100%</button>
<button className="px-2 py-0.5 hover:text-primary font-caption text-caption font-medium" type="button">Fit</button>
</div>
<button className="px-space-sm py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-caption text-caption font-semibold flex items-center gap-1 transition-colors" type="button">
<span className="material-symbols-outlined text-[14px]">auto_fix_high</span>
<span>페이지 순서 자동 정렬</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-space-md">

<div className="group relative rounded-xl bg-surface-card shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col cursor-move">

<div className="px-space-sm py-1.5 bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-text-muted">drag_handle</span>
<span className="font-code-mono text-caption font-bold text-text-primary">#1 (P.1)</span>
</div>
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label bg-format-pptx-bg text-format-pptx-text border border-format-pptx-border">PPTX</span>
</div>

<div className="relative w-full aspect-[16/10] bg-surface-container p-space-sm flex flex-col justify-between overflow-hidden">
<div className="flex items-center justify-between">
<div className="h-2 w-16 bg-primary rounded"></div>
<span className="font-code-mono text-[9px] text-text-muted">MASTER A</span>
</div>

<div className="w-full flex items-end gap-1.5 h-14 pt-2">
<div className="w-1/4 h-60% bg-secondary rounded-t"></div>
<div className="w-1/4 h-85% bg-secondary-container rounded-t"></div>
<div className="w-1/4 h-40% bg-primary rounded-t"></div>
<div className="w-1/4 h-100% bg-secondary rounded-t"></div>
</div>
<div className="text-[9px] font-caption text-text-muted truncate">
              2026 AI 데이터센터 설비투자 집행계획
            </div>

<div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-primary/80 backdrop-blur text-on-primary font-caption text-[9px] tracking-tight">
              Lineage: 2026_ESG... Slide 14
            </div>
</div>

<div className="p-space-xs px-space-sm bg-surface-card flex items-center justify-between text-caption font-caption text-text-muted">
<span className="truncate">벡터 셰이프 원본 유지</span>
<span className="text-security-dlp-pass flex items-center gap-0.5 font-medium"><span className="material-symbols-outlined text-[12px]">check_circle</span>정상</span>
</div>
</div>

<div className="group relative rounded-xl bg-surface-card shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col cursor-move">
<div className="px-space-sm py-1.5 bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-text-muted">drag_handle</span>
<span className="font-code-mono text-caption font-bold text-text-primary">#2 (P.2)</span>
</div>
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label bg-format-pptx-bg text-format-pptx-text border border-format-pptx-border">PPTX</span>
</div>
<div className="relative w-full aspect-[16/10] bg-surface-container p-space-sm flex flex-col justify-between overflow-hidden">
<div className="flex items-center justify-between">
<div className="h-2 w-20 bg-secondary rounded"></div>
<span className="font-code-mono text-[9px] text-text-muted">MASTER A</span>
</div>

<div className="grid grid-cols-3 gap-1 my-auto">
<div className="bg-surface-card p-1 rounded shadow-xs flex flex-col gap-0.5">
<div className="h-1.5 w-6 bg-border-strong rounded"></div>
<div className="h-1 w-full bg-border-subtle rounded"></div>
</div>
<div className="bg-surface-card p-1 rounded shadow-xs flex flex-col gap-0.5">
<div className="h-1.5 w-6 bg-border-strong rounded"></div>
<div className="h-1 w-full bg-border-subtle rounded"></div>
</div>
<div className="bg-surface-card p-1 rounded shadow-xs flex flex-col gap-0.5">
<div className="h-1.5 w-6 bg-border-strong rounded"></div>
<div className="h-1 w-full bg-border-subtle rounded"></div>
</div>
</div>
<div className="text-[9px] font-caption text-text-muted truncate">
              연간 단계별 GPU 클러스터 증설 타임라인
            </div>
<div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-primary/80 backdrop-blur text-on-primary font-caption text-[9px]">
              Lineage: 2026_ESG... Slide 15
            </div>
</div>
<div className="p-space-xs px-space-sm bg-surface-card flex items-center justify-between text-caption font-caption text-text-muted">
<span className="truncate">글꼴: Inter / Pretendard</span>
<span className="text-security-dlp-pass flex items-center gap-0.5 font-medium"><span className="material-symbols-outlined text-[12px]">check_circle</span>정상</span>
</div>
</div>

<div className="group relative rounded-xl bg-surface-card shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col cursor-move ring-2 ring-secondary/30">
<div className="px-space-sm py-1.5 bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-text-muted">drag_handle</span>
<span className="font-code-mono text-caption font-bold text-text-primary">#3 (P.3)</span>
</div>
<div className="flex items-center gap-1">
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label bg-status-local-bg text-status-local-text">OCR 재구성</span>
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label bg-format-pdf-bg text-format-pdf-text border border-format-pdf-border">PDF</span>
</div>
</div>
<div className="relative w-full aspect-[16/10] bg-surface-canvas p-space-sm flex flex-col justify-between overflow-hidden">

<div className="space-y-1">
<div className="h-2 w-28 bg-text-primary rounded"></div>
<div className="h-1.5 w-full bg-border-strong rounded"></div>
<div className="h-1.5 w-4/5 bg-border-subtle rounded"></div>
</div>

<div className="bg-surface-card rounded p-1 shadow-xs border border-border-subtle space-y-0.5">
<div className="h-1.5 bg-surface-container rounded"></div>
<div className="h-1 bg-border-subtle rounded"></div>
<div className="h-1 bg-border-subtle rounded"></div>
</div>
<div className="text-[9px] font-caption text-text-muted truncate">
              [발췌] PUE 지수 연도별 감사 및 쿨링 전력
            </div>
<div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-primary/80 backdrop-blur text-on-primary font-caption text-[9px]">
              Lineage: 에너지감사보고서.pdf p.42
            </div>
</div>
<div className="p-space-xs px-space-sm bg-surface-card flex items-center justify-between text-caption font-caption text-text-muted">
<span className="text-secondary font-medium">자동 텍스트 상자화</span>
<span className="text-security-dlp-pass flex items-center gap-0.5 font-medium"><span className="material-symbols-outlined text-[12px]">verified</span>DLP Safe</span>
</div>
</div>

<div className="group relative rounded-xl bg-surface-card shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col cursor-move">
<div className="px-space-sm py-1.5 bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-text-muted">drag_handle</span>
<span className="font-code-mono text-caption font-bold text-text-primary">#4 (P.4)</span>
</div>
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label bg-format-pdf-bg text-format-pdf-text border border-format-pdf-border">PDF</span>
</div>
<div className="relative w-full aspect-[16/10] bg-surface-canvas p-space-sm flex flex-col justify-between overflow-hidden">
<div className="space-y-1">
<div className="h-2 w-24 bg-text-primary rounded"></div>
<div className="grid grid-cols-2 gap-1 pt-1">
<div className="h-8 bg-surface-container rounded"></div>
<div className="h-8 bg-surface-container-high rounded flex items-center justify-center">
<span className="material-symbols-outlined text-[14px] text-text-muted">pie_chart</span>
</div>
</div>
</div>
<div className="text-[9px] font-caption text-text-muted truncate">
              [통계] 냉각 수자원 재활용 비율 산출도
            </div>
<div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-primary/80 backdrop-blur text-on-primary font-caption text-[9px]">
              Lineage: 에너지감사보고서.pdf p.43
            </div>
</div>
<div className="p-space-xs px-space-sm bg-surface-card flex items-center justify-between text-caption font-caption text-text-muted">
<span className="truncate">비트맵 차트 &rarr; 600DPI 렌더</span>
<span className="text-security-dlp-pass flex items-center gap-0.5 font-medium"><span className="material-symbols-outlined text-[12px]">check_circle</span>정상</span>
</div>
</div>

<div className="group relative rounded-xl bg-surface-card shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col cursor-move">
<div className="px-space-sm py-1.5 bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-text-muted">drag_handle</span>
<span className="font-code-mono text-caption font-bold text-text-primary">#5 (P.5)</span>
</div>
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label bg-format-xlsx-bg text-format-xlsx-text border border-format-xlsx-border">XLSX</span>
</div>
<div className="relative w-full aspect-[16/10] bg-surface-container p-space-sm flex flex-col justify-between overflow-hidden">
<div className="flex items-center justify-between">
<span className="font-code-mono text-[9px] font-semibold text-format-xlsx-text">수식 연결 표 (Table Object)</span>
<span className="material-symbols-outlined text-[14px] text-format-xlsx-text">calculate</span>
</div>

<div className="bg-surface-card rounded p-1 space-y-0.5 shadow-xs">
<div className="grid grid-cols-4 gap-0.5 bg-format-xlsx-bg p-0.5 rounded text-[8px] font-code-mono font-bold text-format-xlsx-text">
<div>구분</div><div>2024</div><div>2025</div><div>2026(E)</div>
</div>
<div className="grid grid-cols-4 gap-0.5 text-[7px] font-code-mono text-text-secondary px-0.5">
<div>산업용(을)</div><div>154.2</div><div>168.9</div><div className="text-secondary font-bold">189.4</div>
</div>
<div className="grid grid-cols-4 gap-0.5 text-[7px] font-code-mono text-text-secondary px-0.5">
<div>누적비용</div><div>12.8억</div><div>15.1억</div><div className="text-secondary font-bold">19.3억</div>
</div>
</div>
<div className="text-[9px] font-caption text-text-muted truncate">
              비용시뮬레이션 범위 C12:F48
            </div>
<div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-primary/80 backdrop-blur text-on-primary font-caption text-[9px]">
              Lineage: 시뮬레이션_v4.xlsx
            </div>
</div>
<div className="p-space-xs px-space-sm bg-surface-card flex items-center justify-between text-caption font-caption text-text-muted">
<span className="text-format-xlsx-text font-medium">Office Native Table</span>
<span className="text-security-dlp-pass flex items-center gap-0.5 font-medium"><span className="material-symbols-outlined text-[12px]">check_circle</span>정상</span>
</div>
</div>

<div className="group relative rounded-xl bg-surface-card shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col cursor-move">
<div className="px-space-sm py-1.5 bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-text-muted">drag_handle</span>
<span className="font-code-mono text-caption font-bold text-text-primary">#6 (P.6)</span>
</div>
<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label bg-format-hwp-bg text-format-hwp-text border border-format-hwp-border">HWPX</span>
</div>
<div className="relative w-full aspect-[16/10] bg-surface-container p-space-sm flex flex-col justify-between overflow-hidden">
<div className="flex items-center justify-between">
<span className="font-code-mono text-[9px] font-semibold text-format-hwp-text">한글 표 바이너리 복원</span>
<span className="material-symbols-outlined text-[14px] text-format-hwp-text">difference</span>
</div>

<div className="bg-surface-card rounded p-1 space-y-0.5 shadow-xs border border-border-subtle">
<div className="bg-format-hwp-bg/50 p-1 text-[8px] font-caption font-bold text-text-primary">
                [표 2-1] 친환경 IDC 인증 요건 및 등급 기준
              </div>
<div className="grid grid-cols-3 gap-0.5 text-[7px] font-caption text-text-secondary px-0.5">
<div>1등급 (최우수)</div><div>PUE 1.3 이하</div><div>100% RE100</div>
</div>
<div className="grid grid-cols-3 gap-0.5 text-[7px] font-caption text-text-secondary px-0.5">
<div>2등급 (우수)</div><div>PUE 1.5 이하</div><div>50% 매칭</div>
</div>
</div>
<div className="text-[9px] font-caption text-text-muted truncate">
              HWPX_CELL_STYLE 자동 사상 완료
            </div>
<div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-primary/80 backdrop-blur text-on-primary font-caption text-[9px]">
              Lineage: 가이드라인.hwpx p.8
            </div>
</div>
<div className="p-space-xs px-space-sm bg-surface-card flex items-center justify-between text-caption font-caption text-text-muted">
<span className="text-format-hwp-text font-medium">한글 문단 서식 변환</span>
<span className="text-security-dlp-pass flex items-center gap-0.5 font-medium"><span className="material-symbols-outlined text-[12px]">check_circle</span>정상</span>
</div>
</div>
</div>

<div className="p-space-md rounded-xl bg-surface-card shadow-sm flex items-center justify-between mt-space-xs">
<div className="flex items-center gap-space-sm">
<div className="w-8 h-8 rounded-full bg-status-local-bg text-status-local-text flex items-center justify-center font-bold">
            +3
          </div>
<div className="flex flex-col">
<span className="font-body-semibold text-body-semibold text-text-primary">나머지 3개 슬라이드/페이지가 대기열에 있습니다</span>
<span className="font-caption text-caption text-text-muted">부록 및 서지정보 슬라이드 (P.7 ~ P.9)</span>
</div>
</div>
<button className="px-space-md py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-caption text-caption font-semibold" type="button">
          전체 9페이지 펼쳐보기
        </button>
</div>
</section>
</div>

<div className="fixed bottom-7 left-64 right-0 z-40 bg-surface-card/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,21,47,0.06)] px-gutter py-2.5 flex items-center justify-between gap-space-md flex-wrap">

<div className="flex items-center gap-space-md">
<span className="font-caption text-caption font-bold text-text-secondary uppercase">출력 포맷:</span>
<div className="flex items-center gap-space-sm">
<label className="flex items-center gap-1.5 px-space-sm py-1 rounded-lg bg-format-pptx-bg text-format-pptx-text font-body-semibold text-body-dense cursor-pointer shadow-xs">
<input className="text-format-pptx-text focus:ring-0" defaultChecked="" name="output_fmt" type="radio"/>
<span>PPTX (오피스 원본 서식)</span>
</label>
<label className="flex items-center gap-1.5 px-space-sm py-1 rounded-lg hover:bg-surface-container text-text-secondary font-body-dense text-body-dense cursor-pointer transition-colors">
<input className="text-secondary focus:ring-0" name="output_fmt" type="radio"/>
<span>PDF (인쇄용 단일 문서)</span>
</label>
<label className="flex items-center gap-1.5 px-space-sm py-1 rounded-lg hover:bg-surface-container text-text-secondary font-body-dense text-body-dense cursor-pointer transition-colors">
<input className="text-secondary focus:ring-0" name="output_fmt" type="radio"/>
<span>DOCX</span>
</label>
<label className="flex items-center gap-1.5 px-space-sm py-1 rounded-lg hover:bg-surface-container text-text-secondary font-body-dense text-body-dense cursor-pointer transition-colors">
<input className="text-secondary focus:ring-0" name="output_fmt" type="radio"/>
<span>HWPX</span>
</label>
</div>
</div>

<div className="flex items-center gap-space-xs max-w-xl min-w-0 bg-surface-container px-space-sm py-1 rounded-lg">
<span className="material-symbols-outlined text-[15px] text-text-muted shrink-0">save_as</span>
<span className="font-code-mono text-caption text-text-primary truncate">
        D:\Enterprise_Data\2026_전략기획실\Output\2026_AI_IDC_통합보고서_합성본.pptx
      </span>
<button className="text-secondary font-caption text-caption font-semibold shrink-0 hover:underline ml-1" type="button">
        경로 변경
      </button>
</div>

<div className="flex items-center gap-space-md shrink-0">
<div className="flex items-center gap-1.5 px-space-sm py-1 rounded-lg bg-status-local-bg text-security-dlp-pass font-caption text-caption font-semibold">
<span className="material-symbols-outlined text-[15px]">verified_user</span>
<span>DLP 보안 검사: 0건 검출 (Safe)</span>
</div>
<button className="flex items-center gap-space-xs px-space-lg py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-body-semibold text-body-default shadow-md hover:shadow-lg transition-all active:scale-98" id="executeMergeBtn" type="button">
<span className="material-symbols-outlined text-[18px] text-tertiary-fixed animate-pulse">bolt</span>
<span>비파괴 바이너리 병합 실행 (F5)</span>
</button>
</div>
</div>


</div>
    </>
  );
}
