import { open } from '@tauri-apps/plugin-dialog';
import React, { useState } from 'react';
import { api } from '../../api';
import { FolderPickerModal } from '../FolderPickerModal';

export default function DirectoryScreen() {
  const [scanPath, setScanPath] = useState('e:/projects/docpilot/doc');
  const [loading, setLoading] = useState(false);
  const [isFolderPickerOpen, setIsFolderPickerOpen] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  
  const handleFolderSelect = async () => {
    try {
      if (window.__TAURI_INTERNALS__) {
        const selected = await open({
          directory: true,
          multiple: false,
          defaultPath: scanPath || undefined,
        });
        if (selected) {
          setScanPath(selected as string);
        }
      } else {
        setIsFolderPickerOpen(true);
      }
    } catch (e) {
      console.error("Tauri API not available", e);
      setIsFolderPickerOpen(true);
    }
  };

  const handleScan = async () => {
    setLoading(true);
    try {
      const res = await api.scanDirectory(scanPath);
      setScanResult(res.stats);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-col w-full">
<div className="p-gutter flex flex-col gap-space-lg">

<div className="bg-surface-card rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">

<div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-space-sm">
<div className="relative flex-1 min-w-[200px] flex items-center bg-surface-canvas rounded-lg px-space-md py-1.5 focus-within:ring-2 focus-within:ring-secondary-container">
<span className="material-symbols-outlined text-[18px] text-text-secondary mr-space-xs shrink-0">folder_open</span>
<input className="w-full bg-transparent font-code-mono text-code-mono text-text-primary focus:outline-none" type="text" value={scanPath} onChange={(e) => setScanPath(e.target.value)} placeholder="절대 경로 입력 (예: e:/projects/docpilot/doc)" />

<div className="relative group ml-space-xs">
<button className="flex items-center gap-1 text-caption font-caption text-text-secondary hover:text-text-primary px-space-xs py-0.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors shrink-0 whitespace-nowrap" type="button">
<span>최근 경로</span>
<span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
</button>
<div className="hidden group-hover:flex group-focus-within:flex flex-col absolute right-0 top-full mt-1 w-64 bg-surface-card rounded-lg shadow-md p-space-xs z-20">
<span className="text-caption font-caption text-text-muted px-space-xs py-1">자주 찾는 디렉토리</span>
<button className="text-left font-code-mono text-code-mono px-space-xs py-1.5 rounded hover:bg-surface-container text-text-primary truncate" type="button">C:\Projects\Q1_Audit</button>
<button className="text-left font-code-mono text-code-mono px-space-xs py-1.5 rounded hover:bg-surface-container text-text-primary truncate" type="button">D:\공유문서\법무팀</button>
</div>
</div>
</div>
<div className="flex items-center gap-space-xs">

<button onClick={handleFolderSelect} className="h-8 px-space-md rounded-lg bg-surface-container text-text-primary font-body-semibold hover:bg-surface-variant transition-colors flex items-center gap-1 shrink-0" type="button">
<span className="material-symbols-outlined text-[16px]">snippet_folder</span>
<span>폴더 선택</span>
</button>
<button onClick={handleScan} disabled={loading} className="h-8 px-space-md rounded-lg bg-primary-container text-on-primary font-body-semibold hover:bg-primary transition-colors flex items-center gap-1 shrink-0" type="button">
<span className={`material-symbols-outlined text-[16px] ${loading ? "animate-spin" : ""}`}>sync</span>
<span>{loading ? "스캔 중..." : "스캔 시작"}</span>
</button>
<label className="flex items-center gap-1.5 px-space-sm py-1.5 bg-surface-container rounded-lg cursor-pointer select-none shrink-0">
<input className="w-3.5 h-3.5 accent-secondary cursor-pointer" defaultChecked type="checkbox"/>
<span className="font-caption text-caption font-medium text-text-primary">하위 폴더 포함</span>
</label>
</div>
</div>


<div className="flex items-center gap-space-sm bg-surface-canvas p-1 rounded-lg shrink-0">
<label className="flex items-center gap-1.5 px-space-sm py-1 rounded bg-status-local-bg text-status-local-text cursor-pointer">
<input className="accent-status-local-text w-3 h-3" defaultChecked="" name="folder_security" type="radio"/>
<span className="material-symbols-outlined text-[14px]">lock</span>
<span className="font-caption text-caption font-semibold">로컬 전용 (local_only)</span>
</label>
<label className="flex items-center gap-1.5 px-space-sm py-1 rounded text-text-secondary hover:text-text-primary cursor-pointer">
<input className="accent-secondary w-3 h-3" name="folder_security" type="radio"/>
<span className="material-symbols-outlined text-[14px]">cloud_sync</span>
<span className="font-caption text-caption">클라우드 허용</span>
</label>
</div>
</div>

<div className="flex items-center flex-wrap gap-space-xs pt-1">
<span className="font-caption text-caption text-text-muted mr-space-xs">포맷 필터링:</span>
<button className="px-space-sm py-0.5 rounded-full bg-primary text-on-primary font-badge-label text-badge-label font-bold flex items-center gap-1 shadow-sm" type="button">
<span>전체</span>
<span className="bg-primary-container px-1 rounded-full text-[9px] text-primary-fixed">{scanResult?.files?.length || 0}</span>
</button>
<button className="px-space-sm py-0.5 rounded-full bg-format-pptx-bg text-format-pptx-text font-badge-label text-badge-label font-bold flex items-center gap-1 hover:brightness-95 transition-all" type="button">
<span>PPTX</span>
<span className="bg-surface-card px-1 rounded-full text-[9px]">0</span>
</button>
<button className="px-space-sm py-0.5 rounded-full bg-format-xlsx-bg text-format-xlsx-text font-badge-label text-badge-label font-bold flex items-center gap-1 hover:brightness-95 transition-all" type="button">
<span>XLSX</span>
<span className="bg-surface-card px-1 rounded-full text-[9px]">0</span>
</button>
<button className="px-space-sm py-0.5 rounded-full bg-format-docx-bg text-format-docx-text font-badge-label text-badge-label font-bold flex items-center gap-1 hover:brightness-95 transition-all" type="button">
<span>DOCX</span>
<span className="bg-surface-card px-1 rounded-full text-[9px]">0</span>
</button>
<button className="px-space-sm py-0.5 rounded-full bg-format-hwp-bg text-format-hwp-text font-badge-label text-badge-label font-bold flex items-center gap-1 hover:brightness-95 transition-all" type="button">
<span>HWP/HWPX</span>
<span className="bg-surface-card px-1 rounded-full text-[9px]">0</span>
</button>
<button className="px-space-sm py-0.5 rounded-full bg-format-pdf-bg text-format-pdf-text font-badge-label text-badge-label font-bold flex items-center gap-1 hover:brightness-95 transition-all" type="button">
<span>PDF</span>
<span className="bg-surface-card px-1 rounded-full text-[9px]">0</span>
</button>
</div>
</div>
{scanResult && <div className="mt-2 text-sm text-green-600 font-bold bg-green-50 p-2 rounded w-full border border-green-200">✅ 스캔 완료: 신규 {scanResult.added}건, 업데이트 {scanResult.updated}건, 스킵 {scanResult.skipped}건</div>}
<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-space-md">

<div className="bg-surface-card rounded-xl p-space-md shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between mb-space-xs">
<span className="font-caption text-caption text-text-secondary">총 문서 수</span>
<span className="material-symbols-outlined text-[16px] text-text-muted">description</span>
</div>
<div className="flex items-baseline gap-1.5">
<span className="font-headline-md text-headline-md font-bold text-text-primary">{scanResult?.files?.length || 0}</span>
<span className="font-caption text-caption text-text-secondary">건</span>
</div>
<div className="mt-space-xs inline-flex items-center gap-0.5 text-diff-added-text bg-diff-added-bg px-1.5 py-0.5 rounded text-[10px] font-bold">
<span className="material-symbols-outlined text-[10px]">arrow_upward</span> +{scanResult?.added || 0}건 신규
        </div>
</div>

<div className="bg-surface-card rounded-xl p-space-md shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between mb-space-xs">
<span className="font-caption text-caption text-text-secondary">총 데이터 용량</span>
<span className="material-symbols-outlined text-[16px] text-text-muted">hard_drive</span>
</div>
<div className="flex items-baseline gap-1.5">
<span className="font-headline-md text-headline-md font-bold text-text-primary">{scanResult ? "0.1" : "0"}</span>
<span className="font-caption text-caption text-text-secondary">GB</span>
</div>
<div className="mt-space-xs text-[10px] text-text-muted font-code-mono">디스크 여유 612 GB</div>
</div>

<div className="bg-surface-card rounded-xl p-space-md shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between mb-space-xs">
<span className="font-caption text-caption text-text-secondary">슬라이드/페이지</span>
<span className="material-symbols-outlined text-[16px] text-text-muted">auto_stories</span>
</div>
<div className="flex items-baseline gap-1.5">
<span className="font-headline-md text-headline-md font-bold text-text-primary">{scanResult ? "15" : "0"}</span>
<span className="font-caption text-caption text-text-secondary">p</span>
</div>
<div className="mt-space-xs text-[10px] text-text-secondary">평균 12.5p / 문서</div>
</div>

<div className="bg-surface-card rounded-xl p-space-md shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between mb-space-xs">
<span className="font-caption text-caption text-text-secondary">벡터 색인 완료율</span>
<span className="material-symbols-outlined text-[16px] text-secondary">model_training</span>
</div>
<div className="flex items-baseline gap-1.5">
<span className="font-headline-md text-headline-md font-bold text-secondary">{scanResult ? "100%" : "0%"}</span>
</div>
<div className="mt-space-xs w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
<div className="bg-secondary h-full rounded-full"></div>
</div>
</div>

<div className="bg-surface-card rounded-xl p-space-md shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between mb-space-xs">
<span className="font-caption text-caption text-text-secondary">PII 개인정보 감지</span>
<span className="material-symbols-outlined text-[16px] text-security-dlp-breach">shield_with_heart</span>
</div>
<div className="flex items-baseline gap-1.5">
<span className="font-headline-md text-headline-md font-bold text-security-dlp-breach">47</span>
<span className="font-caption text-caption text-text-secondary">건</span>
</div>
<span className="mt-space-xs inline-block text-[10px] font-bold text-security-dlp-breach bg-format-pdf-bg px-1.5 py-0.5 rounded text-center">DLP 마스킹 필요</span>
</div>

<div className="bg-surface-card rounded-xl p-space-md shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between mb-space-xs">
<span className="font-caption text-caption text-text-secondary">암호/손상 오류 파일</span>
<span className="material-symbols-outlined text-[16px] text-status-cloud-text">encrypted</span>
</div>
<div className="flex items-baseline gap-1.5">
<span className="font-headline-md text-headline-md font-bold text-status-cloud-text">2</span>
<span className="font-caption text-caption text-text-secondary">건</span>
</div>
<span className="mt-space-xs inline-block text-[10px] font-bold text-status-cloud-text bg-status-cloud-bg px-1.5 py-0.5 rounded text-center">사용자 조치 대기</span>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">

<div className="lg:col-span-5 bg-surface-card rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[18px] text-primary">pie_chart</span>
<span className="font-title-sm text-title-sm font-bold text-text-primary">포맷별 문서 점유율</span>
</div>
<span className="font-code-mono text-code-mono text-text-muted">총 {scanResult?.files?.length || 0} 파일</span>
</div>
<div className="flex flex-row items-center justify-center gap-16 py-space-md w-full">

<div className="relative w-80 h-80 shrink-0">
<svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">

{scanResult ? (
  <>
    <circle cx="18" cy="18" fill="transparent" r="14" stroke="#16A34A" strokeDasharray="29.2 100" strokeDashoffset="0" strokeWidth="4.5"></circle>

<circle cx="18" cy="18" fill="transparent" r="14" stroke="#2563EB" strokeDasharray="24.6 100" strokeDashoffset="-29.2" strokeWidth="4.5"></circle>

<circle cx="18" cy="18" fill="transparent" r="14" stroke="#EA580C" strokeDasharray="21.9 100" strokeDashoffset="-53.8" strokeWidth="4.5"></circle>

<circle cx="18" cy="18" fill="transparent" r="14" stroke="#0284C7" strokeDasharray="16.1 100" strokeDashoffset="-75.7" strokeWidth="4.5"></circle>

<circle cx="18" cy="18" fill="transparent" r="14" stroke="#DC2626" strokeDasharray="8.2 100" strokeDashoffset="-91.8" strokeWidth="4.5"></circle>

  </>
) : (
  <circle cx="18" cy="18" fill="transparent" r="14" stroke="#E2E8F0" strokeWidth="4.5"></circle>
)}
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="font-display-lg text-2xl font-bold text-text-primary">5대</span>
<span className="font-caption text-caption text-text-muted">문서 유형</span>
</div>
</div>

<div className="flex flex-col gap-1.5 text-caption font-caption">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-format-xlsx-text"></span>
<span className="w-16 text-text-secondary">XLSX</span>
<span className="font-code-mono font-bold text-text-primary">29.2%</span>
</div>
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-format-docx-text"></span>
<span className="w-16 text-text-secondary">DOCX</span>
<span className="font-code-mono font-bold text-text-primary">24.6%</span>
</div>
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-format-pptx-text"></span>
<span className="w-16 text-text-secondary">PPTX</span>
<span className="font-code-mono font-bold text-text-primary">21.9%</span>
</div>
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-format-hwp-text"></span>
<span className="w-16 text-text-secondary">HWP/HWPX</span>
<span className="font-code-mono font-bold text-text-primary">16.1%</span>
</div>
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-format-pdf-text"></span>
<span className="w-16 text-text-secondary">PDF</span>
<span className="font-code-mono font-bold text-text-primary">8.2%</span>
</div>
</div>
</div>
<div className="mt-space-md pt-space-xs bg-surface-canvas rounded-lg p-space-sm flex items-center justify-between text-caption font-caption">
<span className="text-text-secondary">국내 표준 공문서 비중</span>
<span className="font-code-mono text-format-hwp-text font-semibold">0 건 (HWP/HWPX 전용 파서 가동)</span>
</div>
</div>

<div className="lg:col-span-7 bg-surface-card rounded-xl p-space-lg shadow-sm flex flex-col justify-between">
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[18px] text-primary">bar_chart</span>
<span className="font-title-sm text-title-sm font-bold text-text-primary">폴더 계층별 용량 &amp; 증분 색인 상태</span>
</div>
<div className="flex items-center gap-space-sm text-caption font-caption text-text-secondary">
<div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-secondary"></span>색인 완료</div>
<div className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-surface-container-highest"></span>대기/미색인</div>
</div>
</div>

<div className="space-y-space-md py-space-xs">

<div className="space-y-1">
<div className="flex justify-between font-caption text-caption">
<span className="font-semibold text-text-primary">📁 01_기획전략팀 (14.2 GB)</span>
<span className="font-code-mono text-text-muted">98% 완료 (1,240 / 1,265)</span>
</div>
<div className="h-3 w-full bg-surface-container rounded-full overflow-hidden flex">
<div className="bg-secondary h-full rounded-l-full"></div>
<div className="bg-surface-container-highest h-full"></div>
</div>
</div>

<div className="space-y-1">
<div className="flex justify-between font-caption text-caption">
<span className="font-semibold text-text-primary">📁 02_재무회계팀 (11.5 GB)</span>
<span className="font-code-mono text-text-muted">95% 완료 (980 / 1,032)</span>
</div>
<div className="h-3 w-full bg-surface-container rounded-full overflow-hidden flex">
<div className="bg-secondary h-full rounded-l-full"></div>
<div className="bg-surface-container-highest h-full"></div>
</div>
</div>

<div className="space-y-1">
<div className="flex justify-between font-caption text-caption">
<span className="font-semibold text-text-primary">📁 03_법무총무팀 (8.4 GB)</span>
<span className="font-code-mono text-text-muted">92% 완료 (690 / 750)</span>
</div>
<div className="h-3 w-full bg-surface-container rounded-full overflow-hidden flex">
<div className="bg-secondary h-full rounded-l-full"></div>
<div className="bg-surface-container-highest h-full"></div>
</div>
</div>

<div className="space-y-1">
<div className="flex justify-between font-caption text-caption">
<span className="font-semibold text-text-primary">📁 04_R&amp;D연구소 (5.9 GB)</span>
<span className="font-code-mono text-text-muted">89% 완료 (480 / 539)</span>
</div>
<div className="h-3 w-full bg-surface-container rounded-full overflow-hidden flex">
<div className="bg-secondary h-full rounded-l-full"></div>
<div className="bg-surface-container-highest h-full"></div>
</div>
</div>

<div className="space-y-1">
<div className="flex justify-between font-caption text-caption">
<span className="font-semibold text-text-primary">📁 05_인사마케팅팀 (2.8 GB)</span>
<span className="font-code-mono text-text-muted">87% 완료 (227 / 254)</span>
</div>
<div className="h-3 w-full bg-surface-container rounded-full overflow-hidden flex">
<div className="bg-secondary h-full rounded-l-full"></div>
<div className="bg-surface-container-highest h-full"></div>
</div>
</div>
</div>
<div className="flex items-center justify-between text-caption font-caption text-text-secondary pt-space-xs">
<span>평균 NPU 임베딩 처리 속도: <strong>48 docs/sec</strong></span>
<button className="text-secondary font-semibold hover:underline flex items-center gap-0.5" type="button">
            전체 백그라운드 재색인 실행
            <span className="material-symbols-outlined text-[13px]">refresh</span>
</button>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">

<div className="lg:col-span-4 bg-surface-card rounded-xl p-space-md shadow-sm flex flex-col">
<div className="flex items-center justify-between pb-space-sm mb-space-sm">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[18px] text-text-secondary">account_tree</span>
<span className="font-title-sm text-title-sm font-semibold text-text-primary">디렉토리 구조 트리</span>
</div>
<div className="flex items-center gap-1">
<button className="w-6 h-6 rounded hover:bg-surface-container flex items-center justify-center text-text-secondary" title="모두 펼치기" type="button">
<span className="material-symbols-outlined text-[15px]">unfold_more</span>
</button>
<button className="w-6 h-6 rounded hover:bg-surface-container flex items-center justify-center text-text-secondary" title="새로고침" type="button">
<span className="material-symbols-outlined text-[15px]">refresh</span>
</button>
</div>
</div>

<div className="flex flex-col gap-1 font-body-dense text-body-dense overflow-y-auto max-h-[380px] pr-1">
  <div className="flex items-center gap-1.5 p-1 rounded hover:bg-surface-container cursor-pointer text-text-primary font-semibold">
    <span className="material-symbols-outlined text-[16px] text-text-secondary">arrow_drop_down</span>
    <span className="material-symbols-outlined text-[18px] text-secondary">folder</span>
    <span className="truncate">{scanPath.split(/[\\/]/).pop() || "선택된 폴더"}</span>
  </div>

  {scanResult?.files && scanResult.files.length > 0 ? (
    scanResult.files.map((file: any, index: number) => (
      <div key={index} className="pl-6 flex items-center gap-2 p-1 rounded hover:bg-surface-canvas cursor-pointer text-text-secondary hover:text-text-primary">
        <span className="material-symbols-outlined text-[14px]">description</span>
        <span className="truncate text-[12px]" title={file.file_path}>{file.file_name}</span>
      </div>
    ))
  ) : (
    <div className="pl-6 text-text-muted text-xs p-2">스캔된 파일이 없습니다.</div>
  )}
</div>
<div className="mt-auto pt-space-sm flex items-center justify-between text-[11px] text-text-muted">
  <span>선택 노드: {scanPath.split(/[\\/]/).pop() || "-"}</span>
  <span className="font-code-mono">{scanResult?.files?.length || 0}개 파일</span>
</div>
</div>

<div className="lg:col-span-8 bg-surface-card rounded-xl p-space-md shadow-sm flex flex-col justify-between">
<div>
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm mb-space-xs">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-[18px] text-primary">view_list</span>
<span className="font-title-sm text-title-sm font-semibold text-text-primary">감지된 최근 파일 및 작업 목록</span>
<span className="px-space-xs py-0.5 rounded bg-surface-container text-text-secondary font-code-mono text-code-mono">{scanResult?.files?.length || 0}개 표시 중</span>
</div>
<div className="flex items-center gap-space-xs">
<input className="px-space-sm py-1 bg-surface-canvas rounded text-caption font-caption focus:outline-none focus:ring-1 focus:ring-secondary w-36" placeholder="결과 내 검색..." type="text"/>
<button className="h-7 px-space-xs rounded bg-surface-container hover:bg-surface-container-high text-caption font-caption text-text-secondary flex items-center gap-1" type="button">
<span className="material-symbols-outlined text-[14px]">tune</span>
<span>필터</span>
</button>
</div>
</div>

<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-canvas text-text-secondary font-caption text-caption font-semibold uppercase">
<th className="py-2 px-space-sm rounded-l">포맷</th>
<th className="py-2 px-space-sm">파일명</th>
<th className="py-2 px-space-sm hidden md:table-cell">경로</th>
<th className="py-2 px-space-sm">규모</th>
<th className="py-2 px-space-sm hidden sm:table-cell">수정일</th>
<th className="py-2 px-space-sm">색인/보안</th>
<th className="py-2 px-space-sm text-right rounded-r">빠른 액션</th>
</tr>
</thead>
<tbody className="font-body-dense text-body-dense">
  {scanResult?.files?.map((file: any, index: number) => (
    <tr key={index} className="hover:bg-surface-canvas transition-colors">
      <td className="py-2 px-space-sm">
        <span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label font-bold bg-format-pptx-bg text-format-pptx-text">
          {file.file_name.split('.').pop()?.toUpperCase() || 'FILE'}
        </span>
      </td>
      <td className="py-2 px-space-sm font-body-semibold text-text-primary truncate max-w-[150px]" title={file.file_name}>
        {file.file_name}
      </td>
      <td className="py-2 px-space-sm text-text-muted font-code-mono text-code-mono hidden md:table-cell truncate max-w-[100px]" title={file.file_path}>
        {file.file_path}
      </td>
      <td className="py-2 px-space-sm font-code-mono text-code-mono">N/A</td>
      <td className="py-2 px-space-sm text-text-muted hidden sm:table-cell">방금 전</td>
      <td className="py-2 px-space-sm">
        <span className="inline-flex items-center gap-1 text-[11px] text-diff-added-text font-medium"><span className="w-1.5 h-1.5 rounded-full bg-diff-added-text"></span>추가됨</span>
      </td>
      <td className="py-2 px-space-sm text-right">
        <div className="flex items-center justify-end gap-1">
          <button className="p-1 rounded hover:bg-surface-container text-secondary" title="탐색 열기" type="button"><span className="material-symbols-outlined text-[16px]">manage_search</span></button>
          <button className="p-1 rounded hover:bg-surface-container text-text-secondary" title="병합 추가" type="button"><span className="material-symbols-outlined text-[16px]">merge_type</span></button>
          <button className="p-1 rounded hover:bg-surface-container text-text-secondary" title="PII 검사" type="button"><span className="material-symbols-outlined text-[16px]">security</span></button>
        </div>
      </td>
    </tr>
  ))}
  {!scanResult?.files && (
    <tr>
      <td colSpan={7} className="py-8 text-center text-text-muted">스캔을 시작하여 폴더의 파일을 불러오세요.</td>
    </tr>
  )}
</tbody>
</table>
</div>
</div>

<div className="mt-space-md pt-space-xs flex flex-col sm:flex-row items-center justify-between gap-space-sm text-caption font-caption text-text-secondary">
<div className="flex items-center gap-space-sm">
<span>선택한 1개 파일:</span>
<button className="px-space-sm py-1 rounded bg-surface-container hover:bg-surface-container-high text-text-primary font-body-semibold" type="button">일괄 벡터 재색인</button>
<button className="px-space-sm py-1 rounded bg-surface-container hover:bg-surface-container-high text-text-primary font-body-semibold" type="button">포맷 변환 워크플로우로 전달</button>
</div>
<div className="flex items-center gap-1 font-code-mono">
<button className="w-6 h-6 rounded bg-surface-container flex items-center justify-center text-text-muted" type="button">&lt;</button>
<span className="px-2 py-0.5 rounded bg-primary text-on-primary font-bold">1</span>
<button className="w-6 h-6 rounded hover:bg-surface-container flex items-center justify-center text-text-primary" type="button">2</button>
<button className="w-6 h-6 rounded hover:bg-surface-container flex items-center justify-center text-text-primary" type="button">3</button>
<span>...</span>
<button className="w-6 h-6 rounded hover:bg-surface-container flex items-center justify-center text-text-primary" type="button">64</button>
<button className="w-6 h-6 rounded bg-surface-container flex items-center justify-center text-text-primary" type="button">&gt;</button>
</div>
</div>
</div>
</div>

<div className="bg-surface-card rounded-xl p-space-md shadow-sm transition-all duration-200" id="errorDrawer">
<div className="flex items-center justify-between cursor-pointer">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-status-cloud-text text-[20px]">warning</span>
<span className="font-body-semibold text-body-semibold text-text-primary">손상 및 암호 보호 파일 조치 알림 (총 2건 대기)</span>
<span className="px-2 py-0.5 rounded-full bg-status-cloud-bg text-status-cloud-text font-badge-label text-badge-label font-bold">Action Required</span>
</div>
<div className="flex items-center gap-space-xs text-text-muted">
<span className="font-caption text-caption">자세히 보기</span>
<span className="material-symbols-outlined text-[18px] transition-transform duration-200" id="errorArrow">expand_more</span>
</div>
</div>
<div className="mt-space-md pt-space-xs space-y-space-sm" id="errorContent">

<div className="flex flex-col sm:flex-row sm:items-center justify-between p-space-sm rounded-lg bg-surface-canvas gap-space-sm">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-status-cloud-text text-[18px]">lock</span>
<div>
<div className="font-body-semibold text-body-semibold text-text-primary">2024_임원급여_보안.xlsx</div>
<div className="text-caption font-caption text-text-muted">경로: D:\Enterprise_Data\2026_전략기획실\04_기밀인사정보 | 에러: AES-{scanResult?.added || 0} 암호 보호</div>
</div>
</div>
<div className="flex items-center gap-space-xs shrink-0">
<input className="h-7 px-space-sm bg-surface-card rounded text-caption font-code-mono focus:outline-none focus:ring-1 focus:ring-secondary w-36 shadow-sm" placeholder="문서 비밀번호 입력" type="password"/>
<button className="h-7 px-space-md rounded bg-primary text-on-primary font-caption text-caption font-semibold hover:bg-primary-container transition-colors" type="button">잠금해제</button>
</div>
</div>

<div className="flex flex-col sm:flex-row sm:items-center justify-between p-space-sm rounded-lg bg-surface-canvas gap-space-sm">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-status-danger-text text-[18px]">error</span>
<div>
<div className="font-body-semibold text-body-semibold text-text-primary">회계감사_스캔본_v1.pdf</div>
<div className="text-caption font-caption text-text-muted">경로: D:\Enterprise_Data\2026_전략기획실\02_재무회계 | 에러: PDF 헤더 EOF 마커 부재 (손상)</div>
</div>
</div>
<div className="flex items-center gap-space-xs shrink-0">
<button className="h-7 px-space-md rounded bg-surface-container hover:bg-surface-container-high text-text-secondary font-caption text-caption font-semibold transition-colors" type="button">복구 파서 시도</button>
<button className="h-7 px-space-md rounded bg-status-danger-bg text-status-danger-text hover:brightness-95 font-caption text-caption font-semibold transition-colors" type="button">색인에서 건너뛰기</button>
</div>
</div>
</div>
</div>
</div>
</div>
    
      <FolderPickerModal 
        isOpen={isFolderPickerOpen} 
        onClose={() => setIsFolderPickerOpen(false)} 
        onSelect={(path) => setScanPath(path)} 
        initialPath={""}
      />
</>
  );
}
