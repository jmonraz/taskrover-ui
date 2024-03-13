
import React, { useState, useEffect } from 'react';
import styles from "./Settings.module.css";

import { useAuthState } from 'react-firebase-hooks/auth';
import {collection, doc, getFirestore, updateDoc} from "firebase/firestore";
import { auth, db, storage } from '../../services/firebaseService';
import {useDocument} from "react-firebase-hooks/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Input from "../../components/Input";
import {useFormInput} from "../../hooks/useFormInput";
import Button from "../../components/Button";
import {getDepartments, getRoles, createRole} from "../../utils/firebaseUtils";

const SettingsPage = () => {
    const editName = useFormInput('');
    const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);
    const [user] = useAuthState(auth);
    const docRef = doc(db, "collectionName", "documentId");
    const usersCollection = collection(db, "users");
    const [userData, loading] = useDocument(doc(db, "users", user?.uid));
    const [fullName, setFullName] = useState('');
    const [newProfilePic, setNewProfilePic] = useState(null);
    const [activeTab, setActiveTab] = useState('account');
    const [departments, setDepartments] = useState([]);
    const [roles, setRoles] = useState([]);

    const roleName = useFormInput('');
    const roleDescription = useFormInput('');

    const [departmentChecks, setDepartmentChecks] = useState(
        departments.reduce((acc, department) => {
            acc[department.title] = false;
            return acc;
        }, {})
    );

    const [roleChecks, setRoleChecks] = useState({
        canUpdateTickets: false,
        canDeleteTickets: false,
        canUpdateComments: false,
        canDeleteComments: false,
        canEditRoles: false,
        canEditDepartments: false,
        canEditAccounts: false,
        canEditUsers: false,
        canEditTeams: false,
        canEditTicketForms: false,
        canEditRules: false,
        canEditMenus: false,
    });

    useEffect(() => {
        if (userData && userData.exists) {
            const { fullName } = userData.data();
            setFullName(fullName);

        } else if (loading === false) { // Handle errors after loading
            console.error('Error fetching user data:', userData.error);
        }
    }, [userData, loading]);

    const handleProfilePicChange = (e) => {
        if (e.target.files[0]) {
            setNewProfilePic(e.target.files[0]);

            // Display the selected image immediately
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageElement = document.getElementById('profilePicPreview');
                if (imageElement) {
                    imageElement.src = event.target.result;
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSaveChanges = async () => {
        try {
            if (!user) {
                alert('Please sign in to update your profile.');
                return;
            }

            const newFullName = editName.value;
            // Update full name
            await updateDoc(doc(usersCollection, user.uid), { newFullName});

            if (newProfilePic) {
                const storageRef = ref(storage, `profile-pics/${user.uid}`);
                await uploadBytes(storageRef, newProfilePic);
                const imageUrl = await getDownloadURL(storageRef);

                await updateDoc(doc(collection(db, 'users'), user.uid), { profilePic: imageUrl });
            }

            alert('Changes saved successfully!');
        } catch (error) {
            console.error('Error saving changes:', error.message);
            alert('Error saving changes. Please try again.');
        }
    };



    const handleTabClick = async (tab) => {
        if (tab === 'roles') {
            await getRoles().then((roles) => {
                setRoles(roles);
            });
        }
        setActiveTab(tab);
    };

    const handleCreateRole = async () => {
        await getDepartments().then((departments) => {
            setDepartments(departments);
        });

        setIsCreateRoleModalOpen(!isCreateRoleModalOpen);
    };

    const handleCheckboxChange = (title) => {
        setDepartmentChecks(prevChecks => ({
            ...prevChecks,
            [title]: !prevChecks[title]
        }));
    };

    const handleRoleCheckboxChange = (title) => {
        setRoleChecks(prevChecks => ({
            ...prevChecks,
            [title]: !prevChecks[title]
        }));

    };

    const handleCreateRoleSubmit = async () => {
        const selectedDepartments = Object.keys(departmentChecks).filter((department) => departmentChecks[department]);

        const role = {
            role: roleName.value,
            description: roleDescription.value,
            departments: [
                ...selectedDepartments
            ],
            canUpdateTickets: roleChecks.canUpdateTickets,
            canDeleteTickets: roleChecks.canDeleteTickets,
            canUpdateComments: roleChecks.canUpdateComments,
            canDeleteComments: roleChecks.canDeleteComments,
            canEditRoles: roleChecks.canEditRoles,
            canEditDepartments: roleChecks.canEditDepartments,
            canEditAccounts: roleChecks.canEditAccounts,
            canEditUsers: roleChecks.canEditUsers,
            canEditTeams: roleChecks.canEditTeams,
            canEditTicketForms: roleChecks.canEditTicketForms,
            canEditRules: roleChecks.canEditRules,
            canEditMenus: roleChecks.canEditMenus,
        }
        await createRole(role);
    }

    return (
        <>{loading ? (<p>Loading...</p>) : (
            <div className={styles['settings-row']}>
                <div className={styles['side-menu']}>
                    <div>
                        <p onClick={() => {
                            handleTabClick('account')
                        }} className={activeTab === 'account' && styles['active']}>My Account</p>
                        <p onClick={() => {
                            handleTabClick('roles')
                        }} className={activeTab === 'roles' && styles['active']}>Roles</p>
                        <p onClick={() => {
                            handleTabClick('rules')
                        }} className={activeTab === 'rules' && styles['active']}>Rules</p>
                        <p onClick={() => {
                            handleTabClick('menu')
                        }} className={activeTab === 'menu' && styles['active']}>Menus</p>
                        <p onClick={() => {
                            handleTabClick('departments')
                        }} className={activeTab === 'departments' && styles['active']}>Departments</p>
                        <p onClick={() => {
                            handleTabClick('ticket-forms')
                        }} className={activeTab === 'ticket-forms' && styles['active']}>Ticket Forms</p>
                        <p onClick={() => {
                            handleTabClick('teams')
                        }} className={activeTab === 'teams' && styles['active']}>Teams</p>
                    </div>
                </div>

                {activeTab === 'account' && (
                    <div className={styles['settings-content-ctr']}>
                        <div className={styles['header-row']}>
                            <h1 className={styles['page-title']}>Account Settings</h1>
                            <Button onClick={handleSaveChanges} styleName='green-button'>Save Changes</Button>
                        </div>
                        <div className={styles["settings-container"]}>
                            <form className={styles["settings-form"]}>
                                <div className={styles['col']}>
                                    <label htmlFor="profilePic">Profile Picture</label>
                                    <button
                                        type="button"
                                        onClick={() => document.getElementById('profilePic').click()}
                                        className={styles["profile-pic-button"]}>
                                        <img id="profilePicPreview" src={userData.data().profilePic}
                                             alt="Profile Picture"/>
                                    </button>
                                    <input type="file" accept="image/*" id="profilePic"
                                           onChange={handleProfilePicChange} style={{display: 'none'}}/>
                                </div>
                                <div className={styles['col']}>
                                    <label htmlFor="fullName">Username</label>
                                    <Input inputProps={editName} placeholder={fullName} styleName='main-input'/>
                                </div>
                                <div className={styles['row']}>
                                    <div className={styles['col']}>
                                        <label htmlFor="fullName">First Name</label>
                                        <Input inputProps={editName} placeholder={fullName} styleName='main-input'/>
                                    </div>
                                    <div className={styles['col']}>
                                        <label htmlFor="fullName">Last Name</label>
                                        <Input inputProps={editName} placeholder={fullName} styleName='main-input'/>
                                    </div>
                                </div>
                                <div className={styles['row']}>
                                    <div className={styles['col']}>
                                        <label htmlFor="fullName">Phone Number</label>
                                        <Input inputProps={editName} placeholder={fullName} styleName='main-input'/>
                                    </div>
                                    <div className={styles['col']}>
                                        <label htmlFor="fullName">Extension</label>
                                        <Input inputProps={editName} placeholder={fullName} styleName='main-input'/>
                                    </div>
                                </div>
                                <div className={styles['col']}>
                                    <label htmlFor="fullName">Email</label>
                                    <Input inputProps={editName} placeholder={fullName} styleName='main-input'/>
                                </div>

                                <div className={styles['col']}>
                                    <label htmlFor="fullName">Role</label>
                                    <Input inputProps={editName} placeholder={fullName} styleName='main-input'/>
                                </div>
                                <div className={styles['col']}>
                                    <label htmlFor="fullName">Team</label>
                                    <Input inputProps={editName} placeholder={fullName} styleName='main-input'/>
                                </div>
                                <div className={styles['col']}>
                                    <label htmlFor="fullName">Change Password</label>
                                    <Input inputProps={editName} placeholder={fullName} styleName='main-input'/>
                                </div>
                            </form>

                        </div>
                    </div>
                )}

                {activeTab === 'roles' && (
                    <>
                        <div className={styles['settings-content-ctr']}>
                            <h1 className={styles['page-title']}>Roles Settings</h1>
                            <div className={styles['settings-container']}>
                                <div className={styles['settings-form']}>
                                    <div className={styles['col']}>
                                        <div className={styles['roles-btn']}>
                                            <Button onClick={handleCreateRole}>Create Role</Button>
                                        </div>
                                    </div>
                                    <div className={styles['col']}>
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>Role</th>
                                                <th>Description</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {roles.length > 0 && roles.map((role) => (
                                                <tr key={role.title}>
                                                    <td>{role.role}</td>
                                                    <td>{role.description}</td>
                                                    <td>
                                                        <Button styleName='green-button'>Edit</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isCreateRoleModalOpen && (
                            <div className={styles['modal-ctr']}>
                                <form className={styles['modal']} onSubmit={(e) => {e.preventDefault();}}>
                                    <div className={styles['row']}>
                                        <h1 className={styles['page-title']}>Create Role</h1>
                                        <p onClick={() => setIsCreateRoleModalOpen(!isCreateRoleModalOpen)}
                                           className={styles['closing-x']}>X</p>
                                    </div>
                                    <div className={styles['col']}>
                                        <label htmlFor="roleName">Role Name</label>
                                        <Input inputProps={roleName} placeholder=''
                                               styleName='main-input'/>
                                    </div>

                                    <div className={styles['col']}>
                                        <label htmlFor="roleDescription">Role Description</label>
                                        <Input inputProps={roleDescription} placeholder=''
                                               styleName='main-input'/>
                                    </div>

                                    <div className={styles['dpt-ctr']}>
                                        <label htmlFor="departments" className={styles['label-txt']}>Departments</label>
                                        <div className={styles['dpt-sub-ctr']}>
                                            {departments.length > 0 && departments.map((department) => (
                                                <div key={department.title}
                                                     className={styles['dpt-sub-ctr-checkbox']}> {/* Always use a key when mapping in React */}
                                                    <label htmlFor={department.title}>{department.title}</label>
                                                    <input type="checkbox" id={department.title}
                                                           name={department.title}
                                                           value={department.title}
                                                            checked={departmentChecks[department.title]}
                                                              onChange={() => handleCheckboxChange(department.title)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles['row']}>
                                        <div className={styles['checkbox-group']}>
                                            <div>
                                                <label htmlFor="canUpdateTickets">Can Update Tickets?</label>
                                                <input type="checkbox" id="canUpdateTickets" name="canUpdateTickets"
                                                       value="canUpdateTickets"
                                                         checked={roleChecks.canUpdateTickets}
                                                            onChange={() => handleRoleCheckboxChange('canUpdateTickets')}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="canDeleteTickets">Can Delete Tickets?</label>
                                                <input type="checkbox" id="canDeleteTickets" name="canDeleteTickets"
                                                       value="canDeleteTickets"
                                                            checked={roleChecks.canDeleteTickets}
                                                                onChange={() => handleRoleCheckboxChange('canDeleteTickets')}

                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="canUpdateComments">Can Update Comments?</label>
                                                <input type="checkbox" id="canUpdateComments" name="canUpdateComments"
                                                       value="canUpdateComments"
                                                            checked={roleChecks.canUpdateComments}
                                                                onChange={() => handleRoleCheckboxChange('canUpdateComments')}

                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="canDeleteComments">Can Delete Comments?</label>
                                                <input type="checkbox" id="canDeleteComments"
                                                       name="canDeleteComments" value="canDeleteComments"
                                                            checked={roleChecks.canDeleteComments}
                                                                onChange={() => handleRoleCheckboxChange('canDeleteComments')}

                                                />
                                            </div>
                                        </div>
                                        <div className={styles['checkbox-group']}>
                                            <div>
                                                <label htmlFor="canEditRoles">Can Edit Roles?</label>
                                                <input type="checkbox" id="canEditRoles" name="canEditRoles"
                                                       value="canEditRoles"
                                                            checked={roleChecks.canEditRoles}
                                                                onChange={() => handleRoleCheckboxChange('canEditRoles')}

                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="canEditDepartments">Can Edit Departments?</label>
                                                <input type="checkbox" id="canEditDepartments"
                                                       name="canEditDepartments" value="canEditDepartments"
                                                            checked={roleChecks.canEditDepartments}
                                                                onChange={() => handleRoleCheckboxChange('canEditDepartments')}

                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="canEditAccounts">Can Edit Accounts?</label>
                                                <input type="checkbox" id="canEditAccounts" name="canEditAccounts"
                                                       value="canEditAccounts"
                                                            checked={roleChecks.canEditAccounts}
                                                                onChange={() => handleRoleCheckboxChange('canEditAccounts')}

                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="canEditUsers">Can Edit Users?</label>
                                                <input type="checkbox" id="canEditUsers" name="canEditUsers"
                                                       value="canEditUsers"
                                                            checked={roleChecks.canEditUsers}
                                                                onChange={() => handleRoleCheckboxChange('canEditUsers')}

                                                />
                                            </div>
                                        </div>
                                        <div className={styles['checkbox-group']}>
                                            <div>
                                                <label htmlFor="canEditTeams">Can Edit Teams?</label>
                                                <input type="checkbox" id="canEditTeams" name="canEditTeams"
                                                       value="canEditTeams"
                                                            checked={roleChecks.canEditTeams}
                                                                onChange={() => handleRoleCheckboxChange('canEditTeams')}

                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="canEditTicketForms">Can Edit Ticket Forms?</label>
                                                <input type="checkbox" id="canEditTicketForms"
                                                       name="canEditTicketForms" value="canEditTicketForms"
                                                            checked={roleChecks.canEditTicketForms}
                                                                onChange={() => handleRoleCheckboxChange('canEditTicketForms')}

                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="canEditRules">Can Edit Rules?</label>
                                                <input type="checkbox" id="canEditRules" name="canEditRules"
                                                       value="canEditRules"
                                                            checked={roleChecks.canEditRules}
                                                                onChange={() => handleRoleCheckboxChange('canEditRules')}

                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="canEditMenus">Can Edit Menus?</label>
                                                <input type="checkbox" id="canEditMenus" name="canEditMenus"
                                                       value="canEditMenus"
                                                            checked={roleChecks.canEditMenus}
                                                                onChange={() => handleRoleCheckboxChange('canEditMenus')}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles['col']}>
                                        <Button styleName='green-button' onClick={handleCreateRoleSubmit}>Create Role</Button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </>
                )}
                {activeTab === 'rules' && (
                    <div className={styles['settings-content-ctr']}>
                        <h1 className={styles['page-title']}>Rules Settings</h1>
                    </div>
                )}
                {activeTab === 'menu' && (
                    <div className={styles['settings-content-ctr']}>
                        <h1 className={styles['page-title']}>Menu Settings</h1>
                    </div>
                )}
                {activeTab === 'departments' && (
                    <div className={styles['settings-content-ctr']}>
                        <h1 className={styles['page-title']}>Departments Settings</h1>
                    </div>
                )}
                {activeTab === 'ticket-forms' && (
                    <div className={styles['settings-content-ctr']}>
                        <h1 className={styles['page-title']}>Ticket Forms Settings</h1>
                    </div>
                )}
                {activeTab === 'teams' && (
                    <div className={styles['settings-content-ctr']}>
                        <h1 className={styles['page-title']}>Teams Settings</h1>
                    </div>
                )}
            </div>
        )}

        </>
    );
};

export default SettingsPage;