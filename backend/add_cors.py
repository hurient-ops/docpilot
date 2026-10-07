import os
import re

file_path = r'e:\projects\docpilot\backend\main.py'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

cors_code = """
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
"""

content = re.sub(r'app = FastAPI\([^)]*\)', lambda m: m.group(0) + cors_code, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("CORS configured")
