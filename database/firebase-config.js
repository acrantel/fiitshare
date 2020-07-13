// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

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

      export default firebase;


  function getUserData()
  {

  }

  function getGroupData()
  {

  }