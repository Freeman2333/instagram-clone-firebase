import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCufdUi9u8SGj75TNWdse8LlA1y-RmP-kw",
  authDomain: "instagram-86ffb.firebaseapp.com",
  projectId: "instagram-86ffb",
  storageBucket: "instagram-86ffb.appspot.com",
  messagingSenderId: "340276942892",
  appId: "1:340276942892:web:0b2db443b050361a8c9989",
};

// Initialize Firebase app
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

