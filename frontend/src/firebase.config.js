// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAnV7Xt7-UanjKJav5b4reIK3-agnsikEc",
  authDomain: "dolo-media-5f33d.firebaseapp.com",
  projectId: "dolo-media-5f33d",
  storageBucket: "dolo-media-5f33d.appspot.com",
  messagingSenderId: "1046751744373",
  appId: "1:1046751744373:web:cc8f1585e2e6d8c540833c",
  measurementId: "G-1GB8WTMS6Q"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export {auth, provider}
