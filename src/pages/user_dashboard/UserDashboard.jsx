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
    const [currentPage, setCurrentPage] = useState(1);
    const ticketsPerPage = 10;

    useEffect(() => {
        const fetchData = async () =>{
            try {
                const fetchedTickets = await getTickets();
                console.log("Fetched tickets:", fetchedTickets);
                console.log("User email:", userEmail);
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
        fetchData().then(r => console.log("Data fetched"));
    }, []);

    const onHandleTicketBlockClick = (ticketDetails) => {
        console.log('Ticket clicked:', ticketDetails);
        navigate(`/home/user/dashboard/${ticketDetails.ticketNumber.slice(1)}/ticket-details`);
    };

    const startIndex = (currentPage - 1) * ticketsPerPage;
    const endIndex = Math.min(startIndex + ticketsPerPage, tickets.length); // Adjusted this line

    const displayedTickets = tickets.slice(startIndex, endIndex);

    const handleNextPage = () => {
        const totalPages = Math.ceil(tickets.length / ticketsPerPage);

        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };


    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    return (
        <>
            <div className={styles['header-row']}>
                <p className={styles['dashboard-title']}>User Dashboard</p>
            </div>
            <div className={styles['header-row']}>
                <div>
                    <input type="checkbox"/>
                </div>
                <div className={styles['header-row']}>
                    <p className={styles['ticket-count']}>
                        {startIndex + 1} - {Math.min(endIndex, tickets.length)} of {tickets.length}
                    </p>
                    <button className={styles['sml-action-btn']} onClick={handlePrevPage}>
                        Prev
                    </button>
                    <button className={styles['sml-action-btn']} onClick={handleNextPage}>
                        Next
                    </button>
                </div>
            </div>
            <hr/>
            {isLoading ? (<p>Loading...</p>) : (


                <div className={styles['ticket-blocks-col']}>
                    {displayedTickets.map((ticket) => (
                        <TicketBlock key={ticket.id} ticketDetails={ticket} onClick={onHandleTicketBlockClick}/>
                    ))}
                </div>

            )}

        </>
    )
        ;
};

export default UserDashboard;
