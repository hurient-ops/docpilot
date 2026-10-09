import os

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'

react_code = """import React, { useState, useEffect } from 'react';
import { api } from '../../api';

const FileTreeNode = ({ name, node, isRoot = false, level = 0 }: { name: string, node: any, isRoot?: boolean, level?: number }) => {
  const [isOpen, setIsOpen] = useState(isRoot || level < 1);
  const hasSubFolders = Object.keys(node.folders).length > 0;
  const hasFiles = node.files.length > 0;
  const hasChildren = hasSubFolders || hasFiles;

  if (isRoot) {
    return (
      <div className="flex flex-col">
        {Object.entries(node.folders).map(([folderName, folderNode]: [string, any]) => (
          <FileTreeNode key={folderName} name={folderName} node={folderNode} level={level + 1} />
        ))}
        {node.files.map((file: any, idx: number) => (
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
          {Object.entries(node.folders).map(([folderName, folderNode]: [string, any]) => (
            <FileTreeNode key={folderName} name={folderName} node={folderNode} level={level + 1} />
          ))}
          {node.files.map((file: any, idx: number) => (
            <FileTreeNode key={`file-${idx}`} name={file.file_name || file.name} node={file} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function DirectoryScreen() {
  const [scanPath, setScanPath] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  useEffect(() => {
    const savedPath = sessionStorage.getItem('scanPath');
    const savedResult = sessionStorage.getItem('scanResult');
    if (savedPath) setScanPath(savedPath);
    if (savedResult) setScanResult(JSON.parse(savedResult));
  }, []);

  const handleScan = async () => {
    if (!scanPath) return;
    setLoading(true);
    try {
      const result = await api.scanDirectory(scanPath);
      const data = result.stats || result;
      setScanResult(data);
      sessionStorage.setItem('scanPath', scanPath);
      sessionStorage.setItem('scanResult', JSON.stringify(data));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const files = scanResult?.files || [];
  
  const formatCounts = { PPTX: 0, XLSX: 0, DOCX: 0, HWP: 0, PDF: 0 };
  let totalSize = 0;
  
  files.forEach((f: any) => {
    const ext = (f.extension || f.file_name?.split('.').pop() || '').toUpperCase();
    if (ext === 'PPT' || ext === 'PPTX') formatCounts.PPTX++;
    else if (ext === 'XLS' || ext === 'XLSX') formatCounts.XLSX++;
    else if (ext === 'DOC' || ext === 'DOCX') formatCounts.DOCX++;
    else if (ext === 'HWP' || ext === 'HWPX') formatCounts.HWP++;
    else if (ext === 'PDF') formatCounts.PDF++;
    totalSize += f.size || 0;
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
    let normScanPath = scanPath.replace(/\\\\/g, '/').toLowerCase();
    if (normScanPath.endsWith('/')) normScanPath = normScanPath.slice(0, -1);
    
    files.forEach((file: any) => {
      const filePath = file.file_path || file.name || "";
      if (!filePath || !scanPath) {
        root.files.push(file);
        return;
      }
      const normFilePath = filePath.replace(/\\\\/g, '/');
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
    node.files.forEach((f: any) => size += (f.size || 0));
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

      {scanResult && (
        <div className="flex-1 grid grid-cols-12 gap-space-md min-h-0">
          <div className="col-span-3 flex flex-col gap-space-md min-h-0">
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

          <div className="col-span-9 flex flex-col gap-space-md min-h-0">
            <div className="grid grid-cols-3 gap-space-md">
              <div className="bg-surface-card rounded-lg border border-surface-container p-space-md flex flex-col">
                <div className="flex items-center gap-2 mb-space-md">
                  <span className="material-symbols-outlined text-[20px] text-secondary">pie_chart</span>
                  <h3 className="font-body-semibold text-text-primary">포맷별 분석 점유율</h3>
                </div>
                <div className="flex items-center justify-between">
                  <div className="relative w-24 h-24">
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
                      <span className="font-headline-sm text-headline-sm font-bold text-text-primary">{files.length}</span>
                      <span className="font-caption text-caption text-text-muted">Total</span>
                    </div>
                  </div>
                  <div className="flex-1 pl-space-md flex flex-col gap-1">
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
                  <div className="flex flex-col">
                    <span className="font-caption text-caption text-text-muted">총 데이터 용량</span>
                    <span className="font-headline-md text-headline-md font-bold text-text-primary">{totalSizeStr}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-caption text-caption text-text-muted">오류 항목</span>
                    <span className="font-headline-md text-headline-md font-bold text-status-cloud-text">{scanResult.errors || 0}</span>
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
                    className={`px-3 py-1 rounded font-badge-label font-bold border transition-colors ${!selectedFormat ? 'bg-surface-container-highest text-text-primary border-border-default' : 'bg-surface-canvas text-text-secondary border-surface-container hover:bg-surface-container'}`}
                  >
                    전체보기
                  </button>
                  {formatLabels.map(fmt => (
                    <button 
                      key={fmt.key}
                      onClick={() => setSelectedFormat(fmt.key)}
                      className={`px-3 py-1 rounded font-badge-label font-bold border transition-colors ${selectedFormat === fmt.key ? fmt.bg + ' ' + fmt.text + ' border-current opacity-100' : 'bg-surface-canvas text-text-muted border-surface-container hover:bg-surface-container'}`}
                    >
                      {fmt.label} <span className="ml-1 opacity-75">({formatCounts[fmt.key as keyof typeof formatCounts]})</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-surface-card shadow-sm z-10">
                    <tr className="border-b border-surface-container text-caption font-caption font-semibold text-text-secondary">
                      <th className="py-2 px-space-sm font-normal">파일 이름</th>
                      <th className="py-2 px-space-sm font-normal">경로</th>
                      <th className="py-2 px-space-sm font-normal w-24">포맷</th>
                      <th className="py-2 px-space-sm font-normal w-24">용량</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-dense text-body-dense text-text-primary">
                    {filteredFiles.map((file: any, idx: number) => {
                      const ext = (file.extension || file.file_name?.split('.').pop() || '').toUpperCase();
                      const fmt = formatLabels.find(f => ext.includes(f.key.replace('X', ''))) || formatLabels[4];
                      return (
                        <tr key={idx} className="border-b border-surface-container hover:bg-surface-container transition-colors">
                          <td className="py-2 px-space-sm">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-[16px] text-text-muted">description</span>
                              <span className="font-semibold truncate max-w-[200px]" title={file.file_name || file.name}>{file.file_name || file.name}</span>
                            </div>
                          </td>
                          <td className="py-2 px-space-sm text-text-secondary truncate max-w-[250px]" title={file.file_path}>{file.file_path}</td>
                          <td className="py-2 px-space-sm">
                            <span className={`px-space-xs py-0.5 rounded font-badge-label text-badge-label font-bold ${fmt.bg} ${fmt.text}`}>
                              {fmt.key}
                            </span>
                          </td>
                          <td className="py-2 px-space-sm font-code-mono text-code-mono">
                            {file.size ? (file.size > 1024*1024 ? (file.size/(1024*1024)).toFixed(1) + " MB" : (file.size/1024).toFixed(1) + " KB") : "N/A"}
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
      )}
    </div>
  );
}
"""

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(react_code)
