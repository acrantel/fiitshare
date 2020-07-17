import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const { firestore: { FieldValue } } = admin;

console.log(process.env.FIREBASE_API_KEY);
console.log(process.env.FIREBASE_AUTH_DOMAIN);
console.log(process.env.FIREBASE_DATABASE_URL);
console.log(process.env.FIREBASE_PROJECT_ID);
console.log(process.env.FIREBASE_STORAGE_BUCKET);
console.log(process.env.FIREBASE_MESSAGING_SENDER_ID);
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
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
