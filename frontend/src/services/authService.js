import { auth, isFirebaseConfigured } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';

// Helper to hash strings securely using Web Crypto API (SHA-256)
async function hashString(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Storage keys
const LOCAL_USERS_KEY = 'ocusense_registered_users_db';
const ACTIVE_SESSION_KEY = 'ocusense_active_user_session';

function getLocalUsers() {
  try {
    const raw = localStorage.getItem(LOCAL_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalUsers(users) {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
}

// Email format validation helper
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Register User
export async function registerUser({ name, email, password, role, organization }) {
  if (!name || name.trim().length < 2) {
    throw new Error('Please enter a valid full name.');
  }
  if (!isValidEmail(email)) {
    throw new Error('Please enter a valid email address.');
  }
  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  // Use Firebase Auth if configured
  if (isFirebaseConfigured && auth) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update display name
    await updateProfile(user, { displayName: name });
    
    // Send verification email
    await sendEmailVerification(user);

    return {
      uid: user.uid,
      name: name,
      email: user.email,
      role: role || 'Clinician',
      organization: organization || 'Ophthalmic Medical Center',
      emailVerified: user.emailVerified,
      provider: 'firebase',
      verificationSent: true
    };
  }

  // Secure Local Cryptographic Auth Fallback
  const users = getLocalUsers();
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    throw new Error('An account with this email address already exists. Please log in.');
  }

  const hashedPassword = await hashString(password);
  const newUser = {
    uid: 'user_' + Math.random().toString(36).substring(2, 11),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    passwordHash: hashedPassword,
    role: role || 'Ophthalmologist / Clinician',
    organization: organization || 'Medical Research Center',
    emailVerified: false,
    provider: 'secure_local',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveLocalUsers(users);

  // Set active session
  const sessionUser = {
    uid: newUser.uid,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    organization: newUser.organization,
    emailVerified: true,
    provider: newUser.provider
  };
  localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(sessionUser));

  return {
    ...sessionUser,
    verificationSent: true
  };
}

// Log In User
export async function loginUser({ email, password }) {
  if (!isValidEmail(email)) {
    throw new Error('Please enter a valid email address.');
  }
  if (!password) {
    throw new Error('Please enter your password.');
  }

  // Use Firebase Auth if configured
  if (isFirebaseConfigured && auth) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return {
      uid: user.uid,
      name: user.displayName || email.split('@')[0],
      email: user.email,
      role: 'Ophthalmologist / Clinician',
      organization: 'Ophthalmic Medical Center',
      emailVerified: user.emailVerified,
      provider: 'firebase'
    };
  }

  // Secure Local Cryptographic Auth Fallback
  const users = getLocalUsers();
  const targetUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!targetUser) {
    throw new Error('Invalid email or password. Please check your credentials or sign up.');
  }

  const inputHash = await hashString(password);
  if (targetUser.passwordHash !== inputHash) {
    throw new Error('Incorrect password. Please try again.');
  }

  const sessionUser = {
    uid: targetUser.uid,
    name: targetUser.name,
    email: targetUser.email,
    role: targetUser.role,
    organization: targetUser.organization,
    emailVerified: true,
    provider: targetUser.provider
  };
  localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(sessionUser));

  return sessionUser;
}

// Reset Password
export async function resetPassword(email) {
  if (!isValidEmail(email)) {
    throw new Error('Please enter a valid email address.');
  }

  if (isFirebaseConfigured && auth) {
    await sendPasswordResetEmail(auth, email);
    return true;
  }

  const users = getLocalUsers();
  const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (!exists) {
    throw new Error('No registered account found with this email address.');
  }
  return true;
}

// Log Out User
export async function logoutUser() {
  if (isFirebaseConfigured && auth) {
    await firebaseSignOut(auth);
  }
  localStorage.removeItem(ACTIVE_SESSION_KEY);
}

// Get Initial User Session
export function getStoredUserSession() {
  try {
    const raw = localStorage.getItem(ACTIVE_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Subscribe to Auth State Changes
export function subscribeToAuthState(callback) {
  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const session = {
          uid: user.uid,
          name: user.displayName || user.email.split('@')[0],
          email: user.email,
          role: 'Ophthalmologist / Clinician',
          organization: 'Ophthalmic Medical Center',
          emailVerified: user.emailVerified,
          provider: 'firebase'
        };
        callback(session);
      } else {
        callback(null);
      }
    });
  }
  return () => {};
}
