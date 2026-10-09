import re
import sys

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. State for Local Library and Tree
new_state = '''const [scanPath, setScanPath] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFolderPickerOpen, setIsFolderPickerOpen] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  
  // Use session storage for persistence
  React.useEffect(() => {
    const savedPath = sessionStorage.getItem('scanPath');
    const savedResult = sessionStorage.getItem('scanResult');
    if (savedPath) setScanPath(savedPath);
    if (savedResult) setScanResult(JSON.parse(savedResult));
  }, []);

  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const [drives, setDrives] = useState<string[]>([]);
  React.useEffect(() => {
    // In a real tauri app, this would query system drives
    setDrives(['C:\\\\', 'D:\\\\', 'E:\\\\']);
  }, []);

  const buildTree = () => {
    const root: any = { folders: {}, files: [] };
    if (!scanResult?.files) return root;
    const normScanPath = scanPath.replace(/\\\\\\\\/g, '/').replace(/\\\\/$/, '');
    scanResult.files.forEach((file: any) => {
      const filePath = file.file_path || file.name || "";
      if (!filePath || !scanPath) {
        root.files.push(file);
        return;
      }
      const normFilePath = filePath.replace(/\\\\\\\\/g, '/');
      let relPath = normFilePath.replace(normScanPath, "");
      if (relPath.startsWith('/')) relPath = relPath.substring(1);
      
      const parts = relPath.split('/');
      let current = root;
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current.folders[part]) {
          current.folders[part] = { folders: {}, files: [] };
        }
        current = current.folders[part];
      }
      current.files.push(file);
    });
    return root;
  };

  const fileTree = buildTree();

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
            <span className="truncate">{path.split(/[\\\\/]/).pop()}</span>
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

# Replace the initial useState hooks
content = re.sub(
    r"const \[scanPath, setScanPath\] = useState\('e:/projects/docpilot/doc'\);\s*const \[loading, setLoading\] = useState\(false\);\s*const \[isFolderPickerOpen, setIsFolderPickerOpen\] = useState\(false\);\s*const \[scanResult, setScanResult\] = useState<any>\(null\);",
    new_state, content, count=1
)

# 2. Add sessionStorage to handleScan
handle_scan_replacement = '''const handleScan = async () => {
    if (!scanPath) return;
    setLoading(true);
    try {
      const result = await api.scanner.scanDirectory(scanPath);
      setScanResult(result);
      sessionStorage.setItem('scanPath', scanPath);
      sessionStorage.setItem('scanResult', JSON.stringify(result));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };'''
content = re.sub(
    r"const handleScan = async \(\) => \{.*?\};",
    handle_scan_replacement, content, flags=re.DOTALL
)

# 3. Dynamic Format Counts and Donut Chart
format_counts = '''const totalFiles = scanResult?.files?.length || 0;
  const totalSizeBytes = scanResult?.files?.reduce((acc: number, f: any) => acc + (f.size || 0), 0) || 0;

  const formatCounts = { PPTX: 0, XLSX: 0, DOCX: 0, HWP: 0, PDF: 0 };
  (scanResult?.files || []).forEach((file: any) => {
    const ext = (file.extension || file.file_name?.split('.').pop() || "").toLowerCase();
    if (['ppt', 'pptx'].includes(ext)) formatCounts.PPTX++;
    else if (['xls', 'xlsx'].includes(ext)) formatCounts.XLSX++;
    else if (['doc', 'docx'].includes(ext)) formatCounts.DOCX++;
    else if (['hwp', 'hwpx'].includes(ext)) formatCounts.HWP++;
    else if (ext === 'pdf') formatCounts.PDF++;
  });

  const getPct = (count: number) => totalFiles > 0 ? (count / totalFiles) * 100 : 0;
  
  const formatSizeString = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
'''

content = re.sub(
    r"const \[selectedFormat, setSelectedFormat\] = useState<string \| null>\(null\);",
    "const [selectedFormat, setSelectedFormat] = useState<string | null>(null);\n  " + format_counts,
    content
)

# Fix badges
content = re.sub(r'(<span>PPTX</span>\s*<span className="[^"]*")>0</span>', r'\1>{formatCounts.PPTX}</span>', content)
content = re.sub(r'(<span>XLSX</span>\s*<span className="[^"]*")>0</span>', r'\1>{formatCounts.XLSX}</span>', content)
content = re.sub(r'(<span>DOCX</span>\s*<span className="[^"]*")>0</span>', r'\1>{formatCounts.DOCX}</span>', content)
content = re.sub(r'(<span>HWP/HWPX</span>\s*<span className="[^"]*")>0</span>', r'\1>{formatCounts.HWP}</span>', content)
content = re.sub(r'(<span>PDF</span>\s*<span className="[^"]*")>0</span>', r'\1>{formatCounts.PDF}</span>', content)

# Fix donut chart percentages
content = re.sub(r'<span className="font-code-mono font-bold text-text-primary">29\.2%</span>', r'<span className="font-code-mono font-bold text-text-primary">{getPct(formatCounts.XLSX).toFixed(1)}%</span>', content)
content = re.sub(r'<span className="font-code-mono font-bold text-text-primary">20\.8%</span>', r'<span className="font-code-mono font-bold text-text-primary">{getPct(formatCounts.DOCX).toFixed(1)}%</span>', content)
content = re.sub(r'<span className="font-code-mono font-bold text-text-primary">16\.7%</span>', r'<span className="font-code-mono font-bold text-text-primary">{getPct(formatCounts.PPTX).toFixed(1)}%</span>', content)
content = re.sub(r'<span className="font-code-mono font-bold text-text-primary">25\.0%</span>', r'<span className="font-code-mono font-bold text-text-primary">{getPct(formatCounts.HWP).toFixed(1)}%</span>', content)
content = re.sub(r'<span className="font-code-mono font-bold text-text-primary">8\.3%</span>', r'<span className="font-code-mono font-bold text-text-primary">{getPct(formatCounts.PDF).toFixed(1)}%</span>', content)

# Total files in format filter top
content = re.sub(r'<span className="bg-primary-container px-1 rounded-full text-\[9px\] text-primary-fixed">0</span>', r'<span className="bg-primary-container px-1 rounded-full text-[9px] text-primary-fixed">{totalFiles}</span>', content)


# 4. Folder Hierarchy Size & Indexing Status
folder_status_regex = re.compile(r'<div className="flex flex-col gap-space-xs">\s*<div className="flex items-center justify-between p-2 rounded bg-surface-canvas hover:bg-surface-container transition-colors">.*?</div>\s*</div>', re.DOTALL)
folder_status_new = '''<div className="flex flex-col gap-space-xs">
              {Object.entries(fileTree.folders).map(([folderName, node]: [string, any]) => {
                const nodeSize = node.files.reduce((acc: number, f: any) => acc + (f.size || 0), 0);
                const isComplete = true; 
                return (
                  <div key={folderName} className="flex items-center justify-between p-2 rounded bg-surface-canvas hover:bg-surface-container transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-secondary">folder</span>
                      <span className="font-body-dense text-body-dense font-medium truncate max-w-[120px]">{folderName}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-code-mono text-code-mono text-text-muted">{formatSizeString(nodeSize)}</span>
                      {isComplete ? (
                        <div className="w-16 h-1.5 bg-surface-container-highest rounded-full overflow-hidden flex items-center justify-center relative">
                          <div className="absolute inset-0 bg-primary/20"></div>
                          <div className="h-full bg-primary relative z-10 w-full rounded-full"></div>
                        </div>
                      ) : (
                        <div className="w-16 h-1.5 bg-surface-container-highest rounded-full overflow-hidden flex items-center justify-center relative">
                          <div className="h-full bg-secondary relative z-10 w-1/2 rounded-full"></div>
                        </div>
                      )}
                      <span className="material-symbols-outlined text-[14px] text-primary">cloud_done</span>
                    </div>
                  </div>
                );
              })}
              {Object.keys(fileTree.folders).length === 0 && (
                <div className="text-center text-text-muted py-4 text-sm">
                  폴더를 스캔하면 하위 폴더별 용량이 표시됩니다.
                </div>
              )}
            </div>'''
content = folder_status_regex.sub(folder_status_new, content)

# 5. Table File list dynamic matching
content = content.replace("const ext = file.extension?.toLowerCase() || '';", "const ext = (file.extension || file.file_name?.split('.').pop() || '').toLowerCase();")

# 6. HTML Tree replacement
tree_start_token = '<div className="flex flex-col gap-1 font-body-dense text-body-dense overflow-y-auto max-h-[380px] pr-1">'
idx_start = content.index(tree_start_token)
pos = idx_start
div_count = 0
idx_end = -1
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
    new_tree_html = tree_start_token.replace('pr-1"', 'pr-1 custom-scrollbar"') + '\\n                <FileTreeNode node={fileTree} path="" />\\n              </div>'
    content = content[:idx_start] + new_tree_html + content[idx_end:]


# 7. Add rotating icon if loading
content = content.replace('className="material-symbols-outlined text-[18px]"', 'className={`material-symbols-outlined text-[18px] ${loading ? "animate-spin" : ""}`}')


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

# And fix Sidebar.tsx
sidebar_path = r'e:\projects\docpilot\frontend\src\components\Sidebar.tsx'
with open(sidebar_path, 'r', encoding='utf-8') as f:
    sidebar = f.read()

sidebar_regex = re.compile(r'<div className="space-y-space-xs font-body-dense text-body-dense">.*?</div>\s*<div className="h-px bg-border-subtle my-space-xs">', re.DOTALL)
sidebar_new = '''<div className="space-y-space-xs font-body-dense text-body-dense">
          <div className="flex items-center gap-space-xs px-space-sm py-1.5 rounded hover:bg-surface-container text-text-secondary hover:text-on-surface cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">hard_drive</span>
            <span className="truncate">C:\\\\</span>
          </div>
          <div className="flex items-center gap-space-xs px-space-sm py-1.5 rounded hover:bg-surface-container text-text-secondary hover:text-on-surface cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">hard_drive</span>
            <span className="truncate">D:\\\\</span>
          </div>
          <div className="flex items-center gap-space-xs px-space-sm py-1.5 rounded hover:bg-surface-container text-text-secondary hover:text-on-surface cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">hard_drive</span>
            <span className="truncate">E:\\\\</span>
          </div>
        </div>
        <div className="h-px bg-border-subtle my-space-xs">'''
sidebar = sidebar_regex.sub(sidebar_new, sidebar)

with open(sidebar_path, 'w', encoding='utf-8') as f:
    f.write(sidebar)
print("Complete fix applied.")
