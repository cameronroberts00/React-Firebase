import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5FMR83iaGgjtykL7QpGlngaUoY2JhYDw",
  authDomain: "cooking-ninja-site-6d936.firebaseapp.com",
  projectId: "cooking-ninja-site-6d936",
  storageBucket: "cooking-ninja-site-6d936.appspot.com",
  messagingSenderId: "850523611388",
  appId: "1:850523611388:web:c9bd281b1150f575b9f779",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
