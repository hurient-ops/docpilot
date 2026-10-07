import React from 'react';

export default function Header({ currentPath, onNavigate }: { currentPath: string, onNavigate: (path: string) => void }) {
  const getNavClasses = (path: string) => {
    return currentPath === path 
      ? "px-space-md py-1.5 rounded-lg transition-colors whitespace-nowrap bg-primary text-on-primary font-body-semibold shadow-sm"
      : "px-space-md py-1.5 rounded-lg font-body-default text-body-default text-text-secondary hover:text-on-surface hover:bg-surface-container transition-colors whitespace-nowrap";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-12 bg-surface-card border-b border-border-subtle shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-12 w-full px-gutter flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-md shrink-0"><div className="flex items-center gap-space-xs"><img alt="DocPilot Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1X4l-ue-zS7f63_a0Fbxlvu-6nC8TgBn_qzPL4qSNgJ9-1nmSW2pxHtqXbuNWmdt-hWcZlf7jBMF3o98D-JCWzTlJ_hxu6lRRJK8tkpav51hxNWGcqAEVOqEod-ICWQxDmpL79qWhTxUse_HxbQcU8WrRhkpiHps7SfSpgq7G7YxB037Hc7t6BD4hAdpLdWvSUj0_qNPASSaUDIh_6MarkLBuJXK2IVbWXmA9CxH0iaPC_jSLR0AYMnjyG-"/><span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">DocPilot</span></div><span className="px-space-xs py-0.5 rounded bg-surface-container text-text-secondary font-badge-label text-badge-label uppercase">v3.2 Enterprise</span></div><nav className="flex items-center gap-space-xs overflow-x-auto" data-active-classes="bg-surface-container text-primary font-body-semibold rounded">
      <a className={getNavClasses("directory")} onClick={() => onNavigate("directory")} href="#">디렉토리</a>
      <a className={getNavClasses("search")} onClick={() => onNavigate("search")} href="#">하이브리드 검색</a>
      <a className={getNavClasses("merger")} onClick={() => onNavigate("merger")} href="#">문서 병합 &amp; 변환</a>
      <a className={getNavClasses("compare")} onClick={() => onNavigate("compare")} href="#">다중 비교</a>
      <a className={getNavClasses("media")} onClick={() => onNavigate("media")} href="#">미디어 검색</a>
      <a className={getNavClasses("security")} onClick={() => onNavigate("security")} href="#">AI DLP / 보안</a>
      <a className={getNavClasses("history")} onClick={() => onNavigate("history")} href="#">작업 내역</a>
      <a className={getNavClasses("billing")} onClick={() => onNavigate("billing")} href="#">결제 대시보드</a>
      <div className="flex items-center gap-1.5 px-space-sm py-1.5 ml-space-sm rounded-lg bg-status-local-bg border border-status-local-text/30 cursor-pointer hover:bg-surface-container transition-colors shrink-0">
<span className="w-2 h-2 rounded-full bg-status-local-text animate-pulse"></span>
<span className="font-caption text-caption font-semibold text-status-local-text">로컬 AI [NPU 가속 Standard]</span>
<span className="material-symbols-outlined text-[14px] text-status-local-text">arrow_drop_down</span>
</div></nav><div className="flex items-center gap-space-sm shrink-0"><button className="flex items-center gap-space-xs px-space-sm py-1 rounded bg-surface-container border border-border-subtle text-text-secondary hover:text-on-surface transition-colors" type="button"><span className="material-symbols-outlined text-[16px]">search</span><span className="font-code-mono text-code-mono text-text-muted">Ctrl+K</span></button><button className="w-7 h-7 rounded flex items-center justify-center text-text-secondary hover:bg-surface-container hover:text-on-surface transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">notifications</span></button><button className="w-7 h-7 rounded flex items-center justify-center text-text-secondary hover:bg-surface-container hover:text-on-surface transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">settings</span></button>
<button onClick={() => document.documentElement.classList.toggle('dark')} className="p-1.5 rounded hover:bg-surface-container text-text-secondary hover:text-text-primary transition-colors ml-2" title="Toggle Dark Mode">
    <span className="material-symbols-outlined text-[18px]">dark_mode</span>
</button>
<div className="h-4 w-px bg-border-subtle mx-space-xs"></div><div className="flex items-center gap-space-xs pl-space-xs cursor-pointer"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><span className="font-body-dense text-body-dense font-medium text-text-primary hidden xl:inline">워크스페이스</span><span className="material-symbols-outlined text-[14px] text-text-secondary">unfold_more</span></div></div></div></header>
  );
}
