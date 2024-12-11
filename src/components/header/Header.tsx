import React from 'react';
import { Wallet, Calculator, LogOut } from 'lucide-react';
import { User } from 'firebase/auth';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  showBudgetRule: boolean;
  onToggleBudgetRule: () => void;
}

export default function Header({ user, onLogout, showBudgetRule, onToggleBudgetRule }: HeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div className="flex items-center">
        <Wallet className="w-8 h-8 mr-2" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Financial Planner</h1>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={onToggleBudgetRule}
          className="flex-1 sm:flex-none flex items-center justify-center px-3 sm:px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm sm:text-base"
        >
          <Calculator className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
          {showBudgetRule ? 'Hide' : 'Show'} 50/30/20
        </button>
        <button
          onClick={onLogout}
          className="flex-1 sm:flex-none flex items-center justify-center px-3 sm:px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors text-sm sm:text-base"
        >
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
}