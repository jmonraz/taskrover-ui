// hooks
import {useFormInput} from "../../hooks/useFormInput";

// components
import Input from "../../components/Input";
import Button from "../../components/Button";

// assets
import logo from "../../assets/logo/taskrover-logo-small.png"

// styles
import styles from "./LoginPage.module.css";
import {useState} from "react";

const LoginPage = () => {

    const [isLoading, setIsLoading] = useState(false);

    const username = useFormInput('');
    const password = useFormInput('');

    const onHandleSubmit = e => {
        e.preventDefault();
        setIsLoading(true);

        // simulate asynchronous action (e.g., API call) for 4 seconds
        setTimeout(() => {
            setIsLoading(false);
            // handle login
            // navigate to dashboard
        }, 2500);

        console.log('submitting');
        console.log('password: ', password.value);
        console.log('username: ', username.value);
    };

    return (
        <>
            <div className={styles['login-container']}>
                <div className={styles['form-wrapper']}>
                    <img src={logo} alt="TaskRover Logo" className={styles['login-logo']} />
                    <form className={styles['login-form']} onSubmit={onHandleSubmit}>
                        <div className={styles['text-row']}>
                            <p className='main-text'>Welcome Back!</p>
                        </div>
                        <div className={styles['input-row']}>
                            <Input inputProps={username} styleName='main-input' placeholder='Email' type='email' required={true} />
                            <Input inputProps={password} styleName='main-input' placeholder='Password' type='password' required={true} />
                        </div>
                        <div className={styles['button-row']}>
                            <Button styleName='green-button' onClick={() => {}}>Sign In</Button>
                            <p className='text-link'>Forgot Password?</p>
                        </div>
                        {isLoading && <div className={styles['loading-overlay']}>
                            <div className={styles['loading-circle']}></div>
                            <p className={styles['loading-text']}>Loading...</p>
                        </div>}
                    </form>
                </div>
            </div>
        </>
    )
};

export default LoginPage;