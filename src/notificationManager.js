// File: src/notificationManager.js
// Handles the application's notification system (in-app and browser).

import { BUDGET_ALERT_THRESHOLDS } from './config.js';

export const NotificationManager = {
    
    /**
     * Sends a notification to the user (in-app banner and optionally browser).
     * @param {string} title - Notification title
     * @param {string} body - Notification message
     * @param {string} type - 'budget' | 'bill' | 'milestone' | 'tip'
     */
    sendNotification(title, body, type = 'info') {
        console.log(`[Notification] ${type.toUpperCase()} | ${title}: ${body}`);
        
        // 1. In-App Notification Logic (placeholder for UI integration)
        // Future: integrate with UIRenderer to display banners or toast messages.

        // 2. Browser Notification Logic
        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                new Notification(title, {
                    body,
                    icon: 'public/icons/icon-72x72.png',
                    tag: `${type}-${Date.now()}`
                });
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        this.sendNotification(title, body, type);
                    }
                });
            }
        }
    },

    /**
     * Checks all budgets against spending and triggers alerts.
     * @param {object} budgets - e.g., { Food: 100000, Housing: 300000 }
     * @param {object} currentSpending - e.g., { Food: 85000, Housing: 310000 }
     */
    checkBudgetAlerts(budgets = {}, currentSpending = {}) {
        console.log('[Notification] Checking budget alerts...');

        for (const category in budgets) {
            const budgetAmount = budgets[category];
            const spentAmount = currentSpending[category] || 0;
            if (budgetAmount <= 0) continue;

            const percentageUsed = (spentAmount / budgetAmount) * 100;

            // Check thresholds
            for (const threshold of BUDGET_ALERT_THRESHOLDS) {
                if (percentageUsed >= threshold.percentage && percentageUsed < threshold.percentage + 10) {
                    const message = `You have used ${percentageUsed.toFixed(1)}% of your ${category} budget. (${threshold.message})`;
                    this.sendNotification('Budget Alert!', message, 'budget');
                    break;
                }
            }
        }
    },
    
    /**
     * Checks for and sends reminders for upcoming bills.
     * @param {Array<object>} recurringExpenses - List of recurring expenses.
     * Expected structure: [{ name, nextDueDate, isRecurring }]
     */
    checkBillReminders(recurringExpenses = []) {
        console.log('[Notification] Checking bill reminders...');
        const today = new Date();
        const sevenDaysAhead = new Date();
        sevenDaysAhead.setDate(today.getDate() + 7);

        recurringExpenses.forEach(expense => {
            if (!expense.nextDueDate) return;
            const dueDate = new Date(expense.nextDueDate);

            if (dueDate >= today && dueDate <= sevenDaysAhead) {
                const message = `The payment for "${expense.name}" is due on ${expense.nextDueDate}.`;
                this.sendNotification('Bill Reminder', message, 'bill');
            }
        });
    }
};
