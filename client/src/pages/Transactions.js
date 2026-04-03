import React, { useState, useEffect } from 'react';
import QuickAddModal from '../components/QuickAddModal';

function Transactions({ currentUser }) {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        category_id: '',
        amount: '',
        expense_date: '',
        payment_method: 'Debit Card',
        notes: ''
    });

    useEffect(() => {
        fetchExpenses();
        fetchCategories();
    }, []);

    const fetchExpenses = () => {
        fetch(`http://localhost:5000/api/expenses/${currentUser.user_id}`)
            .then(res => res.json())
            .then(data => setExpenses(data));
    };

    const fetchCategories = () => {
        fetch('http://localhost:5000/api/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                if (data.length > 0) {
                    setFormData(prev => ({ ...prev, category_id: data[0].category_id }));
                }
            });
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const openModal = (expense = null) => {
        if (expense) {
            setFormData({
                category_id: categories.find(c => c.category_name === expense.category_name)?.category_id || categories[0].category_id,
                amount: expense.amount,
                expense_date: expense.expense_date.split('T')[0],
                payment_method: expense.payment_method,
                notes: expense.notes || ''
            });
            setEditingId(expense.expense_id);
        } else {
            setFormData({
                category_id: categories[0]?.category_id || '',
                amount: '',
                expense_date: new Date().toISOString().split('T')[0],
                payment_method: 'Debit Card',
                notes: ''
            });
            setEditingId(null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = editingId ? `http://localhost:5000/api/expenses/${editingId}` : 'http://localhost:5000/api/expenses';
        const method = editingId ? 'PUT' : 'POST';

        // Attach her ID to the payload before sending
        const payload = { ...formData, user_id: currentUser.user_id };

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(async (res) => {
                if (!res.ok) {
                    const errData = await res.json();
                    alert(`Error: ${errData.error}`);
                    throw new Error(errData.error);
                }
                return res.json();
            })
            .then(() => {
                fetchExpenses();
                closeModal();
            })
            .catch(err => console.error("Request failed", err));
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this expense?")) {
            fetch(`http://localhost:5000/api/expenses/${id}`, { method: 'DELETE' })
                .then(() => fetchExpenses());
        }
    };

    return (
        <div className="view-container">
            <header className="section-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2>📋 Central Ledger</h2>
                <button onClick={() => openModal()} style={{ background: '#27ae60', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>+ Add Expense</button>
            </header>

            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
                <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9' }}>
                        <th style={{ padding: '12px' }}>Date</th>
                        <th style={{ padding: '12px' }}>Category</th>
                        <th style={{ padding: '12px' }}>Amount</th>
                        <th style={{ padding: '12px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(exp => (
                        <tr key={exp.expense_id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '12px' }}>{exp.expense_date.split('T')[0]}</td>
                            <td style={{ padding: '12px' }}>{exp.category_name}</td>
                            <td style={{ padding: '12px', fontWeight: 'bold' }}>${parseFloat(exp.amount).toFixed(2)}</td>
                            <td style={{ padding: '12px' }}>
                                <button onClick={() => openModal(exp)} style={{ marginRight: '10px', background: '#f59e0b', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>Edit</button>
                                <button onClick={() => handleDelete(exp.expense_id)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <QuickAddModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                categories={categories}
                editingId={editingId}
            />
        </div>
    );
}

export default Transactions;