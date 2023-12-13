import AuthService from "../services/firebaseAuthService";
import FirebaseDBService from "../services/firebaseDbService";

const getCurrentUser = async () => {
    const authService = new AuthService();
    return await authService.getCurrentUser();

}
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

export const getTicketById = async (id) => {
    const firebaseDBService = new FirebaseDBService();
    return await firebaseDBService.getTicketById(id);
}

export const addCommentToTicket = async (ticketId, newCommentData) => {
    const firebaseDBService = new FirebaseDBService();
    return await firebaseDBService.addCommentToTicket(ticketId, newCommentData);
}

export const getUserInformation = async () => {
    const firebaseDBService = new FirebaseDBService();
    const fetchedUser = await getCurrentUser();
    return await firebaseDBService.getUserInformation(fetchedUser.uid);
}