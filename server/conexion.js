import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLtivn3rXi0111Mz68-iW0C0HlHON6IzU",
  authDomain: "sagretech-app.firebaseapp.com",
  projectId: "sagretech-app",
  storageBucket: "sagretech-app.appspot.com",
  messagingSenderId: "208127982617",
  appId: "1:208127982617:web:9592fd9461c4aaf0ba3e88"
};

// Initialize Firebase
export const ap4fb = initializeApp(firebaseConfig);
export const db = getFirestore(ap4fb);
