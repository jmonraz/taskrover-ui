import React, {useContext, useEffect, useState} from "react";
import styles from "./CreateTicket.module.css";
// utils
import {addNewTicket, getDepartments, getUsersByRole, getAllUsers} from "../../utils/firebaseUtils";
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button";
import {UserContext} from "../../context/UserContext";

const Ticket = () => {
    const { authState } = useContext(UserContext);
    const navigate = useNavigate();

    const [description, setDescription] = useState('');
    const [department, setDepartment] = useState('');
    const [ticketOwner, setTicketOwner] = useState([]);
    const [subject,setSubject]= useState('');
    const [email,setEmail]= useState('');
    const [contactName,setContactName]= useState('');
    const [secondContact,setSecondContact]= useState('');
    const [account, setAccount]= useState('');

    const [departments, setDepartments] = useState([]);
    const [agents, setAgents] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [showContactSuggestions, setShowContactSuggestions] = useState(false);
    const [isContactDisabled, setIsContactDisabled] = useState(false);
    const [isMouseOverSuggestions, setIsMouseOverSuggestions] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedDepartments = await getDepartments();
                setDepartments(fetchedDepartments);
                const fetchedAgents = await getUsersByRole('agent');
                setAgents(fetchedAgents);
                const fetchedUsers = await getAllUsers();
                setUsers(fetchedUsers);
                setFilteredUsers(fetchedUsers);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData().then(r => console.log('Data fetched'));
    }, []);


    const handleCreateTicket = async () => {

        const ticketData = {
            // agentAssigned: ticketOwner.fullName,
            // agentAssignedId: ticketOwner.agentId,
            classifications: '',
            contactAccountId: account,
            contactEmail: email,
            contactPhone: '',
            contactUser: contactName,
            createdDate: new Date(),
            modifiedDate: new Date(),
            isLastRespondedAgent: false,
            language: '',
            lastTimeResponded: new Date(),
            priority: '',
            secondaryContacts: secondContact,
            tags: [],
            ticketDepartment: department,
            // createdBy: authState.firstName + ' ' + authState.lastName,
            // createdById: authState.userId,
            ticketStatus: 'Open',
            ticketTitle: subject,
        };

        const commentData = {
            comment: description,
            commentDate: new Date(),
            commentOwner: authState.firstName + ' ' + authState.lastName,
        };

        try {
            await addNewTicket(ticketData, commentData);
            navigate('/home/agent/dashboard');
        } catch (e) {
            console.error(e);
            alert("Failed to create ticket. Please try again."); // Consider a more user-friendly error handling mechanism
        }
    };

    const handleCancel = () => {
        if(authState.role === 'agent') {
            navigate('/home/agent/dashboard');
        } else {
            navigate('/home/user/dashboard');
        }
    };


    const onSetContact = (user) => {
        setContactName(user.fullName);
        setEmail(user.email);
        setShowContactSuggestions(false);
        setIsContactDisabled(true);
        setFilteredUsers(users);
    }

    const onBlurHandler = () => {
        if (!isMouseOverSuggestions && !isContactDisabled) {
            // No immediate action is needed if the mouse is over the suggestions
            setShowContactSuggestions(false);
            const isValidSelection = filteredUsers.some(user => user.fullName === contactName);
            if (!isValidSelection) {
                setContactName('');
            }
        }
    };


    const clearContact = () => {
        setContactName('');
        setIsContactDisabled(false);
        setShowContactSuggestions(false);
        setFilteredUsers(users);
        setEmail('');
    };

    const onFilterContact = (e) => {
        const value = e.target.value;
        setContactName(value);
        setIsContactDisabled(false); // Ensure input is enabled when typing
        if (value !== '') {
            setShowContactSuggestions(true); // Show suggestions when there is input
            const filtered = users.filter(user =>
                user.fullName.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            setShowContactSuggestions(false); // Hide suggestions when input is cleared
        }
    };

    const onHandleTicketOwner = (e) => {
        const selectedAgent = agents.find(agent => agent.id === e.target.value) || {};
        setTicketOwner(selectedAgent);
    };

    return (
        <>
            <div className={styles["ticket-container"]}>
                <div className={styles["ticket-form"]} >
                    <h2>Ticket Information</h2>
                    <div className={styles["form-row"]}>
                        <div className={styles["form-column"]}>
                            <label htmlFor="department">Department</label>
                            <select id="department" value={department}
                                    onChange={(e) => setDepartment(e.target.value)}>
                                <option value="" disabled>Select department</option>
                                {departments.map((department, index) => (
                                    <option key={index} value={department.title}>{department.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className={`${styles["form-column"]} ${styles['contact-ctr']}`}>
                            <label htmlFor="contact" className={styles.required}>Contact Name</label>
                            <div className={styles["input-group"]}>
                                <input
                                    type="text"
                                    id="contact"
                                    value={contactName}
                                    onChange={onFilterContact}
                                    disabled={isContactDisabled}
                                    onBlur={onBlurHandler}
                                />
                                {isContactDisabled && (
                                    <button onClick={clearContact} className={styles["clear-button"]}>
                                        X
                                    </button>
                                )}
                            </div>
                            {showContactSuggestions && (
                                <div className={styles["contact-suggestions"]}
                                    onMouseEnter={() => setIsMouseOverSuggestions(true)}
                                    onMouseLeave={() => setIsMouseOverSuggestions(false)}
                                >
                                    {filteredUsers.map((user, index) => (
                                        <div key={user.id} className={styles["contact-suggestion"]}
                                             onClick={() => onSetContact(user)}>{user.fullName}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={styles["form-row"]}>
                        <div className={styles["form-column"]}>
                            <label htmlFor="account">Account</label>
                            <input type="text" id="account" value={account}
                                   onChange={(e) => setAccount(e.target.value)}/>
                        </div>
                        <div className={styles["form-column"]}>
                            <label htmlFor="secondaryContacts">Secondary Contacts (CCs)</label>
                            <input type="text" id="secondaryContacts" value={secondContact}
                                   onChange={(e) => setSecondContact(e.target.value)}/>
                        </div>
                    </div>

                    <div className={styles["form-row"]}>
                        <div className={`${styles["form-column"]} ${styles['email-div']}`}>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" value={email} readOnly/>
                        </div>
                        <div className={styles["form-column"]}>
                            <label htmlFor="upload">Upload Pictures/Videos</label>
                            <div className={styles["upload-container"]}>
                                <input type="file" id="upload" style={{display: "none"}}/>
                                <label htmlFor="upload" className={styles["upload-button"]}>Upload</label>
                            </div>
                        </div>
                    </div>
                    <div className={styles["form-row"]}>
                        <div className={styles["form-column"]}>
                            <label htmlFor="ticketOwner">Assigned To</label>
                            <select id="ticketOwner" value={ticketOwner}
                                    onChange={e => onHandleTicketOwner(e)}>
                                {agents.map((agent, index) => (
                                    <option key={index} value={agent.id}>{agent.fullName}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles["form-column"]}>

                        </div>
                    </div>
                    <div className={styles["form-row"]}>
                        <div className={styles["form-column"]}>
                            <label htmlFor="subject" className={styles.required}>Subject</label>
                            <input required type="text" id="subject" value={subject}
                                   onChange={(e) => setSubject(e.target.value)}/>
                        </div>

                    </div>

                    <div className={styles["form-row"]}>
                        <div className={styles["form-column"]}>
                            <label htmlFor="description">Description</label>
                            <textarea id="description" rows="4" value={description}
                                      onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>

                    </div>
                    <div className={styles['form-row']}>
                        <div className={styles["button-container"]}>
                            <Button onClick={handleCreateTicket}>Create Ticket</Button>
                            <Button onClick={handleCancel} styleName='cancel-button'>Cancel</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Ticket;