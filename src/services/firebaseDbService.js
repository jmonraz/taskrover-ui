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
            for (const doc of querySnapshot.docs) {
                const ticketData = doc.data();
                ticketData.id = doc.id;

                const conversations = [];
                const conversationsSnapshot = await getDocs(collection(doc.ref, "conversations"));
                conversationsSnapshot.forEach(convDoc => {
                    conversations.push(convDoc.data());
                });

                ticketData.conversations = conversations;
                tickets.push(ticketData);
            }
            return tickets;
        }
}

export default FirebaseDBService;