import React from 'react';
import { Plus } from 'lucide-react';

interface ActionButtonsProps {
  onAddIncome: () => void;
  onAddExpense: () => void;
}

export default function ActionButtons({ onAddIncome, onAddExpense }: ActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 px-4">
      <button
        onClick={onAddIncome}
        className="flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl gap-2 font-medium text-base sm:text-lg w-full sm:w-auto"
      >
        <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
        Add Income
      </button>
      <button
        onClick={onAddExpense}
        className="flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl gap-2 font-medium text-base sm:text-lg w-full sm:w-auto"
      >
        <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
        Add Expense
      </button>
    </div>
  );
}