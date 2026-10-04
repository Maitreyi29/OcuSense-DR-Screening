import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration using Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

// Initialize Firebase only if API key is configured
const isFirebaseConfigured = Boolean(import.meta.env.VITE_FIREBASE_API_KEY);
const app = isFirebaseConfigured ? (!getApps().length ? initializeApp(firebaseConfig) : getApps()[0]) : null;
const auth = app ? getAuth(app) : null;

export { app, auth, isFirebaseConfigured };
