import re

html_file = r'e:\projects\docpilot\Docpilot_Light_Screens\1_목차 기반 추출 바이너리 재조합 & PDF 워크스페이스.html'
out_file = r'e:\projects\docpilot\frontend\src\index.css'

with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

styles = re.findall(r'<style>([\s\S]*?)</style>', content)

with open(out_file, 'w', encoding='utf-8') as f:
    f.write('@import "tailwindcss";\n@config "../tailwind.config.js";\n\n')
    f.write('@layer base {\n')
    for style in styles:
        f.write(style + '\n')
    f.write('}\n')
