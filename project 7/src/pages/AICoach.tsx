import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, ArrowLeft, Brain, Lightbulb, Target, Activity, Utensils, Heart, TrendingUp, Zap, User, Bot, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useUser } from '../contexts/UserContext';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export function AICoach() {
  const navigate = useNavigate();
  const { user, moodEntries } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (!user) {
    return <div>Please log in to access the AI Coach.</div>;
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      type: 'ai',
      content: `Hi ${user.name}! 👋 I'm your AI wellness coach, specialized in fitness, exercise, mental health, and nutrition. I'm here to provide personalized guidance based on your unique needs and goals.

I can help you with:
• **Fitness & Exercise** - Workout plans, form tips, adaptive exercises
• **Mental Health** - Stress management, mood support, coping strategies  
• **Nutrition** - Meal planning, dietary advice, healthy eating habits
• **Wellness Goals** - Creating sustainable habits and tracking progress

What would you like to explore today?`,
      timestamp: new Date(),
      suggestions: [
        'Create a personalized workout plan',
        'Help with meal planning and nutrition',
        'Strategies for managing stress and anxiety',
        'Build healthy daily habits'
      ]
    };
    setMessages([welcomeMessage]);
  }, [user.name]);

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    const profile = user.profile;
    const recentMood = moodEntries.slice(-7);
    const avgMood = recentMood.length > 0 
      ? recentMood.reduce((sum, entry) => sum + entry.mood, 0) / recentMood.length 
      : 5;
    const avgEnergy = recentMood.length > 0 
      ? recentMood.reduce((sum, entry) => sum + entry.energy, 0) / recentMood.length 
      : 5;
    const avgAnxiety = recentMood.length > 0 
      ? recentMood.reduce((sum, entry) => sum + entry.anxiety, 0) / recentMood.length 
      : 5;

    // Elite AI Coach Response System
    
    // Breakthrough mindset reframe first
    let response = "";
    
    // Workout and fitness coaching
    if (message.includes('workout') || message.includes('exercise') || message.includes('fitness')) {
      response = `## 💪 Personalized Fitness Guidance

Based on your profile, here's what I recommend:

**Your Fitness Level:** ${profile?.fitnessLevel || 'Not specified'}

### Recommended Workout Structure:
1. **Warm-up** (5-10 minutes): Light movement to prepare your body
2. **Main Activity** (15-30 minutes): Adapted to your fitness level
3. **Cool-down** (5-10 minutes): Stretching and relaxation

### This Week's Focus:
- Start with 3 sessions of 20-30 minutes each
- Focus on movements that feel good for your body
- Listen to your body and rest when needed`;
      
      if (profile?.physicalLimitations?.length > 0 && !profile.physicalLimitations.includes('None of the above')) {
        response += `\n\n### 🛡️ Adaptive Modifications:
All exercises will be modified for: ${profile.physicalLimitations.join(', ')}
- Chair-based alternatives available
- Low-impact options prioritized
- Gentle progression approach`;
      }
      
      response += `\n\n**What type of exercise interests you most?** (strength training, cardio, yoga, walking, etc.)`;
      return response;
    }

    // Nutrition and energy optimization
    if (message.includes('nutrition') || message.includes('food') || message.includes('eat') || message.includes('meal')) {
      response = `## 🥗 Personalized Nutrition Guidance

Let me help you create a nutrition plan that supports your wellness goals:

### Your Nutrition Foundation:
**Goals:** ${profile?.goals?.join(', ') || 'General wellness'}

### Key Principles:
1. **Balanced Macronutrients**: Protein, healthy fats, and complex carbs
2. **Consistent Timing**: Regular meals to stabilize energy
3. **Hydration**: 8-10 glasses of water daily
4. **Mindful Eating**: Pay attention to hunger and fullness cues

### Foods That Support Mental Health:
- **Omega-3 rich**: Salmon, walnuts, chia seeds
- **Antioxidants**: Berries, dark leafy greens
- **Probiotics**: Yogurt, kefir, fermented foods
- **Complex carbs**: Quinoa, oats, sweet potatoes`;

      if (profile?.dietaryRestrictions?.length > 0) {
        response += `\n\n### 🌱 Dietary Considerations:
I'll make sure all recommendations work with: ${profile.dietaryRestrictions.join(', ')}`;
      }
      
      response += `\n\n**What specific nutrition goals would you like to focus on?** (energy, weight management, meal prep, etc.)`;
      return response;
    }

    // Mental health and emotional mastery
    if (message.includes('mood') || message.includes('feel') || message.includes('sad') || message.includes('anxious') || message.includes('stress')) {
      response = `## 🧠 Mental Health & Emotional Wellness

I understand that mental health is a journey, and I'm here to support you with evidence-based strategies.

### Your Current Patterns:`;
      
      if (recentMood.length > 0) {
        response += `
- **Recent mood average**: ${avgMood.toFixed(1)}/10
- **Energy levels**: ${avgEnergy.toFixed(1)}/10
- **Anxiety levels**: ${avgAnxiety.toFixed(1)}/10`;
      }

      response += `

### Effective Coping Strategies:
1. **Breathing Techniques**: 4-7-8 breathing for immediate calm
2. **Grounding Exercises**: 5-4-3-2-1 sensory technique
3. **Movement**: Even 5 minutes can shift your mental state
4. **Mindfulness**: Present-moment awareness practices

### Building Resilience:
- **Sleep hygiene**: 7-9 hours of quality sleep
- **Social connection**: Regular contact with supportive people
- **Routine**: Consistent daily structure
- **Self-compassion**: Treating yourself with kindness`;

      if (profile?.mentalHealthChallenges?.length > 0 && !profile.mentalHealthChallenges.includes('None of the above')) {
        response += `\n\n### 💙 Personalized Support:
I understand you're working with: ${profile.mentalHealthChallenges.join(', ')}
All strategies will be adapted to support your specific needs.`;
      }
      
      response += `\n\n**What aspect of mental wellness would you like to focus on today?**`;
      return response;
    }

    // Progress and achievement optimization
    if (message.includes('progress') || message.includes('track') || message.includes('pattern')) {
      response = `## 📊 Progress Tracking & Insights

Let me analyze your wellness journey and help you identify patterns:

### Your Tracking History:
- **Total mood entries**: ${moodEntries.length}
- **Current streak**: ${moodEntries.length >= 7 ? '7+ days' : moodEntries.length + ' days'}
- **Average mood**: ${avgMood.toFixed(1)}/10`;

      if (moodEntries.length >= 7) {
        response += `

### Patterns I Notice:
- **Best mood day**: ${format(parseISO(moodEntries.reduce((best, entry) => entry.mood > best.mood ? entry : best).date), 'MMMM dd')}
- **Energy trends**: ${avgEnergy > 6 ? 'Generally good energy levels' : 'Room for energy improvement'}
- **Consistency**: ${moodEntries.length >= 14 ? 'Excellent tracking habits!' : 'Building good tracking habits'}`;
      }
      
      response += `

### Recommendations:
1. **Continue tracking** - You're building valuable self-awareness
2. **Look for patterns** - What activities correlate with better moods?
3. **Celebrate progress** - Acknowledge your commitment to wellness

**What specific patterns would you like me to help you identify?**`;
      return response;
    }

    // Goal achievement and strategic planning
    if (message.includes('goal') || message.includes('plan') || message.includes('help')) {
      response = `## 🎯 Goal Setting & Achievement

Let's create a personalized plan to help you achieve your wellness goals:

### Your Current Goals:`;
      
      if (profile?.goals?.length > 0) {
        response += `
${profile.goals.map(goal => `- ${goal}`).join('\n')}`;
      } else {
        response += `
- Let's identify your wellness priorities together`;
      }

      response += `

### SMART Goal Framework:
1. **Specific**: Clear, well-defined objectives
2. **Measurable**: Track progress with concrete metrics
3. **Achievable**: Realistic given your current situation
4. **Relevant**: Aligned with your values and lifestyle
5. **Time-bound**: Set deadlines for accountability

### Building Sustainable Habits:
- **Start small**: 1% improvements compound over time
- **Stack habits**: Link new behaviors to existing routines
- **Track progress**: Use your mood tracking as a foundation
- **Celebrate wins**: Acknowledge every step forward

### Weekly Planning:
- **Monday**: Set 3 wellness intentions for the week
- **Wednesday**: Mid-week check-in and adjustments
- **Friday**: Reflect on wins and lessons learned`;
      
      response += `\n\n**What's the most important wellness goal you'd like to focus on right now?**`;
      return response;
    }

    // Default elite coaching response
    return `## 🌟 Welcome to Your Wellness Journey

I'm here to provide personalized guidance across all aspects of wellness. Think of me as your knowledgeable companion who understands your unique situation and goals.

### How I Can Help:
🏋️ **Fitness & Exercise**: Custom workout plans, form guidance, adaptive exercises
🥗 **Nutrition**: Meal planning, dietary advice, healthy eating strategies  
🧠 **Mental Health**: Stress management, mood support, coping techniques
📈 **Progress Tracking**: Pattern analysis, goal setting, habit building

### My Approach:
- **Evidence-based**: All advice grounded in research
- **Personalized**: Adapted to your profile and preferences
- **Practical**: Actionable steps you can implement today
- **Supportive**: Non-judgmental, encouraging guidance

### Getting Started:
Simply tell me what's on your mind or what you'd like to work on. I can help with specific questions, create plans, analyze your progress, or just provide support when you need it.

**What would you like to explore today?**`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
        suggestions: [
          'Tell me more',
          'Give me specific steps',
          'What else can help?',
          'Show me examples'
        ]
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <Bot className="w-8 h-8 text-brand-600 mr-3" />
            AI Wellness Coach
          </h1>
          <p className="text-gray-600">
            Get personalized wellness guidance and support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {/* Chat Interface */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-[700px] flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-2xl px-4 py-3 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white ml-12'
                            : 'bg-gray-100 text-gray-900 mr-12'
                        }`}
                      >
                        {message.type === 'ai' && (
                          <div className="flex items-center space-x-2 mb-2">
                            <Bot className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-semibold text-blue-600">AI Coach</span>
                          </div>
                        )}
                        <div className="text-sm leading-relaxed whitespace-pre-line">
                          {message.content}
                        </div>
                        
                        {message.suggestions && (
                          <div className="mt-3 space-y-2">
                            {message.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="block w-full text-left px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs transition-colors border border-white/20"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                        <div className="flex items-center space-x-2">
                          <Bot className="w-4 h-4 text-blue-600" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-gray-200 p-4">
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask me anything about fitness, nutrition, mental health, or wellness..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="px-6 py-3 rounded-full flex items-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
            
            {/* Quick Start Suggestions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6"
            >
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">Try asking me about:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Create a workout plan', 'Healthy meal ideas', 'Stress management tips', 'Building better habits', 'Tracking progress', 'Motivation strategies'].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(suggestion)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}