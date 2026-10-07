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

function App() {
  const [currentPath, setCurrentPath] = useState("directory");

  const renderScreen = () => {
    switch (currentPath) {
      case "directory": return <DirectoryScreen />;
      case "search": return <SearchScreen />;
      case "merger": return <MergerScreen />;
      case "compare": return <CompareScreen />;
      case "media": return <MediaScreen />;
      case "security": return <SecurityScreen />;
      case "history": return <HistoryScreen />;
      case "billing": return <BillingScreen />;
      default: return <DirectoryScreen />;
    }
  };

  return (
    <>
      <Header currentPath={currentPath} onNavigate={setCurrentPath} />
      <Layout>
        {renderScreen()}
      </Layout>
    </>
  );
}

export default App;
