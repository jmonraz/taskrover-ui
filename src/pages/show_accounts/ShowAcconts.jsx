import React, { useState, useEffect } from 'react';
import { getDocs, collection, deleteDoc, doc  } from 'firebase/firestore';
import { db } from '../../services/firebaseService';
import UserBlock from '../../components/UserBlock';
import styles from './ShowAccounts.module.css';

const ShowAccounts = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersCollection = collection(db, 'users');
                const usersSnapshot = await getDocs(usersCollection);

                const userList = [];
                usersSnapshot.forEach((doc) => {
                    const userData = doc.data();
                    userList.push({
                        id: doc.id,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email,
                        role: userData.role,
                        profilePic: userData.profilePic,
                    });
                });

                setUsers(userList);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleUserDelete = (user) => {
        setUserToDelete(user);
        setDeleteConfirmationVisible(true);
    };

    const confirmUserDelete = async () => {
        if (userToDelete) {
            try {
                const userDocRef = doc(db, 'users', userToDelete.id);
                await deleteDoc(userDocRef);

                // Update state to reflect the deletion
                const updatedUsers = users.filter((user) => user.id !== userToDelete.id);
                setUsers(updatedUsers);
            } catch (error) {
                console.error('Error deleting user:', error);
            } finally {
                // Reset state after deletion
                setUserToDelete(null);
                setDeleteConfirmationVisible(false);
            }
        }
    };

    const cancelUserDelete = () => {
        setUserToDelete(null);
        setDeleteConfirmationVisible(false);
    };


    return (
        <div className={styles['page-ctr']}>
            <h1>User List</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className={styles['user-list']}>
                    {users.map((user) => (
                        <UserBlock key={user.id} user={user} onDelete={() => handleUserDelete(user)} />
                    ))}
                </div>
            )}

            {isDeleteConfirmationVisible && (
                <div className={styles['delete-confirmation']}>
                    <p>Are you sure you want to delete {userToDelete?.firstName} {userToDelete?.lastName}?</p>
                    <button onClick={confirmUserDelete}>Yes</button>
                    <button onClick={cancelUserDelete}>No</button>
                </div>
            )}
        </div>
    );
};
export default ShowAccounts;