
import React from 'react';

interface WearableDataCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: 'red' | 'blue' | 'purple' | 'teal';
}

const colorClasses = {
    red: { bg: 'bg-red-100', text: 'text-red-600' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    teal: { bg: 'bg-teal-100', text: 'text-teal-600' }
};

export const WearableDataCard: React.FC<WearableDataCardProps> = ({ title, value, subtitle, icon, color }) => {
  const classes = colorClasses[color];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-text-primary text-sm">{title}</h4>
        <div className={`${classes.bg} ${classes.text} p-2 rounded-full`}>
            {icon}
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-text-primary mt-2">{value}</p>
        <p className="text-xs text-text-secondary">{subtitle}</p>
      </div>
    </div>
  );
};
