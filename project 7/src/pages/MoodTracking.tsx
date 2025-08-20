import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Heart, Smile, Meh, Frown, ArrowUp, ArrowDown, Minus, Award, Zap } from 'lucide-react';
import { format, subDays, parseISO } from 'date-fns';
import { useUser } from '../contexts/UserContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MoodEntry } from '../types';

export function MoodTracking() {
  const { moodEntries, addMoodEntry } = useUser();
  const [selectedMood, setSelectedMood] = useState(5);
  const [selectedEnergy, setSelectedEnergy] = useState(5);
  const [selectedAnxiety, setSelectedAnxiety] = useState(5);
  const [notes, setNotes] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const entry: Omit<MoodEntry, 'id'> = {
      date: new Date().toISOString(),
      mood: selectedMood,
      energy: selectedEnergy,
      anxiety: selectedAnxiety,
      notes: notes.trim() || undefined
    };

    addMoodEntry(entry);
    
    // Reset form
    setSelectedMood(5);
    setSelectedEnergy(5);
    setSelectedAnxiety(5);
    setNotes('');
    setShowForm(false);
  };

  const handleQuickMoodEntry = (mood: number) => {
    const entry: Omit<MoodEntry, 'id'> = {
      date: new Date().toISOString(),
      mood,
      energy: 5, // Default values for quick entry
      anxiety: 5,
      notes: 'Quick mood entry'
    };

    addMoodEntry(entry);
  };

  const getMoodIcon = (mood: number) => {
    if (mood >= 8) return <Smile className="w-6 h-6 text-green-500" />;
    if (mood >= 6) return <Meh className="w-6 h-6 text-yellow-500" />;
    return <Frown className="w-6 h-6 text-red-500" />;
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 8) return 'bg-green-500';
    if (mood >= 6) return 'bg-yellow-500';
    if (mood >= 4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getMoodEmoji = (mood: number) => {
    if (mood >= 8) return '😊';
    if (mood >= 6) return '😐';
    if (mood >= 4) return '😕';
    return '😔';
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (current < previous) return <ArrowDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  // Generate chart data for the last 7 days
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = format(subDays(new Date(), 6 - i), 'yyyy-MM-dd');
    const entry = moodEntries.find(e => format(parseISO(e.date), 'yyyy-MM-dd') === date);
    return {
      date,
      mood: entry?.mood || null,
      energy: entry?.energy || null,
      anxiety: entry?.anxiety || null
    };
  });

  // Calculate current and previous week averages for trends
  const currentWeekEntries = moodEntries.slice(-7);
  const previousWeekEntries = moodEntries.slice(-14, -7);
  
  const currentAverages = currentWeekEntries.length > 0 ? {
    mood: currentWeekEntries.reduce((sum, entry) => sum + entry.mood, 0) / currentWeekEntries.length,
    energy: currentWeekEntries.reduce((sum, entry) => sum + entry.energy, 0) / currentWeekEntries.length,
    anxiety: currentWeekEntries.reduce((sum, entry) => sum + entry.anxiety, 0) / currentWeekEntries.length
  } : { mood: 0, energy: 0, anxiety: 0 };

  const previousAverages = previousWeekEntries.length > 0 ? {
    mood: previousWeekEntries.reduce((sum, entry) => sum + entry.mood, 0) / previousWeekEntries.length,
    energy: previousWeekEntries.reduce((sum, entry) => sum + entry.energy, 0) / previousWeekEntries.length,
    anxiety: previousWeekEntries.reduce((sum, entry) => sum + entry.anxiety, 0) / previousWeekEntries.length
  } : { mood: 0, energy: 0, anxiety: 0 };

  // Calculate streaks and achievements
  const getCurrentStreak = () => {
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const checkDate = format(subDays(today, i), 'yyyy-MM-dd');
      const hasEntry = moodEntries.some(entry => 
        format(parseISO(entry.date), 'yyyy-MM-dd') === checkDate
      );
      if (hasEntry) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const currentStreak = getCurrentStreak();
  const weeklyEntries = currentWeekEntries.length;
  const weeklyCompletion = Math.round((weeklyEntries / 7) * 100);

  // Get personalized insights
  const getInsights = () => {
    const insights = [];
    
    if (currentAverages.mood >= 7) {
      insights.push({
        type: 'positive',
        title: 'Great Progress! 🎉',
        description: 'Your mood has been consistently high. Keep up the great work!',
        color: 'green'
      });
    }
    
    if (currentAverages.energy < 5) {
      insights.push({
        type: 'suggestion',
        title: 'Energy Boost Needed ⚡',
        description: 'Try a 10-minute walk or some light stretching to boost your energy.',
        color: 'orange'
      });
    }
    
    if (currentAverages.anxiety > 6) {
      insights.push({
        type: 'suggestion',
        title: 'Stress Management 🧘',
        description: 'Consider trying a 5-minute breathing exercise when you feel anxious.',
        color: 'blue'
      });
    }
    
    if (currentStreak >= 7) {
      insights.push({
        type: 'achievement',
        title: 'Week Warrior! 🏆',
        description: `Amazing! You've logged ${currentStreak} days in a row. Consistency is key!`,
        color: 'purple'
      });
    }
    
    return insights;
  };

  const MoodScale = ({ value, onChange, label, color }: { 
    value: number; 
    onChange: (value: number) => void; 
    label: string;
    color: string;
  }) => (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Low</span>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => onChange(rating)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                value >= rating 
                  ? `${color} border-transparent text-white` 
                  : 'bg-gray-100 border-gray-300 hover:border-gray-400'
              }`}
            >
              {rating}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-500">High</span>
      </div>
      <div className="text-center">
        <span className="text-lg font-semibold text-gray-900">{value}/10</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Heart className="w-8 h-8 text-pink-600 mr-3" />
            Mental Health
          </h1>
          <p className="text-gray-600">
            Take a moment to reflect on how you're feeling today.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
            <div className="text-center">
              <div className="flex justify-center items-center space-x-2 mb-2">
                <Heart className="w-6 h-6 text-pink-600" />
                {previousAverages.mood > 0 && getTrendIcon(currentAverages.mood, previousAverages.mood)}
              </div>
              <p className="text-sm font-medium text-gray-600">Average Mood</p>
              <p className="text-3xl font-bold text-gray-900">{currentAverages.mood.toFixed(1)}</p>
              <p className="text-sm text-gray-500">out of 10</p>
              {previousAverages.mood > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  {currentAverages.mood > previousAverages.mood ? '+' : ''}
                  {(currentAverages.mood - previousAverages.mood).toFixed(1)} from last week
                </p>
              )}
            </div>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="text-center">
              <div className="flex justify-center items-center space-x-2 mb-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                {previousAverages.energy > 0 && getTrendIcon(currentAverages.energy, previousAverages.energy)}
              </div>
              <p className="text-sm font-medium text-gray-600">Average Energy</p>
              <p className="text-3xl font-bold text-gray-900">{currentAverages.energy.toFixed(1)}</p>
              <p className="text-sm text-gray-500">out of 10</p>
              {previousAverages.energy > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  {currentAverages.energy > previousAverages.energy ? '+' : ''}
                  {(currentAverages.energy - previousAverages.energy).toFixed(1)} from last week
                </p>
              )}
            </div>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="text-center">
              <div className="flex justify-center items-center space-x-2 mb-2">
                <Award className="w-6 h-6 text-blue-600" />
                {currentStreak >= 7 && <span className="text-orange-500">🔥</span>}
              </div>
              <p className="text-sm font-medium text-gray-600">Current Streak</p>
              <p className="text-3xl font-bold text-gray-900">{currentStreak}</p>
              <p className="text-sm text-gray-500">days in a row</p>
              <div className="mt-2">
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(weeklyCompletion, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{weeklyCompletion}% this week</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Weekly Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Log New Entry */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-white to-teal-50/30">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Today's Check-in</h2>
                {!showForm && (
                  <Button onClick={() => setShowForm(true)}>
                    <Heart className="w-4 h-4" />
                    <span>Log Mood</span>
                  </Button>
                )}
              </div>

              {showForm ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <MoodScale 
                    value={selectedMood} 
                    onChange={setSelectedMood} 
                    label="How is your mood today?"
                    color="bg-pink-500"
                  />
                  
                  <MoodScale 
                    value={selectedEnergy} 
                    onChange={setSelectedEnergy} 
                    label="What's your energy level?"
                    color="bg-green-500"
                  />
                  
                  <MoodScale 
                    value={selectedAnxiety} 
                    onChange={setSelectedAnxiety} 
                    label="How anxious do you feel?"
                    color="bg-orange-500"
                  />

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                      placeholder="How are you feeling? What's on your mind?"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button type="submit" className="flex-1">
                      Save Entry
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Quick Mood Entry */}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Mood Check</h3>
                    <div className="flex justify-center space-x-4">
                      {[
                        { mood: 8, emoji: '😊', label: 'Great', color: 'bg-green-100 hover:bg-green-200 text-green-800' },
                        { mood: 6, emoji: '😐', label: 'Okay', color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800' },
                        { mood: 4, emoji: '😕', label: 'Meh', color: 'bg-orange-100 hover:bg-orange-200 text-orange-800' },
                        { mood: 2, emoji: '😔', label: 'Low', color: 'bg-red-100 hover:bg-red-200 text-red-800' }
                      ].map((option) => (
                        <motion.button
                          key={option.mood}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleQuickMoodEntry(option.mood)}
                          className={`p-4 rounded-xl transition-all ${option.color} flex flex-col items-center space-y-2`}
                        >
                          <span className="text-3xl">{option.emoji}</span>
                          <span className="text-sm font-medium">{option.label}</span>
                        </motion.button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                      Tap for quick entry, or use "Log Mood" for detailed tracking
                    </p>
                  </div>

                  {/* Motivational Message */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg text-center">
                    <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-purple-800 font-medium">
                      {currentStreak > 0 
                        ? `You're on a ${currentStreak}-day streak! Keep it going! 🔥`
                        : "Start your wellness journey with a simple mood check-in"
                      }
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>

          {/* 7-Day Trend */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-white to-indigo-50/30">
              <h2 className="text-xl font-bold text-gray-900 mb-6">7-Day Trend</h2>
              
              {/* Calendar Grid View */}
              <div className="grid grid-cols-7 gap-2 mb-6">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
                {chartData.map((day, index) => (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="aspect-square flex items-center justify-center rounded-lg border-2 transition-all"
                    style={{
                      backgroundColor: day.mood ? 
                        `hsl(${120 + (day.mood - 5) * 12}, 70%, 90%)` : 
                        '#f3f4f6',
                      borderColor: day.mood ? 
                        `hsl(${120 + (day.mood - 5) * 12}, 70%, 60%)` : 
                        '#d1d5db'
                    }}
                  >
                    {day.mood ? (
                      <div className="text-center">
                        <div className="text-lg">{getMoodEmoji(day.mood)}</div>
                        <div className="text-xs font-medium">{day.mood}</div>
                      </div>
                    ) : (
                      <div className="text-gray-400 text-xs">-</div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Detailed List View */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-sm">Detailed View</h3>
                {chartData.map((day, index) => (
                  <div key={day.date} className="flex items-center space-x-4">
                    <div className="w-20 text-sm text-gray-600">
                      {format(parseISO(`${day.date}T00:00:00`), 'MMM dd')}
                    </div>
                    
                    <div className="flex-1 flex items-center space-x-2">
                      {day.mood ? (
                        <>
                          {getMoodIcon(day.mood)}
                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full transition-all duration-500 ${getMoodColor(day.mood)}`}
                              style={{ width: `${(day.mood / 10) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {day.mood}/10
                          </span>
                        </>
                      ) : (
                        <div className="flex-1 text-gray-400 text-sm">
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs">No entry</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

      </div>
    </div>
  );
}