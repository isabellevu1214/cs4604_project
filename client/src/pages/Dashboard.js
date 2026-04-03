import React from 'react';
import '../styles/Dashboard.css';

function Dashboard({ currentUser }) {
    return (
        <div className="dashboard-view">
            <header className="dashboard-header">
                <div>
                    {/* Use the user's first name dynamically */}
                    <h2 className="greeting">Welcome back, {currentUser.first_name}!</h2>
                    <p className="date-subtitle">January 2026 Overview</p>
                </div>
            </header>

            <div className="dashboard-widgets">
                <div className="widget power-widget">
                    <h3>Daily Spending Power</h3>
                    <p className="power-amount">$45.00</p>
                    <p className="power-subtext">Safe to spend today</p>
                </div>

                <div className="widget alerts-widget">
                    <h3>Upcoming Alerts</h3>
                    <ul>
                        <li>Spotify Student Plan renews in 2 days</li>
                        <li>Rent payment due next week</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;