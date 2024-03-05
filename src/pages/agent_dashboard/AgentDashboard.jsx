import styles from "./AgentDashboard.module.css";
import downArrowIcon from "../../assets/icons/dropdown_arrow.svg";
import {useState, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getTickets, getUserInformation} from "../../utils/firebaseUtils";
import {useFormInput} from "../../hooks/useFormInput";

// components
import TicketBlock from "../../components/TicketBlock";
import SearchBar from "../../components/SearchBar";
const AgentDashboard = () => {
    const ticketFilter = [
        {
            title: "All Tickets",
            number: ""
        },
        {
            title: "Open Tickets",
            number: ""
        },
        {
            title: "On Hold Tickets",
            number: ""
        },
        {
            title: "In Progress Tickets",
            number: ""
        },
        {
            title: "Resolved Tickets",
            number: ""
        },
        {
            title: "Closed Tickets",
            number: ""
        },
    ];

    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [unfilteredTickets, setUnfilteredTickets] = useState([]);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const ticketsPerPage = 10;
    const [searcBarValue, setSearchBarValue] = useState('');
    const [selectAll, setSelectAll] = useState(false);

    const onSearchBarChange = (e) => {
        setSearchBarValue(e.target.value);
        // filter tickets based on search bar value
        const filteredTickets = tickets.filter(ticket => ticket.ticketTitle.toLowerCase().includes(e.target.value.toLowerCase()) || ticket.ticketNumber.toLowerCase().includes(e.target.value.toLowerCase()));
        setTickets(filteredTickets);
        if(e.target.value === '') {
            setTickets(unfilteredTickets);
        }
    }


    const searchBarProps = {
        value: searcBarValue,
        onChange: onSearchBarChange
    };

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const fetchedTickets = await getTickets();
                fetchedTickets.sort((a, b) => b.createdDate.toDate() - a.createdDate.toDate());
                console.log(fetchedTickets);
                setTickets(fetchedTickets);
                setUnfilteredTickets(fetchedTickets);
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

    const handleTicketFilterChange = (selectedFilter) => {
        setTicketFilterState(selectedFilter);
        setIsTicketFilterSubmenu(false);

        // Apply filter based on the selected ticket filter
        const filteredTickets = unfilteredTickets.filter(ticket => {
            if (selectedFilter.title === 'All Tickets') {
                return true; // Show all tickets
            } else {
                return selectedFilter.title.toLowerCase().includes(ticket.ticketStatus.toLowerCase());
            }
        });

        setTickets(filteredTickets);

    };

    const handleTicketFilterSubmenu = () => {
        setIsTicketFilterSubmenu(!isTicketFilterSubmenu);
    }

    const onHandleTicketBlockClick = (ticketDetails) => {
        console.log('ticket', ticketDetails);
        navigate(`/home/agent/dashboard/${ticketDetails.ticketNumber.slice(1)}/ticket-details`);
    }

    const handleCheckboxChange = (ticketId) => {
        const updatedTickets = tickets.map(ticket =>
            ticket.id === ticketId ? { ...ticket, isChecked: !ticket.isChecked } : ticket
        );
        setTickets(updatedTickets);
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        const updatedTickets = tickets.map(ticket => ({ ...ticket, isChecked: !selectAll }));
        setTickets(updatedTickets);
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
                            <div className={styles['ticket-filter-ctr']}>
                                <p className={styles['ticket-filter-label']}>{ticketFilterState.title} ({ticketFilterState.number})</p>
                                <div className={styles['icon-container']}>
                                    <img src={downArrowIcon} alt="down-arrow" className={styles['icon']}
                                         onClick={handleTicketFilterSubmenu}/>
                                    {isTicketFilterSubmenu && (
                                        <div className={styles['dropdown-menu']} ref={ticketFilterRef}>
                                            <ul>
                                                {ticketFilter.map((filter, index) => (
                                                    <li key={index} onClick={() => handleTicketFilterChange(filter)}>
                                                        {filter.title}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <SearchBar inputProps={searchBarProps}/>
                            </div>
                        </div>
                    <div className={styles['header-row']}>
                        <div>
                            <input type="checkbox" checked={selectAll} onChange={handleSelectAll}/>
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
                            <TicketBlock
                                key={ticket.id}
                                ticketDetails={ticket}
                                onClick={onHandleTicketBlockClick}
                                isChecked={ticket.isChecked}
                                onCheckboxChange={handleCheckboxChange}
                            />
                        ))}
                    </div>

                </>)


        }
        </>);
};

export default AgentDashboard;