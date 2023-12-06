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
                    <p className={styles['ticket-header']}><span className={styles['ticket-header-underline']}>CON</span>TACT INFO</p>
                    <div className={styles['ticket-header-content']}>
                        <p>Test User</p>
                        <p>CUS001</p>
                        <p>test@gmail.com</p>
                    </div>
                    <div className={styles['ticket-header-break-line']}></div>
                    <p className={styles['ticket-header']}><span className={styles['ticket-header-underline']}>TIC</span>KET PROPERTIES</p>
                    <div className={styles['ticket-header-content']}>
                        <p className={styles['ticket-subheader']}>Ticket Owner</p>
                        <p>[PIC] John Smith</p>
                        <p className={styles['ticket-subheader']}>Status</p>
                        <p>Open V</p>
                        <p className={styles['ticket-subheader']}>Created Date</p>
                        <p>08 Nov 02:56 pm</p>
                        <p className={styles['ticket-subheader']}>Tags</p>
                        <p>Tag 1, Tag 2</p>
                    </div>
                    <div className={styles['ticket-header-break-line']}></div>
                    <p className={styles['ticket-header']}><span className={styles['ticket-header-underline']}>TIC</span>KET INFORMATION</p>
                    <div className={styles['ticket-header-content']}>
                        <p className={styles['ticket-subheader']}>Secondary Contacts (CCs)</p>
                        <p>jorge@gmail.com</p>
                        <p className={styles['ticket-subheader']}>Phone</p>
                        <p>-</p>
                        <p className={styles['ticket-subheader']}>Custom Field*</p>
                        <p>-</p>
                    </div>
                    <div className={styles['ticket-header-break-line']}></div>
                    <p className={styles['ticket-header']}><span className={styles['ticket-header-underline']}>ADD</span>ITIONAL INFORMATION</p>
                    <div className={styles['ticket-header-content']}>
                        <p className={styles['ticket-subheader']}>Language</p>
                        <p>English</p>
                        <p className={styles['ticket-subheader']}>Priority</p>
                        <p>Low</p>
                        <p className={styles['ticket-subheader']}>Classifications</p>
                        <p>Question V</p>
                    </div>

                </div>
                <div className={styles['right-container']}>
                    <div className={styles['ticket-title']}>
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