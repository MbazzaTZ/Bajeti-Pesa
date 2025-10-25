// File: src\userProfileModel.js
// Defines the core data structure for the user profile, based on enhanced specifications.

export const USER_PROFILE_SCHEMA = {
  personal: {
    userName: 'New User',
    email: '',
    onboardingComplete: false
  },
  financial: {
    income: { primary: 0, secondary: 0, passive: 0 },
    expenses: { fixed: 0, variable: 0 },
    debts: [], // Array of debt objects
    assets: [] // Array of asset objects
  },
  preferences: {
    currency: 'TZS',
    dateFormat: 'DD/MM/YYYY',
    financialGoals: {
      shortTerm: [],
      mediumTerm: [],
      longTerm: []
    }
  },
  security: {
    localEncryptionEnabled: false,
    autoLogoutTimeout: 1800000 // 30 minutes in ms
  }
};
