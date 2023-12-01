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
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
    const {setUserState} = useContext(UserContext);

    const handleSignOut = () => {
        setUserState(false);
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
                    <AddDropdownButton />
                    <img src={boxNotificationIcon} alt="notifications" className={styles['icon']}/>
                    <img src={gearIcon} alt="settings" className={styles['icon']} />
                    <div className={styles['user-icon-container']}>
                        <img src={userIcon} alt="users" className={styles['icon']}/>
                        <div className={styles['submenu']}>
                            <ul>
                                <li>Profile</li>
                                <li>Settings</li>
                                <li onClick={handleSignOut}>Sign Out</li>
                            </ul>
                        </div>
                    </div>

                    {/*{showSubmenu && (*/}
                    {/*    <div className={styles['submenu']}>*/}
                    {/*        <ul>*/}
                    {/*            <li>Profile</li>*/}
                    {/*            <li>Settings</li>*/}
                    {/*            <li onClick={handleSignOut}>Sign Out</li>*/}
                    {/*        </ul>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
            </div>
        </>
    );
};

export default Navbar;