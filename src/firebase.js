import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyDOnxjvcf5OxfNv7HpPqkgncKBehCgTgN4",
  authDomain: "netflix-clone-b3ebc.firebaseapp.com",
  projectId: "netflix-clone-b3ebc",
  storageBucket: "netflix-clone-b3ebc.appspot.com",
  messagingSenderId: "115670554342",
  appId: "1:115670554342:web:8d7b3d87f8472ce1cb4d27"
};


const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
       const res = await createUserWithEmailAndPassword(auth, email, password );
       const user = res.user;
       await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
       });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const login = async (email, password)=>{
    try {
       await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};