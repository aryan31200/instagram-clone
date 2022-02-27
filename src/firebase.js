import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "dotenv/config";
import configs from "./configs";
import { config } from "dotenv";
console.log(process.env.API_KEY);

const firebaseApp = firebase.initializeApp({
  apiKey: configs.apiKey,
  authDomain: configs.authDomain,
  databaseURL: configs.databaseURL,
  projectId: configs.projectId,
  storageBucket: configs.storageBucket,
  messagingSenderId: configs.messagingSenderId,
  appId: configs.appId,
  measurementId: configs.measurementId,
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

const provider=new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle=()=>auth.signInWithPopup(provider);

