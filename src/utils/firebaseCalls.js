import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const meetCollectionRef = collection(db, "allMeets");

export const getMeets = async () => {
  const data = await getDocs(meetCollectionRef);
  return data.docs.map((doc) => doc.data());
}

export const createMeet = async (data) => {
  console.log(data);
  await addDoc(meetCollectionRef, data);
}