import styles from './TicketBlock.module.css';
import {useState, useRef, useEffect, useContext} from "react";
import {UserContext, } from "../context/UserContext";
import personImage from '../assets/img/person1.webp';
import downArrowIcon from '../assets/icons/dropdown_arrow.svg';
import {updateTicketStatus, updateTicketPriority, updateTicketDepartment} from "../utils/firebaseUtils";

const TicketBlock = ({onClick, ticketDetails }) => {
    const {authState} = useContext(UserContext);
    const {userType} = authState;
    const statuses = ['Open', 'On Hold', 'Escalated', 'Close', 'In Progress'];
    const departments = ['Orders', 'Shipping', 'Delivery', 'Return', 'Refund'];
    const priorities = ['Low', 'Medium', 'High', 'Urgent'];

    const [isTicketStatus, setIsTicketStatus] = useState(false);
    const [isDeparment, setIsDeparment] = useState(false);
    const [isPriority, setIsPriority] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
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
        console.log(authState);
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCheckboxChange = () =>
        setIsChecked(!isChecked);

    const handleDropdownClick = (e, toggleDropdown) => {
        e.stopPropagation();
        toggleDropdown(prevState => !prevState);
    }

    const handleClickStatus = async (e, status) => {
        e.stopPropagation();
        console.log('status', status);
        console.log('ticketDetails', ticketDetails);
        setTicketStatus(status);
        setIsTicketStatus(false);
        await updateTicketStatus(ticketDetails.id, status);
        // setIsTicketStatus(status);
    }
    const handleClickDepartment = async (e, department) => {
        e.stopPropagation();
        console.log('department', department);
        console.log('ticketDetails', ticketDetails);
        setTicketDepartment(department);
        setIsDeparment(false);
        await updateTicketDepartment(ticketDetails.id, department);
    }

    const handleClickPriority = async (e, priority) => {
        e.stopPropagation();
        console.log('priority', priority);
        console.log('ticketDetails', ticketDetails);
        setTicketPriority(priority);
        setIsPriority(false);
        await updateTicketPriority(ticketDetails.id, priority);
    }

    return (
        <>
            <div className={styles['ticket-block']} onClick={() => onClick(ticketDetails)} >
                <div className={styles['ticket-row']}>
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className={styles['custom-checkbox']} />
                    <img src={personImage} alt='person' className={styles['circular-image']} />
                    <div className={styles['ticket-col']}>
                        <div className={styles['ticket-row']}>
                            <p className={styles['ticket-title']}>{ticketDetails.ticketTitle}</p>
                            <p className={styles['ticket-number']}>{ticketDetails.ticketNumber}</p>
                        </div>
                        <div className={styles['ticket-row']}>
                            <p className={styles['ticket-date']}>{ticketDetails.createdDate.toDate().toString()}</p>
                            <p className={styles['respond-wrapper']}>{ticketDetails.respond}</p>
                        </div>
                    </div>
                </div>
                {userType === 'agent' && (
                    <div className={styles['ticket-row']}>
                        <div className={`${styles['ticket-col']} ${styles['ticket-menu']}`}>
                            <div className={styles['ticket-row']}>
                                <p>{ticketPriority}</p>
                                <div className={styles['dropdown-container']} ref={priorityRef}>
                                    <img src={downArrowIcon} alt='drop-arrow' className={styles['icon']}
                                         onClick={(e) => handleDropdownClick(e, setIsPriority)}/>
                                    {isPriority && (
                                        <div className={styles['dropdown-menu']}>
                                            <p className={styles['status-label']}><span>PRI</span>ORITY</p>
                                            <ul>
                                                {priorities.map((priority, index) => (
                                                        <li key={index}
                                                            onClick={(e) => handleClickPriority(e, priority)}>{priority}</li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={styles['ticket-row']}>
                                <p>{ticketDepartment}</p>
                                <div className={styles['dropdown-container']} ref={departmentRef}>
                                    <img src={downArrowIcon} alt='drop-arrow' className={styles['icon']}
                                         onClick={(e) => handleDropdownClick(e, setIsDeparment)}/>
                                    {isDeparment && (
                                        <div className={styles['dropdown-menu']}>
                                            <p className={styles['status-label']}><span>DEP</span>ARTMENT</p>
                                            <ul>
                                                {departments.map((department, index) => (
                                                        <li key={index}
                                                            onClick={(e) => handleClickDepartment(e, department)}>{department}</li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                            </div>
                            <div className={styles['ticket-row']}>
                                <p>{ticketStatus}</p>
                                <div className={styles['dropdown-container']} ref={ticketStatusRef}>
                                    <img src={downArrowIcon} alt='drop-arrow' className={styles['icon']}
                                         onClick={(e) => handleDropdownClick(e, setIsTicketStatus)}/>
                                    {isTicketStatus && (
                                        <div className={styles['dropdown-menu']}>
                                            <p className={styles['status-label']}><span>STA</span>TUS</p>
                                            <ul>
                                                {statuses.map((status, index) => (
                                                        <li key={index}
                                                            onClick={(e) => handleClickStatus(e, status)}>{status}</li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                )}


            </div>
        </>
    );
};

export default TicketBlock;