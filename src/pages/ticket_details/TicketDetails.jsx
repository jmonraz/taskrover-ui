// styles
import styles from "./TicketDetails.module.css";
// hooks
import React, {useEffect, useState, useContext} from "react";
import {useParams} from "react-router-dom";
// components
import TicketConversationBlock from "../../components/TicketConversationBlock";
import Button from "../../components/Button";
import CommentPublisher from "../../components/CommentPublisher";
import DropdownInput from "../../components/DropdownInput";
// utils
import {updateTicketStatus, getTicketById, getUserInformation, getUsersByRole, updateTicketOwner, getDepartments, updateTicketDepartment, getStatuses} from "../../utils/firebaseUtils";
import {UserContext} from "../../context/UserContext";
import underConstructionImg from "../../assets/img/website-maintenance.svg";

const TicketDetails = () => {
    const {authState} = useContext(UserContext);
    const {userType} = authState;
    const {ticketId} = useParams();
    const [ticket, setTicket] = useState(null);
    const [commentClicked, setCommentClicked] = useState(false);
    const [reload, setReload] = useState(false);
    const [user, setUser] = useState({});
    const [agents, setAgents] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [ticketActivity, setTicketActivity] = useState(true);
    const [ticketHistory, setTicketHistory] = useState(false);
    const [ticketNotes, setTicketNotes] = useState(false);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const fetchedTicket = await getTicketById(ticketId);
                setTicket(fetchedTicket);
            } catch (error) {
                console.log("Error fetching ticket: ", error);
            }
        }
        const fetchDepartments = async () => {
            const fetchedDepartments = await getDepartments();
            setDepartments(fetchedDepartments);
        }
        const fetchUserInformation = async () => {
            try {
                const fetchedUser = await getUserInformation();
                setUser(fetchedUser);
            } catch (error) {
                console.log("Error fetching user: ", error);
            }
        }

        const fetchStatuses = async () => {
            const fetchedStatuses = await getStatuses();
            console.log("Statuses fetched: ", fetchedStatuses);
            setStatuses(fetchedStatuses);
        }

        const fetchAgents = async () => {
            const fetchedAgents = await getUsersByRole('agent');
            setAgents(fetchedAgents);
            console.log("Agents fetched: ", fetchedAgents);
        }
        fetchTicket().then(r => console.log("Ticket fetched"));
        fetchDepartments().then(r => console.log("Departments fetched"));
        fetchUserInformation().then(r => console.log("User fetched"));
        fetchStatuses().then(r => console.log("Statuses fetched"));
        fetchAgents().then(r => console.log("Agents fetched"));
    }, [reload, ticketId]);

    const handleReload = () => {
        setReload(!reload);
    }

    const onCloseTicket = async () => {
        await updateTicketStatus(ticketId, 'Closed');
        setTicket({...ticket, ticketStatus: 'Closed'});
    }

    const onOpenTicket = async () => {
        await updateTicketStatus(ticketId, 'Open');
        setTicket({...ticket, ticketStatus: 'Open'});
    }

    const onTicketOwnerSelect = async (value) => {
        console.log("Selected value: ", value);
        await updateTicketOwner(ticketId, value);
    }

    const onUpdateDepartment = async (e) => {
        const value = e.target.value;
        await updateTicketDepartment(ticketId, value);
        setTicket({...ticket, ticketDepartment: value});
    }

    const onUpdateStatus = async (e) => {
        const value = e.target.value;
        await updateTicketStatus(ticketId, value);
        setTicket({...ticket, ticketStatus: value});
    }

    const handleTicketTabChange = (e) => {
        const value = e.target.innerText;
        if(value === 'Activity') {
            setTicketActivity(true);
            setTicketHistory(false);
            setTicketNotes(false);
        } else if(value === 'History') {
            setTicketActivity(false);
            setTicketHistory(true);
            setTicketNotes(false);
        } else if(value === 'Notes') {
            setTicketActivity(false);
            setTicketHistory(false);
            setTicketNotes(true);
        }
    }

    return (
        <>
            {ticket &&
                <div className={styles['main-container-row']}>
                    <div className={styles['left-container']}>
                        <p className={styles['ticket-header']}><span
                            className={styles['ticket-header-underline']}>CON</span>TACT INFO</p>
                        <div className={styles['ticket-header-content']}>
                            <p className={styles['ticket-contact-user']}>{ticket.contactUser}</p>
                            <p>{ticket.contactAccoundId}</p>
                            <p>{ticket.contactEmail}</p>
                        </div>
                        <div className={styles['ticket-header-break-line']}></div>
                        <p className={styles['ticket-header']}><span
                            className={styles['ticket-header-underline']}>TIC</span>KET PROPERTIES</p>
                        <div className={styles['ticket-header-content']}>
                            <p className={styles['ticket-subheader']}>Ticket Owner</p>
                            {userType === 'agent' ? (<DropdownInput options={agents} defaultOption={ticket.agentAssigned} onSelect={onTicketOwnerSelect}/>
                                ): (<p>{ticket.agentAssigned}</p>)}
                            <p className={styles['ticket-subheader']}>Status</p>
                            <select value={ticket.ticketStatus} onChange={onUpdateStatus}>
                                <option value={ticket.ticketStatus}>{ticket.ticketStatus}</option>
                                {statuses.map((status, _) => {
                                    return <option value={status.title}>{status.title}</option>
                                })}
                            </select>
                            <p className={styles['ticket-subheader']}>Created Date</p>
                            <p>{ticket.createdDate.toDate().toString()}</p>
                            <p className={styles['ticket-subheader']}>Tags</p>
                            {ticket.tags.map((tag, _) => <p>{tag}</p>)}
                        </div>
                        <div className={styles['ticket-header-break-line']}></div>
                        <p className={styles['ticket-header']}><span
                            className={styles['ticket-header-underline']}>TIC</span>KET INFORMATION</p>
                        <div className={styles['ticket-header-content']}>
                            <p className={styles['ticket-subheader']}>Secondary Contacts (CCs)</p>
                            <p>{ticket.secondaryContacts}</p>
                            <p className={styles['ticket-subheader']}>Phone</p>
                            <p>{ticket.contactPhone}</p>
                            {/*<p className={styles['ticket-subheader']}>Custom Field*</p>*/}
                            {/*<p>-</p>*/}
                        </div>
                        <div className={styles['ticket-header-break-line']}></div>
                        <p className={styles['ticket-header']}><span
                            className={styles['ticket-header-underline']}>ADD</span>ITIONAL INFORMATION</p>
                        <div className={styles['ticket-header-content']}>
                            <p className={styles['ticket-subheader']}>Language</p>
                            <p>{ticket.language}</p>
                            <p className={styles['ticket-subheader']}>Priority</p>
                            <p>{ticket.priority}</p>
                            {/*<p className={styles['ticket-subheader']}>Classifications</p>*/}
                            {/*<p>{ticket.classifications}</p>*/}
                        </div>

                    </div>

                    {/*right container*/}
                    <div className={styles['right-container']}>
                        <div className={styles['ticket-title']}>
                            <div className={styles['ticket-details-row']}>
                                <div>
                                    <p className={styles['ticket-title-text']}>{ticket.ticketTitle}</p>
                                </div>
                            </div>
                            <div className={styles['ticket-details-row']}>
                                <div className={styles['tkt-num-row']}>
                                    <p className={styles['ticket-number-bubble']}>{ticket.ticketNumber}</p>
                                    <select value={ticket.ticketDepartment} onChange={onUpdateDepartment}>
                                        <option value={ticket.ticketDepartment} >{ticket.ticketDepartment}</option>
                                        {departments.map((department, _) => {
                                            return <option value={department.title}>{department.title}</option>
                                        })}
                                    </select>
                                </div>
                                <div >
                                <Button onClick={() => {
                                        setCommentClicked(!commentClicked)
                                    }}>Comment</Button>
                                </div>
                            </div>
                            <div className={styles['ticket-params-row']}>
                                <p className={ticketActivity ? `${styles['active-tab']}` : ''} onClick={handleTicketTabChange}>Activity</p>
                                <p className={ticketHistory ? `${styles['active-tab']}` : ''} onClick={handleTicketTabChange}>History</p>
                                <p className={ticketNotes ? `${styles['active-tab']}` : ''} onClick={handleTicketTabChange}>Notes</p>
                            </div>
                        </div>

                        <div className={styles['ticket-conversation-container']}>
                        {ticketActivity && (
                                <>
                                {commentClicked &&
                                    <div>
                                        <CommentPublisher ticketId={ticket.id} handleReload={handleReload} user={user} onClose={() => setCommentClicked(false)} />
                                    </div>
                                }
                                <div className={styles['ticket-conversation-col']}>
                                    <div>
                                        {ticket && ticket.conversations && ticket.conversations.sort((a, b) => b.id - a.id)
                                            .map((conversation, _) => {
                                                for (var agent in agents) {
                                                    if (conversation.commentOwnerId === agent.id) {
                                                        const role = agent.role;
                                                        // return TicketConversationBlock with conditions based on role
                                                        return <TicketConversationBlock style={role === 'user' ? 'user-block' : 'agent-block'} ticketId={ticketId} key={conversation.id} conversation={conversation} onDelete={handleReload} />;
                                                    }
                                                }
                                                // If no matching agent is found, return default TicketConversationBlock
                                                return <TicketConversationBlock ticketId={ticketId} key={conversation.id} conversation={conversation} onDelete={handleReload} />;
                                            })
                                        }
                                    </div>
                                </div>

                                </>
                            )}
                            {ticketHistory && (
                                <>
                                    <img src={underConstructionImg} alt="Under Construction"
                                         className={styles['under-construction-img']}/>
                                    <p className={styles['warning-txt']}>This page is under construction.</p>
                                </>
                            )}
                            {ticketNotes && (
                                <>
                                    <img src={underConstructionImg} alt="Under Construction"
                                         className={styles['under-construction-img']}/>
                                    <p className={styles['warning-txt']}>This page is under construction.</p>
                                </>
                            )}
                        </div>

                        <div className={styles['ticket-container-footer']}>
                            {userType === 'agent' && ticket.ticketStatus !== 'Closed' &&
                                (
                                    <div>
                                    <Button styleName='close-button' onClick={onCloseTicket}>Close Ticket</Button>
                                    </div>
                                )}
                            {userType === 'agent' && ticket.ticketStatus === 'Closed' &&  (
                                <div className={styles['ticket-container-footer-open']}>
                                    <p className={styles['tkt-close']}>Ticket is closed</p>
                                    <Button styleName='green-button' onClick={onOpenTicket}>Open Ticket</Button>
                                </div>
                                )}
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default TicketDetails;