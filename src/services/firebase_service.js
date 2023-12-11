
class AuthService() {
    constructor() {
        // initialize firebase with the config object
        firebase.initiliazeApp(firebaseConfig);
        // initialize the firebase auth instance
        this.auth = firebase.auth();
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
    async signUpWithEmailAndPassword(email, password) {
        try {
            const userCredential = await this.auth.signUpWithEmailAndPassword(email, password);
            return userCredential.user;
        } catch (error) {
            // handle sign-up errors
            throw error;
        }
    }
    // sendPasswordResetEmail(email)

    // updatePassword(password)

    // updateEmail(email)

    // current user

}

export default authService;