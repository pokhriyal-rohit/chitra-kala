import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const persistUser = (user: User) => {
  localStorage.setItem(
    "firebase_user",
    JSON.stringify({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }),
  );
  return user;
};

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return persistUser(result.user);
};

export const loginWithFacebook = async () => {
  const result = await signInWithPopup(auth, facebookProvider);
  return persistUser(result.user);
};
