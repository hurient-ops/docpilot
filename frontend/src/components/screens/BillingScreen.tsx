import React, { useState } from 'react';

export default function BillingScreen() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  
  const handleSubscribe = (planName: string) => {
    setLoadingPlan(planName);
    setTimeout(() => {
      alert(`[PayPal 연동 시뮬레이션]\n${planName} 플랜 구독 결제창으로 이동합니다.\n(실제 연동 시 PayPal JS SDK 팝업 호출)`);
      setLoadingPlan(null);
    }, 800);
  };

  return (
    <div className="h-full bg-surface-base overflow-y-auto custom-scrollbar flex flex-col items-center py-12 px-4">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-4">DocPilot SaaS 요금제</h1>
          <p className="text-text-secondary text-lg">필요에 맞는 최적의 플랜을 선택하고, PayPal로 안전하게 결제하세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-surface-card rounded-2xl shadow-sm border border-border-subtle p-8 flex flex-col">
            <h3 className="text-xl font-bold text-text-primary mb-2">Starter</h3>
            <p className="text-text-muted mb-6">개인 및 소규모 팀을 위한 기본 기능</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-text-primary">$9</span>
              <span className="text-text-secondary"> / 월</span>
            </div>
            <ul className="flex-1 space-y-4 mb-8">
              <li className="flex items-center gap-2 text-text-secondary"><span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> 단일 문서 분석 (월 100건)</li>
              <li className="flex items-center gap-2 text-text-secondary"><span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> 기본 검색 기능</li>
              <li className="flex items-center gap-2 text-text-muted"><span className="material-symbols-outlined text-gray-300 text-[18px]">cancel</span> 다중 비교 분석 제외</li>
            </ul>
            <button 
              onClick={() => handleSubscribe('Starter')}
              className="w-full py-3 rounded-lg font-bold transition-all bg-surface-container text-text-primary hover:bg-surface-container/80 border border-border-subtle"
            >
              {loadingPlan === 'Starter' ? '처리 중...' : 'Starter 선택'}
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-surface-card rounded-2xl shadow-md border-2 border-primary p-8 flex flex-col relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">인기 플랜</div>
            <h3 className="text-xl font-bold text-text-primary mb-2">Pro</h3>
            <p className="text-text-muted mb-6">전문가 및 중소기업을 위한 완벽한 솔루션</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-primary">$29</span>
              <span className="text-text-secondary"> / 월</span>
            </div>
            <ul className="flex-1 space-y-4 mb-8">
              <li className="flex items-center gap-2 text-text-secondary"><span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> 무제한 문서 분석</li>
              <li className="flex items-center gap-2 text-text-secondary"><span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> AI 다중 비교 분석 지원</li>
              <li className="flex items-center gap-2 text-text-secondary"><span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> 의미론적 하이브리드 검색</li>
            </ul>
            <button 
              onClick={() => handleSubscribe('Pro')}
              className="w-full py-3 rounded-lg font-bold transition-all bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
            >
              <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" className="h-4 rounded-sm"/>
              {loadingPlan === 'Pro' ? '처리 중...' : 'PayPal로 구독하기'}
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-surface-card rounded-2xl shadow-sm border border-border-subtle p-8 flex flex-col">
            <h3 className="text-xl font-bold text-text-primary mb-2">Enterprise</h3>
            <p className="text-text-muted mb-6">대규모 조직을 위한 커스텀 및 보안 강화</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-text-primary">$99</span>
              <span className="text-text-secondary"> / 월</span>
            </div>
            <ul className="flex-1 space-y-4 mb-8">
              <li className="flex items-center gap-2 text-text-secondary"><span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> Pro 플랜의 모든 기능 포함</li>
              <li className="flex items-center gap-2 text-text-secondary"><span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> 실시간 AI DLP 보안 스캔</li>
              <li className="flex items-center gap-2 text-text-secondary"><span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span> 구축형(On-Premise) 데이터 연동</li>
            </ul>
            <button 
              onClick={() => handleSubscribe('Enterprise')}
              className="w-full py-3 rounded-lg font-bold transition-all bg-surface-container text-text-primary hover:bg-surface-container/80 border border-border-subtle flex items-center justify-center gap-2"
            >
              <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" className="h-4 rounded-sm grayscale opacity-70"/>
              {loadingPlan === 'Enterprise' ? '처리 중...' : 'PayPal로 구독하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
