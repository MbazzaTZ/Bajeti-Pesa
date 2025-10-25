// File: utils\localization.js
// Defines currency and language structures for localization.

// Currency definitions for real-time conversion and formatting
export const CURRENCIES = {
  TZS: { symbol: 'TSh', format: '##,##0.00', name: 'Tanzanian Shilling' },
  USD: { symbol: '$', format: '#,##0.00', name: 'US Dollar' },
  KES: { symbol: 'KSh', format: '##,##0.00', name: 'Kenyan Shilling' },
  EUR: { symbol: '', format: '#.##0,00', name: 'Euro' }
};

// Initial language support structure
export const LANGUAGES = {
  en: {
    dashboard: 'Dashboard',
    planner: 'Planner',
    summary: 'Summary',
    profile: 'Profile'
  },
  sw: {
    dashboard: 'Dashibodi',
    planner: 'Mipango',
    summary: 'Muhtasari',
    profile: 'Wasifu'
  }
};

// Default settings
export const DEFAULT_LANGUAGE = 'en';
export const DEFAULT_CURRENCY = 'TZS';
