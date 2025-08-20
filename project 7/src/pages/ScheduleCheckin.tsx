import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Bell, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function ScheduleCheckin() {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [selectedDays, setSelectedDays] = useState<string[]>(['Monday', 'Wednesday', 'Friday']);
  const [reminderType, setReminderType] = useState('notification');
  const [isScheduled, setIsScheduled] = useState(false);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleSchedule = () => {
    // Here you would typically save to localStorage or send to a backend
    setIsScheduled(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  if (isScheduled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check-in Scheduled!</h2>
          <p className="text-gray-600">You'll receive reminders on your selected days.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <Calendar className="w-8 h-8 text-brand-600 mr-3" />
            Schedule Check-in
          </h1>
          <p className="text-gray-600">
            Set up regular wellness check-in reminders.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Schedule Settings */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Schedule Settings</h2>
              
              {/* Time Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Preferred Time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                >
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              {/* Days Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Days
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {days.map(day => (
                    <motion.button
                      key={day}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleDay(day)}
                      className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                        selectedDays.includes(day)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {day.slice(0, 3)}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Reminder Type */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Bell className="w-4 h-4 inline mr-2" />
                  Reminder Type
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'notification', label: 'Browser Notification', desc: 'Get notified in your browser' },
                    { value: 'email', label: 'Email Reminder', desc: 'Receive email reminders' }
                  ].map(option => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => setReminderType(option.value)}
                      className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                        reminderType === option.value
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-gray-200 hover:border-teal-300'
                      }`}
                    >
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleSchedule}
                disabled={selectedDays.length === 0}
                className="w-full"
              >
                Schedule Check-ins
              </Button>
            </Card>
          </motion.div>

          {/* Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Schedule Preview</h2>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Your Schedule</h3>
                  <div className="text-sm text-blue-800">
                    <p className="mb-2">
                      <strong>Time:</strong> {selectedTime}
                    </p>
                    <p className="mb-2">
                      <strong>Days:</strong> {selectedDays.length > 0 ? selectedDays.join(', ') : 'None selected'}
                    </p>
                    <p>
                      <strong>Reminder:</strong> {reminderType === 'notification' ? 'Browser Notification' : 'Email Reminder'}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">What to Expect</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Regular reminders to check in with your wellness</li>
                    <li>• Quick mood and energy level assessments</li>
                    <li>• Personalized insights based on your patterns</li>
                    <li>• Gentle encouragement to maintain healthy habits</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Benefits</h3>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Build consistent wellness habits</li>
                    <li>• Track your progress over time</li>
                    <li>• Stay connected with your mental health</li>
                    <li>• Receive timely support when needed</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}