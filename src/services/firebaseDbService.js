import {firestore} from './firebaseService';
import {collection, getDocs, doc, getDoc} from 'firebase/firestore';
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

        async getTicketById(id) {
            const ticketRef = doc(this.db, "tickets", id);
            const ticketSnapshot = await getDoc(ticketRef);

            if(ticketSnapshot.exists()) {
                const ticketData = ticketSnapshot.data();
                ticketData.id = ticketSnapshot.id;
                const conversations = [];
                const conversationsSnapshot = await getDocs(collection(ticketRef, "conversations"));
                conversationsSnapshot.forEach(convDoc => {
                    conversations.push(convDoc.data());
                });
                ticketData.conversations = conversations;
                return ticketData;
            } else {
                console.log("No such document!");
                return null;
            }
        }
}

export default FirebaseDBService;