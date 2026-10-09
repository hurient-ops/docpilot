import sys

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "const normScanPath = scanPath.replace" in line:
        lines[i] = "    let normScanPath = scanPath.replace(/\\\\\\\\/g, '/');\n    if (normScanPath.endsWith('/')) normScanPath = normScanPath.slice(0, -1);\n"
    if "const normFilePath = filePath.replace(" in line:
        lines[i] = "      const normFilePath = filePath.replace(/\\\\\\\\/g, '/');\n"
        
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)
