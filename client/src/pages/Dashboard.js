import React, { useState, useEffect, useCallback } from 'react';
import FinancialLiteracyHub from '../components/FinancialLiteracyHub';

function Dashboard({ currentUser }) {
    const [budgets, setBudgets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBudgetData = useCallback(async () => {
        try {
            const res = await fetch('http://localhost:5000/api/budgets', {
                headers: { 'Authorization': `Bearer ${currentUser.token}` }
            });
            const data = await res.json();
            const budgetArray = Array.isArray(data) ? data : (data.data || []);
            setBudgets(budgetArray);
        } catch (err) {
            console.error("Failed to fetch budget data", err);
        } finally {
            setIsLoading(false);
        }
    }, [currentUser.token]);

    useEffect(() => {
        fetchBudgetData();
    }, [fetchBudgetData]);

    // FIXED: Using b.limit and b.remaining to match your SQL aliases
    const totalLimit = budgets.reduce((sum, b) => sum + (parseFloat(b.limit) || 0), 0);
    const totalRemaining = budgets.reduce((sum, b) => sum + (parseFloat(b.remaining) || 0), 0);
    const totalSpent = totalLimit - totalRemaining;
    const overallUtilization = totalLimit > 0 ? ((totalSpent / totalLimit) * 100).toFixed(1) : 0;

    const getDaysRemaining = (endDateStr) => {
        if (!endDateStr) return 999;
        const today = new Date();
        const endDate = new Date(endDateStr);
        return Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    };

    if (isLoading) return <div style={{ padding: '24px' }}>Loading dashboard data...</div>;

    return (
        <div style={{ padding: '24px', boxSizing: 'border-box' }}>
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 24px 0', color: '#334155' }}>
                Welcome back, {currentUser.first_name}! 👋
            </h2>
            
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                
                {/* LEFT COLUMN: Budget Modules */}
                <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    {/* Module 1: Total Monthly Budget */}
                    <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderTop: '4px solid #86b08e' }}>
                        <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: '#334155' }}>Total Monthly Budget</h3>
                        
                        {budgets.length === 0 ? (
                            <p style={{ color: '#64748b', fontSize: '0.875rem', fontStyle: 'italic' }}>No active budgets found. Head to Budgets & Goals to start.</p>
                        ) : (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1e293b' }}>${totalSpent.toFixed(2)}</span>
                                    <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 'bold' }}>/ ${totalLimit.toFixed(2)} limit</span>
                                </div>
                                
                                <div style={{ width: '100%', backgroundColor: '#e2e8f0', borderRadius: '999px', height: '10px', marginBottom: '8px', overflow: 'hidden' }}>
                                    <div style={{ 
                                        height: '100%', 
                                        backgroundColor: overallUtilization > 90 ? '#ef4444' : overallUtilization > 75 ? '#f59e0b' : '#86b08e',
                                        width: `${Math.min(overallUtilization, 100)}%`,
                                        transition: 'width 0.3s ease'
                                    }}></div>
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                    <span style={{ color: '#64748b' }}>{overallUtilization}% Utilized</span>
                                    <span style={{ color: overallUtilization > 90 ? '#ef4444' : '#86b08e' }}>${totalRemaining.toFixed(2)} remaining</span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Module 2: Budget Breakdown */}
                    <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ margin: '0 0 20px 0', fontSize: '1.1rem', color: '#334155' }}>Budget Breakdown</h3>
                        
                        {budgets.length === 0 ? (
                            <p style={{ color: '#64748b', fontSize: '0.875rem', fontStyle: 'italic' }}>Waiting for budget data...</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {budgets.map(budget => {
                                    // FIXED: Using budget.limit and budget.remaining
                                    const limit = parseFloat(budget.limit) || 0;
                                    const remaining = parseFloat(budget.remaining) || 0;
                                    const spent = limit - remaining;
                                    const percent = limit > 0 ? ((spent / limit) * 100).toFixed(0) : 0;
                                    const daysLeft = getDaysRemaining(budget.end_date);
                                    
                                    return (
                                        <div key={budget.id}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '4px' }}>
                                                {/* FIXED: Using budget.category */}
                                                <span style={{ fontWeight: 'bold', color: '#334155' }}>{budget.category}</span>
                                                <span style={{ color: '#64748b', fontWeight: 'bold' }}>{percent}%</span>
                                            </div>
                                            
                                            <div style={{ width: '100%', backgroundColor: '#f1f5f9', borderRadius: '999px', height: '6px', overflow: 'hidden' }}>
                                                <div style={{ 
                                                    height: '100%', 
                                                    backgroundColor: percent > 90 ? '#ef4444' : '#94a3b8',
                                                    width: `${Math.min(percent, 100)}%`
                                                }}></div>
                                            </div>

                                            {daysLeft <= 7 && daysLeft >= 0 && (
                                                <div style={{ color: '#d97706', fontSize: '0.75rem', fontWeight: 'bold', marginTop: '6px' }}>
                                                    ⚠️ Ends in {daysLeft} {daysLeft === 1 ? 'day' : 'days'}. Remember to renew!
                                                </div>
                                            )}
                                            {daysLeft < 0 && (
                                                <div style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 'bold', marginTop: '6px' }}>
                                                    ❌ Budget ended. Please update dates.
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN: Financial Literacy Hub */}
                <div style={{ flex: '2 1 450px' }}>
                    <FinancialLiteracyHub />
                </div>
                
            </div>
        </div>
    );
}

export default Dashboard;