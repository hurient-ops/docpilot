import re
import os

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Inject calculation logic right before return statement inside DirectoryScreen component
calc_logic = """
  // Format counts calculation
  const formatCounts = {
    PPTX: 0,
    XLSX: 0,
    DOCX: 0,
    HWP: 0,
    PDF: 0,
  };
  let totalSize = 0;

  if (scanResult?.files) {
    scanResult.files.forEach(file => {
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
  
  // Calculate percentages for donut chart
  const getPct = (count: number) => totalFiles > 0 ? (count / totalFiles) * 100 : 0;
  
  // Dash array offset calculation for SVG circles (circumference = 2 * PI * r = ~88)
  // Let's use simplified 100 based strokeDasharray trick with pathLength="100"
"""

# We need to insert this before `return (`
content = re.sub(r'(\s*)(return \(\s*<>)', r'\1' + calc_logic + r'\n\2', content)

# 2. Update the format badges
# We replaced them with '0' earlier. Let's find those badges.
content = re.sub(r'<span className="bg-surface-card px-1 rounded-full text-\[9px\]">0</span>', r'<span className="bg-surface-card px-1 rounded-full text-[9px]">{formatCounts.PPTX}</span>', content, count=1)
content = re.sub(r'<span className="bg-surface-card px-1 rounded-full text-\[9px\]">0</span>', r'<span className="bg-surface-card px-1 rounded-full text-[9px]">{formatCounts.XLSX}</span>', content, count=1)
content = re.sub(r'<span className="bg-surface-card px-1 rounded-full text-\[9px\]">0</span>', r'<span className="bg-surface-card px-1 rounded-full text-[9px]">{formatCounts.DOCX}</span>', content, count=1)
content = re.sub(r'<span className="bg-surface-card px-1 rounded-full text-\[9px\]">0</span>', r'<span className="bg-surface-card px-1 rounded-full text-[9px]">{formatCounts.HWP}</span>', content, count=1)
content = re.sub(r'<span className="bg-surface-card px-1 rounded-full text-\[9px\]">0</span>', r'<span className="bg-surface-card px-1 rounded-full text-[9px]">{formatCounts.PDF}</span>', content, count=1)
# Wait, the first one was 3,840 originally and then 0, but it might have a different class
content = re.sub(r'<span className="bg-primary-container px-1 rounded-full text-\[9px\] text-primary-fixed">0</span>', r'<span className="bg-primary-container px-1 rounded-full text-[9px] text-primary-fixed">{totalFiles}</span>', content)
content = re.sub(r'<span className="bg-primary-container px-1 rounded-full text-\[9px\] text-primary-fixed">\{scanResult\?\.files\?\.length \|\| 0\}</span>', r'<span className="bg-primary-container px-1 rounded-full text-[9px] text-primary-fixed">{totalFiles}</span>', content)

# 3. Update total data volume
content = re.sub(r'\{scanResult \? "0.1" : "0"\}', r'{formatSizeString(totalSize)}', content)
# Ensure totalFiles is used
content = content.replace('{scanResult?.files?.length || 0}', '{totalFiles}')

# 4. Update donut chart legend to use calculated percentages
legend_pattern = re.compile(r'<div className="flex flex-col justify-center gap-space-xs font-body-dense text-body-dense">.*?</div>', re.DOTALL)
legend_replacement = """<div className="flex flex-col justify-center gap-space-xs font-body-dense text-body-dense">
  {scanResult ? (
    <>
      <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-format-xlsx-text"></span><span className="text-text-secondary w-20">XLSX</span><span className="font-semibold text-text-primary">{getPct(formatCounts.XLSX).toFixed(1)}%</span></div>
      <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-format-docx-text"></span><span className="text-text-secondary w-20">DOCX</span><span className="font-semibold text-text-primary">{getPct(formatCounts.DOCX).toFixed(1)}%</span></div>
      <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-format-pptx-text"></span><span className="text-text-secondary w-20">PPTX</span><span className="font-semibold text-text-primary">{getPct(formatCounts.PPTX).toFixed(1)}%</span></div>
      <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-format-hwp-text"></span><span className="text-text-secondary w-20">HWP/HWPX</span><span className="font-semibold text-text-primary">{getPct(formatCounts.HWP).toFixed(1)}%</span></div>
      <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-format-pdf-text"></span><span className="text-text-secondary w-20">PDF</span><span className="font-semibold text-text-primary">{getPct(formatCounts.PDF).toFixed(1)}%</span></div>
    </>
  ) : (
    <div className="text-text-muted">데이터가 없습니다.</div>
  )}
</div>"""
content = legend_pattern.sub(legend_replacement, content, count=1)

# 5. Update Directory Tree (remove height restrictions)
# Find the directory tree container
content = content.replace('className="p-space-sm bg-surface-card rounded border border-surface-variant flex flex-col h-[300px]"', 'className="p-space-sm bg-surface-card rounded border border-surface-variant flex flex-col"')
content = content.replace('className="flex-1 overflow-y-auto pr-2"', 'className="flex-1 pr-2"')

# Write the changes
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated DirectoryScreen.tsx with calc logic")
