// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHBb0CCSazZnEmF2BGbWuZWOnwss-SmB0",
  authDomain: "expense-tracker-95a26.firebaseapp.com",
  projectId: "expense-tracker-95a26",
  storageBucket: "expense-tracker-95a26.appspot.com",
  messagingSenderId: "785009518784",
  appId: "1:785009518784:web:86ddfea01336ea5b7c6525",
  measurementId: "G-X40B019G4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
const analytics = getAnalytics(app);

//firebase login
//firebase init
//firebase deploy