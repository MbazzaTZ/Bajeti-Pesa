// File: utils\financialCalculators.js
// Implements the logic for the New Financial Calculators section.

export const FinancialCalculators = {

    /**
     * 1. Debt Snowball/Avalanche Calculator
     * This is a complex simulation. The structure here demonstrates the strategy setup.
     * @param {Array<{name: string, balance: number, rate: number, payment: number}>} debts
     * @param {number} extraPayment Monthly amount applied to acceleration
     * @param {'snowball'|'avalanche'} strategy 'snowball' (low balance first) or 'avalanche' (high interest first)
     * @returns {object} Payoff timeline, interest saved, and payment schedule.
     */
    calculateDebtPayoff(debts, extraPayment, strategy) {
        let debtList = JSON.parse(JSON.stringify(debts)); // Deep copy to modify
        
        // 1. Sort debts based on strategy
        if (strategy === 'snowball') {
            // Pay off lowest balance first
            debtList.sort((a, b) => a.balance - b.balance);
        } else { // avalanche
            // Pay off highest interest rate first
            debtList.sort((a, b) => b.rate - a.rate);
        }
        
        let totalInterestPaid = 0;
        let months = 0;
        let paymentSchedule = [];
        let currentExtraPayment = extraPayment;

        // Core logic placeholder: This would iterate month-by-month, 
        // applying minimum payments and rolling freed-up payments and extra payments 
        // to the highest priority debt until all balances are zero.

        console.log([Calc] Running complex Debt Payoff simulation for ...);

        return {
            timelineMonths: months,
            interestSaved: 0, // Requires knowing the original term/interest
            schedule: paymentSchedule
        };
    },

    /**
     * 2. Retirement Planner (Compound Interest - Future Value of an Annuity)
     * @param {number} initialBalance
     * @param {number} monthlyContribution
     * @param {number} annualReturnRate (%)
     * @param {number} years
     * @returns {number} Projected future value.
     */
    calculateRetirementProjection(initialBalance, monthlyContribution, annualReturnRate, years) {
        console.log('[Calc] Running Retirement Projection.');
        const monthlyRate = annualReturnRate / 100 / 12;
        const numPeriods = years * 12; // n

        if (monthlyRate === 0) {
            return initialBalance + (monthlyContribution * numPeriods);
        }
        
        const powerTerm = Math.pow(1 + monthlyRate, numPeriods);

        // Future Value of a Lump Sum (Initial Balance)
        const fvLumpSum = initialBalance * powerTerm;

        // Future Value of an Annuity (Monthly Contributions)
        const fvAnnuity = monthlyContribution * ((powerTerm - 1) / monthlyRate);

        return fvLumpSum + fvAnnuity;
    },

    /**
     * 3. Emergency Fund Calculator (Logic already robust)
     * @param {number} totalMonthlyExpenses
     * @param {number} monthsOfCoverage (e.g., 3, 6)
     * @param {number} currentSavings
     * @param {number} monthlySavingsTarget
     * @returns {object} Target amount, shortfall, and estimated timeline.
     */
    calculateEmergencyFund(totalMonthlyExpenses, monthsOfCoverage, currentSavings, monthlySavingsTarget) {
        console.log('[Calc] Running Emergency Fund Calculator.');
        const target = totalMonthlyExpenses * monthsOfCoverage;
        const shortfall = Math.max(0, target - currentSavings);
        const monthsToGoal = monthlySavingsTarget > 0 ? Math.ceil(shortfall / monthlySavingsTarget) : Infinity;

        return {
            targetAmount: target,
            shortfall: shortfall,
            monthsToGoal: monthsToGoal,
            recommendation: \Target: \ months of expenses (\)\
        };
    },

    /**
     * 4. Investment Return Calculator (Simple ROI - Compound Annual Growth Rate)
     * Calculates the **Compounded Annual Growth Rate (CAGR)**, a more useful metric than simple ROI.
     * @param {number} initialInvestment
     * @param {number} finalValue
     * @param {number} years
     * @returns {number} CAGR as a percentage.
     */
    calculateInvestmentReturn(initialInvestment, finalValue, years) {
        console.log('[Calc] Running Investment Return Calculator (CAGR).');
        if (initialInvestment <= 0 || years === 0) return 0;

        // CAGR Formula: ((Final Value / Initial Investment) ^ (1 / Years)) - 1
        const cagr = (Math.pow(finalValue / initialInvestment, 1 / years) - 1) * 100;
        
        return cagr;
    }
};
