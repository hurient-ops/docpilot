import re
import os

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. State Persistence
# Remove the old scanPath and scanResult
content = re.sub(r'const \[scanPath, setScanPath\] = useState\([^)]*\);\n', '', content)
content = re.sub(r'const \[scanResult, setScanResult\] = useState<any>\([^)]*\);\n', '', content)

# Inject new state right after export default function DirectoryScreen() {
state_code = '''
  const [scanPathState, setScanPathState] = useState(() => sessionStorage.getItem('docpilot_scanPath') || 'e:/projects/docpilot/doc');
  const [scanResultState, setScanResultState] = useState<any>(() => {
    const saved = sessionStorage.getItem('docpilot_scanResult');
    try { return saved ? JSON.parse(saved) : null; } catch { return null; }
  });
  const scanPath = scanPathState;
  const scanResult = scanResultState;
  const setScanPath = (p: string) => { setScanPathState(p); sessionStorage.setItem('docpilot_scanPath', p); };
  const setScanResult = (r: any) => { setScanResultState(r); if(r) sessionStorage.setItem('docpilot_scanResult', JSON.stringify(r)); else sessionStorage.removeItem('docpilot_scanResult'); };
  
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  // Tree Node Component for Recursive Rendering
  const FileTreeNode = ({ node, path }: { node: any, path: string }) => {
    const isRoot = path === "";
    const isExpanded = isRoot || expandedFolders[path] !== true; // undefined means expanded by default, true means collapsed
    const hasChildren = Object.keys(node.folders).length > 0 || node.files.length > 0;
    
    return (
      <div className={`flex flex-col gap-1 ${!isRoot ? 'pl-4' : ''}`}>
        {!isRoot && (
          <div 
            onClick={() => toggleFolder(path)}
            className="flex items-center gap-1.5 p-1 text-text-primary font-semibold hover:bg-surface-container cursor-pointer rounded"
          >
            <span className="material-symbols-outlined text-[16px] text-text-secondary">
              {hasChildren ? (isExpanded ? "arrow_drop_down" : "arrow_right") : "horizontal_rule"}
            </span>
            <span className="material-symbols-outlined text-[16px] text-secondary">
              {isExpanded ? "folder_open" : "folder"}
            </span>
            <span className="truncate">{path.split('/').pop()}</span>
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

content = content.replace('export default function DirectoryScreen() {', 'export default function DirectoryScreen() {\n' + state_code)

# 2. Build Tree Data Structure
tree_build_logic = '''
  // Build Tree Data
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
'''

content = content.replace('const formatCounts = {', tree_build_logic + '\n  const formatCounts = {')

# 3. Replace Tree Rendering in JSX
tree_render_regex = re.compile(r'\{\s*scanResult\?\.files && scanResult\.files\.length > 0 \? \(\s*Object\.entries\([\s\S]*?\)\.map\([\s\S]*?\);\s*\}\)\s*\) : \(', re.DOTALL)
new_tree_render = '''{scanResult?.files && scanResult.files.length > 0 ? (
          <FileTreeNode node={fileTree} path="" />
        ) : ('''
content = tree_render_regex.sub(new_tree_render, content)

# 4. Filter logic & clickable badges
# Add toggle function inline for badges
content = content.replace(
    '<button className="px-space-sm py-0.5 rounded-full bg-format-pptx-bg',
    '<button onClick={() => setSelectedFormat(selectedFormat === "PPTX" ? null : "PPTX")} className={`px-space-sm py-0.5 rounded-full bg-format-pptx-bg ${selectedFormat === "PPTX" ? "ring-2 ring-primary" : ""}'
)
content = content.replace(
    '<button className="px-space-sm py-0.5 rounded-full bg-format-xlsx-bg',
    '<button onClick={() => setSelectedFormat(selectedFormat === "XLSX" ? null : "XLSX")} className={`px-space-sm py-0.5 rounded-full bg-format-xlsx-bg ${selectedFormat === "XLSX" ? "ring-2 ring-primary" : ""}'
)
content = content.replace(
    '<button className="px-space-sm py-0.5 rounded-full bg-format-docx-bg',
    '<button onClick={() => setSelectedFormat(selectedFormat === "DOCX" ? null : "DOCX")} className={`px-space-sm py-0.5 rounded-full bg-format-docx-bg ${selectedFormat === "DOCX" ? "ring-2 ring-primary" : ""}'
)
content = content.replace(
    '<button className="px-space-sm py-0.5 rounded-full bg-format-hwp-bg',
    '<button onClick={() => setSelectedFormat(selectedFormat === "HWP" ? null : "HWP")} className={`px-space-sm py-0.5 rounded-full bg-format-hwp-bg ${selectedFormat === "HWP" ? "ring-2 ring-primary" : ""}'
)
content = content.replace(
    '<button className="px-space-sm py-0.5 rounded-full bg-format-pdf-bg',
    '<button onClick={() => setSelectedFormat(selectedFormat === "PDF" ? null : "PDF")} className={`px-space-sm py-0.5 rounded-full bg-format-pdf-bg ${selectedFormat === "PDF" ? "ring-2 ring-primary" : ""}'
)

# 5. Filter Table rows
# Add filtering before map
table_render_regex = re.compile(r'\{scanResult\?\.files\?\.map\(\(file: any, index: number\) => \(')
filtered_table_render = '''{scanResult?.files
    ?.filter((file: any) => {
      if (!selectedFormat) return true;
      const ext = file.extension?.toLowerCase() || '';
      if (selectedFormat === 'PPTX') return ['ppt', 'pptx'].includes(ext);
      if (selectedFormat === 'XLSX') return ['xls', 'xlsx'].includes(ext);
      if (selectedFormat === 'DOCX') return ['doc', 'docx'].includes(ext);
      if (selectedFormat === 'HWP') return ['hwp', 'hwpx'].includes(ext);
      if (selectedFormat === 'PDF') return ext === 'pdf';
      return false;
    })
    ?.map((file: any, index: number) => {
      const ext = file.extension?.toLowerCase() || '';
      let formatClass = 'bg-surface-container text-text-secondary';
      if (['ppt', 'pptx'].includes(ext)) formatClass = 'bg-format-pptx-bg text-format-pptx-text';
      else if (['xls', 'xlsx'].includes(ext)) formatClass = 'bg-format-xlsx-bg text-format-xlsx-text';
      else if (['doc', 'docx'].includes(ext)) formatClass = 'bg-format-docx-bg text-format-docx-text';
      else if (['hwp', 'hwpx'].includes(ext)) formatClass = 'bg-format-hwp-bg text-format-hwp-text';
      else if (ext === 'pdf') formatClass = 'bg-format-pdf-bg text-format-pdf-text';
      
      return ('''
content = table_render_regex.sub(filtered_table_render, content)

# Modify the span in the table for format
span_regex = re.compile(r'<span className="px-space-xs py-0\.5 rounded font-badge-label text-badge-label font-bold bg-format-pptx-bg text-format-pptx-text">\s*\{file\.file_name\.split\(\'\.\'\)\.pop\(\)\?\.toUpperCase\(\) \|\| \'FILE\'\}\s*</span>')
new_span = '<span className={`px-space-xs py-0.5 rounded font-badge-label text-badge-label font-bold ${formatClass}`}>{file.extension?.toUpperCase() || file.file_name.split(".").pop()?.toUpperCase() || "FILE"}</span>'
content = span_regex.sub(new_span, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Refactored DirectoryScreen")
