import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, User, Heart, Target, Stethoscope, Brain, AlertTriangle, Pill } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { UserProfile } from '../types';

interface OnboardingData {
  // Step 1: Personal Information
  fullName: string;
  country: string;
  age: number;
  height: number;
  heightUnit: 'cm' | 'ft';
  heightFeet?: number;
  heightInches?: number;
  weight: number;
  weightUnit: 'kg' | 'lbs';
  
  // Step 2: Physical Health
  hasPhysicalIssues: boolean | null;
  physicalIssues: string[];
  physicalIssuesOther: string;
  
  // Step 3: Fitness Goals
  fitnessGoals: string[];
  
  // Step 4: Medical Conditions
  hasMedicalConditions: boolean | null;
  medicalConditions: string[];
  medicalConditionsOther: string;
  
  // Step 5: Mental Health
  hasMentalHealth: boolean | null;
  mentalHealthConditions: string[];
  mentalHealthOther: string;
  mentalHealthUnsure: boolean;
  
  // Step 6: Allergies
  hasAllergies: boolean | null;
  allergies: string[];
  allergiesOther: string;
  
  // Step 7: Supplements & Medications
  takesSupplements: boolean | null;
  supplements: string[];
  supplementsOther: string;
}

export function Onboarding() {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    fullName: user?.name || '',
    country: '',
    age: 0,
    height: 0,
    heightUnit: 'cm',
    weight: 0,
    weightUnit: 'kg',
    hasPhysicalIssues: null,
    physicalIssues: [],
    physicalIssuesOther: '',
    fitnessGoals: [],
    hasMedicalConditions: null,
    medicalConditions: [],
    medicalConditionsOther: '',
    hasMentalHealth: null,
    mentalHealthConditions: [],
    mentalHealthOther: '',
    mentalHealthUnsure: false,
    hasAllergies: null,
    allergies: [],
    allergiesOther: '',
    takesSupplements: null,
    supplements: [],
    supplementsOther: ''
  });

  const totalSteps = 7;

  const physicalIssuesOptions = [
    { id: 'mobility', label: 'Mobility Limitation', icon: '🦽' },
    { id: 'chronic-pain', label: 'Chronic Pain', icon: '⚡' },
    { id: 'spinal', label: 'Spinal Issues', icon: '🦴' },
    { id: 'vision', label: 'Vision Impairment', icon: '👁️' },
    { id: 'hearing', label: 'Hearing Impairment', icon: '👂' },
    { id: 'arthritis', label: 'Arthritis', icon: '🦴' },
    { id: 'other', label: 'Other', icon: '📝' }
  ];

  const fitnessGoalsOptions = [
    { id: 'strength', label: 'Build Strength', icon: '💪' },
    { id: 'flexibility', label: 'Improve Flexibility', icon: '🤸' },
    { id: 'weight', label: 'Manage Weight', icon: '⚖️' },
    { id: 'mental', label: 'Mental Wellness', icon: '🧠' },
    { id: 'recovery', label: 'Recovery/Rehab', icon: '🏥' },
    { id: 'mobility', label: 'Maintain Mobility', icon: '🚶' },
    { id: 'general', label: 'General Health', icon: '❤️' }
  ];

  const medicalConditionsOptions = [
    { id: 'diabetes', label: 'Diabetes', icon: '🩸' },
    { id: 'heart', label: 'Heart Condition', icon: '❤️' },
    { id: 'asthma', label: 'Asthma', icon: '🫁' },
    { id: 'hypertension', label: 'Hypertension', icon: '📈' },
    { id: 'arthritis', label: 'Arthritis', icon: '🦴' },
    { id: 'thyroid', label: 'Thyroid Issues', icon: '🦋' },
    { id: 'other', label: 'Other', icon: '📝' }
  ];

  const mentalHealthOptions = [
    { id: 'depression', label: 'Depression', icon: '😔' },
    { id: 'anxiety', label: 'Anxiety', icon: '😰' },
    { id: 'ptsd', label: 'PTSD', icon: '🛡️' },
    { id: 'panic', label: 'Panic Disorder', icon: '⚡' },
    { id: 'bipolar', label: 'Bipolar Disorder', icon: '🌓' },
    { id: 'adhd', label: 'ADHD', icon: '🎯' },
    { id: 'other', label: 'Other', icon: '📝' }
  ];

  const allergiesOptions = [
    { id: 'nuts', label: 'Nuts', icon: '🥜' },
    { id: 'dairy', label: 'Dairy', icon: '🥛' },
    { id: 'gluten', label: 'Gluten', icon: '🌾' },
    { id: 'seafood', label: 'Seafood', icon: '🦐' },
    { id: 'pollen', label: 'Pollen', icon: '🌸' },
    { id: 'medication', label: 'Medication', icon: '💊' },
    { id: 'other', label: 'Other', icon: '📝' }
  ];

  const supplementsOptions = [
    { id: 'vitamins', label: 'Vitamins', icon: '💊' },
    { id: 'protein', label: 'Protein Powder', icon: '🥤' },
    { id: 'antidepressants', label: 'Antidepressants', icon: '💊' },
    { id: 'pain-relief', label: 'Pain Relief', icon: '💊' },
    { id: 'omega3', label: 'Omega-3', icon: '🐟' },
    { id: 'probiotics', label: 'Probiotics', icon: '🦠' },
    { id: 'other', label: 'Other', icon: '📝' }
  ];

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 
    'France', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway', 'Denmark',
    'Other'
  ];

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const toggleArrayItem = (array: string[], item: string, key: keyof OnboardingData) => {
    const newArray = array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item];
    updateData({ [key]: newArray });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.fullName && data.country && data.age > 0 && data.height > 0 && data.weight > 0;
      case 2:
        return data.hasPhysicalIssues !== null && 
               (data.hasPhysicalIssues === false || data.physicalIssues.length > 0);
      case 3:
        return data.fitnessGoals.length > 0;
      case 4:
        return data.hasMedicalConditions !== null && 
               (data.hasMedicalConditions === false || data.medicalConditions.length > 0);
      case 5:
        return data.hasMentalHealth !== null && 
               (data.hasMentalHealth === false || data.mentalHealthConditions.length > 0 || data.mentalHealthUnsure);
      case 6:
        return data.hasAllergies !== null && 
               (data.hasAllergies === false || data.allergies.length > 0);
      case 7:
        return data.takesSupplements !== null && 
               (data.takesSupplements === false || data.supplements.length > 0);
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    if (!user) return;

    const profile: UserProfile = {
      age: data.age,
      height: data.heightUnit === 'cm' ? data.height : (data.heightFeet! * 30.48) + (data.heightInches! * 2.54),
      weight: data.weightUnit === 'kg' ? data.weight : data.weight * 0.453592,
      physicalMedicalIssues: [
        ...data.physicalIssues.filter(item => item !== 'other'),
        ...(data.physicalIssuesOther ? [data.physicalIssuesOther] : []),
        ...data.medicalConditions.filter(item => item !== 'other'),
        ...(data.medicalConditionsOther ? [data.medicalConditionsOther] : [])
      ],
      mentalHealthChallenges: [
        ...data.mentalHealthConditions.filter(item => item !== 'other'),
        ...(data.mentalHealthOther ? [data.mentalHealthOther] : [])
      ],
      allergies: [
        ...data.allergies.filter(item => item !== 'other'),
        ...(data.allergiesOther ? [data.allergiesOther] : [])
      ],
      physicalLimitations: data.physicalIssues.length > 0 ? data.physicalIssues : ['None of the above'],
      dietaryRestrictions: data.allergies.length > 0 ? data.allergies : ['None'],
      fitnessLevel: 'beginner',
      goals: data.fitnessGoals,
      preferredExerciseTypes: ['Walking/Light cardio']
    };

    const updatedUser = {
      ...user,
      name: data.fullName,
      profile,
      onboardingCompleted: true
    };

    updateUser(updatedUser);
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <User className="w-12 h-12 text-brand-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
              <p className="text-gray-600">Tell us a bit about yourself</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={data.fullName}
                  onChange={(e) => updateData({ fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                <select
                  value={data.country}
                  onChange={(e) => updateData({ country: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors"
                >
                  <option value="">Select your country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={data.age || ''}
                  onChange={(e) => updateData({ age: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors"
                  placeholder="Enter your age"
                  min="13"
                  max="120"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Height</label>
                <div className="flex space-x-3">
                  <div className="flex rounded-xl border border-gray-300 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => updateData({ heightUnit: 'cm' })}
                      className={`px-4 py-3 text-sm font-medium transition-colors ${
                        data.heightUnit === 'cm' 
                          ? 'bg-brand-600 text-white' 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      cm
                    </button>
                    <button
                      type="button"
                      onClick={() => updateData({ heightUnit: 'ft' })}
                      className={`px-4 py-3 text-sm font-medium transition-colors ${
                        data.heightUnit === 'ft' 
                          ? 'bg-brand-600 text-white' 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      ft/in
                    </button>
                  </div>
                  
                  {data.heightUnit === 'cm' ? (
                    <input
                      type="number"
                      value={data.height || ''}
                      onChange={(e) => updateData({ height: parseInt(e.target.value) || 0 })}
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors"
                      placeholder="Height in cm"
                      min="100"
                      max="250"
                    />
                  ) : (
                    <div className="flex-1 flex space-x-2">
                      <input
                        type="number"
                        value={data.heightFeet || ''}
                        onChange={(e) => updateData({ heightFeet: parseInt(e.target.value) || 0 })}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors"
                        placeholder="Feet"
                        min="3"
                        max="8"
                      />
                      <input
                        type="number"
                        value={data.heightInches || ''}
                        onChange={(e) => updateData({ heightInches: parseInt(e.target.value) || 0 })}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors"
                        placeholder="Inches"
                        min="0"
                        max="11"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Weight</label>
                <div className="flex space-x-3">
                  <div className="flex rounded-xl border border-gray-300 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => updateData({ weightUnit: 'kg' })}
                      className={`px-4 py-3 text-sm font-medium transition-colors ${
                        data.weightUnit === 'kg' 
                          ? 'bg-brand-600 text-white' 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      kg
                    </button>
                    <button
                      type="button"
                      onClick={() => updateData({ weightUnit: 'lbs' })}
                      className={`px-4 py-3 text-sm font-medium transition-colors ${
                        data.weightUnit === 'lbs' 
                          ? 'bg-brand-600 text-white' 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      lbs
                    </button>
                  </div>
                  <input
                    type="number"
                    value={data.weight || ''}
                    onChange={(e) => updateData({ weight: parseInt(e.target.value) || 0 })}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors"
                    placeholder={`Weight in ${data.weightUnit}`}
                    min="30"
                    max={data.weightUnit === 'kg' ? '300' : '660'}
                  />
                </div>
              </div>
            </div>
          </Card>
        );

      case 2:
        return (
          <Card className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Physical Health Information</h2>
              <p className="text-gray-600">Do you have any physical issues or disabilities?</p>
            </div>

            <div className="space-y-6">
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => updateData({ hasPhysicalIssues: false, physicalIssues: [] })}
                  className={`px-8 py-3 rounded-xl font-medium transition-all ${
                    data.hasPhysicalIssues === false
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  No
                </button>
                <button
                  onClick={() => updateData({ hasPhysicalIssues: true })}
                  className={`px-8 py-3 rounded-xl font-medium transition-all ${
                    data.hasPhysicalIssues === true
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Yes
                </button>
              </div>

              {data.hasPhysicalIssues && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {physicalIssuesOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => toggleArrayItem(data.physicalIssues, option.id, 'physicalIssues')}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        data.physicalIssues.includes(option.id)
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{option.icon}</span>
                        <span className="font-medium">{option.label}</span>
                        {data.physicalIssues.includes(option.id) && (
                          <Check className="w-5 h-5 text-blue-600 ml-auto" />
                        )}
                      </div>
                    </button>
                  ))}
                  
                  {data.physicalIssues.includes('other') && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="sm:col-span-2"
                    >
                      <input
                        type="text"
                        value={data.physicalIssuesOther}
                        onChange={(e) => updateData({ physicalIssuesOther: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors"
                        placeholder="Please specify..."
                      />
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </Card>
        );

      case 3:
        return (
          <Card className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Fitness & Wellness Goals</h2>
              <p className="text-gray-600">What are your fitness and wellness goals? (Select all that apply)</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {fitnessGoalsOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => toggleArrayItem(data.fitnessGoals, option.id, 'fitnessGoals')}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    data.fitnessGoals.includes(option.id)
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{option.icon}</span>
                    <span className="font-medium">{option.label}</span>
                    {data.fitnessGoals.includes(option.id) && (
                      <Check className="w-5 h-5 text-green-600 ml-auto" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        );

      case 4:
        return (
          <Card className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Stethoscope className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Medical Conditions</h2>
              <p className="text-gray-600">Do you have any medical conditions?</p>
            </div>

            <div className="space-y-6">
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => updateData({ hasMedicalConditions: false, medicalConditions: [] })}
                  className={`px-8 py-3 rounded-xl font-medium transition-all ${
                    data.hasMedicalConditions === false
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  No
                </button>
                <button
                  onClick={() => updateData({ hasMedicalConditions: true })}
                  className={`px-8 py-3 rounded-xl font-medium transition-all ${
                    data.hasMedicalConditions === true
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Yes
                </button>
              </div>

              {data.hasMedicalConditions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {medicalConditionsOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => toggleArrayItem(data.medicalConditions, option.id, 'medicalConditions')}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        data.medicalConditions.includes(option.id)
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{option.icon}</span>
                        <span className="font-medium">{option.label}</span>
                        {data.medicalConditions.includes(option.id) && (
                          <Check className="w-5 h-5 text-blue-600 ml-auto" />
                        )}
                      </div>
                    </button>
                  ))}
                  
                  {data.medicalConditions.includes('other') && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="sm:col-span-2"
                    >
                      <input
                        type="text"
                        value={data.medicalConditionsOther}
                        onChange={(e) => updateData({ medicalConditionsOther: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors"
                        placeholder="Please specify..."
                      />
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </Card>
        );

      case 5:
        return (
          <Card className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Mental Health</h2>
              <p className="text-gray-600">Do you have any mental health conditions?</p>
            </div>

            <div className="space-y-6">
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => updateData({ hasMentalHealth: false, mentalHealthConditions: [], mentalHealthUnsure: false })}
                  className={`px-8 py-3 rounded-xl font-medium transition-all ${
                    data.hasMentalHealth === false
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  No
                </button>
                <button
                  onClick={() => updateData({ hasMentalHealth: true, mentalHealthUnsure: false })}
                  className={`px-8 py-3 rounded-xl font-medium transition-all ${
                    data.hasMentalHealth === true
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => updateData({ hasMentalHealth: null, mentalHealthUnsure: true, mentalHealthConditions: [] })}
                  className={`px-8 py-3 rounded-xl font-medium transition-all ${
                    data.mentalHealthUnsure
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Not Sure
                </button>
              </div>

              {data.hasMentalHealth && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {mentalHealthOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => toggleArrayItem(data.mentalHealthConditions, option.id, 'mentalHealthConditions')}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        data.mentalHealthConditions.includes(option.id)
                          ? 'border-purple-500 bg-purple-50 text-purple-900'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{option.icon}</span>
                        <span className="font-medium">{option.label}</span>
                        {data.mentalHealthConditions.includes(option.id) && (
                          <Check className="w-5 h-5 text-purple-600 ml-auto" />
                        )}
                      </div>
                    </button>
                  ))}
                  
                  {data.mentalHealthConditions.includes('other') && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="sm:col-span-2"
                    >
                      <input
                        type="text"
                        value={data.mentalHealthOther}
                        onChange={(e) => updateData({ mentalHealthOther: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors"
                        placeholder="Please specify..."
                      />
                    </motion.div>
                  )}
                </motion.div>
              )}

              {data.mentalHealthUnsure && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-orange-50 p-6 rounded-xl border border-orange-200"
                >
                  <h3 className="font-semibold text-orange-900 mb-3">Self-Assessment Tools</h3>
                  <p className="text-sm text-orange-800 mb-4">
                    We can help you understand your mental health better with brief, clinically-validated questionnaires.
                  </p>
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 bg-white rounded-lg border border-orange-200 hover:bg-orange-50 transition-colors">
                      <span className="font-medium text-orange-900">Depression Screening (PHQ-9)</span>
                      <span className="block text-sm text-orange-700">2-3 minutes</span>
                    </button>
                    <button className="w-full text-left p-3 bg-white rounded-lg border border-orange-200 hover:bg-orange-50 transition-colors">
                      <span className="font-medium text-orange-900">Anxiety Screening (GAD-7)</span>
                      <span className="block text-sm text-orange-700">2-3 minutes</span>
                    </button>
                    <button className="w-full text-left p-3 bg-white rounded-lg border border-orange-200 hover:bg-orange-50 transition-colors">
                      <span className="font-medium text-orange-900">PTSD Screening (PC-PTSD-5)</span>
                      <span className="block text-sm text-orange-700">1-2 minutes</span>
                    </button>
                  </div>
                  <p className="text-xs text-orange-700 mt-3">
                    Note: These are screening tools, not diagnostic tests. Always consult with a healthcare professional for proper diagnosis.
                  </p>
                </motion.div>
              )}
            </div>
          </Card>
        );

      case 6:
        return (
          <Card className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <AlertTriangle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Allergies</h2>
              <p className="text-gray-600">Do you have any allergies?</p>
            </div>

            <div className="space-y-6">
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => updateData({ hasAllergies: false, allergies: [] })}
                  className={`px-8 py-3 rounded-xl font-medium transition-all ${
                    data.hasAllergies === false
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  No
                </button>
                <button
                  onClick={() => updateData({ hasAllergies: true })}
                  className={`px-8 py-3 rounded-xl font-medium transition-all ${
                    data.hasAllergies === true
                      ? 'bg-yellow-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Yes
                </button>
              </div>

              {data.hasAllergies && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {allergiesOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => toggleArrayItem(data.allergies, option.id, 'allergies')}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        data.allergies.includes(option.id)
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-900'
                          : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{option.icon}</span>
                        <span className="font-medium">{option.label}</span>
                        {data.allergies.includes(option.id) && (
                          <Check className="w-5 h-5 text-yellow-600 ml-auto" />
                        )}
                      </div>
                    </button>
                  ))}
                  
                  {data.allergies.includes('other') && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="sm:col-span-2"
                    >
                      <input
                        type="text"
                        value={data.allergiesOther}
                        onChange={(e) => updateData({ allergiesOther: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors"
                        placeholder="Please specify..."
                      />
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </Card>
        );

      case 7:
        return (
          <Card className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Pill className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Supplements & Medications</h2>
              <p className="text-gray-600">Do you take any supplements or medications?</p>
            </div>

            <div className="space-y-6">
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => updateData({ takesSupplements: false, supplements: [] })}
                  className={`px-8 py-3 rounded-xl font-medium transition-all ${
                    data.takesSupplements === false
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  No
                </button>
                <button
                  onClick={() => updateData({ takesSupplements: true })}
                  className={`px-8 py-3 rounded-xl font-medium transition-all ${
                    data.takesSupplements === true
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Yes
                </button>
              </div>

              {data.takesSupplements && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {supplementsOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => toggleArrayItem(data.supplements, option.id, 'supplements')}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        data.supplements.includes(option.id)
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-900'
                          : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{option.icon}</span>
                        <span className="font-medium">{option.label}</span>
                        {data.supplements.includes(option.id) && (
                          <Check className="w-5 h-5 text-indigo-600 ml-auto" />
                        )}
                      </div>
                    </button>
                  ))}
                  
                  {data.supplements.includes('other') && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="sm:col-span-2"
                    >
                      <input
                        type="text"
                        value={data.supplementsOther}
                        onChange={(e) => updateData({ supplementsOther: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors"
                        placeholder="Please specify..."
                      />
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  if (!user) {
    return <div>Please log in to complete onboarding.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Complete Your Profile</h1>
            <p className="text-gray-600">Step {currentStep} of {totalSteps}</p>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-brand-600 to-accent-600 h-3 rounded-full"
            />
          </div>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between items-center mt-8 max-w-2xl mx-auto"
        >
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>

          <div className="flex space-x-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i + 1 <= currentStep ? 'bg-brand-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className="flex items-center space-x-2"
          >
            <span>{currentStep === totalSteps ? 'Finish' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}