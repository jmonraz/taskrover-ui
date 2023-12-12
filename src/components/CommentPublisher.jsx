import React, {useState} from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
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
            <div>
                <ReactQuill value={comment} onChange={handleCommentChange} />
                <Button styleName='confirm-button' onClick={submitComment}>Submit</Button>
            </div>
        </>
    );
};

export default CommentPublisher;