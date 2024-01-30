// styles
import styles from "./TicketDetails.module.css";
// hooks
import {useEffect, useState, useContext} from "react";
import {useParams} from "react-router-dom";
// components
import TicketConversationBlock from "../../components/TicketConversationBlock";
import Button from "../../components/Button";
import CommentPublisher from "../../components/CommentPublisher";
// utils
import {updateTicketStatus, getTicketById, getUserInformation} from "../../utils/firebaseUtils";
import {UserContext} from "../../context/UserContext";

const TicketDetails = () => {
    const {authState} = useContext(UserContext);
    const {userType} = authState;
    const {ticketId} = useParams();
    const [ticket, setTicket] = useState(null);
    const [commentClicked, setCommentClicked] = useState(false);
    const [reload, setReload] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const fetchedTicket = await getTicketById(ticketId);
                setTicket(fetchedTicket);
                console.log("Fetched ticket conversations: ", fetchedTicket.conversations);
            } catch (error) {
                console.log("Error fetching ticket: ", error);
            }
        }
        const fetchUserInformation = async () => {
            try {
                const fetchedUser = await getUserInformation();
                setUser(fetchedUser);
            } catch (error) {
                console.log("Error fetching user: ", error);
            }
        }
        fetchTicket().then(r => console.log("Ticket fetched"));
        fetchUserInformation().then(r => console.log("User fetched"));
    }, [reload, ticketId]);

    const handleReload = () => {
        setReload(!reload);
    }

    const onCloseTicket = async () => {
        await updateTicketStatus(ticketId, 'Closed');
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
                            <p>{ticket.ticketOwner}</p>
                            <p className={styles['ticket-subheader']}>Status</p>
                            <p>{ticket.ticketStatus}</p>
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
                    <div className={styles['right-container']}>
                        <div className={styles['ticket-title']}>
                            <div className={styles['ticket-details-row']}>
                                <div>
                                    <p className={styles['ticket-title-text']}>{ticket.ticketTitle}</p>
                                </div>
                                <div>
                                    <Button onClick={() => {setCommentClicked(!commentClicked)}}>Comment</Button>
                                </div>
                            </div>
                            <div className={styles['ticket-details-row']}>
                                <p className={styles['ticket-number-bubble']}>{ticket.ticketNumber}</p>
                                <p>{ticket.ticketDepartment}</p>
                            </div>

                        </div>

                        <div className={styles['ticket-conversation-container']}>
                            {commentClicked &&
                                <div>
                                    <CommentPublisher ticketId={ticket.id} handleReload={handleReload} user={user} onClose={() => setCommentClicked(false)} />
                                </div>
                            }
                            <div className={styles['ticket-conversation-col']}>
                                <div>
                                    {ticket && ticket.conversations && ticket.conversations.sort((a, b) => b.id - a.id)
                                        .map((conversation, _) =>
                                            <TicketConversationBlock ticketId={ticketId} key={conversation.id} conversation={conversation} onDelete={handleReload} />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={styles['ticket-container-footer']}>
                            {userType === 'agent' &&
                                (<div>
                                    <Button styleName='close-button' onClick={onCloseTicket}>Close Ticket</Button>

                                </div>)}
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default TicketDetails;