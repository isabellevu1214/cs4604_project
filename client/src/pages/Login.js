import React, { useState } from 'react';

function Login({ onLogin }) {
    const [email, setEmail] = useState('kelsey.mwangi@vt.edu');
    const [password, setPassword] = useState('budgetpass1');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(async (res) => {
                const data = await res.json();
                if (data.success) {
                    onLogin(data.user);
                } else {
                    setError(data.error);
                }
            })
            .catch(() => setError("Could not connect to server."));
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8fafc' }}>
            <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
                <h1 style={{ color: '#68c878', textAlign: 'center', marginBottom: '10px' }}>ClearPath Finance</h1>
                <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '30px' }}>Sign in to manage your budget</p>

                {error && <div style={{ background: '#fee2e2', color: '#ef4444', padding: '10px', borderRadius: '4px', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ marginBottom: '5px', fontWeight: 'bold', color: '#334155' }}>Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1' }} required />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ marginBottom: '5px', fontWeight: 'bold', color: '#334155' }}>Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1' }} required />
                    </div>
                    <button type="submit" style={{ background: '#27ae60', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;