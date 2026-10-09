file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_str = """                          <div key={fmt.key} className="flex flex-col items-center gap-1 w-1/5">
                            <span className="font-caption text-[10px] text-text-muted">{szStr}</span>
                            <div className="w-6 bg-surface-container rounded-t-sm relative h-20 overflow-hidden">
                              <div className="absolute bottom-0 w-full transition-all duration-500" style={{ height: `${pct}%`, backgroundColor: fmt.stroke }}></div>
                            </div>
                            <span className={`font-badge-label font-bold text-[10px] ${fmt.text}`}>{fmt.label}</span>
                          </div>"""

new_str = """                          <div key={fmt.key} className="flex flex-col items-center gap-1 w-1/5">
                            <div className="w-6 bg-surface-container rounded-t-sm relative h-20 overflow-hidden">
                              <div className="absolute bottom-0 w-full transition-all duration-500" style={{ height: `${pct}%`, backgroundColor: fmt.stroke }}></div>
                            </div>
                            <div className="flex flex-col items-center leading-tight mt-1">
                              <span className={`font-badge-label font-bold text-[10px] ${fmt.text}`}>{fmt.label}</span>
                              <span className="font-caption text-[10px] text-text-muted">{szStr}</span>
                            </div>
                          </div>"""

content = content.replace(old_str, new_str)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
