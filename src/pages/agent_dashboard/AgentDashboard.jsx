import styles from "./AgentDashboard.module.css";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getTickets, getUserInformation, getUserProfilePictureUrl} from "../../utils/firebaseUtils";
import genericPicture from '../../assets/img/Generic-Profile.webp';
import eyeImg from '../../assets/icons/eye.svg';
import pinImg from '../../assets/icons/pin.svg';
import exportImg from '../../assets/icons/export.svg';
import filterImg from '../../assets/icons/filter.svg';

// components
import SearchBar from "../../components/SearchBar";

const AgentDashboard = () => {

    Date.prototype.toString = function () {
        const options = {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        return this.toLocaleDateString('en-US', options);
    }

    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [unfilteredTickets, setUnfilteredTickets] = useState([]);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const ticketsPerPage = 10;
    const [searchBarValue, setSearchBarValue] = useState('');
    const [eyeClicked, setEyeClicked] = useState(false);
    const [searchColumn, setSearchColumn] = useState('');
    const [exportClicked, setExportClicked] = useState(false);
    const [defaultHeaders, setDefaultHeaders] = useState([]);
    const [ticketHeaders, setTicketHeaders] = useState([]);
    const [checkedColumns, setCheckedColumns] = useState([]);

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
                setIsLoading(false);
            } catch (error) {
                console.log("Error fetching tickets: ", error);
            }
        };
        const fetchUserInformation = async () => {
            try {
                const fetchedUser = await getUserInformation();
                setUser(fetchedUser);
            } catch (error) {
                console.log("Error fetching user: ", error);
            }
        }

        const getTicketHeaders = () => {
            // set default headers
            console.log(tickets.length);
            if (tickets.length > 0) {
                // default headers: ticketNumber, ticketTitle, createdDate, ticketDepartment, ticketStatus, priority, agentAssigned, createdBy, modifiedDate
                const defaultHeaders = ['ticketNumber', 'ticketTitle',  'createdDate', 'ticketDepartment', 'ticketStatus', 'priority', 'agentAssigned', 'createdBy', 'modifiedDate'];
                setDefaultHeaders(defaultHeaders);
                for(const key in tickets[0]) {
                    if(key !== 'conversations' && key !== 'tags') {

                        ticketHeaders.push(key);
                    }
                }
                // form an object with the headers and their visibility
                const checkedColumns = {};
                ticketHeaders.forEach(header => {
                    checkedColumns[header] = false;
                });

                defaultHeaders.forEach(header => {
                    checkedColumns[header] = true;
                });
                setCheckedColumns(checkedColumns);
            }
        };


        fetchUserInformation().then(r => console.log("User fetched"));

        fetchTicketsAndProfilePictures().then(() => console.log("Tickets and profile pictures fetched"));

        getTicketHeaders();

    }, [tickets.length]);

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
        value: searchBarValue,
        onChange: onSearchBarChange
    };

    const onChangeClickExport = () => {
        setExportClicked(!exportClicked);
        setEyeClicked(false);
    };

    const onChangeEyeClick = () => {
        setEyeClicked(!eyeClicked);
        setExportClicked(false);
    };


    const onChangeSearchColumn = (e) => {
        e.stopPropagation();
        setSearchColumn(e.target.value);
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

    const onHeaderChkClick = (e) => {
        e.stopPropagation();
        const header = e.target.value;
        const newCheckedColumns = {...checkedColumns};
        newCheckedColumns[header] = !newCheckedColumns[header];
        setCheckedColumns(newCheckedColumns);
        // set default headers
        const defaultHeaders = [];
        for(const key in newCheckedColumns) {
            if(newCheckedColumns[key]) {
                defaultHeaders.push(key);
            }
        }
        setDefaultHeaders(defaultHeaders);
    }


    return (
        <>
        {isLoading ?
                (<div className={styles['loader-ctr']}>
                    <div><p className={styles['loader-txt']}>Loading Tickets</p></div>
                    <div className={styles['loader']}></div>
                </div>) :
            (
                <>
                    <div className={styles['ticket-blocks-col']}>
                        {/*table banner*/}
                        <div className={styles['tbl-banner']}>
                            <div>
                                <SearchBar inputProps={searchBarProps}/>
                            </div>
                            <div className={styles['tbl-banner-ribbon']}>
                                <div>
                                    <div className={styles['tbl-banner-bubble']} onClick={onChangeEyeClick}>
                                        <img src={eyeImg} alt='eye-icon'/>
                                    </div>
                                    {eyeClicked && <div className={styles['tbl-banner-ribbon-bubble-clickable']}>
                                        <p className={styles['tbl-banner-ribbon-bubble-clickable-title']}>Visible
                                            columns</p>
                                        <input type='text' placeholder='Filter columns list ...' aria-required={false}
                                               value={searchColumn} onChange={onChangeSearchColumn}/>
                                        <div className={styles['tbl-banner-ribbon-bubble-clickable-chk-group']}>
                                            {ticketHeaders.map((header, index) => (
                                                <div key={index}>
                                                    <input type='checkbox' id={header}
                                                           name={header} value={header} checked={checkedColumns[header]} onClick={onHeaderChkClick}/>
                                                    <label htmlFor={header}>{header}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>}
                                </div>
                                <div>
                                    <div className={styles['tbl-banner-bubble']}>
                                        <img src={pinImg} alt='pin-icon'/>
                                    </div>
                                </div>
                                <div>
                                    <div className={styles['tbl-banner-bubble']} onClick={onChangeClickExport}>
                                        <img src={exportImg} alt='export-icon'/>
                                        <p className={styles['bubble-txt']}>EXPORT</p>
                                    </div>
                                    {exportClicked && (
                                        <div className={`${styles['export-ctr']}`}>
                                            <p className={styles['export-txt']}>Export to CSV</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/*table banner*/}
                        <div className={styles['tbl-ctr']}>
                            <table className={styles['tbl']}>
                                <thead>
                                <tr className={styles['table-header']}>
                                    {defaultHeaders.map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {displayedTickets.map((ticket, index) => (
                                    <tr onClick={() => onHandleTicketBlockClick(ticket)} key={index}>
                                        {defaultHeaders.map((header, headerIndex) => {
                                            // Special handling for dates to convert them from Timestamp to string
                                            if (header === 'createdDate' || header === 'modifiedDate') {
                                                return <td key={headerIndex}>{ticket[header].toDate().toString()}</td>;
                                            }
                                            // Handling for the agentAssignedImage property
                                            else if (header === 'agentAssigned') {
                                                return (
                                                    <td key={headerIndex}>
                                                        <div className={styles['img-ctr']}>
                                                            <img
                                                                src={ticket.agentAssignedImage ? ticket.agentAssignedImage : genericPicture}
                                                                alt="agent-image"/>
                                                            <p>{ticket.agentAssigned}</p>
                                                        </div>
                                                    </td>
                                                );
                                            }
                                            // Default rendering for other properties
                                            else {
                                                return <td key={headerIndex}>{ticket[header]}</td>;
                                            }
                                        })}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

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