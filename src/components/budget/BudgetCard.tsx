import React from 'react';

interface BudgetCardProps {
  title: string;
  target: number;
  actual: number;
  description: string;
  color: 'blue' | 'purple' | 'green';
}

const colorClasses = {
  blue: {
    title: 'text-blue-700',
    border: 'border-blue-100',
    text: 'text-blue-600',
    progress: 'bg-blue-600'
  },
  purple: {
    title: 'text-purple-700',
    border: 'border-purple-100',
    text: 'text-purple-600',
    progress: 'bg-purple-600'
  },
  green: {
    title: 'text-green-700',
    border: 'border-green-100',
    text: 'text-green-600',
    progress: 'bg-green-600'
  }
};

export default function BudgetCard({ title, target, actual, description, color }: BudgetCardProps) {
  const classes = colorClasses[color];
  const percentage = Math.min((actual / target) * 100, 100);

  return (
    <div className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 border ${classes.border}`}>
      <h3 className={`text-base sm:text-lg font-semibold ${classes.title} mb-2`}>{title}</h3>
      <div className="space-y-2">
        <div className="flex justify-between text-xs sm:text-sm">
          <span className="text-gray-600">Target:</span>
          <span className={`font-medium ${classes.text}`}>${target.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xs sm:text-sm">
          <span className="text-gray-600">Actual:</span>
          <span className={`font-medium ${classes.text}`}>${actual.toFixed(2)}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`${classes.progress} h-2 rounded-full transition-all`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
}