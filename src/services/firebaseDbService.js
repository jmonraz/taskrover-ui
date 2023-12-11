import firebase from 'firebase/app';
import {firestore} from './firebaseService';
class FirebaseDBService {
    constructor() {
        // initialize the firebase firestore instance
        this.db = firestore;

        // enable offline persistence
        // to be implemented in the future


    }
}

export default FirebaseDBService;