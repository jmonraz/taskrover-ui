// styles
import styles from './TicketConversationBlock.module.css';
import Button from "./Button";

const TicketConversationBlock = ({conversation}) => {
    // const commentWithBreaks = conversation.comment.replace(/\\n/g, "<br />");
    Date.prototype.toString = function () {
        const options = {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
        return this.toLocaleDateString('en-US', options);
    }
    return (
        <>
            <div className={styles['conversation-block']}>
                <div className={styles['conversation-block-row']}>
                    <div>
                        <p className={styles['conversation-name']}>{conversation.commentOwner}</p>
                        <p className={styles['conversation-date']}>{conversation.commentDate.toDate().toString()}</p>
                    </div>
                    <div>
                        <Button styleName='confirm-button'>...</Button>
                    </div>
                </div>
                <p className={styles['conversation-text']} dangerouslySetInnerHTML={{ __html: conversation.comment}} ></p>
            </div>
        </>
    );
};

export default TicketConversationBlock;