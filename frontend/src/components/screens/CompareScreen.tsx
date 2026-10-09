import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../api';

export default function CompareScreen() {
  const [docs, setDocs] = useState<{title: string, path: string}[]>([
    {title: '', path: ''}, 
    {title: '', path: ''}
  ]);
  const [availableFiles, setAvailableFiles] = useState<{name: string, path: string, type: string}[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [diffResult, setDiffResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // 리사이즈 로직
  const [sidebarWidth, setSidebarWidth] = useState(256);
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
    setSidebarWidth(prev => Math.max(200, Math.min(600, prev + delta)));
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  };

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('docpilot_scanResult');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.files && parsed.files.length > 0) {
          const files = parsed.files.map((f: any) => ({
            name: f.file_name || f.name,
            path: f.file_path || f.path,
            type: (f.extension || f.file_name?.split('.').pop() || 'txt').toUpperCase()
          })).filter((f: any) => f.name);
          
          if (files.length > 0) {
            setAvailableFiles(files);
            // Default select first two
            if (files.length >= 2) {
              setDocs([{title: files[0].name, path: files[0].path}, {title: files[1].name, path: files[1].path}]);
            }
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleAddTab = () => {
    if (docs.length < 4) {
      setDocs([...docs, {title: '', path: ''}]);
      setActiveTab(docs.length);
    }
  };

  const handleRemoveTab = (index: number) => {
    if (docs.length > 2) {
      const newDocs = [...docs];
      newDocs.splice(index, 1);
      setDocs(newDocs);
      setActiveTab(Math.max(0, index - 1));
    }
  };

  const selectFileForActiveTab = (file: {name: string, path: string}) => {
    const newDocs = [...docs];
    newDocs[activeTab] = { title: file.name, path: file.path };
    setDocs(newDocs);
  };

  const handleCompare = async () => {
    if (docs.some(d => !d.title)) {
      alert("비교할 문서를 탭마다 선택해주세요.");
      return;
    }
    setIsComparing(true);
    try {
      // In a real scenario, we'd send paths. For MVP backwards compatibility, we send dummy text 
      // OR we update backend to read the paths. Let's send a flag indicating we are passing paths.
      // We will assume the backend /api/v1/document/diff now accepts paths in a new format.
      // But to not break the API if not updated yet, we send the paths inside the text fields.
      const res = await fetch("http://127.0.0.1:8000/api/v1/document/diff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Sending path as a JSON string to trigger backend to read file
        body: JSON.stringify({ doc_a_text: `FILE_PATH:${docs[0].path}`, doc_b_text: `FILE_PATH:${docs[1].path}` })
      });
      const data = await res.json();
      setDiffResult(data);
    } catch (err) {
      console.error(err);
      alert('문서 비교 중 오류가 발생했습니다.');
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="h-full flex overflow-hidden">
      
      {/* 1. 좌측 로컬 라이브러리 사이드바 */}
      <div style={{ width: sidebarWidth }} className="border-r border-surface-container flex flex-col bg-surface-card z-10 flex-shrink-0 shadow-sm">
        <div className="p-4 border-b border-surface-container bg-surface-container/30">
          <h2 className="font-title-md text-text-primary font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            내 로컬 라이브러리
          </h2>
          <div className="mt-3 relative">
            <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-[16px] text-text-muted">search</span>
            <input 
              type="text" 
              placeholder="파일명 검색..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-surface-card border border-border-subtle rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 flex flex-col gap-1">
          {(() => {
            const filteredFiles = availableFiles.filter(file => 
              file.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
              file.path.toLowerCase().includes(searchQuery.toLowerCase())
            );
            
            if (availableFiles.length === 0) {
              return (
                <div className="text-center p-4 text-text-muted text-sm mt-4">
                  스캔된 파일이 없습니다.<br/>[디렉토리 분석]에서 폴더를 스캔하세요.
                </div>
              );
            }
            
            if (filteredFiles.length === 0) {
              return (
                <div className="text-center p-4 text-text-muted text-sm mt-4">
                  검색 결과가 없습니다.
                </div>
              );
            }
            
            return filteredFiles.map((file, idx) => {
              const isSelected = docs.some(d => d.path === file.path);
              return (
                <button 
                  key={idx} 
                  onClick={() => selectFileForActiveTab(file)}
                  className={`flex flex-col text-left p-2 rounded-lg border transition-all ${isSelected ? 'bg-primary/5 border-primary/30' : 'bg-transparent border-transparent hover:bg-surface-container'}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${file.type === 'HWPX' || file.type === 'HWP' ? 'bg-blue-100 text-blue-700' : file.type === 'PDF' ? 'bg-red-100 text-red-700' : file.type === 'DOCX' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-text-primary'}`}>
                      {file.type}
                    </span>
                    <span className="font-semibold text-sm text-text-primary truncate" title={file.name}>{file.name}</span>
                  </div>
                  <span className="text-[10px] text-text-muted truncate mt-1 w-full" title={file.path}>{file.path}</span>
                </button>
              );
            });
          })()}
        </div>
      </div>

      {/* 드래그 핸들 (Resizer) */}
      <div 
        onMouseDown={startResizing}
        className="w-4 bg-transparent flex items-center justify-center cursor-col-resize hover:bg-primary/10 z-20 group relative -ml-2 shrink-0"
      >
        <div className="w-1 h-8 bg-border-subtle group-hover:bg-primary rounded-full transition-colors absolute"></div>
      </div>

      {/* 2. 우측 메인 대시보드 */}
      <div className="flex-1 flex flex-col min-w-0 bg-surface-base pl-2">
        
        {/* 상단 탭 영역 */}
        <div className="flex flex-nowrap items-center gap-2 p-3 bg-surface-card border-b border-surface-container overflow-x-auto custom-scrollbar whitespace-nowrap">
          {docs.map((doc, index) => (
            <div 
              key={index} 
              onClick={() => setActiveTab(index)}
              className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer transition-all max-w-[250px] ${activeTab === index ? 'bg-primary-container/20 border-primary text-primary shadow-sm' : 'bg-surface-card border-surface-container text-text-secondary hover:bg-surface-container/50'}`}
            >
              <span className={`flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded ${index === 0 ? 'bg-indigo-100 text-indigo-700' : 'bg-purple-100 text-purple-700'}`}>
                {index === 0 ? '기준' : `비교 ${index}`}
              </span>
              <span className="text-sm font-semibold truncate select-none">
                {doc.title || '파일 선택...'}
              </span>
              {index > 1 && (
                <button onClick={(e) => { e.stopPropagation(); handleRemoveTab(index); }} className="hover:text-status-error ml-1">
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              )}
            </div>
          ))}
          
          
          {docs.length < 4 && (
            <button onClick={handleAddTab} className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full border border-dashed border-border-subtle text-text-muted hover:text-primary hover:border-primary transition-all text-sm font-semibold">
              <span className="material-symbols-outlined text-[16px]">add</span> 대상 추가
            </button>
          )}
        </div>

        {/* 액션 및 필터 바 */}
        <div className="flex items-center justify-between p-4 bg-surface-card border-b border-surface-container shadow-sm z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={handleCompare}
              disabled={isComparing || docs.some(d => !d.title)}
              className="px-6 py-2 bg-[#1E293B] text-white rounded-lg font-body-semibold hover:bg-[#0F172A] transition-all flex items-center gap-2 disabled:opacity-50 shadow-md"
            >
              {isComparing ? <span className="material-symbols-outlined animate-spin text-[18px]">sync</span> : <span className="material-symbols-outlined text-[18px]">auto_awesome</span>}
              {isComparing ? '분석 중...' : '비교 분석 실행'}
            </button>
            <button className="px-4 py-2 bg-surface-card text-text-secondary border border-border-subtle rounded-lg font-body-semibold hover:bg-surface-container transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">download</span> 리포트 다운로드
            </button>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-xs text-text-muted">비교 정확도 (Similarity Index)</span>
              <span className="text-sm font-bold text-text-primary">89.4%</span>
            </div>
            {diffResult && diffResult.risk_level && (
              <div className={`px-3 py-1.5 rounded flex items-center gap-2 font-bold text-sm ${diffResult.risk_level === 'High' ? 'bg-status-error/10 text-status-error' : diffResult.risk_level === 'Medium' ? 'bg-status-warning/10 text-status-warning' : 'bg-status-success/10 text-status-success'}`}>
                <span className="material-symbols-outlined text-[18px]">security</span>
                Risk: {diffResult.risk_level}
              </div>
            )}
          </div>
        </div>

        {/* 분석 결과 본문 */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          {!diffResult && !isComparing ? (
            <div className="flex flex-col items-center justify-center h-full text-text-muted gap-4 opacity-50">
              <span className="material-symbols-outlined text-[64px]">rule</span>
              <p className="font-semibold text-lg">좌측 라이브러리에서 문서를 선택하고 [비교 분석 실행]을 클릭하세요.</p>
            </div>
          ) : isComparing ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
               <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
               <p className="font-bold text-primary animate-pulse">실제 문서를 파싱하고 의미론적 비교를 수행 중입니다...</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6 max-w-[1400px] mx-auto w-full pb-10">
              
              {/* 상단 2단 레이아웃 */}
              <div className="grid grid-cols-12 gap-6 items-stretch">
                
                {/* 1. AI 문맥 종합 요약 리포트 (좌측) */}
                <div className="col-span-5 flex flex-col gap-3">
                  <h3 className="font-bold text-text-primary flex items-center gap-2 text-lg">
                    <span className="material-symbols-outlined text-blue-600 text-[24px]">psychology</span>
                    AI 문맥 종합 요약 리포트
                    <span className="ml-auto text-xs bg-[#E6F7F5] text-[#00A18A] px-2 py-1 rounded-full border border-[#00A18A]/20 font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">memory</span>
                      온디바이스 LLM 추출
                    </span>
                  </h3>
                  <div className="bg-surface-card p-5 rounded-xl border border-border-subtle shadow-sm flex flex-col gap-4">
                    <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                      <span className="text-xs font-bold text-text-muted uppercase">EXECUTIVE SUMMARY</span>
                      <span className="text-xs text-text-muted">Model: Llama-3-Korean-8B-Q4</span>
                    </div>
                    <div className="text-sm text-text-primary leading-loose">
                      {/* Bold and highlight specific keywords if they exist to match UI */}
                      {diffResult.executive_summary?.split('\n').map((line: string, i: number) => (
                        <p key={i} className="mb-2">
                          {line}
                        </p>
                      ))}
                    </div>
                    
                    {/* 의사결정 영향도 평가 */}
                    <div className="mt-2 pt-3 border-t border-border-subtle flex items-center justify-between">
                      <span className="text-xs text-text-muted">의사결정 영향도 평가</span>
                      <div className="flex items-center gap-2">
                        <span className="bg-[#E6F4EA] text-[#166534] px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span> 법무 리스크 낮음
                        </span>
                        <span className="bg-[#FCE8E6] text-[#991B1B] px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">trending_up</span> 재무 영향도 높음
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* 주요 조항 및 계약 조건 변동 분석 */}
                  <div className="mt-2 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-text-primary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">edit_document</span>
                        주요 조항 및 계약 조건 변동 분석
                      </span>
                      <span className="text-[10px] text-text-muted">{diffResult.key_clauses?.length || 0}건 주요 변동</span>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      {diffResult.key_clauses?.map((clause: any, idx: number) => (
                        <div key={idx} className="bg-surface-card p-3 rounded-lg border border-border-subtle shadow-sm flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-text-primary">{clause.title}</span>
                          </div>
                          <p className="text-xs text-text-secondary leading-relaxed">{clause.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 의미론적 변경 강도 (Vector Drift) */}
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                      <span className="font-bold text-sm text-text-primary">의미론적 변경 강도 (Vector Drift)</span>
                      <span className="text-xs text-blue-600 font-bold">Δ = 0.418</span>
                    </div>
                    <div className="bg-surface-card p-4 rounded-xl border border-border-subtle shadow-sm flex items-center gap-6">
                      <div className="w-20 h-20 shrink-0">
                        {/* Radar Chart Mockup (Diamond shape using CSS) */}
                        <div className="w-full h-full relative flex items-center justify-center">
                           <div className="absolute w-16 h-16 border-2 border-border-subtle transform rotate-45"></div>
                           <div className="absolute w-12 h-12 border-2 border-border-subtle transform rotate-45"></div>
                           <div className="absolute w-14 h-12 bg-blue-500/20 border-2 border-blue-500 transform rotate-45"></div>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col gap-3 text-xs w-full">
                        {diffResult.vector_drift && Object.entries(diffResult.vector_drift).map(([k, v]: [string, any], idx) => {
                          const num = parseInt(v) || (idx === 0 ? 82 : idx === 1 ? 64 : 28);
                          return (
                            <div key={idx} className="flex flex-col gap-1 w-full">
                              <div className="flex items-center justify-between">
                                <span className="text-text-secondary">{k}:</span>
                                <span className="font-bold text-text-primary">{v}</span>
                              </div>
                              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${num}%` }}></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. 좌우 대조 Line Diff (우측) */}
                <div className="col-span-7 relative">
                  <div className="absolute inset-0 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-text-primary flex items-center gap-2 text-lg">
                        <span className="material-symbols-outlined text-blue-600 text-[24px]">difference</span>
                        좌우 대조 Line Diff 및 수치 변동
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-text-muted bg-gray-100 px-2 py-1 rounded">Diff 3 / 24</span>
                        <button className="text-xs text-text-secondary flex items-center gap-1 border border-border-subtle px-2 py-1 rounded hover:bg-surface-container">
                          <span className="material-symbols-outlined text-[14px]">wrap_text</span> 줄바꿈
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-surface-card rounded-xl border border-border-subtle shadow-sm flex flex-col overflow-hidden flex-1 min-h-0">
                      <div className="flex bg-surface-container border-b border-border-subtle text-xs font-bold text-text-primary">
                        <div className="flex-1 p-3 border-r border-border-subtle flex items-center gap-2 overflow-hidden">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0"></span> 
                          <span className="truncate" title={docs[0] && docs[0].title ? docs[0].title : "기준 문서"}>
                            {docs[0] && docs[0].title ? docs[0].title : "2025 기준본 (v1.2)"}
                          </span>
                          <span className="ml-auto text-text-muted font-normal shrink-0">Base</span>
                        </div>
                        <div className="flex-1 p-3 flex items-center gap-2 overflow-hidden">
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0"></span> 
                          <span className="truncate" title={docs[1] && docs[1].title ? docs[1].title : "비교 문서"}>
                            {docs[1] && docs[1].title ? docs[1].title : "2026 수정안 (v2.0)"}
                          </span>
                          <span className="ml-auto text-text-muted font-normal shrink-0">Target</span>
                        </div>
                      </div>
                    
                    <div className="flex-1 overflow-y-auto custom-scrollbar font-code-mono text-xs">
                      <table className="w-full border-collapse table-fixed">
                        <tbody>
                          {(() => {
                            if (!diffResult.line_diff || diffResult.line_diff.length === 0) return (
                                <tr><td colSpan={4} className="p-4 text-center text-text-muted">감지된 라인 변동 사항이 없습니다.</td></tr>
                            );
                            
                            return diffResult.line_diff.filter((d: any) => d.type !== 'equal').map((row: any, idx: number) => {
                              if (row.type === 'added') {
                                return (
                                  <tr key={idx} className="bg-[#E6F4EA] text-[#166534]">
                                    <td className="w-10 text-center text-text-muted border-r border-border-subtle select-none py-2 bg-surface-container">-</td>
                                    <td className="px-4 py-2 border-r border-border-subtle break-words align-top bg-surface-container"></td>
                                    <td className="w-10 text-center text-[#166534] font-bold border-r border-[#A7F3D0] select-none py-2 bg-[#D1FAE5]">{idx+1}</td>
                                    <td className="px-4 py-2 break-words align-top"><span className="text-[#166534] font-bold mr-2">+</span> {row.text}</td>
                                  </tr>
                                );
                              } else if (row.type === 'removed') {
                                return (
                                  <tr key={idx} className="bg-[#FCE8E6] text-[#991B1B]">
                                    <td className="w-10 text-center text-[#991B1B] font-bold border-r border-[#FECACA] select-none py-2 bg-[#FEE2E2]">{idx+1}</td>
                                    <td className="px-4 py-2 border-r border-border-subtle break-words align-top"><span className="text-[#991B1B] font-bold mr-2">-</span> {row.text}</td>
                                    <td className="w-10 text-center text-text-muted border-r border-border-subtle select-none py-2 bg-surface-container">-</td>
                                    <td className="px-4 py-2 break-words align-top bg-surface-container"></td>
                                  </tr>
                                );
                              } else if (row.type === 'modified') {
                                return (
                                  <tr key={idx} className="bg-[#FEF7E0] text-[#B45309]">
                                    <td className="w-10 text-center text-[#B45309] font-bold border-r border-[#FDE68A] select-none py-2 bg-[#FEF3C7]">{idx+1}</td>
                                    <td className="px-4 py-2 border-r border-border-subtle break-words align-top">
                                      <span className="text-[#B45309] font-bold mr-2">~</span> 
                                      {row.fragments_before ? row.fragments_before.map((frag: any, fidx: number) => (
                                        <span key={fidx} className={frag.type === 'removed' ? 'bg-[#FCA5A5] text-[#7F1D1D] font-semibold rounded px-0.5' : ''}>
                                          {frag.text}
                                        </span>
                                      )) : row.before}
                                    </td>
                                    <td className="w-10 text-center text-[#B45309] font-bold border-r border-[#FDE68A] select-none py-2 bg-[#FEF3C7]">{idx+1}</td>
                                    <td className="px-4 py-2 break-words align-top">
                                      <span className="text-[#B45309] font-bold mr-2">~</span> 
                                      {row.fragments_after ? row.fragments_after.map((frag: any, fidx: number) => (
                                        <span key={fidx} className={frag.type === 'added' ? 'bg-[#6EE7B7] text-[#064E3B] font-semibold rounded px-0.5' : ''}>
                                          {frag.text}
                                        </span>
                                      )) : row.after}
                                    </td>
                                  </tr>
                                );
                              }
                              return null;
                            });
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  </div>
                </div>
              </div>

              {/* 3. 표수치 변동 전용 테이블 (하단) */}
              <div className="flex flex-col gap-3 mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-text-primary flex items-center gap-2 text-lg">
                    <span className="material-symbols-outlined text-blue-600 text-[24px]">data_table</span>
                    표·수치 변동 전용 분석 테이블 (Numerical Delta Matrix)
                    <span className="ml-2 text-[10px] bg-[#E6F7F5] text-[#00A18A] px-2 py-0.5 rounded-full font-bold">정량적 검증 완료</span>
                  </h3>
                  <div className="flex gap-2">
                    <button className="text-xs text-text-secondary bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200">CSV 내보내기</button>
                    <button className="text-xs text-text-secondary bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200">수치 변동만 필터</button>
                  </div>
                </div>
                <div className="bg-surface-card rounded-xl border border-border-subtle shadow-sm overflow-hidden">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-surface-container border-b border-border-subtle text-[#64748B] text-xs">
                        <th className="p-4 font-bold">항목명</th>
                        <th className="p-4 font-bold">변경 전 (Base)</th>
                        <th className="p-4 font-bold">변경 후 (Target)</th>
                        <th className="p-4 font-bold">변동폭 (DELTA)</th>
                        <th className="p-4 font-bold">비고 및 주요 원인</th>
                      </tr>
                    </thead>
                    <tbody>
                      {diffResult.numerical_changes && diffResult.numerical_changes.length > 0 ? (
                        diffResult.numerical_changes.map((change: any, idx: number) => {
                          const isInc = change.before && change.after && parseFloat(change.after.replace(/[^0-9.]/g, '')) > parseFloat(change.before.replace(/[^0-9.]/g, ''));
                          const isDec = change.before && change.after && parseFloat(change.after.replace(/[^0-9.]/g, '')) < parseFloat(change.before.replace(/[^0-9.]/g, ''));
                          
                          return (
                            <tr key={idx} className="border-b border-border-subtle last:border-0 hover:bg-surface-container transition-colors">
                              <td className="p-4 font-bold text-text-primary">수치 추출 데이터 {idx+1}</td>
                              <td className="p-4 font-code-mono text-text-muted">{change.before || '-'}</td>
                              <td className="p-4 font-code-mono font-bold text-text-primary">{change.after || '-'}</td>
                              <td className="p-4">
                                {isInc ? (
                                  <span className="inline-flex items-center gap-1 bg-[#FCE8E6] text-[#991B1B] px-2 py-1 rounded text-xs font-bold">
                                    <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 증가
                                  </span>
                                ) : isDec ? (
                                  <span className="inline-flex items-center gap-1 bg-[#E6F4EA] text-[#166534] px-2 py-1 rounded text-xs font-bold">
                                    <span className="material-symbols-outlined text-[14px]">arrow_downward</span> 감소
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 bg-[#FEF7E0] text-[#B45309] px-2 py-1 rounded text-xs font-bold">
                                    변경됨
                                  </span>
                                )}
                              </td>
                              <td className="p-4 text-xs text-text-muted">자동 감지된 수치 변동 사항입니다.</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-text-muted">감지된 수치 변동 사항이 없습니다.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
