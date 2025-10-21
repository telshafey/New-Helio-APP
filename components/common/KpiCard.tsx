import React, { memo } from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  change?: string;
  changeLabel?: string;
  icon: React.ReactNode;
  changeType?: 'positive' | 'negative' | 'neutral';
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, changeLabel, icon, changeType = 'positive' }) => {
  const cardClasses = "bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:scale-[1.02] h-full cursor-pointer";

  const changeColor = {
    positive: 'text-green-500',
    negative: 'text-red-500',
    neutral: 'text-gray-500 dark:text-gray-400'
  }[changeType];

  return (
    <div className={cardClasses}>
      <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
        <p className="font-medium text-sm">{title}</p>
        {icon}
      </div>
      <div className="mt-2 text-right">
        <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        {change && changeLabel && (
            <div className="flex items-baseline space-x-1 rtl:space-x-reverse text-xs mt-1">
                <span className={`font-semibold ${changeColor}`}>
                    {change}
                </span>
                <span className="text-gray-500 dark:text-gray-400">{changeLabel}</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default memo(KpiCard);
