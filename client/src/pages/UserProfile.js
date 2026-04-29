import React, { useState } from 'react';

function UserProfile({ currentUser, onLogout, onUpdateUser }) {
    // State to hold editable form data
    const [formData, setFormData] = useState({
        first_name: currentUser?.first_name || '',
        last_name: currentUser?.last_name || ''
    });

    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    // Handle input changes
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle updating the user's name
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        try {
            const response = await fetch(`http://localhost:5000/api/users/${currentUser.user_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.token}`
                },
                body: JSON.stringify({
                    first_name: formData.first_name,
                    last_name: formData.last_name
                })
            });

            if (response.ok) {
                setMessage('Profile updated successfully!');
                if (onUpdateUser) {
                    onUpdateUser({
                        ...currentUser,
                        first_name: formData.first_name,
                        last_name: formData.last_name
                    });
                }
            } else {
                setIsError(true);
                setMessage('Failed to update profile. Please try again.');
            }
        } catch (error) {
            setIsError(true);
            setMessage('Server error. Could not connect.');
        }
    };

    // Handle secure account deletion
    const handleDeleteAccount = async () => {
        const isConfirmed = window.confirm(
            "Are you absolutely sure you want to delete your account? This will permanently erase all your transactions, budgets, and goals. This action cannot be undone."
        );

        if (isConfirmed) {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${currentUser.user_id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${currentUser.token}` }
                });

                if (response.ok) {
                    // Account deleted from database, now log them out
                    handleLogoutAction();
                } else {
                    alert("Failed to delete account. Please try again.");
                }
            } catch (error) {
                alert("Server error. Could not connect.");
            }
        }
    };

    // Handle logging out
    const handleLogoutAction = () => {
        // Clear any stored tokens (adjust if you use sessionStorage or cookies)
        localStorage.removeItem('token');

        // Trigger parent logout function or forcefully redirect to login page
        if (onLogout) {
            onLogout();
        } else {
            window.location.href = '/login';
        }
    };

    return (
        <div style={{ padding: '24px', boxSizing: 'border-box', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 24px 0', color: '#334155' }}>
                Account Settings
            </h2>

            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>

                {/* Profile Update Form */}
                <h3 style={{ fontSize: '1.25rem', color: '#1e293b', marginTop: 0, marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
                    Personal Information
                </h3>

                <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', color: '#334155', marginBottom: '5px' }}>First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                required
                                style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', color: '#334155', marginBottom: '5px' }}>Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                required
                                style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', color: '#334155', marginBottom: '5px' }}>Email Address (Managed by Google)</label>
                        <input
                            type="email"
                            value={currentUser?.email || ''}
                            disabled
                            style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box', backgroundColor: '#f1f5f9', color: '#64748b', cursor: 'not-allowed' }}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
                        <button type="submit" style={{ backgroundColor: '#86b08e', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                            Update Profile
                        </button>
                    </div>

                    {message && (
                        <p style={{ fontSize: '0.875rem', marginTop: '10px', color: isError ? '#ef4444' : '#16a34a', fontWeight: 'bold' }}>
                            {message}
                        </p>
                    )}
                </form>

                {/* Account Actions (Logout & Delete) */}
                <h3 style={{ fontSize: '1.25rem', color: '#1e293b', marginTop: '40px', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
                    Account Actions
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                        <div>
                            <strong style={{ display: 'block', color: '#334155' }}>Log Out</strong>
                            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Securely sign out of your ClearPath Finance session.</span>
                        </div>
                        <button onClick={handleLogoutAction} style={{ backgroundColor: '#e2e8f0', color: '#0f172a', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                            Sign Out
                        </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: '#fef2f2', borderRadius: '6px', border: '1px solid #fecaca' }}>
                        <div>
                            <strong style={{ display: 'block', color: '#991b1b' }}>Danger Zone</strong>
                            <span style={{ fontSize: '0.875rem', color: '#b91c1c' }}>Permanently delete your account and all associated data.</span>
                        </div>
                        <button onClick={handleDeleteAccount} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                            Delete Account
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default UserProfile;