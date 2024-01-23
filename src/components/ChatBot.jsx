import {useState} from "react";
import styles from "./ChatBot.module.css";
import chatBotIcon from "../assets/icons/chat_icon.svg";
const ChatBot = ({messages}) => {
    const initMessages = [
        "Hello, how can I help you today?",
        "Please select from the following options:",

    ];

    const ticketMessages = [
        "Great, I will gladly help you with creating a ticket!",
        "Please describe your issue in detail:",
    ];

    const [optionSelected, setOptionSelected] = useState(false);

    const [chatBotOpen, setChatBotOpen] = useState(false);
    const OnHandleClickChat = () => {
        setChatBotOpen(!chatBotOpen);
    }

    const OnHandleClickOption = () => {
        setOptionSelected(true);
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
                        {initMessages.map((message, index) => {
                            return (
                                <div className={styles['chat-message']}>
                                    <p>{message}</p>
                                </div>
                            );
                        })}
                        {!optionSelected && (
                            <div className={styles['chat-bot-ctr-ops']}>
                                <button onClick={OnHandleClickOption}>Create Ticket</button>
                            </div>
                        )}
                        {optionSelected && (
                            ticketMessages.map((message) => {
                                return (
                                    <div className={styles['chat-message']}>
                                        <p>{message}</p>
                                    </div>
                                );

                            })
                        )}
                    </div>
                    <hr className={styles['horizontal-line']} />
                    <div className={styles['chat-footer']}>
                        <input placeholder="Type message..." />
                        <button>Send</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;