// File: src\uiRenderer.js
// Handles all DOM manipulation, view rendering, and interactive elements.

import { GREETINGS } from './config.js';

const THEME_STORAGE_KEY = 'JBP_theme';

export const UIRenderer = {
    
    // --- Theme Management ---
    
    /**
     * Loads the saved theme preference or defaults to the system preference.
     */
    loadThemePreference() {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
            document.body.classList.add('dark-theme');
            return 'dark';
        }
        return 'light';
    },

    /**
     * Toggles the theme between light and dark.
     */
    toggleTheme(isDark) {
        if (isDark) {
            document.body.classList.add('dark-theme');
            localStorage.setItem(THEME_STORAGE_KEY, 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem(THEME_STORAGE_KEY, 'light');
        }
        console.log(\[UI] Theme set to: \\);
    },
    
    // --- Dashboard Enhancements ---
    
    /**
     * Renders the Personalized Welcome message.
     * @param {string} userName
     */
    renderWelcome(userName) {
        const hour = new Date().getHours();
        let timeOfDay;

        if (hour < GREETINGS.MORNING_END) {
            timeOfDay = 'Morning';
        } else if (hour < GREETINGS.AFTERNOON_END) {
            timeOfDay = 'Afternoon';
        } else {
            timeOfDay = 'Evening';
        }

        const greeting = \Good \, \!\;
        
        const welcomeEl = document.getElementById('personalized-welcome');
        if (welcomeEl) {
            welcomeEl.textContent = greeting;
        }
        console.log(\[UI] Rendered welcome message: \\);
    },
    
    /**
     * Renders the Smart Financial Health Score with color-coding.
     * @param {number} score 
     * @param {string} status 'Poor' | 'Fair' | 'Good' | 'Excellent'
     */
    renderFinancialScore(score, status) {
        const scoreEl = document.getElementById('financial-health-score');
        const statusEl = document.getElementById('financial-health-status');
        if (scoreEl && statusEl) {
            scoreEl.textContent = score;
            statusEl.textContent = status;
            scoreEl.className = \score-indicator score-\\;
            console.log(\[UI] Rendered health score: \ (\)\);
        }
    },

    // --- Interactive Elements & UX ---
    
    setupMicroAnimations() {
        console.log('[UI] Micro-animations are active via CSS.');
    },

    showLoadingState(targetElementId) {
        const targetEl = document.getElementById(targetElementId);
        if (targetEl) {
            targetEl.innerHTML = '<div class="skeleton-screen">Loading content...</div>';
            targetEl.classList.add('is-loading');
        }
    },
    
    hideLoadingState(targetElementId, contentHTML) {
        const targetEl = document.getElementById(targetElementId);
        if (targetEl) {
            targetEl.classList.remove('is-loading');
            targetEl.innerHTML = contentHTML;
        }
    },

    // --- Accessibility & Theme Features ---

    setupAccessibilityToggles() {
        // 1. Load initial theme preference
        const initialTheme = this.loadThemePreference();
        
        // 2. Set up the Theme Toggle Switch
        const toggleContainer = document.getElementById('theme-toggle-container');
        if (toggleContainer) {
            toggleContainer.innerHTML = \
                <i class="fas fa-sun" style="color: \;"></i>
                <label class="theme-toggle-slider">
                    <input type="checkbox" id="theme-toggle-checkbox" \>
                    <span class="slider"></span>
                </label>
                <i class="fas fa-moon" style="color: \;"></i>
            \;
            
            const checkbox = document.getElementById('theme-toggle-checkbox');
            if (checkbox) {
                checkbox.addEventListener('change', (e) => {
                    this.toggleTheme(e.target.checked);
                });
            }
        }

        // 3. Setup High Contrast Mode Toggle (Placeholder)
        const contrastButton = document.getElementById('high-contrast-toggle');
        if (contrastButton) {
            contrastButton.addEventListener('click', () => {
                document.body.classList.toggle('high-contrast');
                console.log('[UI] Toggled High Contrast Mode.');
            });
        }
        console.log('[UI] Accessibility and Theme features initialized.');
    }
};
