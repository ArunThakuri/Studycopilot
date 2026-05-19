// Authentication Service using Supabase
// Handles signup, login, logout, and session management

import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

// Supabase client for auth operations
const SUPABASE_URL = `https://${projectId}.supabase.co`;
const SUPABASE_ANON_KEY = publicAnonKey;

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  grade: number;
  avatar?: string;
  created_at?: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: AuthUser;
}

// ============================================
// Session Management
// ============================================

const SESSION_KEY = 'studycopilot_session';
const USER_KEY = 'studycopilot_user';

export function saveSession(session: AuthSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  localStorage.setItem(USER_KEY, JSON.stringify(session.user));
  console.log('✅ Session saved to localStorage');
}

export function getSession(): AuthSession | null {
  try {
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (!sessionData) return null;

    const session = JSON.parse(sessionData);

    // Check if session is expired
    if (session.expires_at && Date.now() > session.expires_at * 1000) {
      console.log('⚠️ Session expired');
      clearSession();
      return null;
    }

    return session;
  } catch (error) {
    console.error('Error loading session:', error);
    return null;
  }
}

export function getStoredUser(): AuthUser | null {
  try {
    const userData = localStorage.getItem(USER_KEY);
    if (!userData) return null;
    return JSON.parse(userData);
  } catch (error) {
    console.error('Error loading user:', error);
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(USER_KEY);
  console.log('🔓 Session cleared');
}

// ============================================
// Sign Up
// ============================================

export async function signUp(
  email: string,
  password: string,
  name: string,
  grade: number
): Promise<{ user: AuthUser | null; session: AuthSession | null }> {
  console.log('🔐 Creating new account...');

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, grade, plan: 'free' }
      }
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data.session) {
      // If auto-login happens (email verification disabled)
      const user: AuthUser = {
        id: data.user!.id,
        email: data.user!.email || email,
        name: name,
        grade: grade,
        plan: 'free',
        created_at: data.user!.created_at,
      };
      const session: AuthSession = {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at!,
        user,
      };
      saveSession(session);
      return { user, session };
    }

    // Returns null if requires OTP/Verification
    return { user: null, session: null };
  } catch (error: any) {
    console.error('❌ Signup error:', error);
    
    // Improved error handling for network/fetch issues
    if (error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the server. Please check your internet connection or try again later.');
    }
    
    throw new Error(error.message || 'Failed to create account');
  }
}

export async function verifySignupOtp(
  email: string,
  token: string
): Promise<{ user: AuthUser; session: AuthSession }> {
  console.log('🔐 Verifying OTP...');
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'signup'
    });

    if (error || !data.session || !data.user) {
      throw new Error(error?.message || 'Invalid verification code');
    }

    const user: AuthUser = {
      id: data.user.id,
      email: data.user.email || email,
      name: data.user.user_metadata?.name || 'Student',
      grade: data.user.user_metadata?.grade || 9,
      plan: data.user.user_metadata?.plan || 'free',
    };

    const session: AuthSession = {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at || 0,
      user,
    };

    saveSession(session);
    return { user, session };
  } catch (error: any) {
    throw new Error(error.message || 'Failed to verify OTP');
  }
}

// ============================================
// Sign In
// ============================================

export async function signIn(
  email: string,
  password: string
): Promise<{ user: AuthUser; session: AuthSession }> {
  console.log('🔐 Signing in...');

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      throw new Error(error?.message || 'Invalid credentials');
    }

    // Log user metadata for debugging
    console.log('📋 User metadata:', data.user.user_metadata);
    
    // Create user object
    const user: AuthUser = {
      id: data.user.id,
      email: data.user.email || email,
      name: data.user.user_metadata?.name || email.split('@')[0],
      grade: data.user.user_metadata?.grade || 8,
    };

    // Create session object
    const session: AuthSession = {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at!,
      user,
    };

    // Save session
    saveSession(session);

    console.log('✅ Signed in successfully!');
    return { user, session };
  } catch (error: any) {
    console.error('❌ Login error:', error);
    
    // Improved error handling for network/fetch issues
    if (error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the server. Please check your internet connection or try again later.');
    }
    
    throw new Error(error.message || 'Invalid email or password');
  }
}

// ============================================
// Sign Out
// ============================================

export async function signOut(): Promise<void> {
  console.log('🔓 Signing out...');

  try {
    await supabase.auth.signOut();
    clearSession();
    console.log('✅ Signed out successfully!');
  } catch (error) {
    console.error('⚠️ Logout error:', error);
    // Still clear local session even if API call fails
    clearSession();
  }
}

// ============================================
// Session Validation
// ============================================

export async function validateSession(): Promise<AuthUser | null> {
  const session = getSession();

  if (!session) {
    return null;
  }

  try {
    // Get fresh session from Supabase (this will include latest user metadata)
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
      console.log('⚠️ Session invalid, clearing...');
      clearSession();
      return null;
    }

    // Log user metadata for debugging
    console.log('📋 User metadata during validation:', sessionData.session.user.user_metadata);
    
    const user: AuthUser = {
      id: sessionData.session.user.id,
      email: sessionData.session.user.email!,
      name: sessionData.session.user.user_metadata?.name || sessionData.session.user.email!.split('@')[0],
      grade: sessionData.session.user.user_metadata?.grade || 8,
    };

    // Update stored user data
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return user;
  } catch (error: any) {
    if (error.message !== 'Failed to fetch') {
      console.error('Error validating session:', error);
    } else {
      console.log('⚠️ Could not validate session (network/backend unreachable)');
    }
    clearSession();
    return null;
  }
}

// ============================================
// Refresh Token
// ============================================

export async function refreshSession(): Promise<AuthSession | null> {
  const session = getSession();

  if (!session || !session.refresh_token) {
    return null;
  }

  try {
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: session.refresh_token,
    });

    if (error || !data.session) {
      throw new Error('Failed to refresh token');
    }

    const user: AuthUser = {
      id: data.user!.id,
      email: data.user!.email!,
      name: data.user!.user_metadata?.name || data.user!.email!.split('@')[0],
      grade: data.user!.user_metadata?.grade || 8,
    };

    const newSession: AuthSession = {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at!,
      user,
    };

    saveSession(newSession);

    console.log('✅ Session refreshed');
    return newSession;
  } catch (error) {
    console.error('Error refreshing session:', error);
    clearSession();
    return null;
  }
}

// ============================================
// Auto-refresh session before expiry
// ============================================

export function setupAutoRefresh(onSessionExpired: () => void) {
  let hadSession = false;

  const checkAndRefresh = async () => {
    const session = getSession();

    if (!session) {
      if (hadSession) {
        onSessionExpired();
      }
      return;
    }

    hadSession = true;

    // Refresh if less than 5 minutes remaining
    const timeUntilExpiry = session.expires_at * 1000 - Date.now();
    if (timeUntilExpiry < 5 * 60 * 1000) {
      console.log('🔄 Refreshing session...');
      const newSession = await refreshSession();

      if (!newSession) {
        onSessionExpired();
      }
    }
  };

  // Check every minute
  const intervalId = setInterval(checkAndRefresh, 60 * 1000);

  // Initial check
  checkAndRefresh();

  return () => clearInterval(intervalId);
}

// ============================================
// Get Access Token (for API calls)
// ============================================

export function getAccessToken(): string | null {
  const session = getSession();
  return session?.access_token || null;
}

// ============================================
// Check if user is authenticated
// ============================================

export function isAuthenticated(): boolean {
  const session = getSession();
  return !!session && Date.now() < session.expires_at * 1000;
}

// ============================================
// Password Reset
// ============================================

export async function requestPasswordReset(email: string): Promise<void> {
  console.log('📧 Requesting password reset for:', email);

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}`,
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log('✅ Password reset email sent');
  } catch (error: any) {
    console.error('❌ Password reset error:', error);
    throw new Error(error.message || 'Failed to send password reset email');
  }
}

export async function updatePassword(newPassword: string): Promise<void> {
  console.log('🔐 Updating password...');

  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log('✅ Password updated successfully');
  } catch (error: any) {
    console.error('❌ Password update error:', error);
    throw new Error(error.message || 'Failed to update password');
  }
}

// ============================================
// Account Deletion with 30-day Recovery
// ============================================

const DELETED_ACCOUNTS_KEY = 'studycopilot_deleted_accounts';

interface DeletedAccount {
  userId: string;
  email: string;
  deletedAt: number;
  userData: any; // Store user data for potential recovery
}

export async function deleteAccount(userId: string, email: string, userData: any): Promise<void> {
  console.log('🗑️ Marking account for deletion...');

  try {
    // Get existing deleted accounts
    const deletedAccountsJson = localStorage.getItem(DELETED_ACCOUNTS_KEY);
    const deletedAccounts: DeletedAccount[] = deletedAccountsJson ? JSON.parse(deletedAccountsJson) : [];

    // Add current account to deleted list
    const deletedAccount: DeletedAccount = {
      userId,
      email,
      deletedAt: Date.now(),
      userData,
    };

    deletedAccounts.push(deletedAccount);
    localStorage.setItem(DELETED_ACCOUNTS_KEY, JSON.stringify(deletedAccounts));

    // Sign out the user
    await signOut();

    console.log('✅ Account marked for deletion. Can be recovered within 30 days.');
  } catch (error: any) {
    console.error('❌ Account deletion error:', error);
    throw new Error(error.message || 'Failed to delete account');
  }
}

export function checkDeletedAccount(email: string): { isDeleted: boolean; canRecover: boolean; deletedAt?: number } {
  try {
    const deletedAccountsJson = localStorage.getItem(DELETED_ACCOUNTS_KEY);
    if (!deletedAccountsJson) {
      return { isDeleted: false, canRecover: false };
    }

    const deletedAccounts: DeletedAccount[] = JSON.parse(deletedAccountsJson);
    const deletedAccount = deletedAccounts.find(acc => acc.email === email);

    if (!deletedAccount) {
      return { isDeleted: false, canRecover: false };
    }

    const daysSinceDeletion = (Date.now() - deletedAccount.deletedAt) / (1000 * 60 * 60 * 24);
    const canRecover = daysSinceDeletion <= 30;

    return {
      isDeleted: true,
      canRecover,
      deletedAt: deletedAccount.deletedAt,
    };
  } catch (error) {
    console.error('Error checking deleted account:', error);
    return { isDeleted: false, canRecover: false };
  }
}

export async function recoverAccount(email: string, password: string): Promise<{ user: AuthUser; session: AuthSession; recoveredData: any }> {
  console.log('♻️ Recovering deleted account...');

  try {
    // Get deleted accounts
    const deletedAccountsJson = localStorage.getItem(DELETED_ACCOUNTS_KEY);
    if (!deletedAccountsJson) {
      throw new Error('Account not found in deleted accounts');
    }

    const deletedAccounts: DeletedAccount[] = JSON.parse(deletedAccountsJson);
    const deletedAccountIndex = deletedAccounts.findIndex(acc => acc.email === email);

    if (deletedAccountIndex === -1) {
      throw new Error('Account not found in deleted accounts');
    }

    const deletedAccount = deletedAccounts[deletedAccountIndex];

    // Check if recovery period has expired
    const daysSinceDeletion = (Date.now() - deletedAccount.deletedAt) / (1000 * 60 * 60 * 24);
    if (daysSinceDeletion > 30) {
      throw new Error('Recovery period has expired (30 days). Account cannot be recovered.');
    }

    // Sign in to verify credentials
    const { user, session } = await signIn(email, password);

    // Remove from deleted accounts list
    deletedAccounts.splice(deletedAccountIndex, 1);
    localStorage.setItem(DELETED_ACCOUNTS_KEY, JSON.stringify(deletedAccounts));

    console.log('✅ Account recovered successfully!');

    return {
      user,
      session,
      recoveredData: deletedAccount.userData,
    };
  } catch (error: any) {
    console.error('❌ Account recovery error:', error);
    throw new Error(error.message || 'Failed to recover account');
  }
}

export function cleanupExpiredDeletedAccounts(): void {
  try {
    const deletedAccountsJson = localStorage.getItem(DELETED_ACCOUNTS_KEY);
    if (!deletedAccountsJson) return;

    const deletedAccounts: DeletedAccount[] = JSON.parse(deletedAccountsJson);
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

    // Keep only accounts deleted within last 30 days
    const activeDeletedAccounts = deletedAccounts.filter(acc => acc.deletedAt > thirtyDaysAgo);

    if (activeDeletedAccounts.length !== deletedAccounts.length) {
      localStorage.setItem(DELETED_ACCOUNTS_KEY, JSON.stringify(activeDeletedAccounts));
      console.log(`🧹 Cleaned up ${deletedAccounts.length - activeDeletedAccounts.length} expired deleted accounts`);
    }
  } catch (error) {
    console.error('Error cleaning up deleted accounts:', error);
  }
}

// ============================================
// Social Login (OAuth)
// ============================================

export async function signInWithGoogle(): Promise<void> {
  console.log('🔐 Signing in with Google...');

  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}`,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    // Note: User will be redirected to Google, then back to the app
    console.log('🔄 Redirecting to Google...');
  } catch (error: any) {
    console.error('❌ Google login error:', error);
    throw new Error(error.message || 'Failed to sign in with Google');
  }
}

export async function signInWithGitHub(): Promise<void> {
  console.log('🔐 Signing in with GitHub...');

  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}`,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    // Note: User will be redirected to GitHub, then back to the app
    console.log('🔄 Redirecting to GitHub...');
  } catch (error: any) {
    console.error('❌ GitHub login error:', error);
    throw new Error(error.message || 'Failed to sign in with GitHub');
  }
}

// Handle OAuth callback after redirect
export async function handleOAuthCallback(): Promise<AuthUser | null> {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      return null;
    }

    // Create user object
    const user: AuthUser = {
      id: data.session.user.id,
      email: data.session.user.email!,
      name: data.session.user.user_metadata?.name || 
            data.session.user.user_metadata?.full_name || 
            data.session.user.email!.split('@')[0],
      grade: data.session.user.user_metadata?.grade || 8,
      avatar: data.session.user.user_metadata?.avatar_url,
    };

    // Create session object
    const session: AuthSession = {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at!,
      user,
    };

    // Save session
    saveSession(session);

    console.log('✅ OAuth login successful!');
    return user;
  } catch (error: any) {
    console.error('❌ OAuth callback error:', error);
    return null;
  }
}
