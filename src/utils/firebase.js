// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChO7gKW8SrYFmtc2V8JISABAzj52hKSdQ",
    authDomain: "netflix-gpt-9af6a.firebaseapp.com",
    projectId: "netflix-gpt-9af6a",
    storageBucket: "netflix-gpt-9af6a.appspot.com",
    messagingSenderId: "863119018885",
    appId: "1:863119018885:web:fcc30cc1a6813f8cd152ec",
    measurementId: "G-34QWR7TLH7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();