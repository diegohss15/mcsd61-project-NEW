import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import the auth module

const firebaseConfig = {
  apiKey: "AIzaSyDFO02CiRSPD7O2jykk1h12PC3U0a54ekQ",
  authDomain: "mcsd61project-fad05.firebaseapp.com",
  projectId: "mcsd61project-fad05",
  storageBucket: "mcsd61project-fad05.appspot.com",
  messagingSenderId: "964846008061",
  appId: "1:964846008061:web:2d12c6150b2f28d620b094"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const firestore = getFirestore(app);

export { db, auth, firestore };