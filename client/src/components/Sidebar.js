import React from 'react';
import '../styles/Sidebar.css';

function Sidebar({ currentView, setCurrentView }) {
    return (
        <nav className="sidebar">
            <h1 className="brand-title">ClearPath</h1>
            <ul className="nav-links">
                <li
                    className={currentView === 'dashboard' ? 'active' : ''}
                    onClick={() => setCurrentView('dashboard')}
                >
                    Dashboard
                </li>
                <li
                    className={currentView === 'transactions' ? 'active' : ''}
                    onClick={() => setCurrentView('transactions')}
                >
                    Transactions
                </li>
                <li
                    className={currentView === 'budgets' ? 'active' : ''}
                    onClick={() => setCurrentView('budgets')}
                >
                    Budgets & Goals
                </li>
                <li
                    className={currentView === 'analytics' ? 'active' : ''}
                    onClick={() => setCurrentView('analytics')}
                >
                    Analytics & Reports
                </li>
            </ul>

            {/* Account Settings Button */}
            <div style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid #e2e8f0' }}>
                <button
                    onClick={() => setCurrentView('profile')}
                    style={{
                        width: '100%',
                        background: currentView === 'profile' ? '#86b08e' : '#f8fafc',
                        color: currentView === 'profile' ? 'white' : '#334155',
                        border: '1px solid #cbd5e1',
                        padding: '10px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        transition: 'all 0.2s ease'
                    }}
                >
                    👤 Account Settings
                </button>
            </div>
        </nav>
    );
}

export default Sidebar;