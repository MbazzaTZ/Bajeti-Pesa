// File: utils\deployment.js
// Handles application versioning and environment configuration for PWA updates.

export const DEPLOYMENT_CONFIG = {
    // Application version (matches service-worker.js CACHE_NAME initial version)
    VERSION: 'v1.0.0-pwa-final',
    
    // Environment check
    IS_PRODUCTION: window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1',
    
    // API endpoint placeholder (for future cloud sync)
    API_BASE_URL: 'https://api.jibajetipro.com/v1',
    
    // Update mechanism check (called by service-worker update logic)
    isNewVersionAvailable: function(newVersion) {
        if (newVersion > this.VERSION) {
            console.log(\[Deployment] New version \ detected. Ready to update.\);
            return true;
        }
        return false;
    }
};

// Log the current version on startup for debugging
console.log(\\ Ji-bajeti Pro running version: \\);
