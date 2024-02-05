// components
import SearchBar from "./SearchBar";
import AddDropdownButton from "./AddDropdownButton";
import Input from "./Input";
import Button from "./Button";

// firebase utils
import {signOut, createDepartment, getDepartments} from "../utils/firebaseUtils";
import {useFormInput} from "../hooks/useFormInput";

// styles
import styles from "./Navbar.module.css";

// assets
import logo from "../assets/logo/taskrover-logo-small.png";
import boxNotificationIcon from "../assets/icons/box_notification.svg";
import userNotificationIcon from "../assets/icons/user_box_notification.svg";
import userIcon from "../assets/icons/user_icon.svg";

// react
import { useState, useContext, useRef, useEffect} from "react";
import { UserContext } from "../context/UserContext";
import {useNavigate} from "react-router-dom";


const Navbar = () => {
    const { authState } = useContext(UserContext);
    const [showAddOptions, setShowAddOptions] = useState(false);
    const [createDepartmentBtn, setCreateDepartmentBtn] = useState(false);
    const {setUserState} = useContext(UserContext);
    const addDropdownRef = useRef(null);
    const navigate = useNavigate();
    const department = useFormInput('');
    const [departments, setDepartments] = useState([]);
    const [departmentExists, setDepartmentExists] = useState(false);
    const [departmentEmpty, setDepartmentEmpty] = useState(false);

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

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const fetchedDepartments = await getDepartments();
                setDepartments(fetchedDepartments);
            } catch (error) {
                console.log(error);
            }
        }
        fetchDepartments();
    }, []);

    const handleSignOut = () => {
        try {
            signOut().then(r => {});
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

    const handleOnClickDepartment = () => {
        setShowAddOptions(!showAddOptions);
        setCreateDepartmentBtn(!createDepartmentBtn);
    }

    const handleClickDepartmentClose = () => {
        setCreateDepartmentBtn(false);
    }

    const handleOnClickAnalytics = () => {
        navigate("agent/dashboard/analytics");
    }

    const handleClickCreateDepartment = async () => {
        setDepartmentEmpty(false);
        setDepartmentExists(false);
        if (department.value === '') {
            setDepartmentEmpty(true);
            return;
        }
        const exists = departments.some(d => d.title === department.value);
        if (exists) {
            setDepartmentExists(true);
        } else {
            try {
                const d = {
                    title: department.value
                }
                await createDepartment(d);
                setCreateDepartmentBtn(false);
                department.clearValue();
                setDepartmentExists(false);
            } catch (error) {
                console.log(error);
            }
        }

    }
    const handleOnClickUsers = () =>{
        navigate("agent/dashboard/accounts");
    }
    const handleOnClickSettings =() =>{
        if (authState.userType === 'agent') {
            navigate("agent/dashboard/settings");
        }else if (authState.userType === 'user'){
            navigate("user/dashboard/settings");
        }
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
                        {/*<li>KNOWLEDGE BASE</li>*/}
                        <li onClick={handleOnClickUsers}>ACCOUNTS/ USERS</li>
                        <li onClick={handleOnClickAnalytics}>ANALYTICS</li>
                    </ul>
                    {createDepartmentBtn && (
                        <div className={styles['department-overflow']}>
                            <div className={styles['department-container']}>
                                <div className={styles['department-container-row']}>
                                    <p>Create Department</p>
                                    <p className={styles['close']} onClick={handleClickDepartmentClose}>X</p>
                                </div>
                                <div className={styles['department-container-row-group']}>
                                    <Input type="text" styleName="main-input" placeholder="Department Name" inputProps={department} required={true}/>
                                    {departmentExists && <p className={styles['error']}>Department already exists</p>}
                                    {departmentEmpty && <p className={styles['error']}>Department name cannot be empty</p>}
                                    <Button styleName='green-button' onClick={handleClickCreateDepartment}>Create</Button>
                                </div>

                            </div>

                        </div>
                    )}
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
                                <li onClick={handleOnClickAccount}>Account</li>
                                {/*<li>Article</li>*/}
                                <li onClick={handleOnClickDepartment}>Department</li>
                            </ul>
                        </div>
                    )}
                </div>
                {/*<img src={boxNotificationIcon} alt="notifications" className={styles['icon']}/>*/}
                {/*<img src={gearIcon} alt="settings" className={styles['icon']}/>*/}
                <div className={styles['submenu-container']}>
                    <img src={userIcon} alt="users" className={styles['icon']}/>
                    <div className={styles['submenu']}>
                        <ul>
                            {/*<li>Profile</li>*/}
                            <li onClick={handleOnClickSettings}>Settings</li>
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
                {/*<img src={userNotificationIcon} alt="notifications" className={styles['user-icon']}/>*/}
                <div className={styles['submenu-container']}>
                    <img src={userIcon} alt="users" className={styles['user-icon']}/>
                    <div className={styles['submenu']}>
                        <ul>
                            {/*<li>Profile</li>*/}
                            <li onClick={handleOnClickSettings}>Settings</li>
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