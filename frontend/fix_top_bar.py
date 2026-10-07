import re

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Move scanResult out of the flex row completely.
scan_result_str = '{scanResult && <div className="mt-2 text-sm text-green-600 font-bold bg-green-50 p-2 rounded w-full">✅ 스캔 완료: 신규 {scanResult.added}건, 업데이트 {scanResult.updated}건, 스킵 {scanResult.skipped}건</div>}'

# Remove it from current location
content = content.replace(scan_result_str, '')

# Add it after the entire top bar section (after <div className="flex items-center flex-wrap gap-space-xs pt-1">...</div></div>)
# Actually, the easiest is to put it right before the stats grid (grid grid-cols-2)
grid_target = '<div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">'
if grid_target in content:
    content = content.replace(grid_target, scan_result_str + '\n\n' + grid_target)

# 2. Fix the "최근 경로" button so it doesn't wrap vertically
old_btn = '<button className="flex items-center gap-1 text-caption font-caption text-text-secondary hover:text-text-primary px-space-xs py-0.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors" type="button">'
new_btn = '<button className="flex items-center gap-1 text-caption font-caption text-text-secondary hover:text-text-primary px-space-xs py-0.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors shrink-0 whitespace-nowrap" type="button">'
content = content.replace(old_btn, new_btn)

# 3. Ensure the input box doesn't disappear. It should be min-w-0 or flex-1.
old_input_container = '<div className="relative flex-1 flex items-center bg-surface-canvas rounded-lg px-space-md py-1.5 focus-within:ring-2 focus-within:ring-secondary-container">'
new_input_container = '<div className="relative flex-1 min-w-[200px] flex items-center bg-surface-canvas rounded-lg px-space-md py-1.5 focus-within:ring-2 focus-within:ring-secondary-container">'
content = content.replace(old_input_container, new_input_container)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Top bar fixed")
