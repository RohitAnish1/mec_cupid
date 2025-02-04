import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCte-SewysEy4eSz-jfbxPfa0u3WTCS8-Q",
    authDomain: "mec-cupid.firebaseapp.com",
    projectId: "mec-cupid",
    storageBucket: "mec-cupid.appspot.com", // Fixed typo in storageBucket
    messagingSenderId: "130703983299",
    appId: "1:130703983299:web:89f385f69c664120c25876",
    measurementId: "G-Z2MH1P7JY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set up Google Sign-In with Redirect (fixes pop-up issue)
const provider = new GoogleAuthProvider();
const signInWithGoogle = () => {
    signInWithRedirect(auth, provider);
};

export { auth, signInWithGoogle };
