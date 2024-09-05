import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type User,
  onAuthStateChanged as _onAuthStateChanged,
} from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);

export const onAuthStateChanged = (
  callback: (authUser: User | null) => void,
) => {
  return _onAuthStateChanged(firebaseAuth, callback);
};

export const logInWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    const result = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password,
    );

    if (!result || !result.user) {
      throw new Error('Sign in failed');
    }
    return result.user.uid;
  } catch (err) {
    throw new Error('Invalid credentials');
  }
};

export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const res = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password,
    );
    const user = res.user;

    await addDoc(collection(firebaseDb, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });

    if (!user) throw new Error('Registration failed');

    return user.uid;
  } catch (err) {
    throw new Error('Invalid credentials');
  }
};

export const logout = () => {
  signOut(firebaseAuth);
};
