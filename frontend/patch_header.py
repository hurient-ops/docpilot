import os

file_path = r'e:\projects\docpilot\frontend\src\components\Header.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Make search and notif state
new_hooks = '''  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

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
'''
content = content.replace("  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));", new_hooks)

# Add search button click handler
content = content.replace('type="button"><span className="material-symbols-outlined text-[16px]">search</span><span className="font-code-mono text-code-mono text-text-muted">Ctrl+K</span></button>', 'onClick={() => setIsSearchOpen(true)} type="button"><span className="material-symbols-outlined text-[16px]">search</span><span className="font-code-mono text-code-mono text-text-muted">Ctrl+K</span></button>')

# Add bell button click handler
content = content.replace('type="button"><span className="material-symbols-outlined text-[18px]">notifications</span></button>', 'onClick={() => setIsNotifOpen(!isNotifOpen)} type="button"><span className="material-symbols-outlined text-[18px]">notifications</span></button>')

# Add modal / popover components at the end
modals = '''
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
'''
content = content.replace('</header>', modals + '</header>')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
