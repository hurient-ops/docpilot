import React, { useState } from 'react';
import Layout from './components/Layout';
import Header from './components/Header';
import MergerScreen from './components/screens/MergerScreen';
import MediaScreen from './components/screens/MediaScreen';
import SecurityScreen from './components/screens/SecurityScreen';
import BillingScreen from './components/screens/BillingScreen';
import CompareScreen from './components/screens/CompareScreen';
import SearchScreen from './components/screens/SearchScreen';
import HistoryScreen from './components/screens/HistoryScreen';
import DirectoryScreen from './components/screens/DirectoryScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import LoginScreen from './components/screens/LoginScreen';
import SynthesisScreen from './components/screens/SynthesisScreen';
import AddInScreen from './components/screens/AddInScreen';

import { api } from './api';

function App() {
  const [currentPath, setCurrentPath] = useState("directory");
  const [hasScannedData, setHasScannedData] = useState<boolean>(true); // Default true, then check
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  React.useEffect(() => {
    api.getDocumentStats().then(res => {
      if (res.status === 'success') {
        setHasScannedData(res.total_files > 0);
      }
    });
  }, []);

  const handleNavigate = (path: string) => {
    if (!hasScannedData && path !== 'directory' && path !== 'settings') {
      alert('스캔된 폴더가 없습니다. 먼저 디렉토리를 스캔하여 데이터베이스를 구축해주세요.');
      return;
    }
    setCurrentPath(path);
  };

  const screens = [
    { id: "directory", component: <DirectoryScreen onNavigate={handleNavigate} /> },
    { id: "search", component: <SearchScreen /> },
    { id: "merger", component: <MergerScreen /> },
    { id: "compare", component: <CompareScreen /> },
    { id: "media", component: <MediaScreen /> },
    { id: "security", component: <SecurityScreen /> },
    { id: "history", component: <HistoryScreen /> },
    { id: "addin", component: <AddInScreen /> },
    { id: "billing", component: <BillingScreen /> },
    { id: "settings", component: <SettingsScreen /> }
  ];

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      <Header currentPath={currentPath} onNavigate={handleNavigate} />
      <Layout onNavigate={handleNavigate}>
        {screens.map(screen => (
          <div key={screen.id} style={{ display: currentPath === screen.id ? 'block' : 'none', height: '100%' }}>
            {screen.component}
          </div>
        ))}
      </Layout>
    </>
  );
}

export default App;
