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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);

    }
  }

  return userRef;
};


  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  //.catch(()=>{});

  export default firebase;