import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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

/*
// This sets up firebaseui
const ui = new firebaseui.auth.AuthUI(window.firebase.auth())

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
],
};
// This adds firebaseui to the page
// It does everything else on its own
const startFirebaseUI = function (elementId) {
  ui.start(elementId, uiConfig)
}

export {db, startFirebaseUI};
*/