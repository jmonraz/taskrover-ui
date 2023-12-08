import React, {useState} from "react";
import styles from "./CreateTicket.module.css";

const Ticket = () => {

    const [description, setDescription] = useState('');
    const [department, setDepartment] = useState('');
    const [status, setStatus] = useState('');
    const [ticketOwner, setTicketOwner] = useState('');
    const [ticketList, setTicketList] = useState([]);
    const [subject,setSubject]= useState('');
    const [customField,setCustomField]= useState('');
    const [email,setEmail]= useState('');
    const [contactName,setContactName]= useState('');
    const [secondContact,setSecondContact]= useState('');
    const [account, setAccount]= useState('');




    const handleCreateTicket = () => {
        const newTicket = {
            id: ticketList.length +1,
            title: subject,
            description: description,
            department,
            status,
            ticketOwner,
            customField,
            email,
            contactName,
            secondContact,
            account
        };

        // Add the new ticket to the ticketList
        setTicketList([...ticketList, newTicket]);
        // Clear the input fields
        setDescription('');
        setDepartment('');
        setStatus('');
        setTicketOwner('');
        setSubject('');
        setCustomField('');
        setEmail('');
        setContactName('');
        setSecondContact('');
        setAccount('');
    };

    const handleCancel = () => {
        setDescription('');
        setDepartment('');
        setStatus('');
        setTicketOwner('');
        setSubject('');
        setCustomField('');
        setEmail('');
        setContactName('');
        setSecondContact('');
        setAccount('');
    };

    return (
        <>
            <div className={styles["ticket-container"]}>
                <form className={styles["ticket-form"]}>
                    <h2>Ticket Information</h2>
                    <div className={styles["form-row"]}>
                        <div className={styles["form-column"]}>
                            <label htmlFor="department">Department</label>
                            <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)} style={ {width: '100%', padding: '8px', boxSizing: 'border-box'}}>
                            <option value="" >Select a Department</option>
                            <option value="IT">IT</option>
                            <option value="Order">Order</option>
                            </select>
                        </div>
                        <div className={styles["form-column"]}>
                            <label htmlFor="contact" className={styles.required}>Contact Name</label>
                            <input type="text" id="contact" value={contactName} onChange={(e)=> setContactName(e.target.value)} style={ {width: '100%', padding: '8px', boxSizing: 'border-box'}}/>
                        </div>
                    </div>

                    <div className={styles["form-row"]}>
                        <div className={styles["form-column"]}>
                            <label htmlFor="account">Account Name</label>
                            <input type="text" id="account" value={account} onChange={(e)=> setAccount(e.target.value)} style={ {width: '100%', padding: '8px', boxSizing: 'border-box'}}/>
                        </div>
                        <div className={styles["form-column"]}>
                            <label htmlFor="secondaryContacts">Secondary Contacts (CCs)</label>
                            <input type="text" id="secondaryContacts" value={secondContact} onChange={(e)=> setSecondContact(e.target.value)} style={ {width: '100%', padding: '8px', boxSizing: 'border-box'}}/>
                        </div>
                    </div>

                    <div className={styles["form-row"]}>
                        <div className={styles["form-column"]}>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} style={ {width: '100%', padding: '8px', boxSizing: 'border-box'}}/>
                        </div>
                        <div className={styles["form-column"]}>
                            <label htmlFor="upload">Upload Pictures/Videos</label>
                            <div className={styles["upload-container"]}>
                                <input type="file" id="upload" style={{ display: "none" }} />
                                <label htmlFor="upload" className={styles["upload-button"]}>Upload</label>
                            </div>
                        </div>
                    </div>

                    <div className={styles["form-row"]}>
                        <div className={styles["form-column"]}>
                            <label htmlFor="customField" className={styles.required}>Custom Field</label>
                            <input type="text" id="customField" value={customField} onChange={(e)=> setCustomField(e.target.value)} style={ {width: '100%', padding: '8px', boxSizing: 'border-box'}}/>
                        </div>
                        <div className={styles["form-column"]}></div>
                    </div>

                    <div className={styles["form-row"]}>
                        <div className={styles["form-column"]}>
                            <label htmlFor="subject" className={styles.required}>Subject</label>
                            <input type="text" id="subject" value={subject} onChange={(e)=> setSubject(e.target.value)} style={ {width: '100%', padding: '8px', boxSizing: 'border-box'}}/>
                        </div>
                        <div className={styles["form-column"]}></div>
                    </div>

                    <div className={styles["form-row"]}>
                        <div className={styles["form-column"]}>
                            <label htmlFor="description">Description</label>
                            <textarea id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} style={{ resize: "none", width: '100%', padding: '8px', boxSizing: 'border-box' }} ></textarea>
                        </div>
                        <div className={styles["form-column"]}></div>
                    </div>

                    <div className={styles["form-row"]}>
                        <div className={styles["form-column"]}>
                            <label htmlFor="status" className={styles.required}>Status</label>
                            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} style={ {width: '100%', padding: '8px', boxSizing: 'border-box'}}>
                                <option value="">Select Status</option>
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Close">Close</option>
                            </select>
                        </div>
                        <div className={styles["form-column"]}>
                            <label htmlFor="ticketOwner">Ticket Owner</label>
                            <select id="ticketOwner" value={ticketOwner} onChange={(e) => setTicketOwner(e.target.value)} style={ {width: '100%', padding: '8px', boxSizing: 'border-box'}}>
                                <option value="" >Select Ticket Owner</option>
                                <option value="John Doe">John Doe</option>
                                <option value="Jane Smith">Jane Smith</option>
                            </select>
                        </div>
                    </div>

                    </form>
            </div>
            <hr className={styles["horizontal-line"]} />
                <div className={styles["button-container"]}>
                    <button type="button" onClick={handleCreateTicket}>Create</button>
                    <button type="button" onClick={handleCancel} className={styles["cancel-button"]}>Cancel</button>
                </div>
        </>
    );
};

export default Ticket;