// File: src\appTemplates.js
// Houses all main HTML component templates for dynamic rendering by UIRenderer.

// --- 1. Main Application Shell (with Navigation Placeholder) ---
export const APP_SHELL = \
    <header id="main-header" class="dashboard-card">
        <div class="header-content" style="display: flex; justify-content: space-between; align-items: center;">
            <h2 id="app-title">Ji-bajeti Pro</h2>
            <nav id="main-nav" style="display: flex; gap: 15px; align-items: center;">
                <button class="nav-btn" data-view="dashboard">Dashboard</button>
                <button class="nav-btn" data-view="planner">Planner</button>
                <button class="nav-btn" data-view="summary">Summary</button>
                <button class="nav-btn" data-view="profile">Profile</button>
                <div id="theme-toggle-container" class="theme-switch">
                    </div>
            </nav>
        </div>
    </header>

    <main id="app-main" class="main-content">
        </main>
\;

// --- 2. Dashboard View Template ---
export const DASHBOARD_VIEW = \
    <section class="section-container">
        <h1 id="personalized-welcome">Loading Welcome...</h1> 
    </section>

    <section class="section-container">
        <h2> Financial Health</h2>
        <div class="health-score-widget">
            <p>Score: <span id="financial-health-score" class="score-indicator">--</span></p>
            <p>Status: <span id="financial-health-status">Checking...</span></p>
        </div>
    </section>

    <section class="section-container">
        <h2> Quick Actions</h2>
        <div class="quick-actions-grid">
            <button class="quick-action-card btn-primary" data-action="add-expense"> New Expense</button>
            <button class="quick-action-card" data-action="add-income"> New Income</button>
            <button class="quick-action-card" data-action="check-loans"> Manage Loans</button>
            <button class="quick-action-card" data-action="set-goal"> Set Goal</button>
        </div>
    </section>

    <section class="section-container">
        <h2> Spending Overview</h2>
        <div class="view-toggle">
            <button class="btn-toggle active" data-period="monthly">Monthly</button>
            <button class="btn-toggle" data-period="weekly">Weekly</button>
            <button class="btn-toggle" data-period="yearly">Yearly</button>
        </div>
        <div id="spending-chart" style="height: 300px; background-color: var(--color-surface);">Chart Placeholder</div>
        
        <div id="spending-alerts" style="margin-top: 15px;"></div>
    </section>
\;
