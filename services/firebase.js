// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Verifica que las variables de entorno se están cargando correctamente
console.log("API Key: ", import.meta.env.VITE_FIREBASE_API_KEY);
console.log("Auth Domain: ", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
console.log("Project ID: ", import.meta.env.VITE_FIREBASE_PROJECT_ID);
console.log("Storage Bucket: ", import.meta.env.VITE_FIREBASE_STORAGE_BUCKET);
console.log("Messaging Sender ID: ", import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID);
console.log("App ID: ", import.meta.env.VITE_FIREBASE_APP_ID);
console.log("Measurement ID: ", import.meta.env.VITE_FIREBASE_MEASUREMENT_ID);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
