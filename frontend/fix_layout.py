import os
import re

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Move scanResult div out of the input container
scan_result_str = '{scanResult && <div className="mt-2 text-sm text-green-600 font-bold bg-green-50 p-2 rounded w-full">✅ 스캔 완료: 신규 {scanResult.added}건, 업데이트 {scanResult.updated}건, 스킵 {scanResult.skipped}건</div>}'
content = content.replace(scan_result_str, '')

# Place it right after the closing of the action bar flex container
# We'll just search for the end of the action bar: <div className="flex items-center gap-space-xs">...</div>
action_bar_full_regex = re.compile(r'(<div className="flex items-center gap-space-xs">.*?</div>\s*</div>)', re.DOTALL)
match = action_bar_full_regex.search(content)
if match:
    content = content[:match.end()] + '\n' + scan_result_str + content[match.end():]
else:
    print('action bar not found')

# 2. Fix the donut graph layout
donut_container_old = '<div className="flex flex-col items-center justify-center gap-space-lg py-space-md">'
donut_container_new = '<div className="flex flex-row items-center justify-center gap-16 py-space-md w-full">'
content = content.replace(donut_container_old, donut_container_new)

# Maximize donut graph
content = content.replace('<div className="relative w-64 h-64 shrink-0">', '<div className="relative w-80 h-80 shrink-0">')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('DirectoryScreen layout updated')
