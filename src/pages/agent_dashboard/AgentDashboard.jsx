import styles from "./AgentDashboard.module.css";
import downArrowIcon from "../../assets/icons/dropdown_arrow.svg";
import {useState, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getTickets, getUserInformation} from "../../utils/firebaseUtils";

// components
import TicketBlock from "../../components/TicketBlock";
const AgentDashboard = () => {
    const ticketFilter = [
        {
            title: "All Tickets",
            number: 0
        },
        {
            title: "Open Tickets",
            number: 110
        },
        {
            title: "On Hold Tickets",
            number: 10
        },
        {
            title: "In Progress Tickets",
            number: 20
        },
        {
            title: "Resolved Tickets",
            number: 80
        },
        {
            title: "Closed Tickets",
            number: 0
        },
    ];
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const ticketsPerPage = 10;


    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const fetchedTickets = await getTickets();
                setTickets(fetchedTickets);
                ticketFilter[0].number = fetchedTickets.length;
                setIsLoading(false);
            } catch (error) {
                console.log("Error fetching tickets: ", error);
            }
        }

        fetchTickets().then(r => console.log("Tickets fetched"));
    }, []);

    useEffect(() => {
        const fetchUserInformation = async () => {
            try {
                const fetchedUser = await getUserInformation();
                setUser(fetchedUser);
                console.log("Fetched user: ", fetchedUser);
            } catch (error) {
                console.log("Error fetching user: ", error);
            }
        }

        fetchUserInformation().then(r => console.log("User fetched"));
    }, []);


    const [ticketFilterState, setTicketFilterState] = useState(ticketFilter[0]);
    const [isTicketFilterSubmenu, setIsTicketFilterSubmenu] = useState(false);
    const ticketFilterRef = useRef();

    const handleClickOutside = (event) => {
        if (ticketFilterRef.current && !ticketFilterRef.current.contains(event.target)) {
            setIsTicketFilterSubmenu(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleTicketFilterChange = (ticketFilter) => {
        setTicketFilterState(ticketFilter);
        setIsTicketFilterSubmenu(false);
    }

    const handleTicketFilterSubmenu = () => {
        setIsTicketFilterSubmenu(!isTicketFilterSubmenu);
    }

    const onHandleTicketBlockClick = (ticketDetails) => {
        console.log('ticket', ticketDetails);
        navigate(`/home/agent/dashboard/${ticketDetails.ticketNumber.slice(1)}/ticket-details`);
    }


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
        {isLoading ?
                (<div className={styles['loader-ctr']}>
                    <div className={styles['loader']}></div>
                </div>) :
            (
                <>
                        <div className={styles['header-row']}>
                            <p className={styles['ticket-filter-label']}>{ticketFilterState.title} ({ticketFilterState.number})</p>
                            <div className={styles['icon-container']}>
                                <img src={downArrowIcon} alt="down-arrow" className={styles['icon']}
                                     onClick={handleTicketFilterSubmenu}/>
                                {isTicketFilterSubmenu && (
                                    <div className={styles['dropdown-menu']} ref={ticketFilterRef}>
                                        <ul>
                                            {ticketFilter.map((ticketFilter, index) => (
                                                <li onClick={() => handleTicketFilterChange(ticketFilter)}>{ticketFilter.title} ({ticketFilter.number})</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles['header-row']}>
                            <div>
                                <input type="checkbox"/>
                            </div>
                            <div className={styles['header-row']}>
                                <p className={styles['ticket-count']}>
                                    {startIndex + 1} - {Math.min(endIndex, tickets.length)} of {tickets.length}
                                </p>
                                <div className={styles['header-row-btn']}>
                                    <button className={styles['sml-action-btn']} onClick={handlePrevPage}>
                                        Prev
                                    </button>
                                    <button className={styles['sml-action-btn']} onClick={handleNextPage}>
                                        Next
                                    </button>
                                </div>

                            </div>
                        </div>
                    <hr/>
                    <div className={styles['ticket-blocks-col']}>
                        {displayedTickets.map((ticket) => (
                            <TicketBlock key={ticket.id} ticketDetails={ticket} onClick={onHandleTicketBlockClick}/>
                        ))}
                    </div>

                </>)


        }
        </>);
};

export default AgentDashboard;