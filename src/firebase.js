import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD88NZ_sBWq225NWzkyKwDcGVnOSj76Fa4",
    authDomain: "react-instagram-clone-c385c.firebaseapp.com",
    databaseURL: "https://react-instagram-clone-c385c-default-rtdb.firebaseio.com",
    projectId: "react-instagram-clone-c385c",
    storageBucket: "react-instagram-clone-c385c.appspot.com",
    messagingSenderId: "587589930168",
    appId: "1:587589930168:web:36ac1fb3bf4e3972b6f84d",
    measurementId: "G-SPC72RV5QW"
});

const db=firebaseApp.firestore();
const auth=firebase.auth();
const storage=firebase.storage();

export {db,auth,storage};

