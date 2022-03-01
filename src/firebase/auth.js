import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import app from './firebase';
import { addUser } from './firestore';

export const auth = getAuth(app);

export const createUser = (user) => {
  return createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(userCredential => {
      updateUser({displayName: user.phoneNumber});
      return addUser({uid: userCredential.user.uid, ...user});
    });
}

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const logout = () => {
  return signOut(auth);
}

export const getCurrentUser = () => {
  return auth.currentUser;
}

export const updateUser = (user) => {
  return updateProfile(getCurrentUser(), user);
}

export const resetEmail = (email) => {
  return sendPasswordResetEmail(auth, email);
}
