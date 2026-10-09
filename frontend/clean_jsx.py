import re
import sys

def convert():
    try:
        with open(r'e:\projects\docpilot\frontend\src\components\screens\SettingsScreen.new.tsx', 'r', encoding='utf-8') as f:
            content = f.read()

        # Fix checked=""
        content = content.replace('checked=\"\"', 'defaultChecked')

        # Fix style=\"clip-path: circle(50%);\"
        def replace_style(m):
            style_str = m.group(1)
            styles = []
            for item in style_str.split(';'):
                if ':' in item:
                    k, v = item.split(':', 1)
                    # Convert kebab-case to camelCase
                    k = re.sub(r'-([a-z])', lambda x: x.group(1).upper(), k.strip())
                    styles.append(f'"{k}": "{v.strip()}"')
            return 'style={{ ' + ', '.join(styles) + ' }}'

        content = re.sub(r'style=\"([^\"]+)\"', replace_style, content)

        # Write to the actual file
        with open(r'e:\projects\docpilot\frontend\src\components\screens\SettingsScreen.tsx', 'w', encoding='utf-8') as f:
            f.write(content)
            
        print("Success")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    convert()
