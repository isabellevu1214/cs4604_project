const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

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

const googleClient = new OAuth2Client();

//lowercase and trim email so its easier to look up emails in database
function normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
}

//create or update user from google profile
//admin logic reds from env variables 
async function upsertUserFromGoogleProfile({ googleSub, email, firstName, lastName }) {
    const normalizedEmail = normalizeEmail(email);
    const adminEmails = (process.env.ADMIN_EMAILS || '')
        .split(',')
        .map((e) => normalizeEmail(e))
        .filter(Boolean);
    const allowSelfSignup = (process.env.ALLOW_SELF_SIGNUP || 'true').toLowerCase() === 'true';
    const shouldBeAdmin = adminEmails.includes(normalizedEmail);

    const existing = await pool.query(
        `SELECT user_id, email, user_role, account_status
         FROM app_user
         WHERE email = $1
         LIMIT 1`,
        [normalizedEmail]
    );

    if (existing.rows.length === 0) {
        if (!allowSelfSignup && !shouldBeAdmin) {
            return { ok: false, reason: 'not_invited' };
        }

        const created = await pool.query(
            `INSERT INTO app_user (google_sub, first_name, last_name, email, user_role, account_status)
             VALUES ($1, $2, $3, $4, $5, 'active')
             RETURNING user_id, email, first_name, last_name, user_role, account_status`,
            [googleSub, firstName, lastName, normalizedEmail, shouldBeAdmin ? 'admin' : 'user']
        );
        return { ok: true, user: created.rows[0] };
    }

    const row = existing.rows[0];
    if (row.account_status === 'disabled') {
        return { ok: false, reason: 'disabled' };
    }

    const updated = await pool.query(
        `UPDATE app_user
         SET google_sub = COALESCE(google_sub, $1),
             first_name = COALESCE(first_name, $2),
             last_name = COALESCE(last_name, $3),
             user_role = CASE WHEN $5 THEN 'admin' ELSE user_role END,
             account_status = 'active'
         WHERE user_id = $4
         RETURNING user_id, email, first_name, last_name, user_role, account_status`,
        [googleSub, firstName, lastName, row.user_id, shouldBeAdmin]
    );
    return { ok: true, user: updated.rows[0] };
}

// reads our header bearer token and calls google client to verify it 
async function getUserFromBearerToken(req) {
    const auth = req.headers.authorization || '';
    const [scheme, token] = auth.split(' ');
    if (scheme !== 'Bearer' || !token) return null;

    const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload?.email || !payload?.sub) return null;

    const firstName = payload.given_name || null;
    const lastName = payload.family_name || null;
    const upserted = await upsertUserFromGoogleProfile({
        googleSub: payload.sub,
        email: payload.email,
        firstName,
        lastName,
    });
    if (!upserted.ok) return null;
    return upserted.user;
}

// loads and creates our user obj in db and verifies google token
async function requireAuth(req, res, next) {
    try {
        const user = await getUserFromBearerToken(req);
        if (!user) return res.status(401).json({ success: false, error: 'Unauthorized' });
        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
}
// checks if user is admin
function requireAdmin(req, res, next) {
    if (req.user?.user_role === 'admin') return next();
    return res.status(403).json({ success: false, error: 'Forbidden (admin only)' });
}

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

// AUTHENTICATION  
app.get('/api/me', requireAuth, (req, res) => {
    res.json({ success: true, user: req.user });
});

app.post('/api/logout', (_req, res) => {
    res.json({ success: true });
});

app.get('/api/account/password', requireAuth, (_req, res) => {
    res.json({
        success: true,
        message: 'Password changes are handled by Google for Google-authenticated accounts.',
        url: 'https://myaccount.google.com/security',
    });
});

// --- USERS ---
app.get('/api/users', requireAuth, requireAdmin, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT user_id, email, first_name, last_name, user_role, account_status
             FROM app_user
             ORDER BY user_id ASC`
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CREATE (admin only)
app.post('/api/users', requireAuth, requireAdmin, async (req, res) => {
    const { email, first_name, last_name, user_role } = req.body;
    try {
        const normalizedEmail = normalizeEmail(email);
        const role = user_role === 'admin' ? 'admin' : 'user';
        const result = await pool.query(
            `INSERT INTO app_user (first_name, last_name, email, user_role, account_status, created_by_user_id)
             VALUES ($1, $2, $3, $4, 'invited', $5)
             ON CONFLICT (email) DO UPDATE
               SET account_status = CASE WHEN app_user.account_status = 'disabled' THEN 'disabled' ELSE 'invited' END,
                   user_role = EXCLUDED.user_role
             RETURNING user_id, email, first_name, last_name, user_role, account_status`,
            [first_name || null, last_name || null, normalizedEmail, role, req.user.user_id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE (admin only)
app.put('/api/users/:id', requireAuth, requireAdmin, async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, user_role, account_status } = req.body;
    try {
        const normalizedEmail = email ? normalizeEmail(email) : null;
        const role = user_role === 'admin' ? 'admin' : user_role === 'user' ? 'user' : null;
        const status =
            account_status === 'invited' || account_status === 'active' || account_status === 'disabled'
                ? account_status
                : null;
        const result = await pool.query(
            `UPDATE app_user
             SET first_name = COALESCE($1, first_name),
                 last_name = COALESCE($2, last_name),
                 email = COALESCE($3, email),
                 user_role = COALESCE($4, user_role),
                 account_status = COALESCE($5, account_status)
             WHERE user_id = $6
             RETURNING user_id, email, first_name, last_name, user_role, account_status`,
            [first_name ?? null, last_name ?? null, normalizedEmail, role, status, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE (admin only): Delete a user
app.delete('/api/users/:id', requireAuth, requireAdmin, async (req, res) => {
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
app.get('/api/categories', requireAuth, async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM category WHERE category_type = 'Expense' ORDER BY category_name ASC");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- EXPENSES ---
app.get('/api/expenses', requireAuth, async (req, res) => {
    try {
        const query = `
            SELECT e.expense_id, e.amount, e.expense_date, e.payment_method, e.notes, c.category_name 
            FROM expense e
            JOIN category c ON e.category_id = c.category_id
            WHERE e.user_id = $1
            ORDER BY e.expense_date DESC
        `;
        const result = await pool.query(query, [req.user.user_id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATED: Insert a new expense for a SPECIFIC user
app.post('/api/expenses', requireAuth, async (req, res) => {
    const { category_id, amount, expense_date, payment_method, notes } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO expense (user_id, category_id, amount, expense_date, payment_method, notes, is_reimbursable) VALUES ($1, $2, $3, $4, $5, $6, FALSE) RETURNING *',
            [req.user.user_id, category_id, amount, expense_date, payment_method, notes]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE: Modify an existing expense
app.put('/api/expenses/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { category_id, amount, expense_date, payment_method, notes } = req.body;
    try {
        const result = await pool.query(
            `UPDATE expense
             SET category_id = $1, amount = $2, expense_date = $3, payment_method = $4, notes = $5
             WHERE expense_id = $6 AND user_id = $7
             RETURNING *`,
            [category_id, amount, expense_date, payment_method, notes, id, req.user.user_id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE: Remove an expense
app.delete('/api/expenses/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM expense WHERE expense_id = $1 AND user_id = $2', [id, req.user.user_id]);
        res.json({ message: "Expense deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
});