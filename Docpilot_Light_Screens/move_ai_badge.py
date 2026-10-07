import os
import re

folder = r'e:/projects/docpilot/Docpilot_Light_Screens'
files = [f for f in os.listdir(folder) if f.endswith('.html')]

inline_badge_html = '''<div class="flex items-center gap-1.5 px-space-sm py-1.5 ml-space-sm rounded-lg bg-status-local-bg border border-status-local-text/30 cursor-pointer hover:bg-surface-container transition-colors shrink-0">
<span class="w-2 h-2 rounded-full bg-status-local-text animate-pulse"></span>
<span class="font-caption text-caption font-semibold text-status-local-text">로컬 AI [NPU 가속 Standard]</span>
<span class="material-symbols-outlined text-[14px] text-status-local-text">arrow_drop_down</span>
</div>'''

for file in files:
    path = os.path.join(folder, file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove the floating badge completely
    floating_pattern = re.compile(r'<!-- Floating Local AI Badge -->[\s\S]*?<div[^>]*fixed top-14 right-4[^>]*>[\s\S]*?</div>\s*')
    content = re.sub(floating_pattern, '', content)
    
    # Just in case there's another residual one
    content = re.sub(r'<div class="fixed top-14 right-4 z-40[^>]*>[\s\S]*?</div>', '', content)

    # 2. Insert inline badge at the end of the <nav>
    # Find </nav> and replace with the badge + </nav>
    # Make sure we don't insert it multiple times if it's already there
    if 'ml-space-sm rounded-lg bg-status-local-bg' not in content:
        content = content.replace('</nav>', f'{inline_badge_html}</nav>')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Moved Local AI badge into the top nav bar.")
