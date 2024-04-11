import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCEOz4LIK72Pi15SL-FLBkxyMmuAvHR3oo",
  authDomain: "school-e1ad8.firebaseapp.com",
  projectId: "school-e1ad8",
  storageBucket: "school-e1ad8.appspot.com",
  messagingSenderId: "505892451466",
  appId: "1:505892451466:web:5aa047a2dcba103794e973",
  measurementId: "G-9PMCKZ0WDK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
