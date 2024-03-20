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
import galaxyImage from "../../assets/img/galaxy-image.svg";

// styles
import styles from "./LoginPage.module.css";

const LoginPage = () => {

    const navigate = useNavigate();

    const {setToken, setUserType, setUserState, setUserEmail, setUserFirstName, setUserLastName, setUserId, authState} = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [userInformation, setUserInformation] = useState({});

    const username = useFormInput('');
    const password = useFormInput('');
    const forgotPasswordEmail = useFormInput('');

    useEffect( () => {
        if (authState.userState) {
            if (userInformation.firstLogin) {
                navigate('/change-password');
            }else {
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
            setToken(token);
            setUserType(userInfo.role);
            setUserState(true);
            setUserEmail(userInfo.email);
            setUserId(userInfo.id);
            setUserFirstName(userInfo.firstName);
            setUserLastName(userInfo.lastName);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setErrorMessage('Invalid credentials. Please try again.');
            console.error('Login error:', error); // Log any login errors
        }

    };
    const onForgotPasswordClick = () => {
        setShowForgotPassword(true);
        setShowLogin(false);
        setShowRegister(false);
    };

    const onBackToSignIn = () => {
        setShowForgotPassword(false);
        setShowLogin(true);
        setShowRegister(false);
    };

    const onForgotPasswordSubmit = e => {
        e.preventDefault();
        // Handle forgot password logic here
        onBackToSignIn();
    };

    const onRegisterClick = e => {
        e.preventDefault();
        setShowForgotPassword(false);
        setShowLogin(false);
        setShowRegister(true);
    }

    return (
        <>
            <div className={styles['login-container']}>
                <div className={styles['form-wrapper']}>
                    {/*<img src={logo} alt="TaskRover Logo" className={styles['login-logo']} />*/}
                    {showForgotPassword && (
                        // Forgot Password form
                        <form className={styles['login-form']} onSubmit={onForgotPasswordSubmit}>
                            <div>
                                <div className={styles['text-row']}>
                                    <p className='main-text'>Forgot your password?</p>
                                    <p className='text-link' >Please enter the email you use to sign in to TaskRover</p>
                                </div>
                                <div className={styles['input-row']}>
                                    <Input inputProps={forgotPasswordEmail} styleName='main-input' placeholder='Email'
                                           type='email' required={true}/>
                                </div>
                                <div className={styles['button-row']}>
                                    <Button styleName='green-button' type="submit">Send Email</Button>
                                    <p className='text-link' onClick={onBackToSignIn}>Back to Sign in</p>
                                </div>
                            </div>
                        </form>
                    )}

                    {showLogin && (
                        // Login form
                        <form className={styles['login-form']} onSubmit={onHandleSubmit}>
                            <div className={styles['login-form-col']}>
                                <p className={styles['txt-ncs']}>Nice to see you again</p>
                                <p className={styles['txt-wb']}>WELCOME BACK</p>
                                <img src={galaxyImage} alt='galaxy-img' />
                            </div>
                            <div className={styles['login-form-col']}>
                                <img src={logo} alt="TaskRover Logo" className={styles['login-logo']}/>
                                <div className={styles['text-row']}>
                                    <p className='main-text'>Login Account</p>
                                </div>
                                <div className={styles['input-row']}>
                                    <Input inputProps={username} styleName='main-input' placeholder='Email' type='email'
                                           required={true}/>
                                    <Input inputProps={password} styleName='main-input' placeholder='Password'
                                           type='password' required={true}/>
                                    <p className={`text-link  ${styles['txt-center']}`} onClick={onForgotPasswordClick}>Forgot Password?</p>
                                </div>
                                <div className={styles['button-row']}>
                                    <Button styleName='blue-button' type="submit">Sign In</Button>
                                    {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}
                                    <p className='text-link' onClick={onRegisterClick}>Have an activation code? Register here</p>
                                </div>
                            </div>
                        </form>
                    )}

                    {showRegister && (
                        // Register form
                        <form className={styles['login-form']} onSubmit={onHandleSubmit}>
                            <div>
                                <div className={styles['text-row']}>
                                    <p className='main-text'>Register Account</p>
                                    <p className='text-link' >Please enter the activation code you received in your email</p>
                                </div>
                                <div className={styles['input-row']}>
                                    <Input inputProps={forgotPasswordEmail} styleName='main-input' placeholder='Activation Code'
                                           type='text' required={true}/>
                                </div>
                                <div className={styles['button-row']}>
                                    <Button styleName='green-button' type="submit">Activate</Button>
                                    <p className='text-link' onClick={onBackToSignIn}>Back to Sign in</p>
                                </div>
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