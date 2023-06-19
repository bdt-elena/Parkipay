import firebase from "firebase/app/dist/index.esm.js"
import "firebase/storage/dist/index.esm.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBy_TKtowKDFJIKER_IjR04VmtkunkOJRE",
  authDomain: "softwarepia-1807f.firebaseapp.com",
  projectId: "softwarepia-1807f",
  storageBucket: "softwarepia-1807f.appspot.com",
  messagingSenderId: "657651362637",
  appId: "1:657651362637:web:b2f0177c1369aabb5ae504"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export const storageRef = storage.ref();
