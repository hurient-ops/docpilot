import React from 'react';

export default function HistoryScreen() {
  return (
    <>
      <div className="flex flex-col w-full">

<section className="p-space-lg bg-surface-card shadow-sm">
<div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
<div>
<div className="flex items-center gap-space-sm mb-1">
<span className="px-2 py-0.5 rounded bg-primary-container text-white font-badge-label text-badge-label tracking-wider uppercase">Engine Operations</span>
<span className="font-caption text-caption text-text-secondary">Tauri Core RPC &bull; v3.2.4-hotfix</span>
</div>
<div className="flex items-baseline gap-space-md">
<h1 className="font-display-lg text-display-lg text-text-primary tracking-tight">작업 내역 로그 &amp; 작업 제어 센터</h1>
<span className="font-caption text-caption text-text-secondary hidden sm:inline">로컬 파이프라인 무결성 감시 및 비동기 작업 큐 실시간 스케줄러</span>
</div>
</div>

<div className="flex items-center gap-space-sm self-start xl:self-auto flex-wrap">
<button className="h-8 px-space-md rounded bg-surface-container hover:bg-surface-variant text-text-secondary hover:text-text-primary font-body-semibold text-body-semibold transition-colors flex items-center gap-1.5 shadow-sm" id="btn-purge-logs">
<span className="material-symbols-outlined text-[16px]">cleaning_services</span>
<span>로그 정리</span>
</button>
<button className="h-8 px-space-md rounded bg-surface-container hover:bg-surface-variant text-text-secondary hover:text-text-primary font-body-semibold text-body-semibold transition-colors flex items-center gap-1.5 shadow-sm" id="btn-export-all-diag">
<span className="material-symbols-outlined text-[16px]">ios_share</span>
<span>진단 패키지 (.tar.gz)</span>
</button>
<button className="h-8 px-space-md rounded bg-status-danger-bg hover:bg-format-pdf-border text-status-danger-text font-body-semibold text-body-semibold transition-colors flex items-center gap-1.5 shadow-sm" id="btn-emergency-halt">
<span className="material-symbols-outlined text-[16px]">pause_circle</span>
<span>모든 큐 일시정단</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mt-space-lg">

<div className="bg-surface-canvas p-space-md rounded shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
<div className="flex items-center justify-between">
<span className="font-caption text-caption uppercase text-text-secondary font-semibold">누적 처리 작업</span>
<span className="material-symbols-outlined text-[18px] text-secondary">layers</span>
</div>
<div className="mt-2 flex items-baseline gap-space-sm">
<span className="font-display-lg text-display-lg text-text-primary font-bold">1,428</span>
<span className="font-caption text-caption text-text-secondary">건 완료</span>
</div>
<div className="mt-space-sm flex items-center justify-between pt-space-xs bg-surface-card px-2 py-1 rounded">
<div className="flex items-center gap-1 text-diff-added-text">
<span className="material-symbols-outlined text-[14px]">trending_up</span>
<span className="font-code-mono text-code-mono font-semibold">+34건 오늘 실행</span>
</div>
<span className="font-badge-label text-badge-label text-text-muted">성공률 99.86%</span>
</div>

<div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary-container/20">
<div className="h-full bg-secondary"></div>
</div>
</div>

<div className="bg-surface-canvas p-space-md rounded shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
<div className="flex items-center justify-between">
<span className="font-caption text-caption uppercase text-text-secondary font-semibold">평균 바이너리 병합</span>
<span className="material-symbols-outlined text-[18px] text-format-pptx-text">speed</span>
</div>
<div className="mt-2 flex items-baseline gap-space-sm">
<span className="font-display-lg text-display-lg text-text-primary font-bold">1.84</span>
<span className="font-caption text-caption text-text-secondary">초 / 작업</span>
</div>
<div className="mt-space-sm flex items-center justify-between pt-space-xs bg-surface-card px-2 py-1 rounded">
<span className="font-code-mono text-code-mono text-format-pptx-text font-semibold">OpenXML 무손실 파싱</span>
<span className="font-badge-label text-badge-label text-text-muted">Direct Memory Map</span>
</div>
<div className="absolute bottom-0 left-0 right-0 h-1 bg-format-pptx-border">
<div className="h-full bg-format-pptx-text"></div>
</div>
</div>

<div className="bg-surface-canvas p-space-md rounded shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
<div className="flex items-center justify-between">
<span className="font-caption text-caption uppercase text-text-secondary font-semibold">벡터 증분 색인</span>
<span className="material-symbols-outlined text-[18px] text-security-dlp-pass">database</span>
</div>
<div className="mt-2 flex items-baseline gap-space-sm">
<span className="font-display-lg text-display-lg text-text-primary font-bold">3,840</span>
<span className="font-caption text-caption text-text-secondary">/ 3,840 건</span>
</div>
<div className="mt-space-sm flex items-center justify-between pt-space-xs bg-surface-card px-2 py-1 rounded">
<span className="flex items-center gap-1 font-caption text-caption text-security-dlp-pass font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-security-dlp-pass"></span>
            100% 최신 동기화
          </span>
<span className="font-code-mono text-code-mono text-text-muted">BGE-M3 (0-Loss)</span>
</div>
<div className="absolute bottom-0 left-0 right-0 h-1 bg-format-xlsx-border">
<div className="h-full bg-security-dlp-pass"></div>
</div>
</div>

<div className="bg-surface-canvas p-space-md rounded shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
<div className="flex items-center justify-between">
<span className="font-caption text-caption uppercase text-text-secondary font-semibold">격리된 실패/오류</span>
<span className="material-symbols-outlined text-[18px] text-status-danger-text">error_outline</span>
</div>
<div className="mt-2 flex items-baseline gap-space-sm">
<span className="font-display-lg text-display-lg text-status-danger-text font-bold">2</span>
<span className="font-caption text-caption text-text-secondary">건 조치 필요</span>
</div>
<div className="mt-space-sm flex items-center justify-between pt-space-xs bg-surface-card px-2 py-1 rounded">
<span className="font-caption text-caption text-status-danger-text truncate">암호 잠김 1 &bull; 손상 헤더 1</span>
<span className="font-badge-label text-badge-label text-status-danger-text uppercase font-bold">Check Req</span>
</div>
<div className="absolute bottom-0 left-0 right-0 h-1 bg-status-danger-bg">
<div className="h-full bg-status-danger-text"></div>
</div>
</div>
</div>
</section>

<section className="px-space-lg pt-space-md pb-space-sm bg-surface-canvas">
<div className="p-space-sm bg-surface-card rounded shadow-sm flex flex-col gap-space-sm">

<div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-sm">

<div className="relative flex-1 min-w-[280px]">
<span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[18px] text-text-secondary">search</span>
<input className="w-full h-8 pl-8 pr-8 bg-surface-container rounded font-body-default text-body-default text-text-primary placeholder:text-text-muted focus:bg-surface-card focus:outline-none transition-colors" id="job-search-input" placeholder="작업 ID 또는 대상 파일명 검색... (예: JOB-2026, IDC_통합보고서, .xlsx)" type="text"/>
<button className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary hidden" id="job-search-clear">
<span className="material-symbols-outlined text-[16px]">close</span>
</button>
</div>

<div className="flex items-center gap-space-sm shrink-0">
<div className="flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded text-text-secondary">
<span className="material-symbols-outlined text-[16px]">calendar_today</span>
<select className="bg-transparent font-caption text-caption text-text-primary focus:outline-none cursor-pointer" id="time-range-select">
<option value="today">오늘 (24시간)</option>
<option defaultValue="" value="7d">최근 7일</option>
<option value="30d">최근 30일</option>
<option value="custom">사용자 지정 기간</option>
</select>
</div>
<button className="h-8 px-space-md rounded bg-surface-container hover:bg-surface-variant text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1 font-caption text-caption" id="btn-refresh-jobs">
<span className="material-symbols-outlined text-[16px]">refresh</span>
<span className="hidden sm:inline">새로고침</span>
</button>
</div>
</div>

<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm pt-space-xs bg-surface-canvas/50 p-2 rounded">

<div className="flex items-center gap-1 flex-wrap">
<span className="font-caption text-caption text-text-secondary uppercase font-semibold mr-1">상태:</span>
<button className="filter-status-btn px-2.5 py-1 rounded bg-primary-container text-white font-badge-label text-badge-label shadow-sm" data-status="all">
            전체 (5)
          </button>
<button className="filter-status-btn px-2.5 py-1 rounded bg-surface-container text-text-secondary hover:text-text-primary font-badge-label text-badge-label transition-colors" data-status="success">
            완료 (Success) (2)
          </button>
<button className="filter-status-btn px-2.5 py-1 rounded bg-surface-container text-text-secondary hover:text-text-primary font-badge-label text-badge-label transition-colors" data-status="inflight">
            진행 중 (In-Flight) (1)
          </button>
<button className="filter-status-btn px-2.5 py-1 rounded bg-surface-container text-text-secondary hover:text-text-primary font-badge-label text-badge-label transition-colors" data-status="failed">
            오류/중단 (Failed) (2)
          </button>
</div>

<div className="flex items-center gap-1.5 flex-wrap">
<span className="font-caption text-caption text-text-secondary uppercase font-semibold mr-1">작업 유형:</span>
<button className="filter-type-btn px-2 py-0.5 rounded bg-surface-card text-text-primary font-badge-label text-badge-label shadow-sm" data-type="all">전체</button>
<button className="filter-type-btn px-2 py-0.5 rounded bg-surface-container text-text-secondary hover:text-text-primary font-badge-label text-badge-label transition-colors" data-type="index">증분 색인</button>
<button className="filter-type-btn px-2 py-0.5 rounded bg-surface-container text-text-secondary hover:text-text-primary font-badge-label text-badge-label transition-colors" data-type="merge">바이너리 병합</button>
<button className="filter-type-btn px-2 py-0.5 rounded bg-surface-container text-text-secondary hover:text-text-primary font-badge-label text-badge-label transition-colors" data-type="ocr">PDF 양방향 변환</button>
<button className="filter-type-btn px-2 py-0.5 rounded bg-surface-container text-text-secondary hover:text-text-primary font-badge-label text-badge-label transition-colors" data-type="diff">다중 문서 Diff</button>
<button className="filter-type-btn px-2 py-0.5 rounded bg-surface-container text-text-secondary hover:text-text-primary font-badge-label text-badge-label transition-colors" data-type="dlp">DLP 마스킹</button>
</div>
</div>
</div>
</section>

<section className="p-space-lg pt-space-xs flex-1 flex flex-col">
<div className="bg-surface-card rounded shadow-sm overflow-hidden flex flex-col">

<div className="overflow-x-auto w-full">
<table className="w-full text-left border-collapse">

<thead className="bg-surface-canvas text-text-secondary font-caption text-caption uppercase select-none">
<tr>
<th className="py-2.5 px-3 w-10 text-center" scope="col">
<input className="rounded bg-surface-container cursor-pointer" id="check-all-jobs" type="checkbox"/>
</th>
<th className="py-2.5 px-3 min-w-[130px]" scope="col">작업 ID</th>
<th className="py-2.5 px-3 min-w-[110px]" scope="col">작업 유형</th>
<th className="py-2.5 px-3 min-w-[320px]" scope="col">작업명 및 대상 파일 요약</th>
<th className="py-2.5 px-3 min-w-[130px]" scope="col">처리 볼륨 / 페이지</th>
<th className="py-2.5 px-3 min-w-[90px]" scope="col">소요 시간</th>
<th className="py-2.5 px-3 min-w-[130px]" scope="col">실행 일시</th>
<th className="py-2.5 px-3 min-w-[140px]" scope="col">상태</th>
<th className="py-2.5 px-3 min-w-[130px]" scope="col">시스템 리소스</th>
<th className="py-2.5 px-3 min-w-[190px] text-right" scope="col">작업 제어 및 액션</th>
</tr>
</thead>

<tbody className="font-body-default text-body-default divide-y-0" id="job-table-body">

<tr className="job-row hover:bg-surface-container/60 transition-colors cursor-pointer bg-surface-card" data-job="JOB-20260218-0941" data-status="success" data-type="merge">
<td className="py-2.5 px-3 text-center">
<input className="job-checkbox rounded bg-surface-container cursor-pointer" type="checkbox"/>
</td>
<td className="py-2.5 px-3 font-code-mono text-code-mono text-primary font-semibold">
                JOB-20260218-0941
              </td>
<td className="py-2.5 px-3">
<span className="px-2 py-0.5 rounded bg-format-pptx-bg text-format-pptx-text font-badge-label text-badge-label uppercase inline-block">
                  바이너리 병합
                </span>
</td>
<td className="py-2.5 px-3">
<div className="flex flex-col">
<span className="text-text-primary font-body-semibold truncate max-w-md">2026_AI_IDC_통합보고서_합성본.pptx 생성</span>
<span className="font-caption text-caption text-text-secondary truncate max-w-md">4종 포맷 (HWP, DOCX, XLSX, PPTX) 9p 합성 처리</span>
</div>
</td>
<td className="py-2.5 px-3">
<span className="font-code-mono text-code-mono text-text-primary">9 Slides / 14.2MB</span>
</td>
<td className="py-2.5 px-3">
<span className="font-code-mono text-code-mono text-text-secondary">2.1s</span>
</td>
<td className="py-2.5 px-3">
<span className="font-code-mono text-code-mono text-text-secondary">2026.02.18 10:14</span>
</td>
<td className="py-2.5 px-3">
<div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-diff-added-bg text-diff-added-text w-max">
<span className="material-symbols-outlined text-[14px]">check_circle</span>
<span className="font-badge-label text-badge-label uppercase">성공 / 완료</span>
</div>
</td>
<td className="py-2.5 px-3">
<div className="flex items-center gap-1 font-code-mono text-code-mono text-text-secondary">
<span className="text-status-local-text font-bold">NPU 68%</span>
<span>/ 1.2GB</span>
</div>
</td>
<td className="py-2.5 px-3 text-right">
<div className="flex items-center justify-end gap-1">
<button className="p-1 rounded bg-surface-container hover:bg-surface-variant text-text-primary transition-colors" title="결과 파일 폴더 열기">
<span className="material-symbols-outlined text-[16px]">folder_open</span>
</button>
<button className="p-1 rounded bg-surface-container hover:bg-surface-variant text-text-primary transition-colors" title="재실행">
<span className="material-symbols-outlined text-[16px]">replay</span>
</button>
<button className="btn-inspect-log px-2 py-1 rounded bg-primary-container text-white font-badge-label text-badge-label transition-colors" title="원시 로그 보기">
                    로그
                  </button>
</div>
</td>
</tr>

<tr className="job-row hover:bg-surface-container/60 transition-colors cursor-pointer bg-surface-canvas/30" data-job="JOB-20260218-0812" data-status="success" data-type="diff">
<td className="py-2.5 px-3 text-center">
<input className="job-checkbox rounded bg-surface-container cursor-pointer" type="checkbox"/>
</td>
<td className="py-2.5 px-3 font-code-mono text-code-mono text-primary font-semibold">
                JOB-20260218-0812
              </td>
<td className="py-2.5 px-3">
<span className="px-2 py-0.5 rounded bg-surface-container text-text-primary font-badge-label text-badge-label uppercase inline-block">
                  다중 문서 Diff
                </span>
</td>
<td className="py-2.5 px-3">
<div className="flex flex-col">
<span className="text-text-primary font-body-semibold truncate max-w-md">2025_사업계획서 vs 2026_신규_사업계획서_수정안</span>
<span className="font-caption text-caption text-text-secondary truncate max-w-md">형상 비교 및 OpenXML 토큰 차분 분석</span>
</div>
</td>
<td className="py-2.5 px-3">
<span className="font-code-mono text-code-mono text-text-primary">2개 파일 (48페이지)</span>
</td>
<td className="py-2.5 px-3">
<span className="font-code-mono text-code-mono text-text-secondary">482ms</span>
</td>
<td className="py-2.5 px-3">
<span className="font-code-mono text-code-mono text-text-secondary">2026.02.18 09:32</span>
</td>
<td className="py-2.5 px-3">
<div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-diff-added-bg text-diff-added-text w-max">
<span className="material-symbols-outlined text-[14px]">check_circle</span>
<span className="font-badge-label text-badge-label uppercase">성공 / 완료</span>
</div>
</td>
<td className="py-2.5 px-3">
<div className="flex items-center gap-1 font-code-mono text-code-mono text-text-secondary">
<span>CPU 45%</span>
<span>/ 340MB</span>
</div>
</td>
<td className="py-2.5 px-3 text-right">
<div className="flex items-center justify-end gap-1">
<button className="px-2 py-1 rounded bg-secondary text-white font-badge-label text-badge-label transition-colors flex items-center gap-1" title="비교 리포트 보기">
<span className="material-symbols-outlined text-[14px]">difference</span>
                    리포트
                  </button>
<button className="btn-inspect-log px-2 py-1 rounded bg-surface-container hover:bg-surface-variant text-text-primary font-badge-label text-badge-label transition-colors" title="로그 확인">
                    로그
                  </button>
</div>
</td>
</tr>

<tr className="job-row bg-surface-container-low/70 hover:bg-surface-container transition-colors cursor-pointer" data-job="JOB-20260218-0705" data-status="inflight" data-type="index">
<td className="py-2.5 px-3 text-center">
<input className="job-checkbox rounded bg-surface-container cursor-pointer" type="checkbox"/>
</td>
<td className="py-2.5 px-3 font-code-mono text-code-mono text-secondary font-bold flex items-center gap-1">
<span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                JOB-20260218-0705
              </td>
<td className="py-2.5 px-3">
<span className="px-2 py-0.5 rounded bg-status-local-bg text-status-local-text font-badge-label text-badge-label uppercase inline-block">
                  증분 벡터 색인
                </span>
</td>
<td className="py-2.5 px-3">
<div className="flex flex-col">
<span className="text-text-primary font-body-semibold truncate max-w-md">D:\Enterprise_Data\2026_전략기획실 전체 폴더 동기화</span>
<div className="w-full bg-surface-container h-1.5 rounded-full mt-1.5 overflow-hidden">
<div className="bg-secondary h-full rounded-full transition-all duration-500"></div>
</div>
</div>
</td>
<td className="py-2.5 px-3">
<span className="font-code-mono text-code-mono text-text-primary">2,419 / 3,840 건</span>
</td>
<td className="py-2.5 px-3">
<span className="font-code-mono text-code-mono text-secondary font-semibold">4분 12초 (진행)</span>
</td>
<td className="py-2.5 px-3">
<span className="font-code-mono text-code-mono text-text-secondary">2026.02.18 08:30</span>
</td>
<td className="py-2.5 px-3">
<div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant w-max font-semibold">
<span className="material-symbols-outlined text-[14px] animate-spin">autorenew</span>
<span className="font-badge-label text-badge-label uppercase">진행 중 63%</span>
</div>
</td>
<td className="py-2.5 px-3">
<div className="flex items-center gap-1 font-code-mono text-code-mono text-text-secondary">
<span className="text-status-local-text font-bold">NPU 42%</span>
<span>/ 2.1GB</span>
</div>
</td>
<td className="py-2.5 px-3 text-right">
<div className="flex items-center justify-end gap-1">
<button className="px-2 py-1 rounded bg-status-cloud-bg text-status-cloud-text hover:bg-yellow-200 font-badge-label text-badge-label transition-colors flex items-center gap-1" title="일시정지">
<span className="material-symbols-outlined text-[14px]">pause</span>
                    일시정지
                  </button>
<button className="p-1 rounded bg-surface-container hover:bg-format-pdf-bg text-status-danger-text transition-colors" title="작업 강제 중지">
<span className="material-symbols-outlined text-[16px]">stop</span>
</button>
<button className="btn-inspect-log px-2 py-1 rounded bg-primary-container text-white font-badge-label text-badge-label" title="스트림 모니터링">
                    로그
                  </button>
</div>
</td>
</tr>

<tr className="job-row hover:bg-surface-container/60 transition-colors cursor-pointer bg-surface-card" data-job="JOB-20260217-1520" data-status="failed" data-type="dlp">
<td className="py-2.5 px-3 text-center">
<input className="job-checkbox rounded bg-surface-container cursor-pointer" type="checkbox"/>
</td>
<td className="py-2.5 px-3 font-code-mono text-code-mono text-primary font-semibold">
                JOB-20260217-1520
              </td>
<td className="py-2.5 px-3">
<span className="px-2 py-0.5 rounded bg-status-cloud-bg text-status-cloud-text font-badge-label text-badge-label uppercase inline-block">
                  DLP 마스킹
                </span>
</td>
<td className="py-2.5 px-3">
<div className="flex flex-col">
<span className="text-text-primary font-body-semibold truncate max-w-md">2024_임원급여_보안.xlsx 주민번호/계좌 마스킹</span>
<span className="font-caption text-caption text-status-cloud-text truncate max-w-md">시트 레벨 암호화 감지 (AES-128 Lock)</span>
</div>
</td>
<td className="py-2.5 px-3">
<span className="font-code-mono text-code-mono text-text-primary">1개 파일 (14 Sheets)</span>
</td>
<td className="py-2.5 px-3">
<span className="font-code-mono text-code-mono text-text-secondary">850ms</span>
</td>
<td className="py-2.5 px-3">
<span className="font-code-mono text-code-mono text-text-secondary">2026.02.17 18:40</span>
</td>
<td className="py-2.5 px-3">
<div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-status-cloud-bg text-status-cloud-text w-max">
<span className="material-symbols-outlined text-[14px]">lock_reset</span>
<span className="font-badge-label text-badge-label uppercase">암호 입력 필요</span>
</div>
</td>
<td className="py-2.5 px-3">
<span className="font-code-mono text-code-mono text-status-cloud-text font-semibold">AES-128 잠김</span>
</td>
<td className="py-2.5 px-3 text-right">
<div className="flex items-center justify-end gap-1">
<button className="px-2 py-1 rounded bg-status-cloud-text text-white hover:opacity-90 font-badge-label text-badge-label transition-opacity flex items-center gap-1 shadow-sm" title="비밀번호 입력 재시도">
<span className="material-symbols-outlined text-[14px]">key</span>
                    암호 해제
                  </button>
<button className="btn-inspect-log px-2 py-1 rounded bg-surface-container hover:bg-surface-variant text-text-primary font-badge-label text-badge-label transition-colors" title="원시 진단 로그">
                    상세 로그
                  </button>
</div>
</td>
</tr>

<tr className="job-row hover:bg-surface-container/60 transition-colors cursor-pointer bg-surface-canvas/30" data-job="JOB-20260217-1102" data-status="failed" data-type="ocr">
<td className="py-2.5 px-3 text-center">
<input className="job-checkbox rounded bg-surface-container cursor-pointer" type="checkbox"/>
</td>
<td className="py-2.5 px-3 font-code-mono text-code-mono text-status-danger-text font-semibold">
                JOB-20260217-1102
              </td>
<td className="py-2.5 px-3">
<span className="px-2 py-0.5 rounded bg-format-pdf-bg text-format-pdf-text font-badge-label text-badge-label uppercase inline-block">
                  PDF 변환 (OCR)
                </span>
</td>
<td className="py-2.5 px-3">
<div className="flex flex-col">
<span className="text-text-primary font-body-semibold truncate max-w-md">회계감사_스캔본_v1.pdf &rarr; DOCX 양방향 변환</span>
<span className="font-caption text-caption text-status-danger-text truncate max-w-md">Stream 파서 예외: Trailing garbage or missing EOF marker</span>
</div>
</td>
<td className="py-2.5 px-3">
<span className="font-code-mono text-code-mono text-text-primary">82 Pages (중단)</span>
</td>
<td className="py-2.5 px-3">
<span className="font-code-mono text-code-mono text-text-muted">-</span>
</td>
<td className="py-2.5 px-3">
<span className="font-code-mono text-code-mono text-text-secondary">2026.02.17 14:15</span>
</td>
<td className="py-2.5 px-3">
<div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-status-danger-bg text-status-danger-text w-max">
<span className="material-symbols-outlined text-[14px]">dangerous</span>
<span className="font-badge-label text-badge-label uppercase">헤더 손상 실패</span>
</div>
</td>
<td className="py-2.5 px-3">
<span className="font-code-mono text-code-mono text-status-danger-text font-semibold">EOF Marker 누락</span>
</td>
<td className="py-2.5 px-3 text-right">
<div className="flex items-center justify-end gap-1">
<button className="px-2 py-1 rounded bg-status-danger-text text-white hover:opacity-90 font-badge-label text-badge-label transition-opacity flex items-center gap-1 shadow-sm" title="강제 복구 파서 실행">
<span className="material-symbols-outlined text-[14px]">build</span>
                    강제 복구
                  </button>
<button className="btn-inspect-log px-2 py-1 rounded bg-surface-container hover:bg-surface-variant text-text-primary font-badge-label text-badge-label transition-colors" title="오류 트레이스백 로그">
                    로그
                  </button>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div className="px-space-md py-space-sm bg-surface-canvas flex flex-col sm:flex-row items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-md">
<span className="font-caption text-caption text-text-secondary">총 5개 작업 중 <strong className="text-text-primary font-semibold" id="visible-row-count">5</strong>개 표시됨</span>
<span className="font-caption text-caption text-text-muted">|</span>
<div className="flex items-center gap-1 font-caption text-caption text-text-secondary">
<span>페이지당 표시:</span>
<select className="bg-surface-card rounded px-1.5 py-0.5 font-code-mono text-code-mono text-text-primary focus:outline-none">
<option>25</option>
<option>50</option>
<option>100</option>
</select>
</div>
</div>
<div className="flex items-center gap-1 font-code-mono text-code-mono text-caption">
<button className="w-6 h-6 rounded bg-surface-card flex items-center justify-center text-text-muted hover:text-text-primary transition-colors disabled:opacity-40" disabled="True">
<span className="material-symbols-outlined text-[14px]">chevron_left</span>
</button>
<span className="px-2 py-0.5 rounded bg-primary-container text-white font-semibold">1</span>
<button className="w-6 h-6 rounded bg-surface-card flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors">
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
</button>
</div>
</div>
</div>
</section>

<section className="p-space-lg pt-0">
<div className="rounded bg-primary text-white shadow-xl overflow-hidden flex flex-col">

<div className="h-10 px-space-md bg-primary-container flex items-center justify-between select-none">
<div className="flex items-center gap-space-md">
<div className="flex items-center gap-1.5">
<span className="w-3 h-3 rounded-full bg-status-danger-text inline-block"></span>
<span className="w-3 h-3 rounded-full bg-status-cloud-text inline-block"></span>
<span className="w-3 h-3 rounded-full bg-security-dlp-pass inline-block"></span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-tertiary-fixed">terminal</span>
<span className="font-code-mono text-code-mono text-white font-bold tracking-tight">System Stdout/Stderr Monitor</span>
<span className="font-badge-label text-badge-label px-1.5 py-0.5 rounded bg-surface-container-highest/20 text-tertiary-fixed" id="active-terminal-job">JOB-20260218-0941</span>
</div>
</div>

<div className="flex items-center gap-space-xs">
<button className="h-7 px-2.5 rounded bg-primary/40 hover:bg-primary text-on-primary font-caption text-caption flex items-center gap-1 transition-colors" id="btn-copy-terminal">
<span className="material-symbols-outlined text-[14px]">content_copy</span>
<span>로그 전체 복사</span>
</button>
<button className="h-7 px-2.5 rounded bg-primary/40 hover:bg-primary text-on-primary font-caption text-caption flex items-center gap-1 transition-colors" id="btn-export-json">
<span className="material-symbols-outlined text-[14px]">data_object</span>
<span>JSON 진단 리포트 내보내기</span>
</button>
<button className="w-7 h-7 rounded hover:bg-primary flex items-center justify-center text-on-primary-container hover:text-white transition-colors" id="btn-toggle-terminal">
<span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
</button>
</div>
</div>

<div className="p-space-md font-code-mono text-code-mono leading-relaxed bg-[#001024] max-h-56 overflow-y-auto space-y-1 select-text" id="terminal-content">
<div className="text-text-muted flex items-start gap-2">
<span className="text-on-primary-container shrink-0">[10:14:00.010]</span>
<span className="text-format-docx-text shrink-0 font-semibold">[KERNEL]</span>
<span>DocPilot Orchestration v3.2 daemon initial handshake... OK (PID: 10428)</span>
</div>
<div className="text-text-muted flex items-start gap-2">
<span className="text-on-primary-container shrink-0">[10:14:01.884]</span>
<span className="text-secondary-fixed shrink-0 font-semibold">[SCHEDULER]</span>
<span>Acquiring thread pool lock (Direct I/O async pool 8 workers)... Granted.</span>
</div>
<div className="text-white flex items-start gap-2 bg-primary-container/20 px-1 rounded">
<span className="text-on-primary-container shrink-0">[10:14:02.112]</span>
<span className="text-tertiary-fixed shrink-0 font-bold">[INFO]</span>
<span className="text-on-primary-container shrink-0">[DocPilot-Engine]</span>
<span>Loading binary schema for PPTX OpenXML packaging structure...</span>
</div>
<div className="text-white flex items-start gap-2">
<span className="text-on-primary-container shrink-0">[10:14:02.940]</span>
<span className="text-status-local-text shrink-0 font-bold">[NPU-ACCEL]</span>
<span>Vector tensor core initialized: 48.2 TOPS available on Core 0.</span>
</div>
<div className="text-white flex items-start gap-2 bg-primary-container/20 px-1 rounded">
<span className="text-on-primary-container shrink-0">[10:14:03.450]</span>
<span className="text-tertiary-fixed shrink-0 font-bold">[INFO]</span>
<span className="text-status-local-text shrink-0 font-bold">[Local-NPU]</span>
<span>Embedding 482 tokens via BGE-M3 model... Latency 12.4ms per block.</span>
</div>
<div className="text-white flex items-start gap-2">
<span className="text-on-primary-container shrink-0">[10:14:03.880]</span>
<span className="text-tertiary-fixed shrink-0 font-bold">[INFO]</span>
<span className="text-format-pptx-text shrink-0 font-bold">[OpenXML-Zip]</span>
<span>Merging slide layouts: ppt/slides/slide1.xml -&gt; ppt/slides/slide9.xml zero copy complete.</span>
</div>
<div className="text-diff-added-bg flex items-start gap-2 bg-diff-added-text/20 px-1 rounded">
<span className="text-on-primary-container shrink-0">[10:14:04.254]</span>
<span className="text-security-dlp-pass shrink-0 font-bold">[SUCCESS]</span>
<span className="text-white">Output generated at <code className="text-tertiary-fixed">D:\Enterprise_Data\2026_전략기획실\Output\2026_AI_IDC_통합보고서_합성본.pptx</code> (Size: 14.2MB, Time: 2.14s)</span>
</div>
<div className="text-text-muted flex items-start gap-2">
<span className="text-on-primary-container shrink-0">[10:14:04.301]</span>
<span className="text-secondary-fixed shrink-0 font-semibold">[IPC-RPC]</span>
<span>Tauri Event <code className="text-white">job:completed</code> dispatched with status: Ok(0). Waiting next batch...</span>
</div>
</div>

<div className="px-space-md py-1 bg-primary text-on-primary-container font-caption text-caption flex items-center justify-between select-none">
<div className="flex items-center gap-space-md">
<span className="flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-security-dlp-pass"></span>
<span>Realtime RPC Stream: Connected</span>
</span>
<span>Buffer: 128 KB (Auto-scroll ON)</span>
</div>
<span className="font-code-mono text-code-mono">Encoding: UTF-8 / CRLF</span>
</div>
</div>
</section>


</div>
    </>
  );
}
