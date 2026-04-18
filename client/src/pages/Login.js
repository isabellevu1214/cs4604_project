import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = "106987244634-5si6qkghijvnq5jaa2ad2q2p58730uct.apps.googleusercontent.com";

function Login({ onLogin }) {
    const [error, setError] = useState('');

    const handleSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;

        try {
            // We pass the token as a "Bearer" token in the headers, exactly as server.js expects
            const res = await fetch('http://localhost:5000/api/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();

            if (data.success) {
                // Pass BOTH the user data and the token up to App.js
                onLogin({ ...data.user, token });
            } else {
                setError(data.error || data.reason || "Authentication failed.");
            }
        } catch (err) {
            setError("Could not connect to server.");
        }
    };

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8fafc' }}>
                <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                    <h1 style={{ color: '#68c878', marginBottom: '10px' }}>ClearPath Finance</h1>
                    <p style={{ color: '#64748b', marginBottom: '30px' }}>Securely sign in with your Google account</p>

                    {error && <div style={{ background: '#fee2e2', color: '#ef4444', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>{error}</div>}

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <GoogleLogin
                            onSuccess={handleSuccess}
                            onError={() => setError('Google Login Failed')}
                        />
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}

export default Login;