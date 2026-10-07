import re

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace tbody
tbody_pattern = re.compile(r'<tbody[^>]*>.*?</tbody\s*>', re.DOTALL)

# In DirectoryScreen.tsx, we have `scanResult` which is populated by `api.scanDirectory`.
# We want to render rows based on `scanResult.files` if it exists.
new_tbody = '''<tbody className="font-body-dense text-body-dense">
  {scanResult?.files?.map((file: any, index: number) => (
    <tr key={index} className="hover:bg-surface-canvas transition-colors">
      <td className="py-2 px-space-sm">
        <span className="px-space-xs py-0.5 rounded font-badge-label text-badge-label font-bold bg-format-pptx-bg text-format-pptx-text">
          {file.file_name.split('.').pop()?.toUpperCase() || 'FILE'}
        </span>
      </td>
      <td className="py-2 px-space-sm font-body-semibold text-text-primary truncate max-w-[150px]" title={file.file_name}>
        {file.file_name}
      </td>
      <td className="py-2 px-space-sm text-text-muted font-code-mono text-code-mono hidden md:table-cell truncate max-w-[100px]" title={file.file_path}>
        {file.file_path}
      </td>
      <td className="py-2 px-space-sm font-code-mono text-code-mono">N/A</td>
      <td className="py-2 px-space-sm text-text-muted hidden sm:table-cell">방금 전</td>
      <td className="py-2 px-space-sm">
        <span className="inline-flex items-center gap-1 text-[11px] text-diff-added-text font-medium"><span className="w-1.5 h-1.5 rounded-full bg-diff-added-text"></span>추가됨</span>
      </td>
      <td className="py-2 px-space-sm text-right">
        <div className="flex items-center justify-end gap-1">
          <button className="p-1 rounded hover:bg-surface-container text-secondary" title="탐색 열기" type="button"><span className="material-symbols-outlined text-[16px]">manage_search</span></button>
          <button className="p-1 rounded hover:bg-surface-container text-text-secondary" title="병합 추가" type="button"><span className="material-symbols-outlined text-[16px]">merge_type</span></button>
          <button className="p-1 rounded hover:bg-surface-container text-text-secondary" title="PII 검사" type="button"><span className="material-symbols-outlined text-[16px]">security</span></button>
        </div>
      </td>
    </tr>
  ))}
  {!scanResult?.files && (
    <tr>
      <td colSpan={7} className="py-8 text-center text-text-muted">스캔을 시작하여 폴더의 파일을 불러오세요.</td>
    </tr>
  )}
</tbody>'''

content = tbody_pattern.sub(new_tbody, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Replaced tbody in DirectoryScreen.tsx")
