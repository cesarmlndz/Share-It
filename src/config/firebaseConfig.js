import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDKgU3cxrqt8Enz68CGoLDyIamjh74tNLg",
  authDomain: "socialmediaproject-cd9cb.firebaseapp.com",
  projectId: "socialmediaproject-cd9cb",
  storageBucket: "socialmediaproject-cd9cb.appspot.com",
  messagingSenderId: "596997221656",
  appId: "1:596997221656:web:7c8af77aaabc01e87a426d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)