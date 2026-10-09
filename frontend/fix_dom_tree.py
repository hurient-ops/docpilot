import re

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the static tree with FileTreeNode
tree_regex = re.compile(r'<div className="flex flex-col gap-1 font-body-dense text-body-dense overflow-y-auto max-h-\[380px\] pr-1">.*?</div>\s*</div>\s*</div>\s*</div>\s*</div>', re.DOTALL)
tree_new = '''<div className="flex flex-col gap-1 font-body-dense text-body-dense overflow-y-auto max-h-[380px] pr-1 custom-scrollbar">
              <FileTreeNode node={fileTree} path="" />
            </div>
          </div>
        </div>
      </div>
    </div>'''

new_content = tree_regex.sub(tree_new, content)
if new_content == content:
    print("Regex failed to match!")
else:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Static tree replaced.")
