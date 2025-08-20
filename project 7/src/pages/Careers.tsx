import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Heart, Users, Code, ArrowLeft, Mail, Linkedin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function Careers() {
  const navigate = useNavigate();

  const openRoles = [
    {
      title: "Senior Full-Stack Developer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      description: "Build scalable, accessible web applications that serve users with diverse mental health and physical needs.",
      requirements: [
        "5+ years React/Node.js experience",
        "Experience with accessibility standards (WCAG 2.1)",
        "Understanding of mental health or healthcare applications",
        "Passion for inclusive design"
      ]
    },
    {
      title: "AI/ML Engineer",
      department: "AI Research",
      location: "Remote / San Francisco",
      type: "Full-time",
      description: "Develop AI models that provide personalized, empathetic wellness coaching for users with diverse needs.",
      requirements: [
        "PhD/MS in ML, AI, or related field",
        "Experience with NLP and recommendation systems",
        "Knowledge of healthcare AI ethics and bias mitigation",
        "Research background in psychology or behavioral science (preferred)"
      ]
    },
    {
      title: "Clinical Content Specialist",
      department: "Clinical",
      location: "Remote",
      type: "Full-time",
      description: "Create evidence-based wellness content and ensure our AI provides clinically sound mental health support.",
      requirements: [
        "Licensed mental health professional (LCSW, LPC, etc.)",
        "Experience with digital mental health platforms",
        "Knowledge of trauma-informed care",
        "Understanding of accessibility and inclusive practices"
      ]
    }
  ];

  const benefits = [
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "Mental Health First",
      description: "Comprehensive mental health coverage, therapy stipends, and unlimited mental health days."
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "Inclusive Culture",
      description: "We celebrate diversity and create an environment where everyone can bring their authentic selves to work."
    },
    {
      icon: <Code className="w-6 h-6 text-green-500" />,
      title: "Growth & Learning",
      description: "$3,000 annual learning budget, conference attendance, and mentorship programs."
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
            <Briefcase className="w-16 h-16 text-brand-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
              Join Our Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Help us build the most inclusive wellness app in the world. We're looking for passionate 
              people who want to make mental and physical health support accessible to everyone.
            </p>
          </div>
        </motion.div>

        {/* Culture */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-br from-brand-50 to-accent-50 border-brand-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center font-display">Our Culture</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-lg text-gray-700 leading-relaxed">
                We're a remote-first company that values collaboration, empathy, and innovation. 
                Our team includes people with lived experience of mental health challenges and disabilities, 
                ensuring our products truly serve our users' needs.
              </p>
            </div>
          </Card>
        </motion.section>

        {/* Open Positions */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-display">
            Open Positions
          </h2>
          <div className="space-y-6">
            {openRoles.map((role, index) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{role.title}</h3>
                          <div className="flex flex-wrap gap-2 text-sm">
                            <span className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full">
                              {role.department}
                            </span>
                            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                              {role.location}
                            </span>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                              {role.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed mb-4">{role.description}</p>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                        <ul className="space-y-1">
                          {role.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="text-gray-700 text-sm flex items-start">
                              <span className="w-2 h-2 bg-brand-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 lg:mt-0 lg:ml-6 flex-shrink-0">
                      <Button className="w-full lg:w-auto">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Application Process */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center font-display">
              How to Apply
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="text-center">
                  <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Email Application</h3>
                  <p className="text-gray-700 mb-4">
                    Send your resume and cover letter to:
                  </p>
                  <a 
                    href="mailto:careers@mindandmotion.com" 
                    className="text-brand-600 hover:text-brand-700 font-semibold"
                  >
                    careers@mindandmotion.com
                  </a>
                </div>
                
                <div className="text-center">
                  <Linkedin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">LinkedIn</h3>
                  <p className="text-gray-700 mb-4">
                    Connect with us and apply directly:
                  </p>
                  <a 
                    href="https://linkedin.com/company/mindandmotion" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-600 hover:text-brand-700 font-semibold"
                  >
                    LinkedIn Jobs
                  </a>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What to Include</h3>
                <ul className="text-left space-y-2 max-w-md mx-auto">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">Your resume highlighting relevant experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">Cover letter explaining why you want to join our mission</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">Portfolio or work samples (if applicable)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700">Any questions about the role or our company</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Don't See a Fit */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-display">
              Don't See the Right Role?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6 max-w-2xl mx-auto">
              We're always looking for passionate people who share our mission. 
              If you think you'd be a great fit for our team, we'd love to hear from you!
            </p>
            <Button 
              onClick={() => window.location.href = 'mailto:careers@mindandmotion.com?subject=General Interest'}
              variant="outline"
            >
              Send Us Your Info
            </Button>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}