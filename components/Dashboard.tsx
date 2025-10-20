
import React from 'react';
import { GeneAIResponse, WearableData } from '../types';
import { HealthScore } from './HealthScore';
import { RiskCard } from './RiskCard';
import { WearableDataCard } from './WearableDataCard';
import { MealPlan } from './MealPlan';
import { WorkoutPlan } from './WorkoutPlan';
import { AIAssistant } from './AIAssistant';
import { HeartIcon, StepsIcon, SleepIcon, OxygenIcon } from './Icons';

interface DashboardProps {
  healthData: GeneAIResponse;
  wearableData: WearableData;
}

export const Dashboard: React.FC<DashboardProps> = ({ healthData, wearableData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="lg:col-span-1 space-y-6">
        <HealthScore score={healthData.healthScore} />
        <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold text-text-primary mb-4">Health Risks</h3>
            <div className="space-y-4">
                {healthData.risks.map(risk => (
                    <RiskCard key={risk.name} risk={risk} />
                ))}
            </div>
        </div>
        <AIAssistant summary={healthData.healthSummary} tips={healthData.preventiveTips} />
      </div>

      {/* Right Column */}
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <WearableDataCard 
                title="Heart Rate" 
                value={`${wearableData.heartRate.resting} bpm`} 
                subtitle="Resting" 
                icon={<HeartIcon />}
                color="red"
            />
            <WearableDataCard 
                title="Daily Steps" 
                value={`${wearableData.steps.count.toLocaleString()}`} 
                subtitle={`Goal: ${wearableData.steps.goal.toLocaleString()}`} 
                icon={<StepsIcon />}
                color="blue"
            />
            <WearableDataCard 
                title="Sleep" 
                value={wearableData.sleep.duration} 
                subtitle={`Quality: ${wearableData.sleep.quality}%`} 
                icon={<SleepIcon />}
                color="purple"
            />
            <WearableDataCard 
                title="Oxygen Sat." 
                value={`${wearableData.oxygenLevel}%`} 
                subtitle="SpO2"
                icon={<OxygenIcon />}
                color="teal"
            />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <MealPlan mealPlan={healthData.mealPlan} />
          <WorkoutPlan workoutPlan={healthData.workoutPlan} />
        </div>
      </div>
    </div>
  );
};
