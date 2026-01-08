// API Configuration
export const API_CONFIG = {
  BASE_URL: 'localhost:3000',
  SITE_URL: window.location.origin,
} as const;

// Helper function to build API URLs
export const buildApiUrl = (path: string): string => {
  return `${API_CONFIG.BASE_URL}${path}`;
};

// Helper function to build site URLs
export const buildSiteUrl = (path: string): string => {
  return `${API_CONFIG.SITE_URL}${path}`;
};
