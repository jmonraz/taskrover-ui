import styles from "./AgentDashboard.module.css";
import downArrowIcon from "../../assets/icons/dropdown_arrow.svg";
import {useState, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";

// components
import TicketBlock from "../../components/TicketBlock";
const AgentDashboard = () => {
    const navigate = useNavigate();
    const tickets = [
        {
            title: 'Orders have not been picked up by Fedex',
            number: '#123345',
            date: '1/10/2023',
            respond: 'Agent responded to ticket 18hrs ago',
            priority: 'Low',
            department: 'Sales',
            status: 'Open'
        },
        {
            title: 'Not able to sign in',
            number: '#123346',
            date: '1/10/2023',
            respond: 'Agent responded to ticket 12hrs ago',
            priority: 'High',
            department: 'IT',
            status: 'Open'
        },
        {
            title: 'Cannot place order in system',
            number: '#123347',
            date: '1/10/2023',
            respond: 'Agent responded to ticket 1hr ago',
            priority: 'Medium',
            department: 'IT',
            status: 'Open'
        },
        {
            title: 'Why I am being charged twice?',
            number: '#123348',
            date: '1/10/2023',
            respond: 'Agent responded to ticket 18hrs ago',
            priority: 'Low',
            department: 'Accounting',
            status: 'Open'
        }
    ];

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
        navigate(`/home/agent/dashboard/${ticketDetails.number.slice(1)}/ticket-details`);
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
                {tickets.map((ticket, index) => (
                    <TicketBlock key={index} ticketDetails={ticket} onClick={onHandleTicketBlockClick} />
                )
                )}
            </div>
        </>
    );
};

export default AgentDashboard;