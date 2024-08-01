// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBfkV5qdeP0RO20Jk8K4vRsRmi1FiXOEXs',
  authDomain: 'notes-app-ef1e4.firebaseapp.com',
  projectId: 'notes-app-ef1e4',
  storageBucket: 'notes-app-ef1e4.appspot.com',
  messagingSenderId: '523336508885',
  appId: '1:523336508885:web:c26603c7b3aff9395b095c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
