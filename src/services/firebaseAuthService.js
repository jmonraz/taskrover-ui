import {auth} from './firebaseService';
import {signInWithEmailAndPassword} from 'firebase/auth';
class AuthService {
    // constructor
    constructor() {
        // initialize firebase auth
        this.auth = auth;
    }
    // sign in with email and password
    signInWithEmailAndPassword(email, password) {
        console.log(email, password);
        return signInWithEmailAndPassword(auth,email, password).then((userCredential) => {
            return userCredential.user;
        }).catch((error) => {
            throw error;
        });
    }

    async signOut() {
        try {
            await auth.signOut();
        } catch (error) {
            // handle sign-out errors
            throw error;
        }
    }

    // other auth methods
    // signUpWithEmailAndPassword(email, password)
    signUpWithEmailAndPassword(email, password) {
            return auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                return user;
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                throw error;
            })
    }
    // sendPasswordResetEmail(email)

    // updatePassword(password)

    // updateEmail(email)

    // current user

}

export default AuthService;