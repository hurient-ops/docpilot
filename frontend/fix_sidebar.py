import re

file_path = r'e:\projects\docpilot\frontend\src\components\Sidebar.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

local_library_regex = re.compile(r'<div className="space-y-space-xs font-body-dense text-body-dense">.*?</div>\s*<div className="h-px bg-border-subtle my-space-xs">', re.DOTALL)

local_library_new = '''<div className="space-y-space-xs font-body-dense text-body-dense">
          <div className="flex items-center gap-space-xs px-space-sm py-1.5 rounded hover:bg-surface-container text-text-secondary hover:text-on-surface cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">hard_drive</span>
            <span className="truncate">C:\\</span>
          </div>
          <div className="flex items-center gap-space-xs px-space-sm py-1.5 rounded hover:bg-surface-container text-text-secondary hover:text-on-surface cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">hard_drive</span>
            <span className="truncate">D:\\</span>
          </div>
          <div className="flex items-center gap-space-xs px-space-sm py-1.5 rounded hover:bg-surface-container text-text-secondary hover:text-on-surface cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">hard_drive</span>
            <span className="truncate">E:\\</span>
          </div>
        </div>
        <div className="h-px bg-border-subtle my-space-xs">'''

content = local_library_regex.sub(local_library_new, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Sidebar fixed")
