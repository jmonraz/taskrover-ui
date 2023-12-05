// styles
import styles from './TicketConversationBlock.module.css';

const TicketConversationBlock = ({conversation}) => {
    return (
        <>
            <div className={styles['conversation-block']}>
                <p>[image] John Smith [public] [time of entry] [...]</p>
                <p>{conversation.message}</p>
            </div>
        </>
    );
};

export default TicketConversationBlock;