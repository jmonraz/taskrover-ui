// styles
import styles from "./TicketDetails.module.css";

import {useEffect} from "react";

// components
import TicketConversationBlock from "../../components/TicketConversationBlock";

const TicketDetails = () => {

    const conversations = [
        {
            message: "Hi, I have a question about my order.",
            date: "08 Nov 02:56 pm",
            name: "John Smith"
        },
        {
            message: "Hello thank you for reaching out",
            date: "08 Nov 02:56 pm",
            name: "John Smith"
        }
    ];

    useEffect(() => {
        console.log('ticket details');
    }, []);
    return (
        <>
            <div className={styles['main-container-row']}>
                <div className={styles['left-container']}>
                    <p>CONTACT INFO</p>
                    <p>Test User</p>
                    <p>CUS001</p>
                    <p>test@gmail.com</p>
                    <hr />
                    <p>TICKET PROPERTIES</p>
                    <p>Ticket Owner</p>
                    <p>[PIC] John Smith</p>
                    <p>Status</p>
                    <p>Open V</p>
                    <p>Created Date</p>
                    <p>08 Nov 02:56 pm</p>
                    <p>Tags</p>
                    <p>Tag 1, Tag 2</p>
                    <p>TICKET INFORMATION</p>
                    <p>Secondary Contacts (CCs)</p>
                    <p>jorge@gmail.com</p>
                    <p>Phone</p>
                    <p>-</p>
                    <p>Custom Field*</p>
                    <p>-</p>
                    <p>ADDITIONAL INFORMATION</p>
                    <p>Language</p>
                    <p>English</p>
                    <p>Priority</p>
                    <p>Low</p>
                    <p>Classifications</p>
                    <p>Question V</p>
                </div>
                <div className={styles['right-container']}>
                    <div className={styles['ticket-header']}>
                        <p>Orders have not been picked up by Fedex [send] [comment]</p>
                        <p>[#123345] Orders</p>
                        <p>2 conversations attachment history </p>
                    </div>

                    <hr />
                    <div className={styles['ticket-conversation-container']}>
                        <div className={styles['ticket-conversation-col']}>
                            <div>
                                {conversations.map((conversation, index) => (
                                    <TicketConversationBlock conversation={conversation} />
                                )
                                )}
                            </div>
                            <div>
                                <hr />
                                <p>Close Ticket</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default TicketDetails;