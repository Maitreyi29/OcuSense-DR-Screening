import { supabase } from '../supabaseClient';

// Helper to format Supabase user object into application user state
export function formatSupabaseUser(user) {
  if (!user) return null;
  const fullName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    'User';

  return {
    uid: user.id,
    id: user.id,
    name: fullName,
    email: user.email,
    emailVerified: Boolean(user.email_confirmed_at),
    user_metadata: user.user_metadata,
  };
}

// Sign Up User with Supabase
export async function registerUser({ name, email, password }) {
  if (!name || name.trim().length < 2) {
    throw new Error('Please enter your full name.');
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Please enter a valid email address.');
  }
  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: {
        full_name: name.trim(),
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  const user = data.user;
  const isConfirmed = Boolean(user?.email_confirmed_at);

  return {
    user,
    email: email.trim(),
    requiresVerification: !isConfirmed,
    verificationSent: true,
  };
}

// Log In User with Supabase
export async function loginUser({ email, password }) {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Please enter a valid email address.');
  }
  if (!password) {
    throw new Error('Please enter your password.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    const msg = error.message.toLowerCase();
    if (msg.includes('invalid login credentials') || msg.includes('invalid credentials')) {
      throw new Error('Invalid email or password. Please check your credentials and try again.');
    }
    if (msg.includes('email not confirmed')) {
      throw new Error('Please verify your email address before signing in. Check your inbox for the verification link.');
    }
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error('Login failed. Please try again.');
  }

  return formatSupabaseUser(data.user);
}

// Reset Password via Supabase
export async function resetPassword(email) {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Please enter a valid email address.');
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: window.location.origin,
  });

  if (error) {
    throw new Error(error.message);
  }

  return true;
}

// Log Out User via Supabase
export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out from Supabase:', error);
  }
}
