// File: src\transactionsModel.js
// Defines the core data structure for financial transactions.

export const TRANSACTION_SCHEMA = {
  id: '', // unique_id, typically generated on creation
  type: 'expense', // 'income' | 'expense' | 'transfer'
  amount: 0,
  category: 'Uncategorized', // category_name from the Planner section
  date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
  description: '',
  recurring: false,
  recurrenceId: null, // ID linking it to a recurring expense template
  tags: [],
  notes: ''
};
