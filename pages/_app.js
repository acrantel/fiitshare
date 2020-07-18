import '../styles.css'


// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

import withAuth from '../helpers/withAuth.js';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    const AuthComponent = withAuth(Component);
    return <AuthComponent {...pageProps} />;
}
