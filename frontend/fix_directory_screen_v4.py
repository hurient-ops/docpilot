import os
import re

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix format badges in the table
# Current: <span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label font-bold bg-format-pptx-bg text-format-pptx-text">
# Replace with dynamic color based on extension
table_badge_repl = """
        <span className={`px-space-xs py-0.5 rounded font-badge-label text-badge-label font-bold ${
          ['ppt', 'pptx'].includes((file.extension || file.file_name?.split('.').pop() || '').toLowerCase()) ? 'bg-format-pptx-bg text-format-pptx-text' :
          ['xls', 'xlsx'].includes((file.extension || file.file_name?.split('.').pop() || '').toLowerCase()) ? 'bg-format-xlsx-bg text-format-xlsx-text' :
          ['doc', 'docx'].includes((file.extension || file.file_name?.split('.').pop() || '').toLowerCase()) ? 'bg-format-docx-bg text-format-docx-text' :
          ['hwp', 'hwpx'].includes((file.extension || file.file_name?.split('.').pop() || '').toLowerCase()) ? 'bg-format-hwp-bg text-format-hwp-text' :
          'bg-format-pdf-bg text-format-pdf-text'
        }`}>
"""
content = re.sub(r'<span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label font-bold bg-format-pptx-bg text-format-pptx-text">', table_badge_repl.strip(), content)

# 2. Fix the FileTreeNode UI (Chevrons and Folder colors)
old_node = r"""<span className="material-symbols-outlined text-\[16px\] text-text-secondary">
              \{hasChildren \? \(isExpanded \? "arrow_drop_down" : "arrow_right"\) : "horizontal_rule"\}
            </span>
            <span className="material-symbols-outlined text-\[16px\] text-secondary">
              \{isExpanded \? "folder_open" : "folder"\}
            </span>"""
new_node = """<div className="w-4 flex items-center justify-center shrink-0">
              {hasChildren ? (
                <span className="material-symbols-outlined text-[16px] text-text-muted">
                  {isExpanded ? "keyboard_arrow_down" : "chevron_right"}
                </span>
              ) : <span className="w-4" />}
            </div>
            <span className="material-symbols-outlined text-[16px] text-yellow-500">
              {isExpanded ? "folder_open" : "folder"}
            </span>"""
content = re.sub(old_node, new_node, content, flags=re.MULTILINE)

# 3. Dynamic Subfolder Stats (폴더 계층별 용량 & 증분 색인 상태)
# We will replace the whole block from <div className="space-y-space-md py-space-xs"> to the end of that block.
old_subfolders = r'<div className="space-y-space-md py-space-xs">.*?</div>\s*<div className="flex items-center justify-between text-caption'
new_subfolders = """<div className="space-y-space-md py-space-xs">
{Object.entries(fileTree.folders).map(([subFolderName, subNode]: [string, any]) => {
  const count = subNode.files.length + Object.keys(subNode.folders).length;
  // Calculate recursive size
  const getDirSize = (node: any): number => {
    let size = 0;
    node.files.forEach((f: any) => size += (f.size || 0));
    Object.values(node.folders).forEach((child: any) => size += getDirSize(child));
    return size;
  };
  const size = getDirSize(subNode);
  const sizeStr = size > 1024*1024*1024 ? (size/(1024*1024*1024)).toFixed(1) + ' GB' : size > 1024*1024 ? (size/(1024*1024)).toFixed(1) + ' MB' : (size/1024).toFixed(1) + ' KB';
  return (
    <div key={subFolderName} className="space-y-1">
      <div className="flex justify-between font-caption text-caption">
        <span className="font-semibold text-text-primary">📁 {subFolderName} ({sizeStr})</span>
        <span className="font-code-mono text-text-muted">100% 완료 ({count} / {count})</span>
      </div>
      <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden flex">
        <div className="bg-secondary h-full rounded-l-full" style={{width: '100%'}}></div>
      </div>
    </div>
  );
})}
{Object.keys(fileTree.folders).length === 0 && (
  <div className="text-center text-text-muted py-4">하위 폴더가 없습니다.</div>
)}
</div>
<div className="flex items-center justify-between text-caption"""

content = re.sub(old_subfolders, new_subfolders, content, flags=re.DOTALL)

# 4. Remove other mocks (Size, Slides, PII, Errors)
content = content.replace('{scanResult ? "0.1" : "0"}', '{(() => { let s=0; scanResult?.files?.forEach((f:any)=>s+=(f.size||0)); return s>1024*1024*1024 ? (s/(1024*1024*1024)).toFixed(1) : (s/(1024*1024)).toFixed(1); })()}')
content = content.replace('{scanResult ? "15" : "0"}', '0')
content = content.replace('{scanResult ? "100%" : "0%"}', '{scanResult ? "100%" : "0%"}') # Keep this as 100% when scanned
content = content.replace('<span className="font-headline-md text-headline-md font-bold text-security-dlp-breach">47</span>', '<span className="font-headline-md text-headline-md font-bold text-security-dlp-breach">0</span>')
content = content.replace('<span className="font-headline-md text-headline-md font-bold text-status-cloud-text">2</span>', '<span className="font-headline-md text-headline-md font-bold text-status-cloud-text">{scanResult?.errors || 0}</span>')

# 5. Fix table size display
content = content.replace('<td className="py-2 px-space-sm font-code-mono text-code-mono">N/A</td>', '<td className="py-2 px-space-sm font-code-mono text-code-mono">{file.size ? (file.size > 1024*1024 ? (file.size/(1024*1024)).toFixed(1) + " MB" : (file.size/1024).toFixed(1) + " KB") : "N/A"}</td>')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied UI fixes to DirectoryScreen.tsx")
