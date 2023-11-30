
// styles
import styles from "./Navbar.module.css";

// assets
import logo from "../assets/logo/taskrover-logo-small.png";

const Navbar = () => {
    return (
        <>
            <div className={styles['navbar']}>
                <div className={styles['navbar-row']}>
                    <div className={styles['navbar-logo']}>
                        <img src={logo} alt="logo" />
                    </div>
                    <div className={styles['navbar-items']}>
                        <ul>
                            <li>TICKETS</li>
                            <li>KNOWLEDGE BASE</li>
                            <li>CUSTOMERS</li>
                            <li>ANALYTICS</li>
                            <li>CHAT</li>
                        </ul>
                    </div>
                </div>
                <div className={styles['navbar-row']}>
                    <p>SearchBar</p>
                    <p>Add button</p>
                    <p>Notification Box</p>
                    <p>Gear Icon</p>
                    <p>User Icon</p>
                </div>
            </div>
        </>
    );
};

export default Navbar;