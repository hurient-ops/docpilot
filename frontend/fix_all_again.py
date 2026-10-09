import sys
import re

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Escaping in setDrives
content = content.replace("setDrives(['C:\\', 'D:\\', 'E:\\']);", "setDrives(['C:\\\\', 'D:\\\\', 'E:\\\\']);")

# 2. Path normalization in buildTree
content = content.replace("const normScanPath = scanPath.replace(/\\\\/g, '/').replace(/\\\\/$/, '');", "const normScanPath = scanPath.replace(/\\\\\\\\/g, '/').replace(/\\\\/$/, '');")
content = content.replace("const normFilePath = filePath.replace(/\\\\/g, '/');", "const normFilePath = filePath.replace(/\\\\\\\\/g, '/');")

# 3. Add FileTreeNode Component
tree_node = '''const fileTree = buildTree();

  const FileTreeNode = ({ node, path }: { node: any, path: string }) => {
    const isRoot = path === "";
    const isExpanded = isRoot || expandedFolders[path] !== true;
    const hasChildren = Object.keys(node.folders).length > 0 || node.files.length > 0;
    return (
      <div className={`flex flex-col gap-1 ${!isRoot ? 'pl-4' : ''}`}>
        {!isRoot && (
          <div onClick={() => toggleFolder(path)} className="flex items-center gap-1.5 p-1 text-text-primary font-semibold hover:bg-surface-container cursor-pointer rounded">
            <span className="material-symbols-outlined text-[16px] text-text-secondary">
              {hasChildren ? (isExpanded ? "arrow_drop_down" : "arrow_right") : "horizontal_rule"}
            </span>
            <span className="material-symbols-outlined text-[16px] text-secondary">
              {isExpanded ? "folder_open" : "folder"}
            </span>
            <span className="truncate">{path.split(/[\\\\\\\\/]/).pop()}</span>
          </div>
        )}
        {isExpanded && (
          <div className={`${!isRoot ? 'ml-2 border-l border-surface-container-highest pl-2' : ''}`}>
            {Object.entries(node.folders).map(([subFolderName, subNode]) => (
              <FileTreeNode key={subFolderName} node={subNode} path={path ? `${path}/${subFolderName}` : subFolderName} />
            ))}
            {node.files.map((file: any, i: number) => (
              <div key={i} className="flex items-center gap-2 p-1 rounded hover:bg-surface-canvas cursor-pointer text-text-secondary hover:text-text-primary pl-4">
                <span className="material-symbols-outlined text-[14px]">description</span>
                <span className="truncate text-[12px]" title={file.file_path}>{file.file_name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
'''
if "FileTreeNode =" not in content:
    content = content.replace("const fileTree = buildTree();", tree_node)

# 4. Fix Badge Counts
content = re.sub(r'(<span>PPTX</span>\s*<span className="[^"]*")>0</span>', r'\1>{formatCounts.PPTX}</span>', content)
content = re.sub(r'(<span>XLSX</span>\s*<span className="[^"]*")>0</span>', r'\1>{formatCounts.XLSX}</span>', content)
content = re.sub(r'(<span>DOCX</span>\s*<span className="[^"]*")>0</span>', r'\1>{formatCounts.DOCX}</span>', content)
content = re.sub(r'(<span>HWP(?:/HWPX)?</span>\s*<span className="[^"]*")>0</span>', r'\1>{formatCounts.HWP}</span>', content)
content = re.sub(r'(<span>PDF</span>\s*<span className="[^"]*")>0</span>', r'\1>{formatCounts.PDF}</span>', content)

# 5. Fix table extension filtering
content = content.replace("const ext = file.extension?.toLowerCase() || '';", "const ext = (file.extension || file.file_name?.split('.').pop() || '').toLowerCase();")

# 6. Replace static HTML tree with FileTreeNode
tree_start_token = '<div className="flex flex-col gap-1 font-body-dense text-body-dense overflow-y-auto max-h-[380px] pr-1">'
if tree_start_token in content:
    idx_start = content.index(tree_start_token)
    # find the matching closing div for this one
    div_count = 0
    idx_end = -1
    pos = idx_start
    while pos < len(content):
        next_open = content.find('<div', pos)
        next_close = content.find('</div', pos)
        if next_open != -1 and next_open < next_close:
            div_count += 1
            pos = next_open + 4
        elif next_close != -1:
            div_count -= 1
            pos = next_close + 5
            if div_count == 0:
                idx_end = pos + 1
                break
        else:
            break
            
    if idx_end != -1:
        new_tree_html = tree_start_token + '\\n                <FileTreeNode node={fileTree} path="" />\\n              </div>'
        content = content[:idx_start] + new_tree_html + content[idx_end:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("DirectoryScreen fixed.")
