import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Search, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function HelpCenter() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I reset my password?",
          answer: "To reset your password, go to the login page and click 'Forgot password?' Enter your email address and we'll send you a reset link. Check your spam folder if you don't see the email within a few minutes."
        },
        {
          question: "How do I complete the onboarding process?",
          answer: "After signing up, you'll be guided through a 4-step onboarding process: Personal Information, Mental Health Assessment, Physical Assessment, and Goals & Preferences. You can save your progress and return later if needed."
        },
        {
          question: "Is Mind & Motion really free?",
          answer: "Yes! Our core features including AI coaching, basic mood tracking, adaptive exercises, and community support are completely free forever. Premium features like advanced analytics and 1-on-1 coaching are available with paid plans."
        }
      ]
    },
    {
      category: "Using the Platform",
      questions: [
        {
          question: "How do I track my wellness progress?",
          answer: "Use the mood tracking feature to log your daily emotional state, energy levels, and anxiety. Your progress is automatically visualized in charts and insights on your dashboard and progress tracking page."
        },
        {
          question: "Can I modify my workout plans?",
          answer: "Absolutely! All workout plans are personalized based on your profile. You can adjust difficulty, skip exercises that don't work for you, and our AI will adapt future recommendations based on your preferences and feedback."
        },
        {
          question: "How does the AI coaching work?",
          answer: "Our AI analyzes your profile, mood patterns, and progress to provide personalized recommendations for exercises, nutrition, and wellness activities. It learns from your feedback and adapts to your changing needs over time."
        }
      ]
    },
    {
      category: "Accessibility",
      questions: [
        {
          question: "What accessibility features are available?",
          answer: "Mind & Motion includes voice commands, screen reader compatibility, large text options, high contrast modes, keyboard navigation, and adaptive exercises for various physical abilities. All features meet WCAG 2.1 AA standards."
        },
        {
          question: "Can I use the app with mobility limitations?",
          answer: "Yes! Our exercises are specifically designed to be adaptable. We offer chair-based workouts, gentle movements, and modifications for various mobility levels. During onboarding, specify your limitations and we'll customize everything accordingly."
        },
        {
          question: "Is there support for visual or hearing impairments?",
          answer: "Yes, we support screen readers, provide audio descriptions for visual content, offer text alternatives for audio content, and include adjustable font sizes and contrast settings."
        }
      ]
    },
    {
      category: "Account & Billing",
      questions: [
        {
          question: "How do I cancel my subscription?",
          answer: "You can cancel your subscription anytime from your account settings. Go to Dashboard > Account Settings > Subscription and click 'Cancel Plan'. You'll retain access until the end of your billing period."
        },
        {
          question: "What's included in the free vs paid plans?",
          answer: "Free includes AI coaching, basic mood tracking, adaptive exercises, and community support. Pro adds advanced analytics, meal plans, and video workouts. Max includes 1-on-1 coaching, nutritionist consultations, and 24/7 crisis support."
        },
        {
          question: "Do you offer refunds?",
          answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact support within 30 days of your purchase for a full refund."
        }
      ]
    },
    {
      category: "Privacy & Safety",
      questions: [
        {
          question: "How is my health data protected?",
          answer: "We use enterprise-grade encryption, comply with HIPAA standards, and never sell your personal data. Your health information is stored securely and only used to improve your wellness experience."
        },
        {
          question: "What happens in a mental health crisis?",
          answer: "The app provides wellness tracking and AI coaching for general support. For serious mental health concerns, we recommend consulting with qualified healthcare professionals in your area."
        },
        {
          question: "Can I delete my account and data?",
          answer: "Yes, you can permanently delete your account and all associated data from Account Settings. This action is irreversible and will remove all your progress, mood entries, and personal information."
        }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <HelpCircle className="w-16 h-16 text-brand-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
              Help Center
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about using Mind & Motion for your wellness journey.
            </p>
          </div>
        </motion.div>

        {/* Search */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors"
              />
            </div>
          </Card>
        </motion.section>

        {/* FAQs */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {filteredFaqs.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No results found for "{searchTerm}". Try different keywords or browse all categories below.
              </p>
            </Card>
          ) : (
            <div className="space-y-8">
              {filteredFaqs.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + categoryIndex * 0.1 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">
                    {category.category}
                  </h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 100 + faqIndex;
                      return (
                        <Card key={faqIndex} className="hover:shadow-md transition-all duration-300">
                          <button
                            onClick={() => toggleFaq(globalIndex)}
                            className="w-full text-left flex items-center justify-between p-2"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 pr-4">
                              {faq.question}
                            </h3>
                            {expandedFaq === globalIndex ? (
                              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            )}
                          </button>
                          
                          {expandedFaq === globalIndex && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t border-gray-100 pt-4 mt-2"
                            >
                              <p className="text-gray-700 leading-relaxed">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Contact Support */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-br from-brand-50 to-accent-50 border-brand-200 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">
              Still Need Help?
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you 
              with any questions about using Mind & Motion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/contact')}
                className="bg-brand-600 hover:bg-brand-700"
              >
                Contact Support
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = 'mailto:support@mindandmotion.com'}
              >
                Email Us
              </Button>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}