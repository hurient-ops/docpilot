import React, { useState, useEffect } from 'react';

export default function Header({ currentPath, onNavigate }: { currentPath: string, onNavigate: (path: string) => void }) {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSaaSMode, setIsSaaSMode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsNotifOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isSaaSMode && currentPath === 'billing') {
      onNavigate('directory');
    }
  }, [isSaaSMode, currentPath, onNavigate]);

  
  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };
  const getNavClasses = (path: string) => {
    return currentPath === path 
      ? "px-space-md py-1.5 rounded-lg transition-colors whitespace-nowrap bg-primary text-on-primary font-body-semibold shadow-sm"
      : "px-space-md py-1.5 rounded-lg font-body-default text-body-default text-text-secondary hover:text-on-surface hover:bg-surface-container transition-colors whitespace-nowrap";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-12 bg-surface-card border-b border-border-subtle shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-12 w-full px-gutter flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-md shrink-0"><div className="flex items-center gap-space-xs"><img src="/docpilot-logo.jpg" alt="DocPilot Logo" className="h-8 w-auto object-contain rounded-sm" /><span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">DocPilot</span></div><span className="px-space-xs py-0.5 rounded bg-surface-container text-text-secondary font-badge-label text-badge-label uppercase">v3.2 Enterprise</span></div><nav className="flex items-center gap-space-xs overflow-x-auto" data-active-classes="bg-surface-container text-primary font-body-semibold rounded">
      <a className={getNavClasses("directory")} onClick={() => onNavigate("directory")} href="#">디렉토리</a>
      <a className={getNavClasses("search")} onClick={() => onNavigate("search")} href="#">하이브리드 검색</a>
      <a className={getNavClasses("merger")} onClick={() => onNavigate("merger")} href="#">문서 병합 &amp; 변환</a>
      <a className={getNavClasses("compare")} onClick={() => onNavigate("compare")} href="#">다중 비교</a>
      <a className={getNavClasses("media")} onClick={() => onNavigate("media")} href="#">미디어 검색</a>
      <a className={getNavClasses("security")} onClick={() => onNavigate("security")} href="#">AI DLP / 보안</a>
      <a className={getNavClasses("history")} onClick={() => onNavigate("history")} href="#">작업 내역</a>
      <a className={getNavClasses("addin")} onClick={() => onNavigate("addin")} href="#">오피스 애드인</a>
      {isSaaSMode && (
        <a className={getNavClasses("billing")} onClick={() => onNavigate("billing")} href="#">결제 대시보드</a>
      )}
      <div className="flex items-center gap-1.5 px-space-sm py-1.5 ml-space-sm rounded-lg bg-status-local-bg border border-status-local-text/30 cursor-pointer hover:bg-surface-container transition-colors shrink-0">
<span className="w-2 h-2 rounded-full bg-status-local-text animate-pulse"></span>
<span className="font-caption text-caption font-semibold text-status-local-text">로컬 AI [NPU 가속 Standard]</span>
<span className="material-symbols-outlined text-[14px] text-status-local-text">arrow_drop_down</span>
</div></nav><div className="flex items-center gap-space-sm shrink-0"><button className="flex items-center gap-space-xs px-space-sm py-1 rounded bg-surface-container border border-border-subtle text-text-secondary hover:text-on-surface transition-colors" onClick={() => setIsSearchOpen(true)} type="button"><span className="material-symbols-outlined text-[16px]">search</span><span className="font-code-mono text-code-mono text-text-muted">Ctrl+K</span></button><button className="w-7 h-7 rounded flex items-center justify-center text-text-secondary hover:bg-surface-container hover:text-on-surface transition-colors" onClick={() => setIsNotifOpen(!isNotifOpen)} type="button"><span className="material-symbols-outlined text-[18px]">notifications</span></button>
<button onClick={() => setIsSaaSMode(!isSaaSMode)} className="px-2 py-1 text-[10px] font-bold rounded border transition-colors shrink-0 mr-2" style={{ borderColor: isSaaSMode ? '#3B82F6' : '#10B981', color: isSaaSMode ? '#3B82F6' : '#10B981', backgroundColor: isSaaSMode ? '#EFF6FF' : '#ECFDF5' }} title="Toggle Deployment Mode">
  {isSaaSMode ? 'SaaS Mode' : 'On-Premise'}
</button>
<button onClick={toggleDark} className="w-7 h-7 rounded flex items-center justify-center text-text-secondary hover:bg-surface-container hover:text-on-surface transition-colors" title="Toggle Dark Mode">
    <span className="material-symbols-outlined text-[18px]">{isDark ? 'light_mode' : 'dark_mode'}</span>
</button>
<div className="h-4 w-px bg-border-subtle mx-space-xs"></div><div className="flex items-center gap-space-xs pl-space-xs cursor-pointer"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div><span className="font-body-dense text-body-dense font-medium text-text-primary hidden xl:inline">워크스페이스</span><span className="material-symbols-outlined text-[14px] text-text-secondary">unfold_more</span></div></div></div>
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-start justify-center pt-20" onClick={() => setIsSearchOpen(false)}>
          <div className="bg-surface-card w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border border-border-subtle" onClick={e => e.stopPropagation()}>
            <div className="flex items-center px-4 py-3 border-b border-border-subtle">
              <span className="material-symbols-outlined text-text-muted mr-3">search</span>
              <input autoFocus type="text" placeholder="문서, 폴더 또는 설정 검색..." className="flex-1 bg-transparent border-none outline-none text-text-primary text-body-lg" />
              <button className="px-2 py-1 bg-surface-container rounded text-text-muted text-[12px] font-semibold" onClick={() => setIsSearchOpen(false)}>ESC</button>
            </div>
            <div className="p-2">
              <div className="px-2 py-1.5 text-[12px] font-semibold text-text-muted uppercase">최근 검색</div>
              <div className="flex items-center px-3 py-2 hover:bg-surface-container rounded-lg cursor-pointer text-text-primary gap-3">
                <span className="material-symbols-outlined text-[18px] text-text-muted">history</span>
                <span>분기별 재무제표 2026</span>
              </div>
              <div className="flex items-center px-3 py-2 hover:bg-surface-container rounded-lg cursor-pointer text-text-primary gap-3">
                <span className="material-symbols-outlined text-[18px] text-text-muted">history</span>
                <span>API 연동 가이드라인</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {isNotifOpen && (
        <div className="absolute top-12 right-20 w-80 bg-surface-card rounded-lg shadow-xl border border-border-subtle z-[100] overflow-hidden">
          <div className="px-4 py-3 border-b border-border-subtle flex justify-between items-center">
            <h3 className="font-headline-sm font-semibold text-text-primary">알림</h3>
            <span className="text-[12px] text-primary cursor-pointer hover:underline">모두 읽음 처리</span>
          </div>
          <div className="max-h-80 overflow-y-auto">
            <div className="p-4 border-b border-border-subtle/50 hover:bg-surface-container/50 cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-[13px] text-text-primary">스캔 완료</span>
                <span className="text-[11px] text-text-muted">방금 전</span>
              </div>
              <p className="text-[12px] text-text-secondary">'C:\DocPilot\Data' 폴더의 인덱싱이 성공적으로 완료되었습니다.</p>
            </div>
            <div className="p-4 hover:bg-surface-container/50 cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-[13px] text-text-primary">DLP 경고</span>
                <span className="text-[11px] text-text-muted">2시간 전</span>
              </div>
              <p className="text-[12px] text-text-secondary">기밀 문서를 클라우드 API로 전송하려는 시도가 차단되었습니다.</p>
            </div>
          </div>
        </div>
      )}
</header>
  );
}
