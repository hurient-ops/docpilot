import os

file_path = r'e:\projects\docpilot\agents\scanner_agent.py'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Revert previous incorrect additions
content = content.replace('stats["added"] += 1\n                    stats["files"].append({"file_name": file_name, "file_path": file_path})', 'stats["added"] += 1')
content = content.replace('stats["updated"] += 1\n                    stats["files"].append({"file_name": file_name, "file_path": file_path})', 'stats["updated"] += 1')
content = content.replace('stats["skipped"] += 1\n                    stats["files"].append({"file_name": file_name, "file_path": file_path})', 'stats["skipped"] += 1')

# Add correct additions with proper indentation and variable names
content = content.replace('stats["added"] += 1', 'stats["added"] += 1\n                    stats["files"].append({"file_name": filename, "file_path": file_path})')
content = content.replace('stats["updated"] += 1', 'stats["updated"] += 1\n                        stats["files"].append({"file_name": filename, "file_path": file_path})')
content = content.replace('stats["skipped"] += 1', 'stats["skipped"] += 1\n                        stats["files"].append({"file_name": filename, "file_path": file_path})')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("fixed")
