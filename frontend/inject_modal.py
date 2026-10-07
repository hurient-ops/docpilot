import os
import re

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add import
if 'FolderPickerModal' not in content:
    content = content.replace("import { api } from '../../../api';", "import { api } from '../../../api';\nimport { FolderPickerModal } from '../FolderPickerModal';")

# Add state
if 'isFolderPickerOpen' not in content:
    state_block = '  const [loading, setLoading] = useState(false);\n  const [isFolderPickerOpen, setIsFolderPickerOpen] = useState(false);'
    content = content.replace('  const [loading, setLoading] = useState(false);', state_block)

# Replace the native Tauri dialog and input type='file' with our custom modal logic
old_btn = 'onClick={handleFolderSelect} className="h-8 px-space-md rounded-lg bg-surface-container'
new_btn = 'onClick={() => setIsFolderPickerOpen(true)} className="h-8 px-space-md rounded-lg bg-surface-container'
content = content.replace(old_btn, new_btn)

# Remove the old invisible file input
old_input = '''<input type="file" id="folder-picker" style={{display: 'none'}} 
  ref={(input) => {
    if (input) {
      input.setAttribute('webkitdirectory', 'true');
      input.setAttribute('directory', 'true');
    }
  }}
  onChange={(e) => {
    if (e.target.files && e.target.files.length > 0) {
      const path = e.target.files[0].webkitRelativePath.split('/')[0] || e.target.files[0].name;
      setScanPath(path);
    }
  }} 
/>'''
content = content.replace(old_input, '')

# Add the modal component at the end of the return statement (before </>)
modal_component = '''
      <FolderPickerModal 
        isOpen={isFolderPickerOpen} 
        onClose={() => setIsFolderPickerOpen(false)} 
        onSelect={(path) => setScanPath(path)} 
        initialPath={scanPath || ""}
      />
'''
if '<FolderPickerModal' not in content:
    content = content.replace('</>\n  );\n};', modal_component + '</>\n  );\n};')
    # If the end is just `    </>\n  );\n}`
    content = content.replace('</>\n  );\n}', modal_component + '</>\n  );\n}')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('DirectoryScreen updated with FolderPickerModal')
