// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
// Firestore
import {
  getFirestore,
  addDoc,
  collection,
  setDoc,
  updateDoc,
  doc,
  where,
  query,
  getDocs,
  getDoc,
  orderBy,
  serverTimestamp,
  startAfter,
  limit,
  limitToLast,
  endBefore,
  endAt,
  startAt,
} from "firebase/firestore";
// Auth
import {
  getAuth,
  signInWithEmailAndPassword,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  verifyBeforeUpdateEmail,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import {
  getStorage,
  ref,
  getDownloadURL,
  listAll,
  list,
  getMetadata,
} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU6GXpNVr6tF0AHiN6jMuaadLqqV_5d84",
  authDomain: "citemind-bed69.firebaseapp.com",
  projectId: "citemind-bed69",
  storageBucket: "citemind-bed69.appspot.com",
  messagingSenderId: "899703457304",
  appId: "1:899703457304:web:1ab0f96a896dcdda1f656d",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const authApp = {
  auth,
  signInWithEmailAndPassword: (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  },
  signInAnonymously: () => signInAnonymously(auth),
  signOut: () => signOut(auth),
  onAuthStateChanged: (callback) => onAuthStateChanged(auth, callback),
  createUserWithEmailAndPassword: (email, password) =>
    createUserWithEmailAndPassword(auth, email, password),
  sendEmailVerification: () => sendEmailVerification(auth.currentUser),
  sendPasswordResetEmail: (email) => sendPasswordResetEmail(auth, email),
  updateEmail: (email) => verifyBeforeUpdateEmail(auth, email),
  setProfilePhoto: async (photoURL) => {
    return await updateProfile(auth.currentUser, {
      photoURL,
    });
  },
};

const dbApp = {
  db,
  addUser: (user) =>
    setDoc(doc(db, "users", user.uid), {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
    }),
  addSubmission: (submission) =>
    addDoc(collection(db, "submissions"), {
      responses: [],
      submissionDate: serverTimestamp(),
      ganttName: submission.ganttName,
      upvotes: [],
      views: [],
      submittedBy: submission.uid,
      status: "active",
    }),
  deleteSubmission: async (submissionId) => {
    // Set status of submission to "deleted"
    return updateDoc(doc(db, "submissions", submissionId), {
      status: "deleted",
    });
  },
  getMySubmissions: async (uid) => {
    const submissions = [];
    const querySnapshot = await getDocs(
      query(
        collection(db, "submissions"),
        where("submittedBy", "==", uid),
        where("status", "!=", "deleted")
      )
    );
    querySnapshot.forEach((doc) => {
      submissions.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    return submissions;
  },
  getSubmissionFeed: async () => {
    const submissions = [];
    // only shared with me, sharedWith array contains my uid
    const querySnapshot = await getDocs(
      query(
        collection(db, "submissions"),
        where("status", "==", "active"),
        orderBy("submissionDate", "desc")
      ),
      limitToLast(30)
    );
    querySnapshot.forEach((doc) => {
      submissions.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    return submissions;
  },
  getSubmission: async (submissionId) => {
    const docRef = doc(db, "submissions", submissionId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // For each reponse, get the response data and add it to the response array
      const responses = [];
      const responseRefs = docSnap.data().responses;
      for (let i = 0; i < responseRefs.length; i++) {
        const responseRef = responseRefs[i];
        const responseDoc = await getDoc(responseRef);
        responses.push({
          id: responseDoc.id,
          data: responseDoc.data(),
        });
      }

      return {
        id: docSnap.id,
        data: docSnap.data(),
        responses: responses,
      };
    } else {
      return null;
    }
  },
  updateSubmissionGanttName: async (submissionId, ganttName) => {
    return await updateDoc(doc(db, "submissions", submissionId), {
      ganttName: ganttName,
    });
  },
  updateSubmissionTasks: async (submissionId, tasks) => {
    return await updateDoc(doc(db, "submissions", submissionId), {
      tasks: tasks,
    });
  },
  addResponse: async (response, submissionId) => {
    let docRef = await addDoc(collection(db, "responses"), {
      responseDate: serverTimestamp(),
      reference: response.reference,
      upvotes: [],
    });
    // Get the submission document and append the response ref to the responses array
    let resultRefDoc = await getDoc(doc(db, "submissions", submissionId));
    const responses = resultRefDoc.data().responses;
    responses.push(docRef);
    return await updateDoc(doc(db, "submissions", submissionId), {
      responses: responses,
    });
  },
  getCountOfSubmissionsInFeed: async () => {
    const querySnapshot = await getDocs(
      query(
        collection(db, "submissions"),
        where("status", "==", "active"),
        orderBy("submissionDate", "desc")
      )
    );
    return querySnapshot.size;
  },
  getPaginatedSubmissions: async (
    startAfterSubmissionDate,
    endBeforeSubmissionDate,
    limitNum
  ) => {
    const submissions = [];

    let querySnapshot;
    if (startAfterSubmissionDate && endBeforeSubmissionDate) {
      querySnapshot = await getDocs(
        query(
          collection(db, "submissions"),
          where("status", "==", "active"),
          orderBy("submissionDate", "desc"),
          startAfter(startAfterSubmissionDate),
          endBefore(endBeforeSubmissionDate),
          limit(limitNum)
        )
      );
    } else if (startAfterSubmissionDate) {
      querySnapshot = await getDocs(
        query(
          collection(db, "submissions"),
          where("status", "==", "active"),
          orderBy("submissionDate", "desc"),
          startAfter(startAfterSubmissionDate),
          limit(limitNum)
        )
      );
    } else if (endBeforeSubmissionDate) {
      querySnapshot = await getDocs(
        query(
          collection(db, "submissions"),
          where("status", "==", "active"),
          orderBy("submissionDate", "desc"),
          endBefore(endBeforeSubmissionDate),
          limit(limitNum)
        )
      );
    } else {
      querySnapshot = await getDocs(
        query(
          collection(db, "submissions"),
          where("status", "==", "active"),
          orderBy("submissionDate", "desc"),
          limit(limitNum)
        )
      );
    }

    querySnapshot.forEach((doc) => {
      submissions.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    return submissions;
  },

  // Remove response from Submission
  // Edit Submission Text
  //
};

const storageApp = {
  storage,
  getDownloadURL,
  listAll: async (path) => {
    let result = await listAll(ref(storage, path));
    return result;
  },
};

export { authApp, dbApp, storageApp };
