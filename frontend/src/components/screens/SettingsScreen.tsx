import React, { useState, useRef } from 'react';

export default function SettingsScreen() {
  const [useGPU, setUseGPU] = useState(false);
  const [autoScan, setAutoScan] = useState(true);
  const [maskData, setMaskData] = useState(true);
  const [modelPath, setModelPath] = useState('C:\\DocPilot\\Models\\ggml-model-q4_0.bin');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fakePath = "C:\\DocPilot\\Models\\" + e.target.files[0].name;
      setModelPath(fakePath);
    }
  };

  return (
    <div className="w-full h-full bg-surface-card text-on-surface overflow-y-auto pb-12">
      <div className="max-w-5xl mx-auto pt-space-lg px-gutter">
        <h1 className="font-headline-lg text-headline-lg font-bold text-text-primary mb-2 tracking-tight">설정 (Settings)</h1>
        <p className="font-body-md text-body-md text-text-secondary mb-8">AI 스캐너 및 시스템 환경을 설정합니다.</p>

        <div className="space-y-6">
          {/* AI & Model Configuration */}
          <div className="bg-surface-container rounded-lg border border-border-subtle p-space-lg">
            <div className="flex items-center gap-2 mb-4 border-b border-border-subtle pb-2">
              <span className="material-symbols-outlined text-primary">memory</span>
              <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">1. AI 및 모델 환경 설정</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div className="flex flex-col gap-1">
                <label className="font-label-caps text-label-caps text-text-secondary uppercase">로컬 AI 엔진 (하드웨어 가속)</label>
                <select className="px-space-sm py-2 rounded bg-surface-card border border-border-subtle text-text-primary font-body-md focus:border-primary outline-none">
                  <option>NPU 가속 (Standard)</option>
                  <option>GPU 가속 (High Performance)</option>
                  <option>CPU 전용 (Low Power)</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-caps text-label-caps text-text-secondary uppercase">로컬 모델 경로 (경로 지정)</label>
                <div className="flex gap-2">
                  <input type="text" value={modelPath} onChange={e => setModelPath(e.target.value)} className="flex-1 px-space-sm py-2 rounded bg-surface-card border border-border-subtle text-text-primary font-body-md focus:border-primary outline-none" />
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-surface-container border border-border-subtle rounded hover:bg-surface-container-low transition-colors font-body-semibold text-text-secondary whitespace-nowrap">찾아보기</button>
                  <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept=".bin,.gguf,.pt" />
                </div>
              </div>
            </div>
          </div>

          {/* Scan & Indexing */}
          <div className="bg-surface-container rounded-lg border border-border-subtle p-space-lg">
            <div className="flex items-center gap-2 mb-4 border-b border-border-subtle pb-2">
              <span className="material-symbols-outlined text-primary">folder_open</span>
              <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">2. 스캔 및 디렉토리 색인 설정</h2>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-body-md text-body-md text-text-primary font-medium">자동 백그라운드 스캔</span>
                  <span className="font-caption text-caption text-text-muted">지정된 폴더에 새 파일이 감지되면 자동으로 AI 인덱싱을 수행합니다.</span>
                </div>
                <div 
                  className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${autoScan ? 'bg-primary' : 'bg-surface-dim'}`}
                  onClick={() => setAutoScan(!autoScan)}
                >
                  <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${autoScan ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>
              
              <div className="flex flex-col gap-1 mt-2">
                <label className="font-label-caps text-label-caps text-text-secondary uppercase">제외 필터링 (스캔 제외 폴더/확장자)</label>
                <input type="text" defaultValue="node_modules, .git, *.tmp, *.bak" className="px-space-sm py-2 rounded bg-surface-card border border-border-subtle text-text-primary font-body-md focus:border-primary outline-none" />
                <span className="font-caption text-[11px] text-text-muted mt-1">콤마(,)로 구분하여 입력하세요.</span>
              </div>
            </div>
          </div>

          {/* Security & DLP */}
          <div className="bg-surface-container rounded-lg border border-border-subtle p-space-lg">
            <div className="flex items-center gap-2 mb-4 border-b border-border-subtle pb-2">
              <span className="material-symbols-outlined text-primary">shield</span>
              <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">3. 보안 및 권한 제어 (DLP)</h2>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-body-md text-body-md text-text-primary font-medium">민감 정보(개인정보) 마스킹 처리</span>
                  <span className="font-caption text-caption text-text-muted">주민등록번호, 전화번호, 카드번호 등을 감지하여 화면에 [마스킹] 처리합니다.</span>
                </div>
                <div 
                  className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${maskData ? 'bg-status-danger-text' : 'bg-surface-dim'}`}
                  onClick={() => setMaskData(!maskData)}
                >
                  <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${maskData ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
              </div>
            </div>
          </div>

          {/* General Preferences */}
          <div className="bg-surface-container rounded-lg border border-border-subtle p-space-lg">
            <div className="flex items-center gap-2 mb-4 border-b border-border-subtle pb-2">
              <span className="material-symbols-outlined text-primary">tune</span>
              <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">4. 일반 시스템 설정</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div className="flex flex-col gap-1">
                <label className="font-label-caps text-label-caps text-text-secondary uppercase">기본 언어 (Language)</label>
                <select className="px-space-sm py-2 rounded bg-surface-card border border-border-subtle text-text-primary font-body-md focus:border-primary outline-none">
                  <option>한국어 (Korean)</option>
                  <option>English</option>
                  <option>日本語 (Japanese)</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-caps text-label-caps text-text-secondary uppercase">디스플레이 테마</label>
                <select className="px-space-sm py-2 rounded bg-surface-card border border-border-subtle text-text-primary font-body-md focus:border-primary outline-none">
                  <option>시스템 설정 따름 (System Default)</option>
                  <option>라이트 모드 (Light)</option>
                  <option>다크 모드 (Dark)</option>
                </select>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}