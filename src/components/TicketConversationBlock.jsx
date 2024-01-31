// styles
import styles from './TicketConversationBlock.module.css';
import Button from "./Button";
import {useState, useRef, useEffect, useContext} from "react";
import {UserContext} from "../context/UserContext";

//components
import CommentPublisher from "./CommentPublisher";

// utils
import {deleteComment} from "../utils/firebaseUtils";

const TicketConversationBlock = ({conversation, ticketId, onDelete}) => {
    // const commentWithBreaks = conversation.comment.replace(/\\n/g, "<br />");
    const {authState} = useContext(UserContext);
    const {userType} = authState;
    const [dotMenuClicked, setDotMenuClicked] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const dotMenuRef = useRef(null);

    Date.prototype.toString = function () {
        const options = {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        return this.toLocaleDateString('en-US', options);
    }

    useEffect(() => {
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

    const handleDeleteClick = () => {
        setDotMenuClicked(!dotMenuClicked)
        deleteComment(ticketId, conversation.id).then(r => console.log(r));
        onDelete();
    }

    const handleEdit = (comment) => {
        conversation.comment = comment;
    }

    return (
        <>
            <div className={styles['conversation-block']}>
                    {isEditing ? (
                        <CommentPublisher ticketId={ticketId} onClose={() => setIsEditing(!isEditing)} initialValue={conversation.comment} mode='edit' conversation={conversation} onEdit={handleEdit}/>
                        ) : (
                        <>
                            <div className={styles['conversation-block-row']}>
                                <div >
                                    <p className={styles['conversation-name']}>{conversation.commentOwner}</p>
                                    <p className={styles['conversation-date']}>{conversation.commentDate.toDate().toString()}</p>
                                </div>
                                {userType === 'agent' && (
                                    <div className={styles['button-container']}>
                                        <Button styleName='confirm-button'
                                                onClick={() => setDotMenuClicked(!dotMenuClicked)}>...</Button>
                                        {dotMenuClicked &&
                                            <div className={styles['dot-menu']} ref={dotMenuRef}>
                                                <ul>
                                                    <li onClick={handleEditClick}>Edit</li>
                                                    <li onClick={handleDeleteClick}>Delete</li>
                                                </ul>
                                            </div>}
                                    </div>
                                )}
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