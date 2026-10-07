import re

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace hardcoded donut chart legends
pattern1 = re.compile(r'<div className=\"flex flex-col justify-center gap-space-xs font-body-dense text-body-dense\">.*?</div>', re.DOTALL)
replacement1 = '''<div className=\"flex flex-col justify-center gap-space-xs font-body-dense text-body-dense\">
  {scanResult ? (
    <>
      <div className=\"flex items-center gap-2\"><span className=\"w-2 h-2 rounded-full bg-format-xlsx-text\"></span><span className=\"text-text-secondary w-20\">XLSX</span><span className=\"font-semibold text-text-primary\">0%</span></div>
      <div className=\"flex items-center gap-2\"><span className=\"w-2 h-2 rounded-full bg-format-docx-text\"></span><span className=\"text-text-secondary w-20\">DOCX</span><span className=\"font-semibold text-text-primary\">0%</span></div>
      <div className=\"flex items-center gap-2\"><span className=\"w-2 h-2 rounded-full bg-format-pptx-text\"></span><span className=\"text-text-secondary w-20\">PPTX</span><span className=\"font-semibold text-text-primary\">0%</span></div>
      <div className=\"flex items-center gap-2\"><span className=\"w-2 h-2 rounded-full bg-format-hwp-text\"></span><span className=\"text-text-secondary w-20\">HWP/HWPX</span><span className=\"font-semibold text-text-primary\">0%</span></div>
      <div className=\"flex items-center gap-2\"><span className=\"w-2 h-2 rounded-full bg-format-pdf-text\"></span><span className=\"text-text-secondary w-20\">PDF</span><span className=\"font-semibold text-text-primary\">0%</span></div>
    </>
  ) : (
    <div className=\"text-text-muted\">데이터가 없습니다.</div>
  )}
</div>'''
# Only replace the first match of pattern1 (the donut legend)
content = pattern1.sub(replacement1, content, count=1)

# Replace the bar charts
pattern2 = re.compile(r'<div className=\"flex flex-col gap-space-md py-space-sm\">.*?</div>\s*</div>\s*<div className=\"mt-auto flex items-center justify-between', re.DOTALL)
replacement2 = '''<div className=\"flex flex-col gap-space-md py-space-sm\">
  {scanResult ? (
    <div className=\"text-center text-text-muted py-10\">스캔 완료</div>
  ) : (
    <div className=\"text-center text-text-muted py-10\">데이터가 없습니다.</div>
  )}
</div>
</div>
<div className=\"mt-auto flex items-center justify-between'''
content = pattern2.sub(replacement2, content, count=1)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated chart values in DirectoryScreen.tsx')
