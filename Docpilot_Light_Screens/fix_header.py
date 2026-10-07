import os
import re

folder = r'e:/projects/docpilot/Docpilot_Light_Screens'
files = [f for f in os.listdir(folder) if f.endswith('.html')]

# Map file prefix to data-path
active_map = {
    '1': 'merger',
    '2': 'search',
    '3': 'security',
    '4': 'compare',
    '5': 'directory',
    '6': 'media',
    '7': 'history',
    '8': 'directory'
}

local_ai_new = '''
<!-- Floating Local AI Badge -->
<div class="fixed top-14 right-4 z-40 flex items-center rounded-lg bg-status-local-bg px-space-sm py-1.5 border border-status-local-text/30 shadow-md cursor-pointer hover:bg-surface-container transition-colors backdrop-blur-sm">
    <span class="w-2.5 h-2.5 rounded-full bg-status-local-text mr-2 animate-pulse"></span>
    <span class="font-caption text-caption font-semibold text-status-local-text">로컬 AI [NPU 가속 Standard]</span>
    <span class="material-symbols-outlined text-[16px] text-status-local-text ml-1">arrow_drop_down</span>
</div>
'''

default_a_class = 'px-space-md py-1.5 rounded-lg font-body-default text-body-default text-text-secondary hover:text-on-surface hover:bg-surface-container transition-colors whitespace-nowrap'
active_a_class = 'px-space-md py-1.5 rounded-lg transition-colors whitespace-nowrap bg-primary text-on-primary font-body-semibold shadow-sm'

for file in files:
    path = os.path.join(folder, file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove Local AI badge from original position
    # The badge might be slightly different in each file
    local_ai_pattern = re.compile(r'<div[^>]*>[\s\S]*?로컬 AI[\s\S]*?</div>')
    
    # Check if we already injected the floating one
    if '<!-- Floating Local AI Badge -->' not in content:
        # Find all divs containing '로컬 AI'
        matches = local_ai_pattern.findall(content)
        for match in matches:
            if 'arrow_drop_down' in match or 'expand_more' in match or 'NPU 가속' in match:
                content = content.replace(match, '')
        
        # Inject just after </header>
        content = content.replace('</header>', f'</header>\n{local_ai_new}')

    # 2. Normalize and set active nav menu
    file_prefix = file[0]
    active_data_path = active_map.get(file_prefix)

    if active_data_path:
        nav_match = re.search(r'<nav[^>]*>([\s\S]*?)</nav>', content)
        if nav_match:
            nav_inner = nav_match.group(1)
            new_nav_inner = nav_inner
            
            # Reset all <a> tags inside nav
            a_tags = re.findall(r'<a[\s\S]*?</a>', nav_inner)
            for a_tag in a_tags:
                # Remove aria-current
                clean_a = re.sub(r'\s*aria-current="[^"]*"', '', a_tag)
                
                # Check data-path
                dp_match = re.search(r'data-path="([^"]+)"', clean_a)
                if dp_match:
                    dp = dp_match.group(1)
                    if dp == active_data_path:
                        # Set active class
                        clean_a = re.sub(r'class="[^"]*"', f'class="{active_a_class}"', clean_a)
                        clean_a = clean_a.replace('<a ', '<a aria-current="page" ')
                    else:
                        # Set default class
                        clean_a = re.sub(r'class="[^"]*"', f'class="{default_a_class}"', clean_a)
                        
                    new_nav_inner = new_nav_inner.replace(a_tag, clean_a)
            
            content = content.replace(nav_inner, new_nav_inner)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Done updating header and nav.")
