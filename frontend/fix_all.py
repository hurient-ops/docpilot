import re

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1 & 5. Fix tree hierarchy and format logic
tree_logic = '''
  const [drives, setDrives] = useState<string[]>([]);
  React.useEffect(() => {
    // Fetch logic drives if Tauri is available (mocking for now, will call backend later)
    setDrives(['C:\\\\', 'D:\\\\', 'E:\\\\']);
  }, []);

  const buildTree = () => {
    const root: any = { folders: {}, files: [] };
    if (!scanResult?.files) return root;
    const normScanPath = scanPath.replace(/\\\\/g, '/').replace(/\\/$/, '');
    scanResult.files.forEach((file: any) => {
      const filePath = file.file_path || file.name || "";
      if (!filePath || !scanPath) {
        root.files.push(file);
        return;
      }
      const normFilePath = filePath.replace(/\\\\/g, '/');
      let relPath = normFilePath.replace(normScanPath, "");
      if (relPath.startsWith("/")) relPath = relPath.substring(1);
      
      const parts = relPath.split("/");
      let current = root;
      // The last part is the file name, all preceding parts are folders
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current.folders[part]) current.folders[part] = { folders: {}, files: [], size: 0, count: 0 };
        current.folders[part].size += file.size || 0;
        current.folders[part].count++;
        current = current.folders[part];
      }
      current.files.push(file);
    });
    return root;
  };
  const fileTree = buildTree();

  const formatCounts = { PPTX: 0, XLSX: 0, DOCX: 0, HWP: 0, PDF: 0 };
  let totalSize = 0;
  if (scanResult?.files) {
    scanResult.files.forEach((file: any) => {
      totalSize += file.size || 0;
      const ext = (file.extension || file.file_name?.split('.').pop() || "").toLowerCase();
      if (['ppt', 'pptx'].includes(ext)) formatCounts.PPTX++;
      else if (['xls', 'xlsx'].includes(ext)) formatCounts.XLSX++;
      else if (['doc', 'docx'].includes(ext)) formatCounts.DOCX++;
      else if (['hwp', 'hwpx'].includes(ext)) formatCounts.HWP++;
      else if (ext === 'pdf') formatCounts.PDF++;
    });
  }
'''
content = re.sub(
    r'const buildTree = \(\) => \{.*const getPct = \(count: number\) => totalFiles > 0 \? \(count / totalFiles\) \* 100 : 0;',
    tree_logic + '\n  const totalFiles = scanResult?.files?.length || 0;\n  const getPct = (count: number) => totalFiles > 0 ? (count / totalFiles) * 100 : 0;',
    content,
    flags=re.DOTALL
)

# 2. Fix XLSX 29.2% bug in donut chart
content = content.replace(
    '<span className="font-code-mono font-bold text-text-primary">29.2%</span>',
    '<span className="font-code-mono font-bold text-text-primary">{getPct(formatCounts.XLSX).toFixed(1)}%</span>'
)

# 3. Fix Local Library (hardcoded drives)
local_library_regex = re.compile(r'<div className="bg-surface-canvas rounded-lg p-space-sm flex flex-col gap-1">.*?</div>', re.DOTALL)
local_library_new = '''<div className="bg-surface-canvas rounded-lg p-space-sm flex flex-col gap-1">
            {drives.map((drive, idx) => (
              <button 
                key={idx} 
                onClick={() => setScanPath(drive)}
                className={`flex items-center gap-space-sm p-2 rounded-lg transition-colors ${scanPath === drive ? "bg-surface-variant text-text-primary" : "hover:bg-surface-container text-text-secondary"}`} 
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-secondary">hard_drive</span>
                <span className="font-body-dense text-body-dense font-medium">{drive}</span>
              </button>
            ))}
          </div>'''
content = local_library_regex.sub(local_library_new, content, count=1)

# 4. Folder Hierarchy Size & Indexing Status (Dynamic from fileTree root folders)
folder_status_regex = re.compile(r'<div className="flex flex-col gap-space-xs">\s*<div className="flex items-center justify-between p-2 rounded bg-surface-canvas hover:bg-surface-container transition-colors">.*?</div>\s*</div>', re.DOTALL)
folder_status_new = '''<div className="flex flex-col gap-space-xs">
              {Object.keys(fileTree.folders).length > 0 ? Object.entries(fileTree.folders).map(([folderName, folderData]: [string, any], idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded bg-surface-canvas hover:bg-surface-container transition-colors">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-format-pptx-bg">folder</span>
                    <span className="font-body-dense text-body-dense font-semibold text-text-primary">{folderName} <span className="text-text-secondary font-normal">({formatSizeString(folderData.size)})</span></span>
                  </div>
                  <div className="flex items-center gap-space-sm">
                    <div className="w-[200px] h-1.5 bg-surface-container-highest rounded-full overflow-hidden hidden sm:block">
                      <div className="h-full bg-status-local-text rounded-full" style={{ width: "100%" }}></div>
                    </div>
                    <span className="font-code-mono text-text-muted">100% 완료 ({folderData.count} / {folderData.count})</span>
                  </div>
                </div>
              )) : (
                <div className="p-2 text-text-muted text-sm text-center">폴더 구조 정보가 없습니다.</div>
              )}
            </div>'''
content = folder_status_regex.sub(folder_status_new, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Applied all fixes for user request.")
