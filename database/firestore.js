import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyCwNaX7MorYWCvGt4wuULyiIHBZMsrzVqM",	
  authDomain: "bay-area-hacks-74e5d.firebaseapp.com",	
  databaseURL: "https://bay-area-hacks-74e5d.firebaseio.com",	
  projectId: "bay-area-hacks-74e5d",	
  storageBucket: "bay-area-hacks-74e5d.appspot.com",	
  messagingSenderId: "924296123476",	
  appId: "1:924296123476:web:6e564230e01e5f59d2c9c1"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const auth = firebase.auth();
const db = firebase.firestore();


var USERID;
auth.onAuthStateChanged(authUser => {
  if (authUser) {
    USERID = authUser.uid;
  }
});

export {USERID};

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
