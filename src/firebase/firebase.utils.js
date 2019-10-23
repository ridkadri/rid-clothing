import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAvNcjqRLDZcUPiLaMk-sQsV_GByjNOi0Q",
  authDomain: "rid-clothingsite.firebaseapp.com",
  databaseURL: "https://rid-clothingsite.firebaseio.com",
  projectId: "rid-clothingsite",
  storageBucket: "rid-clothingsite.appspot.com",
  messagingSenderId: "459918651000",
  appId: "1:459918651000:web:49f15057328e5c5b59078d",
  measurementId: "G-BGMJC9K6YY"
};

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider)
  .catch(()=>{});

  export default firebase;