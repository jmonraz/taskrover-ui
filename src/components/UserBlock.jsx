import React from 'react';
import styles from './UserBlock.module.css';
import Generic from '../assets/img/Generic-Profile.webp'

const UserBlock = ({ user }) => {
    return (
        <div className={styles['user-block']}>
            <div className={styles['user-info']}>
                <img
                    src={Generic}
                    className={styles['profile-pic']}
                    onError={(event) => {
                        event.target.src = "Generic";
                        console.error('Error loading profile picture:', event.error);
                    }}
                 alt=''/>
                <p>{`${user.firstName} ${user.lastName}`} </p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
            </div>
        </div>
    );
};

export default UserBlock;