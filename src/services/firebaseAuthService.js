import {auth} from './firebaseService';
import { signInWithEmailAndPassword, signOut} from 'firebase/auth';

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

    signOut() {
        return signOut(auth).then(() => {

        }).catch((error) => {
            throw error;
        });
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
    async getCurrentUser() {
       const user = auth.currentUser;
       if(user) {
           return user;
       } else {
              return null;
       }
    }
}

export default AuthService;