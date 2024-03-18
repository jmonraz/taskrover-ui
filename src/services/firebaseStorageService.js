import {storage} from './firebaseService';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
class StorageService {
    constructor() {
        this.storage = storage;
    }
    // Method to upload a user's profile picture
    async uploadUserProfilePicture(file, userId) {
        const path = `profile-pics/${userId}`; // Construct the storage path with user UID
        const storageRef = ref(this.storage, path); // Create a reference to this path in Firebase Storage
        try {
            await uploadBytes(storageRef, file); // Upload the file
            const url = await getDownloadURL(storageRef); // Get the download URL for the uploaded file
            return url; // Return the URL of the uploaded profile picture
        } catch (error) {
            throw error; // Handle errors
        }
    }

    // Method to get the download URL of a user's profile picture
    async getUserProfilePictureUrl(userId) {
        if(!userId) return null;
        const path = `profile-pics/${userId}`; // Construct the storage path with user UID
        const storageRef = ref(this.storage, path); // Create a reference to this path
        try {
            const url = await getDownloadURL(storageRef); // Get the download URL
            return url; // Return the URL of the profile picture
        } catch (error) {
            throw error; // Handle errors
        }
    }

}

export default StorageService;