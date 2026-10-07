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

default_a_class = 'px-space-md py-1.5 rounded-lg font-body-default text-body-default text-text-secondary hover:text-on-surface hover:bg-surface-container transition-colors whitespace-nowrap'
active_a_class = 'px-space-md py-1.5 rounded-lg transition-colors whitespace-nowrap bg-primary text-on-primary font-body-semibold shadow-sm'

for file in files:
    path = os.path.join(folder, file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # The exact string that got deleted
    missing_header_html = '''<div class="h-12 w-full px-gutter flex items-center justify-between gap-space-md"><div class="flex items-center gap-space-md shrink-0"><div class="flex items-center gap-space-xs"><img alt="DocPilot Logo" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1X4l-ue-zS7f63_a0Fbxlvu-6nC8TgBn_qzPL4qSNgJ9-1nmSW2pxHtqXbuNWmdt-hWcZlf7jBMF3o98D-JCWzTlJ_hxu6lRRJK8tkpav51hxNWGcqAEVOqEod-ICWQxDmpL79qWhTxUse_HxbQcU8WrRhkpiHps7SfSpgq7G7YxB037Hc7t6BD4hAdpLdWvSUj0_qNPASSaUDIh_6MarkLBuJXK2IVbWXmA9CxH0iaPC_jSLR0AYMnjyG-"/><span class="font-headline-md text-headline-md font-bold text-primary tracking-tight">DocPilot</span></div><span class="px-space-xs py-0.5 rounded bg-surface-container text-text-secondary font-badge-label text-badge-label uppercase">v3.2 Enterprise</span></div><nav class="flex items-center gap-space-xs overflow-x-auto" data-active-classes="bg-surface-container text-primary font-body-semibold rounded"><a class="px-space-md py-1.5 font-body-default text-body-default text-text-secondary hover:text-on-surface hover:bg-surface-container transition-colors whitespace-nowrap" data-path="directory" href="#">디렉토리</a><a class="px-space-md py-1.5 font-body-default text-body-default text-text-secondary hover:text-on-surface hover:bg-surface-container transition-colors whitespace-nowrap" data-path="search" href="#">하이브리드 검색</a><a class="px-space-md py-1.5 font-body-default text-body-default text-text-secondary hover:text-on-surface hover:bg-surface-container transition-colors whitespace-nowrap" data-path="merger" href="#">문서 병합 &amp; 변환</a><a class="px-space-md py-1.5 font-body-default text-body-default text-text-secondary hover:text-on-surface hover:bg-surface-container transition-colors whitespace-nowrap" data-path="compare" href="#">다중 비교</a><a class="px-space-md py-1.5 font-body-default text-body-default text-text-secondary hover:text-on-surface hover:bg-surface-container transition-colors whitespace-nowrap" data-path="media" href="#">미디어 검색</a><a class="px-space-md py-1.5 font-body-default text-body-default text-text-secondary hover:text-on-surface hover:bg-surface-container transition-colors whitespace-nowrap" data-path="security" href="#">AI DLP / 보안</a><a class="px-space-md py-1.5 font-body-default text-body-default text-text-secondary hover:text-on-surface hover:bg-surface-container transition-colors whitespace-nowrap" data-path="history" href="#">작업 내역</a></nav><div class="flex items-center gap-space-sm shrink-0">'''

    # Identify the injection point
    header_start = '<header class="fixed top-0 left-0 right-0 z-50 h-12 bg-surface-card border-b border-border-subtle shadow-[0_1px_8px_rgba(0,0,0,0.04)]">'
    if header_start in content and 'DocPilot Logo' not in content:
        content = content.replace(header_start, header_start + missing_header_html)
        
    # Now set the active menu classes properly in the restored nav
    file_prefix = file[0]
    active_data_path = active_map.get(file_prefix)

    if active_data_path:
        nav_match = re.search(r'<nav[^>]*>([\s\S]*?)</nav>', content)
        if nav_match:
            nav_inner = nav_match.group(1)
            new_nav_inner = nav_inner
            
            a_tags = re.findall(r'<a[\s\S]*?</a>', nav_inner)
            for a_tag in a_tags:
                clean_a = re.sub(r'\s*aria-current="[^"]*"', '', a_tag)
                dp_match = re.search(r'data-path="([^"]+)"', clean_a)
                if dp_match:
                    dp = dp_match.group(1)
                    if dp == active_data_path:
                        clean_a = re.sub(r'class="[^"]*"', f'class="{active_a_class}"', clean_a)
                        clean_a = clean_a.replace('<a ', '<a aria-current="page" ')
                    else:
                        clean_a = re.sub(r'class="[^"]*"', f'class="{default_a_class}"', clean_a)
                        
                    new_nav_inner = new_nav_inner.replace(a_tag, clean_a)
            
            content = content.replace(nav_inner, new_nav_inner)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Restored header and applied active menu classes.")
