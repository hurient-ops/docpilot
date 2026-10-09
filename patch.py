import re

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Vertical capacity bars
old_str = """<div className="mt-2 h-3 w-full bg-surface-container rounded-full overflow-hidden flex">
                      {formatLabels.map((fmt) => {
                        const sz = sizeCounts[fmt.key as keyof typeof sizeCounts];
                        if (sz === 0 || totalSize === 0) return null;
                        const w = (sz / totalSize) * 100;
                        return (
                          <div
                            key={fmt.key}
                            style={{ width: `${w}%`, backgroundColor: fmt.stroke }}
                            className="h-full"
                          ></div>
                        );
                      })}
                    </div>"""

new_str = """<div className="mt-4 flex justify-around items-end h-32 w-full border-b border-surface-container pb-2">
                      {formatLabels.map((fmt) => {
                        const sz = sizeCounts[fmt.key as keyof typeof sizeCounts];
                        const pct = totalSize > 0 ? (sz / totalSize) * 100 : 0;
                        const szStr = sz > 1024*1024*1024 ? (sz/(1024*1024*1024)).toFixed(1) + ' GB' : sz > 1024*1024 ? (sz/(1024*1024)).toFixed(1) + ' MB' : (sz/1024).toFixed(1) + ' KB';
                        return (
                          <div key={fmt.key} className="flex flex-col items-center gap-1 w-1/5">
                            <span className="font-caption text-[10px] text-text-muted">{szStr}</span>
                            <div className="w-6 bg-surface-container rounded-t-sm relative h-20 overflow-hidden">
                              <div className="absolute bottom-0 w-full transition-all duration-500" style={{ height: `${pct}%`, backgroundColor: fmt.stroke }}></div>
                            </div>
                            <span className={`font-badge-label font-bold text-[10px] ${fmt.text}`}>{fmt.label}</span>
                          </div>
                        );
                      })}
                    </div>"""

content = content.replace(old_str, new_str)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
