import React from 'react';

function QuickAddModal({ isOpen, closeModal, formData, handleInputChange, handleSubmit, categories, editingId }) {
    if (!isOpen) return null;

    // Common style for inputs
    const inputStyle = {
        width: '100%',
        padding: '10px',
        border: '1px solid #cbd5e1',
        borderRadius: '6px',
        boxSizing: 'border-box',
        marginTop: '5px',
        fontFamily: 'inherit'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: 'bold',
        color: '#334155'
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark semi-transparent overlay
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '12px',
                width: '450px',
                maxWidth: '90%',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b', marginTop: 0, marginBottom: '20px' }}>
                    {editingId ? 'Edit Expense' : 'Log New Expense'}
                </h3>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label style={labelStyle}>Category</label>
                        <select 
                            name="category_id" 
                            value={formData.category_id} 
                            onChange={handleInputChange}
                            required
                            style={inputStyle}
                        >
                            <option value="" disabled>Select a category...</option>
                            {categories.map((cat) => (
                                <option key={cat.category_id} value={cat.category_id}>
                                    {cat.category_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label style={labelStyle}>Amount ($)</label>
                        <input 
                            type="number" 
                            name="amount" 
                            step="0.01" 
                            min="0.01"
                            value={formData.amount} 
                            onChange={handleInputChange}
                            required
                            placeholder="0.00"
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Date</label>
                            <input 
                                type="date" 
                                name="expense_date" 
                                value={formData.expense_date} 
                                onChange={handleInputChange}
                                required
                                style={inputStyle}
                            />
                        </div>

                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Payment Method</label>
                            <select 
                                name="payment_method" 
                                value={formData.payment_method} 
                                onChange={handleInputChange}
                                required
                                style={inputStyle}
                            >
                                <option value="Debit Card">Debit Card</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="Cash">Cash</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                                <option value="Mobile Pay">Mobile Pay</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>Notes</label>
                        <input 
                            type="text" 
                            name="notes" 
                            value={formData.notes} 
                            onChange={handleInputChange}
                            placeholder="E.g., Coffee before class"
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '15px' }}>
                        <button 
                            type="button" 
                            onClick={closeModal}
                            style={{
                                backgroundColor: '#e2e8f0',
                                color: '#0f172a',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '6px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            style={{
                                backgroundColor: '#86b08e', // Matches your budget button green
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '6px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            {editingId ? 'Save Changes' : 'Save Expense'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default QuickAddModal;