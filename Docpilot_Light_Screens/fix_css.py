import os
import re

folder = r'e:/projects/docpilot/Docpilot_Light_Screens'
files = [f for f in os.listdir(folder) if f.endswith('.html')]

for file in files:
    path = os.path.join(folder, file)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the html.dark block
    style_match = re.search(r'html\.dark\s*\{([^}]*)\}', content)
    if style_match:
        dark_block = style_match.group(1)
        
        # We know what the keys should be. Let's create a corrected dark_colors mapping
        dark_colors_corrected = {
            'on-error': '#690005', 'secondary-fixed-dim': '#6bd8cb', 'status-danger-text': '#EF4444',
            'status-cloud-text': '#D97706', 'format-hwp-text': '#06B6D4', 'primary': '#b4c5ff',
            'error': '#ffb4ab', 'secondary-container': '#005049', 'surface-container-lowest': '#060e20',
            'format-docx-text': '#3B82F6', 'outline-variant': '#434655', 'diff-modified-bg': '#451A03',
            'background': '#0b1326', 'status-local-text': '#10B981', 'outline': '#8d90a0',
            'text-primary': '#F8FAFC', 'format-xlsx-bg': '#064E3B', 'primary-fixed': '#dbe1ff',
            'format-hwp-border': '#164E63', 'surface-container-low': '#131b2e', 'security-dlp-breach': '#E11D48',
            'surface-container-highest': '#2d3449', 'format-pdf-border': '#450A0A', 'on-primary': '#002a78',
            'surface': '#0b1326', 'format-pptx-bg': '#431407', 'on-tertiary-fixed-variant': '#653e00',
            'on-primary-fixed': '#00174b', 'surface-container': '#171f33', 'format-pdf-bg': '#450A0A',
            'text-secondary': '#94A3B8', 'on-tertiary-fixed': '#2a1700', 'format-docx-bg': '#1E3A8A',
            'on-error-container': '#ffdad6', 'surface-tint': '#b4c5ff', 'format-xlsx-text': '#10B981',
            'error-container': '#93000a', 'surface-dim': '#0b1326', 'tertiary-container': '#996100',
            'on-secondary-fixed': '#00201d', 'tertiary-fixed': '#ffddb8', 'status-danger-bg': '#450A0A',
            'on-tertiary': '#472a00', 'secondary': '#6bd8cb', 'primary-container': '#2563eb',
            'inverse-on-surface': '#283044', 'diff-removed-text': '#EF4444', 'on-tertiary-container': '#ffeedd',
            'on-background': '#dae2fd', 'border-subtle': '#1E293B', 'on-primary-fixed-variant': '#003ea8',
            'border-strong': '#334155', 'surface-variant': '#2d3449', 'tertiary-fixed-dim': '#ffb95f',
            'format-hwp-bg': '#164E63', 'format-docx-border': '#1E3A8A', 'format-pdf-text': '#EF4444',
            'format-xlsx-border': '#064E3B', 'surface-canvas': '#0A0F1D', 'on-secondary-fixed-variant': '#005049',
            'on-secondary': '#003732', 'format-pptx-border': '#431407', 'text-muted': '#64748B',
            'status-local-bg': '#064E3B', 'on-surface': '#dae2fd', 'diff-removed-bg': '#450A0A',
            'surface-bright': '#31394d', 'surface-container-high': '#222a3d', 'surface-card': '#0F172A',
            'security-dlp-pass': '#059669', 'secondary-fixed': '#89f5e7', 'status-cloud-bg': '#78350F',
            'on-surface-variant': '#c3c6d7', 'diff-added-bg': '#064E3B', 'primary-fixed-dim': '#b4c5ff',
            'on-primary-container': '#eeefff', 'inverse-primary': '#0053db', 'on-secondary-container': '#00302b',
            'tertiary': '#ffb95f', 'diff-added-text': '#10B981', 'format-pptx-text': '#EA580C',
            'diff-modified-text': '#F59E0B', 'inverse-surface': '#dae2fd'
        }

        # Modify the lines inside dark block
        lines = dark_block.split(';')
        new_lines = []
        for line in lines:
            if not line.strip(): continue
            parts = line.split(':')
            if len(parts) == 2:
                var_name = parts[0].strip()
                k = var_name.replace('--color-', '')
                if k in dark_colors_corrected:
                    new_lines.append(f'  {var_name}: {dark_colors_corrected[k]}')
                else:
                    new_lines.append(f'  {var_name}: {parts[1].strip()}')
        
        new_dark_block = ';\n'.join(new_lines) + ';\n'
        content = content.replace(dark_block, '\n' + new_dark_block)

        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)

print("Fixed CSS variables for dark mode.")
