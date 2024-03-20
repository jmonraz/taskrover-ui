import styles from './CreateUser.module.css';
import Button from "../../components/Button";

const CreateUser = () => {
    return (
        <>
            <div className={styles['create-user-ctr']}>
                <div className={styles['create-user-form']}>
                    <h2>Create User</h2>
                    <div className={styles['form-row']}>
                        <div className={styles['form-col']}>
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" disabled className={styles['username-inp']} />
                        </div>
                    </div>
                    <div className={styles['form-row']}>
                        <div className={styles['form-col']}>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" name="firstName" />
                        </div>
                        <div className={styles['form-col']}>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" name="lastName" />
                        </div>
                    </div>
                    <div className={styles['form-row']}>
                        <div className={styles['form-col']}>
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input type="text" id="phoneNumber" name="phoneNumber" />
                        </div>
                        <div className={styles['form-col']}>
                            <label htmlFor="extension">Extension</label>
                            <input type="text" id="extension" name="extension" />
                        </div>
                    </div>
                    <div className={styles['form-row']}>
                        <div className={styles['form-col']}>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" name="email"/>
                        </div>
                    </div>
                    <div className={styles['form-row']}>
                        <div className={styles['form-col']}>
                            <label htmlFor="role">Role</label>
                            <select id="role" name="role">
                                {/*    do mapping */}
                            </select>
                        </div>
                    </div>
                    <div className={styles['form-row']}>
                        <div className={styles['form-col']}>
                            <label htmlFor="team">Team</label>
                            <select id="team" name="team">
                                {/*    do mapping */}
                            </select>
                        </div>
                    </div>
                    <div className={styles['form-row']}>
                        <div className={styles['button-ctr']}>
                            <Button onClick={() => {}}>Create User</Button>
                            <Button onClick={() => {}} styleName='cancel-button'>Cancel</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateUser;