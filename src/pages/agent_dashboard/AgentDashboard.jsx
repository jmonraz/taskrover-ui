import styles from "./AgentDashboard.module.css";
import downArrowIcon from "../../assets/icons/dropdown_arrow.svg";
import {useState, useRef, useEffect} from "react";

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
                                    <li key={index} onClick={() => handleTicketFilterChange(ticketFilter)}>{ticketFilter.title} ({ticketFilter.number})</li>
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
                <TicketBlock />
                <TicketBlock />
                <TicketBlock />
                <TicketBlock />
                <TicketBlock />
                <TicketBlock />
            </div>
        </>
    );
};

export default AgentDashboard;