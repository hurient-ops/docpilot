import React, { useState } from 'react';
import { api } from '../../api';

export default function MediaScreen() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    setHasSearched(true);
    try {
      const res = await api.multimodalSearch(query);
      if (res.status === 'success') {
        setResults(res.results || []);
      }
    } catch (err) {
      console.error(err);
      alert('멀티모달 검색 중 오류가 발생했습니다.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-space-md gap-space-md overflow-hidden">
      <div className="flex flex-col gap-space-sm flex-shrink-0">
        <h1 className="font-title-lg text-title-lg font-bold text-primary">멀티모달 갤러리 뷰</h1>
        <p className="font-body-default text-body-default text-text-secondary">자연어로 질의하여 시각 자료(이미지/그래프)를 검색하고 갤러리 형태로 확인하세요.</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-4 items-center flex-shrink-0">
        <div className="relative flex-1 max-w-2xl">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary">manage_search</span>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="'파란색 배경의 PPT 슬라이드' 같은 자연어로 이미지를 검색해 보세요."
            className="w-full pl-12 pr-4 py-3 bg-surface-card border border-surface-container rounded-xl font-body-default focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
          />
        </div>
        <button 
          type="submit"
          disabled={isSearching || !query.trim()}
          className="px-6 py-3 bg-primary text-on-primary rounded-xl font-body-semibold hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-50 shadow-sm"
        >
          {isSearching ? <span className="material-symbols-outlined animate-spin">sync</span> : <span className="material-symbols-outlined">image_search</span>}
          {isSearching ? '검색 중...' : '비전 검색'}
        </button>
      </form>

      <div className="flex-1 overflow-y-auto custom-scrollbar pt-2 pb-8">
        {!hasSearched ? (
          <div className="h-full flex flex-col items-center justify-center text-text-muted opacity-60">
            <span className="material-symbols-outlined text-[64px] mb-4">imagesmode</span>
            <p className="text-lg">로컬 SigLIP 엔진을 활용하여 이미지/비디오를 의미론적으로 검색합니다.</p>
          </div>
        ) : isSearching ? (
          <div className="h-full flex flex-col items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[48px] animate-spin mb-4">sync</span>
            <p className="font-body-semibold">비전 모델 분석 중...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-text-muted">
            <span className="material-symbols-outlined text-[48px] mb-4">search_off</span>
            <p>검색 결과가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-space-md animate-fade-in">
            {results.map((imgName, idx) => (
              <div key={idx} className="group relative bg-surface-card rounded-xl border border-surface-container overflow-hidden shadow-sm hover:shadow-md hover:border-primary/50 transition-all aspect-video cursor-pointer">
                {/* Fallback image display since we don't have actual binary images from the mock backend yet */}
                <div className="w-full h-full bg-surface-container/50 flex flex-col items-center justify-center text-text-secondary group-hover:bg-primary/5 transition-colors">
                  <span className="material-symbols-outlined text-[32px] mb-2 opacity-50 group-hover:text-primary group-hover:opacity-100 transition-all">image</span>
                  <span className="text-sm font-code-mono px-4 text-center truncate w-full">{imgName}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <span className="text-white text-xs font-semibold truncate">{imgName}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
