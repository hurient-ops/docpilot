import re
import os

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove max-height and overflow constraints
content = content.replace('overflow-y-auto max-h-[380px]', '')

# Replace the flat list rendering with a folder-based grouped rendering
tree_old_pattern = re.compile(r'\{scanResult\?\.files && scanResult\.files\.length > 0 \? \(.*?\) : \(.*?스캔된 파일이 없습니다.*?</div>\s*\)', re.DOTALL)

tree_new_logic = r'''
  {scanResult?.files && scanResult.files.length > 0 ? (
    Object.entries(
      scanResult.files.reduce((acc: any, file: any) => {
        // Extract relative folder path or use "root"
        let folder = "Root";
        if (file.file_path && scanPath) {
          let relPath = file.file_path.replace(scanPath, "");
          if (relPath.startsWith("\\\\") || relPath.startsWith("/")) relPath = relPath.substring(1);
          const parts = relPath.split(/[\\\\/]/);
          if (parts.length > 1) {
            parts.pop(); // remove file name
            folder = parts.join("/");
          }
        }
        if (!acc[folder]) acc[folder] = [];
        acc[folder].push(file);
        return acc;
      }, {})
    ).map(([folder, files]: [string, any], fIndex: number) => (
      <div key={`folder-${fIndex}`} className="flex flex-col gap-1 mb-2">
        {folder !== "Root" && (
          <div className="pl-4 flex items-center gap-1.5 p-1 text-text-primary font-semibold">
            <span className="material-symbols-outlined text-[16px] text-text-secondary">arrow_drop_down</span>
            <span className="material-symbols-outlined text-[16px] text-secondary">folder</span>
            <span className="truncate">{folder}</span>
          </div>
        )}
        {files.map((file: any, i: number) => (
          <div key={`file-${fIndex}-${i}`} className={`${folder !== "Root" ? "pl-10" : "pl-6"} flex items-center gap-2 p-1 rounded hover:bg-surface-canvas cursor-pointer text-text-secondary hover:text-text-primary`}>
            <span className="material-symbols-outlined text-[14px]">description</span>
            <span className="truncate text-[12px]" title={file.file_path}>{file.file_name}</span>
          </div>
        ))}
      </div>
    ))
  ) : (
    <div className="pl-6 text-text-muted text-xs p-2">스캔된 파일이 없습니다.</div>
  )
}
'''
# Using `re.sub` but we have to be careful with escaping or just replace string manually
# Instead of regex, let's use string find & replace to be safe.
start_str = '{scanResult?.files && scanResult.files.length > 0 ? ('
end_str = '스캔된 파일이 없습니다.</div>\n  )}'

start_idx = content.find(start_str)
end_idx = content.find(end_str) + len(end_str)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + tree_new_logic.strip() + content[end_idx:]
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Updated Directory Tree rendering logic")
else:
    print("Could not find tree logic blocks to replace")
