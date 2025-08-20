import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function Privacy() {
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
            <Shield className="w-16 h-16 text-brand-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
              Privacy Policy
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p className="text-gray-700 leading-relaxed">
                  At Mind & Motion, we understand that your health information is deeply personal and sensitive. 
                  This Privacy Policy explains how we collect, use, protect, and share your information when you 
                  use our AI-powered wellness platform. We are committed to maintaining the highest standards of 
                  privacy and security for all users, especially those managing mental health challenges and 
                  physical disabilities.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Name, email address, and contact information</li>
                  <li>Age, height, weight, and basic demographic information</li>
                  <li>Account credentials and preferences</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Health Information</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Mental health conditions and challenges you choose to share</li>
                  <li>Physical limitations and disabilities</li>
                  <li>Mood tracking data, including daily emotional states and energy levels</li>
                  <li>Exercise preferences and fitness level</li>
                  <li>Dietary restrictions and nutrition preferences</li>
                  <li>Wellness goals and progress tracking</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Usage Information</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>How you interact with our platform and features</li>
                  <li>Device information and technical data</li>
                  <li>Log files and analytics data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Personalized AI Coaching:</strong> To provide customized wellness recommendations, exercise plans, and nutrition guidance</li>
                  <li><strong>Progress Tracking:</strong> To help you monitor your wellness journey and identify patterns</li>
                  <li><strong>Platform Improvement:</strong> To enhance our AI algorithms and develop new features</li>
                  <li><strong>Safety & Support:</strong> To provide crisis intervention resources and connect you with appropriate help</li>
                  <li><strong>Communication:</strong> To send you important updates, wellness tips, and support messages</li>
                  <li><strong>Research:</strong> To conduct anonymized research that benefits the broader wellness community (only with your explicit consent)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">AI and Machine Learning</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our AI systems analyze your health data to provide personalized recommendations. Here's how we ensure responsible AI use:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>AI models are trained on anonymized, aggregated data</li>
                  <li>We regularly audit our algorithms for bias and fairness</li>
                  <li>Human oversight ensures AI recommendations are appropriate</li>
                  <li>You can always opt out of AI-powered features</li>
                  <li>We never use your data to train models for other companies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We implement enterprise-grade security measures to protect your information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>End-to-end encryption for all data transmission</li>
                  <li>AES-256 encryption for data at rest</li>
                  <li>HIPAA-compliant infrastructure and practices</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Multi-factor authentication for account access</li>
                  <li>Strict access controls for our team members</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We never sell your personal information. We may share your information only in these limited circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>With Your Consent:</strong> When you explicitly authorize sharing with healthcare providers or family members</li>
                  <li><strong>Service Providers:</strong> With trusted partners who help us operate our platform (under strict confidentiality agreements)</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect safety</li>
                  <li><strong>Emergency Situations:</strong> To prevent imminent harm to you or others</li>
                  <li><strong>Anonymized Research:</strong> Aggregated, de-identified data for wellness research (only with your consent)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Integrations</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may integrate with third-party services to enhance your experience:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Fitness trackers and health apps (only with your permission)</li>
                  <li>Calendar applications for scheduling</li>
                  <li>Payment processors for subscription management</li>
                  <li>Analytics services (using anonymized data only)</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Each integration requires your explicit consent, and you can revoke access at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights and Choices</h2>
                <p className="text-gray-700 leading-relaxed mb-4">You have the following rights regarding your personal information:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Access:</strong> Request a copy of all personal information we have about you</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your account and all associated data</li>
                  <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                  <li><strong>Opt-out:</strong> Withdraw consent for specific uses of your data</li>
                  <li><strong>Restrict Processing:</strong> Limit how we use your information</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  To exercise these rights, contact us at privacy@mindandmotion.com.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
                <p className="text-gray-700 leading-relaxed">
                  We retain your information only as long as necessary to provide our services and comply with legal obligations:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
                  <li>Account information: Until you delete your account</li>
                  <li>Health data: Until you delete your account or request specific deletion</li>
                  <li>Usage analytics: Anonymized after 2 years</li>
                  <li>Support communications: 3 years for quality assurance</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our services are not intended for children under 13. We do not knowingly collect personal 
                  information from children under 13. If you believe we have collected information from a 
                  child under 13, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">International Users</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you're using our services from outside the United States, your information may be 
                  transferred to and processed in the United States. We ensure appropriate safeguards are 
                  in place to protect your information in accordance with this Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material 
                  changes by email and by posting the updated policy on our website. Your continued use of 
                  our services after such changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700"><strong>Email:</strong> privacy@mindandmotion.com</p>
                  <p className="text-gray-700"><strong>Address:</strong> Mind & Motion, Inc., San Francisco, CA</p>
                  <p className="text-gray-700"><strong>Response Time:</strong> Within 30 days</p>
                </div>
              </section>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}