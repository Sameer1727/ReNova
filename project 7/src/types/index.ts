export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  onboardingCompleted: boolean;
  profile?: UserProfile;
}

export interface UserProfile {
  age: number;
  height: number; // in centimeters
  weight: number; // in kilograms
  physicalMedicalIssues: string[];
  mentalHealthChallenges: string[];
  allergies: string[];
  physicalLimitations: string[];
  dietaryRestrictions: string[];
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  preferredExerciseTypes: string[];
}

export interface MoodEntry {
  id: string;
  date: string;
  mood: number; // 1-10 scale
  energy: number; // 1-10 scale
  anxiety: number; // 1-10 scale
  notes?: string;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  duration: string;
  difficulty: string;
  exercises: Exercise[];
}

export interface Exercise {
  name: string;
  duration: string;
  description: string;
  adaptations?: string[];
}

export interface NutritionPlan {
  id: string;
  title: string;
  meals: Meal[];
  totalCalories: number;
}

export interface Meal {
  name: string;
  time: string;
  calories: number;
  description: string;
}