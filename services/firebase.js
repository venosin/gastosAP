// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7mMbMLP9ekGRLNpMPPDEDcTm5UHMvCoA",
  authDomain: "finanzas-66ae9.firebaseapp.com",
  projectId: "finanzas-66ae9",
  storageBucket: "finanzas-66ae9.firebasestorage.app",
  messagingSenderId: "729543791330",
  appId: "1:729543791330:web:ca438aa64cd59bcec904bb",
  measurementId: "G-CFT1ZHNM8G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);