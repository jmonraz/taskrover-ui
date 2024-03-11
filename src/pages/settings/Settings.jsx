
import React, { useState, useEffect } from 'react';
import styles from "./Settings.module.css";

import { useAuthState } from 'react-firebase-hooks/auth';
import {collection, doc, getFirestore, updateDoc} from "firebase/firestore";
import { auth, db, storage } from '../../services/firebaseService';
import {useDocument} from "react-firebase-hooks/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Input from "../../components/Input";
import {useFormInput} from "../../hooks/useFormInput";
import Button from "../../components/Button";

const SettingsPage = () => {
    const editName = useFormInput('');
    const [user] = useAuthState(auth);
    const docRef = doc(db, "collectionName", "documentId");
    const usersCollection = collection(db, "users");
    const [userData, loading] = useDocument(doc(db, "users", user?.uid));
    const [fullName, setFullName] = useState('');
    const [newProfilePic, setNewProfilePic] = useState(null);
    const [activeTab, setActiveTab] = useState('account');

    useEffect(() => {
        if (userData && userData.exists) {
            const { fullName } = userData.data();
            setFullName(fullName);
        } else if (loading === false) { // Handle errors after loading
            console.error('Error fetching user data:', userData.error);
        }
    }, [userData, loading]);

    const handleProfilePicChange = (e) => {
        if (e.target.files[0]) {
            setNewProfilePic(e.target.files[0]);

            // Display the selected image immediately
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageElement = document.getElementById('profilePicPreview');
                if (imageElement) {
                    imageElement.src = event.target.result;
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSaveChanges = async () => {
        try {
            if (!user) {
                alert('Please sign in to update your profile.');
                return;
            }

            const newFullName = editName.value;
            // Update full name
            await updateDoc(doc(usersCollection, user.uid), { newFullName});

            if (newProfilePic) {
                const storageRef = ref(storage, `profile-pics/${user.uid}`);
                await uploadBytes(storageRef, newProfilePic);
                const imageUrl = await getDownloadURL(storageRef);

                await updateDoc(doc(collection(db, 'users'), user.uid), { profilePic: imageUrl });
            }

            alert('Changes saved successfully!');
        } catch (error) {
            console.error('Error saving changes:', error.message);
            alert('Error saving changes. Please try again.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <div className={styles['settings-row']}>
                <div className={styles['side-menu']}>
                    <div>
                        <p onClick={() => {handleTabClick('account')}} className={activeTab === 'account' && styles['active']}>Account</p>
                        <p onClick={() => {handleTabClick('roles')}} className={activeTab === 'roles' && styles['active']}>Roles</p>
                    </div>
                </div>
                {activeTab === 'account' && (
                    <div className={styles['settings-content-ctr']}>
                        <h1 className={styles['page-title']}>Account Settings</h1>
                        <div className={styles["settings-container"]}>
                            <form className={styles["settings-form"]}>
                                <div className={styles['col']}>
                                    <label htmlFor="fullName">Full Name</label>
                                    <Input inputProps={editName} placeholder={fullName} styleName='main-input'/>
                                </div>
                                <div className={styles['col']}>
                                    <label htmlFor="profilePic">Profile Picture</label>
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById('profilePic').click()}
                                        className={styles["profile-pic-button"]}>
                                        <img id="profilePicPreview" src={userData.data().profilePic}
                                             alt="Profile Picture"/>
                                    </button>
                                    <input type="file" accept="image/*" id="profilePic" onChange={handleProfilePicChange} style={{display: 'none'}}/>
                                </div>
                                <div className={styles['btn-row']}>
                                    <Button onClick={handleSaveChanges} styleName='green-button'>Save Changes</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {activeTab === 'roles' && (
                    <div className={styles['settings-content-ctr']}>
                        <h1 className={styles['page-title']}>Roles Settings</h1>
                    </div>
                )}
            </div>
        </>
    );
};

export default SettingsPage;