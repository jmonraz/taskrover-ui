import React, {useContext, useState} from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import styles from "./CommentPublisher.module.css";
import Button from "./Button";
import {addCommentToTicket, updateTicket} from "../utils/firebaseUtils";
import {UserContext} from "../context/UserContext";

const CommentPublisher = ({ticketId, handleReload, user, onClose, initialValue = '', mode = 'comment', conversation, onEdit}) => {
    const {authState} = useContext(UserContext);
    const [comment, setComment] = useState(initialValue);

    const handleCommentChange = (content) => {
        setComment(content);
    };

    const submitComment = async () => {
        if(mode === 'comment') {
            if(comment !== '') {
                // publish comment
                await addCommentToTicket(ticketId, {
                    comment: comment,
                    commentDate: new Date(),
                    commentOwner: user.firstName + ' ' + user.lastName,
                    commentOwnerId: user.id,
                    editDate: null,
                    editOwner: null
                });
                console.log(comment);
                handleReload();
                onClose();
            }
        } else if (mode === 'edit') {
            // edit comment
            const conversationId = 'comment_' + conversation.id;
            await updateTicket(ticketId, conversationId, {
                comment: comment,
                editDate: new Date(),
                editOwner: authState.userId
            });
            onEdit(comment);
            onClose();
        }
        setComment('');
    }

    return (
        <>
            <div className={styles['main-container']}>
                <div className={styles['react-quill-editor']}>
                    <div>
                        <ReactQuill value={comment} onChange={handleCommentChange}
                                    className={styles['comment-editor']}/>
                    </div>
                    <div className={styles['button-container']}>
                        <Button onClick={submitComment}>Publish</Button>
                        <Button styleName='cancel-button' onClick={onClose}>Cancel</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommentPublisher;