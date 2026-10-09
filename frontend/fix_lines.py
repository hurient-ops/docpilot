import sys

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

lines[40] = '      if (relPath.startsWith("\\\\") || relPath.startsWith("/")) relPath = relPath.substring(1);\n'
lines[41] = '      const parts = relPath.split(/[\\\\/]/);\n'

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)
print("Fixed lines 40 and 41")
