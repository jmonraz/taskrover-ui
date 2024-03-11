import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebaseService';
import styles from './UserBlock.module.css';
import Generic from '../assets/img/Generic-Profile.webp'
import Button from "./Button";

const UserBlock = ({ user, onDelete }) => {
    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, 'users', user.id));
            onDelete(user.id); // Notify parent component about the deletion
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className={styles['user-block']}>
            <div className={styles['user-info']}>
                <div className={styles['col']}>
                    <img
                        src={user.profilePic || Generic}
                        className={styles['profile-pic']}
                        onError={(event) => {
                            event.target.src = "Generic";
                            console.error('Error loading profile picture:', event.error);
                        }}
                        alt=''/>
                </div>
                <div className={styles['col']}>
                    <p>{`${user.firstName} ${user.lastName}`} </p>
                    <p>{user.email}</p>
                    <p>{user.role}</p>
                </div>
            </div>
            <div>
                <Button onClick={handleDelete} styleName='cancel-button'>Delete</Button>
            </div>
        </div>
    );
};

export default UserBlock;