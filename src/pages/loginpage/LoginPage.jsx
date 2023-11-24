// hooks
import {useFormInput} from "../../hooks/useFormInput";

// components
import Input from "../../components/Input";
import Button from "../../components/Button";

// assets
import logo from "../../assets/logo/taskrover-logo-small.png"

// styles
import styles from "./LoginPage.module.css";

const LoginPage = () => {

    const username = useFormInput('');
    const password = useFormInput('');

    const onHandleSubmit = e => {
        e.preventDefault();
        console.log('submitting');
        console.log('password: ', password.value);
        console.log('username: ', username.value);
    }

    return (
        <>
            <div className={styles['login-container']}>
                <div className={styles['form-wrapper']}>
                    <img src={logo} alt="TaskRover Logo" className={styles['login-logo']} />
                    <form className={styles['login-form']}>
                        <div className={styles['text-row']}>
                            <p className='main-text'>Welcome Back!</p>
                        </div>
                        <div className={styles['input-row']}>
                            <Input inputProps={username} styleName='main-input' placeholder='Email' type='email' required />
                            <Input inputProps={password} styleName='main-input' placeholder='Password' type='password' required />
                        </div>
                        <div className={styles['button-row']}>
                            <Button styleName='green-button' onClick={onHandleSubmit}>Login</Button>
                            <p className='text-link'>Forgot Password?</p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default LoginPage;