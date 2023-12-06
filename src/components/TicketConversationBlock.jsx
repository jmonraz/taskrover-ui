// styles
import styles from './TicketConversationBlock.module.css';
import Button from "./Button";

const TicketConversationBlock = ({conversation}) => {
    return (
        <>
            <div className={styles['conversation-block']}>
                <div className={styles['conversation-block-row']}>
                    <div>
                        <p className={styles['conversation-name']}>{conversation.name}</p>
                        <p className={styles['conversation-date']}>{conversation.date}</p>
                    </div>
                    <div>
                        <Button styleName='confirm-button'>Options</Button>
                    </div>
                </div>
                <p className={styles['conversation-text']}>{conversation.message}</p>
            </div>
        </>
    );
};

export default TicketConversationBlock;