// components
import SearchBar from "./SearchBar";
import AddDropdownButton from "./AddDropdownButton";

// styles
import styles from "./Navbar.module.css";

// assets
import logo from "../assets/logo/taskrover-logo-small.png";
import boxNotificationIcon from "../assets/icons/box_notification.svg";
import gearIcon from "../assets/icons/gear_icon.svg";
import userIcon from "../assets/icons/user_icon.svg";

// react
import { useState, useContext, useRef, useEffect} from "react";
import { UserContext } from "../context/UserContext";

const Navbar = () => {

    const [showAddOptions, setShowAddOptions] = useState(false);
    const {setUserState} = useContext(UserContext);
    const addDropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (addDropdownRef.current && !addDropdownRef.current.contains(event.target)) {
            setShowAddOptions(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSignOut = () => {
        setUserState(false);
    }

    const handleAddDropdownButtonClicked = () => {
        setShowAddOptions(!showAddOptions);
    }
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
                    <SearchBar />
                    <div className={styles['add-dropdown-container']}>
                        <AddDropdownButton onClick={handleAddDropdownButtonClicked} />
                        {showAddOptions && (
                            <div className={styles['add-dropdown-submenu']} ref={addDropdownRef}>
                                <p className={styles['status-label']}><span>ADD</span> NEW</p>
                                <ul>
                                    <li>Task</li>
                                    <li>Project</li>
                                    <li>Customer</li>
                                    <li>Invoice</li>
                                    <li>Expense</li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <img src={boxNotificationIcon} alt="notifications" className={styles['icon']}/>
                    <img src={gearIcon} alt="settings" className={styles['icon']} />
                    <div className={styles['submenu-container']}>
                        <img src={userIcon} alt="users" className={styles['icon']}/>
                        <div className={styles['submenu']}>
                            <ul>
                                <li>Profile</li>
                                <li>Settings</li>
                                <li onClick={handleSignOut}>Sign Out</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Navbar;