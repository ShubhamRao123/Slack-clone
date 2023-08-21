import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6kSeEHNFhsv52UW5v5oOHtT1idQhhJec",
  authDomain: "slack-clone-f74b2.firebaseapp.com",
  projectId: "slack-clone-f74b2",
  storageBucket: "slack-clone-f74b2.appspot.com",
  messagingSenderId: "309128203336",
  appId: "1:309128203336:web:daefd9f118b7a84e659c7d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
// export default db;
