import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA1OEYkGbExSFQWVF3U2bX4xm3K0UvHgQ4",
  authDomain: "bay-area-hacks.firebaseapp.com",
  databaseURL: "https://bay-area-hacks.firebaseio.com",
  projectId: "bay-area-hacks",
  storageBucket: "bay-area-hacks.appspot.com",
  messagingSenderId: "694610619201",
  appId: "1:694610619201:web:029eacc8f995fd70fb8fc0"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();

export {
  auth,
  db
};

// Frankly I can't be bothered to write this whole thing every time
export async function getDoc (collectionName, docName, parent = db) {
    const doc = await parent.collection(collectionName).doc(docName).get();
    return doc.exists ? doc.data() : null;
}

export const { firestore: { FieldValue } } = firebase;
