import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {addDoc, collection, doc, setDoc} from 'firebase/firestore';
import {auth, db} from '../../services/firebaseService';
import styles from "./CreateAccount.module.css";

const CreateAccount = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [firstName , setFirstName] = useState('');
    const [lastName , setLastName] = useState('');

    const handleRegistration = async () => {
        if (!email || !password || !selectedRole || selectedRole === '') {
            alert("Please fill in all the required fields marked with an asterisk (*)");
            return;
        }
        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Add user to Firestore with the selected role
            const userDocRef = await setDoc(doc(db, 'users', user.uid),{
                email: user.email,
                firstName: firstName,
                lastName: lastName,
                role: selectedRole,
                firstLogin: true,
            });

            console.log('User registered successfully:', user);
        } catch (error) {
            console.error('Registration error:', error.message);
        }
    };
    const handleCancel = () => {
    setEmail('');
    setPassword('');
    setSelectedRole('');
    setFirstName('');
    setLastName('');
    };

    return (
        <>
            <div className={styles["account-container"]}>
                <form className={styles["account-form"]}>
                    <h2>Registration Page</h2>

                    <div className={styles["form-row"]}>
                        <div className={styles["form-column"]}>
                            <div className={styles["form-pair"]}>
                                <label htmlFor="email" className={styles.required}>Email:</label>
                                <input autoComplete="off" id="email" value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}/>
                            </div>
                        </div>
                    </div>

                    <div className={styles["form-row"]}>
                        <div className={styles["form-column"]}>
                            <div className={styles["form-pair"]}>
                                <label htmlFor="fName" className={styles.required}>First Name:</label>
                                <input autoComplete="off" id="fName" value={firstName}
                                       onChange={(e) => setFirstName(e.target.value)}
                                       style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}/>
                            </div>
                        </div>
                    </div>

                    <div className={styles["form-row"]}>
                        <div className={styles["form-column"]}>
                            <div className={styles["form-pair"]}>
                                <label htmlFor="lName" className={styles.required}>Last Name:</label>
                                <input autoComplete="off" id="lName" value={lastName}
                                       onChange={(e) => setLastName(e.target.value)}
                                       style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}/>
                            </div>
                        </div>
                    </div>

                    <div className={styles["form-row"]}>
                        <div className={styles["form-column"]}>
                            <div className={styles["form-pair"]}>
                                <label htmlFor="password" className={styles.required}>Password:</label>
                                <input autoComplete="off" id="password" value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}/>
                            </div>
                        </div>
                    </div>

                    <div className={styles["form-row"]}>
                        <div className={styles["form-column"]}>
                            <div className={styles["form-pair"]}>
                                <label className={styles.required}>Role:</label>
                                <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}
                                        style={{width: '100%', padding: '8px', boxSizing: 'border-box'}}>
                                    <option value="">Select a Role</option>
                                    <option value="user">User</option>
                                    <option value="agent">Agent</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
            <hr className={styles["horizontal-line"]}/>
            <div className={styles["button-container"]}>
                <button type="button" onClick={handleRegistration}>Register</button>
                <button type="button" onClick={handleCancel} className={styles["cancel-button"]}>Cancel</button>
            </div>
        </>

    );
};

export default CreateAccount;