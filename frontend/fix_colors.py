import os

filepath = r"e:\projects\docpilot\frontend\src\components\screens\CompareScreen.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

replacements = {
    "bg-[#F9FAFB]": "bg-surface-base",
    "bg-white": "bg-surface-card",
    "border-gray-100": "border-border-subtle",
    "border-gray-200": "border-border-subtle",
    "bg-gray-50": "bg-surface-container",
    "bg-[#F8FAFC]": "bg-surface-container",
    "text-gray-800": "text-text-primary",
    "text-gray-700": "text-text-primary",
    "text-gray-600": "text-text-secondary",
    "text-gray-500": "text-text-muted",
    "text-gray-400": "text-text-muted"
}

for old_str, new_str in replacements.items():
    content = content.replace(old_str, new_str)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Colors updated!")
