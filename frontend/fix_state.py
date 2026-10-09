import re

file_path = r'e:\projects\docpilot\frontend\src\components\screens\DirectoryScreen.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

state_init_pattern = re.compile(r'const \[scanPath, setScanPath\] = useState\(\"\"\);\s*const \[scanResult, setScanResult\] = useState<any>\(null\);', re.DOTALL)

state_new_logic = '''const [scanPath, setScanPathState] = useState(() => sessionStorage.getItem('docpilot_scanPath') || "");
  const [scanResult, setScanResultState] = useState<any>(() => {
    const saved = sessionStorage.getItem('docpilot_scanResult');
    return saved ? JSON.parse(saved) : null;
  });

  const setScanPath = (path: string) => {
    setScanPathState(path);
    sessionStorage.setItem('docpilot_scanPath', path);
  };

  const setScanResult = (result: any) => {
    setScanResultState(result);
    if (result) {
      sessionStorage.setItem('docpilot_scanResult', JSON.stringify(result));
    } else {
      sessionStorage.removeItem('docpilot_scanResult');
    }
  };'''

content = state_init_pattern.sub(state_new_logic, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated State Persistence")
