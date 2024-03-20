import React, { useState, useEffect } from 'react';
import {getAllUsers} from "../../utils/firebaseUtils";
import UserBlock from '../../components/UserBlock';
import styles from './UsersPage.module.css';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);


    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getAllUsers();
            setUsers(users);
            setLoading(false);
        };
        fetchUsers();
    }, []);

    const handleUserDelete = (user) => {
        setUserToDelete(user);
        setDeleteConfirmationVisible(true);
    };

    const confirmUserDelete = async () => {

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
export default UsersPage;