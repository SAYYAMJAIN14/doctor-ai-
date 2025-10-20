
import React from 'react';

interface HealthScoreProps {
  score: number;
}

export const HealthScore: React.FC<HealthScoreProps> = ({ score }) => {
  const circumference = 2 * Math.PI * 45; // 2 * pi * r
  const offset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const getStrokeColor = () => {
    if (score >= 80) return 'stroke-green-500';
    if (score >= 60) return 'stroke-yellow-500';
    return 'stroke-red-500';
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold text-text-primary mb-4">Overall Health Score</h3>
        <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                    className="stroke-current text-gray-200"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                />
                {/* Progress circle */}
                <circle
                    className={`stroke-current ${getStrokeColor()} transition-all duration-1000 ease-out`}
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform="rotate(-90 50 50)"
                />
            </svg>
            <div className={`absolute inset-0 flex flex-col items-center justify-center ${getScoreColor()}`}>
                <span className="text-4xl font-extrabold">{score}</span>
                <span className="text-sm font-medium">/ 100</span>
            </div>
        </div>
        <p className="text-center text-text-secondary mt-4 text-sm">
            Your score reflects a combination of your lifestyle, genetic factors, and wearable data.
        </p>
    </div>
  );
};
