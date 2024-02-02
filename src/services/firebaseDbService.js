import {firestore} from './firebaseService';
import {collection, getDocs, doc, getDoc, setDoc, deleteDoc, updateDoc, query, where} from 'firebase/firestore';
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

    async getUserTickets(userId) {
        const tickets = [];
        const querySnapshot = await getDocs(collection(this.db, "tickets"));
        for (const doc of querySnapshot.docs) {
            const ticketData = doc.data();
            ticketData.id = doc.id;

            if (ticketData.createdBy === userId) {
                const conversations = [];
                const conversationsSnapshot = await getDocs(collection(doc.ref, "conversations"));
                conversationsSnapshot.forEach(convDoc => {
                    conversations.push(convDoc.data());
                });

                ticketData.conversations = conversations;
                tickets.push(ticketData);
            }
        }
        return tickets;
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

        // write method to update a ticket
        async updateTicket(ticketId, conversationId, updatedTicketData) {

            const conversationsRef = collection(this.db, 'tickets', ticketId, 'conversations');
            const conversationDocRef = doc(conversationsRef, conversationId);
            const conversationDocSnapshot = await getDoc(conversationDocRef);
            await setDoc(conversationDocRef, {
                ...conversationDocSnapshot.data(),
                ...updatedTicketData,
            });
            return conversationDocRef;
        }

        //  write method to add a new ticket to the database
        async addNewTicket(newTicketData, conversation) {
        console.log('newTicketData', newTicketData);
            const ticketsRef = collection(this.db, 'tickets');
            const snapshot = await getDocs(ticketsRef);
            if (!snapshot.empty) {
                // add a new ticket with the generated ID
                const newTicketId = `${(snapshot.size + 1).toString()}`;
                const newTicketRef = doc(ticketsRef, newTicketId);
                await setDoc(newTicketRef, {
                    ...newTicketData,
                    ticketNumber: `#${snapshot.size + 1}`,
                }, {merge: true});

                const conversationRef = doc(newTicketRef, 'conversations', 'comment_1');
                await setDoc(conversationRef, {
                    ...conversation,
                    id: 1,
                }, {merge: true});
                return newTicketId;
            }
        }


    async updateTicketStatus(ticketId, status) {
        const ticketRef = collection(this.db, 'tickets');
        const docRef = doc(ticketRef, ticketId);
        try {
            await updateDoc(docRef, {
                ticketStatus: status
            });
            console.log('Document successfully updated');
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    async updateTicketPriority(ticketId, priority) {
        const ticketRef = collection(this.db, 'tickets');
        const docRef = doc(ticketRef, ticketId);
        try {
            await updateDoc(docRef, {
                priority: priority
            });
            console.log('Document successfully updated');
        } catch (error) {
            console.error('Error updating document:', error);
        }
    }

    async updateTicketDepartment(ticketId, department) {
        const ticketRef = collection(this.db, 'tickets');
        const docRef = doc(ticketRef, ticketId);
        try {
            await updateDoc(docRef, {
                ticketDepartment: department
            });
            console.log('Document successfully updated');
        } catch (error) {
            console.error('Error updating document:', error);
        }
    }

// write method to delete a ticket in the database
        async deleteComment(ticketId, conversationId) {
        const conversationsRef = collection(this.db, 'tickets', ticketId, 'conversations');
        const formattedConversationId = 'comment_' + conversationId;
        const conversationDocRef = doc(conversationsRef, formattedConversationId);
        await deleteDoc(conversationDocRef);
        return conversationDocRef;
        }
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


    async getUsersByRole(role) {
        const usersRef = collection(this.db, 'users');
        const q = query(usersRef, where('role', '==', role));
        const querySnapshot = await getDocs(q);
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() });
        });
        return users;
    }

    async updateTicketOwner(ticketId, value) {
        const ticketRef = collection(this.db, 'tickets');
        const docRef = doc(ticketRef, ticketId);

        await updateDoc(docRef, {
            ticketOwner: value
        });
        console.log('Document successfully updated');
    }

    async getDepartments() {
        const departmentsRef = collection(this.db, 'departments');
        const querySnapshot = await getDocs(departmentsRef);
        const departments = [];
        querySnapshot.forEach((doc) => {
            departments.push({ id: doc.id, ...doc.data() });
        });
        return departments;
    }

    async createDepartment(department) {
        const departmentsRef = collection(this.db, 'departments');
        const newDepartmentRef = doc(departmentsRef);
        await setDoc(newDepartmentRef, {
            id: newDepartmentRef.id,
            ...department
        });
        return newDepartmentRef;
    }
}

export default FirebaseDBService;