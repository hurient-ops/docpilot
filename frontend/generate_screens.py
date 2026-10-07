import os
import glob
import re

screens_dir = r'e:\projects\docpilot\Docpilot_Light_Screens'
components_dir = r'e:\projects\docpilot\frontend\src\components\screens'
os.makedirs(components_dir, exist_ok=True)

html_files = glob.glob(os.path.join(screens_dir, '*.html'))

def html_to_jsx(html: str) -> str:
    # 1. class -> className
    jsx = re.sub(r'\bclass=', 'className=', html)
    # 2. for -> htmlFor
    jsx = re.sub(r'\bfor=', 'htmlFor=', jsx)
    # 3. self-close img, input, hr, br, path, polygon, rect, circle, line
    jsx = re.sub(r'(<(img|input|hr|br|path|polygon|rect|circle|line)[^>]*?)(?<!/)>', r'\1 />', jsx)
    # 4. remove comments
    jsx = re.sub(r'<!--[\s\S]*?-->', '', jsx)
    # 5. style="..." -> remove (since it's better to avoid complex translation in this script)
    jsx = re.sub(r'style="[^"]*"', '', jsx)
    # 6. onclick -> onClick (remove for safety)
    jsx = re.sub(r'onclick="[^"]*"', '', jsx)
    # 7. Checkbox checked attributes
    jsx = re.sub(r'\bchecked\b(?!=)', 'defaultChecked', jsx)
    jsx = re.sub(r'\bselected\b(?!=)', 'defaultValue', jsx)
    jsx = re.sub(r'\bdisabled\b(?!=)', 'disabled={true}', jsx)
    return jsx

routes_map = {
    '1': 'MergerScreen',
    '2': 'MediaScreen',
    '3': 'SecurityScreen',
    '4': 'BillingScreen',
    '5': 'CompareScreen',
    '6': 'SearchScreen',
    '7': 'HistoryScreen',
    '8': 'DirectoryScreen'
}

for file in html_files:
    basename = os.path.basename(file)
    prefix = basename.split('_')[0]
    
    if prefix in routes_map:
        comp_name = routes_map[prefix]
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        main_match = re.search(r'<main[^>]*>([\s\S]*?)</main>', content)
        if main_match:
            main_html = main_match.group(1)
            main_jsx = html_to_jsx(main_html)
            
            # Wrap in component
            code = f"""import React from 'react';

export default function {comp_name}() {{
  return (
    <>
      {main_jsx}
    </>
  );
}}
"""
            with open(os.path.join(components_dir, f'{comp_name}.tsx'), 'w', encoding='utf-8') as out:
                out.write(code)
            print(f"Generated {comp_name}.tsx")

