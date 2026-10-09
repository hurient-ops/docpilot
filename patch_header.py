import re

file_path = r'e:\projects\docpilot\frontend\src\components\Header.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = '<button className="w-7 h-7 rounded flex items-center justify-center text-text-secondary hover:bg-surface-container hover:text-on-surface transition-colors" type="button"><span className="material-symbols-outlined text-[18px]">settings</span></button>'
content = content.replace(target, '')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
