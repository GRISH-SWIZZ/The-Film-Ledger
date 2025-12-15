// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzp46-nt7TMa7Aqfv0PB_8722xeEUV3PU",
    authDomain: "thefilmledger.firebaseapp.com",
    projectId: "thefilmledger",
    storageBucket: "thefilmledger.firebasestorage.app",
    messagingSenderId: "843559032586",
    appId: "1:843559032586:web:b3481c86a519b9f2ff0cf3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
