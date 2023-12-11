import AuthService from "../services/firebaseAuthService";

const signUp = async (email, password) => {
    const authService = new AuthService();
    return await authService.signUpWithEmailAndPassword(email, password);
}