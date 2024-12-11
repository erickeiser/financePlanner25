import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  color: 'blue' | 'green' | 'red' | 'purple';
}

const colorClasses = {
  blue: {
    icon: 'text-blue-500',
    border: 'border-blue-100',
    text: 'text-blue-600'
  },
  green: {
    icon: 'text-green-500',
    border: 'border-green-100',
    text: 'text-green-600'
  },
  red: {
    icon: 'text-red-500',
    border: 'border-red-100',
    text: 'text-red-600'
  },
  purple: {
    icon: 'text-purple-500',
    border: 'border-purple-100',
    text: 'text-purple-600'
  }
};

export default function StatCard({ icon: Icon, title, value, color }: StatCardProps) {
  const classes = colorClasses[color];
  
  return (
    <div className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 border ${classes.border}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${classes.icon}`} />
          <div className="ml-3">
            <p className="text-xs sm:text-sm text-gray-500">{title}</p>
            <p className={`text-lg sm:text-xl font-bold ${classes.text}`}>{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}