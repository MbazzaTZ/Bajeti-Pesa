// File: src\loanManager.js
// Handles tracking and calculation for Loan Management features.

/**
 * Calculates the fixed monthly payment for an amortizing loan.
 * Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n  1]
 * @param {number} principal Principal amount (P)
 * @param {number} annualRate Annual interest rate (%)
 * @param {number} termMonths Loan term in months (n)
 * @returns {number} The fixed monthly payment (M)
 */
const calculateMonthlyPayment = (principal, annualRate, termMonths) => {
    if (annualRate === 0) {
        return principal / termMonths;
    }
    const monthlyRate = annualRate / 100 / 12; // i
    const powerTerm = Math.pow(1 + monthlyRate, termMonths); // (1 + i)^n
    
    return principal * (monthlyRate * powerTerm) / (powerTerm - 1);
};


/**
 * Processes new loan details to generate a payment plan and recurring expense template.
 * @param {object} loanDetails Loan details from the "Add New Loan" form.
 * @returns {object} { loanData, recurringExpense }
 */
export const LoanManager = {
    
    processNewLoan(loanDetails) {
        const { loanName, principalAmount, annualInterestRate, termMonths, startDate } = loanDetails;

        const paymentAmount = calculateMonthlyPayment(principalAmount, annualInterestRate, termMonths);
        
        let balance = principalAmount;
        let totalInterestPaid = 0;
        let paymentSchedule = [];

        // --- Generate Amortization Schedule ---
        for (let month = 1; month <= termMonths; month++) {
            const monthlyRate = annualInterestRate / 100 / 12;
            const interestPayment = balance * monthlyRate;
            const principalPayment = paymentAmount - interestPayment;
            
            totalInterestPaid += interestPayment;
            balance -= principalPayment;
            
            // Ensure final payment corrects for floating-point errors
            if (month === termMonths) {
                // Adjust last principal payment to clear final balance
                const finalPrincipalPayment = principalPayment + balance; 
                balance = 0;
                paymentSchedule.push({
                    month: month,
                    date: this._addMonthsToDate(startDate, month),
                    payment: paymentAmount,
                    interest: interestPayment,
                    principal: finalPrincipalPayment,
                    remainingBalance: 0
                });
            } else {
                paymentSchedule.push({
                    month: month,
                    date: this._addMonthsToDate(startDate, month),
                    payment: paymentAmount,
                    interest: interestPayment,
                    principal: principalPayment,
                    remainingBalance: balance
                });
            }
        }
        
        const totalLoanWithInterest = principalAmount + totalInterestPaid;

        // --- Prepare Output Data ---
        const loanData = {
            name: loanName,
            principal: principalAmount,
            rate: annualInterestRate,
            term: termMonths,
            startDate: startDate,
            totalInterest: totalInterestPaid,
            totalAmount: totalLoanWithInterest,
            monthlyPayment: paymentAmount,
            nextPayment: paymentSchedule.length > 0 ? paymentSchedule[0].date : startDate,
            schedule: paymentSchedule
        };

        // --- Create Recurring Expense Template (for the Planner) ---
        const recurringExpense = {
            name: loanName + ' Payment',
            amount: paymentAmount,
            category: 'Debt Repayment', 
            // Note: 'Debt Repayment' should be added to Planner Expense Categories
            firstDue: paymentSchedule.length > 0 ? paymentSchedule[0].date : startDate,
            frequency: 'Monthly',
            isRecurring: true,
            // Link back to the full loan data
            loanId: loanName.toLowerCase().replace(/\s/g, '_') + '_' + Date.now() 
        };

        return { loanData, recurringExpense };
    },

    /**
     * Utility function to add months to a date string (YYYY-MM-DD).
     */
    _addMonthsToDate(dateString, months) {
        const date = new Date(dateString);
        date.setMonth(date.getMonth() + months);
        // Ensure date component is correctly handled (e.g., Feb 30th rolls to Mar 2nd)
        return date.toISOString().split('T')[0];
    }
};
