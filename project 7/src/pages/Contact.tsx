import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Phone, MapPin, ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'support'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactTypes = [
    { value: 'support', label: 'General Support', description: 'Questions about using the platform' },
    { value: 'technical', label: 'Technical Issue', description: 'Bug reports or technical problems' },
    { value: 'billing', label: 'Billing & Account', description: 'Subscription and payment questions' },
    { value: 'accessibility', label: 'Accessibility', description: 'Accessibility features and support' },
    { value: 'press', label: 'Press Inquiry', description: 'Media and press-related questions' },
    { value: 'partnership', label: 'Partnership', description: 'Business partnerships and collaborations' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 flex items-center justify-center py-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md mx-auto px-4"
        >
          <Card className="text-center">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h2>
            <p className="text-gray-700 mb-6">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={() => navigate('/')} className="flex-1">
                Back to Home
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                    type: 'support'
                  });
                }}
                className="flex-1"
              >
                Send Another
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

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
            <MessageCircle className="w-16 h-16 text-brand-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're here to help! Reach out with any questions, feedback, or support needs.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">Send us a message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      What can we help you with?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {contactTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${
                            formData.type === type.value
                              ? 'border-brand-500 bg-brand-50'
                              : 'border-gray-200 hover:border-brand-300'
                          }`}
                        >
                          <div className="font-medium text-gray-900 text-sm">{type.label}</div>
                          <div className="text-xs text-gray-600 mt-1">{type.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors resize-none"
                      placeholder="Please provide as much detail as possible..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-brand-50 to-accent-50 border-brand-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">Get in Touch</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-brand-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Email Support</p>
                      <a 
                        href="mailto:support@mindandmotion.com" 
                        className="text-brand-600 hover:text-brand-700"
                      >
                        support@mindandmotion.com
                      </a>
                      <p className="text-sm text-gray-600 mt-1">Response within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-brand-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Press Inquiries</p>
                      <a 
                        href="mailto:press@mindandmotion.com" 
                        className="text-brand-600 hover:text-brand-700"
                      >
                        press@mindandmotion.com
                      </a>
                      <p className="text-sm text-gray-600 mt-1">Media and partnership requests</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-brand-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Headquarters</p>
                      <p className="text-gray-700">San Francisco, CA</p>
                      <p className="text-sm text-gray-600 mt-1">Remote-first company</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-display">Quick Links</h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/help')}
                    className="w-full justify-start"
                  >
                    Help Center
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/signup')}
                    className="w-full justify-start"
                  >
                    Create Account
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/login')}
                    className="w-full justify-start"
                  >
                    Sign In
                  </Button>
                </div>
              </Card>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}