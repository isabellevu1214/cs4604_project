import React from 'react';
import '../styles/Dashboard.css';

function Dashboard({ currentUser }) {
    // We can dynamically grab the current month for the subtitle
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
        <div className="dashboard-view">
            <header className="dashboard-header">
                <h2 className="greeting">Welcome back, {currentUser.first_name || 'User'}! 👋</h2>
                <p className="date-subtitle">Here is your {currentMonth} overview.</p>
            </header>

            <div className="dashboard-grid">
                
                {/* Module 1: Spending Power */}
                <div className="widget-card">
                    <h3 className="widget-title">Daily Spending Power</h3>
                    <p className="widget-amount">$45.00</p>
                    <div>
                        <span className="pill-tag pill-green">+ Safe to spend</span>
                    </div>
                </div>

                {/* Module 2: Monthly Budget Status */}
                <div className="widget-card">
                    <h3 className="widget-title">Monthly Budget</h3>
                    <p className="widget-amount">$845.50</p>
                    <div>
                        <span className="pill-tag pill-purple">65% Utilized</span>
                    </div>
                </div>

                {/* Module 3: Upcoming Alerts (Takes up more room) */}
                <div className="widget-card" style={{ gridColumn: 'span 2' }}>
                    <h3 className="widget-title">Upcoming Payments</h3>
                    <ul className="alerts-list">
                        <li className="alert-item">
                            <span className="alert-name">📱 Spotify Premium</span>
                            <span className="alert-date">Renews in 2 days</span>
                        </li>
                        <li className="alert-item">
                            <span className="alert-name">🏠 Apartment Rent</span>
                            <span className="alert-date">Due next week</span>
                        </li>
                        <li className="alert-item">
                            <span className="alert-name">⚡ Electric Bill</span>
                            <span className="alert-date">Due in 12 days</span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;