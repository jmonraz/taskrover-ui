// components
import SearchBar from "./SearchBar";
import AddDropdownButton from "./AddDropdownButton";

// firebase utils
import {signOut} from "../utils/firebaseUtils";

// styles
import styles from "./Navbar.module.css";

// assets
import logo from "../assets/logo/taskrover-logo-small.png";
import boxNotificationIcon from "../assets/icons/box_notification.svg";
import userNotificationIcon from "../assets/icons/user_box_notification.svg";
import gearIcon from "../assets/icons/gear_icon.svg";
import userIcon from "../assets/icons/user_icon.svg";

// react
import { useState, useContext, useRef, useEffect} from "react";
import { UserContext } from "../context/UserContext";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const { authState } = useContext(UserContext);
    const [showAddOptions, setShowAddOptions] = useState(false);
    const {setUserState} = useContext(UserContext);
    const addDropdownRef = useRef(null);
    const navigate = useNavigate();

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
        try {
            const response = signOut();
            setUserState(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddDropdownButtonClicked = () => {
        setShowAddOptions(!showAddOptions);
    }
    const handleNewTicketClicked = () =>{
        if (authState.userType === 'agent') {
            navigate("agent/dashboard/create-a-ticket");
            handleAddDropdownButtonClicked();
        } else if (authState.userType === 'user'){
            navigate("user/dashboard/create-a-ticket");
        }
    }
    const handleOnClickTickets = () => {
        if (authState.userType === 'agent') {
            navigate("agent/dashboard");
        }else if (authState.userType === 'user'){
            navigate("user/dashboard");
        }
    }

    const handleOnClickHome = () => {
        if (authState.userType === 'agent') {
            navigate("agent/dashboard");
        }else if (authState.userType === 'user'){
            navigate("user/welcome");
        }
    }

    const handleOnClickAccount = () => {
        navigate("agent/dashboard/create-account");
    }

    const AgentNavbar = (
        <div className={styles['navbar']}>
            <div className={styles['navbar-row']}>
                <div className={styles['navbar-logo']}>
                    <img src={logo} alt="logo"/>
                </div>
                <div className={styles['navbar-items']}>
                    <ul>
                        <li onClick={handleOnClickTickets}>TICKETS</li>
                        <li>KNOWLEDGE BASE</li>
                        <li>CUSTOMERS</li>
                        <li>ANALYTICS</li>
                        {/*<li>CHAT</li>*/}
                    </ul>
                </div>
            </div>
            <div className={styles['navbar-row']}>
                <SearchBar/>
                <div className={styles['add-dropdown-container']}>
                    <AddDropdownButton onClick={handleAddDropdownButtonClicked}/>
                    {showAddOptions && (
                        <div className={styles['add-dropdown-submenu']} ref={addDropdownRef}>
                            <p className={styles['status-label']}><span>ADD</span> NEW</p>
                            <ul>
                                <li onClick={handleNewTicketClicked}>Ticket</li>
                                <li onClick={handleOnClickAccount}> Create Account</li>
                                <li>Article</li>
                            </ul>
                        </div>
                    )}
                </div>
                <img src={boxNotificationIcon} alt="notifications" className={styles['icon']}/>
                {/*<img src={gearIcon} alt="settings" className={styles['icon']}/>*/}
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
    );

    const UserNavbar = (
        <div className={styles['navbar']}>
            <div className={styles['navbar-row']}>
                <div className={styles['navbar-logo']}>
                    <img src={logo} alt="logo"/>
                </div>
                <div className={styles['navbar-items']}>
                    <ul>
                        <li onClick={handleOnClickHome}>HOME</li>
                        <li onClick={handleOnClickTickets}>TICKETS</li>
                    </ul>
                </div>

            </div>
            <div className={styles['navbar-row']}>
                {/*unnecessary element*/}
                {/*<img src={gearIcon} alt="settings" className={styles['user-icon']}/>*/}
                <div className={styles['add-dropdown-container']}>
                    <AddDropdownButton onClick={handleNewTicketClicked}/>
                </div>
                <img src={userNotificationIcon} alt="notifications" className={styles['user-icon']}/>
                <div className={styles['submenu-container']}>
                    <img src={userIcon} alt="users" className={styles['user-icon']}/>
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
    );

    return (
        <>
            {authState.userType === 'user' ? UserNavbar : AgentNavbar}
        </>
    );
};

export default Navbar;