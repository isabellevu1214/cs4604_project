import React, { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Analytics from './pages/Analytics';
import UserProfile from './pages/UserProfile';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');

  if (!currentUser) {
    return <Login onLogin={setCurrentUser} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard currentUser={currentUser} />;
      case 'transactions': return <Transactions currentUser={currentUser} />;
      case 'budgets': return <Budgets currentUser={currentUser} />;
      case 'analytics': return <Analytics currentUser={currentUser} />;
      case 'profile': return <UserProfile currentUser={currentUser} onLogout={() => setCurrentUser(null)} onUpdateUser={setCurrentUser} />;
      default: return <Dashboard currentUser={currentUser} />;
    }
  };

  return (
    <div className="app-layout" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} currentUser={currentUser} />
      <main className="main-content" style={{ flex: 1, padding: '40px', backgroundColor: '#f8fafc', overflowY: 'auto' }}>
        {renderView()}
      </main>
    </div>
  );
}

export default App;