import styles from './TicketBlock.module.css';
import {useEffect, useState, useContext} from "react";
import {UserContext} from "../context/UserContext";
import {getUserProfilePictureUrl} from "../utils/firebaseUtils";
import genericPicture from '../assets/img/Generic-Profile.webp';

const TicketBlock = ({onClick, ticketDetails}) => {
    const {authState} = useContext(UserContext);
    const [ticketStatus, setTicketStatus] = useState(ticketDetails.ticketStatus);
    const [ticketDepartment, setTicketDepartment] = useState(ticketDetails.ticketDepartment);
    const [ticketPriority, setTicketPriority] = useState(ticketDetails.priority);
    const [userProfilePictureUrl, setUserProfilePictureUrl] = useState('');

    useEffect(() => {
        const fetchUserProfilePictureUrl = async () => {
            const url = await getUserProfilePictureUrl(ticketDetails.ticketOwnerId);
            setUserProfilePictureUrl(url);
        };
        fetchUserProfilePictureUrl();
    }, []);

    return (
        <>
            <div className={styles['ticket-block']} onClick={() => onClick(ticketDetails)} >
                <div className={styles['ticket-row']}>
                    <p>{ticketDetails.ticketNumber}</p>
                    <p className={styles['ticket-title']}>{ticketDetails.ticketTitle}</p>
                    <p className={styles['ticket-date']}>
                        {ticketDetails.createdDate
                            ? ticketDetails.createdDate
                                .toDate()
                                .toLocaleString(undefined, {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: false,
                                })
                            : 'Date not available'}
                    </p>
                    <p>{ticketDepartment}</p>
                    <p>{ticketStatus}</p>
                    <p>{ticketPriority}</p>
                    <div className={styles['img-ctr']}>
                        <img src={userProfilePictureUrl ? userProfilePictureUrl : genericPicture} alt='person' className={styles['circular-image']}/>
                        <p>{ticketDetails.agentAssigned}</p>
                    </div>

                </div>
            </div>
        </>
    );
};

export default TicketBlock;