import AuthService from "../services/firebaseAuthService";
import StorageService from "../services/firebaseStorageService";
import FirebaseDBService from "../services/firebaseDbService";


const getCurrentUser = async () => {
    const authService = new AuthService();
    return await authService.getCurrentUser();

}
export const getAllUsers = async () => {
    const firebaseDBService = new FirebaseDBService();
    return await firebaseDBService.getAllUsers();
}
export const signUp = async (email, password) => {
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


export const addNewTicket = async (newTicketData, newConversationData) => {
    const firebaseDBService = new FirebaseDBService();
    return await firebaseDBService.addNewTicket(newTicketData, newConversationData);
}
export const updateTicket = async (ticketId, conversationId, updatedTicketData) => {
    const firebaseDBService = new FirebaseDBService();
    return await firebaseDBService.updateTicket(ticketId, conversationId, updatedTicketData);
}

export const updateTicketStatus = async(ticketId, status) => {
    const firebaseDBService = new FirebaseDBService();
    return await firebaseDBService.updateTicketStatus(ticketId, status);
}

export const updateTicketPriority = async(ticketId, priority) => {
    const firebaseDBService = new FirebaseDBService();
    return await firebaseDBService.updateTicketPriority(ticketId, priority);
}

export const updateTicketDepartment = async(ticketId, department) => {
    const firebaseDBService = new FirebaseDBService();
    return await firebaseDBService.updateTicketDepartment(ticketId, department);
}
export const deleteComment = async (ticketId, conversationId) => {
    const firebaseDBService = new FirebaseDBService();
    return await firebaseDBService.deleteComment(ticketId, conversationId);
}

export const getUsersByRole = async (role) => {
    const firebaseDBService = new FirebaseDBService();
    return await firebaseDBService.getUsersByRole(role);
}

export const updateTicketOwner = async (ticketId, value) => {
    const firebaseDBService = new FirebaseDBService();
    return await firebaseDBService.updateTicketOwner(ticketId, value);
}

export const getDepartments = async () => {
    const firebaseDBService = new FirebaseDBService();
    return await firebaseDBService.getDepartments();
}

export const createDepartment = async (department) => {
    const firebaseDBService = new FirebaseDBService();
    return await firebaseDBService.createDepartment(department);
}

export const getRoles = async () => {
    const firebaseDBService = new FirebaseDBService();
    return await firebaseDBService.getRoles();
}

export const createRole = async (role) => {
    const firebaseDBService = new FirebaseDBService();
    return await firebaseDBService.createRole(role);
}

export const getUserProfilePictureUrl = async (userId) => {
    const storageService = new StorageService();
    return await storageService.getUserProfilePictureUrl(userId);
}

export const uploadUserProfilePicture = async (file, userId) => {
    const storageService = new StorageService();
    return await storageService.uploadUserProfilePicture(file, userId);
}

export const createUser = async (userData) => {
    const firebaseDBService = new FirebaseDBService();
    return await firebaseDBService.createUser(userData);
}
