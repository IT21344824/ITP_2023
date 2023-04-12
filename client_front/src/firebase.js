// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";




// Your web app's Firebase configuration

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: "itp2023-fe4d4.firebaseapp.com",
//   projectId: "itp2023-fe4d4",
//   storageBucket: "itp2023-fe4d4.appspot.com",
//   messagingSenderId: "312265764601",
//   appId: "1:312265764601:web:ea55a7bac6f2690abe7c28"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCdf_J-0hYyOpTYiYVj4X4qad_HbFb8S6c",
  authDomain: "itp2023-8dc4f.firebaseapp.com",
  projectId: "itp2023-8dc4f",
  storageBucket: "itp2023-8dc4f.appspot.com",
  messagingSenderId: "547005262348",
  appId: "1:547005262348:web:619b71eef14898cd18dc29"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth()
export const storage = getStorage(app);


