import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCXswRGDetjlPc0gJPIlpYGJLlJaqTR23w',
  authDomain: 'crwn-db-bc793.firebaseapp.com',
  databaseURL: 'https://crwn-db-bc793.firebaseio.com',
  projectId: 'crwn-db-bc793',
  storageBucket: 'crwn-db-bc793.appspot.com',
  messagingSenderId: '432053479722',
  appId: '1:432053479722:web:21923966ce6670c17a5653',
  measurementId: 'G-QFW6CFV8CV',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
