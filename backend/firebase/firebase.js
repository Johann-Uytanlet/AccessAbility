// - Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// - Your web app's Firebase configuration
// - For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAXMWJUxpQC_O2BUPzNJ5eB2k-L_VIn5LQ",
    authDomain: "accessabilitygdsc.firebaseapp.com",
    projectId: "accessabilitygdsc",
    storageBucket: "accessabilitygdsc.appspot.com",
    messagingSenderId: "990881041261",
    appId: "1:990881041261:web:182b9861a1d5e7508ce864",
    measurementId: "G-R82VZ8GEQQ"
};

// - Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);