import re
import os

html_file = r'e:\projects\docpilot\Docpilot_Light_Screens\1_목차 기반 추출 바이너리 재조합 & PDF 워크스페이스.html'

with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the style block
style_match = re.search(r'<style>([\s\S]*?)</style>', content)
if style_match:
    style_content = style_match.group(1)
    
    css = f"""@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {{
{style_content}
}}
"""
    with open(r'e:\projects\docpilot\frontend\src\index.css', 'w', encoding='utf-8') as out:
        out.write(css)
    print("Extracted index.css successfully.")
else:
    print("Style block not found.")
