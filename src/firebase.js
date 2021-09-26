import { initializeApp } from 'firebase/app';
import { getAuth } from "@firebase/auth";
import { getFirestore } from "firebase/firestore"
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwN-3HZ9BCVGEMv2wW1eue_1gCZJPtyhE",
  authDomain: "telegram-clone-b6ac4.firebaseapp.com",
  projectId: "telegram-clone-b6ac4",
  storageBucket: "telegram-clone-b6ac4.appspot.com",
  messagingSenderId: "907632229993",
  appId: "1:907632229993:web:808bdf8da5d8936e31ecf8"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;

// // Initialize Firebase
// const firebaseApp = firebase.initializeApp(firebaseConfig);

// const db = firestore(firebaseApp);
// const auth = auth();
// // const provider = new auth.GoogleAuthProvider();

// export {  auth  };
// export default db;