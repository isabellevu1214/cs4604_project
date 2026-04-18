import React, { useState, useEffect, useCallback } from 'react';

function Analytics({ currentUser }) {
    const [spendingData, setSpendingData] = useState([]);
    const [utilizationData, setUtilizationData] = useState([]);

    const fetchReports = useCallback(() => {
        const headers = { 'Authorization': `Bearer ${currentUser.token}` };

        // Fetch Report 1
        fetch('http://localhost:5000/api/reports/category-spending', { headers })
            .then(res => res.json())
            .then(data => setSpendingData(data));

        // Fetch Report 2
        fetch('http://localhost:5000/api/reports/budget-utilization', { headers })
            .then(res => res.json())
            .then(data => setUtilizationData(data));
    }, [currentUser.token]);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    return (
        <div className="view-container">
            <header className="section-header" style={{ marginBottom: '30px' }}>
                <h2>📈 Analytics and Reports</h2>
                <p style={{ color: 'var(--text-muted)' }}>Interactive breakdown of your financial habits.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>

                {/* Report 1 Card */}
                <div className="widget-card">
                    <h3 className="widget-title" style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '10px' }}>
                        Monthly Spending Breakdown
                    </h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', color: 'var(--text-muted)' }}>
                                <th style={{ padding: '12px 0' }}>Category</th>
                                <th style={{ padding: '12px 0', textAlign: 'right' }}>Total Spent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {spendingData.map((row, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #f8fafc' }}>
                                    <td style={{ padding: '12px 0', fontWeight: '500' }}>{row.category_name}</td>
                                    <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 'bold' }}>
                                        ${parseFloat(row.total_spent).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Report 2 Card */}
                <div className="widget-card">
                    <h3 className="widget-title" style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '10px' }}>
                        Budget Utilization
                    </h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', color: 'var(--text-muted)' }}>
                                <th style={{ padding: '12px 0' }}>Category</th>
                                <th style={{ padding: '12px 0', textAlign: 'right' }}>Limit</th>
                                <th style={{ padding: '12px 0', textAlign: 'right' }}>Spent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {utilizationData.map((row, index) => {
                                const isOverBudget = parseFloat(row.actual_spent) > parseFloat(row.budget_limit);
                                return (
                                    <tr key={index} style={{ borderBottom: '1px solid #f8fafc' }}>
                                        <td style={{ padding: '12px 0', fontWeight: '500' }}>{row.category_name}</td>
                                        <td style={{ padding: '12px 0', textAlign: 'right', color: 'var(--text-muted)' }}>
                                            ${parseFloat(row.budget_limit).toFixed(2)}
                                        </td>
                                        <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 'bold', color: isOverBudget ? 'var(--accent-red)' : 'var(--text-main)' }}>
                                            ${parseFloat(row.actual_spent).toFixed(2)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default Analytics;