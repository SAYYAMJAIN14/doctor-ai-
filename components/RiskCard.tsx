
import React, { useState } from 'react';
import { HealthRisk } from '../types';

interface RiskCardProps {
  risk: HealthRisk;
}

export const RiskCard: React.FC<RiskCardProps> = ({ risk }) => {
  const [expanded, setExpanded] = useState(false);

  const getLevelColor = () => {
    switch (risk.level) {
      case 'Low':
        return 'bg-green-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'High':
      case 'Very High':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="border border-gray-200 p-4 rounded-lg bg-gray-50 transition-all duration-300">
        <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpanded(!expanded)}>
            <div className="flex items-center space-x-3">
                <span className={`w-3 h-3 rounded-full ${getLevelColor()}`}></span>
                <span className="font-semibold text-text-primary">{risk.name}</span>
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-text-secondary">{risk.level}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 text-gray-400 transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
        {expanded && (
            <p className="mt-3 text-sm text-text-secondary pl-6 pr-2">
                {risk.explanation}
            </p>
        )}
    </div>
  );
};
