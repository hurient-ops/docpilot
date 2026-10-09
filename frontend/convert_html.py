import re
from bs4 import BeautifulSoup

def html_to_jsx(html_str):
    # Very basic HTML to JSX conversion
    jsx = html_str.replace('class=', 'className=')
    jsx = jsx.replace('for=', 'htmlFor=')
    # Fix self-closing tags
    jsx = re.sub(r'<img([^>]+?)(?<!/)>', r'<img\1/>', jsx)
    jsx = re.sub(r'<input([^>]+?)(?<!/)>', r'<input\1/>', jsx)
    jsx = re.sub(r'<br([^>]*?)(?<!/)>', r'<br\1/>', jsx)
    jsx = re.sub(r'<hr([^>]*?)(?<!/)>', r'<hr\1/>', jsx)
    return jsx

html_file = r"e:\projects\docpilot\Docpilot_Light_Screens\5_MS 오피스 & 한글 내장 In-App 플러그인.html"
with open(html_file, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

main_content = soup.find('main')
if not main_content:
    print("Could not find main tag")
    exit(1)

# Extract the inner HTML of main
main_html = "".join(str(child) for child in main_content.children)

# We notice the script logic, we should probably manually craft the component for the dynamic parts.
# To avoid complexity, I'll generate a base TSX and then use multi_replace to fix the state.
jsx_str = html_to_jsx(main_html)

# We need to wrap it in a React component
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

print("AddInScreen.tsx updated with HTML content")
