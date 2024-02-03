import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../services/firebaseService';
import UserBlock from '../../components/UserBlock';
import styles from './ShowAccounts.module.css';

const ShowAccounts = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div>
            <h2>User List</h2>
            <hr/>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div >
                    {users.map((user) => (
                        <UserBlock key={user.id} user={user} />
                    ))}
                </div>
            )}
        </div>
    );
};
export default ShowAccounts;