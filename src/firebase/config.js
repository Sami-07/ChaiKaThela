import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth"
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "chaikathela7.firebaseapp.com",
    projectId: "chaikathela7",
    storageBucket: "chaikathela7.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

//init
firebase.initializeApp(firebaseConfig)
// const app = initializeApp(firebaseConfig);
//init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

const provider = new GoogleAuthProvider()
// const storage = getStorage()
//timestamp
const timestamp = firebase.firestore.Timestamp
const auth = getAuth();

export { projectFirestore, projectAuth,timestamp,auth }