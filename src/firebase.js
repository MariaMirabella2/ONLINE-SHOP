import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
const firebaseConfig = {
    apiKey: "AIzaSyDaRWzIPv-OHPayki-ukaYG7log5oJE5wQ",
    authDomain: "farma-f27a8.firebaseapp.com",
    projectId: "farma-f27a8",
    storageBucket: "farma-f27a8.appspot.com",
    messagingSenderId: "673917439495",
    appId: "1:673917439495:web:fa99d1473e7ffc404364a2",
    measurementId: "G-MPM61E5RG1"
  };
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.firestore();
export const st = app.storage();
export default app;
