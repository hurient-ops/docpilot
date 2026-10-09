import re

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace PPTX button
content = re.sub(
    r'<button className=\"px-space-sm py-0\.5 rounded-full bg-format-pptx-bg[^\"]*\" type=\"button\">',
    '<button onClick={() => setSelectedFormat(selectedFormat === "PPTX" ? null : "PPTX")} className={`px-space-sm py-0.5 rounded-full bg-format-pptx-bg text-format-pptx-text font-badge-label text-badge-label font-bold flex items-center gap-1 hover:brightness-95 transition-all ${selectedFormat === "PPTX" ? "ring-2 ring-primary" : ""}`} type="button">',
    content
)

# Replace XLSX button
content = re.sub(
    r'<button className=\"px-space-sm py-0\.5 rounded-full bg-format-xlsx-bg[^\"]*\" type=\"button\">',
    '<button onClick={() => setSelectedFormat(selectedFormat === "XLSX" ? null : "XLSX")} className={`px-space-sm py-0.5 rounded-full bg-format-xlsx-bg text-format-xlsx-text font-badge-label text-badge-label font-bold flex items-center gap-1 hover:brightness-95 transition-all ${selectedFormat === "XLSX" ? "ring-2 ring-primary" : ""}`} type="button">',
    content
)

# Replace DOCX button
content = re.sub(
    r'<button className=\"px-space-sm py-0\.5 rounded-full bg-format-docx-bg[^\"]*\" type=\"button\">',
    '<button onClick={() => setSelectedFormat(selectedFormat === "DOCX" ? null : "DOCX")} className={`px-space-sm py-0.5 rounded-full bg-format-docx-bg text-format-docx-text font-badge-label text-badge-label font-bold flex items-center gap-1 hover:brightness-95 transition-all ${selectedFormat === "DOCX" ? "ring-2 ring-primary" : ""}`} type="button">',
    content
)

# Replace HWP button
content = re.sub(
    r'<button className=\"px-space-sm py-0\.5 rounded-full bg-format-hwp-bg[^\"]*\" type=\"button\">',
    '<button onClick={() => setSelectedFormat(selectedFormat === "HWP" ? null : "HWP")} className={`px-space-sm py-0.5 rounded-full bg-format-hwp-bg text-format-hwp-text font-badge-label text-badge-label font-bold flex items-center gap-1 hover:brightness-95 transition-all ${selectedFormat === "HWP" ? "ring-2 ring-primary" : ""}`} type="button">',
    content
)

# Replace PDF button
content = re.sub(
    r'<button className=\"px-space-sm py-0\.5 rounded-full bg-format-pdf-bg[^\"]*\" type=\"button\">',
    '<button onClick={() => setSelectedFormat(selectedFormat === "PDF" ? null : "PDF")} className={`px-space-sm py-0.5 rounded-full bg-format-pdf-bg text-format-pdf-text font-badge-label text-badge-label font-bold flex items-center gap-1 hover:brightness-95 transition-all ${selectedFormat === "PDF" ? "ring-2 ring-primary" : ""}`} type="button">',
    content
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Buttons fixed")
