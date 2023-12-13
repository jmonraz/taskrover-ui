// styles
import styles from './TicketConversationBlock.module.css';
import Button from "./Button";
import {useState, useRef, useEffect} from "react";

const TicketConversationBlock = ({conversation}) => {
    // const commentWithBreaks = conversation.comment.replace(/\\n/g, "<br />");
    const [dotMenuClicked, setDotMenuClicked] = useState(false);
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
    return (
        <>
            <div className={styles['conversation-block']}>
                <div className={styles['conversation-block-row']}>
                    <div>
                        <p className={styles['conversation-name']}>{conversation.commentOwner}</p>
                        <p className={styles['conversation-date']}>{conversation.commentDate.toDate().toString()}</p>
                    </div>
                    <div className={styles['button-container']}>
                        <Button styleName='confirm-button' onClick={() => setDotMenuClicked(!dotMenuClicked)}>...</Button>
                        {dotMenuClicked &&
                        <div className={styles['dot-menu']} ref={dotMenuRef} >
                            <ul>
                                <li>Edit</li>
                                <li>Delete</li>
                            </ul>
                        </div>}
                    </div>
                </div>
                <p className={styles['conversation-text']} dangerouslySetInnerHTML={{ __html: conversation.comment}} ></p>
            </div>
        </>
    );
};

export default TicketConversationBlock;