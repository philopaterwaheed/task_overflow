import { auth } from "./Config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  confirmPasswordReset,
  signInWithCredential,
  FacebookAuthProvider,
} from "firebase/auth";
// Listen for authentication state to change.
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});

async function register(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred;
}

async function resetPassword(email) {
  const cred = await sendPasswordResetEmail(auth, email);
  return cred;
}
async function signout() {
  const cred = await signOut(auth);
  console.log("signed out ");
  return cred;
}
async function login(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export { register, login ,resetPassword , signout};
