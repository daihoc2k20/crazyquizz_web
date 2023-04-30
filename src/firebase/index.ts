import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMBta0y3hQVCJy0uxfCo_jtfJCqjLCETI",
  authDomain: "crazy-quizz.firebaseapp.com",
  projectId: "crazy-quizz",
  storageBucket: "crazy-quizz.appspot.com",
  messagingSenderId: "199430435816",
  appId: "1:199430435816:web:59f537fc044e3ce9176a5d",
  measurementId: "G-X8T65SV74X",
};
const authProvider = new GoogleAuthProvider();
authProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");

const app = initializeApp(firebaseConfig);
export const fireauth = getAuth(app);
export const firestore = getFirestore(app);

export { authProvider };
