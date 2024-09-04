

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxpXZIWhVTv6mfQx_KkfJw6f7_oZgf8ZA",
  authDomain: "chat-react-8a82d.firebaseapp.com",
  projectId: "chat-react-8a82d",
  storageBucket: "chat-react-8a82d.appspot.com",
  messagingSenderId: "903051329125",
  appId: "1:903051329125:web:26d459c73672fd9796508c"
};

// Initialize Firebase
const appFirebease = initializeApp(firebaseConfig);
export default appFirebease
export const db = getFirestore(appFirebease);
export const storage = getStorage(appFirebease);
