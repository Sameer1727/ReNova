import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Heart, Users, Shield, Smartphone, Activity, Star, CheckCircle, ArrowRight, Play, Award, Zap, Target, MessageCircle, BarChart3, Headphones } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const pillBadges = [
  { text: "Trauma-Informed", color: "bg-blue-100 text-blue-800" },
  { text: "Disability-Friendly", color: "bg-green-100 text-green-800" },
  { text: "Evidence-Based", color: "bg-purple-100 text-purple-800" },
  { text: "Always Free Core", color: "bg-gold-100 text-gold-800" }
];

export function Landing() {
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'annual'>('monthly');
  const [showStoryModal, setShowStoryModal] = React.useState(false);
  const [hoveredPill, setHoveredPill] = React.useState(null);


  const currentPricing = {
    pro: {
      price: billingCycle === 'monthly' ? 19.99 : 15.99,
      originalPrice: billingCycle === 'annual' ? 19.99 : undefined,
      period: billingCycle === 'monthly' ? 'month' : 'month',
      savings: '$48'
    },
    max: {
      price: billingCycle === 'monthly' ? 39.99 : 31.99,
      originalPrice: billingCycle === 'annual' ? 39.99 : undefined,
      period: billingCycle === 'monthly' ? 'month' : 'month',
      savings: '$96'
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/20 via-transparent to-violet-100/20" />
        <div className="absolute top-0 left-0 w-32 sm:w-72 h-32 sm:h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute top-0 right-0 w-32 sm:w-72 h-32 sm:h-72 bg-violet-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="relative z-10">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight font-display mb-4 sm:mb-6"
              >
                Wellness That Adapts to
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                  You
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed"
              >
                Mental Health, Physical Challenges, Real Life. 
                <span className="block mt-2 font-medium text-gray-700">
                  Simple. Inclusive. Built by someone who gets it.
                </span>
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12"
              >
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                    <span>Start Your Free Plan</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto text-lg px-8 py-4 border-2 border-indigo-300 text-indigo-700 hover:bg-indigo-50 transition-all duration-200"
                  onClick={() => {
                    const featuresSection = document.getElementById('features-section');
                    if (featuresSection) {
                      featuresSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <Play className="w-5 h-5 mr-2" />
                  <span>See How ReNova Works</span>
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-sm text-gray-600"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Free forever plan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>10,000+ people helped</span>
                </div>
              </motion.div>
            </div>

            
            
            {/* Desktop only: Support Line */}
            <div className="hidden sm:block">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-gray-600 text-center mb-4 max-w-lg mx-auto"
              >
                Simple. Inclusive.{' '}
                <button
                  onClick={() => setShowStoryModal(true)}
                  className="text-indigo-600 hover:text-indigo-700 font-medium underline decoration-2 underline-offset-2 transition-colors"
                >
                  Built by someone who gets it
                </button>
                .
              </motion.p>
            </div>


            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                {/* Main Dashboard Mockup */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Brain className="w-6 h-6 text-indigo-600" />
                      <span className="font-semibold text-gray-900">Welcome back, Sarah! 👋</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-pink-50 p-3 rounded-lg">
                        <Heart className="w-5 h-5 text-pink-600 mb-1" />
                        <div className="text-sm font-medium text-gray-900">Mood: 7.2/10</div>
                        <div className="text-xs text-gray-600 hidden sm:block">Trending up</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <Activity className="w-5 h-5 text-green-600 mb-1" />
                        <div className="text-sm font-medium text-gray-900">12-day streak</div>
                        <div className="text-xs text-gray-600 hidden sm:block">Keep it up!</div>
                      </div>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-lg">
                      <div className="text-sm font-medium text-indigo-900 mb-2">Today's Adaptive Workout</div>
                      <div className="text-xs text-indigo-700">Chair yoga • 15 min • Gentle</div>
                    </div>
                  </div>
                </div>

                {/* Floating Mood Tracker */}
                <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center space-x-1 sm:space-x-2 mb-2">
                    <Heart className="w-4 h-4 text-pink-600" />
                    <span className="text-sm font-medium">Quick Check-in</span>
                  </div>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={`w-6 h-6 rounded-full ${i <= 4 ? 'bg-pink-400' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                </div>

                {/* Floating AI Coach */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center space-x-1 sm:space-x-2 mb-2">
                    <MessageCircle className="w-4 h-4 text-violet-600" />
                    <span className="text-sm font-medium">AI Coach</span>
                  </div>
                  <div className="text-xs text-gray-600 max-w-32">
                    "Great progress this week! Ready for today's gentle movement?"
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Founder Story Ribbon */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌟</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Rebirth of Light</h2>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed px-4">
              Created by Sameer after surviving a car explosion in Northern Iraq and ISIS captivity.
              <span className="block mt-2 font-medium">
                ReNova means a star that shines brighter after collapse — because true wellness addresses the whole person, not just symptoms.
              </span>
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Core Features - 3 Pillars */}
      <section id="features-section" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 font-display">
              Three Pillars of Adaptive Wellness
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Everything you need for mental and physical wellness, designed for real life challenges.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: <Brain className="w-12 h-12 text-indigo-600" />,
                title: 'AI-Driven Personalization',
                description: 'Intelligent system that learns from your unique circumstances and adapts to your recovery goals, abilities, and daily needs.',
                features: ['Learns your patterns', 'Adapts to your abilities', 'Tailored recommendations', 'Continuous refinement'],
                mockup: (
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <MessageCircle className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm font-medium text-indigo-900">AI Coach</span>
                    </div>
                    <div className="text-sm text-indigo-800 mb-2">
                      "Based on your progress, I've adjusted today's routine to match your energy levels and recovery goals."
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-xs bg-indigo-200 text-indigo-800 px-2 py-1 rounded">Perfect</button>
                      <button className="text-xs bg-indigo-200 text-indigo-800 px-2 py-1 rounded">Adjust</button>
                    </div>
                  </div>
                )
              },
              {
                icon: <Shield className="w-12 h-12 text-green-600" />,
                title: 'Holistic Wellness Integration',
                description: 'Mental health, fitness, and nutrition work together as an interconnected system for complete well-being.',
                features: ['Mental health check-ins', 'Adaptive fitness plans', 'Healing nutrition', 'Progress connections'],
                mockup: (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <Heart className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-900">Holistic Wellness</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-green-800">Mental health tracking</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-green-800">Adaptive fitness plans</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-green-800">Healing nutrition plans</span>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                icon: <Users className="w-12 h-12 text-violet-600" />,
                title: 'Encouraging Progress Tracking',
                description: 'Visual insights that celebrate small victories and show connections between your wellness activities over time.',
                features: ['Visual progress graphs', 'Connection insights', 'Small victory celebrations', 'Encouraging feedback'],
                mockup: (
                  <div className="bg-violet-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <BarChart3 className="w-5 h-5 text-violet-600" />
                      <span className="text-sm font-medium text-violet-900">Your Progress</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-violet-800">Wellness connection</span>
                        <span className="text-xs font-medium text-violet-900">7.2/10 ↗️</span>
                      </div>
                      <div className="w-full bg-violet-200 rounded-full h-2">
                        <div className="bg-violet-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                      <div className="text-xs text-violet-700">Small victories adding up! 🌟</div>
                    </div>
                  </div>
                )
              }
            ].map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group-hover:scale-105">
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="flex justify-center mb-4">
                      {pillar.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 font-display">
                      {pillar.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Feature List */}
                  <div className="mb-4 sm:mb-6">
                    <ul className="space-y-2">
                      {pillar.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Interactive Mockup */}
                  <div className="mt-auto">
                    {pillar.mockup}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50/30"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-0">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 font-display">
              Designed for Your Journey
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              ReNova understands that everyone's wellness journey is unique. We provide personalized care for people who need that extra layer of support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8 text-red-500" />,
                title: 'Mental Health Challenges',
                description: 'Compassionate support for PTSD, depression, anxiety, and emotional healing with daily check-ins and reflection tools.',
                stats: '2,847 people finding balance',
                color: 'red'
              },
              {
                icon: <Brain className="w-8 h-8 text-blue-500" />,
                title: 'Chronic Pain & Recovery',
                description: 'Adaptive wellness plans that work with your body\'s limitations and recovery timeline, not against them.',
                stats: '1,923 people rebuilding strength',
                color: 'blue'
              },
              {
                icon: <Shield className="w-8 h-8 text-green-500" />,
                title: 'Building Healthy Habits',
                description: 'Gentle guidance for creating sustainable wellness routines that fit your life and energy levels.',
                stats: '4,156 people creating lasting change',
                color: 'green'
              },
              {
                icon: <Users className="w-8 h-8 text-purple-500" />,
                title: 'Trauma Recovery',
                description: 'Understanding approach that recognizes trauma\'s impact on the whole person - mind, body, and spirit.',
                stats: '892 people reclaiming hope',
                color: 'purple'
              }
            ].map((audience, index) => (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`h-full hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-${audience.color}-50 to-${audience.color}-100/50 border-${audience.color}-200`}>
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 sm:p-3 bg-${audience.color}-100 rounded-lg flex-shrink-0`}>
                      {audience.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{audience.title}</h3>
                      <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">{audience.description}</p>
                      <div className={`inline-block bg-${audience.color}-200 text-${audience.color}-800 px-3 py-1 rounded-full text-sm font-medium`}>
                        {audience.stats}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials with Photos */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-0">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 font-display">
              Stories of Renewal
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Real people, real progress, real hope.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                quote: "ReNova doesn't just track my workouts - it understands that some days I need gentle movement, and other days I can push harder. It adapts with me.",
                author: "Sarah M.",
                condition: "Chronic Pain Recovery",
                avatar: "👩‍💼",
                rating: 5
              },
              {
                quote: "The way ReNova connects my nutrition, exercise, and mental health has been eye-opening. I finally see how everything works together.",
                author: "Marcus T.",
                condition: "Holistic Wellness Journey",
                avatar: "👨‍🦽",
                rating: 5
              },
              {
                quote: "The progress tracking celebrates my small wins instead of making me feel behind. It's exactly the encouragement I needed.",
                author: "Alex R.",
                condition: "Mental Health & Fitness",
                avatar: "🧑‍🎨",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col h-full">
                    {/* Rating */}
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <blockquote className="text-gray-700 leading-relaxed mb-4 sm:mb-6 flex-grow text-base sm:text-lg">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    {/* Author */}
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-full flex items-center justify-center text-xl sm:text-2xl">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.author}</div>
                        <div className="text-xs sm:text-sm text-gray-500">{testimonial.condition}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Enhanced Pricing Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-gradient-to-br from-indigo-50 to-violet-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-0">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 font-display">
              Choose Your Wellness Journey
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Start free and upgrade when you're ready. Every plan respects your independence 
              while providing the adaptive tools you need.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center mt-8 mb-8">
              <div className="bg-white rounded-full p-1 flex items-center shadow-lg">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 sm:px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-4 sm:px-6 py-2 rounded-full text-sm font-semibold transition-all relative ${
                    billingCycle === 'annual'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Annual
                  <span className="absolute -top-2 -right-1 sm:-right-2 bg-green-500 text-white text-xs px-1 sm:px-2 py-0.5 rounded-full">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full bg-white border-2 border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 font-display">Free</h3>
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">$0</div>
                  <p className="text-gray-600">Forever free</p>
                </div>
                
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">AI-powered wellness coaching</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Daily mood & energy tracking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Adaptive exercise plans</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Community support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Basic progress tracking</span>
                  </li>
                </ul>
                
                <Link to="/signup" className="block">
                  <Button variant="outline" className="w-full group-hover:bg-indigo-50 group-hover:border-indigo-400">
                    Start Free
                  </Button>
                </Link>
              </Card>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Most Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Most Popular
                </span>
              </div>
              
              <Card className="h-full bg-gradient-to-br from-indigo-50 to-violet-50 border-2 border-indigo-500 hover:shadow-2xl transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 hidden sm:block"></div>
                
                <div className="text-center mb-6 relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 font-display">Pro</h3>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {billingCycle === 'annual' && (
                      <span className="text-base sm:text-lg text-gray-400 line-through">${currentPricing.pro.originalPrice?.toFixed(2)}</span>
                    )}
                    <div className="text-3xl sm:text-4xl font-bold text-gray-900">${typeof currentPricing.pro.price === 'number' ? currentPricing.pro.price.toFixed(2) : currentPricing.pro.price}</div>
                  </div>
                  <p className="text-gray-600">per {currentPricing.pro.period}</p>
                  {billingCycle === 'annual' && (
                    <p className="text-sm text-green-600 font-semibold">Save {currentPricing.pro.savings} annually</p>
                  )}
                </div>
                
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">✨ Everything in Free, plus:</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Advanced progress analytics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Personalized meal plans</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Video exercise demonstrations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Priority AI coaching</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Export health reports</span>
                  </li>
                </ul>
                
                <Link to="/signup" className="block">
                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-lg hover:shadow-xl">
                    Start Pro Trial
                  </Button>
                </Link>
              </Card>
            </motion.div>

            {/* Max Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Best Value Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Best Value
                </span>
              </div>
              
              <Card className="h-full bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-500 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 font-display">Max</h3>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {billingCycle === 'annual' && (
                      <span className="text-base sm:text-lg text-gray-400 line-through">${currentPricing.max.originalPrice?.toFixed(2)}</span>
                    )}
                    <div className="text-3xl sm:text-4xl font-bold text-gray-900">${typeof currentPricing.max.price === 'number' ? currentPricing.max.price.toFixed(2) : currentPricing.max.price}</div>
                  </div>
                  <p className="text-gray-600">per {currentPricing.max.period}</p>
                  {billingCycle === 'annual' && (
                    <p className="text-sm text-green-600 font-semibold">Save {currentPricing.max.savings} annually</p>
                  )}
                </div>
                
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-violet-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">👑 Everything in Pro, plus:</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-violet-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">1-on-1 coaching sessions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-violet-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">24/7 crisis support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-violet-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Nutritionist consultations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-violet-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Custom workout creation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-violet-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm sm:text-base">Family account sharing</span>
                  </li>
                </ul>
                
                <Link to="/signup" className="block">
                  <Button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl">
                    Start Max Trial
                  </Button>
                </Link>
              </Card>
            </motion.div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">All paid plans include a 14-day free trial. Cancel anytime.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA Banner */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            className="py-8 sm:py-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-4xl">🌟</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white font-display">
                Your Renewal Starts Today
              </h2>
            </div>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              Join thousands rebuilding their lives holistically with ReNova.
              <span className="block mt-2 font-medium">
                More than an app — your companion for lasting change.
              </span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-gray-50 text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200">
                  <span className="flex items-center space-x-3">
                    <span>Start Your Free Plan</span>
                    <ArrowRight className="w-6 h-6" />
                  </span>
                </Button>
              </Link>
              <div className="text-white/80 text-base sm:text-lg text-center sm:text-left">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Free forever • No credit card</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>10,000+ people helped</span>
                </div>
              </div>
            </div>
            
            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 text-white/70">
              <div className="flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span>4.9/5 from 2,847 reviews</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base">
                <Award className="w-5 h-5 text-yellow-400" />
                <span>Best Accessibility App 2024</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base">
                <Heart className="w-5 h-5 text-red-400" />
                <span>Evidence-based & user-focused</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="w-8 h-8 text-indigo-400" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold font-display">ReNova</span>
                  <span className="text-sm text-gray-400 -mt-1 italic">Rebirth of Light</span>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md text-sm sm:text-base">
                AI-driven wellness that integrates mental health, fitness, and nutrition into a seamless, personalized experience for lasting change.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">We're Hiring</Link></li>
                <li><Link to="/press" className="hover:text-white transition-colors">In the News</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><a href="mailto:support@renova.com" className="hover:text-white transition-colors">Email Support</a></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © 2025 ReNova. All rights reserved.
            </p>
            <p className="text-gray-400 text-xs sm:text-sm mt-4 md:mt-0 text-center md:text-right">
              Made with ❤️ for holistic healing and lasting change. Your companion for renewal.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Our Story Modal */}
      {showStoryModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowStoryModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 font-display">Our Story</h3>
              <button
                onClick={() => setShowStoryModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌟</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Sameer Alazeez</h4>
                  <p className="text-gray-600">Founder & CEO</p>
                </div>
              </div>
              
              <p className="text-base sm:text-lg">
                After surviving a car explosion in Northern Iraq in 2012, 22 surgeries, and seven months 
                in ISIS captivity, I arrived in Australia broken but determined to rebuild.
              </p>
              
              <p>
                Traditional wellness apps weren't built for people like me. They assumed linear progress, 
                perfect adherence, and bodies that worked predictably. They celebrated streaks but 
                punished setbacks. They offered one-size-fits-all solutions to deeply personal struggles.
              </p>
              
              <p>
                <strong>ReNova</strong> means "a star that shines brighter after collapse." I created it 
                because true wellness isn't about perfection—it\'s about adaptation, compassion, and 
                understanding that healing isn't linear.
              </p>
              
              <p>
                Every feature in ReNova comes from lived experience: the gentle check-ins that don't 
                judge missed days, the adaptive workouts that work with your pain, the AI that learns 
                your patterns without demanding explanations.
              </p>
              
              <div className="bg-gradient-to-r from-indigo-50 to-violet-50 p-4 rounded-lg border border-indigo-200">
                <p className="font-medium text-indigo-900">
                  "This isn't just an app—it's a companion for anyone who's been broken and is finding 
                  their way back to light."
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/about" onClick={() => setShowStoryModal(false)}>
                <Button className="w-full sm:w-auto">
                  Learn More About Our Mission
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={() => setShowStoryModal(false)}
                className="w-full sm:w-auto"
              >
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}