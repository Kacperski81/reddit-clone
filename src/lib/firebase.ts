// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, User, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
// import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection,query,where,getDocs,setDoc,doc, getDoc } from "firebase/firestore";
import useStore from "../store";
import {shallow} from "zustand/shallow";
import { useEffect } from "react";
import { set } from "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsdS-ptOJUrORr8cm3t0RNzMi4gNWNXtw",
  authDomain: "reddit-clone-6ec90.firebaseapp.com",
  projectId: "reddit-clone-6ec90",
  storageBucket: "reddit-clone-6ec90.appspot.com",
  messagingSenderId: "746644931195",
  appId: "1:746644931195:web:7fc22a2ff3a518b21e58de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

type UserType = {
  email: string,
  uid: string,
  username?: string,
  password?: string,
}

type LoginUserType = {
  email: string,
  password: string,
}

export async function signupUser({username,email,password}:{username: string, email: string, password: string}) {
  const userCreds = await createUserWithEmailAndPassword(auth,email,password);
  // console.log(userCreds.user)
  await createUser({user: userCreds.user, username});
  return userCreds;
}

export async function createUser({user, username}: {user: User, username: string}) {
  const userdoc = doc(db, "users", user.uid);
  await setDoc(userdoc, {
    uid: user.uid,
    username,
    email: user.email,
  })
}

export async function checkIfUsernameTaken(username: string) {
  const col = collection(db, "users");
  const q = query(col, where("username", "==", username));
  const { empty } = await getDocs(q);
  return empty || "Username is already taken";
}

export async function useAuthUser() {
 const [setUser, resetUser] = useStore(state => [state.setUser, state.resetUser], shallow);

  useEffect(() => {
    async function getUser(user: UserType | null) {
      if(user === null) resetUser();
      const userRef = doc(db, "users", user!.uid)
      const userDoc = await getDoc(userRef);
      if(userDoc.exists()) {
        const data = userDoc.data();
        setUser({
          email: data.email,
          uid: data.uid,
          username: data.username,
        })
      } else {
        resetUser();
      }
    }
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if(user && user.email) {
        getUser({email: user!.email, uid: user!.uid});
      }
    })

    return () => unsubscribe();

  },[setUser, resetUser])
}

export async function logOut() {
  return await signOut(auth);
}

export async function loginUser({email, password} : LoginUserType) {
  return await signInWithEmailAndPassword(auth, email, password);
}