import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Download, Mail, ArrowLeft, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function Press() {
  const navigate = useNavigate();

  const mediaFeatures = [
    {
      outlet: "TechCrunch",
      title: "Mind & Motion Raises $5M to Make Wellness Accessible for People with Disabilities",
      date: "March 15, 2024",
      type: "Funding News",
      link: "#",
      excerpt: "The AI-powered wellness platform is breaking barriers in digital health by prioritizing accessibility and mental health support."
    },
    {
      outlet: "Forbes",
      title: "The Future of Inclusive Wellness: How AI is Adapting to Individual Needs",
      date: "February 28, 2024",
      type: "Feature Article",
      link: "#",
      excerpt: "Mind & Motion's approach to personalized wellness coaching is setting new standards for accessibility in health tech."
    },
    {
      outlet: "Disability Scoop",
      title: "New App Provides Adaptive Fitness Solutions for People with Disabilities",
      date: "January 20, 2024",
      type: "Product Review",
      link: "#",
      excerpt: "Finally, a wellness app that truly understands and adapts to the needs of people with various disabilities and chronic conditions."
    },
    {
      outlet: "Mental Health Today",
      title: "Breaking Down Barriers: AI-Powered Mental Health Support Goes Mainstream",
      date: "December 10, 2023",
      type: "Industry Analysis",
      link: "#",
      excerpt: "How Mind & Motion is making mental health support more accessible through compassionate AI technology."
    }
  ];

  const awards = [
    {
      title: "Best Accessibility Innovation",
      organization: "Digital Health Awards 2024",
      date: "2024"
    },
    {
      title: "Top Mental Health App",
      organization: "HealthTech Breakthrough Awards",
      date: "2024"
    },
    {
      title: "Inclusive Design Excellence",
      organization: "Webby Awards",
      date: "2023"
    }
  ];

  const pressKit = [
    {
      title: "Company Logo Package",
      description: "High-resolution logos in various formats (PNG, SVG, EPS)",
      size: "2.3 MB"
    },
    {
      title: "Founder Photos & Bios",
      description: "Professional headshots and detailed biographies",
      size: "5.1 MB"
    },
    {
      title: "Product Screenshots",
      description: "App interface screenshots and feature demonstrations",
      size: "8.7 MB"
    },
    {
      title: "Company Fact Sheet",
      description: "Key statistics, milestones, and company information",
      size: "156 KB"
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
            <Newspaper className="w-16 h-16 text-brand-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
              Mind & Motion in the News
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              See what people are saying about our AI-powered wellness app and our mission 
              to make mental and physical health support accessible to everyone.
            </p>
          </div>
        </motion.div>

        {/* Press Contact */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-br from-brand-50 to-accent-50 border-brand-200">
            <div className="text-center">
              <Mail className="w-12 h-12 text-brand-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">Press Inquiries</h2>
              <p className="text-gray-700 mb-6">
                For media inquiries, interview requests, or additional information, please contact:
              </p>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-900">Sarah Chen, CEO & Co-Founder</p>
                <a 
                  href="mailto:press@mindandmotion.com" 
                  className="text-brand-600 hover:text-brand-700 font-semibold text-lg"
                >
                  press@mindandmotion.com
                </a>
                <p className="text-gray-600">Response time: Within 24 hours</p>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Recent Coverage */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-display">
            Recent Media Coverage
          </h2>
          <div className="space-y-6">
            {mediaFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {feature.outlet}
                        </span>
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                          {feature.type}
                        </span>
                        <span className="text-gray-500 text-sm">{feature.date}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">{feature.excerpt}</p>
                    </div>
                    
                    <div className="mt-4 lg:mt-0 lg:ml-6 flex-shrink-0">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(feature.link, '_blank')}
                        className="flex items-center space-x-2"
                      >
                        <span>Read Article</span>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Awards & Recognition */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-display">
            Awards & Recognition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Card className="text-center h-full bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                  <div className="text-4xl mb-4">🏆</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{award.title}</h3>
                  <p className="text-gray-700 mb-2">{award.organization}</p>
                  <p className="text-sm text-gray-500">{award.date}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Press Kit */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-display">
              Press Kit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pressKit.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="bg-white rounded-lg p-6 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700 text-sm mb-3">{item.description}</p>
                      <p className="text-xs text-gray-500">{item.size}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="ml-4 flex items-center space-x-2"
                      onClick={() => alert('Download will be available soon!')}
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-700 mb-4">
                Need additional assets or have specific requirements?
              </p>
              <Button 
                onClick={() => window.location.href = 'mailto:press@mindandmotion.com?subject=Press Kit Request'}
              >
                Contact Press Team
              </Button>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}