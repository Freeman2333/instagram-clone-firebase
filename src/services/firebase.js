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
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../lib/firebase";

const userReference = collection(db, "users");
const photosReference = collection(db, "photos");

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
  let q;

  if (following.length > 0) {
    q = query(
      userReference,
      where("userId", "not-in", [...following, userId]),
      limit(10)
    );
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

export function seedDatabase() {
  const users = [
    {
      userId: "NvPY9M9MzFTARQ6M816YAzDJxZ72",
      username: "karl",
      fullName: "Karl Hadwen",
      emailAddress: "karlhadwen@gmail.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "raphael",
      fullName: "Raffaello Sanzio da Urbino",
      emailAddress: "raphael@sanzio.com",
      following: [],
      followers: ["NvPY9M9MzFTARQ6M816YAzDJxZ72"],
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "dali",
      fullName: "Salvador Dalí",
      emailAddress: "salvador@dali.com",
      following: [],
      followers: ["NvPY9M9MzFTARQ6M816YAzDJxZ72"],
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "orwell",
      fullName: "George Orwell",
      emailAddress: "george@orwell.com",
      following: [],
      followers: ["NvPY9M9MzFTARQ6M816YAzDJxZ72"],
      dateCreated: Date.now(),
    },
  ];

  for (let k = 0; k < users.length; k++) {
    addDoc(userReference, users[k]);
  }

  for (let i = 1; i <= 5; ++i) {
    addDoc(photosReference, {
      photoId: i,
      userId: "2",
      imageSrc: `/images/users/raphael/${i}.jpg`,
      caption: "Saint George and the Dragon",
      likes: [],
      comments: [
        {
          displayName: "dali",
          comment: "Love this place, looks like my animal farm!",
        },
        {
          displayName: "orwell",
          comment: "Would you mind if I used this picture?",
        },
      ],
      userLatitude: "40.7128°",
      userLongitude: "74.0060°",
      dateCreated: Date.now(),
    });
  }
}

export async function getPhotos(following) {
  return new Promise((resolve, reject) => {
    const q = query(photosReference, where("userId", "in", following));

    onSnapshot(
      q,
      (snapshot) => {
        const userFollowedPhotos = snapshot.docs.map((photo) => ({
          ...photo.data(),
          docId: photo.id,
        }));

        resolve(userFollowedPhotos);
      },
      reject
    );
  });
}

export const toggleLike = async (docId, userId, isLiked) => {
  const photoRef = doc(db, "photos", docId);
  const updateData = isLiked ? arrayRemove(userId) : arrayUnion(userId);
  await updateDoc(photoRef, {
    likes: updateData,
  });
};

export const addComment = async (docId, comment, displayName) => {
  const photoRef = doc(db, "photos", docId);
  await updateDoc(photoRef, {
    comments: arrayUnion({ displayName, comment }),
  });
};
