import os

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

target = '<span>{loading ? "스캔 중..." : "스캔 시작"}</span>\n</button>'
replacement = target + '\n{scanResult && <div className="mt-2 text-sm text-green-500 font-bold bg-green-50 p-2 rounded w-full">✅ 스캔 완료: 신규 {scanResult.added}건, 업데이트 {scanResult.updated}건, 스킵 {scanResult.skipped}건</div>}'

content = content.replace(target, replacement)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
