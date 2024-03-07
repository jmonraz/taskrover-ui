import styles from "./UserWelcomePage.module.css";
import ChatBot from "../../components/ChatBot";
import Button from "../../components/Button";

// assets
import AgentImage from "../../assets/img/virtual-assistant.svg";

const UserWelcomePage = () => {
    return (
        <>
            <div className={styles['col']}>
                <div className={styles['row']}>
                    <div className={styles['banner-ctr']}>
                        <p>Welcome to Support</p>
                        <p>Search our knowledge base or submit a ticket</p>
                        {/*<SearchBar />*/}
                    </div>
                </div>
                <div className={styles['row']}>
                    <div className={styles['row-ch']}>
                        <div className={styles['agent-ctr']}>
                            <img src={AgentImage} alt="agent"/>
                        </div>
                    </div>
                    <div className={styles['row-ch']}>
                        <div className={styles['col-ch']}>
                            <p>Need assistance? Let's fix it! Start by submitting your ticket here.</p>
                            <Button onClick={() => {
                            }} styleName='green-button'>GET STARTED</Button>
                        </div>
                    </div>
                </div>
                <div className={styles['chat']}>
                    <ChatBot/>
                </div>
            </div>
        </>
    );
};

export default UserWelcomePage;