import React, {useState} from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import styles from "./CommentPublisher.module.css";
import Button from "./Button";
import {addCommentToTicket} from "../utils/firebaseUtils";

const CommentPublisher = ({ticketId, handleReload, user, onClose}) => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (content) => {
        setComment(content);
    };

    const submitComment = async () => {
        if(comment !== '') {
            // publish comment
            await addCommentToTicket(ticketId, {
                comment: comment,
                commentDate: new Date(),
                commentOwner: user.firstName + ' ' + user.lastName,
            });
            console.log(comment);
            handleReload();
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