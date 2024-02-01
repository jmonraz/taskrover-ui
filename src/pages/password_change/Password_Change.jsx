import React, { useState } from 'react';
import { updatePassword } from 'firebase/auth';
import { auth, db } from '../../services/firebaseService';
import styles from "../loginpage/LoginPage.module.css";
import { updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/taskrover-logo-small.png";
import Button from "../../components/Button";

const PasswordChangeComponent = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [changeSubmitted, setChangeSubmitted] = useState(false);

    const navigate = useNavigate();

    const handleChangePassword = async () => {
        try {
            // Check if newPassword and confirmPassword match
            if (newPassword !== confirmPassword) {
                setError('New passwords do not match.');
                return;
            }

            // Update the user's password
            await updatePassword(auth.currentUser, newPassword);

            // Update user document to mark firstLogin as false
            const userDocRef = doc(db, 'users', auth.currentUser.uid);
            await updateDoc(userDocRef, { firstLogin: false });

            // Password changed successfully
            setError('');
            setChangeSubmitted(true);
        } catch (error) {
            setError(`Password change failed: ${error.message}`);
        }
    };

    const handleDone = () => {
        navigate('/home');
    };

    return (
        <div className={styles['login-container']}>
            <div className={styles['form-wrapper']}>
                <img src={logo} alt="TaskRover Logo" className={styles['login-logo']}/>
                {changeSubmitted ? (
                    <>
                    <form className={styles['login-form']} >
                        <h2>Password Changed Successfully!</h2>
                        <Button styleName='green-button' type="submit" onClick={handleDone}>Done</Button>
                    </form>

                    </>
                ) : (
                    <>
                    <form className={styles['login-form']} >
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

                        <Button  styleName='green-button' type="submit" onClick={handleChangePassword}>Change Password</Button>
                        {error && <p style={{color: 'red'}}>{error}</p>}
                    </form>

                    </>
                )}
            </div>
        </div>
    );
};

export default PasswordChangeComponent;
