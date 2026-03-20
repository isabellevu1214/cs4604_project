const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

// Serve the frontend files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Set up the PostgreSQL connection using your local credentials
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'clearpath_finance',
    password: 'postgres',
    port: 5432,
});

// Create an endpoint for the frontend to call and test the database
app.get('/test-db', async (req, res) => {
    try {
        const client = await pool.connect();
        client.release();
        res.json({ success: true });
    } catch (err) {
        console.error("Database connection error:", err);
        res.status(500).json({ success: false });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});