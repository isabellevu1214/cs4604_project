import React, { useState } from 'react';
import BudgetCard from '../components/BudgetCard';

function Budgets() {
    const [budgets] = useState([
        { id: 1, category: 'Dining Out', limit: 120.00, remaining: 45.50 },
        { id: 2, category: 'Subscriptions', limit: 35.00, remaining: 10.01 },
        { id: 3, category: 'Research Travel', limit: 600.00, remaining: 220.00 }
    ]);

    return (
        <div className="view-container">
            <header className="section-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2>🎯 Budgets and Goals</h2>
                <button style={{ background: '#27ae60', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>+ Create New</button>
            </header>

            <h3 style={{ color: '#475569', marginBottom: '15px' }}>Monthly Budgets</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {budgets.map(budget => (
                    <BudgetCard key={budget.id} budget={budget} />
                ))}
            </div>
        </div>
    );
}

export default Budgets;