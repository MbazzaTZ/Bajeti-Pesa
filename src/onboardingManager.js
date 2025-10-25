// File: src\onboardingManager.js
// Manages the User Onboarding process, including the Financial Wellness Quiz.

import { USER_PROFILE_SCHEMA } from './userProfileModel.js';
import { STORAGE_MANAGER } from '../utils/storageManager.js';

const QUIZ_QUESTIONS = [
    { id: 1, text: "How confident are you in managing your monthly budget?", options: ['Not confident', 'Somewhat confident', 'Very confident'], key: 'confidenceLevel' },
    { id: 2, text: "What is your primary financial goal right now?", options: ['Pay off debt', 'Save for a large purchase', 'Build emergency fund', 'Start investing'], key: 'primaryGoal' },
    { id: 3, text: "Do you track every expense you make?", options: ['Never', 'Sometimes', 'Always'], key: 'trackingHabit' }
    // More questions would be added to cover all profile preferences
];

export const OnboardingManager = {

    /**
     * Starts the onboarding flow if the user is new.
     * @param {object} userProfile - The current profile object.
     * @returns {boolean} True if onboarding is required.
     */
    start(userProfile) {
        if (!userProfile.personal.onboardingComplete) {
            console.log('[Onboarding] Starting Financial Wellness Quiz and Tutorial...');
            this.launchQuiz();
            this.launchTutorial();
            return true;
        }
        return false;
    },

    /**
     * Launches the Financial Wellness Quiz UI.
     */
    launchQuiz() {
        console.log('[Onboarding] Displaying Financial Wellness Quiz...');
        // Placeholder for UI rendering logic (e.g., UIRenderer.renderQuiz(QUIZ_QUESTIONS))
        
        // Example: After completion, call completeOnboarding
        // this.completeOnboarding(quizResults);
    },

    /**
     * Launches the Interactive Tutorial guide.
     */
    launchTutorial() {
        console.log('[Onboarding] Displaying Interactive Tutorial...');
        // Logic for step-by-step guidance on app features
    },

    /**
     * Finalizes onboarding, saves initial preferences, and updates profile status.
     * @param {object} quizResults - Data gathered from the quiz and initial preferences.
     */
    completeOnboarding(quizResults) {
        let profile = STORAGE_MANAGER.load('userProfile') || USER_PROFILE_SCHEMA;
        
        // Apply quiz results/initial settings to the profile
        profile.personal.onboardingComplete = true;
        
        // Update financial goals based on quiz (Example: primaryGoal)
        // profile.preferences.financialGoals.shortTerm.push(quizResults.primaryGoal);
        
        STORAGE_MANAGER.save('userProfile', profile);
        console.log('[Onboarding] Financial Wellness Quiz and onboarding complete. Profile saved.');
    }
};
