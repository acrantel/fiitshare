import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from '../firebaseConfig.json';

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
export async function getDoc(collectionName, docName, parent = db) {
  const doc = await parent.collection(collectionName).doc(docName).get();
  return doc.exists ? doc.data() : null;
}

export const { firestore: { FieldValue } } = firebase;
