import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function Terms() {
  const navigate = useNavigate();

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
            <FileText className="w-16 h-16 text-brand-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Last updated: January 1, 2025
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  By accessing or using Mind & Motion's services, you agree to be bound by these Terms of Service 
                  and our Privacy Policy. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description of Service</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Mind & Motion is an AI-powered wellness platform that provides personalized coaching for mental 
                  health and physical wellness. Our services include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>AI-powered wellness coaching and recommendations</li>
                  <li>Mood tracking and mental health support tools</li>
                  <li>Adaptive exercise plans for various physical abilities</li>
                  <li>Nutrition guidance and meal planning</li>
                  <li>Progress tracking and analytics</li>
                  <li>Community support features</li>
                  <li>Crisis intervention resources</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Medical Disclaimer</h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <p className="text-yellow-800 font-semibold">
                    IMPORTANT: Mind & Motion is not a substitute for professional medical care.
                  </p>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Our services are for informational and educational purposes only</li>
                  <li>We do not provide medical diagnosis, treatment, or therapy</li>
                  <li>Always consult with qualified healthcare professionals for medical advice</li>
                  <li>In case of medical emergency, contact emergency services immediately</li>
                  <li>Our AI recommendations should not replace professional medical judgment</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">User Accounts and Eligibility</h2>
                <p className="text-gray-700 leading-relaxed mb-4">To use our services, you must:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Be at least 13 years old (users under 18 need parental consent)</li>
                  <li>Provide accurate and complete information during registration</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized account access</li>
                  <li>Use the service only for lawful purposes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscription and Payment Terms</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Free Plan</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Core features are available at no cost</li>
                  <li>No time limits or expiration</li>
                  <li>May include usage limitations</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Paid Plans</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Subscription fees are billed in advance</li>
                  <li>14-day free trial for new subscribers</li>
                  <li>Automatic renewal unless cancelled</li>
                  <li>30-day money-back guarantee</li>
                  <li>Price changes require 30 days notice</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Cancellation</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Cancel anytime from your account settings</li>
                  <li>Access continues until the end of your billing period</li>
                  <li>No refunds for partial months (except money-back guarantee)</li>
                  <li>Cancelled accounts retain access to free features</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">User Conduct and Prohibited Activities</h2>
                <p className="text-gray-700 leading-relaxed mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Use the service for any illegal or unauthorized purpose</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Share false, misleading, or harmful information</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Reverse engineer or copy our software</li>
                  <li>Use automated tools to access our services</li>
                  <li>Share your account credentials with others</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Mind & Motion and its content are protected by intellectual property laws:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>We own all rights to our platform, software, and content</li>
                  <li>You retain ownership of your personal data and content</li>
                  <li>You grant us license to use your data to provide our services</li>
                  <li>You may not copy, modify, or distribute our proprietary content</li>
                  <li>Feedback you provide may be used to improve our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and Data Protection</h2>
                <p className="text-gray-700 leading-relaxed">
                  Your privacy is important to us. Our collection, use, and protection of your personal 
                  information is governed by our Privacy Policy, which is incorporated into these Terms 
                  by reference. By using our services, you consent to our privacy practices as described 
                  in our Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Availability and Modifications</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>We strive for 99.9% uptime but cannot guarantee uninterrupted service</li>
                  <li>We may modify or discontinue features with reasonable notice</li>
                  <li>Scheduled maintenance will be announced in advance</li>
                  <li>We reserve the right to suspend accounts that violate these terms</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimers and Limitations of Liability</h2>
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                  <p className="text-red-800 font-semibold">
                    IMPORTANT LEGAL DISCLAIMERS
                  </p>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Disclaimers</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Services are provided "as is" without warranties of any kind</li>
                  <li>We do not guarantee specific health outcomes or results</li>
                  <li>AI recommendations may not be suitable for all individuals</li>
                  <li>We are not liable for decisions made based on our recommendations</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Limitation of Liability</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Our liability is limited to the amount you paid for our services</li>
                  <li>We are not liable for indirect, incidental, or consequential damages</li>
                  <li>We are not responsible for third-party content or services</li>
                  <li>Some jurisdictions may not allow these limitations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Crisis and Emergency Situations</h2>
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                  <p className="text-red-800 font-semibold">
                    IF YOU ARE EXPERIENCING A MENTAL HEALTH CRISIS, CONTACT EMERGENCY SERVICES IMMEDIATELY.
                  </p>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Call 988 (Suicide & Crisis Lifeline) in the US</li>
                  <li>Call 911 for immediate emergency assistance</li>
                  <li>Our platform is not designed for crisis intervention</li>
                  <li>We may contact emergency services if we believe you are in immediate danger</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
                <p className="text-gray-700 leading-relaxed">
                  You agree to indemnify and hold harmless Mind & Motion, its officers, directors, employees, 
                  and agents from any claims, damages, or expenses arising from your use of our services, 
                  violation of these terms, or infringement of any rights of another party.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We prefer to resolve disputes amicably:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Contact us first at legal@mindandmotion.com</li>
                  <li>We will attempt to resolve disputes within 30 days</li>
                  <li>Unresolved disputes will be subject to binding arbitration</li>
                  <li>These terms are governed by California law</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update these Terms of Service from time to time. We will notify you of material 
                  changes by email and by posting the updated terms on our website. Your continued use of 
                  our services after such changes constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Either party may terminate this agreement:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>You may delete your account at any time</li>
                  <li>We may suspend or terminate accounts that violate these terms</li>
                  <li>Upon termination, your access to paid features will cease</li>
                  <li>You may retain access to free features unless prohibited</li>
                  <li>Data deletion follows our Privacy Policy retention schedule</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have questions about these Terms of Service, please contact us:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700"><strong>Email:</strong> legal@mindandmotion.com</p>
                  <p className="text-gray-700"><strong>Address:</strong> Mind & Motion, Inc., San Francisco, CA</p>
                  <p className="text-gray-700"><strong>Response Time:</strong> Within 5 business days</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Severability</h2>
                <p className="text-gray-700 leading-relaxed">
                  If any provision of these Terms is found to be unenforceable, the remaining provisions 
                  will remain in full force and effect. The unenforceable provision will be replaced with 
                  an enforceable provision that most closely reflects the original intent.
                </p>
              </section>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}