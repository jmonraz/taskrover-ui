// styles
import styles from './TicketConversationBlock.module.css';
import Button from "./Button";
import {useState, useRef, useEffect} from "react";

//components
import CommentPublisher from "./CommentPublisher";

const TicketConversationBlock = ({conversation, ticketId}) => {
    // const commentWithBreaks = conversation.comment.replace(/\\n/g, "<br />");
    const [dotMenuClicked, setDotMenuClicked] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const dotMenuRef = useRef(null);

    Date.prototype.toString = function () {
        const options = {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        return this.toLocaleDateString('en-US', options);
    }

    useEffect(() => {
        console.log(conversation);
        const handleClickOutside = (event) => {
            if (dotMenuRef.current && !dotMenuRef.current.contains(event.target)) {
                setDotMenuClicked(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [dotMenuRef]);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
        setDotMenuClicked(!dotMenuClicked);
    }
    return (
        <>
            <div className={styles['conversation-block']}>
                    {isEditing ? (
                        <CommentPublisher ticketId={ticketId} onClose={() => setIsEditing(!isEditing)} initialValue={conversation.comment} mode='edit' conversation={conversation}/>
                        ) : (
                        <>
                            <div className={styles['conversation-block-row']}>
                                <div >
                                    <p className={styles['conversation-name']}>{conversation.commentOwner}</p>
                                    <p className={styles['conversation-date']}>{conversation.commentDate.toDate().toString()}</p>
                                </div>
                                <div className={styles['button-container']}>
                                    <Button styleName='confirm-button'
                                            onClick={() => setDotMenuClicked(!dotMenuClicked)}>...</Button>
                                    {dotMenuClicked &&
                                        <div className={styles['dot-menu']} ref={dotMenuRef}>
                                            <ul>
                                                <li onClick={handleEditClick}>Edit</li>
                                                <li>Delete</li>
                                            </ul>
                                        </div>}
                                </div>
                            </div>
                            <div className={styles['conversation-block-row']}>
                                <p className={styles['conversation-text']}
                                   dangerouslySetInnerHTML={{__html: conversation.comment}}></p>
                            </div>
                        </>
                    )}
            </div>
        </>
    );
};

export default TicketConversationBlock;