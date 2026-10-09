import React, { useState, useEffect } from 'react';
import { api } from '../api';

const TreeNode = ({ name, fullPath, type, level = 0 }: { name: string, fullPath: string, type: string, level?: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [children, setChildren] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOpen && !loaded) {
      setLoading(true);
      try {
        const res = await api.browseDirectory(fullPath);
        if (res.directories) {
          setChildren(res.directories.map((dir: string) => ({
            name: dir,
            fullPath: fullPath ? `${fullPath}/${dir}`.replace(/\\/g, '/').replace('//', '/') : dir,
            type: 'folder'
          })));
        }
        setLoaded(true);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="flex flex-col">
      <div 
        className="flex items-center gap-1.5 py-1 px-2 cursor-pointer hover:bg-surface-container"
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleToggle}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData('text/plain', fullPath);
        }}
      >
        <div className="w-4 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[16px] text-text-muted">
            {isOpen ? "keyboard_arrow_down" : "chevron_right"}
          </span>
        </div>
        <span className={`material-symbols-outlined text-[16px] ${type === 'drive' ? 'text-text-secondary' : 'text-yellow-500'}`}>
          {type === 'drive' ? 'hard_drive' : (isOpen ? 'folder_open' : 'folder')}
        </span>
        <span className="text-[13px] text-text-primary whitespace-nowrap overflow-hidden text-ellipsis">{name}</span>
        {loading && <span className="material-symbols-outlined text-[12px] animate-spin text-text-muted ml-auto">sync</span>}
      </div>
      {isOpen && (
        <div className="flex flex-col">
          {children.map((child, idx) => (
            <TreeNode key={idx} name={child.name} fullPath={child.fullPath} type={child.type} level={level + 1} />
          ))}
          {loaded && children.length === 0 && (
             <div className="text-[11px] text-text-muted py-1" style={{ paddingLeft: `${(level + 1) * 16 + 28}px` }}>빈 폴더</div>
          )}
        </div>
      )}
    </div>
  );
};

export default function Sidebar({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const [drives, setDrives] = useState<any[]>([]);

  useEffect(() => {
    api.browseDirectory("").then(res => {
      if (res.directories) {
        setDrives(res.directories.map((d: string) => ({ name: `로컬 디스크 (${d.replace('\\\\', '')})`, fullPath: d, type: 'drive' })));
      }
    });
  }, []);

  return (
    <aside className="fixed left-0 top-12 bottom-7 w-64 bg-surface-card border-r border-surface-container z-30 flex flex-col hidden md:flex">


      <div className="p-space-sm pb-1">
        <span className="px-space-xs text-caption font-caption text-text-muted font-semibold">메인 메뉴</span>
      </div>
      
      <nav className="flex flex-col gap-1 p-space-sm pt-0">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('directory'); }} className="flex items-center gap-3 px-space-md py-2 rounded-lg bg-primary-container text-primary-fixed font-body-semibold transition-colors">
          <span className="material-symbols-outlined text-[20px]">folder_managed</span>
          <span>디렉토리 분석</span>
        </a>
      </nav>

      <div className="p-space-sm border-t border-surface-container flex-1 overflow-y-auto custom-scrollbar">
        <span className="px-space-xs text-caption font-caption text-text-muted font-semibold mb-2 block">내 로컬 라이브러리</span>
        <div className="flex flex-col">
          {drives.map((drive, idx) => (
            <TreeNode key={idx} name={drive.name} fullPath={drive.fullPath} type={drive.type} />
          ))}
        </div>
      </div>

      <div className="p-space-md border-t border-surface-container flex flex-col gap-2">
        <button className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm" onClick={() => onNavigate && onNavigate('settings')}>
          <span className="material-symbols-outlined text-[20px]">settings</span>
          <span>설정</span>
        </button>
        <div className="flex items-center justify-between mt-2 p-2 hover:bg-surface-container rounded-lg cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shadow-sm text-[14px]">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold text-text-primary">관리자 (Admin)</span>
              <span className="text-[11px] text-text-muted">admin@docpilot.ai</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[16px] text-text-muted hover:text-status-error transition-colors" title="로그아웃" onClick={() => window.location.reload()}>logout</span>
        </div>
      </div>
    </aside>
  );
}
