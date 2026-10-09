import re

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'(<span>PPTX</span>\s*<span className="[^"]*")>0</span>', r'\1>{formatCounts.PPTX}</span>', content)
content = re.sub(r'(<span>XLSX</span>\s*<span className="[^"]*")>0</span>', r'\1>{formatCounts.XLSX}</span>', content)
content = re.sub(r'(<span>DOCX</span>\s*<span className="[^"]*")>0</span>', r'\1>{formatCounts.DOCX}</span>', content)
# Wait, the button for HWP might say "HWP" or "HWP/HWPX"
content = re.sub(r'(<span>HWP(?:/HWPX)?</span>\s*<span className="[^"]*")>0</span>', r'\1>{formatCounts.HWP}</span>', content)
content = re.sub(r'(<span>PDF</span>\s*<span className="[^"]*")>0</span>', r'\1>{formatCounts.PDF}</span>', content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Badges fixed")
