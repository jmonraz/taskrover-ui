import {auth} from './firebaseService';
class AuthService {
    constructor() {
        // initialize the firebase auth instance
        this.auth = auth;
    }

    // sign in with email and password
    async signInWithEmailAndPassword(email, password) {
        try {
            const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
            return userCredential.user;
        } catch (error) {
            // handle sign-in errors
            throw error;
        }
    }

    async signOut() {
        try {
            await this.auth.signOut();
        } catch (error) {
            // handle sign-out errors
            throw error;
        }
    }

    // other auth methods
    // signUpWithEmailAndPassword(email, password)
    signUpWithEmailAndPassword(email, password) {
            return this.auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
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