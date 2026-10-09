import sys

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "setDrives(['C:\\', 'D:\\', 'E:\\']);" in line:
        lines[i] = "    setDrives(['C:\\\\', 'D:\\\\', 'E:\\\\']);\n"
    if "const normScanPath = scanPath.replace(/\\/g, '/').replace(/\\/$/, '');" in line:
        lines[i] = "    const normScanPath = scanPath.replace(/\\\\\\\\/g, '/').replace(/\\\\\\\\/$/, '');\n"
    if "const normFilePath = filePath.replace(/\\/g, '/');" in line:
        lines[i] = "      const normFilePath = filePath.replace(/\\\\\\\\/g, '/');\n"

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)
print("Syntax fixed.")
