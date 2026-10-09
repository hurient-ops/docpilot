import React, { useState } from 'react';
import { api } from '../../api';

export default function SynthesisScreen() {
  const [sourceDocs, setSourceDocs] = useState([
    { id: 'doc1', title: '2024년 1분기 재무보고서.pdf', sections: ['1. 개요', '2. 매출 요약', '3. 지출 상세'] },
    { id: 'doc2', title: '클라우드 인프라 계약서.docx', sections: ['제1조 목적', '제2조 서비스 범위', '제3조 비용 및 결제'] },
    { id: 'doc3', title: '신규 프로젝트 제안서.pptx', sections: ['프로젝트 배경', '수행 일정', '기대 효과'] }
  ]);
  
  const [builderItems, setBuilderItems] = useState<{id: string, text: string}[]>([]);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, section: string, sourceTitle: string) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ section, sourceTitle }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      setBuilderItems([...builderItems, { id: Date.now().toString(), text: `[${data.sourceTitle}] ${data.section}` }]);
    } catch (err) {}
  };

  const handleSynthesize = async () => {
    if (builderItems.length === 0) return;
    setIsSynthesizing(true);
    setDownloadLink(null);
    try {
      const mappingJson = { items: builderItems.map(i => i.text) };
      const res = await api.synthesizeDocument(mappingJson, 'merged_output.docx');
      if (res.status === 'success') {
        setDownloadLink(res.output_path || 'merged_output.docx');
      }
    } catch (err) {
      console.error(err);
      alert('문서 재조합 중 오류가 발생했습니다.');
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-space-md gap-space-md">
      <div className="flex flex-col gap-space-sm">
        <h1 className="font-title-lg text-title-lg font-bold text-primary">문서 재조합 (Synthesis Viewer)</h1>
        <p className="font-body-default text-body-default text-text-secondary">필요한 문서의 목차나 단락을 드래그 앤 드롭하여 새로운 문서를 생성하세요.</p>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-space-lg min-h-0">
        {/* Source Documents Panel */}
        <div className="bg-surface-card rounded-xl border border-surface-container flex flex-col h-full min-h-0 shadow-sm">
          <div className="p-space-md border-b border-surface-container flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[22px]">library_books</span>
              <h3 className="font-body-semibold text-text-primary text-lg">원본 문서 리스트</h3>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-space-md flex flex-col gap-space-md custom-scrollbar">
            {sourceDocs.map(doc => (
              <div key={doc.id} className="border border-border-subtle rounded-lg p-space-sm bg-surface-container">
                <div className="font-body-semibold text-text-primary mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-text-muted">description</span>
                  {doc.title}
                </div>
                <div className="flex flex-col gap-2 pl-6">
                  {doc.sections.map((sec, idx) => (
                    <div 
                      key={idx}
                      draggable
                      onDragStart={(e) => handleDragStart(e, sec, doc.title)}
                      className="p-2 bg-surface-card border border-border-subtle rounded cursor-grab hover:border-primary hover:shadow-sm transition-all flex items-center gap-2 text-sm text-text-secondary"
                    >
                      <span className="material-symbols-outlined text-[16px] text-text-muted cursor-grab">drag_indicator</span>
                      {sec}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Builder Canvas Panel */}
        <div className="bg-surface-card rounded-xl border border-primary/20 flex flex-col h-full min-h-0 shadow-sm relative">
          <div className="p-space-md border-b border-surface-container flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">post_add</span>
              <h3 className="font-body-semibold text-text-primary text-lg">문서 빌더 캔버스</h3>
            </div>
            <button 
              onClick={handleSynthesize}
              disabled={builderItems.length === 0 || isSynthesizing}
              className="px-4 py-2 bg-primary text-on-primary rounded-lg font-body-semibold hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSynthesizing ? <span className="material-symbols-outlined animate-spin">sync</span> : <span className="material-symbols-outlined">magic_button</span>}
              새 문서 생성
            </button>
          </div>
          
          <div 
            className="flex-1 overflow-y-auto p-space-md flex flex-col gap-2 custom-scrollbar bg-surface-container/30 relative"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {builderItems.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted">
                <span className="material-symbols-outlined text-[48px] mb-4 opacity-50">move_to_inbox</span>
                <p>여기로 목차를 드래그하여 추가하세요</p>
              </div>
            ) : (
              builderItems.map((item, index) => (
                <div key={item.id} className="p-3 bg-surface-card border border-primary/30 rounded-lg shadow-sm flex items-center justify-between animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-text-primary font-body-default">{item.text}</span>
                  </div>
                  <button onClick={() => setBuilderItems(builderItems.filter(i => i.id !== item.id))} className="text-text-muted hover:text-status-error">
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                </div>
              ))
            )}
            
            {downloadLink && !isSynthesizing && (
              <div className="mt-4 p-4 bg-status-success/10 border border-status-success/30 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2 text-status-success">
                  <span className="material-symbols-outlined">check_circle</span>
                  <span className="font-body-semibold">문서가 성공적으로 생성되었습니다!</span>
                </div>
                <button className="px-4 py-2 bg-surface-card border border-status-success text-status-success rounded hover:bg-status-success hover:text-white transition-colors flex items-center gap-2 text-sm font-semibold">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  다운로드 ({downloadLink})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
