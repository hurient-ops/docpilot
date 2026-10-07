import re

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix dash cases to satisfy React
content = content.replace('stroke-dasharray', 'strokeDasharray')
content = content.replace('stroke-dashoffset', 'strokeDashoffset')

# Replace circles
# The regex finds the group of 5 circles
pattern = re.compile(r'(<circle cx=\"18\" cy=\"18\" fill=\"transparent\" r=\"14\" stroke=\"#16A34A\".*?</circle>\s*<circle.*?)</svg>', re.DOTALL)
replacement = r'''{scanResult ? (
  <>
    \g<1>
  </>
) : (
  <circle cx="18" cy="18" fill="transparent" r="14" stroke="#E2E8F0" strokeWidth="4.5"></circle>
)}
</svg>'''

content = pattern.sub(replacement, content, count=1)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated SVGs")
