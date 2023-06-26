import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth"
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCJG_PhABu_NYfwMEm-f2NCysrNzCiKOQU",
    authDomain: "chaikathela7.firebaseapp.com",
    projectId: "chaikathela7",
    storageBucket: "chaikathela7.appspot.com",
    messagingSenderId: "165004505667",
    appId: "1:165004505667:web:a8a76ae36e945169b29af6"
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