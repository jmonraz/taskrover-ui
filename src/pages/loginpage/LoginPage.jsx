// hooks
import {useFormInput} from "../../hooks/useFormInput";

// context
import {UserContext} from "../../context/UserContext";
import {useContext, useState} from "react";

// react-router
import {useNavigate} from "react-router-dom";

// components
import Input from "../../components/Input";
import Button from "../../components/Button";
import {auth} from "../../components/firebase"

// assets
import logo from "../../assets/logo/taskrover-logo-small.png"

// styles
import styles from "./LoginPage.module.css";

const LoginPage = () => {

    const navigate = useNavigate();

    const {setToken, setUserType, setUserState, authState} = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const username = useFormInput('');
    const password = useFormInput('');
    const forgotPasswordEmail = useFormInput('');

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Create user in Firebase Authentication
            await auth.createUserWithEmailAndPassword(username.value, password.value);
        // simulate asynchronous action (e.g., API call) for 4 seconds
        setTimeout(() => {
            setIsLoading(false);
            // navigate to dashboard
            //if(username.value === 'admin@gmail.com' && password.value === 'admin') {
                setToken('dummy-token');
                setUserType('agent');
                setUserState(true);
                navigate('/home');
            //}
        }, 2500);
        } catch (error) {
            setIsLoading(false);
            console.error("Error during signup:", error.message);
            // Handle error, e.g., display an error message to the user
        }

    };
    const onForgotPasswordClick = () => {
        setShowForgotPassword(true);
    };

    const onCloseForgotPassword = () => {
        setShowForgotPassword(false);
    };

    const onForgotPasswordSubmit = e => {
        e.preventDefault();
        // Handle forgot password logic here
        console.log('Forgot password submitted:', forgotPasswordEmail.value);
        onCloseForgotPassword();
    };

    return (
        <>
            <div className={styles['login-container']}>
                <div className={styles['form-wrapper']}>
                    <img src={logo} alt="TaskRover Logo" className={styles['login-logo']} />
                    {showForgotPassword ? (
                        // Forgot Password form
                        <form className={styles['login-form']} onSubmit={onForgotPasswordSubmit}>
                            <div className={styles['text-row']}>
                                <p className='main-text'>Forgot your password?</p>
                                <p className='text-link' style={{ color: '#D8D8D8', marginTop:'3%' }} >Please enter the email you use to sign in to TaskRover</p>
                            </div>
                            <div className={styles['input-row']}>
                                <Input inputProps={forgotPasswordEmail} styleName='main-input' placeholder='Email' type='email' required={true} />
                            </div>
                            <div className={styles['button-row']}>
                                <Button styleName='green-button' type="submit">Send Email</Button>
                                <p className='text-link' onClick={onCloseForgotPassword}>Back to Sign in</p>
                            </div>
                        </form>
                    ) : (
                        // Login form
                        <form className={styles['login-form']} onSubmit={onHandleSubmit}>
                            <div className={styles['text-row']}>
                                <p className='main-text'>Welcome Back!</p>
                            </div>
                            <div className={styles['input-row']}>
                                <Input inputProps={username} styleName='main-input' placeholder='Email' type='email' required={true} />
                                <Input inputProps={password} styleName='main-input' placeholder='Password' type='password' required={true} />
                            </div>
                            <div className={styles['button-row']}>
                                <Button styleName='green-button' type="submit">Sign In</Button>
                                <p className='text-link' onClick={onForgotPasswordClick}>Forgot Password?</p>
                            </div>
                        </form>
                    )}
                        {isLoading && <div className={styles['loading-overlay']}>
                            <div className={styles['loading-circle']}></div>
                            <p className={styles['loading-text']}>Loading...</p>
                        </div>}
                </div>
            </div>
        </>
    )
};

export default LoginPage;