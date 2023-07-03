import {
  collection,
  query,
  where,
  getDocs,
  limit,
  doc,
  arrayRemove,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
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

export async function getSuggestedProfiles(userId, following) {
  let q 

  if (following.length > 0) {
    q = query(userReference, where("userId", "not-in", [...following, userId]), limit(10));
  } else {
    q = query(userReference, where("userId", "!=", userId), limit(10));
  }

  const result = await getDocs(q);

  const profiles = result.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  return profiles;
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId,
  profileId,
  isFollowingProfile
) {
  const userRef = doc(db, "users", loggedInUserDocId);

  const updateData = {
    following: isFollowingProfile
      ? arrayRemove(profileId)
      : arrayUnion(profileId),
  };

  await updateDoc(userRef, updateData);
}

export async function updateFollowedUserFollowers(
  profileDocId,
  loggedInUserDocId,
  isFollowingProfile
) {
  const userRef = doc(db, "users", profileDocId);

  const updateData = {
    followers: isFollowingProfile
      ? arrayRemove(loggedInUserDocId)
      : arrayUnion(loggedInUserDocId),
  };

  await updateDoc(userRef, updateData);
}