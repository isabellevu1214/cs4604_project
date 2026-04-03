const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'clearpath_finance',
    password: 'postgres',
    port: 5432,
});

// Test Connection
app.get('/api/status', async (req, res) => {
    try {
        const client = await pool.connect();
        client.release();
        res.json({ success: true, message: "Connected to PostgreSQL" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Connection Failed" });
    }
});

// --- AUTHENTICATION ---
// NEW: Login a user and verify credentials against the database
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM app_user WHERE email = $1 AND password = $2', [email, password]);
        if (result.rows.length > 0) {
            res.json({ success: true, user: result.rows[0] });
        } else {
            res.status(401).json({ success: false, error: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- USERS ---
// READ: Get all users
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM app_user ORDER BY user_id ASC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CREATE: Insert a new user
app.post('/api/users', async (req, res) => {
    const { first_name, last_name, email, password, user_type } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO app_user (first_name, last_name, email, password, user_type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [first_name, last_name, email, password, user_type]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE: Update an existing user
app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, password, user_type } = req.body;
    try {
        const result = await pool.query(
            'UPDATE app_user SET first_name = $1, last_name = $2, email = $3, password = $4, user_type = $5 WHERE user_id = $6 RETURNING *',
            [first_name, last_name, email, password, user_type, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE: Delete a user
app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM app_user WHERE user_id = $1', [id]);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- CATEGORIES ---
// READ: Get all categories for the dropdown menu
app.get('/api/categories', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM category WHERE category_type = 'Expense' ORDER BY category_name ASC");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- EXPENSES ---
// UPDATED: Get all expenses for a SPECIFIC user
app.get('/api/expenses/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const query = `
            SELECT e.expense_id, e.amount, e.expense_date, e.payment_method, e.notes, c.category_name 
            FROM expense e
            JOIN category c ON e.category_id = c.category_id
            WHERE e.user_id = $1
            ORDER BY e.expense_date DESC
        `;
        const result = await pool.query(query, [userId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATED: Insert a new expense for a SPECIFIC user
app.post('/api/expenses', async (req, res) => {
    const { user_id, category_id, amount, expense_date, payment_method, notes } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO expense (user_id, category_id, amount, expense_date, payment_method, notes, is_reimbursable) VALUES ($1, $2, $3, $4, $5, $6, FALSE) RETURNING *',
            [user_id, category_id, amount, expense_date, payment_method, notes]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE: Modify an existing expense
app.put('/api/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const { category_id, amount, expense_date, payment_method, notes } = req.body;
    try {
        const result = await pool.query(
            'UPDATE expense SET category_id = $1, amount = $2, expense_date = $3, payment_method = $4, notes = $5 WHERE expense_id = $6 RETURNING *',
            [category_id, amount, expense_date, payment_method, notes, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE: Remove an expense
app.delete('/api/expenses/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM expense WHERE expense_id = $1', [id]);
        res.json({ message: "Expense deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
});