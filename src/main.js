// File: src/main.js
// Core application bootstrap and initialization logic for Ji-bajeti Pro.

import { UIRenderer } from './uiRenderer.js';
import { OnboardingManager } from './onboardingManager.js';
import { NotificationManager } from './notificationManager.js';
import { APP_SHELL, DASHBOARD_VIEW } from './appTemplates.js';
import { DEPLOYMENT_CONFIG } from '../utils/deployment.js';
import { STORAGE_MANAGER } from '../utils/storageManager.js';
import { USER_PROFILE_SCHEMA } from './userProfileModel.js';

window.addEventListener('DOMContentLoaded', async () => {
    console.log('[Main] Initializing Ji-bajeti Pro...');

    // --- 1. Load the main app shell into DOM ---
    document.body.innerHTML = APP_SHELL + DASHBOARD_VIEW;

    // --- 2. Initialize UI theme & accessibility ---
    UIRenderer.setupAccessibilityToggles();
    UIRenderer.setupMicroAnimations();

    // --- 3. Load or initialize user profile ---
    let userProfile = STORAGE_MANAGER.load('userProfile');
    if (!userProfile) {
        console.log('[Main] Creating new user profile schema.');
        userProfile = USER_PROFILE_SCHEMA;
        STORAGE_MANAGER.save('userProfile', userProfile);
    }

    // --- 4. Start onboarding for new users ---
    OnboardingManager.start(userProfile);

    // --- 5. Render personalized welcome message ---
    UIRenderer.renderWelcome(userProfile.personal.userName);

    // --- 6. Initialize Notification checks (if needed later) ---
    // NotificationManager.checkBudgetAlerts(budgets, spending);
    // NotificationManager.checkBillReminders(expenses);

    // --- 7. Register the Service Worker for PWA support ---
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('../services/service-worker.js');
            console.log('[Main] Service Worker registered successfully:', registration.scope);
        } catch (error) {
            console.error('[Main] Service Worker registration failed:', error);
        }
    }

    // --- 8. Log Deployment Info ---
    console.log(`[Main] Ji-bajeti Pro running version: ${DEPLOYMENT_CONFIG.VERSION}`);
    console.log('[Main] Environment:', DEPLOYMENT_CONFIG.IS_PRODUCTION ? 'Production' : 'Development');
});
