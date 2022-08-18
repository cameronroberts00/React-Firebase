import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA4LUFONRIbHPbdZot8XtLFqNLCoMlwbrA",
  authDomain: "financetracker-61fa7.firebaseapp.com",
  projectId: "financetracker-61fa7",
  storageBucket: "financetracker-61fa7.appspot.com",
  messagingSenderId: "499891147719",
  appId: "1:499891147719:web:d4b4f7ab7248827e94bfe2",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage=firebase.storage();
//timestamp func
const timestamp = firebase.firestore.Timestamp;

//export the stuff we want
export { projectFirestore, projectAuth, timestamp, projectStorage };
