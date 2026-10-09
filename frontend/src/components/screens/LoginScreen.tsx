import React, { useState } from 'react';

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      if (email === 'admin@docpilot.ai' && password === 'admin1234') {
        setTimeout(() => {
          onLogin();
        }, 400);
      } else {
        alert('이메일 또는 비밀번호가 일치하지 않습니다. (테스트 계정을 사용해 주세요)');
      }
    } else {
      // For signup, allow any for now as a mock
      setTimeout(() => {
        onLogin();
      }, 400);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-card overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
      
      <div className="relative w-full max-w-md p-space-xl bg-surface-container/60 backdrop-blur-xl border border-border-subtle rounded-2xl shadow-2xl z-10 flex flex-col">
        
        {/* Logo Header */}
        <div className="flex flex-col items-center mb-8">
          <img src="/docpilot-logo.jpg" alt="DocPilot Logo" className="h-16 w-auto object-contain rounded-lg mb-4 shadow-md" />
          <h1 className="font-headline-lg text-headline-lg font-bold text-text-primary tracking-tight">DocPilot</h1>
          <p className="font-body-md text-body-md text-text-secondary mt-1">
            {isLogin ? '환영합니다! 계속하려면 로그인하세요.' : 'DocPilot과 함께 새로운 여정을 시작하세요.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div className="flex gap-4">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="font-label-caps text-label-caps text-text-secondary uppercase">이름</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="홍길동" 
                  className="w-full px-4 py-2.5 rounded-lg bg-surface-card border border-border-subtle text-text-primary font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                <label className="font-label-caps text-label-caps text-text-secondary uppercase">소속/회사명</label>
                <input 
                  type="text" 
                  required
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="Google" 
                  className="w-full px-4 py-2.5 rounded-lg bg-surface-card border border-border-subtle text-text-primary font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="font-label-caps text-label-caps text-text-secondary uppercase">이메일 주소</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="name@company.com" 
              className="w-full px-4 py-2.5 rounded-lg bg-surface-card border border-border-subtle text-text-primary font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-label-caps text-label-caps text-text-secondary uppercase">비밀번호</label>
              {isLogin && <a href="#" className="font-body-sm text-body-sm text-primary hover:underline">비밀번호 찾기</a>}
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full px-4 py-2.5 rounded-lg bg-surface-card border border-border-subtle text-text-primary font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
            />
          </div>

          {!isLogin && (
            <div className="flex flex-col gap-1.5">
              <label className="font-label-caps text-label-caps text-text-secondary uppercase">비밀번호 확인</label>
              <input 
                type="password" 
                required
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
                placeholder="••••••••" 
                className="w-full px-4 py-2.5 rounded-lg bg-surface-card border border-border-subtle text-text-primary font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
              />
            </div>
          )}

          <button 
            type="submit" 
            className="mt-2 w-full py-3 bg-primary text-on-primary rounded-lg font-body-semibold text-body-lg shadow-md hover:opacity-90 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            {isLogin ? '로그인' : '계정 생성'}
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 font-body-sm text-body-sm text-text-secondary">
          <span>{isLogin ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}</span>
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-primary font-semibold hover:underline"
          >
            {isLogin ? '회원가입' : '로그인'}
          </button>
        </div>

      </div>
    </div>
  );
}
