import firebase from 'firebase/app'; // <-- This must be first
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

try {
  firebase.initializeApp({
    apiKey: "AIzaSyBHeGdXT7_tcMXLIbM-kc9vAIQFR0Vzpnc",
    authDomain: "chatwebapp-9c06f.firebaseapp.com",
    projectId: "chatwebapp-9c06f",
    storageBucket: "chatwebapp-9c06f.appspot.com",
    messagingSenderId: "255521524877",
    appId: "1:255521524877:web:eb9e0b7ab29c0d5bc7a6c4"
  });
} catch (error) {
  if (!/already exists/u.test(error.message)) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

// Passing off firebase.auth() instead of firebase.auth
// allows us to share the same instance of Firebase throughout
// the entire app whenever we import it from here.

export const fb = {
  auth: firebase.auth(),
  storage: firebase.storage(),
  firestore: firebase.firestore(),
};
