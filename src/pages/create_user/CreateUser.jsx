import {useState, useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {getRoles, createUser} from "../../utils/firebaseUtils";
import {UserContext} from "../../context/UserContext";
import Button from "../../components/Button";

import styles from './CreateUser.module.css';

const CreateUser = () => {
    const navigator = useNavigate();
    const {authState} = useContext(UserContext);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        extension: '',
        email: '',
        role: '',
        team: '',
    });
    const [roles, setRoles] = useState([]);
    const [teams, setTeams] = useState([]);

    const [isRequired, setIsRequired] = useState(false);

    useEffect(() => {
        const getRolesData = async () => {
            const rolesData = await getRoles();
            setRoles(rolesData);
        }
        getRolesData().then(r => console.log('roles retrieved.'));
    }, []);

    const onHandleRole = (e) => {
        const role = roles.find(role => role.id === e.target.value);
        setUser({...user, role: role.role});
    }

    const onInputChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const onCreateUser = async () => {
        if(user.firstName === '' || user.lastName === '' || user.email === '' || user.role === '') {
            setIsRequired(true);
            return;
        }

        await createUser({...user, createdBy: authState.userId, username: user.email, registered: false});
        navigator('/home/agent/dashboard/users');
    }

    return (
        <>
            <div className={styles['create-user-ctr']}>
                <div className={styles['create-user-form']}>
                    <h2>Create User</h2>
                    <div className={styles['form-row']}>
                        <div className={styles['form-col']}>
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" disabled className={styles['disabled-inp']} value={user.email} />
                        </div>
                    </div>
                    <div className={styles['form-row']}>
                        <div className={styles['form-col']}>
                            <label htmlFor="firstName">First Name*</label>
                            <input type="text" id="firstName" name="firstName" className={(isRequired && user.firstName === '') ? `${styles['req-inp']}` : ''} onChange={onInputChange} />
                        </div>
                        <div className={styles['form-col']}>
                            <label htmlFor="lastName">Last Name*</label>
                            <input type="text" id="lastName" name="lastName" className={(isRequired && user.lastName === '') ? `${styles['req-inp']}` : ''}  onChange={onInputChange} />
                        </div>
                    </div>
                    <div className={styles['form-row']}>
                        <div className={styles['form-col']}>
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input type="text" id="phoneNumber" name="phoneNumber" onChange={onInputChange}/>
                        </div>
                        <div className={styles['form-col']}>
                            <label htmlFor="extension">Extension</label>
                            <input type="text" id="extension" name="extension" onChange={onInputChange} />
                        </div>
                    </div>
                    <div className={styles['form-row']}>
                        <div className={styles['form-col']}>
                            <label htmlFor="email">Email*</label>
                            <input type="text" id="email" name="email" className={(isRequired && user.email === '') ? `${styles['req-inp']}` : ''} onChange={onInputChange} />
                        </div>
                    </div>
                    <div className={styles['form-row']}>
                        <div className={styles['form-col']}>
                            <label htmlFor="role">Role*</label>
                            <select id="role" name="role" value={roles.id} onChange={e => onHandleRole(e)} className={(isRequired && user.role === '') ? `${styles['req-inp']}` : ''}>
                                <option value="">Select Role</option>
                                {roles.map((role, index) => {
                                    return <option key={index} value={role.id}>{role.role}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className={styles['form-row']}>
                        <div className={styles['form-col']}>
                            <label htmlFor="team">Team</label>
                            <select id="team" name="team" disabled className={styles['disabled-inp']}>
                                {/*    do mapping */}
                            </select>
                        </div>
                    </div>
                    <div className={styles['form-row']}>
                        <div className={styles['button-ctr']}>
                            <Button onClick={onCreateUser}>Create User</Button>
                            <Button onClick={() => {}} styleName='cancel-button'>Cancel</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateUser;