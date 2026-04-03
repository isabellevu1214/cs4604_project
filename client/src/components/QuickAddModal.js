import React from 'react';

function QuickAddModal({
    isOpen,
    closeModal,
    formData,
    handleInputChange,
    handleSubmit,
    categories,
    editingId
}) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{editingId ? "Update Expense" : "Log New Expense"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category_id" value={formData.category_id} onChange={handleInputChange}>
                            {categories.map(cat => (
                                <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Amount ($)</label>
                        <input type="number" step="0.01" name="amount" value={formData.amount} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input type="date" name="expense_date" value={formData.expense_date} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Payment Method</label>
                        <select name="payment_method" value={formData.payment_method} onChange={handleInputChange}>
                            <option value="Cash">Cash</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Mobile Pay">Mobile Pay</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Notes</label>
                        <input type="text" name="notes" placeholder="E.g., Coffee before class" value={formData.notes} onChange={handleInputChange} />
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
                        <button type="submit" className="submit-btn">{editingId ? "Save Changes" : "Save Expense"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default QuickAddModal;