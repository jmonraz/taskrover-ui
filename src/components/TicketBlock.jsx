import styles from './TicketBlock.module.css';
import {useState, useRef, useEffect} from "react";
import personImage from '../assets/img/person1.webp';
import downArrowIcon from '../assets/icons/dropdown_arrow.svg';

const TicketBlock = ({onClick, ticketDetails, key}) => {
    const [isTicketStatus, setIsTicketStatus] = useState(false);
    const [isDeparment, setIsDeparment] = useState(false);
    const [isPriority, setIsPriority] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    // refs for each dropdown
    const ticketStatusRef = useRef(null);
    const departmentRef = useRef(null);
    const priorityRef = useRef(null);

    // handle click outside of dropdown
    const handleClickOutside = (e) => {
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

    const handleCheckboxChange = () =>
        setIsChecked(!isChecked);
    return (
        <>
            <div className={styles['ticket-block']} onClick={onClick} key={key}>
                <div className={styles['ticket-row']}>
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className={styles['custom-checkbox']} />
                    <img src={personImage} alt='person' className={styles['circular-image']} />
                    <div className={styles['ticket-col']}>
                        <div className={styles['ticket-row']}>
                            <p className={styles['ticket-title']}>{ticketDetails.title}</p>
                            <p className={styles['ticket-number']}>{ticketDetails.number}</p>
                        </div>
                        <div className={styles['ticket-row']}>
                            <p className={styles['ticket-date']}>{ticketDetails.date}</p>
                            <p className={styles['respond-wrapper']}>{ticketDetails.respond}</p>
                        </div>
                    </div>
                </div>
                <div className={styles['ticket-row']}>
                    <div className={`${styles['ticket-col']} ${styles['ticket-menu']}`}>
                        <div className={styles['ticket-row']}>
                            <p>Low</p>
                            <div className={styles['dropdown-container']} ref={priorityRef}>
                                <img src={downArrowIcon} alt='drop-arrow' className={styles['icon']} onClick={() => setIsPriority(!isPriority)}/>
                                {isPriority && (
                                    <div className={styles['dropdown-menu']}>
                                        <p className={styles['status-label']}><span>PRI</span>ORITY</p>
                                        <ul>
                                            <li>Low</li>
                                            <li>Medium</li>
                                            <li>High</li>
                                            <li>Urgent</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles['ticket-row']}>
                            <p>Orders</p>
                            <div className={styles['dropdown-container']} ref={departmentRef}>
                                <img src={downArrowIcon} alt='drop-arrow' className={styles['icon']} onClick={() => setIsDeparment(!isDeparment)}/>
                                {isDeparment && (
                                    <div className={styles['dropdown-menu']}>
                                        <p className={styles['status-label']}><span>DEP</span>ARTMENT</p>
                                        <ul>
                                            <li>Orders</li>
                                            <li>Shipping</li>
                                            <li>Delivery</li>
                                            <li>Return</li>
                                            <li>Refund</li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                        </div>
                        <div className={styles['ticket-row']}>
                            <p>Open</p>
                            <div className={styles['dropdown-container']} ref={ticketStatusRef}>
                                <img src={downArrowIcon} alt='drop-arrow' className={styles['icon']} onClick={() => setIsTicketStatus(!isTicketStatus)} />
                                {isTicketStatus && (
                                    <div className={styles['dropdown-menu']}>
                                        <p className={styles['status-label']}><span>STA</span>TUS</p>
                                        <ul>
                                            <li>Open</li>
                                            <li>On Hold</li>
                                            <li>Escalated</li>
                                            <li>Close</li>
                                            <li>In Progress</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default TicketBlock;