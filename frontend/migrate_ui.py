import os
import re

html_file = r'e:\projects\docpilot\Docpilot_Light_Screens\1_목차 기반 추출 바이너리 재조합 & PDF 워크스페이스.html'

def html_to_jsx(html: str) -> str:
    # 1. class -> className
    jsx = re.sub(r'\bclass=', 'className=', html)
    # 2. for -> htmlFor
    jsx = re.sub(r'\bfor=', 'htmlFor=', jsx)
    # 3. self-close img, input, hr, br
    jsx = re.sub(r'(<(img|input|hr|br)[^>]*?)(?<!/)>', r'\1 />', jsx)
    # 4. remove comments
    jsx = re.sub(r'<!--[\s\S]*?-->', '', jsx)
    # 5. style="..." to style={{...}} (simple approximation, stripping styles is safer)
    jsx = re.sub(r'style="[^"]*"', '', jsx)
    # 6. onclick -> onClick (very crude)
    jsx = re.sub(r'onclick="[^"]*"', '', jsx)
    return jsx

with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract parts
header_match = re.search(r'<header[^>]*>[\s\S]*?</header>', content)
sidebar_match = re.search(r'<aside[^>]*>[\s\S]*?</aside>', content)
badge_match = re.search(r'<div[^>]*>[\s\S]*?로컬 AI[\s\S]*?</div>', content) # We moved this into nav actually, but it's okay

header_jsx = html_to_jsx(header_match.group(0)) if header_match else "<div>Header</div>"
sidebar_jsx = html_to_jsx(sidebar_match.group(0)) if sidebar_match else "<div>Sidebar</div>"

# Generate React components
components_dir = r'e:\projects\docpilot\frontend\src\components'
os.makedirs(components_dir, exist_ok=True)

header_code = f"""import React from 'react';

export default function Header() {{
  return (
    {header_jsx}
  );
}}
"""

sidebar_code = f"""import React from 'react';

export default function Sidebar() {{
  return (
    {sidebar_jsx}
  );
}}
"""

layout_code = """import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface-canvas font-body-default text-body-default text-text-primary antialiased min-h-screen">
      <Header />
      <div className="w-full flex">
        <Sidebar />
        <div className="w-full pl-64 pb-7">
          <main className="w-full pt-12 min-h-screen bg-surface-canvas flex flex-col">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
"""

with open(os.path.join(components_dir, 'Header.tsx'), 'w', encoding='utf-8') as f:
    f.write(header_code)

with open(os.path.join(components_dir, 'Sidebar.tsx'), 'w', encoding='utf-8') as f:
    f.write(sidebar_code)

with open(os.path.join(components_dir, 'Layout.tsx'), 'w', encoding='utf-8') as f:
    f.write(layout_code)

# Update App.tsx
app_code = """import React from 'react';
import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl text-primary font-bold">DocPilot Workspace</h1>
        <p className="text-text-secondary mt-4">Welcome to the integrated document automation platform.</p>
      </div>
    </Layout>
  );
}

export default App;
"""
with open(r'e:\projects\docpilot\frontend\src\App.tsx', 'w', encoding='utf-8') as f:
    f.write(app_code)

print("React components successfully generated.")
