import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCvxoEFqHKQ4ecm5L6_alybPzS9hG02nYA",
    authDomain: "eventcontroller-3e935.firebaseapp.com",
    projectId: "eventcontroller-3e935",
    storageBucket: "eventcontroller-3e935.firebasestorage.app",
    messagingSenderId: "916108666834",
    appId: "1:916108666834:web:7eefc5ba81b177d849ca0b",
    measurementId: "G-7XP1S09HC0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, createUserWithEmailAndPassword };