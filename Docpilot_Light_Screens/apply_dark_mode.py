import os
import re
import json

folder = r'e:/projects/docpilot/Docpilot_Light_Screens'
dark_colors = {'format-docx-bg':'#1E3A8A','primary_fixed':'#dbe1ff','text-secondary':'#94A3B8','on_tertiary_container':'#ffeedd','secondary_fixed':'#89f5e7','tertiary':'#ffb95f','canvas-base':'#0A0F1D','error':'#ffb4ab','surface-panel':'#0F172A','format-pdf':'#EF4444','border-subtle':'#1E293B','on_secondary_container':'#00302b','on_primary_fixed_variant':'#003ea8','diff-remove':'#EF4444','on_primary_container':'#eeefff','surface_variant':'#2d3449','inverse_surface':'#dae2fd','tertiary_fixed':'#ffddb8','diff-add-bg':'#064E3B','secondary_container':'#29a195','inverse_on_surface':'#283044','surface_bright':'#31394d','dlp-masked-bg':'#4C0519','text-muted':'#64748B','format-hwp-bg':'#164E63','surface_container_high':'#222a3d','surface':'#0b1326','tertiary_container':'#996100','on_surface_variant':'#c3c6d7','primary_container':'#2563eb','surface_container_low':'#131b2e','on_tertiary':'#472a00','secondary_fixed_dim':'#6bd8cb','border-focus':'#3B82F6','diff-add':'#10B981','primary':'#b4c5ff','secondary':'#6bd8cb','format-pdf-bg':'#450A0A','dlp-masked':'#E11D48','format-docx':'#3B82F6','format-pptx-bg':'#431407','surface_dim':'#0b1326','format-pptx':'#EA580C','format-xlsx-bg':'#064E3B','surface_container':'#171f33','inverse_primary':'#0053db','on_secondary_fixed':'#00201d','on_error_container':'#ffdad6','surface_container_lowest':'#060e20','on_primary_fixed':'#00174b','diff-change':'#F59E0B','on_primary':'#002a78','error_container':'#93000a','surface-raised':'#1E293B','on_surface':'#dae2fd','outline_variant':'#434655','on_tertiary_fixed':'#2a1700','on_error':'#690005','dlp-secure-bg':'#064E3B','on_background':'#dae2fd','outline':'#8d90a0','dlp-secure':'#059669','surface_tint':'#b4c5ff','on_tertiary_fixed_variant':'#653e00','format-xlsx':'#10B981','diff-change-bg':'#451A03','on_secondary_fixed_variant':'#005049','primary_fixed_dim':'#b4c5ff','format-hwp':'#06B6D4','diff-remove-bg':'#450A0A','text-primary':'#F8FAFC','tertiary_fixed_dim':'#ffb95f','on_secondary':'#003732','surface-overlay':'#334155','background':'#0b1326','border-strong':'#334155','surface_container_highest':'#2d3449'}

dark_colors['on-secondary-container'] = '#00302b'
dark_colors['on-background'] = '#dae2fd'
dark_colors['surface-canvas'] = '#0A0F1D'
dark_colors['surface-card'] = '#0F172A'
dark_colors['status-local-bg'] = '#064E3B'
dark_colors['status-local-text'] = '#10B981'
dark_colors['status-danger-text'] = '#EF4444'
dark_colors['status-danger-bg'] = '#450A0A'
dark_colors['diff-added-text'] = '#10B981'
dark_colors['diff-added-bg'] = '#064E3B'
dark_colors['diff-removed-text'] = '#EF4444'
dark_colors['diff-removed-bg'] = '#450A0A'
dark_colors['diff-modified-text'] = '#F59E0B'
dark_colors['diff-modified-bg'] = '#451A03'
dark_colors['format-xlsx-text'] = '#10B981'
dark_colors['format-hwp-text'] = '#06B6D4'
dark_colors['format-docx-text'] = '#3B82F6'
dark_colors['format-pptx-text'] = '#EA580C'
dark_colors['format-pdf-text'] = '#EF4444'
dark_colors['format-xlsx-border'] = '#064E3B'
dark_colors['format-hwp-border'] = '#164E63'
dark_colors['format-docx-border'] = '#1E3A8A'
dark_colors['format-pptx-border'] = '#431407'
dark_colors['format-pdf-border'] = '#450A0A'

script_injection = '''
<script>
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
}
</script>
<button onclick="toggleDarkMode()" class="p-1.5 rounded hover:bg-surface-container text-text-secondary hover:text-text-primary transition-colors ml-2" title="Toggle Dark Mode">
    <span class="material-symbols-outlined text-[18px]">dark_mode</span>
</button>
'''

for file in os.listdir(folder):
    if not file.endswith('.html'):
        continue
    path = os.path.join(folder, file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.search(r'colors:(\{.*?\})', content)
    if not match:
        continue
    
    light_colors_str = match.group(1)
    
    try:
        light_colors = eval(light_colors_str.replace('false', 'False').replace('true', 'True'))
    except:
        continue
        
    css_lines = []
    css_lines.append(':root {')
    for k, v in light_colors.items():
        css_lines.append(f'  --color-{k}: {v};')
    css_lines.append('}')
    
    css_lines.append('html.dark {')
    for k, v in light_colors.items():
        dk = dark_colors.get(k, v)
        css_lines.append(f'  --color-{k}: {dk};')
    css_lines.append('}')
    
    style_block = f'<style>\n{chr(10).join(css_lines)}\n</style>\n'
    
    new_colors_dict = {k: f'var(--color-{k})' for k in light_colors.keys()}
    new_colors_str = json.dumps(new_colors_dict)
    
    new_content = content.replace(f'colors:{light_colors_str}', f'colors:{new_colors_str}')
    new_content = new_content.replace('</head>', f'{style_block}</head>')
    
    button_match = re.search(r'<button[^>]*>\s*<span[^>]*>settings</span>\s*</button>', new_content)
    if button_match:
        new_content = new_content.replace(button_match.group(0), button_match.group(0) + script_injection)
    else:
        new_content = new_content.replace('</header>', f'{script_injection}</header>')
        
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
print('Applied dark mode to all files.')
