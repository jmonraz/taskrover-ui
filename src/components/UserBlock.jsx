import {useState, useEffect} from 'react';
import {getUserProfilePictureUrl} from "../utils/firebaseUtils";
import styles from './UserBlock.module.css';
import Generic from '../assets/img/Generic-Profile.webp'
import Button from "./Button";

const UserBlock = ({ user }) => {

    const [profilePic, setProfilePic] = useState('');

    useEffect (() => {
        const getProfilePic = async () => {
            const url = await getUserProfilePictureUrl(user.id);
            setProfilePic(url);
        };
        getProfilePic();
    }, []);

    return (
        <div className={styles['user-block']}>
            <div className={styles['user-info']}>
                <div className={styles['col']}>
                    <img
                        src={profilePic ? profilePic : Generic}
                        className={styles['profile-pic']}
                        alt=''/>
                </div>
                <div className={styles['col']}>
                    <p>{`${user.firstName} ${user.lastName}`} </p>
                    <p>{user.email}</p>
                    <p>{user.role}</p>
                </div>
            </div>
            <div>
                <Button onClick={() => {}} styleName='cancel-button'>Delete</Button>
            </div>
        </div>
    );
};

export default UserBlock;