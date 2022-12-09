import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, set, onValue, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const database = getDatabase();
export async function login() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.

      const user = result.user;
      console.log('유저', user);
      return user;
      // ...
    })
    .catch((error) => {
      console.log(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
export async function logout() {
  const auth = getAuth();
  // console.log(auth);
  return signOut(auth).then(() => {
    return null;
  });
}

export function onUserStateChange(callback) {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

export async function writeUserData(uuid, userId, name, offer, select) {
  const db = getDatabase();
  set(ref(db, 'users/' + uuid), {
    uuid,
    userId,
    username: name,
    offer,
    select,
  });
}

export async function readBoard(callback) {
  return get(ref(database, 'users')).then((data) => {
    if (data.exists()) {
      const newData = data.val();
      const board = [];

      for (let item in newData) {
        board.push({ item: newData[item] });
      }
      callback(board);
    }
  });
}
