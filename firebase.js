// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore}  from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAP_2-EwWmigT_o35a0YN5wJWflrNicKis",
  authDomain: "inventory-b1d71.firebaseapp.com",
  projectId: "inventory-b1d71",
  storageBucket: "inventory-b1d71.appspot.com",
  messagingSenderId: "142209977126",
  appId: "1:142209977126:web:aeac913c9e352915b24fe7",
  measurementId: "G-FX4W94NW9T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore =getFirestore(app)
export{firestore}