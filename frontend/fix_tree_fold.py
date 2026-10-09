import re

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

state_injection = '''
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folder]: prev[folder] === undefined ? true : !prev[folder]
    }));
  };
'''
if 'const [loading, setLoading]' in content:
    content = content.replace('const [loading, setLoading] = useState(false);', 'const [loading, setLoading] = useState(false);\n' + state_injection)


new_tree_rendering = '''    ).map(([folder, files]: [string, any], fIndex: number) => {
      const isExpanded = folder === "Root" || expandedFolders[folder] !== true;
      return (
      <div key={`folder-${fIndex}`} className="flex flex-col gap-1 mb-2">
        {folder !== "Root" && (
          <div 
            onClick={() => toggleFolder(folder)}
            className="pl-4 flex items-center gap-1.5 p-1 text-text-primary font-semibold hover:bg-surface-container cursor-pointer rounded"
          >
            <span className="material-symbols-outlined text-[16px] text-text-secondary">
              {isExpanded ? "arrow_drop_down" : "arrow_right"}
            </span>
            <span className="material-symbols-outlined text-[16px] text-secondary">
              {isExpanded ? "folder_open" : "folder"}
            </span>
            <span className="truncate">{folder}</span>
          </div>
        )}
        {isExpanded && files.map((file: any, i: number) => (
          <div key={`file-${fIndex}-${i}`} className={`${folder !== "Root" ? "pl-10" : "pl-6"} flex items-center gap-2 p-1 rounded hover:bg-surface-canvas cursor-pointer text-text-secondary hover:text-text-primary`}>
            <span className="material-symbols-outlined text-[14px]">description</span>
            <span className="truncate text-[12px]" title={file.file_path}>{file.file_name}</span>
          </div>
        ))}
      </div>
    );})'''

pattern = re.compile(r'\)\.map\(\(\[folder, files\]: \[string, any\], fIndex: number\) => \(\s*<div key=\{`folder-\$\{fIndex\}`\} className="flex flex-col gap-1 mb-2">.*?</div>\s*\)\)', re.DOTALL)

content = pattern.sub(new_tree_rendering, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated Tree folding")
