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

export const getTickets = async (userRole, userId) => {
    const firebaseDBService = new FirebaseDBService();
    if (userRole === 'agent') {
        return await firebaseDBService.getAllTickets();
    } else if (userRole === 'user') {
        // If the user is a regular user, fetch tickets created by that user
        return await firebaseDBService.getUserTickets(userId);
    }
    return [];
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


export const addNewTicket = async (newTicketData, newConversationData) => {
    const firebaseDBService = new FirebaseDBService();
    return await firebaseDBService.addNewTicket(newTicketData, newConversationData);
}
export const updateTicket = async (ticketId, conversationId, updatedTicketData) => {
    const firebaseDBService = new FirebaseDBService();
    return await firebaseDBService.updateTicket(ticketId, conversationId, updatedTicketData);
}

export const deleteComment = async (ticketId, conversationId) => {
    const firebaseDBService = new FirebaseDBService();
    return await firebaseDBService.deleteComment(ticketId, conversationId);
}