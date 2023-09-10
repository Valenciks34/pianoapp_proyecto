import { initializeApp } from 'firebase/app';

import * as firebaseAuth from 'firebase/auth';

// Optionally import the services that you want to use
import { initializeAuth,  } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";

// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCT2uysCtTXKZSB0c-loZXXu-bZeCOx5fY",
    authDomain: "loginapp345.firebaseapp.com",
    projectId: "loginapp345",
    storageBucket: "loginapp345.appspot.com",
    messagingSenderId: "370257564271",
    appId: "1:370257564271:web:a145dd9a0ed9f6c875b39a",
    measurementId: "G-CLJ7VGSK1Q"
  };

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
export const db = getFirestore(app);

        
export const reactNativePersistence = (firebaseAuth).getReactNativePersistence;
export const auth = initializeAuth(app, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage)
});