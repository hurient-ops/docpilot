import os

file_path = r'e:\projects\docpilot\frontend\src\components\screens\SearchScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

results_jsx = '''
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
'''

content = content.replace('<>', '<>' + results_jsx, 1)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("SearchScreen Updated")
