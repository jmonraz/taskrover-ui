import styles from "./AgentDashboard.module.css";
import downArrowIcon from "../../assets/icons/dropdown_arrow.svg";
import {useState, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getTickets} from "../../utils/firebaseUtils";

// components
import TicketBlock from "../../components/TicketBlock";
const AgentDashboard = () => {
    const ticketFilter = [
        {
            title: "All Tickets",
            number: 110
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

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const fetchedTickets = await getTickets();
                setTickets(fetchedTickets);
                console.log("Fetched tickets: ", fetchedTickets);
            } catch (error) {
                console.log("Error fetching tickets: ", error);
            }
        }
        fetchTickets().then(r => console.log("Tickets fetched"));
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

    return (
        <>
            <div className={styles['header-row']}>
                <p className={styles['ticket-filter-label']}>{ticketFilterState.title} ({ticketFilterState.number})</p>
                <div className={styles['icon-container']}>
                    <img src={downArrowIcon} alt="down-arrow" className={styles['icon']} onClick={handleTicketFilterSubmenu}/>
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
                    <input type="checkbox" />
                </div>
                <div className={styles['header-row']}>
                    <p className={styles['ticket-count']}>1 - 30 of 110</p>
                    <button className={styles['sml-action-btn']}>prev</button>
                    <button className={styles['sml-action-btn']}>next</button>
                </div>
            </div>
            <hr />
            <div className={styles['ticket-blocks-col']}>
                {tickets.map((ticket, _) => (
                    <TicketBlock key={ticket.id} ticketDetails={ticket} onClick={onHandleTicketBlockClick} />
                )
                )}
            </div>
        </>
    );
};

export default AgentDashboard;