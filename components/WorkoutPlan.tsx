
import React from 'react';
import { Workout } from '../types';
import { WorkoutIcon } from './Icons';

interface WorkoutPlanProps {
  workoutPlan: Workout;
}

export const WorkoutPlan: React.FC<WorkoutPlanProps> = ({ workoutPlan }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex items-center space-x-3 mb-4">
         <div className="bg-brand-light text-brand-primary p-2 rounded-full">
            <WorkoutIcon />
        </div>
        <h3 className="text-xl font-bold text-text-primary">Today's Workout</h3>
      </div>
      <div className="space-y-3">
        <h4 className="text-lg font-bold text-brand-primary">{workoutPlan.name}</h4>
        <div className="flex items-center space-x-6 text-sm text-text-secondary">
          <span>
            <strong>Duration:</strong> {workoutPlan.duration}
          </span>
          <span>
            <strong>Intensity:</strong> {workoutPlan.intensity}
          </span>
        </div>
        <p className="text-sm text-text-secondary pt-2">{workoutPlan.details}</p>
      </div>
    </div>
  );
};
