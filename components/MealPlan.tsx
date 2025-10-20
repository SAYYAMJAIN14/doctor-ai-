
import React from 'react';
import { GeneAIResponse } from '../types';
import { MealIcon } from './Icons';

interface MealPlanProps {
  mealPlan: GeneAIResponse['mealPlan'];
}

const MealItem: React.FC<{ mealName: string, meal: GeneAIResponse['mealPlan']['breakfast'] }> = ({ mealName, meal }) => (
    <div>
        <h5 className="font-bold text-md text-text-primary">{mealName}</h5>
        <p className="text-sm font-semibold text-brand-primary">{meal.name}</p>
        <p className="text-xs text-text-secondary mt-1">{meal.description}</p>
        <div className="text-xs text-text-secondary mt-2 flex justify-between items-center bg-gray-50 p-2 rounded-md">
            <span>🔥 {meal.calories} kcal</span>
            <span>P: {meal.macros.protein}</span>
            <span>C: {meal.macros.carbs}</span>
            <span>F: {meal.macros.fat}</span>
        </div>
    </div>
);


export const MealPlan: React.FC<MealPlanProps> = ({ mealPlan }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-brand-light text-brand-primary p-2 rounded-full">
            <MealIcon />
        </div>
        <h3 className="text-xl font-bold text-text-primary">Today's Nutrition Plan</h3>
      </div>
      <div className="space-y-4">
        <MealItem mealName="Breakfast" meal={mealPlan.breakfast} />
        <MealItem mealName="Lunch" meal={mealPlan.lunch} />
        <MealItem mealName="Dinner" meal={mealPlan.dinner} />
      </div>
    </div>
  );
};
