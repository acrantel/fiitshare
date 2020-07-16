import admin from 'firebase-admin';

var serviceAccount = require("C:/Users/alinali/Downloads/bay-area-hacks-firebase-adminsdk-xwgpc-ea21d26aec.json");

try {
  console.log("trying to initialize app in firebase-config");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://bay-area-hacks.firebaseio.com"
  });
} catch (error) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    // eslint-disable-next-line no-console
    console.error('Firebase admin initialization error', error.stack);
  }
}



const db = admin.firestore();

export default db;