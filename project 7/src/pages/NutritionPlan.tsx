import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, ArrowLeft, Clock, Zap, Heart, Leaf, ChevronDown, ChevronUp, CheckCircle, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useUser } from '../contexts/UserContext';

export function NutritionPlan() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [expandedMeal, setExpandedMeal] = useState<number | null>(null);
  const [completedMeals, setCompletedMeals] = useState<number[]>([]);

  if (!user) {
    return <div>Please log in to view your nutrition plan.</div>;
  }

  // Generate comprehensive nutrition plan based on user profile
  const generateDetailedNutritionPlan = () => {
    const profile = user.profile!;
    const hasEnergyGoal = profile.goals.includes('Increase energy');
    const hasMoodGoal = profile.goals.includes('Improve mental health');
    const hasWeightGoal = profile.goals.includes('Lose weight');

    return {
      id: 'comprehensive-nutrition-1',
      title: 'Personalized Mood-Boosting Meal Plan',
      subtitle: 'Designed for your mental health and energy goals',
      totalCalories: hasWeightGoal ? 1600 : 1800,
      macros: {
        protein: hasWeightGoal ? 35 : 30,
        carbs: 40,
        fat: hasWeightGoal ? 25 : 30
      },
      meals: [
        {
          id: 1,
          name: 'Energizing Breakfast',
          time: '7:00 AM',
          calories: hasWeightGoal ? 320 : 400,
          description: 'Overnight oats with berries, nuts, and Greek yogurt for sustained energy.',
          ingredients: [
            '1/2 cup rolled oats',
            '1/2 cup Greek yogurt',
            '1/4 cup mixed berries',
            '1 tbsp almond butter',
            '1 tsp chia seeds',
            '1 tsp honey'
          ],
          benefits: ['High in omega-3s for brain health', 'Protein for sustained energy', 'Antioxidants for mood support'],
          prepTime: '5 minutes (night before)',
          difficulty: 'Easy',
          moodBoost: true
        },
        {
          id: 2,
          name: 'Mid-Morning Boost',
          time: '10:00 AM',
          calories: hasWeightGoal ? 150 : 200,
          description: 'Apple slices with almond butter and green tea for focus and energy.',
          ingredients: [
            '1 medium apple, sliced',
            '1 tbsp almond butter',
            '1 cup green tea'
          ],
          benefits: ['Natural sugars for quick energy', 'Healthy fats for brain function', 'L-theanine for calm focus'],
          prepTime: '2 minutes',
          difficulty: 'Easy',
          energyBoost: true
        },
        {
          id: 3,
          name: 'Balanced Power Lunch',
          time: '12:30 PM',
          calories: hasWeightGoal ? 400 : 500,
          description: 'Quinoa bowl with roasted vegetables, lean protein, and avocado.',
          ingredients: [
            '3/4 cup cooked quinoa',
            '3 oz grilled chicken or tofu',
            '1/2 avocado',
            '1 cup roasted vegetables (bell peppers, broccoli, carrots)',
            '2 tbsp tahini dressing',
            'Mixed greens'
          ],
          benefits: ['Complete proteins for neurotransmitter production', 'Complex carbs for stable mood', 'Healthy fats for brain health'],
          prepTime: '15 minutes',
          difficulty: 'Medium',
          moodBoost: true
        },
        {
          id: 4,
          name: 'Afternoon Mood Lift',
          time: '3:00 PM',
          calories: hasWeightGoal ? 120 : 150,
          description: 'Dark chocolate and nuts with herbal tea for stress relief.',
          ingredients: [
            '1 oz dark chocolate (70% cacao)',
            '10 almonds',
            '1 cup chamomile or peppermint tea'
          ],
          benefits: ['Dark chocolate boosts serotonin', 'Magnesium for stress relief', 'Herbal tea for relaxation'],
          prepTime: '1 minute',
          difficulty: 'Easy',
          stressRelief: true
        },
        {
          id: 5,
          name: 'Nourishing Dinner',
          time: '6:30 PM',
          calories: hasWeightGoal ? 450 : 550,
          description: 'Grilled salmon with roasted sweet potato and steamed vegetables.',
          ingredients: [
            '4 oz grilled salmon',
            '1 medium roasted sweet potato',
            '1 cup steamed broccoli',
            '1 tbsp olive oil',
            'Lemon and herbs for seasoning'
          ],
          benefits: ['Omega-3s for brain health', 'Complex carbs for serotonin production', 'B-vitamins for energy metabolism'],
          prepTime: '25 minutes',
          difficulty: 'Medium',
          moodBoost: true
        }
      ],
      tips: [
        'Stay hydrated with 8-10 glasses of water daily',
        'Eat meals at consistent times to regulate mood',
        'Include a source of protein with each meal',
        'Choose colorful fruits and vegetables for antioxidants'
      ],
      adaptations: profile.physicalLimitations.length > 0 ? [
        'Pre-cut vegetables available for easier preparation',
        'One-pot meals to reduce cooking complexity',
        'Meal prep options for busy days'
      ] : []
    };
  };

  const nutritionPlan = generateDetailedNutritionPlan();

  const toggleMealExpansion = (mealId: number) => {
    setExpandedMeal(expandedMeal === mealId ? null : mealId);
  };

  const toggleMealCompletion = (mealId: number) => {
    setCompletedMeals(prev => 
      prev.includes(mealId) 
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

  const completionPercentage = (completedMeals.length / nutritionPlan.meals.length) * 100;

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
          
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
              <Utensils className="w-8 h-8 text-green-600 mr-3" />
              {nutritionPlan.title}
            </h1>
            
            {/* Daily Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-green-50 border-green-200">
                <div className="text-center">
                  <Zap className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{nutritionPlan.totalCalories}</p>
                  <p className="text-sm text-gray-600">Total Calories</p>
                </div>
              </Card>
              <Card className="bg-blue-50 border-blue-200">
                <div className="text-center">
                  <Heart className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{Math.round(completionPercentage)}%</p>
                  <p className="text-sm text-gray-600">Completed Today</p>
                </div>
              </Card>
              <Card className="bg-purple-50 border-purple-200">
                <div className="text-center">
                  <Leaf className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{nutritionPlan.meals.length}</p>
                  <p className="text-sm text-gray-600">Meals & Snacks</p>
                </div>
              </Card>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full"
              />
            </div>
            <p className="text-sm text-gray-600">
              {completedMeals.length} of {nutritionPlan.meals.length} meals completed today
            </p>
          </div>
        </motion.div>

        {/* Macros Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Daily Macronutrient Targets</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-red-600 font-bold">{nutritionPlan.macros.protein}%</span>
                </div>
                <p className="font-medium text-gray-900">Protein</p>
                <p className="text-sm text-gray-600">Brain & muscle support</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-yellow-600 font-bold">{nutritionPlan.macros.carbs}%</span>
                </div>
                <p className="font-medium text-gray-900">Carbs</p>
                <p className="text-sm text-gray-600">Energy & mood stability</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">{nutritionPlan.macros.fat}%</span>
                </div>
                <p className="font-medium text-gray-900">Healthy Fats</p>
                <p className="text-sm text-gray-600">Brain health & hormones</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Meals */}
        <div className="space-y-6">
          {nutritionPlan.meals.map((meal, index) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 2) }}
            >
              <Card className={`transition-all duration-300 ${
                completedMeals.includes(meal.id) ? 'bg-green-50 border-green-200' : 'hover:shadow-lg'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleMealCompletion(meal.id)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        completedMeals.includes(meal.id)
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {completedMeals.includes(meal.id) && <CheckCircle className="w-5 h-5" />}
                    </button>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                        <span>{meal.name}</span>
                        {meal.moodBoost && <Heart className="w-4 h-4 text-pink-500" />}
                        {meal.energyBoost && <Zap className="w-4 h-4 text-yellow-500" />}
                        {meal.stressRelief && <Leaf className="w-4 h-4 text-green-500" />}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{meal.time}</span>
                        </span>
                        <span>{meal.calories} calories</span>
                        <span className="capitalize">{meal.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleMealExpansion(meal.id)}
                    className="flex items-center space-x-1"
                  >
                    <span>{expandedMeal === meal.id ? 'Less' : 'Details'}</span>
                    {expandedMeal === meal.id ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                    }
                  </Button>
                </div>

                <p className="text-gray-700 mb-4">{meal.description}</p>

                {expandedMeal === meal.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Ingredients</h4>
                        <ul className="space-y-1">
                          {meal.ingredients.map((ingredient, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-center space-x-2">
                              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                              <span>{ingredient}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Health Benefits</h4>
                        <ul className="space-y-1">
                          {meal.benefits.map((benefit, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-center space-x-2">
                              <Star className="w-3 h-3 text-yellow-500" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Prep Time:</strong> {meal.prepTime}
                      </p>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tips & Adaptations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Card className="bg-blue-50 border-blue-200">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Nutrition Tips</h3>
            <ul className="space-y-2">
              {nutritionPlan.tips.map((tip, index) => (
                <li key={index} className="text-sm text-blue-800 flex items-start space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Card>

          {nutritionPlan.adaptations.length > 0 && (
            <Card className="bg-purple-50 border-purple-200">
              <h3 className="text-lg font-bold text-purple-900 mb-4">Personalized Adaptations</h3>
              <ul className="space-y-2">
                {nutritionPlan.adaptations.map((adaptation, index) => (
                  <li key={index} className="text-sm text-purple-800 flex items-start space-x-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{adaptation}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <Button className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
            Generate Shopping List
          </Button>
          <Button variant="outline" className="flex-1">
            Save to Meal Planner
          </Button>
          <Button variant="outline" className="flex-1">
            Share with Nutritionist
          </Button>
        </motion.div>
      </div>
    </div>
  );
}