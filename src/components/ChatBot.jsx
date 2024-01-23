import {useState, useRef, useEffect} from "react";
import styles from "./ChatBot.module.css";
import chatBotIcon from "../assets/icons/chat_icon.svg";
const ChatBot = () => {

    const [userMessage, setUserMessage] = useState([]);
    const [userMessageInput, setUserMessageInput] = useState('');
    const [inputDisabled, setInputDisabled] = useState(true);
    const [finalMessage, setFinalMessage] = useState(false);

    const chatBodyRef = useRef(null);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [userMessage]);

    const initMessages = [
        "Hello, how can I help you today?",
        "Please select from the following options:",

    ];

    const ticketMessages = [
        "Great, I will gladly help you with creating a ticket!",
        "Please describe your inquiry in detail:",
    ];

    const userSelectionMessages = [
        "Create a ticket"
    ]

    const [optionSelected, setOptionSelected] = useState(false);

    const [chatBotOpen, setChatBotOpen] = useState(false);
    const OnHandleClickChat = () => {
        setChatBotOpen(!chatBotOpen);
    }

    const OnHandleClickOption = () => {
        setOptionSelected(true);
        setInputDisabled(false);
    }

    const OnHandleInputChange = (e) => {
        setUserMessageInput(e.target.value);
    }

    const OnHandleSendClick = () => {
        setUserMessage([...userMessage, userMessageInput]);
        setUserMessageInput('');
        setInputDisabled(true);
        setFinalMessage(true);
    }

    const OnHandleNewRequestClick = () => {
        setOptionSelected(false);
        setFinalMessage(false);
        setUserMessage([]);
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
                    <div className={styles['chat-bot-body']} ref={chatBodyRef}>
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
                            <div className={styles['user-message']}>
                                <p>{userSelectionMessages[0]}</p>
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
                        {userMessage.map((message) => {
                            return (
                                <div className={styles['user-message']}>
                                    <p>{message}</p>
                                </div>
                            );
                        })}
                        {finalMessage && (
                            <>
                                <div className={styles['chat-message']}>
                                    <p>Your ticket has been successfully created.</p>
                                </div>
                                <div className={styles['chat-message']}>
                                    <p>Here is the ticket id #ticket-number</p>
                                </div>
                                <div className={styles['chat-message']}>
                                    <p>Thanks for reaching out to us. An agent will respond to your ticket shortly.</p>
                                </div>
                                <div className={styles['chat-message']}>
                                    <p>Good bye!</p>
                                </div>
                            </>


                        )}
                        {finalMessage && (
                            <div className={styles['final-message']}>
                            <p>This chat has ended.</p>
                                <p onClick={OnHandleNewRequestClick}>New request</p>
                            </div>
                        )}
                    </div>
                    <hr className={styles['horizontal-line']} />
                    <div className={styles['chat-footer']}>
                        <input placeholder="Type message..." value={userMessageInput} onChange={OnHandleInputChange} disabled={inputDisabled} />
                        <button onClick={OnHandleSendClick}>Send</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;