import os
import re

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = '<button className="h-8 px-space-md rounded-lg bg-primary-container text-on-primary font-body-semibold text-body-semibold hover:bg-primary transition-colors flex items-center gap-1 shrink-0" type="button">'
replacement = '<button onClick={handleScan} disabled={loading} className="h-8 px-space-md rounded-lg bg-primary-container text-on-primary font-body-semibold text-body-semibold hover:bg-primary transition-colors flex items-center gap-1 shrink-0" type="button">'

content = content.replace(target, replacement)
content = content.replace('<span>스캔 시작</span>', '<span>{loading ? "스캔 중..." : "스캔 시작"}</span>')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done")
