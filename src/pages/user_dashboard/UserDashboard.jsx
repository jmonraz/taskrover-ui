// Import necessary dependencies
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTickets, getUserInformation } from "../../utils/firebaseUtils";

// Import components
import TicketBlock from "../../components/TicketBlock";

// Import styles
import styles from "./UserDashboard.module.css";

const UserDashboard = () =>{
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchData = async () =>{
            try {
                const fetchedUser = await getUserInformation();
                const fetchedTickets = await getTickets();

                setUser(fetchedUser);
                setTickets(fetchedTickets);
            }catch (error){
                console.error("Error fetching user and tickets:", error);
            }
        };
        fetchData();
    }, []);

    const onHandleTicketBlockClick = (ticketDetails) => {
        console.log('Ticket clicked:', ticketDetails);
        navigate(`/home/user/dashboard/${ticketDetails.ticketNumber.slice(1)}/ticket-details`);
    };
    return (
        <>
            <div className={styles['header-row']}>
                <p className={styles['dashboard-title']}>User Dashboard</p>
            </div>
            <hr />
            <div className={styles['ticket-blocks-col']}>
                {tickets.map((ticket) => (
                    <TicketBlock key={ticket.id} ticketDetails={ticket} onClick={onHandleTicketBlockClick} />
                ))}
            </div>
        </>
    );
};

export default UserDashboard;
