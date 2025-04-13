// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAs6vIiHB5vrDSWLxWmKqf8pTq3p3Gr9o",
  authDomain: "headshot-hub.firebaseapp.com",
  projectId: "headshot-hub",
  storageBucket: "headshot-hub.firebasestorage.app",
  messagingSenderId: "609896146141",
  appId: "1:609896146141:web:2d24883173bb97c778e734",
  measurementId: "G-8TGNDEDLSE"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export default firebase;
