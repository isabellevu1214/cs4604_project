import React, { useState, useEffect, useCallback } from 'react';
import BudgetCard from '../components/BudgetCard';

function Budgets({ currentUser }) {
    const [budgets, setBudgets] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Form state initialized with today's date and the end of the current month
    const [formData, setFormData] = useState({
        category_id: '',
        budget_limit: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0]
    });

    const headers = { 'Authorization': `Bearer ${currentUser.token}` };

    const fetchBudgets = useCallback(() => {
        fetch('http://localhost:5000/api/budgets', { headers })
            .then(res => res.json())
            .then(data => setBudgets(data))
            .catch(err => console.error("Failed to fetch budgets", err));
    }, [currentUser.token]);

    const fetchCategories = useCallback(() => {
        fetch('http://localhost:5000/api/categories', { headers })
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                if (data.length > 0) {
                    setFormData(prev => ({ ...prev, category_id: data[0].category_id }));
                }
            });
    }, [currentUser.token]);

    useEffect(() => {
        fetchBudgets();
        fetchCategories();
    }, [fetchBudgets, fetchCategories]);

    const openModal = (budget = null) => {
        if (budget) {
            setEditingId(budget.id);
            setFormData({
                category_id: budget.category_id || categories[0]?.category_id,
                budget_limit: budget.limit,
                start_date: new Date().toISOString().split('T')[0],
                end_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0]
            });
        } else {
            setEditingId(null);
            setFormData({
                category_id: categories[0]?.category_id || '',
                budget_limit: '',
                start_date: new Date().toISOString().split('T')[0],
                end_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0]
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editingId ? `http://localhost:5000/api/budgets/${editingId}` : 'http://localhost:5000/api/budgets';
        const method = editingId ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(() => {
                fetchBudgets();
                closeModal();
            })
            .catch(err => console.error("Error saving budget", err));
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this budget?")) {
            fetch(`http://localhost:5000/api/budgets/${id}`, { method: 'DELETE', headers })
                .then(() => fetchBudgets())
                .catch(err => console.error("Error deleting budget", err));
        }
    };

    return (
        <div className="view-container" style={{ position: 'relative' }}>
            <header className="section-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                <div>
                    <h2 style={{ margin: 0 }}>🎯 Budgets and Goals</h2>
                    <p style={{ color: 'var(--text-muted)', margin: '5px 0 0 0' }}>Manage your monthly spending limits.</p>
                </div>
                <button onClick={() => openModal()} style={{ background: 'var(--accent-green)', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                    + Create Budget
                </button>
            </header>

            <div className="dashboard-grid">
                {budgets.length > 0 ? budgets.map(budget => (
                    <BudgetCard
                        key={budget.id}
                        budget={budget}
                        onEdit={openModal}
                        onDelete={handleDelete}
                    />
                )) : <p style={{ color: 'var(--text-muted)' }}>No budgets found. Create one to get started!</p>}
            </div>

            {/* Simple Inline Modal for Budgets */}
            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'var(--bg-card)', padding: '30px', borderRadius: '12px', width: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ marginTop: 0 }}>{editingId ? "Edit Budget Limit" : "Set New Budget"}</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                            {!editingId && (
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Category</label>
                                    <select name="category_id" value={formData.category_id} onChange={handleInputChange} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                                        {categories.map(cat => (
                                            <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Monthly Limit ($)</label>
                                <input type="number" step="0.01" name="budget_limit" value={formData.budget_limit} onChange={handleInputChange} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                            </div>

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Start Date</label>
                                    <input
                                        type="date"
                                        name="start_date"
                                        value={formData.start_date ? formData.start_date.split('T')[0] : ''}
                                        onChange={handleInputChange}
                                        required
                                        style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>End Date</label>
                                    <input
                                        type="date"
                                        name="end_date"
                                        value={formData.end_date ? formData.end_date.split('T')[0] : ''}
                                        onChange={handleInputChange}
                                        required
                                        style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                                <button type="button" onClick={closeModal} style={{ padding: '10px 15px', border: 'none', background: '#e2e8f0', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                                <button type="submit" style={{ padding: '10px 15px', border: 'none', background: 'var(--accent-green)', color: 'white', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>{editingId ? "Save Changes" : "Create Budget"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Budgets;