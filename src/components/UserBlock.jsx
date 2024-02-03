import React from 'react';
import styles from './UserBlock.module.css';

const UserBlock = ({ user }) => {
    return (
        <div className={styles['user-block']}>
            <div className={styles['user-info']}>
                <img
                    src={user.data().profilePic}
                    alt="Profile"
                    className={styles['profile-pic']}
                    onError={(event) => {
                        console.error('Error loading profile picture:', event.error);
                    }}
                />
                <p>{`${user.firstName} ${user.lastName}`} </p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
            </div>
        </div>
    );
};

export default UserBlock;