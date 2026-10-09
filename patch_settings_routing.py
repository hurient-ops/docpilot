import os

file_path = r'e:\projects\docpilot\frontend\src\components\Layout.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('export default function Layout({ children }: { children: React.ReactNode }) {', 'export default function Layout({ children, onNavigate }: { children: React.ReactNode, onNavigate?: (path: string) => void }) {')
content = content.replace('<Sidebar />', '<Sidebar onNavigate={onNavigate} />')
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

file_path = r'e:\projects\docpilot\frontend\src\components\Sidebar.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('export default function Sidebar() {', 'export default function Sidebar({ onNavigate }: { onNavigate?: (path: string) => void }) {')
content = content.replace("onClick={() => onNavigate('settings')}", "onClick={() => onNavigate && onNavigate('settings')}")
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

file_path = r'e:\projects\docpilot\frontend\src\App.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()
if 'SettingsScreen' not in content:
    content = content.replace("import DirectoryScreen from './components/screens/DirectoryScreen';", "import DirectoryScreen from './components/screens/DirectoryScreen';\nimport SettingsScreen from './components/screens/SettingsScreen';")
    content = content.replace('case "billing": return <BillingScreen />;', 'case "billing": return <BillingScreen />;\n      case "settings": return <SettingsScreen />;')
    content = content.replace('<Layout>', '<Layout onNavigate={setCurrentPath}>')
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
