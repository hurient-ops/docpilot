import sys

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("const ext = file.extension?.toLowerCase() || '';", "const ext = (file.extension || file.file_name?.split('.').pop() || '').toLowerCase();")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Extensions parsing fixed in table.")
