// Import Firebase core and services
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAuJ_Yh1XoDh5qdQMuAqo0Hxz2gv_U26c",
  authDomain: "anabelle-grad.firebaseapp.com",
  projectId: "anabelle-grad",
  storageBucket: "anabelle-grad.firebasestorage.app",
  messagingSenderId: "49638723030",
  appId: "1:49638723030:web:410bcc0700ff50d52da877",
  measurementId: "G-MZFVHY0BXV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Analytics (only works in browser + https)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Initialize Firestore
export const db = getFirestore(app);

// Export app if needed elsewhere
export { app };
