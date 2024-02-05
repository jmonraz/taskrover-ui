import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from '../config/firebaseConfig';
import { getStorage } from "firebase/storage";

// initialize firebase if it hasn't been initialized already
let app;
if(!getApps().length) {
    console.log('initializing firebase');
    app = initializeApp(firebaseConfig);
} else {
    console.log('firebase already initialized');
    app = getApps()[0];
}

// export Firebase and its services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);