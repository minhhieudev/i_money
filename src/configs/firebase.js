import firebase from "firebase/compat/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDc5klXyWfb0XsHICyH-AUiWPDcVzpJ97A",
  authDomain: "imoney-c346c.firebaseapp.com",
  projectId: "imoney-c346c",
  storageBucket: "imoney-c346c.appspot.com",
  messagingSenderId: "656554720939",
  appId: "1:656554720939:web:2afb3f90d75dd90eeac1ee",
  measurementId: "G-3CNK60F2NE",
};

firebase.initializeApp(firebaseConfig);

const projectAuth = getAuth();
const projectStorage = firebase.storage();
const projectFirestore = getFirestore();

const timestamp = serverTimestamp;

export {
  projectAuth,
  projectFirestore,
  projectStorage,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  timestamp,
};
