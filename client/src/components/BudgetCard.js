import React from 'react';

function BudgetCard({ budget, onEdit, onDelete }) {
    const limit = parseFloat(budget.limit);
    const remaining = parseFloat(budget.remaining);
    const spent = limit - remaining;
    const percent = Math.min((spent / limit) * 100, 100);

    let color = 'var(--accent-green)';
    if (percent >= 50 && percent < 85) color = 'var(--accent-yellow)';
    if (percent >= 85) color = 'var(--accent-red)';

    return (
        <div className="widget-card" style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <h4 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.2rem' }}>{budget.category}</h4>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => onEdit(budget)} style={{ background: '#f59e0b', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>Edit</button>
                    <button onClick={() => onDelete(budget.id)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>Delete</button>
                </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <span>Spent: ${spent.toFixed(2)}</span>
                <span>Limit: ${limit.toFixed(2)}</span>
            </div>
            
            <div style={{ background: '#e2e8f0', borderRadius: '8px', height: '14px', width: '100%', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ height: '100%', width: `${percent}%`, backgroundColor: color, borderRadius: '8px', transition: 'width 0.3s ease' }}></div>
            </div>
            
            <p style={{ margin: 0, fontSize: '0.95rem' }}>
                <strong style={{ color }}>${remaining.toFixed(2)}</strong> remaining
                {percent >= 85 && <span style={{ marginLeft: '10px', fontSize: '0.85rem', color: 'var(--accent-red)' }}>⚠️ Near Limit</span>}
            </p>
        </div>
    );
}

export default BudgetCard;