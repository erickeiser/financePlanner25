import React, { useState } from 'react';
import { Wallet, PiggyBank, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Transaction } from './types';
import Modal from './components/Modal';
import TransactionForm from './components/TransactionForm';
import ExpenseChart from './components/ExpenseChart';
import PaycheckCard from './components/PaycheckCard';
import AuthGuard from './components/AuthGuard';
import { useAuth } from './contexts/AuthContext';
import { useTransactions } from './hooks/useTransactions';
import { useTransactionStats } from './hooks/useTransactionStats';
import { Toaster } from 'react-hot-toast';
import Header from './components/header/Header';
import StatCard from './components/stats/StatCard';
import BudgetCard from './components/budget/BudgetCard';
import ActionButtons from './components/actions/ActionButtons';

const expenseCategories = ['Rent', 'Utilities', 'Groceries', 'Transportation', 'Entertainment', 'Shopping', 'Healthcare', 'Savings', 'Other'];
const incomeCategories = ['Salary', 'Freelance', 'Investments', 'Other'];

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const { transactions } = useTransactions();
  const stats = useTransactionStats(transactions);
  
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showBudgetRule, setShowBudgetRule] = useState(false);

  const incomes = transactions
    .filter(t => t.type === 'income')
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <Header 
          user={currentUser}
          onLogout={logout}
          showBudgetRule={showBudgetRule}
          onToggleBudgetRule={() => setShowBudgetRule(!showBudgetRule)}
        />

        {showBudgetRule && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <BudgetCard
              title="Needs (50%)"
              target={stats.needsTarget}
              actual={stats.actualNeeds}
              description="Housing, utilities, groceries, etc."
              color="blue"
            />
            <BudgetCard
              title="Wants (30%)"
              target={stats.wantsTarget}
              actual={stats.actualWants}
              description="Entertainment, dining out, shopping, etc."
              color="purple"
            />
            <BudgetCard
              title="Savings (20%)"
              target={stats.savingsTarget}
              actual={stats.actualSavings}
              description="Savings, investments, debt repayment"
              color="green"
            />
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatCard
            icon={Wallet}
            title="Balance"
            value={`$${stats.balance.toFixed(2)}`}
            color="blue"
          />
          <StatCard
            icon={ArrowUpCircle}
            title="Income"
            value={`$${stats.totalIncome.toFixed(2)}`}
            color="green"
          />
          <StatCard
            icon={ArrowDownCircle}
            title="Expenses"
            value={`$${stats.totalExpenses.toFixed(2)}`}
            color="red"
          />
          <StatCard
            icon={PiggyBank}
            title="Actual Savings"
            value={`$${stats.actualSavings.toFixed(2)}`}
            color="purple"
          />
        </div>

        <ActionButtons
          onAddIncome={() => setShowIncomeModal(true)}
          onAddExpense={() => setShowExpenseModal(true)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-2 space-y-4">
            {incomes.map(income => (
              <PaycheckCard
                key={income.id}
                income={income}
                linkedExpenses={transactions.filter(t => 
                  t.type === 'expense' && t.linkedIncomeId === income.id
                )}
              />
            ))}
          </div>
          <div className="lg:col-span-1">
            <ExpenseChart transactions={transactions} />
          </div>
        </div>
      </div>

      <Modal
        isOpen={showIncomeModal}
        onClose={() => setShowIncomeModal(false)}
        title="Add Income"
        type="income"
      >
        <TransactionForm
          type="income"
          categories={incomeCategories}
          onSuccess={() => setShowIncomeModal(false)}
          incomes={[]}
        />
      </Modal>

      <Modal
        isOpen={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
        title="Add Expense"
        type="expense"
      >
        <TransactionForm
          type="expense"
          categories={expenseCategories}
          onSuccess={() => setShowExpenseModal(false)}
          incomes={incomes}
        />
      </Modal>
    </div>
  );
}

export default function App() {
  return (
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  );
}