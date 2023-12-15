import {firestore} from './firebaseService';
import {collection, getDocs, doc, getDoc, addDoc, query, orderBy, limit, setDoc} from 'firebase/firestore';
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

        async addCommentToTicket(ticketId, newCommentData) {
            // this is a reference to the 'conversations' sub-collection
            const conversationsRef = collection(this.db, 'tickets', ticketId, 'conversations');
            const snapshot = await getDocs(conversationsRef);

            let newCommentRef = null;
            if (!snapshot.empty) {
                // add a new comment with the generated ID
                const newCommentId = `comment_${snapshot.size + 1}`;
                const newCommentRef = doc(conversationsRef, newCommentId);
                await setDoc(newCommentRef, {
                    ...newCommentData,
                    id: snapshot.size + 1,
                });
            }

            return newCommentRef;
        }

        //  write method to add a new ticket to the database
    async addNewTicket(newTicket) {
        try {
            const ticketsCollectionRef = collection(firestore, 'tickets');

            // Add the new ticket to the "tickets" collection
            const docRef = await addDoc(ticketsCollectionRef, newTicket);

            console.log('Document written with ID: ', docRef.id);

            return docRef.id;
        } catch (error) {
            console.error('Error adding document: ', error);
            throw error;
        }
    }
        // write method to update a ticket in the database

        // write method to delete a ticket in the database

        // write method to edit a comment in the database

        // write method to delete a comment in the database

        // write a method to retrieve the user information from the database by document ID
        // the document ID is the same as the user ID for the authentication service
        async getUserInformation(userId) {
            const userRef = doc(this.db, "users", userId);
            const userSnapshot = await getDoc(userRef);

            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                userData.id = userSnapshot.id;
                return userData;
            } else {
                console.log("No such document!");
                return null;
            }
        }
}

export default FirebaseDBService;