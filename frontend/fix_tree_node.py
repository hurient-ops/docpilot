import sys

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

tree_node = '''
  const FileTreeNode = ({ node, path }: { node: any, path: string }) => {
    const isRoot = path === "";
    const isExpanded = isRoot || expandedFolders[path] !== true;
    const hasChildren = Object.keys(node.folders).length > 0 || node.files.length > 0;
    return (
      <div className={`flex flex-col gap-1 ${!isRoot ? 'pl-4' : ''}`}>
        {!isRoot && (
          <div onClick={() => toggleFolder(path)} className="flex items-center gap-1.5 p-1 text-text-primary font-semibold hover:bg-surface-container cursor-pointer rounded">
            <span className="material-symbols-outlined text-[16px] text-text-secondary">
              {hasChildren ? (isExpanded ? "arrow_drop_down" : "arrow_right") : "horizontal_rule"}
            </span>
            <span className="material-symbols-outlined text-[16px] text-secondary">
              {isExpanded ? "folder_open" : "folder"}
            </span>
            <span className="truncate">{path.split(/[\\\\/]/).pop()}</span>
          </div>
        )}
        {isExpanded && (
          <div className={`${!isRoot ? 'ml-2 border-l border-surface-container-highest pl-2' : ''}`}>
            {Object.entries(node.folders).map(([subFolderName, subNode]) => (
              <FileTreeNode key={subFolderName} node={subNode} path={path ? `${path}/${subFolderName}` : subFolderName} />
            ))}
            {node.files.map((file: any, i: number) => (
              <div key={i} className="flex items-center gap-2 p-1 rounded hover:bg-surface-canvas cursor-pointer text-text-secondary hover:text-text-primary pl-4">
                <span className="material-symbols-outlined text-[14px]">description</span>
                <span className="truncate text-[12px]" title={file.file_path}>{file.file_name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
'''

content = content.replace('const fileTree = buildTree();', 'const fileTree = buildTree();\n' + tree_node)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("FileTreeNode injected")
