import React from 'react';

function BudgetCard({ budget }) {
    const spent = budget.limit - budget.remaining;
    const percent = Math.min((spent / budget.limit) * 100, 100);

    let color = '#22c55e';
    if (percent >= 50 && percent < 85) color = '#f59e0b';
    if (percent >= 85) color = '#ef4444';

    return (
        <div className="budget-card">
            <div className="card-top">
                <h4>{budget.category}</h4>
                <span className="fraction">${spent.toFixed(2)} / ${budget.limit.toFixed(2)}</span>
            </div>
            <div className="progress-track">
                <div
                    className="progress-fill"
                    style={{ width: `${percent}%`, backgroundColor: color }}
                ></div>
            </div>
            <p className="card-bottom">
                <strong style={{ color }}>${budget.remaining.toFixed(2)}</strong> remaining
                {percent >= 85 && <span className="warning-icon">⚠️ Near Limit</span>}
            </p>
        </div>
    );
}

export default BudgetCard;