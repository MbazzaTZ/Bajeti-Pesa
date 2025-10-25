// File: src\analytics.js
// Handles calculation of core financial metrics and spending insights.

import { FinancialCalculators } from '../utils/financialCalculators.js'; // For calculating ratios

export const FinancialAnalytics = {

    /**
     * Calculates Net Worth (Assets - Debts).
     * @param {object} financialData - The user.financial object from USER_PROFILE_SCHEMA.
     * @returns {number} The user's current Net Worth.
     */
    calculateNetWorth(financialData) {
        const totalAssets = financialData.assets.reduce((sum, asset) => sum + asset.value, 0);
        const totalDebts = financialData.debts.reduce((sum, debt) => sum + debt.amount, 0);
        return totalAssets - totalDebts;
    },

    /**
     * Calculates the Debt-to-Income Ratio.
     * @param {object} financialData - The user.financial object.
     * @returns {number} Ratio as a percentage (Total Debts / Total Income) * 100.
     */
    calculateDebtToIncomeRatio(financialData) {
        const totalDebts = financialData.debts.reduce((sum, debt) => sum + debt.amount, 0);
        const totalIncome = financialData.income.primary + financialData.income.secondary + financialData.income.passive;
        
        if (totalIncome === 0) return 0; // Avoid division by zero
        
        // DTI is typically calculated using *monthly* debt payments vs *monthly* income, 
        // but here we use total amounts as a preliminary metric.
        // For a more accurate DTI, loan payment logic would be needed.
        return (totalDebts / (totalIncome * 12)) * 100; 
    },

    /**
     * Calculates the Savings Rate.
     * @param {object} financialData - The user.financial object.
     * @param {number} totalSavings - Total amount saved in the period.
     * @returns {number} Savings Rate as a percentage.
     */
    calculateSavingsRate(financialData, totalSavings) {
        const totalIncome = financialData.income.primary + financialData.income.secondary + financialData.income.passive;
        
        if (totalIncome === 0) return 0;
        
        // Formula: (Total Savings / Total Income) * 100
        return (totalSavings / totalIncome) * 100;
    },

    /**
     * Calculates the Financial Freedom Number (e.g., 25x Annual Expenses).
     * @param {number} annualExpenses
     * @param {number} multiplier The desired safety multiplier (e.g., 25)
     * @returns {number} The target investment amount for financial independence.
     */
    calculateFinancialFreedomNumber(annualExpenses, multiplier = 25) {
        return annualExpenses * multiplier;
    },
    
    // Placeholder for other Spending Insights
    getCategoryTrends(transactions) {
        console.log('[Analytics] Generating Category Trends...');
        // Logic to aggregate spending by category and compare month-over-month.
        return {};
    }
};

// Ensure the new file is created
if ('serviceWorker' in navigator) {
    // This is just a placeholder to ensure the file is created on the filesystem
}
