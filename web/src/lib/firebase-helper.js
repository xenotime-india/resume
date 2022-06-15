import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDqc8csAWRGLkUi_3lUAaNvbuVastSgxE0",
  authDomain: "auth.cloudalgo.com",
  projectId: "cloudalgo-4b9c9",
  storageBucket: "cloudalgo-4b9c9.appspot.com",
  databaseURL: "https://cloudalgo-4b9c9-default-rtdb.firebaseio.com",
  messagingSenderId: "204757366925",
  appId: "1:204757366925:web:01915c8ca0d296362f0ac4",
  measurementId: "G-MD0D94BB0L",
};
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);

export const auth = getAuth();

/**
 * Adds user to firestore "userProfiles" collection. In this case
 * its Firebase Authenticated user
 * @param usr Firebase user object
 */
export async function createOrUpdateProfile(usr) {
  if (usr) {
    const docSnap = await getDoc(doc(firestore, "userProfiles", usr.uid));
    if (!docSnap.exists())
      await setDoc(doc(firestore, "userProfiles", usr.uid), {
        displayName: usr.displayName,
        photoURL: usr.photoURL,
        uid: usr.uid,
      });
  }
}

/**
 * Update user Profile
 * @param user authenticated user
 * @param displayName display name to be set
 */
export async function updateProfile(user, displayName) {
  const { uid, photoURL } = user;
  const docSnap = await getDoc(doc(firestore, "userProfiles", uid));
  if (docSnap.exists()) {
    await setDoc(doc(firestore, "userProfiles", uid), {
      uid,
      photoURL,
      displayName,
    });
  }
}

export function addComment(slug, user, pid, comment) {
  const newComment = doc(collection(firestore, "blogComments"));
  return setDoc(
    newComment,
    {
      slug,
      comment,
      pid,
      authorId: user.uid,
      timestamp: serverTimestamp(),
    },
    { merge: false },
  );
}

// ACL is taken care by Firebase Rules
export function deleteComment(commentId) {
  return deleteDoc(doc(firestore, "blogComments", commentId));
}

async function getUserProfiles(ids) {
  const userProfiles = collection(firestore, "userProfiles");
  const q = query(userProfiles, where("uid", "in", ids));
  const reducer = (prev, cur) => {
    prev[cur.uid] = cur;
    return prev;
  };
  const userList = (await getDocs(q)).docs.map((user) => user.data());
  return userList.reduce(reducer, {});
}

export async function getComments(slug) {
  const commentsCol = query(
    collection(firestore, "blogComments"),
    where("slug", "==", slug),
    orderBy("timestamp"),
  );
  const commentsSnap = await getDocs(commentsCol);
  if (commentsSnap.empty) {
    return [];
  }
  let commentList = commentsSnap.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  if (!commentList.length) return [];
  const profileIds = commentList.map((comment) => comment.authorId);
  const userMap = await getUserProfiles(profileIds);
  commentList = commentList.map((value) => {
    return {
      ...value,
      authorName: userMap[value.authorId]
        ? userMap[value.authorId].displayName
        : "UNKNOWN",
      authorPhoto: userMap[value.authorId]
        ? userMap[value.authorId].photoURL
        : null,
    };
  });

  const childComments = commentList.filter((comment) => !!comment.pid);
  commentList = commentList.filter((comment) => !comment.pid);
  commentList = commentList.map((comment) => {
    let childs = null;
    if (comment.id) {
      childs = childComments.filter((c) => comment.id === c.pid);
    }
    return { ...comment, childs };
  });

  return commentList;
}

export default app;
