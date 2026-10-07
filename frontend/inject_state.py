import os
import re

# 1. DirectoryScreen
file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Just inject the scan result message right below the path input
content = re.sub(
    r'(<input className="w-full bg-transparent font-code-mono text-code-mono text-text-primary focus:outline-none" type="text" value=\{scanPath\} onChange=\{\(e\) => setScanPath\(e\.target\.value\)\}\s*/>)',
    r'\1\n{scanResult && <div className="mt-2 text-sm text-green-600 font-bold bg-green-50 p-2 rounded w-full">✅ 스캔 완료: 신규 {scanResult.added}건, 업데이트 {scanResult.updated}건, 스킵 {scanResult.skipped}건</div>}',
    content
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)


# 2. SearchScreen
file_path = r'e:\projects\docpilot\frontend\src\components\screens\SearchScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Inject the search results right below the search bar area.
# Search for <div className="flex-1 min-w-0"> which wraps the results, or just top of the results list.
results_jsx = """
{searchResults.length > 0 && (
  <div className="w-full mb-6 bg-surface-container border-2 border-primary p-4 rounded-lg">
    <h3 className="font-bold text-primary mb-3">✅ 실제 검색 결과 ({searchResults.length}건)</h3>
    <div className="flex flex-col gap-3">
    {searchResults.map((res, idx) => (
      <div key={idx} className="pb-3 border-b border-border-subtle last:border-0">
         <h4 className="font-semibold text-text-primary">{res.file_name}</h4>
         <div className="text-xs text-text-muted mb-1">{res.file_path} {res.location_badge}</div>
         <p className="text-sm italic text-text-secondary" dangerouslySetInnerHTML={{__html: res.snippet}}></p>
      </div>
    ))}
    </div>
  </div>
)}
"""

# Find a good place to inject. For example, before the first mock card: <div className="bg-surface-card rounded-lg p-space-md shadow-sm border border-border-subtle hover:border-primary/40 hover:shadow-md transition-all group">
# Wait, my previous count showed 0 cards matching that string!
# Let's just find the first "<main" and inject it at the top of the page.
content = re.sub(
    r'(<main[^>]*>)',
    r'\1\n' + results_jsx.replace('\n', ' '),
    content,
    count=1
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Injected UI states successfully")
