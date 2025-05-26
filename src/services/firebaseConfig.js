import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYEaeJoSDb2uqsEEhNpbhBrsJLxPYreR0",
  authDomain: "event-controller-a0d73.firebaseapp.com",
  projectId: "event-controller-a0d73",
  storageBucket: "event-controller-a0d73.firebasestorage.app",
  messagingSenderId: "10698009228",
  appId: "1:10698009228:web:7ecf2088b2e9902248a9a9",
  measurementId: "G-RL87ZMV9MY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword };