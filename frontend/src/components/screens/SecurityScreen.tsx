import React from 'react';

export default function SecurityScreen() {
  return (
    <>
      <div className="flex flex-col w-full">

<div className="flex flex-col gap-space-lg p-space-md lg:p-space-xl">

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">

<div className="relative overflow-hidden rounded-xl bg-surface-card p-space-lg shadow-sm flex flex-col justify-between">
<div className="flex items-start justify-between">
<div>
<div className="flex items-center gap-1.5 mb-1">
<span className="w-1.5 h-1.5 rounded-full bg-security-dlp-breach"></span>
<span className="font-caption text-caption text-text-secondary uppercase tracking-wider font-semibold">총 PII 감지 파일</span>
</div>
<div className="flex items-baseline gap-2">
<span className="font-display-lg text-display-lg text-text-primary tracking-tight font-bold">47</span>
<span className="font-body-dense text-body-dense text-text-secondary">건의 파일</span>
</div>
</div>
<div className="w-9 h-9 rounded bg-diff-removed-bg flex items-center justify-center text-security-dlp-breach">
<span className="material-symbols-outlined text-[20px]">shield_with_heart</span>
</div>
</div>
<div className="mt-space-md pt-space-xs grid grid-cols-2 gap-1.5 font-code-mono text-code-mono">
<div className="flex items-center justify-between px-2 py-1 rounded bg-surface-container">
<span className="text-text-secondary">주민번호</span>
<span className="font-semibold text-security-dlp-breach">18건</span>
</div>
<div className="flex items-center justify-between px-2 py-1 rounded bg-surface-container">
<span className="text-text-secondary">금융계좌</span>
<span className="font-semibold text-format-pptx-text">14건</span>
</div>
<div className="flex items-center justify-between px-2 py-1 rounded bg-surface-container">
<span className="text-text-secondary">휴대전화</span>
<span className="font-semibold text-format-docx-text">11건</span>
</div>
<div className="flex items-center justify-between px-2 py-1 rounded bg-surface-container">
<span className="text-text-secondary">대외비어휘</span>
<span className="font-semibold text-secondary">4건</span>
</div>
</div>
</div>

<div className="relative overflow-hidden rounded-xl bg-surface-card p-space-lg shadow-sm flex flex-col justify-between">
<div className="flex items-start justify-between">
<div>
<span className="font-caption text-caption text-text-secondary uppercase tracking-wider font-semibold">마스킹 완료 처리율</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-display-lg text-display-lg text-text-primary tracking-tight font-bold">82.9%</span>
<span className="font-caption text-caption text-security-dlp-pass font-semibold flex items-center">
<span className="material-symbols-outlined text-[14px]">trending_up</span> +14.2%
              </span>
</div>
</div>
<div className="relative w-12 h-12 shrink-0">

<svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
<circle className="text-surface-container" cx="18" cy="18" fill="none" r="14" stroke="currentColor" strokeWidth="3"></circle>
<circle className="text-security-dlp-pass" cx="18" cy="18" fill="none" r="14" stroke="currentColor" stroke-dasharray="88" stroke-dashoffset="15" strokeLinecap="round" strokeWidth="3"></circle>
</svg>
<div className="absolute inset-0 flex items-center justify-center font-caption text-caption font-semibold text-text-primary">
              39/47
            </div>
</div>
</div>
<div className="mt-space-md pt-space-xs flex items-center justify-between font-caption text-caption">
<span className="text-text-secondary">마스킹 완료 <strong className="text-text-primary font-body-semibold">39건</strong></span>
<span className="px-2 py-0.5 rounded bg-status-cloud-bg text-status-cloud-text font-semibold flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-status-cloud-text animate-pulse"></span>
            검토 대기 8건
          </span>
</div>
</div>

<div className="relative overflow-hidden rounded-xl bg-primary-container p-space-lg text-white shadow-sm flex flex-col justify-between">
<div className="flex items-start justify-between">
<div>
<div className="flex items-center gap-1.5 mb-1 text-tertiary-fixed">
<span className="material-symbols-outlined text-[16px]">lock</span>
<span className="font-caption text-caption uppercase tracking-wider font-semibold">데이터 격리 수준</span>
</div>
<span className="font-title-sm text-title-sm text-white font-bold block">Air-Gapped 온디바이스 전용</span>
</div>
<span className="px-2 py-0.5 rounded bg-status-local-bg/20 text-tertiary-fixed font-badge-label text-badge-label font-bold">L3 SECURE</span>
</div>
<div className="mt-space-md space-y-1.5">
<div className="flex justify-between items-center font-caption text-caption text-on-primary-container">
<span>외부 클라우드 누출 위험도</span>
<span className="font-code-mono text-code-mono text-tertiary-fixed font-bold">0.00% (차단 100%)</span>
</div>
<div className="w-full bg-white/10 h-1.5 rounded overflow-hidden">
<div className="bg-tertiary-fixed h-full rounded"></div>
</div>
</div>
</div>

<div className="relative overflow-hidden rounded-xl bg-surface-card p-space-lg shadow-sm flex flex-col justify-between">
<div className="flex items-start justify-between">
<div>
<span className="font-caption text-caption text-text-secondary uppercase tracking-wider font-semibold">신경망 NPU 정규식 가속</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-display-lg text-display-lg text-text-primary tracking-tight font-bold">0.04<span className="font-body-default text-body-default text-text-secondary font-normal">s/Doc</span></span>
</div>
</div>
<div className="w-9 h-9 rounded bg-status-local-bg flex items-center justify-center text-status-local-text">
<span className="material-symbols-outlined text-[20px]">memory</span>
</div>
</div>
<div className="mt-space-md pt-space-xs flex items-center justify-between font-caption text-caption text-text-secondary">
<span className="truncate">한글 형태소 분석기 (Kiwi) 연동됨</span>
<span className="font-code-mono text-code-mono text-security-dlp-pass font-semibold">Ready</span>
</div>
</div>
</div>

<div className="bg-surface-card rounded-xl p-space-md lg:p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex flex-wrap items-center justify-between gap-space-md">
<div>
<h2 className="font-title-sm text-title-sm text-text-primary font-bold">자동 감지 및 비파괴 마스킹 규칙</h2>
<p className="font-caption text-caption text-text-secondary mt-0.5">문서 내 민감정보 패턴을 식별하고 영구 삭제형 또는 렌더링 오버레이 방식으로 치환합니다.</p>
</div>
<div className="flex items-center gap-space-xs">
<button className="h-8 px-space-md rounded bg-primary text-white font-body-semibold text-body-semibold hover:bg-text-primary transition-colors flex items-center gap-1.5 shadow-sm" id="batch-mask-btn">
<span className="material-symbols-outlined text-[16px]">visibility_off</span>
<span>선택 항목 일괄 마스킹 &amp; 원본 보호</span>
</button>
<button className="h-8 px-space-md rounded bg-surface-container text-text-primary font-body-default text-body-default hover:bg-surface-container-high transition-colors flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px]">copy_all</span>
<span>비파괴 마스킹 사본 생성 (.masked)</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter pt-space-xs">

<label className="flex items-center justify-between p-space-sm px-space-md rounded-lg bg-surface-container cursor-pointer select-none">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-security-dlp-breach text-[18px]">badge</span>
<div>
<span className="font-body-semibold text-body-semibold text-text-primary block">주민등록번호 완전 마스킹</span>
<span className="font-code-mono text-code-mono text-text-secondary">●●●●●●-●●●●●●●</span>
</div>
</div>
<input className="w-4 h-4 rounded text-secondary focus:ring-0" defaultChecked="" type="checkbox"/>
</label>

<label className="flex items-center justify-between p-space-sm px-space-md rounded-lg bg-surface-container cursor-pointer select-none">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-format-pptx-text text-[18px]">account_balance</span>
<div>
<span className="font-body-semibold text-body-semibold text-text-primary block">계좌번호 중간 마스킹</span>
<span className="font-code-mono text-code-mono text-text-secondary">110-***-*** (앞 3/뒤 2 유지)</span>
</div>
</div>
<input className="w-4 h-4 rounded text-secondary focus:ring-0" defaultChecked="" type="checkbox"/>
</label>

<label className="flex items-center justify-between p-space-sm px-space-md rounded-lg bg-surface-container cursor-pointer select-none">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-format-docx-text text-[18px]">call</span>
<div>
<span className="font-body-semibold text-body-semibold text-text-primary block">휴대전화 가운데 자리 마스킹</span>
<span className="font-code-mono text-code-mono text-text-secondary">010-●●●●-5678</span>
</div>
</div>
<input className="w-4 h-4 rounded text-secondary focus:ring-0" defaultChecked="" type="checkbox"/>
</label>
</div>

<div className="pt-space-xs flex flex-wrap items-center gap-2">
<span className="font-caption text-caption text-text-secondary font-semibold uppercase shrink-0">대외비 차단 키워드:</span>
<div className="flex flex-wrap items-center gap-1.5" id="keyword-container">
<span className="h-6 px-2 rounded-full bg-surface-container text-text-primary font-caption text-caption flex items-center gap-1">
<span>프로젝트 타이탄</span>
<button className="hover:text-security-dlp-breach"><span className="material-symbols-outlined text-[13px]">close</span></button>
</span>
<span className="h-6 px-2 rounded-full bg-surface-container text-text-primary font-caption text-caption flex items-center gap-1">
<span>2026_미공개_M&amp;A</span>
<button className="hover:text-security-dlp-breach"><span className="material-symbols-outlined text-[13px]">close</span></button>
</span>
<span className="h-6 px-2 rounded-full bg-surface-container text-text-primary font-caption text-caption flex items-center gap-1">
<span>특수단가계약서</span>
<button className="hover:text-security-dlp-breach"><span className="material-symbols-outlined text-[13px]">close</span></button>
</span>
<span className="h-6 px-2 rounded-full bg-surface-container text-text-primary font-caption text-caption flex items-center gap-1">
<span>임원급여명세</span>
<button className="hover:text-security-dlp-breach"><span className="material-symbols-outlined text-[13px]">close</span></button>
</span>
<button className="h-6 px-2.5 rounded-full bg-surface-container text-secondary font-caption text-caption font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-1" id="add-keyword-btn">
<span className="material-symbols-outlined text-[14px]">add</span>
<span>키워드 추가</span>
</button>
</div>
</div>
</div>

<div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter items-start">

<div className="xl:col-span-7 bg-surface-card rounded-xl shadow-sm overflow-hidden flex flex-col">
<div className="p-space-md bg-surface-card flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="font-title-sm text-title-sm text-text-primary font-bold">검출된 민감정보 목록</span>
<span className="px-2 py-0.5 rounded bg-surface-container text-text-secondary font-badge-label text-badge-label font-bold">TOTAL 47 ITEMS</span>
</div>
<div className="flex items-center gap-2">
<span className="font-caption text-caption text-text-secondary">정렬: 심각도 순</span>
<button className="p-1 rounded text-text-secondary hover:text-text-primary hover:bg-surface-container"><span className="material-symbols-outlined text-[16px]">filter_list</span></button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-canvas text-text-secondary font-caption text-caption uppercase font-semibold h-8 select-none">
<th className="pl-space-md pr-2 w-8"><input className="w-3.5 h-3.5 rounded text-secondary focus:ring-0" type="checkbox"/></th>
<th className="px-2 w-16">포맷</th>
<th className="px-2">문서명 / 경로</th>
<th className="px-2 w-28">유형</th>
<th className="px-2 w-24">위치</th>
<th className="px-2">검출 및 마스킹 스니펫</th>
<th className="px-2 w-24 text-center">상태</th>
<th className="pr-space-md pl-2 text-right w-24">조치</th>
</tr>
</thead>
<tbody className="font-body-default text-body-default divide-y-0" id="pii-rows">

<tr className="h-11 bg-surface-container-high/40 hover:bg-surface-container transition-colors cursor-pointer border-l-2 border-primary">
<td className="pl-space-md pr-2"><input className="w-3.5 h-3.5 rounded text-secondary focus:ring-0" defaultChecked="" type="checkbox"/></td>
<td className="px-2">
<span className="h-[18px] px-1.5 rounded bg-format-hwp-bg text-format-hwp-text font-badge-label text-badge-label font-bold flex items-center justify-center">HWPX</span>
</td>
<td className="px-2 min-w-[140px] max-w-[180px]">
<span className="font-body-semibold text-body-semibold text-text-primary truncate block">표준_비밀유지협약서_2026.hwpx</span>
<span className="font-code-mono text-code-mono text-text-muted truncate block">C:\HQ_Legal\HWP_Vault</span>
</td>
<td className="px-2">
<span className="px-1.5 py-0.5 rounded bg-status-danger-bg text-status-danger-text font-caption text-caption font-semibold">주민등록번호</span>
</td>
<td className="px-2 font-caption text-caption text-text-secondary whitespace-nowrap">2페이지 제5조</td>
<td className="px-2 font-code-mono text-code-mono text-text-primary">
<span className="bg-diff-removed-bg text-diff-removed-text line-through mr-1">890412-1082914</span>
<span className="bg-diff-added-bg text-diff-added-text font-bold">890412-1●●●●●●</span>
</td>
<td className="px-2 text-center">
<span className="px-2 py-0.5 rounded bg-diff-added-bg text-security-dlp-pass font-caption text-caption font-bold">완료</span>
</td>
<td className="pr-space-md pl-2 text-right">
<button className="p-1 rounded text-text-secondary hover:text-text-primary hover:bg-surface-container-highest" title="원본 파일 열기">
<span className="material-symbols-outlined text-[16px]">open_in_new</span>
</button>
</td>
</tr>

<tr className="h-11 bg-surface-card hover:bg-surface-container transition-colors cursor-pointer">
<td className="pl-space-md pr-2"><input className="w-3.5 h-3.5 rounded text-secondary focus:ring-0" type="checkbox"/></td>
<td className="px-2">
<span className="h-[18px] px-1.5 rounded bg-format-xlsx-bg text-format-xlsx-text font-badge-label text-badge-label font-bold flex items-center justify-center">XLSX</span>
</td>
<td className="px-2 min-w-[140px] max-w-[180px]">
<span className="font-body-semibold text-body-semibold text-text-primary truncate block">2024_임원급여_보안.xlsx</span>
<span className="font-code-mono text-code-mono text-text-muted truncate block">D:\Enterprise_Data\04_기밀</span>
</td>
<td className="px-2">
<span className="px-1.5 py-0.5 rounded bg-format-pptx-bg text-format-pptx-text font-caption text-caption font-semibold">금융계좌</span>
</td>
<td className="px-2 font-caption text-caption text-text-secondary whitespace-nowrap">Sheet1 H12:H28</td>
<td className="px-2 font-code-mono text-code-mono text-text-primary">
<span className="bg-diff-modified-bg text-diff-modified-text font-bold">신한 110-384-918274</span>
</td>
<td className="px-2 text-center">
<span className="px-2 py-0.5 rounded bg-status-cloud-bg text-status-cloud-text font-caption text-caption font-bold">검토 대기</span>
</td>
<td className="pr-space-md pl-2 text-right">
<button className="px-2 py-0.5 rounded bg-secondary text-white font-caption text-caption font-semibold hover:bg-secondary-container transition-colors shadow-sm">
                    즉시 마스킹
                  </button>
</td>
</tr>

<tr className="h-11 bg-surface-card hover:bg-surface-container transition-colors cursor-pointer">
<td className="pl-space-md pr-2"><input className="w-3.5 h-3.5 rounded text-secondary focus:ring-0" type="checkbox"/></td>
<td className="px-2">
<span className="h-[18px] px-1.5 rounded bg-format-docx-bg text-format-docx-text font-badge-label text-badge-label font-bold flex items-center justify-center">DOCX</span>
</td>
<td className="px-2 min-w-[140px] max-w-[180px]">
<span className="font-body-semibold text-body-semibold text-text-primary truncate block">협력사_정산_명세서_Q4.docx</span>
<span className="font-code-mono text-code-mono text-text-muted truncate block">D:\Finance\Settlement</span>
</td>
<td className="px-2">
<span className="px-1.5 py-0.5 rounded bg-format-docx-bg text-format-docx-text font-caption text-caption font-semibold">사업자/계좌</span>
</td>
<td className="px-2 font-caption text-caption text-text-secondary whitespace-nowrap">4페이지 하단</td>
<td className="px-2 font-code-mono text-code-mono text-text-primary">
<span className="bg-diff-added-bg text-diff-added-text">120-81-***** / 우리 1002-***</span>
</td>
<td className="px-2 text-center">
<span className="px-2 py-0.5 rounded bg-diff-added-bg text-security-dlp-pass font-caption text-caption font-bold">완료</span>
</td>
<td className="pr-space-md pl-2 text-right">
<button className="p-1 rounded text-text-secondary hover:text-text-primary hover:bg-surface-container-highest">
<span className="material-symbols-outlined text-[16px]">more_vert</span>
</button>
</td>
</tr>

<tr className="h-11 bg-surface-card hover:bg-surface-container transition-colors cursor-pointer">
<td className="pl-space-md pr-2"><input className="w-3.5 h-3.5 rounded text-secondary focus:ring-0" type="checkbox"/></td>
<td className="px-2">
<span className="h-[18px] px-1.5 rounded bg-format-pptx-bg text-format-pptx-text font-badge-label text-badge-label font-bold flex items-center justify-center">PPTX</span>
</td>
<td className="px-2 min-w-[140px] max-w-[180px]">
<span className="font-body-semibold text-body-semibold text-text-primary truncate block">2026_전략투자_로드맵_기밀.pptx</span>
<span className="font-code-mono text-code-mono text-text-muted truncate block">D:\Presentations\Strategy</span>
</td>
<td className="px-2">
<span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-caption text-caption font-semibold">대외비 키워드</span>
</td>
<td className="px-2 font-caption text-caption text-text-secondary whitespace-nowrap">슬라이드 7 본문</td>
<td className="px-2 font-code-mono text-code-mono text-diff-modified-text">
<span className="px-1.5 py-0.5 rounded bg-diff-modified-bg">[대외비 워터마크 자동 삽입됨]</span>
</td>
<td className="px-2 text-center">
<span className="px-2 py-0.5 rounded bg-diff-added-bg text-security-dlp-pass font-caption text-caption font-bold">완료</span>
</td>
<td className="pr-space-md pl-2 text-right">
<button className="p-1 rounded text-text-secondary hover:text-text-primary hover:bg-surface-container-highest">
<span className="material-symbols-outlined text-[16px]">visibility</span>
</button>
</td>
</tr>

<tr className="h-11 bg-surface-card hover:bg-surface-container transition-colors cursor-pointer">
<td className="pl-space-md pr-2"><input className="w-3.5 h-3.5 rounded text-secondary focus:ring-0" type="checkbox"/></td>
<td className="px-2">
<span className="h-[18px] px-1.5 rounded bg-format-pdf-bg text-format-pdf-text font-badge-label text-badge-label font-bold flex items-center justify-center">PDF</span>
</td>
<td className="px-2 min-w-[140px] max-w-[180px]">
<span className="font-body-semibold text-body-semibold text-text-primary truncate block">신규입사자_비상연락망_2025.pdf</span>
<span className="font-code-mono text-code-mono text-text-muted truncate block">C:\DocArchive\HR</span>
</td>
<td className="px-2">
<span className="px-1.5 py-0.5 rounded bg-format-docx-bg text-format-docx-text font-caption text-caption font-semibold">휴대전화번호</span>
</td>
<td className="px-2 font-caption text-caption text-text-secondary whitespace-nowrap">1페이지 표2</td>
<td className="px-2 font-code-mono text-code-mono text-text-primary">
<span className="bg-diff-removed-bg text-diff-removed-text">010-4829-1092</span> (3개 항목)
                </td>
<td className="px-2 text-center">
<span className="px-2 py-0.5 rounded bg-status-cloud-bg text-status-cloud-text font-caption text-caption font-bold">검토 대기</span>
</td>
<td className="pr-space-md pl-2 text-right">
<button className="px-2 py-0.5 rounded bg-secondary text-white font-caption text-caption font-semibold hover:bg-secondary-container transition-colors shadow-sm">
                    즉시 마스킹
                  </button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="p-space-sm px-space-md bg-surface-canvas flex items-center justify-between font-caption text-caption text-text-secondary select-none">
<div className="flex items-center gap-2">
<span>선택된 파일: <strong className="text-text-primary">1</strong>개 (전체 47개 중)</span>
</div>
<div className="flex items-center gap-1">
<button className="px-2 py-1 rounded bg-surface-card hover:bg-surface-container font-semibold disabled:opacity-50" disabled="True">&lt; 이전</button>
<span className="px-2 py-1 bg-primary text-white rounded font-code-mono text-code-mono font-bold">1</span>
<button className="px-2 py-1 rounded bg-surface-card hover:bg-surface-container font-semibold">2</button>
<button className="px-2 py-1 rounded bg-surface-card hover:bg-surface-container font-semibold">3</button>
<button className="px-2 py-1 rounded bg-surface-card hover:bg-surface-container font-semibold">다음 &gt;</button>
</div>
</div>
</div>

<div className="xl:col-span-5 bg-surface-card rounded-xl shadow-sm p-space-md lg:p-space-lg flex flex-col gap-space-md sticky top-16">
<div className="flex items-start justify-between">
<div>
<div className="flex items-center gap-2 mb-1">
<span className="h-[18px] px-1.5 rounded bg-format-hwp-bg text-format-hwp-text font-badge-label text-badge-label font-bold">HWPX 로컬 렌더링</span>
<span className="px-2 py-0.5 rounded bg-diff-added-bg text-security-dlp-pass font-caption text-caption font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[12px]">verified</span> 안전 검증 완료
              </span>
</div>
<h3 className="font-title-sm text-title-sm text-text-primary font-bold">표준_비밀유지협약서_2026.hwpx</h3>
<p className="font-code-mono text-code-mono text-text-muted mt-0.5">SHA-256: 7f8a92e10c73...84c9</p>
</div>
<button className="p-1 rounded text-text-secondary hover:text-text-primary hover:bg-surface-container">
<span className="material-symbols-outlined text-[20px]">fullscreen</span>
</button>
</div>

<div className="grid grid-cols-2 p-1 rounded-lg bg-surface-container select-none">
<button className="py-1.5 rounded text-text-secondary font-body-semibold text-body-semibold flex items-center justify-center gap-1 transition-all" id="view-raw-btn">
<span className="material-symbols-outlined text-[16px]">visibility</span>
<span>마스킹 전 원본</span>
</button>
<button className="py-1.5 rounded bg-surface-card text-text-primary shadow-sm font-body-semibold text-body-semibold flex items-center justify-center gap-1 transition-all" id="view-masked-btn">
<span className="material-symbols-outlined text-[16px]">shield</span>
<span>마스킹 후 사본 미리보기</span>
</button>
</div>

<div className="relative bg-surface-canvas rounded-lg p-space-md flex flex-col gap-space-sm font-body-default text-body-default min-h-[340px] justify-between overflow-hidden shadow-inner">

<div className="space-y-3 leading-relaxed text-text-primary">
<div className="text-center font-bold text-headline-md font-headline-md tracking-tight border-b border-border-subtle/0 pb-2">
              표준 비밀유지협약서 (NDA)
            </div>
<p className="text-text-secondary font-caption text-caption">
              본 협약은 ㈜넥스트테크(이하 "갑")와 수탁연구원(이하 "을") 상호 간의 영업비밀 및 개인식별정보 보호를 위하여 체결된다.
            </p>
<div className="p-space-sm rounded bg-surface-card space-y-2">
<span className="font-body-semibold text-body-semibold block text-text-primary">제 5 조 (계약 당사자의 인적사항)</span>
<p className="text-text-primary">
                1. "을"의 인적사항:<br/>
                성명: 홍 길 동 (연구총괄책임자)<br/>
                소속: 글로벌전략데이터분석팀<br/>
                식별번호: 
                
<span className="inline-block relative px-1 py-0.5 rounded font-code-mono text-code-mono font-bold bg-text-primary text-white select-none" id="preview-target">
<span id="preview-text">890412 - 1●●●●●●</span>
<span className="absolute -top-2.5 -right-2 px-1 rounded bg-security-dlp-pass text-white font-badge-label text-[9px] uppercase tracking-wide">REDACTED</span>
</span>
</p>
<p className="text-text-secondary font-caption text-caption">
                연락처: <span className="font-code-mono text-code-mono text-text-primary font-semibold">010-9182-3849</span>
</p>
</div>
<p className="font-caption text-caption text-text-muted italic">
              * 온디바이스 NPU 전처리: 픽셀 오버레이가 아닌 한글 HWPX 바이너리 텍스트 노드 자체를 치환하여 텍스트 복원을 원천 차단함.
            </p>
</div>

<div className="pt-space-md flex items-center justify-between gap-space-xs">
<button className="h-8 px-space-md rounded bg-surface-card text-text-primary font-body-default text-body-default hover:bg-surface-container transition-colors flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">history</span>
<span>작업 롤백</span>
</button>
<div className="flex items-center gap-2">
<button className="h-8 px-space-md rounded bg-diff-removed-bg text-diff-removed-text font-body-semibold text-body-semibold hover:bg-status-danger-bg transition-colors flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">rule</span>
<span>예외 승인 (Raw 허용)</span>
</button>
<button className="h-8 px-space-md rounded bg-primary text-white font-body-semibold text-body-semibold hover:bg-text-primary transition-colors flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[16px]">download</span>
<span>마스킹 완료 파일 저장</span>
</button>
</div>
</div>
</div>

<div className="p-space-sm rounded-lg bg-surface-container flex items-center gap-space-sm text-text-secondary font-caption text-caption">
<span className="material-symbols-outlined text-security-dlp-pass text-[18px]">verified_user</span>
<div>
<strong className="text-text-primary">개인정보보호법 제29조(안전조치의무) 충족:</strong>
            로컬 AES-256 암호화 적용 및 원본 메타데이터 EXIF/생성자 식별정보 일괄 제거 완료.
          </div>
</div>
</div>
</div>
</div>
</div>

    </>
  );
}
