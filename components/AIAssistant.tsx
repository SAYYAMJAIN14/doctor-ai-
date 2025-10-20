
import React from 'react';
import { SparklesIcon } from './Icons';

interface AIAssistantProps {
  summary: string;
  tips: string[];
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ summary, tips }) => {
  return (
    <div className="bg-brand-dark p-6 rounded-2xl shadow-md text-white">
      <div className="flex items-center space-x-3 mb-4">
        <div className="text-brand-light">
            <SparklesIcon />
        </div>
        <h3 className="text-xl font-bold text-white">AI Health Assistant</h3>
      </div>
      <p className="text-sm text-gray-300 mb-4">{summary}</p>
      <div>
        <h4 className="font-semibold text-brand-light mb-2">Top Preventive Tips:</h4>
        <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
          {tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
