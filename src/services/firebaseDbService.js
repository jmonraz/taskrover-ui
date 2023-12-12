import {firestore} from './firebaseService';
import {collection, getDocs} from 'firebase/firestore';
class FirebaseDBService {
    constructor() {
        // initialize the firebase firestore instance
        this.db = firestore;

        // enable offline persistence
        // to be implemented in the future
    }
        async getAllTickets() {
            const tickets = [];
            const querySnapshot = await getDocs(collection(this.db, "tickets"));
            querySnapshot.forEach((doc) => {
                tickets.push(doc.data());
            });
            return tickets;
        }
}

export default FirebaseDBService;