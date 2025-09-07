// app/firebase/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tumhara firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCBHG0vGAVFJfY1d6hGT6I3ghIwF5nZBOE",
  authDomain: "digilex-website-1a689.firebaseapp.com",
  projectId: "digilex-website-1a689",   // 👈 Firestore isi projectId se linked hai
  storageBucket: "digilex-website-1a689.appspot.com",
  messagingSenderId: "971153506528",
  appId: "1:971153506528:web:c535a9dac87b4d33391085",
};

// Firebase app initialize
const app = initializeApp(firebaseConfig);

// Firestore instance export
export const db = getFirestore(app);
