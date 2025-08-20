import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Target, Activity, Heart, Utensils, TrendingUp, User, Brain, Shield, CheckCircle, AlertCircle, Mic, Zap, Award, ChevronDown, ChevronUp, Play, BarChart3, Users, Phone, MessageCircle, Volume2 } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { WorkoutPlan, NutritionPlan } from '../types';

export function Dashboard() {
  const navigate = useNavigate();
  const { user, moodEntries } = useUser();

  if (!user) {
    return <div>Please complete onboarding first.</div>;
  }

  // Generate AI-powered workout plan based on user profile
  const generateWorkoutPlan = (): WorkoutPlan => {
    const profile = user.profile!;
    const isLowImpact = profile.physicalLimitations.length > 0 || profile.fitnessLevel === 'beginner';
    
    return {
      id: 'weekly-plan-1',
      title: isLowImpact ? 'Gentle Wellness Routine' : 'Balanced Fitness Plan',
      duration: '30-45 minutes',
      difficulty: profile.fitnessLevel,
      exercises: [
        {
          name: 'Mindful Breathing',
          duration: '5 minutes',
          description: 'Deep breathing exercises to center yourself and reduce anxiety.',
          adaptations: ['Can be done seated', 'Use guided audio if helpful']
        },
        {
          name: isLowImpact ? 'Chair Yoga Stretches' : 'Dynamic Warm-up',
          duration: '10 minutes',
          description: isLowImpact 
            ? 'Gentle stretches to improve flexibility and reduce stiffness.'
            : 'Light movements to prepare your body for exercise.',
          adaptations: profile.physicalLimitations.includes('Mobility limitations') 
            ? ['All movements can be adapted for seated position'] 
            : []
        },
        {
          name: profile.preferredExerciseTypes.includes('Walking/Light cardio') 
            ? 'Gentle Walking' 
            : 'Low-Impact Movement',
          duration: '15-20 minutes',
          description: 'Cardiovascular activity adapted to your comfort level.',
          adaptations: ['Stop if you feel discomfort', 'Pace yourself based on energy levels']
        },
        {
          name: 'Relaxation & Cool Down',
          duration: '5-10 minutes',
          description: 'Gentle stretches and meditation to end your session peacefully.',
          adaptations: ['Focus on areas that feel tense', 'Practice gratitude']
        }
      ]
    };
  };

  // Generate nutrition plan based on profile
  const generateNutritionPlan = (): NutritionPlan => {
    return {
      id: 'daily-nutrition-1',
      title: 'Mood-Boosting Meal Plan',
      totalCalories: 1800,
      meals: [
        {
          name: 'Energizing Breakfast',
          time: '7:00 AM',
          calories: 400,
          description: 'Overnight oats with berries, nuts, and yogurt for sustained energy.'
        },
        {
          name: 'Mood-Lifting Snack',
          time: '10:00 AM',
          calories: 200,
          description: 'Apple slices with almond butter for omega-3s and fiber.'
        },
        {
          name: 'Balanced Lunch',
          time: '12:30 PM',
          calories: 500,
          description: 'Quinoa bowl with vegetables, lean protein, and avocado.'
        },
        {
          name: 'Afternoon Boost',
          time: '3:00 PM',
          calories: 150,
          description: 'Green tea and a small handful of dark chocolate and nuts.'
        },
        {
          name: 'Nourishing Dinner',
          time: '6:30 PM',
          calories: 550,
          description: 'Grilled salmon with roasted vegetables and sweet potato.'
        }
      ]
    };
  };

  const workoutPlan = generateWorkoutPlan();
  const nutritionPlan = generateNutritionPlan();

  const recentMoodAvg = moodEntries.slice(-7).reduce((sum, entry) => sum + entry.mood, 0) / Math.min(moodEntries.length, 7) || 5;

  // Calculate personalized insights
  const getPersonalizedGreeting = () => {
    const lastWeekMood = moodEntries.slice(-14, -7).reduce((sum, entry) => sum + entry.mood, 0) / Math.min(moodEntries.slice(-14, -7).length, 7) || 5;
    const thisWeekMood = recentMoodAvg;
    const moodImprovement = thisWeekMood - lastWeekMood;
    
    if (moodImprovement > 0.5) {
      return "Your integrated wellness is thriving - small victories building lasting change! 🎉";
    } else if (moodEntries.length >= 12) {
      return "You're rebuilding your life holistically — 12 days of integrated healing!";
    } else if (moodEntries.length >= 7) {
      return "Your AI companion is learning and adapting to support your unique journey!";
    }
    return "ReNova is here as your steady companion, ready to help you regain hope and control";
  };

  const getAchievementBadges = () => {
    const badges = [];
    if (moodEntries.length >= 7) badges.push({ icon: <Award className="w-4 h-4" />, text: "Week Warrior", color: "bg-yellow-100 text-yellow-800" });
    if (moodEntries.length >= 30) badges.push({ icon: <Zap className="w-4 h-4" />, text: "Month Master", color: "bg-purple-100 text-purple-800" });
    if (recentMoodAvg >= 7) badges.push({ icon: <Heart className="w-4 h-4" />, text: "Mood Booster", color: "bg-pink-100 text-pink-800" });
    return badges;
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'mood':
        navigate('/mood');
        break;
      case 'schedule':
        navigate('/schedule');
        break;
      case 'progress':
        navigate('/progress');
        break;
      case 'community':
        navigate('/community');
        break;
      case 'coach':
        navigate('/ai-coach');
        break;
      default:
        break;
    }
  };

  const getPersonalizedInsights = () => {
    const profile = user.profile!;
    const insights = [];

    if (profile.mentalHealthChallenges.length > 0) {
      insights.push({
        type: 'mental-health',
        title: 'Mental Health Support',
        description: `Your plan includes specialized support for ${profile.mentalHealthChallenges.join(', ').toLowerCase()}.`,
        icon: <Brain className="w-5 h-5 text-blue-600" />,
        color: 'blue'
      });
    }

    if (profile.physicalLimitations.length > 0 && !profile.physicalLimitations.includes('None of the above')) {
      insights.push({
        type: 'accessibility',
        title: 'Adaptive Exercises',
        description: 'Your integrated approach to mental health, fitness, and nutrition is working beautifully.',
        color: 'green'
      });
    }

    if (profile.goals.length > 0) {
      insights.push({
        type: 'goals',
        title: 'Resilience Builder! 🏆',
        description: `Incredible! ${moodEntries.length} days of choosing healing. You're regaining control of your life.`,
        color: 'purple'
      });
    }

    return insights;
  };

  const statsCards = [
    {
      title: 'Emotional Well-being',
      value: recentMoodAvg.toFixed(1),
      subtitle: 'out of 10',
      icon: <Heart className="w-6 h-6 text-pink-600" />,
      color: 'pink',
      trend: 'Growing stronger',
      chart: true
    },
    {
      title: 'Healing Activities',
      value: '4',
      subtitle: 'this week',
      icon: <Activity className="w-6 h-6 text-green-600" />,
      color: 'green',
      trend: 'Building resilience',
      progress: 57
    },
    {
      title: 'Recovery Journey',
      value: '12',
      subtitle: 'days of growth',
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      color: 'blue',
      trend: 'Regaining control!',
      flame: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600 mb-2">
            {getPersonalizedGreeting()}
          </p>
          
          {/* Achievement Badges */}
          {getAchievementBadges().length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {getAchievementBadges().map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}
                >
                  {badge.icon}
                  <span>{badge.text}</span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {statsCards.map((stat, index) => (
            <Card key={stat.title} className="bg-gradient-to-br from-white to-gray-50/50 border-l-4 border-l-brand-500">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    {stat.flame && <span className="text-orange-500">🔥</span>}
                  </div>
                  <p className="text-sm text-gray-500">{stat.subtitle}</p>
                </div>
                <div className="flex-shrink-0">
                  {stat.icon}
                </div>
              </div>
              
              {/* Mini visualizations */}
              <div className="mt-3">
                {stat.chart && (
                  <div className="flex items-center space-x-1 h-8">
                    {[6.2, 6.8, 7.1, 6.9, 7.3, 7.5, recentMoodAvg].map((value, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-pink-200 rounded-sm"
                        style={{ height: `${(value / 10) * 100}%` }}
                      />
                    ))}
                  </div>
                )}
                
                {stat.progress && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-green-500 h-2 rounded-full"
                    />
                  </div>
                )}
                
                <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
              </div>
            </Card>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Workout */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-white to-blue-50/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Activity className="w-5 h-5 text-blue-600 mr-2" />
                  Today's Workout
                </h2>
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {workoutPlan.difficulty}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-500">0/4 healing activities</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }} />
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-1">{workoutPlan.title}</h3>
                <p className="text-sm text-gray-600 mb-3">Duration: {workoutPlan.duration}</p>
                
                <div className="space-y-3">
                  {workoutPlan.exercises.slice(0, 2).map((exercise, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-500">{index + 1}</span>
                          </div>
                          <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                        </div>
                        <span className="text-sm text-gray-500">{exercise.duration}</span>
                      </div>
                      <p className="text-sm text-gray-600">{exercise.description}</p>
                      {exercise.adaptations && exercise.adaptations.length > 0 && (
                        <p className="text-xs text-blue-600 mt-1">
                          🤝 Compassionate adaptation: {exercise.adaptations[0]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                
              </div>
              
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                <span onClick={() => navigate('/workout')}>Begin Healing Journey</span>
              </Button>
            </Card>
          </motion.div>

          {/* Nutrition Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-white to-green-50/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Utensils className="w-5 h-5 text-green-600 mr-2" />
                  Today's Healing Nutrition
                </h2>
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  {nutritionPlan.totalCalories} cal
                </span>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-3">Personalized Recovery Nutrition</h3>
                
                <div className="space-y-2">
                  {nutritionPlan.meals.slice(0, 3).map((meal, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Utensils className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{meal.name}</h4>
                          <p className="text-xs text-gray-600">{meal.time}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{meal.calories} cal</span>
                    </div>
                  ))}
                </div>
                
              </div>
              
              <Button variant="secondary" className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                <span onClick={() => navigate('/nutrition')}>View Healing Plan</span>
              </Button>
            </Card>
          </motion.div>
        </div>

      </div>
    </div>
  );
}