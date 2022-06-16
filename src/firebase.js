import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCxoDWqLyrmc4exgDxV6ZYJz6oz72L59dI",
  authDomain: "whatsapp-clone-f5007.firebaseapp.com",
  projectId: "whatsapp-clone-f5007",
  storageBucket: "whatsapp-clone-f5007.appspot.com",
  messagingSenderId: "473308138993",
  appId: "1:473308138993:web:7594bb65bfccaa5e280850",
  measurementId: "G-DY5GJXKYKL"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const provider = new GoogleAuthProvider(auth);

export { auth, provider };
export default db;