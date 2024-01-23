import styles from "./UserWelcomePage.module.css";
import {useNavigate} from "react-router-dom";
import SearchBar from "../../components/SearchBar";

const UserWelcomePage = () => {
    return (
        <>
            <div className={styles['col']}>
                <div className={styles['row']}>
                    <div className={styles['banner-ctr']}>
                        <p>Welcome to Support</p>
                        <p>Search our knowledge base or submit a ticket</p>
                        <SearchBar />
                    </div>
                </div>
                <div className={styles['row']}>
                </div>
                <div className={styles['row']}>

                </div>
            </div>
        </>
    );
};

export default UserWelcomePage;