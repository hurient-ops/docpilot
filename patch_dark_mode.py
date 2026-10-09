import re
import os

file_path = r'e:\projects\docpilot\frontend\src\components\Header.tsx'
if not os.path.exists(file_path):
    print('File not found')
else:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace React import to include useState and useEffect
    if 'import React from \'react\';' in content:
        content = content.replace("import React from 'react';", "import React, { useState, useEffect } from 'react';")

    # Add state to Header component
    state_code = """export default function Header({ currentPath, onNavigate }: { currentPath: string, onNavigate: (path: string) => void }) {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  
  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };"""
    content = content.replace("export default function Header({ currentPath, onNavigate }: { currentPath: string, onNavigate: (path: string) => void }) {", state_code)

    # Replace dark mode button
    old_button = """<button onClick={() => document.documentElement.classList.toggle('dark')} className="p-1.5 rounded hover:bg-surface-container text-text-secondary hover:text-text-primary transition-colors ml-2" title="Toggle Dark Mode">
<span className="material-symbols-outlined text-[18px]">dark_mode</span>
</button>"""

    new_button = """<button onClick={toggleDark} className="w-7 h-7 rounded flex items-center justify-center text-text-secondary hover:bg-surface-container hover:text-on-surface transition-colors" type="button" title="Toggle Dark Mode">
<span className="material-symbols-outlined text-[18px]">{isDark ? 'light_mode' : 'dark_mode'}</span>
</button>"""

    content = content.replace(old_button, new_button)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Done")
