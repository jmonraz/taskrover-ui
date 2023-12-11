import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAqBwH6ei-oyT4Fg6jhNKGq4sjlV7S5ixA",
    authDomain: "taskrover-36d5b.firebaseapp.com",
    projectId: "taskrover-36d5b",
    storageBucket: "taskrover-36d5b.appspot.com",
    messagingSenderId: "590756808867",
    appId: "1:590756808867:web:8577edcf2297f1bccb1716"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();