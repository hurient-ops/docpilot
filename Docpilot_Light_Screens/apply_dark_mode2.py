import os
import re
import json

folder = r'e:/projects/docpilot/Docpilot_Light_Screens'
dark_colors = {'format-docx-bg':'#1E3A8A','primary_fixed':'#dbe1ff','text-secondary':'#94A3B8','on_tertiary_container':'#ffeedd','secondary_fixed':'#89f5e7','tertiary':'#ffb95f','canvas-base':'#0A0F1D','error':'#ffb4ab','surface-panel':'#0F172A','format-pdf':'#EF4444','border-subtle':'#1E293B','on_secondary_container':'#00302b','on_primary_fixed_variant':'#003ea8','diff-remove':'#EF4444','on_primary_container':'#eeefff','surface_variant':'#2d3449','inverse_surface':'#dae2fd','tertiary_fixed':'#ffddb8','diff-add-bg':'#064E3B','secondary_container':'#29a195','inverse_on_surface':'#283044','surface_bright':'#31394d','dlp-masked-bg':'#4C0519','text-muted':'#64748B','format-hwp-bg':'#164E63','surface_container_high':'#222a3d','surface':'#0b1326','tertiary_container':'#996100','on_surface_variant':'#c3c6d7','primary_container':'#2563eb','surface_container_low':'#131b2e','on_tertiary':'#472a00','secondary_fixed_dim':'#6bd8cb','border-focus':'#3B82F6','diff-add':'#10B981','primary':'#b4c5ff','secondary':'#6bd8cb','format-pdf-bg':'#450A0A','dlp-masked':'#E11D48','format-docx':'#3B82F6','format-pptx-bg':'#431407','surface_dim':'#0b1326','format-pptx':'#EA580C','format-xlsx-bg':'#064E3B','surface_container':'#171f33','inverse_primary':'#0053db','on_secondary_fixed':'#00201d','on_error_container':'#ffdad6','surface_container_lowest':'#060e20','on_primary_fixed':'#00174b','diff-change':'#F59E0B','on_primary':'#002a78','error_container':'#93000a','surface-raised':'#1E293B','on_surface':'#dae2fd','outline_variant':'#434655','on_tertiary_fixed':'#2a1700','on_error':'#690005','dlp-secure-bg':'#064E3B','on_background':'#dae2fd','outline':'#8d90a0','dlp-secure':'#059669','surface_tint':'#b4c5ff','on_tertiary_fixed_variant':'#653e00','format-xlsx':'#10B981','diff-change-bg':'#451A03','on_secondary_fixed_variant':'#005049','primary_fixed_dim':'#b4c5ff','format-hwp':'#06B6D4','diff-remove-bg':'#450A0A','text-primary':'#F8FAFC','tertiary_fixed_dim':'#ffb95f','on_secondary':'#003732','surface-overlay':'#334155','background':'#0b1326','border-strong':'#334155','surface_container_highest':'#2d3449'}

dark_colors.update({
    'on-secondary-container': '#00302b', 'on-background': '#dae2fd', 'surface-canvas': '#0A0F1D',
    'surface-card': '#0F172A', 'status-local-bg': '#064E3B', 'status-local-text': '#10B981',
    'status-danger-text': '#EF4444', 'status-danger-bg': '#450A0A', 'diff-added-text': '#10B981',
    'diff-added-bg': '#064E3B', 'diff-removed-text': '#EF4444', 'diff-removed-bg': '#450A0A',
    'diff-modified-text': '#F59E0B', 'diff-modified-bg': '#451A03', 'format-xlsx-text': '#10B981',
    'format-hwp-text': '#06B6D4', 'format-docx-text': '#3B82F6', 'format-pptx-text': '#EA580C',
    'format-pdf-text': '#EF4444', 'format-xlsx-border': '#064E3B', 'format-hwp-border': '#164E63',
    'format-docx-border': '#1E3A8A', 'format-pptx-border': '#431407', 'format-pdf-border': '#450A0A'
})

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
    
    if '<button onclick="toggleDarkMode()"' in content:
        pass # Already has button
    else:
        # We need to inject dark mode stuff
        match = re.search(r'\"?colors\"?:\s*(\{.*?\})', content)
        if match:
            light_colors_str = match.group(1)
            try:
                light_colors = eval(light_colors_str.replace('false', 'False').replace('true', 'True'))
                
                css_lines = [':root {']
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
                
                new_content = content.replace(f'"colors":{light_colors_str}', f'"colors":{new_colors_str}')
                new_content = new_content.replace(f'colors:{light_colors_str}', f'colors:{new_colors_str}')
                new_content = new_content.replace('</head>', f'{style_block}</head>')
                
                button_match = re.search(r'<button[^>]*>\s*<span[^>]*>settings</span>\s*</button>', new_content)
                if button_match:
                    new_content = new_content.replace(button_match.group(0), button_match.group(0) + script_injection)
                else:
                    new_content = new_content.replace('</header>', f'{script_injection}</header>')
                    
                content = new_content
            except Exception as e:
                print('Eval failed for', file, e)
    
    # Specific UI tweaks for the workspace file
    if '1_목차' in file:
        # Refine Template Dropdown
        old_template = '''<div class="relative flex items-center">
<div class="flex items-center gap-space-xs px-space-md py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer text-text-primary">
<span class="material-symbols-outlined text-[16px] text-secondary">style</span>
<span class="font-body-dense text-body-dense font-medium">[기업 표준 PPTX 템플릿 A - 전략기획실 공통]</span>
<span class="px-space-xs py-0.5 rounded bg-surface-card text-[10px] text-secondary font-code-mono font-bold">마스터 서식 적용</span>
<span class="material-symbols-outlined text-[16px] text-text-muted ml-1">expand_more</span>
</div>
</div>'''
        
        new_template = '''<div class="relative flex items-center">
<div class="absolute left-3 flex items-center pointer-events-none">
  <span class="material-symbols-outlined text-[16px] text-secondary">style</span>
</div>
<select class="pl-8 pr-12 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer text-text-primary font-body-dense text-body-dense font-medium border border-border-subtle focus:outline-none focus:ring-1 focus:ring-secondary appearance-none">
  <option value="none">[기본 원본 서식 유지]</option>
  <option value="pptx-a" selected>[기업 표준 PPTX 템플릿 A - 전략기획실 공통]</option>
  <option value="word-hwp">[기업 표준 Word/HWP 양식]</option>
</select>
<div class="absolute right-2 flex items-center pointer-events-none text-text-muted">
  <span class="material-symbols-outlined text-[16px]">expand_more</span>
</div>
</div>'''
        content = content.replace(old_template, new_template)

        # Refine Pre-flight banner
        old_banner = '''<div class="flex items-center gap-space-sm min-w-0">
<span class="material-symbols-outlined text-format-docx-text text-[18px] shrink-0">verified</span>
<p class="font-body-dense text-body-dense text-text-primary truncate">
<span class="font-body-semibold text-format-docx-text">호환성 사전 점검 완료:</span> 
          스캔본 비트맵 이미지 감지 2건 → <span class="font-body-semibold text-status-local-text">온디바이스 NPU Local OCR 자동 변환 엔진이 활성화되었습니다.</span>
</p>
</div>'''

        new_banner = '''<div class="flex items-center gap-space-sm min-w-0">
<span class="material-symbols-outlined text-format-docx-text text-[18px] shrink-0">verified</span>
<p class="font-body-dense text-body-dense text-text-primary truncate">
<span class="font-body-semibold text-format-docx-text">호환성 사전 점검 완료:</span> 
          스캔본 비트맵 이미지 감지 2건
</p>
<label class="flex items-center gap-1.5 cursor-pointer text-status-local-text bg-status-local-bg/80 hover:bg-status-local-bg px-2 py-0.5 rounded font-body-semibold text-[12px] shadow-sm ml-2 border border-status-local-text/30 transition-colors">
  <input type="checkbox" checked class="text-status-local-text focus:ring-0 rounded-sm w-3.5 h-3.5 cursor-pointer">
  <span>Local OCR 적용</span>
</label>
</div>'''
        content = content.replace(old_banner, new_banner)
        
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
print('Applied dark mode and UI tweaks.')
