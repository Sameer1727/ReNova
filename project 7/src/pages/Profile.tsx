import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Brain, Shield, Target, Heart, Activity, Utensils, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useUser } from '../contexts/UserContext';

export function Profile() {
  const navigate = useNavigate();
  const { user } = useUser();

  if (!user || !user.profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 flex items-center justify-center">
        <Card className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">Please complete your onboarding first.</p>
          <Button onClick={() => navigate('/onboarding')}>
            Complete Onboarding
          </Button>
        </Card>
      </div>
    );
  }

  const profile = user.profile;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="mb-4 flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
          
          <div className="text-center">
            <User className="w-16 h-16 text-brand-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
              Your Personalized Care Profile
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your wellness journey is uniquely tailored to your needs, challenges, and goals.
            </p>
          </div>
        </motion.div>

        {/* Profile Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="text-center">
              <Brain className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-blue-900 mb-2">Mental Health Support</h3>
              <p className="text-sm text-blue-800">
                {profile.mentalHealthChallenges.length > 0 && !profile.mentalHealthChallenges.includes('None of the above')
                  ? `Specialized support for ${profile.mentalHealthChallenges.length} condition${profile.mentalHealthChallenges.length > 1 ? 's' : ''}`
                  : 'General mental wellness support'
                }
              </p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="text-center">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-green-900 mb-2">Adaptive Fitness</h3>
              <p className="text-sm text-green-800">
                {profile.physicalLimitations.length > 0 && !profile.physicalLimitations.includes('None of the above')
                  ? 'Exercises adapted for your physical needs'
                  : 'Standard fitness recommendations'
                }
              </p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="text-center">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-purple-900 mb-2">Personal Goals</h3>
              <p className="text-sm text-purple-800">
                {profile.goals.length} active wellness goal{profile.goals.length > 1 ? 's' : ''}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Detailed Profile Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <User className="w-5 h-5 text-gray-600 mr-2" />
                  Personal Information
                </h2>
                <Button variant="outline" size="sm">
                  <Edit3 className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium text-gray-900">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Age:</span>
                  <span className="font-medium text-gray-900">{profile.age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Height:</span>
                  <span className="font-medium text-gray-900">{Math.round(profile.height)} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium text-gray-900">{Math.round(profile.weight)} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fitness Level:</span>
                  <span className="font-medium text-gray-900 capitalize">{profile.fitnessLevel}</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Health Information */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Heart className="w-5 h-5 text-red-600 mr-2" />
                  Health Information
                </h2>
                <Button variant="outline" size="sm">
                  <Edit3 className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <span className="text-gray-600 block mb-2">Mental Health:</span>
                  <div className="flex flex-wrap gap-2">
                    {profile.mentalHealthChallenges.length > 0 && !profile.mentalHealthChallenges.includes('None of the above') ? (
                      profile.mentalHealthChallenges.map((condition, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {condition}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">No specific conditions reported</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-600 block mb-2">Physical Limitations:</span>
                  <div className="flex flex-wrap gap-2">
                    {profile.physicalLimitations.length > 0 && !profile.physicalLimitations.includes('None of the above') ? (
                      profile.physicalLimitations.map((limitation, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          {limitation}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">No physical limitations reported</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-600 block mb-2">Allergies:</span>
                  <div className="flex flex-wrap gap-2">
                    {profile.allergies.length > 0 && !profile.allergies.includes('None') ? (
                      profile.allergies.map((allergy, index) => (
                        <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                          {allergy}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">No allergies reported</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Goals & Preferences */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Target className="w-5 h-5 text-purple-600 mr-2" />
                  Goals & Preferences
                </h2>
                <Button variant="outline" size="sm">
                  <Edit3 className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <span className="text-gray-600 block mb-2">Wellness Goals:</span>
                  <div className="flex flex-wrap gap-2">
                    {profile.goals.map((goal, index) => (
                      <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-600 block mb-2">Preferred Exercise Types:</span>
                  <div className="flex flex-wrap gap-2">
                    {profile.preferredExerciseTypes.map((type, index) => (
                      <span key={index} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-600 block mb-2">Dietary Restrictions:</span>
                  <div className="flex flex-wrap gap-2">
                    {profile.dietaryRestrictions.length > 0 && !profile.dietaryRestrictions.includes('None') ? (
                      profile.dietaryRestrictions.map((restriction, index) => (
                        <span key={index} className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs">
                          {restriction}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">No dietary restrictions</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* AI Personalization */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Brain className="w-5 h-5 text-indigo-600 mr-2" />
                AI Personalization
              </h2>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">🧠 Mental Health AI</h3>
                  <p className="text-sm text-gray-700">
                    Your AI coach is trained to provide compassionate support for your specific mental health needs, 
                    offering personalized coping strategies and mood tracking insights.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">💪 Adaptive Fitness AI</h3>
                  <p className="text-sm text-gray-700">
                    All workout recommendations are automatically adapted based on your physical capabilities, 
                    ensuring safe and effective exercise routines.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">🍎 Nutrition AI</h3>
                  <p className="text-sm text-gray-700">
                    Meal plans are customized considering your allergies, dietary restrictions, and wellness goals 
                    to support both physical and mental health.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            onClick={() => navigate('/onboarding')}
            className="bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700"
          >
            Update Profile
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/ai-coach')}
          >
            Talk to AI Coach
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </motion.div>
      </div>
    </div>
  );
}