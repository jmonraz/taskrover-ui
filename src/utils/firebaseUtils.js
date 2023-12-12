import AuthService from "../services/firebaseAuthService";
import FirebaseDBService from "../services/firebaseDbService";

export const signUp = (email, password) => {
    const authService = new AuthService();
    return authService.signUpWithEmailAndPassword(email, password);
}

export const signIn = async (email, password) => {
    const authService = new AuthService();
    return await authService.signInWithEmailAndPassword(email, password);
}

export const signOut = async () => {
    const authService = new AuthService();
    return await authService.signOut();
}

export const getTickets = async () => {
    const firebaseDBService = new FirebaseDBService();
    return await firebaseDBService.getAllTickets();
}