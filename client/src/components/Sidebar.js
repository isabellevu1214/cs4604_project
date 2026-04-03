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
            {/* Account Button Placeholder */}
            <div style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid #334155' }}>
                <button style={{ width: '100%', background: 'transparent', color: 'white', border: '1px solid #64748b', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>
                    👤 Account Settings
                </button>
            </div>
        </nav>
    );
}

export default Sidebar;