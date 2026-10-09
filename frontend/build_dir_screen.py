import re
import os

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. State + Tree logic + Format logic
state_and_logic = '''
  // State Persistence
  const [scanPathState, setScanPathState] = useState(() => sessionStorage.getItem('docpilot_scanPath') || 'e:/projects/docpilot/doc');
  const [scanResultState, setScanResultState] = useState<any>(() => {
    const saved = sessionStorage.getItem('docpilot_scanResult');
    try { return saved ? JSON.parse(saved) : null; } catch { return null; }
  });
  const scanPath = scanPathState;
  const scanResult = scanResultState;
  const setScanPath = (p: string) => { setScanPathState(p); sessionStorage.setItem('docpilot_scanPath', p); };
  const setScanResult = (r: any) => { setScanResultState(r); if(r) sessionStorage.setItem('docpilot_scanResult', JSON.stringify(r)); else sessionStorage.removeItem('docpilot_scanResult'); };

  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folder]: prev[folder] === undefined ? true : !prev[folder]
    }));
  };

  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  // Tree Logic
  const buildTree = () => {
    const root: any = { folders: {}, files: [] };
    if (!scanResult?.files) return root;
    scanResult.files.forEach((file: any) => {
      if (!file.file_path || !scanPath) {
        root.files.push(file);
        return;
      }
      let relPath = file.file_path.replace(scanPath, "");
      if (relPath.startsWith("\\\\") || relPath.startsWith("/")) relPath = relPath.substring(1);
      const parts = relPath.split(/[\\\\/]/);
      let current = root;
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current.folders[part]) current.folders[part] = { folders: {}, files: [] };
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

  // Metrics Logic
  const formatCounts = { PPTX: 0, XLSX: 0, DOCX: 0, HWP: 0, PDF: 0 };
  let totalSize = 0;
  if (scanResult?.files) {
    scanResult.files.forEach((file: any) => {
      totalSize += file.size || 0;
      const ext = file.extension?.toLowerCase();
      if (['ppt', 'pptx'].includes(ext)) formatCounts.PPTX++;
      else if (['xls', 'xlsx'].includes(ext)) formatCounts.XLSX++;
      else if (['doc', 'docx'].includes(ext)) formatCounts.DOCX++;
      else if (['hwp', 'hwpx'].includes(ext)) formatCounts.HWP++;
      else if (ext === 'pdf') formatCounts.PDF++;
    });
  }
  const formatSizeString = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  const totalFiles = scanResult?.files?.length || 0;
  const getPct = (count: number) => totalFiles > 0 ? (count / totalFiles) * 100 : 0;
'''

# Replace initial useState with state_and_logic
content = re.sub(r'const \[scanPath, setScanPath\] = useState\([^)]*\);\s*const \[loading, setLoading\] = useState\(false\);\s*const \[isFolderPickerOpen, setIsFolderPickerOpen\] = useState\(false\);\s*const \[scanResult, setScanResult\] = useState<any>\(null\);', 'const [loading, setLoading] = useState(false);\nconst [isFolderPickerOpen, setIsFolderPickerOpen] = useState(false);\n' + state_and_logic, content)

# 2. Update Sync Button (spin animation)
content = content.replace(
    '<span className="material-symbols-outlined text-[16px]">sync</span>\n<span>스캔 시작</span>',
    '<span className={`material-symbols-outlined text-[16px] ${loading ? "animate-spin" : ""}`}>sync</span>\n<span>{loading ? "스캔 중..." : "스캔 시작"}</span>'
)

# 3. Update Badges (Format Counts + Clickable Filters)
content = content.replace(
    '<span className="bg-primary-container px-1 rounded-full text-[9px] text-primary-fixed">125</span>',
    '<span className="bg-primary-container px-1 rounded-full text-[9px] text-primary-fixed">{totalFiles}</span>'
)
# PPTX
content = content.replace(
    '<button className="px-space-sm py-0.5 rounded-full bg-format-pptx-bg text-format-pptx-text font-badge-label text-badge-label font-bold flex items-center gap-1 shadow-sm hover:brightness-95 transition-all"',
    '<button onClick={() => setSelectedFormat(selectedFormat === "PPTX" ? null : "PPTX")} className={`px-space-sm py-0.5 rounded-full bg-format-pptx-bg text-format-pptx-text font-badge-label text-badge-label font-bold flex items-center gap-1 shadow-sm hover:brightness-95 transition-all ${selectedFormat === "PPTX" ? "ring-2 ring-primary" : ""}`}'
)
content = content.replace('<span className="bg-surface-card px-1 rounded-full text-[9px]">24</span>', '<span className="bg-surface-card px-1 rounded-full text-[9px]">{formatCounts.PPTX}</span>')
# XLSX
content = content.replace(
    '<button className="px-space-sm py-0.5 rounded-full bg-format-xlsx-bg text-format-xlsx-text font-badge-label text-badge-label font-bold flex items-center gap-1 shadow-sm hover:brightness-95 transition-all"',
    '<button onClick={() => setSelectedFormat(selectedFormat === "XLSX" ? null : "XLSX")} className={`px-space-sm py-0.5 rounded-full bg-format-xlsx-bg text-format-xlsx-text font-badge-label text-badge-label font-bold flex items-center gap-1 shadow-sm hover:brightness-95 transition-all ${selectedFormat === "XLSX" ? "ring-2 ring-primary" : ""}`}'
)
content = content.replace('<span className="bg-surface-card px-1 rounded-full text-[9px]">18</span>', '<span className="bg-surface-card px-1 rounded-full text-[9px]">{formatCounts.XLSX}</span>')
# DOCX
content = content.replace(
    '<button className="px-space-sm py-0.5 rounded-full bg-format-docx-bg text-format-docx-text font-badge-label text-badge-label font-bold flex items-center gap-1 shadow-sm hover:brightness-95 transition-all"',
    '<button onClick={() => setSelectedFormat(selectedFormat === "DOCX" ? null : "DOCX")} className={`px-space-sm py-0.5 rounded-full bg-format-docx-bg text-format-docx-text font-badge-label text-badge-label font-bold flex items-center gap-1 shadow-sm hover:brightness-95 transition-all ${selectedFormat === "DOCX" ? "ring-2 ring-primary" : ""}`}'
)
content = content.replace('<span className="bg-surface-card px-1 rounded-full text-[9px]">42</span>', '<span className="bg-surface-card px-1 rounded-full text-[9px]">{formatCounts.DOCX}</span>')
# HWP
content = content.replace(
    '<button className="px-space-sm py-0.5 rounded-full bg-format-hwp-bg text-format-hwp-text font-badge-label text-badge-label font-bold flex items-center gap-1 shadow-sm hover:brightness-95 transition-all"',
    '<button onClick={() => setSelectedFormat(selectedFormat === "HWP" ? null : "HWP")} className={`px-space-sm py-0.5 rounded-full bg-format-hwp-bg text-format-hwp-text font-badge-label text-badge-label font-bold flex items-center gap-1 shadow-sm hover:brightness-95 transition-all ${selectedFormat === "HWP" ? "ring-2 ring-primary" : ""}`}'
)
content = content.replace('<span className="bg-surface-card px-1 rounded-full text-[9px]">31</span>', '<span className="bg-surface-card px-1 rounded-full text-[9px]">{formatCounts.HWP}</span>')
# PDF
content = content.replace(
    '<button className="px-space-sm py-0.5 rounded-full bg-format-pdf-bg text-format-pdf-text font-badge-label text-badge-label font-bold flex items-center gap-1 shadow-sm hover:brightness-95 transition-all"',
    '<button onClick={() => setSelectedFormat(selectedFormat === "PDF" ? null : "PDF")} className={`px-space-sm py-0.5 rounded-full bg-format-pdf-bg text-format-pdf-text font-badge-label text-badge-label font-bold flex items-center gap-1 shadow-sm hover:brightness-95 transition-all ${selectedFormat === "PDF" ? "ring-2 ring-primary" : ""}`}'
)
content = content.replace('<span className="bg-surface-card px-1 rounded-full text-[9px]">10</span>', '<span className="bg-surface-card px-1 rounded-full text-[9px]">{formatCounts.PDF}</span>')

# Total sizes and document counts
content = content.replace('<span className="font-title-lg text-title-lg font-bold text-text-primary">842</span>', '<span className="font-title-lg text-title-lg font-bold text-text-primary">{totalFiles}</span>')
content = content.replace('<span className="font-title-lg text-title-lg font-bold text-text-primary">3,120</span>', '<span className="font-title-lg text-title-lg font-bold text-text-primary">{formatSizeString(totalSize)}</span>')

# 4. Update the Directory Tree View
tree_html_regex = re.compile(r'<div className="flex flex-col gap-1 font-body-dense text-body-dense  pr-1">\s*<div className="flex items-center gap-1\.5 p-1 rounded hover:bg-surface-container cursor-pointer text-text-primary font-semibold">.*?</div>\s*</div>', re.DOTALL)
tree_html_new = '''<div className="flex flex-col gap-1 font-body-dense text-body-dense pr-1">
          <div className="flex items-center gap-1.5 p-1 rounded hover:bg-surface-container cursor-pointer text-text-primary font-semibold">
            <span className="material-symbols-outlined text-[16px] text-text-secondary">arrow_drop_down</span>
            <span className="material-symbols-outlined text-[18px] text-secondary">folder</span>
            <span className="truncate">{scanPath.split(/[\\\\/]/).pop() || "선택된 경로"}</span>
          </div>
          {scanResult?.files && scanResult.files.length > 0 ? (
            <FileTreeNode node={fileTree} path="" />
          ) : (
            <div className="pl-6 text-text-muted text-xs p-2">스캔된 파일이 없습니다.</div>
          )}
        </div>'''
content = tree_html_regex.sub(tree_html_new, content)

# 5. Update Donut Chart
content = content.replace('<span className="font-code-mono font-bold text-text-primary">24.6%</span>', '<span className="font-code-mono font-bold text-text-primary">{getPct(formatCounts.DOCX).toFixed(1)}%</span>')
content = content.replace('<span className="font-code-mono font-bold text-text-primary">21.9%</span>', '<span className="font-code-mono font-bold text-text-primary">{getPct(formatCounts.PPTX).toFixed(1)}%</span>')
content = content.replace('<span className="font-code-mono font-bold text-text-primary">16.1%</span>', '<span className="font-code-mono font-bold text-text-primary">{getPct(formatCounts.HWP).toFixed(1)}%</span>')
content = content.replace('<span className="font-code-mono font-bold text-text-primary">8.2%</span>', '<span className="font-code-mono font-bold text-text-primary">{getPct(formatCounts.PDF).toFixed(1)}%</span>')

# 6. Replace static table rows with dynamic filtering mapping
table_tbody_regex = re.compile(r'<tbody className="font-body-dense text-body-dense">.*?</tbody>', re.DOTALL)
table_tbody_new = '''<tbody className="font-body-dense text-body-dense">
                  {scanResult?.files?.filter((file: any) => {
                    if (!selectedFormat) return true;
                    const ext = file.extension?.toLowerCase() || '';
                    if (selectedFormat === 'PPTX') return ['ppt', 'pptx'].includes(ext);
                    if (selectedFormat === 'XLSX') return ['xls', 'xlsx'].includes(ext);
                    if (selectedFormat === 'DOCX') return ['doc', 'docx'].includes(ext);
                    if (selectedFormat === 'HWP') return ['hwp', 'hwpx'].includes(ext);
                    if (selectedFormat === 'PDF') return ext === 'pdf';
                    return false;
                  })?.map((file: any, index: number) => {
                    const ext = file.extension?.toLowerCase() || '';
                    let formatClass = 'bg-surface-container text-text-secondary';
                    if (['ppt', 'pptx'].includes(ext)) formatClass = 'bg-format-pptx-bg text-format-pptx-text border-format-pptx-border';
                    else if (['xls', 'xlsx'].includes(ext)) formatClass = 'bg-format-xlsx-bg text-format-xlsx-text border-format-xlsx-border';
                    else if (['doc', 'docx'].includes(ext)) formatClass = 'bg-format-docx-bg text-format-docx-text border-format-docx-border';
                    else if (['hwp', 'hwpx'].includes(ext)) formatClass = 'bg-format-hwp-bg text-format-hwp-text border-format-hwp-border';
                    else if (ext === 'pdf') formatClass = 'bg-format-pdf-bg text-format-pdf-text border-format-pdf-border';
                    
                    return (
                    <tr key={index} className="hover:bg-surface-canvas transition-colors border-b border-surface-container-highest last:border-0">
                      <td className="py-2 px-space-sm">
                        <span className={`px-space-xs py-0.5 rounded font-badge-label text-badge-label font-bold border ${formatClass}`}>
                          {file.extension?.toUpperCase() || file.file_name.split('.').pop()?.toUpperCase() || 'FILE'}
                        </span>
                      </td>
                      <td className="py-2 px-space-sm font-body-semibold text-text-primary truncate max-w-[150px]" title={file.file_name}>
                        {file.file_name}
                      </td>
                      <td className="py-2 px-space-sm text-text-muted font-code-mono text-code-mono hidden md:table-cell truncate max-w-[100px]" title={file.file_path}>
                        {file.file_path}
                      </td>
                      <td className="py-2 px-space-sm font-code-mono text-code-mono">{formatSizeString(file.size || 0)}</td>
                      <td className="py-2 px-space-sm text-text-muted hidden sm:table-cell">방금 전</td>
                      <td className="py-2 px-space-sm">
                        <span className="inline-flex items-center gap-1 text-[11px] text-diff-added-text font-medium"><span className="w-1.5 h-1.5 rounded-full bg-diff-added-text"></span>감지됨</span>
                      </td>
                      <td className="py-2 px-space-sm text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1 rounded hover:bg-surface-container text-secondary" title="탐색 열기" type="button"><span className="material-symbols-outlined text-[16px]">manage_search</span></button>
                          <button className="p-1 rounded hover:bg-surface-container text-text-secondary" title="병합 추가" type="button"><span className="material-symbols-outlined text-[16px]">merge_type</span></button>
                        </div>
                      </td>
                    </tr>
                  )})}
                  {!scanResult?.files && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-text-muted">스캔을 시작하여 폴더의 파일을 불러오세요.</td>
                    </tr>
                  )}
                </tbody>'''
content = table_tbody_regex.sub(table_tbody_new, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied massive refactoring via build_dir_screen.py")
