import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA8uYMGSfe3pI9RWYD0-9mCiuIQetNvJ_8",
    authDomain: "whatsappreactapp.firebaseapp.com",
    databaseURL: "https://whatsappreactapp.firebaseio.com",
    projectId: "whatsappreactapp",
    storageBucket: "whatsappreactapp.appspot.com",
    messagingSenderId: "677001211873",
    appId: "1:677001211873:web:b858e42809dec3147baca0",
    measurementId: "G-C7VDZP52M2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
