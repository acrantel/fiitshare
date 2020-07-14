import '../styles.css'


// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {

  /*
  const firebaseConfig = {
    apiKey: "AIzaSyCwNaX7MorYWCvGt4wuULyiIHBZMsrzVqM",
    authDomain: "bay-area-hacks-74e5d.firebaseapp.com",
    databaseURL: "https://bay-area-hacks-74e5d.firebaseio.com",
    projectId: "bay-area-hacks-74e5d",
    storageBucket: "bay-area-hacks-74e5d.appspot.com",
    messagingSenderId: "924296123476",
    appId: "1:924296123476:web:6e564230e01e5f59d2c9c1"
  };

  firebase.initializeApp(firebaseConfig);
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
*/
/*
  firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          console.log(result.credential);
          // ...
      }
      // The signed-in user info.
      var user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });*/

  return <Component {...pageProps} />
}