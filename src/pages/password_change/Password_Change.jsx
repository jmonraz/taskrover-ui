// PasswordChangeComponent.jsx

import React, { useState } from 'react';
import { updatePassword } from 'firebase/auth';
import { auth } from '../../services/firebaseService';
import styles from "../loginpage/LoginPage.module.css";

const PasswordChangeComponent = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleChangePassword = async () => {
        try {
            // Check if newPassword and confirmPassword match
            if (newPassword !== confirmPassword) {
                setError('New passwords do not match.');
                return;
            }

            // Update the user's password
            await updatePassword(auth.currentUser, newPassword);

            // Password changed successfully
            setError('');
            console.log('Password changed successfully!');
        } catch (error) {
            setError(`Password change failed: ${error.message}`);
        }
    };

    return (
        <div className={styles['login-container']}>
        <div className={styles['form-wrapper']}>
            <h2>Change Password</h2>
            <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleChangePassword}>Change Password</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        </div>
    );
};

export default PasswordChangeComponent;
