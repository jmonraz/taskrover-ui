// hooks
import {useFormInput} from "../../hooks/useFormInput";

// firebase calls
import {signIn, getUserInformation} from "../../utils/firebaseUtils";

// context
import {UserContext} from "../../context/UserContext";
import {useContext, useState, useEffect} from "react";

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

    const {setToken, setUserType, setUserState, setUserEmail, setUserFirstName, setUserLastName, authState} = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userInformation, setUserInformation] = useState({});

    const username = useFormInput('');
    const password = useFormInput('');
    const forgotPasswordEmail = useFormInput('');

    useEffect( () => {
        if (authState.userState) {
            if (userInformation.firstLogin) {
                console.log('First login. Redirecting to password change.');
                navigate('/change-password');
            }else if (authState.userType === 'user' || authState.userType === 'agent') {
                navigate('/home');
            }
        }
    }, [authState.userState, authState.userType]);

    const onHandleSubmit = async e => {
        e.preventDefault();
        setErrorMessage('');
        setIsLoading(true);

        try {
            const response = await signIn(username.value, password.value);
            const token = await response.getIdToken();
            const userInfo = await getUserInformation(response.uid);
            setUserInformation(userInfo);
            console.log('User info:', userInfo);
            setToken(token);
            setUserType(userInfo.role);
            setUserState(true);
            setUserEmail(userInfo.email);
            setUserFirstName(userInfo.firstName);
            setUserLastName(userInfo.lastName);
            // if (authState.userType === 'user') {
            //     navigate('/home');
            // } else if (authState.userType === 'agent') {
            //     navigate('/home');
            // }
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