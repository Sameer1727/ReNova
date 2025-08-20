import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Target, Activity, Heart, ArrowLeft, BarChart3, LineChart, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format, subDays, parseISO } from 'date-fns';
import { useUser } from '../contexts/UserContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function ProgressTracking() {
  const navigate = useNavigate();
  const { user, moodEntries } = useUser();
  const [timeRange, setTimeRange] = useState('7days');

  if (!user) {
    return <div>Please log in to view your progress.</div>;
  }

  // Calculate progress metrics
  const getProgressData = () => {
    const days = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 90;
    const startDate = subDays(new Date(), days - 1);
    
    const recentEntries = moodEntries.filter(entry => 
      parseISO(entry.date) >= startDate
    );

    const averages = recentEntries.length > 0 ? {
      mood: recentEntries.reduce((sum, entry) => sum + entry.mood, 0) / recentEntries.length,
      energy: recentEntries.reduce((sum, entry) => sum + entry.energy, 0) / recentEntries.length,
      anxiety: recentEntries.reduce((sum, entry) => sum + entry.anxiety, 0) / recentEntries.length
    } : { mood: 0, energy: 0, anxiety: 0 };

    // Generate chart data
    const chartData = Array.from({ length: days }, (_, i) => {
      const date = format(subDays(new Date(), days - 1 - i), 'yyyy-MM-dd');
      const entry = recentEntries.find(e => format(parseISO(e.date), 'yyyy-MM-dd') === date);
      return {
        date,
        mood: entry?.mood || null,
        energy: entry?.energy || null,
        anxiety: entry?.anxiety || null,
        hasEntry: !!entry
      };
    });

    return { averages, chartData, recentEntries };
  };

  const { averages, chartData, recentEntries } = getProgressData();

  // Calculate trends
  const getTrend = (metric: 'mood' | 'energy' | 'anxiety') => {
    if (recentEntries.length < 2) return 'stable';
    
    const recent = recentEntries.slice(-3);
    const earlier = recentEntries.slice(-6, -3);
    
    if (recent.length === 0 || earlier.length === 0) return 'stable';
    
    const recentAvg = recent.reduce((sum, entry) => sum + entry[metric], 0) / recent.length;
    const earlierAvg = earlier.reduce((sum, entry) => sum + entry[metric], 0) / earlier.length;
    
    const diff = recentAvg - earlierAvg;
    if (Math.abs(diff) < 0.5) return 'stable';
    return diff > 0 ? 'improving' : 'declining';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'declining': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default: return <TrendingUp className="w-4 h-4 text-gray-400 rotate-90" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'text-green-600';
      case 'declining': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getGoalProgress = () => {
    const goals = user.profile?.goals || [];
    return goals.map(goal => {
      let progress = 0;
      let description = '';
      
      switch (goal) {
        case 'Improve mental health':
          progress = Math.min(100, (averages.mood / 10) * 100);
          description = `Average mood: ${averages.mood.toFixed(1)}/10`;
          break;
        case 'Manage stress':
          progress = Math.min(100, ((10 - averages.anxiety) / 10) * 100);
          description = `Anxiety level: ${averages.anxiety.toFixed(1)}/10`;
          break;
        case 'Increase energy':
          progress = Math.min(100, (averages.energy / 10) * 100);
          description = `Average energy: ${averages.energy.toFixed(1)}/10`;
          break;
        case 'Build healthy habits':
          progress = Math.min(100, (recentEntries.length / 7) * 100);
          description = `${recentEntries.length} check-ins this week`;
          break;
        default:
          progress = Math.random() * 60 + 20; // Placeholder progress
          description = 'Making progress';
      }
      
      return { goal, progress, description };
    });
  };

  const goalProgress = getGoalProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <BarChart3 className="w-8 h-8 text-accent-600 mr-3" />
            Progress Tracking
          </h1>
          <p className="text-gray-600">
            Track your wellness progress and achievements.
          </p>
        </motion.div>

        {/* Time Range Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex space-x-2">
            {[
              { value: '7days', label: '7 Days' },
              { value: '30days', label: '30 Days' },
              { value: '90days', label: '90 Days' }
            ].map(option => (
              <Button
                key={option.value}
                variant={timeRange === option.value ? 'primary' : 'outline'}
                onClick={() => setTimeRange(option.value)}
                size="sm"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Overview Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {[
            { 
              title: 'Average Mood', 
              value: averages.mood.toFixed(1), 
              trend: getTrend('mood'),
              icon: <Heart className="w-6 h-6 text-pink-600" />,
              color: 'pink'
            },
            { 
              title: 'Average Energy', 
              value: averages.energy.toFixed(1), 
              trend: getTrend('energy'),
              icon: <Activity className="w-6 h-6 text-green-600" />,
              color: 'green'
            },
            { 
              title: 'Anxiety Level', 
              value: averages.anxiety.toFixed(1), 
              trend: getTrend('anxiety'),
              icon: <TrendingUp className="w-6 h-6 text-orange-600" />,
              color: 'orange'
            }
          ].map((stat, index) => (
            <Card key={stat.title}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <div className={`flex items-center space-x-1 text-sm ${getTrendColor(stat.trend)}`}>
                    {getTrendIcon(stat.trend)}
                    <span className="capitalize">{stat.trend}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {stat.icon}
                </div>
              </div>
            </Card>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mental Health Line Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Heart className="w-5 h-5 text-pink-600 mr-2" />
                  Mental Health Progress
                </h2>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                    <span className="text-gray-600">Mood</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-600">Energy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-gray-600">Anxiety</span>
                  </div>
                </div>
              </div>
              
              {/* Line Chart */}
              <div className="relative h-64 mb-6">
                <svg className="w-full h-full" viewBox="0 0 800 200">
                  {/* Grid lines */}
                  {[0, 25, 50, 75, 100].map((y) => (
                    <line
                      key={y}
                      x1="60"
                      y1={180 - (y * 1.6)}
                      x2="780"
                      y2={180 - (y * 1.6)}
                      stroke="#f3f4f6"
                      strokeWidth="1"
                    />
                  ))}
                  
                  {/* Y-axis labels */}
                  {[0, 2.5, 5, 7.5, 10].map((value, index) => (
                    <text
                      key={value}
                      x="50"
                      y={185 - (index * 40)}
                      textAnchor="end"
                      className="text-xs fill-gray-500"
                    >
                      {value}
                    </text>
                  ))}
                  
                  {/* X-axis labels */}
                  {chartData.slice(-7).map((day, index) => (
                    <text
                      key={day.date}
                      x={80 + (index * 100)}
                      y="195"
                      textAnchor="middle"
                      className="text-xs fill-gray-500"
                    >
                      {format(parseISO(`${day.date}T00:00:00`), 'EEE')}
                    </text>
                  ))}
                  
                  {/* Mood line */}
                  <polyline
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={chartData.slice(-7).map((day, index) => 
                      `${80 + (index * 100)},${180 - ((day.mood || 5) * 16)}`
                    ).join(' ')}
                  />
                  
                  {/* Energy line */}
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={chartData.slice(-7).map((day, index) => 
                      `${80 + (index * 100)},${180 - ((day.energy || 5) * 16)}`
                    ).join(' ')}
                  />
                  
                  {/* Anxiety line (inverted for better visualization) */}
                  <polyline
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={chartData.slice(-7).map((day, index) => 
                      `${80 + (index * 100)},${180 - ((10 - (day.anxiety || 5)) * 16)}`
                    ).join(' ')}
                  />
                  
                  {/* Data points */}
                  {chartData.slice(-7).map((day, index) => (
                    <g key={`${day.date}-points`}>
                      {/* Mood point */}
                      <circle
                        cx={80 + (index * 100)}
                        cy={180 - ((day.mood || 5) * 16)}
                        r="4"
                        fill="#ec4899"
                        stroke="white"
                        strokeWidth="2"
                      />
                      {/* Energy point */}
                      <circle
                        cx={80 + (index * 100)}
                        cy={180 - ((day.energy || 5) * 16)}
                        r="4"
                        fill="#10b981"
                        stroke="white"
                        strokeWidth="2"
                      />
                      {/* Anxiety point */}
                      <circle
                        cx={80 + (index * 100)}
                        cy={180 - ((10 - (day.anxiety || 5)) * 16)}
                        r="4"
                        fill="#f59e0b"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </g>
                  ))}
                </svg>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-pink-50 p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="w-4 h-4 text-pink-600 mr-1" />
                    <span className="text-sm font-medium text-pink-900">Daily Check-ins</span>
                  </div>
                  <p className="text-2xl font-bold text-pink-600">{recentEntries.length}/7</p>
                  <p className="text-xs text-pink-700">This week</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-2">
                    <BarChart3 className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm font-medium text-green-900">Mood Range</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    {recentEntries.length > 0 ? `${Math.min(...recentEntries.map(e => e.mood))}-${Math.max(...recentEntries.map(e => e.mood))}` : '0-0'}
                  </p>
                  <p className="text-xs text-green-700">Points</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Activity className="w-4 h-4 text-orange-600 mr-1" />
                    <span className="text-sm font-medium text-orange-900">Weekly Average</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{averages.mood.toFixed(0)}</p>
                  <p className="text-xs text-orange-700">+{(averages.mood - 5).toFixed(1)} pts</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Fitness Progress Line Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Activity className="w-5 h-5 text-blue-600 mr-2" />
                  Fitness Progress
                </h2>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-gray-600">Workouts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                    <span className="text-gray-600">Duration</span>
                  </div>
                </div>
              </div>
              
              {/* Fitness Line Chart */}
              <div className="relative h-48 mb-4">
                <svg className="w-full h-full" viewBox="0 0 400 150">
                  {/* Grid lines */}
                  {[0, 25, 50, 75, 100].map((y) => (
                    <line
                      key={y}
                      x1="40"
                      y1={130 - (y * 1.2)}
                      x2="380"
                      y2={130 - (y * 1.2)}
                      stroke="#f3f4f6"
                      strokeWidth="1"
                    />
                  ))}
                  
                  {/* Workout intensity line */}
                  <polyline
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="60,100 110,80 160,90 210,70 260,85 310,75 360,80"
                  />
                  
                  {/* Duration line */}
                  <polyline
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="60,110 110,95 160,85 210,90 260,80 310,85 360,75"
                  />
                  
                  {/* Data points */}
                  {[60, 110, 160, 210, 260, 310, 360].map((x, index) => {
                    const workoutY = [100, 80, 90, 70, 85, 75, 80][index];
                    const durationY = [110, 95, 85, 90, 80, 85, 75][index];
                    return (
                      <g key={x}>
                        <circle cx={x} cy={workoutY} r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
                        <circle cx={x} cy={durationY} r="4" fill="#06b6d4" stroke="white" strokeWidth="2" />
                      </g>
                    );
                  })}
                  
                  {/* X-axis labels */}
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <text
                      key={day}
                      x={60 + (index * 50)}
                      y="145"
                      textAnchor="middle"
                      className="text-xs fill-gray-500"
                    >
                      {day}
                    </text>
                  ))}
                </svg>
              </div>
              
              {/* Fitness Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <p className="text-sm font-medium text-blue-900">Weekly Sessions</p>
                  <p className="text-xl font-bold text-blue-600">5/7</p>
                  <p className="text-xs text-blue-700">This week</p>
                </div>
                <div className="bg-cyan-50 p-3 rounded-lg text-center">
                  <p className="text-sm font-medium text-cyan-900">Avg Duration</p>
                  <p className="text-xl font-bold text-cyan-600">28</p>
                  <p className="text-xs text-cyan-700">minutes</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Nutrition Progress Line Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Utensils className="w-5 h-5 text-green-600 mr-2" />
                  Nutrition Progress
                </h2>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-600">Meals</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-gray-600">Hydration</span>
                  </div>
                </div>
              </div>
              
              {/* Nutrition Line Chart */}
              <div className="relative h-48 mb-4">
                <svg className="w-full h-full" viewBox="0 0 400 150">
                  {/* Grid lines */}
                  {[0, 25, 50, 75, 100].map((y) => (
                    <line
                      key={y}
                      x1="40"
                      y1={130 - (y * 1.2)}
                      x2="380"
                      y2={130 - (y * 1.2)}
                      stroke="#f3f4f6"
                      strokeWidth="1"
                    />
                  ))}
                  
                  {/* Meal adherence line */}
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="60,90 110,85 160,95 210,80 260,90 310,95 360,85"
                  />
                  
                  {/* Hydration line */}
                  <polyline
                    fill="none"
                    stroke="#059669"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="60,100 110,90 160,85 210,95 260,80 310,85 360,90"
                  />
                  
                  {/* Data points */}
                  {[60, 110, 160, 210, 260, 310, 360].map((x, index) => {
                    const mealY = [90, 85, 95, 80, 90, 95, 85][index];
                    const hydrationY = [100, 90, 85, 95, 80, 85, 90][index];
                    return (
                      <g key={x}>
                        <circle cx={x} cy={mealY} r="4" fill="#10b981" stroke="white" strokeWidth="2" />
                        <circle cx={x} cy={hydrationY} r="4" fill="#059669" stroke="white" strokeWidth="2" />
                      </g>
                    );
                  })}
                  
                  {/* X-axis labels */}
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <text
                      key={day}
                      x={60 + (index * 50)}
                      y="145"
                      textAnchor="middle"
                      className="text-xs fill-gray-500"
                    >
                      {day}
                    </text>
                  ))}
                </svg>
              </div>
              
              {/* Nutrition Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <p className="text-sm font-medium text-green-900">Meal Plan</p>
                  <p className="text-xl font-bold text-green-600">85%</p>
                  <p className="text-xs text-green-700">Adherence</p>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg text-center">
                  <p className="text-sm font-medium text-emerald-900">Hydration</p>
                  <p className="text-xl font-bold text-emerald-600">7/8</p>
                  <p className="text-xs text-emerald-700">Glasses daily</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Goal Progress */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="w-5 h-5 text-purple-600 mr-2" />
                Goal Progress
              </h2>
              
              <div className="space-y-4">
                {goalProgress.map((goal, index) => (
                  <div key={goal.goal} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900 text-sm">{goal.goal}</h3>
                      <span className="text-sm text-gray-600">{Math.round(goal.progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${goal.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500">{goal.description}</p>
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