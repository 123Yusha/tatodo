// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhG6-P5LEVduQDVMuZwNH9pEA0OTvWKkI",
  authDomain: "tatodo-4761c.firebaseapp.com",
  projectId: "tatodo-4761c",
  storageBucket: "tatodo-4761c.firebasestorage.app",
  messagingSenderId: "787393626115",
  appId: "1:787393626115:web:bf17ec5abf407a7a0b0e36",
  measurementId: "G-MTRVWQ0BJM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage), 
  });