import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../api';

const FileTreeNode = ({ name, node, isRoot = false, level = 0 }: { name: string, node: any, isRoot?: boolean, level?: number }) => {
  const [isOpen, setIsOpen] = useState(isRoot || level < 1);
  const hasSubFolders = node.folders ? Object.keys(node.folders).length > 0 : false;
  const hasFiles = node.files ? node.files.length > 0 : false;
  const hasChildren = hasSubFolders || hasFiles;

  if (isRoot) {
    return (
      <div className="flex flex-col">
        {node.folders && Object.entries(node.folders).map(([folderName, folderNode]: [string, any]) => (
          <FileTreeNode key={folderName} name={folderName} node={folderNode} level={level + 1} />
        ))}
        {node.files && node.files.map((file: any, idx: number) => (
          <FileTreeNode key={`file-${idx}`} name={file.file_name || file.name} node={file} level={level + 1} />
        ))}
      </div>
    );
  }

  const isFile = !node.folders;

  return (
    <div className="flex flex-col">
      <div 
        className={`flex items-center gap-1.5 py-1 px-2 cursor-pointer hover:bg-surface-container ${isFile ? '' : 'font-semibold'}`}
        style={{ paddingLeft: `${level * 16}px` }}
        onClick={() => !isFile && setIsOpen(!isOpen)}
      >
        {!isFile && (
          <div className="w-4 flex items-center justify-center shrink-0">
            {hasChildren ? (
              <span className="material-symbols-outlined text-[16px] text-text-muted">
                {isOpen ? "keyboard_arrow_down" : "chevron_right"}
              </span>
            ) : <span className="w-4" />}
          </div>
        )}
        {isFile && <div className="w-4 flex items-center justify-center shrink-0"><span className="w-4" /></div>}
        <span className={`material-symbols-outlined text-[16px] ${isFile ? 'text-text-muted' : 'text-yellow-500'}`}>
          {isFile ? 'description' : (isOpen ? 'folder_open' : 'folder')}
        </span>
        <span className={`text-[13px] ${isFile ? 'text-text-secondary' : 'text-text-primary'} whitespace-nowrap overflow-hidden text-ellipsis`} title={name}>
          {name}
        </span>
      </div>
      {!isFile && isOpen && hasChildren && (
        <div className="flex flex-col">
          {node.folders && Object.entries(node.folders).map(([folderName, folderNode]: [string, any]) => (
            <FileTreeNode key={folderName} name={folderName} node={folderNode} level={level + 1} />
          ))}
          {node.files && node.files.map((file: any, idx: number) => (
            <FileTreeNode key={`file-${idx}`} name={file.file_name || file.name} node={file} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function DirectoryScreen({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const [scanPath, setScanPath] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState<{ progress: number, status: string } | null>(null);
  
  // 리사이즈 로직
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const isResizing = useRef(false);
  const lastX = useRef(0);

  const startResizing = (e: React.MouseEvent) => {
    isResizing.current = true;
    lastX.current = e.clientX;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const delta = e.clientX - lastX.current;
    lastX.current = e.clientX;
    setSidebarWidth(prev => Math.max(200, Math.min(800, prev + delta)));
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  };

  useEffect(() => {
    const ws = new WebSocket('ws://127.0.0.1:8000/ws');
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'progress' && data.task_id === 'scan_dir') {
          setScanProgress({ progress: data.progress, status: data.status });
        }
      } catch (e) {
        console.error("WS parse error", e);
      }
    };
    
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const storedPath = sessionStorage.getItem('docpilot_scanPath');
    const storedResult = sessionStorage.getItem('docpilot_scanResult');
    if (storedPath) setScanPath(storedPath);
    if (storedResult) {
      try {
        setScanResult(JSON.parse(storedResult));
      } catch (e) {
        console.error("Failed to parse stored scan result", e);
      }
    }
  }, []);


  const handleScan = async () => {
    if (!scanPath) return;
    setLoading(true);
    setScanProgress({ progress: 0, status: '스캔 준비 중...' });
    try {
      const result = await api.scanDirectory(scanPath);
      const data = result.stats || result;
      setScanResult(data);
      sessionStorage.setItem('docpilot_scanPath', scanPath);
      sessionStorage.setItem('docpilot_scanResult', JSON.stringify(data));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setScanProgress(null);
    }
  };

  const files = scanResult?.files || [];
  
  const formatCounts = { PPTX: 0, XLSX: 0, DOCX: 0, HWP: 0, PDF: 0 };
  const sizeCounts = { PPTX: 0, XLSX: 0, DOCX: 0, HWP: 0, PDF: 0 };
  let totalSize = 0;
  
  files.forEach((f: any) => {
    const ext = (f.extension || f.file_name?.split('.').pop() || '').toUpperCase();
    const size = f.size || f.file_size || 0;
    
    if (ext === 'PPT' || ext === 'PPTX') { formatCounts.PPTX++; sizeCounts.PPTX += size; }
    else if (ext === 'XLS' || ext === 'XLSX') { formatCounts.XLSX++; sizeCounts.XLSX += size; }
    else if (ext === 'DOC' || ext === 'DOCX') { formatCounts.DOCX++; sizeCounts.DOCX += size; }
    else if (ext === 'HWP' || ext === 'HWPX') { formatCounts.HWP++; sizeCounts.HWP += size; }
    else if (ext === 'PDF') { formatCounts.PDF++; sizeCounts.PDF += size; }
    
    totalSize += size;
  });
  
  const totalFormats = Object.values(formatCounts).reduce((a, b) => a + b, 0);
  const formatLabels = [
    { key: 'HWP', label: 'HWP/HWPX', bg: 'bg-format-hwp-bg', text: 'text-format-hwp-text', stroke: '#0EA5E9' },
    { key: 'DOCX', label: 'DOCX', bg: 'bg-format-docx-bg', text: 'text-format-docx-text', stroke: '#3B82F6' },
    { key: 'XLSX', label: 'XLSX', bg: 'bg-format-xlsx-bg', text: 'text-format-xlsx-text', stroke: '#22C55E' },
    { key: 'PPTX', label: 'PPTX', bg: 'bg-format-pptx-bg', text: 'text-format-pptx-text', stroke: '#F97316' },
    { key: 'PDF', label: 'PDF', bg: 'bg-format-pdf-bg', text: 'text-format-pdf-text', stroke: '#EF4444' }
  ];

  let currentOffset = 0;
  const segments = formatLabels.map((fmt) => {
    const count = formatCounts[fmt.key as keyof typeof formatCounts];
    const percentage = totalFormats > 0 ? (count / totalFormats) * 100 : 0;
    const segment = { ...fmt, percentage, offset: currentOffset };
    currentOffset += percentage;
    return segment;
  });

  const totalSizeStr = totalSize > 1024*1024*1024 ? (totalSize/(1024*1024*1024)).toFixed(1) + ' GB' : (totalSize/(1024*1024)).toFixed(1) + ' MB';

  const buildTree = () => {
    const root: any = { folders: {}, files: [] };
    if (!files.length) return root;
    let normScanPath = scanPath.replace(/\\/g, '/').toLowerCase();
    if (normScanPath.endsWith('/')) normScanPath = normScanPath.slice(0, -1);
    
    files.forEach((file: any) => {
      const filePath = file.file_path || file.name || "";
      if (!filePath || !scanPath) {
        root.files.push(file);
        return;
      }
      const normFilePath = filePath.replace(/\\/g, '/');
      const lowerFilePath = normFilePath.toLowerCase();
      let relPath = normFilePath;
      
      if (lowerFilePath.startsWith(normScanPath)) {
         relPath = normFilePath.substring(normScanPath.length);
      }
      if (relPath.startsWith('/')) relPath = relPath.substring(1);
      
      const parts = relPath.split('/');
      let current = root;
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current.folders[part]) current.folders[part] = { folders: {}, files: [] };
        current = current.folders[part];
      }
      current.files.push(file);
    });
    return root;
  };
  
  const fileTree = buildTree();
  
  const getDirSize = (node: any): number => {
    let size = 0;
    node.files.forEach((f: any) => size += (f.size || f.file_size || 0));
    Object.values(node.folders).forEach((child: any) => size += getDirSize(child));
    return size;
  };

  const filteredFiles = files.filter((f: any) => {
    if (!selectedFormat) return true;
    const ext = (f.extension || f.file_name?.split('.').pop() || '').toUpperCase();
    if (selectedFormat === 'HWP') return ext === 'HWP' || ext === 'HWPX';
    if (selectedFormat === 'PPTX') return ext === 'PPT' || ext === 'PPTX';
    if (selectedFormat === 'XLSX') return ext === 'XLS' || ext === 'XLSX';
    if (selectedFormat === 'DOCX') return ext === 'DOC' || ext === 'DOCX';
    if (selectedFormat === 'PDF') return ext === 'PDF';
    return false;
  });

  return (
    <div className="h-full flex flex-col p-space-md gap-space-md">
      <div className="flex flex-col gap-space-sm">
        <h1 className="font-title-lg text-title-lg font-bold text-primary">디렉토리 분석</h1>
        <p className="font-body-default text-body-default text-text-secondary">로컬 스토리지의 문서를 스캔하고 AI 분석을 위한 인덱스를 생성합니다.</p>
      </div>

      <div className="flex gap-space-sm items-center">
        <div className="flex-1 flex bg-surface-card border border-surface-container rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary overflow-hidden">
          <div className="px-space-sm py-2 text-text-muted border-r border-surface-container bg-surface-container flex items-center">
            <span className="material-symbols-outlined text-[18px]">folder_open</span>
          </div>
          <input 
            type="text" 
            value={scanPath} 
            onChange={(e) => setScanPath(e.target.value)}
            onDrop={(e) => { e.preventDefault(); const p = e.dataTransfer.getData('text/plain'); if (p) setScanPath(p); }}
            onDragOver={(e) => e.preventDefault()}
            placeholder="폴더를 이곳에 드래그 앤 드롭하거나 경로를 입력하세요" 
            className="flex-1 bg-transparent text-body-default outline-none text-text-primary px-space-sm" 
          />
        </div>
        <button 
          onClick={handleScan}
          disabled={loading || !scanPath}
          className="px-space-lg py-2 bg-primary text-on-primary rounded-lg font-body-semibold hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <span className="material-symbols-outlined animate-spin text-[20px]">sync</span> : <span className="material-symbols-outlined text-[20px]">search</span>}
          {loading ? '스캔 중...' : '스캔 시작'}
        </button>
      </div>

      {loading && scanProgress && (
        <div className="flex flex-col gap-2 mt-2 p-4 bg-surface-card border border-primary/20 rounded-lg">
          <div className="flex justify-between text-sm text-text-secondary font-body-semibold">
            <span>{scanProgress.status}</span>
            <span className="text-primary">{scanProgress.progress}%</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden">
            <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{ width: `${scanProgress.progress}%` }}></div>
          </div>
        </div>
      )}

      {scanResult && !loading && (
        <div className="flex-1 flex flex-col gap-space-md min-h-0">
          
          {/* 퀵 액션 메뉴 (스캔 후 활성화) */}
          <div className="flex gap-4 p-4 bg-primary/5 border border-primary/20 rounded-lg animate-fade-in">
            <div className="flex items-center gap-2 text-primary font-bold mr-4">
              <span className="material-symbols-outlined">bolt</span>
              빠른 실행
            </div>
            <button onClick={() => onNavigate && onNavigate('synthesis')} className="flex items-center gap-2 px-4 py-2 bg-surface-card border border-border-subtle rounded-lg hover:border-primary hover:text-primary transition-all text-sm font-semibold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">post_add</span> 문서 재조합
            </button>
            <button onClick={() => onNavigate && onNavigate('compare')} className="flex items-center gap-2 px-4 py-2 bg-surface-card border border-border-subtle rounded-lg hover:border-primary hover:text-primary transition-all text-sm font-semibold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">compare</span> 다중 문서 비교
            </button>
            <button onClick={() => onNavigate && onNavigate('media')} className="flex items-center gap-2 px-4 py-2 bg-surface-card border border-border-subtle rounded-lg hover:border-primary hover:text-primary transition-all text-sm font-semibold shadow-sm">
              <span className="material-symbols-outlined text-[18px]">perm_media</span> 멀티모달 검색
            </button>
            <button onClick={() => onNavigate && onNavigate('billing')} className="flex items-center gap-2 px-4 py-2 bg-surface-card border border-border-subtle rounded-lg hover:border-primary hover:text-primary transition-all text-sm font-semibold shadow-sm ml-auto">
              <span className="material-symbols-outlined text-[18px]">credit_card</span> 결제 관리
            </button>
          </div>

          <div className="flex-1 flex min-h-0">
            <div style={{ width: sidebarWidth }} className="flex flex-col min-h-0 shrink-0">
            <div className="bg-surface-card rounded-lg border border-surface-container flex flex-col h-full min-h-0">
              <div className="p-space-sm border-b border-surface-container flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">account_tree</span>
                <h3 className="font-body-semibold text-text-primary">디렉토리 구조 트리</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-space-xs custom-scrollbar">
                <FileTreeNode name="root" node={fileTree} isRoot={true} />
              </div>
            </div>
          </div>
          
          {/* 드래그 핸들 (Resizer) */}
          <div 
            onMouseDown={startResizing}
            className="w-4 flex items-center justify-center cursor-col-resize hover:bg-primary/10 mx-2 rounded group"
          >
            <div className="w-1 h-8 bg-border-subtle group-hover:bg-primary rounded-full transition-colors"></div>
          </div>

          <div className="flex-1 flex flex-col min-w-0 min-h-0">
            <div className="grid grid-cols-3 gap-space-md">
              <div className="bg-surface-card rounded-lg border border-surface-container p-space-md flex flex-col">
                <div className="flex items-center gap-2 mb-space-md">
                  <span className="material-symbols-outlined text-[20px] text-secondary">pie_chart</span>
                  <h3 className="font-body-semibold text-text-primary">포맷별 분석 점유율</h3>
                </div>
                <div className="flex items-center justify-between">
                  <div className="relative w-48 h-48 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" strokeWidth="4" />
                      {segments.map((seg) => (
                         seg.percentage > 0 && (
                           <path key={seg.key} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                                 fill="none" strokeWidth="4" 
                                 stroke={seg.stroke} 
                                 strokeDasharray={`${seg.percentage} ${100 - seg.percentage}`} 
                                 strokeDashoffset={100 - seg.offset} />
                         )
                      ))}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-display-sm text-display-sm font-bold text-text-primary">{files.length}</span>
                      <span className="font-body-default text-body-default text-text-muted">Total</span>
                    </div>
                  </div>
                  <div className="flex-1 pl-space-md flex flex-col gap-1 justify-center">
                    {formatLabels.map(fmt => (
                      <div key={fmt.key} className="flex items-center justify-between font-caption text-caption">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full`} style={{ backgroundColor: fmt.stroke }}></span>
                          <span className="text-text-secondary">{fmt.key}</span>
                        </div>
                        <span className="font-code-mono text-text-primary">{formatCounts[fmt.key as keyof typeof formatCounts]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-surface-card rounded-lg border border-surface-container p-space-md flex flex-col">
                <div className="flex items-center gap-2 mb-space-sm">
                  <span className="material-symbols-outlined text-[20px] text-tertiary">analytics</span>
                  <h3 className="font-body-semibold text-text-primary">분석 데이터 메트릭</h3>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-1">
                  <div className="flex flex-col col-span-2">
                    <span className="font-caption text-caption text-text-muted mb-1">총 데이터 용량</span>
                    <div className="flex items-end justify-between">
                      <span className="font-headline-md text-headline-md font-bold text-text-primary">{totalSizeStr}</span>
                      <span className="font-caption text-caption text-text-muted">오류: <span className="text-status-danger-text">{scanResult.errors || 0}</span>건</span>
                    </div>
                    <div className="mt-4 flex justify-around items-end h-32 w-full border-b border-surface-container pb-2">
                      {formatLabels.map((fmt) => {
                        const sz = sizeCounts[fmt.key as keyof typeof sizeCounts];
                        const pct = totalSize > 0 ? (sz / totalSize) * 100 : 0;
                        const szStr = sz > 1024*1024*1024 ? (sz/(1024*1024*1024)).toFixed(1) + ' GB' : sz > 1024*1024 ? (sz/(1024*1024)).toFixed(1) + ' MB' : (sz/1024).toFixed(1) + ' KB';
                        return (
                          <div key={fmt.key} className="flex flex-col items-center gap-1 w-1/5">
                            <div className="w-6 bg-surface-container rounded-t-sm relative h-20 overflow-hidden">
                              <div className="absolute bottom-0 w-full transition-all duration-500" style={{ height: `${pct}%`, backgroundColor: fmt.stroke }}></div>
                            </div>
                            <div className="flex flex-col items-center leading-tight mt-1">
                              <span className={`font-badge-label font-bold text-[10px] ${fmt.text}`}>{fmt.label}</span>
                              <span className="font-caption text-[10px] text-text-muted">{szStr}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface-card rounded-lg border border-surface-container flex flex-col min-h-0">
                <div className="p-space-sm border-b border-surface-container flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-primary">storage</span>
                  <h3 className="font-body-semibold text-text-primary">폴더 계층별 용량 & 증분 색인 상태</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-space-sm custom-scrollbar space-y-3">
                  {Object.entries(fileTree.folders).map(([subFolderName, subNode]: [string, any]) => {
                    const count = subNode.files.length + Object.keys(subNode.folders).length;
                    const size = getDirSize(subNode);
                    const szStr = size > 1024*1024*1024 ? (size/(1024*1024*1024)).toFixed(1) + ' GB' : size > 1024*1024 ? (size/(1024*1024)).toFixed(1) + ' MB' : (size/1024).toFixed(1) + ' KB';
                    return (
                      <div key={subFolderName} className="space-y-1">
                        <div className="flex justify-between font-caption text-caption">
                          <span className="font-semibold text-text-primary">📁 {subFolderName} ({szStr})</span>
                          <span className="font-code-mono text-text-muted">100% 완료 ({count})</span>
                        </div>
                        <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden flex">
                          <div className="bg-secondary h-full rounded-l-full" style={{width: '100%'}}></div>
                        </div>
                      </div>
                    );
                  })}
                  {Object.keys(fileTree.folders).length === 0 && (
                    <div className="text-center text-text-muted py-4">하위 폴더가 없습니다.</div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-surface-card rounded-lg border border-surface-container flex-1 flex flex-col min-h-0">
              <div className="p-space-sm border-b border-surface-container flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-primary">view_list</span>
                    <h3 className="font-body-semibold text-text-primary">포맷 필터링</h3>
                    <span className="bg-primary-container px-2 py-0.5 rounded-full text-[12px] font-bold text-primary-fixed ml-2">{files.length}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-space-xs">
                  <button 
                    onClick={() => setSelectedFormat(null)}
                    className={`px-3 py-1 rounded font-badge-label font-bold border transition-colors ${!selectedFormat ? 'bg-surface-dim text-text-primary border-border-strong' : 'bg-surface-canvas text-text-primary border-surface-container hover:bg-surface-container'}`}
                  >
                    전체보기
                  </button>
                  {formatLabels.map(fmt => (
                    <button 
                      key={fmt.key}
                      onClick={() => setSelectedFormat(fmt.key)}
                      className={`px-3 py-1 rounded font-badge-label font-bold border transition-colors ${selectedFormat === fmt.key ? fmt.bg + ' ' + fmt.text + ' border-current opacity-100' : 'bg-opacity-20 ' + fmt.bg + ' ' + fmt.text + ' border-surface-container hover:bg-opacity-40'}`}
                    >
                      {fmt.label} <span className="ml-1 opacity-75">({formatCounts[fmt.key as keyof typeof formatCounts]})</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left border-collapse" style={{ tableLayout: 'fixed' }}>
                  <thead className="sticky top-0 bg-surface-card shadow-sm z-10">
                    <tr className="border-b border-surface-container text-caption font-caption font-semibold text-text-secondary">
                      <th className="py-2 px-space-sm font-normal w-24">포맷</th>
                      <th className="py-2 px-space-sm font-normal w-64"><div className="resize-x overflow-hidden whitespace-nowrap min-w-[150px] font-semibold">파일 이름</div></th>
                      <th className="py-2 px-space-sm font-normal w-80"><div className="resize-x overflow-hidden whitespace-nowrap min-w-[150px] font-semibold">경로</div></th>
                      <th className="py-2 px-space-sm font-normal w-24">용량</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-dense text-body-dense text-text-primary">
                    {filteredFiles.map((file: any, idx: number) => {
                      const ext = (file.extension || file.file_name?.split('.').pop() || '').toUpperCase();
                      const fmt = formatLabels.find(f => ext.includes(f.key.replace('X', ''))) || formatLabels[4];
                      const sz = file.size || file.file_size || 0;
                      return (
                        <tr key={idx} className="border-b border-surface-container hover:bg-surface-container transition-colors">
                          <td className="py-2 px-space-sm">
                            <span className={`px-space-xs py-0.5 rounded font-badge-label text-badge-label font-bold ${fmt.bg} ${fmt.text}`}>
                              {fmt.key}
                            </span>
                          </td>
                          <td className="py-2 px-space-sm">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-[16px] text-text-muted">description</span>
                              <span className="font-semibold truncate block w-full" title={file.file_name || file.name}>{file.file_name || file.name}</span>
                            </div>
                          </td>
                          <td className="py-2 px-space-sm text-text-secondary truncate w-full" title={file.file_path}>{file.file_path}</td>
                          <td className="py-2 px-space-sm font-code-mono text-code-mono">
                            {sz > 0 ? (sz > 1024*1024 ? (sz/(1024*1024)).toFixed(1) + " MB" : (sz/1024).toFixed(1) + " KB") : "N/A"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
