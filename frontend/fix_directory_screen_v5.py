import os
import re

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix drag and drop for scanPath input
old_input = r'<input type="text" value=\{scanPath\} onChange=\{\(e\) => setScanPath\(e.target.value\)\} placeholder="디렉토리 경로를 입력하세요 \(예: C:\\Projects\\...\)" className="flex-1 bg-transparent text-body-default outline-none text-text-primary px-space-sm" />'
new_input = """<input 
  type="text" 
  value={scanPath} 
  onChange={(e) => setScanPath(e.target.value)} 
  onDrop={(e) => { e.preventDefault(); const p = e.dataTransfer.getData('text/plain'); if (p) setScanPath(p); }}
  onDragOver={(e) => e.preventDefault()}
  placeholder="폴더를 이곳에 드래그 앤 드롭하거나 경로를 입력하세요" 
  className="flex-1 bg-transparent text-body-default outline-none text-text-primary px-space-sm" 
/>"""
content = re.sub(old_input, new_input, content, flags=re.MULTILINE)

# 2. Fix the counter in format filter to be BOLD
old_counter = r'<span className="bg-surface-card px-1 rounded-full text-\[9px\] text-primary-fixed">\{scanResult\?\.files\?\.length \|\| 0\}</span>'
new_counter = '<span className="bg-primary-container px-2 py-0.5 rounded-full text-[12px] font-bold text-primary-fixed ml-2">{scanResult?.files?.length || 0}</span>'
content = content.replace(old_counter, new_counter)

# 3. Add explicit variable definitions for size/formats before the return
# The return statement is: return ( <div className="h-full flex flex-col p-space-md gap-space-md">
# We will insert code right before `return (`
code_injection = """
  const formatCounts = { PPTX: 0, XLSX: 0, DOCX: 0, HWP: 0, PDF: 0 };
  (scanResult?.files || []).forEach((f: any) => {
    const ext = (f.extension || f.file_name?.split('.').pop() || '').toUpperCase();
    if (ext === 'PPT' || ext === 'PPTX') formatCounts.PPTX++;
    else if (ext === 'XLS' || ext === 'XLSX') formatCounts.XLSX++;
    else if (ext === 'DOC' || ext === 'DOCX') formatCounts.DOCX++;
    else if (ext === 'HWP' || ext === 'HWPX') formatCounts.HWP++;
    else if (ext === 'PDF') formatCounts.PDF++;
  });
  const totalFormats = Object.values(formatCounts).reduce((a, b) => a + b, 0);

  let currentOffset = 0;
  const segments = Object.entries(formatCounts).map(([key, count]) => {
     const percentage = totalFormats > 0 ? (count / totalFormats) * 100 : 0;
     const segment = { key, percentage, offset: currentOffset };
     currentOffset += percentage;
     return segment;
  });

  const totalSize = scanResult?.files?.reduce((acc: number, f: any) => acc + (f.size || 0), 0) || 0;
  const totalSizeStr = totalSize > 1024*1024*1024 ? (totalSize/(1024*1024*1024)).toFixed(1) + ' GB' : (totalSize/(1024*1024)).toFixed(1) + ' MB';
"""
content = re.sub(r'(\s+)return \(\s*<div className="h-full flex flex-col', lambda m: m.group(1) + code_injection.strip() + '\n' + m.group(1) + 'return (<div className="h-full flex flex-col', content)
# Simple replacement if regex fails due to groups:
if 'const totalSizeStr =' not in content:
    content = content.replace('  return (\n    <div className="h-full flex', code_injection + '\n  return (\n    <div className="h-full flex')

# 4. Replace sizes and dynamic values
content = content.replace('{(() => { let s=0; scanResult?.files?.forEach((f:any)=>s+=(f.size||0)); return s>1024*1024*1024 ? (s/(1024*1024*1024)).toFixed(1) : (s/(1024*1024)).toFixed(1); })()}', '{totalSizeStr}')

# 5. Fix the Donut Chart SVG
old_svg = r'<svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">.*?</svg>'
new_svg = """<svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E2E8F0" strokeWidth="4" />
  {segments.map((seg) => (
     seg.percentage > 0 && (
       <path key={seg.key} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
             fill="none" strokeWidth="4" 
             stroke={seg.key === 'PPTX' ? '#F97316' : seg.key === 'XLSX' ? '#22C55E' : seg.key === 'DOCX' ? '#3B82F6' : seg.key === 'HWP' ? '#0EA5E9' : '#EF4444'} 
             strokeDasharray={`${seg.percentage} ${100 - seg.percentage}`} 
             strokeDashoffset={100 - seg.offset} />
     )
  ))}
</svg>"""
content = re.sub(old_svg, new_svg, content, flags=re.DOTALL)

# 6. Fix buildTree
old_buildtree = r'const buildTree = \(\) => \{.*?return root;\s*\};'
new_buildtree = """const buildTree = () => {
    const root: any = { folders: {}, files: [] };
    if (!scanResult?.files) return root;
    let normScanPath = scanPath.replace(/\\\\/g, '/').toLowerCase();
    if (normScanPath.endsWith('/')) normScanPath = normScanPath.slice(0, -1);
    
    scanResult.files.forEach((file: any) => {
      const filePath = file.file_path || file.name || "";
      if (!filePath || !scanPath) {
        root.files.push(file);
        return;
      }
      const normFilePath = filePath.replace(/\\\\/g, '/');
      const lowerFilePath = normFilePath.toLowerCase();
      let relPath = normFilePath;
      
      if (lowerFilePath.startsWith(normScanPath)) {
         relPath = normFilePath.substring(normScanPath.length);
      }
      if (relPath.startsWith('/')) relPath = relPath.substring(1);
      
      const parts = relPath.split('/');
      let current = root;
      // The last part is the file itself
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
  };"""
content = re.sub(old_buildtree, new_buildtree, content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied advanced fixes to DirectoryScreen.tsx")
