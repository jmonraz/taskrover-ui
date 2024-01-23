import styles from "./ChatBot.module.css";
import chatBotIcon from "../assets/icons/chat_icon.svg";
const ChatBot = () => {
    return (
        <>
            <div className={styles['chat-bubble']}>
                <img src={chatBotIcon} alt="Chat Bot Icon" />
            </div>
        </>
    );
};

export default ChatBot;