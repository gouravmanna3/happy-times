// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQpZN6Kb3GfdQIQXpVoKbtkGcmU0VNbo0",
  authDomain: "lg-meet-574bc.firebaseapp.com",
  projectId: "lg-meet-574bc",
  storageBucket: "lg-meet-574bc.appspot.com",
  messagingSenderId: "40704351143",
  appId: "1:40704351143:web:2e863f6fdfb811053d3482",
  measurementId: "G-KW52WFJK1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app)