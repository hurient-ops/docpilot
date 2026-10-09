import re

html_file = r"e:\projects\docpilot\Docpilot_Light_Screens\5_MS 오피스 & 한글 내장 In-App 플러그인.html"
with open(html_file, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Extract content between <main> and </main> (or just inside the main flex div)
match = re.search(r'<div class="flex-1 flex overflow-hidden">(.*?)</div>\s*</main>', html_content, re.DOTALL)
if match:
    main_html = match.group(1)
else:
    match2 = re.search(r'<main[^>]*>(.*?)</main>', html_content, re.DOTALL)
    if match2:
        main_html = match2.group(1)
    else:
        main_html = html_content

def html_to_jsx(html_str):
    jsx = html_str.replace('class="', 'className="')
    jsx = jsx.replace('for="', 'htmlFor="')
    jsx = re.sub(r'<img([^>]+?)(?<!/)>', r'<img\1/>', jsx)
    jsx = re.sub(r'<input([^>]+?)(?<!/)>', r'<input\1/>', jsx)
    jsx = re.sub(r'<br([^>]*?)(?<!/)>', r'<br\1/>', jsx)
    jsx = re.sub(r'<hr([^>]*?)(?<!/)>', r'<hr\1/>', jsx)
    # Remove script tags
    jsx = re.sub(r'<script.*?</script>', '', jsx, flags=re.DOTALL)
    return jsx

jsx_str = html_to_jsx(main_html)

tsx_content = f"""import React, {{ useState, useEffect }} from 'react';

export default function AddInScreen() {{
  const [isInserted, setIsInserted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {{
    const handleKeyDown = (e: KeyboardEvent) => {{
      if (e.key === 'F2') {{
        e.preventDefault();
        setIsInserted(true);
      }}
    }};
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }}, []);

  const handleCopy = () => {{
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }};

  return (
    <div className="flex-1 flex overflow-hidden">
      {jsx_str}
    </div>
  );
}}
"""

with open(r"e:\projects\docpilot\frontend\src\components\screens\AddInScreen.tsx", 'w', encoding='utf-8') as f:
    f.write(tsx_content)

print("AddInScreen.tsx updated with regex HTML content")
