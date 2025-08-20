import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Users, Target, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function About() {
  const navigate = useNavigate();

  const founders = [
    {
      name: "Sameer Alazeez",
      role: "Founder & CEO",
      background: "Trauma Survivor, Student of Human Movement & Psychology",
      story: "After surviving a car explosion, 22 surgeries, and ISIS captivity, Sameer found that traditional wellness apps weren't built for people like him. He created ReNova to provide adaptive wellness that meets survivors where they are, not where they should be."
    }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Compassion First",
      description: "Every feature is designed with empathy, understanding that wellness journeys are deeply personal and often challenging."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Radical Inclusion",
      description: "We build for everyone - regardless of mental health status, physical ability, age, or background. No one is left behind."
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-500" />,
      title: "Evidence-Based",
      description: "Our AI is trained on peer-reviewed research in psychology, nutrition, and adaptive fitness to provide scientifically sound guidance."
    },
    {
      icon: <Target className="w-8 h-8 text-green-500" />,
      title: "Progress Over Perfection",
      description: "We celebrate small wins and understand that wellness isn't linear. Every step forward matters, no matter how small."
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
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
            About Mind & Motion
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            AI-powered wellness for people with mental health challenges and physical disabilities.
          </p>
        </motion.div>

        {/* Origin Story */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-br from-brand-50 to-accent-50 border-brand-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">Why I Built This</h2>
            <div className="text-gray-700">
              <p className="mb-3">
                Traditional wellness apps weren't built for trauma survivors and people with disabilities.
              </p>
              <p className="mb-3">
                After surviving a car explosion in 2012, 22 surgeries, and seven months in ISIS captivity, 
                I experienced this gap firsthand when I arrived in Australia.
              </p>
              <p>
                I created ReNova — an AI-powered wellness app that adapts to each person's unique trauma, 
                celebrates small victories, and understands that healing isn't linear.
              </p>
            </div>
          </Card>
        </motion.section>

        {/* Founders */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-display">Meet Our Founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="text-center mb-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-brand-100 to-accent-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-brand-600">
                        {founder.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{founder.name}</h3>
                    <p className="text-brand-600 font-semibold">{founder.role}</p>
                    <p className="text-sm text-gray-600 mb-4">{founder.background}</p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{founder.story}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Vision Statement */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-display">My Vision</h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              I envision a world where trauma survivors, people with disabilities, and anyone who has been broken 
              can find wellness tools that truly understand their journey. Where healing is honored over perfection, 
              where adaptation is celebrated, and where every person — no matter how dark their past — 
              can find their way back to light.
            </p>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}