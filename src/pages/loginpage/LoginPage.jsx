// hooks
import {useFormInput} from "../../hooks/useFormInput";

// firebase calls
import {signIn} from "../../utils/firebaseUtils";

// context
import {UserContext} from "../../context/UserContext";
import {useContext, useState} from "react";

// react-router
import {useNavigate} from "react-router-dom";

// components
import Input from "../../components/Input";
import Button from "../../components/Button";

// assets
import logo from "../../assets/logo/taskrover-logo-small.png"

// styles
import styles from "./LoginPage.module.css";

const LoginPage = () => {

    const navigate = useNavigate();

    const {setToken, setUserType, setUserState} = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const username = useFormInput('');
    const password = useFormInput('');
    const forgotPasswordEmail = useFormInput('');

    const onHandleSubmit = async e => {
        e.preventDefault();
        setErrorMessage('');
        setIsLoading(true);

        try {
            const response = await signIn(username.value, password.value);
            const userUID = response.uid;
            let userRole =""
            if (userUID === "hmU4oVnBW1baAmZx9imEGnyzCBl2"){
                userRole = "user"
            }
            else{userRole = "agent"}
            console.log('Role:', userRole);

            if (userRole === 'user') {
                console.log('User login');
                const response = await signIn(username.value, password.value);
                const token = await response.getIdToken();
                setToken(token);
                setUserType('user');
                setUserState(true);
                navigate('/home');
            } else if (userRole === 'agent') {
                console.log('Agent login');
                const response = await signIn(username.value, password.value);
                const token = await response.getIdToken();
                setToken(token);
                setUserType('agent');
                setUserState(true);
                navigate('/home');
            }

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setErrorMessage('Invalid credentials. Please try again.');
            console.error('Login error:', error); // Log any login errors
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
                                {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}
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