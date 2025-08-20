import React from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, Users, Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function Mission() {
  const navigate = useNavigate();

  const impacts = [
    {
      icon: <Heart className="w-12 h-12 text-red-500" />,
      title: "Mental Health Support",
      description: "Providing 24/7 AI-powered emotional support and evidence-based coping strategies for depression, anxiety, PTSD, and other mental health challenges.",
      stats: "Supporting 10,000+ people daily"
    },
    {
      icon: <Shield className="w-12 h-12 text-green-500" />,
      title: "Accessibility First",
      description: "Creating adaptive technology that works for people with mobility limitations, chronic conditions, visual or hearing impairments, and other disabilities.",
      stats: "100% accessible design standards"
    },
    {
      icon: <Users className="w-12 h-12 text-blue-500" />,
      title: "Inclusive Community",
      description: "Building a supportive community where everyone feels welcome, understood, and celebrated for their unique wellness journey.",
      stats: "Zero tolerance for discrimination"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-6 flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
          
          <div className="text-center">
            <Target className="w-16 h-16 text-brand-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
              Our Mission & Values
            </h1>
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-br from-brand-50 to-accent-50 border-brand-200 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-display">
                Making wellness accessible through technology.
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
                Mind & Motion exists to provide AI-powered wellness support that understands your unique 
                mental health challenges and physical abilities, helping you build healthier habits one day at a time.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Through our app, we're creating a world where mental health challenges and physical disabilities 
                don't prevent anyone from accessing personalized wellness support that celebrates every small victory.
              </p>
            </div>
          </Card>
        </motion.section>

        {/* The Problem We're Solving */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-display">
            The Problem We're Solving
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-red-50 border-red-200">
              <h3 className="text-xl font-bold text-red-900 mb-4">Mental Health Crisis</h3>
              <ul className="space-y-2 text-red-800">
                <li>• 1 in 4 people experience mental health issues</li>
                <li>• Limited access to personalized support</li>
                <li>• Stigma prevents many from seeking help</li>
                <li>• Traditional therapy is expensive and inaccessible</li>
              </ul>
            </Card>
            
            <Card className="bg-orange-50 border-orange-200">
              <h3 className="text-xl font-bold text-orange-900 mb-4">Accessibility Gaps</h3>
              <ul className="space-y-2 text-orange-800">
                <li>• 1 billion people live with disabilities</li>
                <li>• Most wellness apps ignore accessibility</li>
                <li>• Physical limitations exclude many from fitness</li>
                <li>• One-size-fits-all solutions don't work</li>
              </ul>
            </Card>
            
            <Card className="bg-yellow-50 border-yellow-200">
              <h3 className="text-xl font-bold text-yellow-900 mb-4">Fragmented Care</h3>
              <ul className="space-y-2 text-yellow-800">
                <li>• Mental and physical health treated separately</li>
                <li>• No personalized, holistic approach</li>
                <li>• Lack of 24/7 support when needed most</li>
                <li>• Complex systems are hard to navigate</li>
              </ul>
            </Card>
          </div>
        </motion.section>

        {/* Our Impact */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-display">
            How We're Making a Difference
          </h2>
          <div className="space-y-8">
            {impacts.map((impact, index) => (
              <motion.div
                key={impact.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                    <div className="flex-shrink-0">
                      {impact.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{impact.title}</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">{impact.description}</p>
                      <div className="inline-block bg-gradient-to-r from-brand-100 to-accent-100 text-brand-800 px-4 py-2 rounded-full text-sm font-semibold">
                        {impact.stats}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-display">Join Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
              Every person who joins Mind & Motion helps us build a more inclusive, compassionate world 
              where wellness is truly accessible to everyone. Together, we can break down barriers and 
              create lasting change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700"
              >
                Start Your Wellness Journey
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/careers')}
              >
                Join Our Team
              </Button>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}