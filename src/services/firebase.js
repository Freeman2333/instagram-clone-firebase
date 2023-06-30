import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

const userReference = collection(db, "users")

export async function doesUsernameExist(username) {
  const q = query(
    userReference,
    where("username", "==", username.toLowerCase())
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.size > 0;
}

export async function getUserByUserId(userId) {
  const q = query(userReference, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  const user = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  return user;
}