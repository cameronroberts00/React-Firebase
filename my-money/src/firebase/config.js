import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEewMy1trNaCFv1yoV62myeyggD3j2KkU",
  authDomain: "mymoney-38267.firebaseapp.com",
  projectId: "mymoney-38267",
  storageBucket: "mymoney-38267.appspot.com",
  messagingSenderId: "867472347284",
  appId: "1:867472347284:web:58060f7f0a7d02bc6e2481",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//timestamp
const timestamp = firebase.firestore.Timestamp;


export { projectFirestore, projectAuth, timestamp };
