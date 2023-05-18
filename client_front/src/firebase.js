// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";




// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "test-96a3f.firebaseapp.com",
  projectId: "test-96a3f",
  storageBucket: "test-96a3f.appspot.com",
  messagingSenderId: "944745464315",
  appId: "1:944745464315:web:c6edf590346a5589438b5e"
};

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: "itp2023-8dc4f.firebaseapp.com",
//   projectId: "itp2023-8dc4f",
//   storageBucket: "itp2023-8dc4f.appspot.com",
//   messagingSenderId: "547005262348",
//   appId: "1:547005262348:web:619b71eef14898cd18dc29"
// };




// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth()
export const storage = getStorage(app);


