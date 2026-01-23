/**
 * Visitor Tracking Utility
 * Tracks page visits and stores them in the Supabase database
 */

import { projectId, publicAnonKey } from '@/utils/supabase/info';

interface VisitorData {
  ip_address?: string;
  user_agent: string;
  page_url: string;
  referrer: string;
  visit_date: string;
}

/**
 * Track a page visit by storing visitor information in the database
 */
export async function trackPageVisit(): Promise<void> {
  try {
    // Prepare visitor data
    const visitorData: VisitorData = {
      user_agent: navigator.userAgent,
      page_url: window.location.href,
      referrer: document.referrer || 'direct',
      visit_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    };

    console.log('📊 Tracking page visit:', visitorData.page_url);

    // Send visitor data to database via REST API
    const response = await fetch(
      `https://${projectId}.supabase.co/rest/v1/visitors`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': publicAnonKey,
          'Authorization': `Bearer ${publicAnonKey}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(visitorData),
      }
    );

    if (response.ok || response.status === 201) {
      console.log('✅ Page visit tracked successfully');
    } else {
      const errorText = await response.text();
      console.error('❌ Failed to track visit:', response.status, errorText);
      
      // If it's a permissions error, log a helpful message
      if (response.status === 401 || response.status === 403) {
        console.warn('⚠️ Visitor tracking disabled: Database permissions not configured. Please enable INSERT permissions on the visitors table for anonymous users.');
      }
    }
  } catch (error) {
    // Silently fail - don't break the user experience if tracking fails
    console.error('❌ Error tracking page visit:', error);
  }
}

/**
 * Get total visitor count from the database
 */
export async function getTotalVisitors(): Promise<number> {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/rest/v1/visitors?select=count`,
      {
        headers: {
          'apikey': publicAnonKey,
          'Authorization': `Bearer ${publicAnonKey}`,
          'Range': '0-0',
        },
      }
    );

    if (response.ok) {
      const range = response.headers.get('content-range');
      if (range) {
        // Content-Range format: "0-0/total"
        const total = parseInt(range.split('/')[1]);
        return total;
      }
    }
    
    return 0;
  } catch (error) {
    console.error('❌ Error fetching total visitors:', error);
    return 0;
  }
}

/**
 * Get today's visitor count from the database
 */
export async function getTodayVisitors(): Promise<number> {
  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    const response = await fetch(
      `https://${projectId}.supabase.co/rest/v1/visitors?select=count&visit_date=eq.${today}`,
      {
        headers: {
          'apikey': publicAnonKey,
          'Authorization': `Bearer ${publicAnonKey}`,
          'Range': '0-0',
        },
      }
    );

    if (response.ok) {
      const range = response.headers.get('content-range');
      if (range) {
        // Content-Range format: "0-0/total"
        const total = parseInt(range.split('/')[1]);
        return total;
      }
    }
    
    return 0;
  } catch (error) {
    console.error('❌ Error fetching today visitors:', error);
    return 0;
  }
}

/**
 * Get visitor statistics
 */
export async function getVisitorStats(): Promise<{ total: number; today: number }> {
  try {
    const [total, today] = await Promise.all([
      getTotalVisitors(),
      getTodayVisitors(),
    ]);

    return { total, today };
  } catch (error) {
    console.error('❌ Error fetching visitor stats:', error);
    return { total: 0, today: 0 };
  }
}

/**
 * Initialize visitor tracking for the application
 * Call this once when the app loads
 */
export function initVisitorTracking(): void {
  // Track the initial page visit
  trackPageVisit();

  // Track page changes for single-page applications
  // This will track visits when the user navigates within the app
  let lastUrl = window.location.href;
  
  const checkUrlChange = () => {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      trackPageVisit();
    }
  };

  // Check for URL changes periodically
  setInterval(checkUrlChange, 1000);

  // Also track when user navigates back/forward
  window.addEventListener('popstate', () => {
    trackPageVisit();
  });
}
