/*
import React, { useState, useEffect } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { auth, db, storage } from '../../services/firebaseService';

const SettingsPage = () => {
    const [user] = useAuthState(auth);
    const [userData, loading] = useDocument(db.collection('users').doc(user?.uid));
    const [fullName, setFullName] = useState('');
    const [newProfilePic, setNewProfilePic] = useState(null);

    useEffect(() => {
        if (userData && userData.exists) {
            const { fullName } = userData.data();
            setFullName(fullName);
        }
    }, [userData]);

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handleProfilePicChange = (e) => {
        if (e.target.files[0]) {
            setNewProfilePic(e.target.files[0]);
        }
    };

    const handleSaveChanges = async () => {
        try {
            // Update full name
            await db.collection('users').doc(user.uid).update({ fullName });

            // Update profile picture
            if (newProfilePic) {
                const storageRef = storage.ref();
                const imageRef = storageRef.child(`profile-pics/${user.uid}`);
                await imageRef.put(newProfilePic);
                const imageUrl = await imageRef.getDownloadURL();

                await db.collection('users').doc(user.uid).update({ profilePic: imageUrl });
            }

            alert('Changes saved successfully!');
        } catch (error) {
            console.error('Error saving changes:', error.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Account Settings</h2>
            <div>
                <label htmlFor="fullName">Full Name:</label>
                <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={handleFullNameChange}
                />
            </div>
            <div>
                <label htmlFor="profilePic">Profile Picture:</label>
                <input
                    type="file"
                    accept="image/*"
                    id="profilePic"
                    onChange={handleProfilePicChange}
                />
            </div>
            <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
    );
};

export default SettingsPage;
 */