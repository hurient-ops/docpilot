import os
import re

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the top imports
content = content.replace("import React from 'react';", "import React, { useState } from 'react';\nimport { api } from '../../api';")

# Insert state at the beginning of the function
state_code = """export default function DirectoryScreen() {
  const [scanPath, setScanPath] = useState('e:/projects/docpilot/doc');
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const handleScan = async () => {
    setLoading(true);
    try {
      const res = await api.scanDirectory(scanPath);
      setScanResult(res.stats);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };
"""
content = content.replace("export default function DirectoryScreen() {", state_code)

# Replace the specific input value and button onclick using regex
# 1. Input
content = re.sub(
    r'<input className="w-full bg-transparent font-code-mono text-code-mono text-text-primary focus:outline-none" type="text" value="[^"]*"\s*/>',
    r'<input className="w-full bg-transparent font-code-mono text-code-mono text-text-primary focus:outline-none" type="text" value={scanPath} onChange={(e) => setScanPath(e.target.value)} />',
    content
)

# 2. Button 
content = re.sub(
    r'<button className="h-8 px-space-md rounded-lg bg-primary-container text-on-primary font-body-semibold text-body-semibold hover:bg-primary transition-colors flex items-center gap-1 shrink-0" type="button">\s*<span className="material-symbols-outlined text-\[16px\]">sync</span>\s*<span>스캔 시작</span>\s*</button>',
    r'<button onClick={handleScan} disabled={loading} className="h-8 px-space-md rounded-lg bg-primary-container text-on-primary font-body-semibold text-body-semibold hover:bg-primary transition-colors flex items-center gap-1 shrink-0" type="button">\n<span className="material-symbols-outlined text-[16px]">sync</span>\n<span>{loading ? "스캔 중..." : "스캔 시작"}</span>\n</button>',
    content
)

# 3. Add a tiny result box below the input if there's a result
content = content.replace(
    '</button></div></div><div className="flex flex-col">',
    '</button></div>{scanResult && <div className="mt-2 text-sm text-green-500">스캔 완료: 신규 {scanResult.added}, 업데이트 {scanResult.updated}, 스킵 {scanResult.skipped}</div>}</div><div className="flex flex-col">'
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated DirectoryScreen.tsx")
