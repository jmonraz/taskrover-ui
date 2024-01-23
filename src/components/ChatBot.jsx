import {useState} from "react";
import styles from "./ChatBot.module.css";
import chatBotIcon from "../assets/icons/chat_icon.svg";
const ChatBot = () => {

    const [chatBotOpen, setChatBotOpen] = useState(false);
    const OnHandleClickChat = () => {
        setChatBotOpen(!chatBotOpen);
    }
    return (
        <>
            <div className={styles['chat-bubble']} onClick={OnHandleClickChat}>
                <img src={chatBotIcon} alt="Chat Bot Icon" />

            </div>
            {chatBotOpen && (
                <div className={styles['chat-bot-ctr']}>
                    <div className={styles['chat-bot-header']}>
                        <p className={styles['chat-bot-title']}>TaskRover Chat</p>
                        <p className={styles['chat-bot-close']} onClick={OnHandleClickChat}>X</p>
                    </div>
                    <div className={styles['chat-bot-body']}>
                        <p>Chat Bot Body</p>
                    </div>
                    <div className={styles['chat-footer']}>
                        <p>Send Message</p>
                        <p>Button</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;