// styles
import styles from "./TicketDetails.module.css";
// hooks
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
// components
import TicketConversationBlock from "../../components/TicketConversationBlock";
import Button from "../../components/Button";
import CommentPublisher from "../../components/CommentPublisher";
// utils
import {getTicketById} from "../../utils/firebaseUtils";

const TicketDetails = () => {
    const {ticketId} = useParams();
    const [ticket, setTicket] = useState(null);
    const [commentClicked, setCommentClicked] = useState(false);

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
        fetchTicket().then(r => console.log("Ticket fetched"));
    }, []);

    return (
        <>
            {ticket &&
                <div className={styles['main-container-row']}>
                    <div className={styles['left-container']}>
                        <p className={styles['ticket-header']}><span
                            className={styles['ticket-header-underline']}>CON</span>TACT INFO</p>
                        <div className={styles['ticket-header-content']}>
                            <p>{ticket.contactUser}</p>
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
                            <p>Tag 1, Tag 2</p>
                        </div>
                        <div className={styles['ticket-header-break-line']}></div>
                        <p className={styles['ticket-header']}><span
                            className={styles['ticket-header-underline']}>TIC</span>KET INFORMATION</p>
                        <div className={styles['ticket-header-content']}>
                            <p className={styles['ticket-subheader']}>Secondary Contacts (CCs)</p>
                            <p>{ticket.secondaryContacts}</p>
                            <p className={styles['ticket-subheader']}>Phone</p>
                            <p>{ticket.contactPhone}</p>
                            <p className={styles['ticket-subheader']}>Custom Field*</p>
                            <p>-</p>
                        </div>
                        <div className={styles['ticket-header-break-line']}></div>
                        <p className={styles['ticket-header']}><span
                            className={styles['ticket-header-underline']}>ADD</span>ITIONAL INFORMATION</p>
                        <div className={styles['ticket-header-content']}>
                            <p className={styles['ticket-subheader']}>Language</p>
                            <p>{ticket.language}</p>
                            <p className={styles['ticket-subheader']}>Priority</p>
                            <p>{ticket.priority}</p>
                            <p className={styles['ticket-subheader']}>Classifications</p>
                            <p>{ticket.classifications}</p>
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
                            {commentClicked &&
                                <CommentPublisher />
                            }
                        </div>

                        <hr/>
                        <div className={styles['ticket-conversation-container']}>
                            <div className={styles['ticket-conversation-col']}>
                                <div>
                                    {ticket && ticket.conversations && ticket.conversations.slice().reverse().map((conversation, index) => (
                                            <TicketConversationBlock conversation={conversation}/>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={styles['ticket-container-footer']}>
                            <div>
                                <Button styleName='close-button'>Close Ticket</Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default TicketDetails;