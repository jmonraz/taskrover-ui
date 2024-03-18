import styles from './TicketBlock.module.css';
import {useState, useRef, useEffect, useContext} from "react";
import {UserContext, } from "../context/UserContext";
import personImage from '../assets/img/person1.webp';
import downArrowIcon from '../assets/icons/dropdown_arrow.svg';
import {updateTicketStatus, updateTicketPriority, updateTicketDepartment, getDepartments} from "../utils/firebaseUtils";

const TicketBlock = ({onClick, ticketDetails, isChecked, onCheckboxChange }) => {
    const {authState} = useContext(UserContext);
    const {userType} = authState;
    const statuses = ['Open', 'On Hold', 'Escalated', 'Closed', 'In Progress'];
        const [departments, setDepartments] = useState([]);
    const priorities = ['Low', 'Medium', 'High', 'Urgent'];

    const [isTicketStatus, setIsTicketStatus] = useState(false);
    const [isDeparment, setIsDeparment] = useState(false);
    const [isPriority, setIsPriority] = useState(false);
    const [ticketStatus, setTicketStatus] = useState(ticketDetails.ticketStatus);
    const [ticketDepartment, setTicketDepartment] = useState(ticketDetails.ticketDepartment);
    const [ticketPriority, setTicketPriority] = useState(ticketDetails.priority);

    // refs for each dropdown
    const ticketStatusRef = useRef(null);
    const departmentRef = useRef(null);
    const priorityRef = useRef(null);

    // handle click outside of dropdown
    const handleClickOutside = (e) => {
        e.stopPropagation();
        if (ticketStatusRef.current && !ticketStatusRef.current.contains(e.target)) {
            setIsTicketStatus(false);
        }
        if (departmentRef.current && !departmentRef.current.contains(e.target)) {
            setIsDeparment(false);
        }
        if (priorityRef.current && !priorityRef.current.contains(e.target)) {
            setIsPriority(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const fetchedDepartments = await getDepartments();
                setDepartments(fetchedDepartments);
            } catch (error) {
                console.log("Error fetching departments: ", error);
            }
        }
        fetchDepartments().then(r => {});
    }, []);

    const handleCheckboxChange = () => {
        onCheckboxChange(ticketDetails.id);
    };

    const handleDropdownClick = (e, toggleDropdown) => {
        e.stopPropagation();
        toggleDropdown(prevState => !prevState);
    }

    const handleClickStatus = async (e, status) => {
        e.stopPropagation();
        setTicketStatus(status);
        setIsTicketStatus(false);
        await updateTicketStatus(ticketDetails.id, status);
        // setIsTicketStatus(status);
    }
    const handleClickDepartment = async (e, department) => {
        e.stopPropagation();
        setTicketDepartment(department);
        setIsDeparment(false);
        await updateTicketDepartment(ticketDetails.id, department);
    }

    const handleClickPriority = async (e, priority) => {
        e.stopPropagation();
        setTicketPriority(priority);
        setIsPriority(false);
        await updateTicketPriority(ticketDetails.id, priority);
    }

    return (
        <>
            <div className={styles['ticket-block']} onClick={() => onClick(ticketDetails)} >
                <div className={styles['ticket-row']}>
                    <p className={styles['ticket-title']}>{ticketDetails.ticketTitle}</p>
                    <p className={styles['ticket-date']}>
                        {ticketDetails.createdDate
                            ? ticketDetails.createdDate
                                .toDate()
                                .toLocaleString(undefined, {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: false,
                                })
                            : 'Date not available'}
                    </p>
                    <p>Department</p>
                    <p>Status</p>
                    <div className={styles['img-ctr']}>
                        <img src={personImage} alt='person' className={styles['circular-image']}/>
                        <p>Jorge Monraz</p>
                    </div>

                    <p>Updated</p>
                </div>
            </div>
        </>
    );
};

export default TicketBlock;