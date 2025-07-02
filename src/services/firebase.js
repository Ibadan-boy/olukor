// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhQdTPqC6WvC-o7NECoWUWHpxNRTrnRkI",
  authDomain: "student-tracker-dashboar-56447.firebaseapp.com",
  projectId: "student-tracker-dashboar-56447",
  storageBucket: "student-tracker-dashboar-56447.firebasestorage.app",
  messagingSenderId: "30904789379",
  appId: "1:30904789379:web:7d653f535a7bf22428aeb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getFirestore(app);
// export const database = getDatabase(app);


export default app;

