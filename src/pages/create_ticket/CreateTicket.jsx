import React, {useContext, useEffect, useState} from "react";
import styles from "./CreateTicket.module.css";
// utils
import {addNewTicket, getDepartments, getUsersByRole} from "../../utils/firebaseUtils";
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button";
import {UserContext} from "../../context/UserContext";

const Ticket = () => {

    const [description, setDescription] = useState('');
    const [department, setDepartment] = useState('');
    const [status, setStatus] = useState('');
    const [ticketOwner, setTicketOwner] = useState('');
    const [subject,setSubject]= useState('');
    const [email,setEmail]= useState('');
    const [contactName,setContactName]= useState('');
    const [secondContact,setSecondContact]= useState('');
    const [account, setAccount]= useState('');
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [agents, setAgents] = useState([]);
    const { authState } = useContext(UserContext);

    useEffect(() => {
        const fetchDepartments = async () => {
                const fetchedDepartments = await getDepartments();
                setDepartments(fetchedDepartments);
        }
        const fetchAgents = async () => {
            const fetchedAgents = await getUsersByRole('agent');
            setAgents(fetchedAgents);
        }
        fetchDepartments().then(r => {});
        fetchAgents().then(r => {});
    }, []);


    const handleCreateTicket = async () => {
        if (!department || !contactName || !subject || !status) {
            alert("Please fill in all the required fields marked with an asterisk (*)");
            return;
        }
       try {
           await addNewTicket({
               agentAssigned: '',
               agentId: '',
               classifications: '',
               contactAccountId: account,
               contactEmail: email,
               contactPhone: '',
               contactUser: contactName,
               createdDate: new Date(),
               isLastRespondedAgent: false,
               language: '',
               lastTimeResponded: new Date(),
               priority: '',
               secondaryContacts: secondContact,
               tags: [],
               ticketDepartment: department,
               ticketOwner: ticketOwner,
               ticketOwnerId: authState.userId,
               ticketStatus: status,
               ticketTitle: subject,
           }, {
               comment: description,
               commentDate: new Date(),
               commentOwner: 'John Doe',
           })
       } catch (e) {
              console.log(e);
              throw e;
       }
       navigate('/home/agent/dashboard');
    };

    const handleCancel = () => {
        if(authState.role === 'agent') {
            navigate('/home/agent/dashboard');
        } else {
            navigate('/home/user/dashboard');
        }
    };

    return (
        <>
            <div className={styles["ticket-container"]}>
                <form className={styles["ticket-form"]}>
                    <h2>Ticket Information</h2>
                    <div className={styles["form-row"]}>
                        <div className={styles["form-column"]}>
                            <label htmlFor="department">Department</label>
                            <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)}>
                                {departments.map((department, index) => (
                                    <option key={index} value={department.title}>{department.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles["form-column"]}>
                            <label htmlFor="contact" className={styles.required}>Contact Name</label>
                            <input type="text" id="contact" value={contactName}
                                   onChange={(e) => setContactName(e.target.value)}/>
                        </div>
                    </div>

                    <div className={styles["form-row"]}>
                        <div className={styles["form-column"]}>
                            <label htmlFor="account">Account Name</label>
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
                        <div className={styles["form-column"]}>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
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
                            <label htmlFor="ticketOwner">Ticket Owner</label>
                            <select id="ticketOwner" value={ticketOwner}
                                    onChange={(e) => setTicketOwner(e.target.value)}>
                                {agents.map((agent, index) => (
                                    <option key={index} value={agent.fullName}>{agent.fullName}</option>
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
                </form>
            </div>

        </>
    );
};

export default Ticket;