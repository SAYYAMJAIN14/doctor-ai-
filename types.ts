
export type UserRole = 'Doctor' | 'Patient';

export interface HealthRisk {
  name: string;
  level: 'Low' | 'Medium' | 'High' | 'Very High';
  explanation: string;
}

export interface Meal {
  name: string;
  description: string;
  calories: number;
  macros: {
    protein: string;
    carbs: string;
    fat: string;
  };
}

export interface Workout {
  name: "Cardio" | "Strength Training" | "Flexibility" | "Rest Day";
  duration: string;
  intensity: "Low" | "Medium" | "High";
  details: string;
}

export interface GeneAIResponse {
  healthScore: number;
  healthSummary: string;
  preventiveTips: string[];
  risks: HealthRisk[];
  mealPlan: {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
  };
  workoutPlan: Workout;
}

export interface WearableData {
    sleep: {
        duration: string;
        quality: number; // percentage
    };
    heartRate: {
        resting: number;
        average: number;
    };
    steps: {
        count: number;
        goal: number;
    };
    oxygenLevel: number; // percentage
}