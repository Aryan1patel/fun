import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAE9QG-CQpZI1thbfyUslIv-R4sCnoAZ-k",
  authDomain: "oli-ash.firebaseapp.com",
  projectId: "oli-ash",
  storageBucket: "oli-ash.firebasestorage.app",
  messagingSenderId: "806371247466",
  appId: "1:806371247466:web:0ca39c947ffd6e40405113",
  measurementId: "G-JYKE34GHT4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
