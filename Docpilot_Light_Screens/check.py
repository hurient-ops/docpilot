import os
import re

folder = r'e:/projects/docpilot/Docpilot_Light_Screens'
files = [f for f in os.listdir(folder) if f.endswith('.html')]

for file in files:
    path = os.path.join(folder, file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check nav active element
    nav_match = re.search(r'<nav[^>]*>(.*?)</nav>', content, re.DOTALL)
    if nav_match:
        nav_html = nav_match.group(1)
        active_match = re.search(r'<a[^>]+(?:aria-current|bg-primary|bg-surface-container text-primary)[^>]*>(.*?)</a>', nav_html)
        active_menu = active_match.group(1) if active_match else "NONE"
        print(f'{file}: active menu -> {active_menu}')
        
        # Check Local AI badge
        local_ai_match = re.search(r'<div[^>]*>[\s\S]*?로컬 AI[\s\S]*?</div>', content)
        if local_ai_match:
            print(f'  Found Local AI badge')
        else:
            print(f'  No Local AI badge found')
