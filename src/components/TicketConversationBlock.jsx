// styles
import styles from './TicketConversationBlock.module.css';
import Button from "./Button";

const TicketConversationBlock = ({conversation}) => {
    // const commentWithBreaks = conversation.comment.replace(/\\n/g, "<br />");
    return (
        <>
            <div className={styles['conversation-block']}>
                <div className={styles['conversation-block-row']}>
                    <div>
                        <p className={styles['conversation-name']}>{conversation.commentOwner}</p>
                        <p className={styles['conversation-date']}>{}</p>
                    </div>
                    <div>
                        <Button styleName='confirm-button'>Options</Button>
                    </div>
                </div>
                <p className={styles['conversation-text']} dangerouslySetInnerHTML={{ __html: conversation.comment}} ></p>
            </div>
        </>
    );
};

export default TicketConversationBlock;