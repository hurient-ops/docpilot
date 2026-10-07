import re
import os

html_path = r'e:\projects\docpilot\Docpilot_Light_Screens\1_목차 기반 추출 바이너리 재조합 & PDF 워크스페이스.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'tailwind\.config\s*=\s*(\{[\s\S]*?\});', content)
if match:
    config_obj = match.group(1)
    
    # Write as ES module export for Vite
    tailwind_js = f"""/** @type {{import('tailwindcss').Config}} */
export default {{
  content: [
    "./index.html",
    "./src/**/*.{{js,ts,jsx,tsx}}",
  ],
  darkMode: 'class',
  theme: {config_obj}.theme,
  plugins: [],
}}
"""
    with open(r'e:\projects\docpilot\frontend\tailwind.config.js', 'w', encoding='utf-8') as out:
        out.write(tailwind_js)
    print("Extracted tailwind config successfully.")
else:
    print("Could not find tailwind.config in the HTML.")
