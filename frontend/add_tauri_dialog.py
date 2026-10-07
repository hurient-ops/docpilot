import os

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add import for Tauri dialog
if '@tauri-apps/plugin-dialog' not in content:
    content = content.replace('import React', 'import { open } from \'@tauri-apps/plugin-dialog\';\nimport React')

# 2. Add handleFolderSelect function
func = """
  const handleFolderSelect = async () => {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
      });
      if (selected) {
        setScanPath(selected as string);
      }
    } catch (e) {
      console.error("Tauri API not available", e);
      document.getElementById('folder-picker')?.click();
    }
  };
"""
if 'handleFolderSelect' not in content:
    content = content.replace('const handleScan =', func + '\n  const handleScan =')

# 3. Change button onClick
content = content.replace("onClick={() => document.getElementById('folder-picker')?.click()}", "onClick={handleFolderSelect}")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated DirectoryScreen with Tauri dialog')
