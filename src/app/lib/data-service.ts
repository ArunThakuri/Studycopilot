// Data persistence service for subjects and units
// Saves user data to Supabase backend

import { projectId, publicAnonKey } from '../utils/supabase/info';
import { getAccessToken } from './auth-service';
import type { Subject } from '../App';

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-eac874f3`;

// ============================================
// Save user data (subjects + units)
// ============================================

export async function saveUserData(subjects: Subject[]): Promise<void> {
  const accessToken = getAccessToken();
  
  if (!accessToken) {
    console.warn('⚠️ No access token, skipping backend save');
    return;
  }

  try {
    console.log('💾 Saving user data to backend...');
    
    const response = await fetch(`${SERVER_URL}/user-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ subjects }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to save user data');
    }

    console.log('✅ User data saved to backend');
  } catch (error: any) {
    console.error('❌ Error saving user data:', error);
    // Don't throw - we still have localStorage as backup
  }
}

// ============================================
// Load user data (subjects + units)
// ============================================

export async function loadUserData(): Promise<Subject[] | null> {
  const accessToken = getAccessToken();
  
  if (!accessToken) {
    console.warn('⚠️ No access token, cannot load from backend');
    return null;
  }

  try {
    console.log('📥 Loading user data from backend...');
    
    const response = await fetch(`${SERVER_URL}/user-data`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.log('ℹ️ No saved data found for user');
        return null;
      }
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to load user data');
    }

    const data = await response.json();
    console.log(`✅ Loaded ${data.subjects?.length || 0} subjects from backend`);
    
    return data.subjects || null;
  } catch (error: any) {
    console.error('❌ Error loading user data:', error);
    return null;
  }
}

// ============================================
// Delete user data
// ============================================

export async function deleteUserData(): Promise<void> {
  const accessToken = getAccessToken();
  
  if (!accessToken) {
    console.warn('⚠️ No access token, cannot delete from backend');
    return;
  }

  try {
    console.log('🗑️ Deleting user data from backend...');
    
    const response = await fetch(`${SERVER_URL}/user-data`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete user data');
    }

    console.log('✅ User data deleted from backend');
  } catch (error: any) {
    console.error('❌ Error deleting user data:', error);
    throw error;
  }
}
