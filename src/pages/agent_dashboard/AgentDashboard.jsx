import styles from "./AgentDashboard.module.css";
import downArrowIcon from "../../assets/icons/dropdown_arrow.svg";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getTickets, getUserInformation, getUserProfilePictureUrl} from "../../utils/firebaseUtils";
import genericPicture from '../../assets/img/Generic-Profile.webp';

// components
import SearchBar from "../../components/SearchBar";

const AgentDashboard = () => {

    Date.prototype.toString = function () {
        const options = {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        return this.toLocaleDateString('en-US', options);
    }

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
    const [ticketFilterState, setTicketFilterState] = useState(ticketFilter[0]);
    const [isTicketFilterSubmenu, setIsTicketFilterSubmenu] = useState(false);
    const ticketFilterRef = useRef();

    useEffect(() => {
        const fetchTicketsAndProfilePictures = async () => {
            try {
                const fetchedTickets = await getTickets();
                // sort by ticket number slice 1st character
                fetchedTickets.sort((a, b) => b.createdDate.toDate() - a.createdDate.toDate());

                // Fetch profile pictures for each ticket's assigned agent
                const ticketsWithPictures = await Promise.all(fetchedTickets.map(async (ticket) => {
                    try {
                        const profilePictureUrl = await getUserProfilePictureUrl(ticket.agentAssignedId);
                        return { ...ticket, agentAssignedImage: profilePictureUrl };
                    } catch (error) {
                        console.log("Error fetching profile picture for ticket ID:", ticket.id, error);
                        return { ...ticket, agentAssignedImage: null }; // Handle the case where picture can't be fetched
                    }
                }));

                setTickets(ticketsWithPictures);
                setUnfilteredTickets(ticketsWithPictures);
                ticketFilter[0].number = ticketsWithPictures.length;
                setIsLoading(false);
                console.log("Tickets fetched: ", ticketsWithPictures);
            } catch (error) {
                console.log("Error fetching tickets: ", error);
            }
        };

        fetchTicketsAndProfilePictures().then(() => console.log("Tickets and profile pictures fetched"));
    }, []);

    useEffect(() => {
        const fetchUserInformation = async () => {
            try {
                const fetchedUser = await getUserInformation();
                setUser(fetchedUser);
            } catch (error) {
                console.log("Error fetching user: ", error);
            }
        }

        fetchUserInformation().then(r => console.log("User fetched"));
    }, []);


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
                    <div><p className={styles['loader-txt']}>Loading Tickets</p></div>
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
                    <div className={styles['ticket-blocks-col']}>
                        <table className={styles['tbl']}>
                            <thead>
                                <tr className={styles['table-header']}>
                                    <th>Ticket Number</th>
                                    <th>Subject</th>
                                    <th>Created Date</th>
                                    <th>Department</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Assigned To</th>
                                    <th>Created By</th>
                                    <th>Modified Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedTickets.map((ticket, index) => (
                                    <tr onClick={() => onHandleTicketBlockClick(ticket)}>
                                        <td key={ticket.ticketNumber}>{ticket.ticketNumber}</td>
                                        <td key={ticket.ticketTitle}>{ticket.ticketTitle}</td>
                                        <td key={ticket.createdDate.toDate().toString()}>{ticket.createdDate.toDate().toString()}</td>
                                        <td key={ticket.ticketDepartment}>{ticket.ticketDepartment}</td>
                                        <td key={ticket.ticketStatus}>{ticket.ticketStatus}</td>
                                        <td key={ticket.priority}>{ticket.priority}</td>
                                        <td key={ticket.agentAssigned}>
                                            <div className={styles['img-ctr']}>
                                                <img src={ticket.agentAssignedImage ? ticket.agentAssignedImage : genericPicture} alt="agent-image"/>
                                                <p>{ticket.agentAssigned}</p>
                                            </div>
                                        </td>
                                        <td key={index}>{ticket.createdBy}</td>
                                        <td key={ticket.modifiedDate.toDate().toString()}>{ticket.modifiedDate.toDate().toString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={styles['btn-row']}>
                        <p className={styles['ticket-count']}>
                            {startIndex + 1} - {Math.min(endIndex, tickets.length)} of {tickets.length} tickets
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

                </>)


        }
        </>);
};

export default AgentDashboard;