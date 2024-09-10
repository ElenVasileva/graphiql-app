import { collection, getDocs, query, where } from 'firebase/firestore';
import { firebaseDb } from './firebase';

export const getUserName = async (
  uid: string | null,
): Promise<string | undefined> => {
  if (!uid) {
    return undefined;
  }

  try {
    const q = query(collection(firebaseDb, 'users'), where('uid', '==', uid));
    const doc = await getDocs(q);
    const data = doc.docs[0].data();
    return data.name;
  } catch (err) {
    throw new Error('Invalid credentials');
  }
};
