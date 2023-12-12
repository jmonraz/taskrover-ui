import React, {useState} from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import styles from "./CommentPublisher.module.css";
import Button from "./Button";

const CommentPublisher = () => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (content) => {
        setComment(content);
    };

    const submitComment = () => {
        console.log(comment);
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
                        <Button>Publish</Button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default CommentPublisher;