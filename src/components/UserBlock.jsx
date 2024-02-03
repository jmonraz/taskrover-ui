import React from 'react';
import styles from './UserBlock.module.css';

const UserBlock = ({ user }) => {
    return (
        <div className={styles['user-block']}>
            <div className={styles['user-info']}>
                <p>{`${user.firstName} ${user.lastName}`} </p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
            </div>
        </div>
    );
};

export default UserBlock;
