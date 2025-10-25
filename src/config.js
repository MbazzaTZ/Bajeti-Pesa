// File: src\config.js
// Centralized configuration for application constants, categories, and thresholds.

// --- Planner Upgrades: Expense Categories ---
export const EXPENSE_CATEGORIES = [
    { name: 'Housing', icon: '', color: '#2563eb' },
    { name: 'Food', icon: '', color: '#f59e0b' },
    { name: 'Transportation', icon: '', color: '#ef4444' },
    { name: 'Healthcare', icon: '', color: '#10b981' },
    { name: 'Education', icon: '', color: '#06b6d4' },
    { name: 'Shopping', icon: '', color: '#a855f7' }, // Custom color for uniqueness
    { name: 'Savings', icon: '', color: '#16a34a' },
    { name: 'Entertainment', icon: '', color: '#ec4899' },
    { name: 'Debt Repayment', icon: '', color: '#374151' }, // Used by loanManager
    { name: 'Miscellaneous', icon: '', color: '#9ca3af' }
];

// --- Dashboard Enhancements: Financial Health Score Tiers ---
export const HEALTH_SCORE_THRESHOLDS = [
    { name: 'Excellent', minScore: 90, colorVar: 'var(--color-primary)' },
    { name: 'Good', minScore: 70, colorVar: 'var(--color-success)' },
    { name: 'Fair', minScore: 50, colorVar: 'var(--color-warning)' },
    { name: 'Poor', minScore: 0, colorVar: 'var(--color-danger)' }
];

// --- Notification System: Budget Alert Tiers ---
export const BUDGET_ALERT_THRESHOLDS = [
    { level: 'Warning', percentage: 80, message: 'Approaching limit' },
    { level: 'Critical', percentage: 90, message: 'Near budget limit' },
    { level: 'Breach', percentage: 100, message: 'Budget limit reached' }
];

// --- Dashboard Enhancements: Time-Based Greetings ---
export const GREETINGS = {
    MORNING_END: 12, // 12:00 PM
    AFTERNOON_END: 17 // 5:00 PM
};

export const DEFAULT_CURRENCY = 'TZS';
