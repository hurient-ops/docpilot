import os
import glob
from bs4 import BeautifulSoup
import re

screens_dir = r'e:\projects\docpilot\Docpilot_Light_Screens'
components_dir = r'e:\projects\docpilot\frontend\src\components\screens'

html_files = glob.glob(os.path.join(screens_dir, '*.html'))

def attr_to_jsx(attr_name):
    mappings = {
        'class': 'className',
        'for': 'htmlFor',
        'fill-rule': 'fillRule',
        'clip-rule': 'clipRule',
        'stroke-width': 'strokeWidth',
        'stroke-linecap': 'strokeLinecap',
        'stroke-linejoin': 'strokeLinejoin',
        'tabindex': 'tabIndex',
        'autocomplete': 'autoComplete',
        'checked': 'defaultChecked',
        'selected': 'defaultValue',
        'readonly': 'readOnly',
        'onclick': None,
        'onchange': None
    }
    return mappings.get(attr_name.lower(), attr_name)

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
            
        soup = BeautifulSoup(content, 'lxml')
        main_tag = soup.find('main')
        
        if main_tag:
            # Recursively update attributes
            for tag in main_tag.find_all(True):
                new_attrs = {}
                for k, v in list(tag.attrs.items()):
                    if k == 'style':
                        continue # strip inline styles for simplicity
                    
                    new_key = attr_to_jsx(k)
                    if new_key is None:
                        continue # remove onclick etc
                    
                    if isinstance(v, list):
                        new_attrs[new_key] = " ".join(v)
                    else:
                        new_attrs[new_key] = str(v)
                
                # Check for boolean attributes
                if 'disabled' in tag.attrs:
                    new_attrs['disabled'] = True
                    if 'disabled' in tag.attrs:
                         del tag.attrs['disabled']
                
                tag.attrs = new_attrs

            # Convert back to string as XML (which auto-closes void tags properly)
            jsx_str = main_tag.encode_contents(formatter="html").decode('utf-8')
            
            # BeautifulSoup HTML formatter still leaves input tags unclosed sometimes if html5 formatter, but let's just do simple regex on known void tags
            jsx_str = re.sub(r'<(img|input|hr|br)([^>]*?)(?<!/)>', r'<\1\2 />', jsx_str)
            # Remove any html comments
            jsx_str = re.sub(r'<!--[\s\S]*?-->', '', jsx_str)
            
            # Wrap in component
            code = f"""import React from 'react';

export default function {comp_name}() {{
  return (
    <>
      {jsx_str}
    </>
  );
}}
"""
            with open(os.path.join(components_dir, f'{comp_name}.tsx'), 'w', encoding='utf-8') as out:
                out.write(code)
            print(f"Generated {comp_name}.tsx")
