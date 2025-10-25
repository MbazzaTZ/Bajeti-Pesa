// File: src\notificationManager.js
// Handles the application's notification system (in-app and browser).

import { BUDGET_ALERT_THRESHOLDS } from './config.js';

export const NotificationManager = {
    
    /**
     * Sends a notification to the user (in-app banner and optionally browser).
     * @param {string} title
     * @param {string} body
     * @param {string} type 'budget' | 'bill' | 'milestone' | 'tip'
     */
    sendNotification(title, body, type = 'info') {
        console.log(\[Notification] \: \ - \\);
        
        // 1. In-App Notification Logic (Placeholder for DOM manipulation)
        // UIRenderer would handle displaying a temporary banner/modal.

        // 2. Browser Notification Logic
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body: body,
                icon: 'public/icons/icon-72x72.png',
                tag: type + Date.now()
            });
        } else if ('Notification' in window && Notification.permission !== 'denied') {
            // Request permission if not already granted
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    this.sendNotification(title, body, type); // Resend after permission
                }
            });
        }
    },

    /**
     * Checks all budgets against spending and triggers alerts.
     * @param {object} budgets { category: amount }
     * @param {object} currentSpending { category: amount }
     */
    checkBudgetAlerts(budgets, currentSpending) {
        console.log('[Notification] Checking budget limits...');
        
        for (const category in budgets) {
            const budgetAmount = budgets[category];
            const spentAmount = currentSpending[category] || 0;
            const percentageUsed = (spentAmount / budgetAmount) * 100;
            
            // Check against alert thresholds (80%, 90%, 100%)
            for (const threshold of BUDGET_ALERT_THRESHOLDS) {
                if (percentageUsed >= threshold.percentage && percentageUsed < threshold.percentage + 10) { 
                    this.sendNotification(
                        \\ Budget Alert!\,
                        \You have used \% of your \ budget.\,
                        'budget'
                    );
                }
            }
        }
    },
    
    /**
     * Checks for and sends reminders for upcoming bills.
     * @param {Array<object>} recurringExpenses - The list of recurring expenses/bills.
     */
    checkBillReminders(recurringExpenses) {
        console.log('[Notification] Checking bill reminders...');
        const today = new Date();
        // Placeholder logic: check if any bill is due in the next 7 days
        // This requires date comparison logic (not implemented here)
        
        recurringExpenses.forEach(expense => {
            // Simplified check for demonstration
            if (expense.isDueSoon) { 
                 this.sendNotification(
                    'Bill Reminder',
                    \The payment for '\' (\) is due soon.\,
                    'bill'
                );
            }
        });
    }
};
