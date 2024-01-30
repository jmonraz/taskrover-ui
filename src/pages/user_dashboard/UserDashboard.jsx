// Import necessary dependencies
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getTickets, getUserInformation } from "../../utils/firebaseUtils";
import { UserContext } from "../../context/UserContext";

// Import components
import TicketBlock from "../../components/TicketBlock";

// Import styles
import styles from "./UserDashboard.module.css";

const UserDashboard = () =>{
    const { authState } = useContext(UserContext);
    const {userEmail, userType} = authState;
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () =>{
            try {
                const fetchedTickets = await getTickets();
                if(userType === 'user') {
                    const userTickets = fetchedTickets.filter((ticket) => ticket.contactEmail === userEmail);
                    setTickets(userTickets);
                } else {
                    setTickets(fetchedTickets);
                }

                setIsLoading(false);
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
            <hr/>
        {isLoading ? (<p>Loading...</p>) : (


                <div className={styles['ticket-blocks-col']}>
                    {tickets.map((ticket) => (
                        <TicketBlock key={ticket.id} ticketDetails={ticket} onClick={onHandleTicketBlockClick}/>
                    ))}
                </div>

        )}

        </>
    )
        ;
};

export default UserDashboard;
