import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle, Clock, Zap, Heart, Volume2, VolumeX, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useUser } from '../contexts/UserContext';

export function WorkoutSession() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [showDemo, setShowDemo] = useState<number | null>(null);
  const [isVoiceGuiding, setIsVoiceGuiding] = useState(false);

  if (!user) {
    return <div>Please log in to start your workout.</div>;
  }

  // Generate workout plan based on user profile
  const generateWorkoutPlan = () => {
    const profile = user.profile!;
    const isLowImpact = profile.physicalLimitations.length > 0 || profile.fitnessLevel === 'beginner';
    
    return {
      id: 'workout-session-1',
      title: isLowImpact ? 'Gentle Wellness Routine' : 'Balanced Fitness Plan',
      totalDuration: 30,
      exercises: [
        {
          id: 1,
          name: 'Mindful Breathing',
          duration: 300, // 5 minutes in seconds
          description: 'Deep breathing exercises to center yourself and reduce anxiety.',
          instructions: [
            'Sit comfortably with your back straight',
            'Place one hand on your chest, one on your belly',
            'Breathe in slowly through your nose for 4 counts',
            'Hold your breath for 4 counts',
            'Exhale slowly through your mouth for 6 counts',
            'Repeat this cycle'
          ],
          adaptations: ['Can be done seated', 'Use guided audio if helpful'],
          restAfter: 60
        },
        {
          id: 2,
          name: isLowImpact ? 'Chair Yoga Stretches' : 'Dynamic Warm-up',
          duration: 600, // 10 minutes
          description: isLowImpact 
            ? 'Gentle stretches to improve flexibility and reduce stiffness.'
            : 'Light movements to prepare your body for exercise.',
          instructions: [
            'Start with gentle neck rolls',
            'Shoulder blade squeezes',
            'Seated spinal twists',
            'Ankle circles and calf raises',
            'Gentle arm circles',
            'Deep breathing between movements'
          ],
          adaptations: profile.physicalLimitations.includes('Mobility limitations') 
            ? ['All movements can be adapted for seated position'] 
            : [],
          restAfter: 120
        },
        {
          id: 3,
          name: profile.preferredExerciseTypes.includes('Walking/Light cardio') 
            ? 'Gentle Movement' 
            : 'Low-Impact Activity',
          duration: 900, // 15 minutes
          description: 'Cardiovascular activity adapted to your comfort level.',
          instructions: [
            'March in place or walk slowly',
            'Gentle arm movements',
            'Focus on steady breathing',
            'Listen to your body',
            'Take breaks as needed',
            'Stay hydrated'
          ],
          adaptations: ['Stop if you feel discomfort', 'Pace yourself based on energy levels'],
          restAfter: 120
        },
        {
          id: 4,
          name: 'Relaxation & Cool Down',
          duration: 300, // 5 minutes
          description: 'Gentle stretches and meditation to end your session peacefully.',
          instructions: [
            'Gentle stretching of major muscle groups',
            'Focus on areas that feel tense',
            'Practice gratitude for your body',
            'Deep breathing exercises',
            'Mindful relaxation',
            'Set positive intentions'
          ],
          adaptations: ['Focus on areas that feel tense', 'Practice gratitude'],
          restAfter: 0
        }
      ]
    };
  };

  const workoutPlan = generateWorkoutPlan();
  const currentExerciseData = workoutPlan.exercises[currentExercise];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            // Auto-complete exercise when time runs out
            if (!completedExercises.includes(currentExercise)) {
              setCompletedExercises(prev => [...prev, currentExercise]);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining, currentExercise, completedExercises]);

  const startSession = () => {
    setSessionStarted(true);
    setTimeRemaining(currentExerciseData.duration);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTimer = () => {
    setTimeRemaining(currentExerciseData.duration);
    setIsPlaying(false);
  };

  const completeExercise = () => {
    if (!completedExercises.includes(currentExercise)) {
      setCompletedExercises(prev => [...prev, currentExercise]);
    }
    
    if (currentExercise < workoutPlan.exercises.length - 1) {
      // Move to next exercise
      setCurrentExercise(prev => prev + 1);
      setTimeRemaining(workoutPlan.exercises[currentExercise + 1].duration);
      setIsPlaying(false);
    } else {
      // Workout complete
      navigate('/dashboard');
    }
  };

  const goToExercise = (index: number) => {
    setCurrentExercise(index);
    setTimeRemaining(workoutPlan.exercises[index].duration);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((workoutPlan.exercises[currentExercise].duration - timeRemaining) / workoutPlan.exercises[currentExercise].duration) * 100;
  const overallProgress = (completedExercises.length / workoutPlan.exercises.length) * 100;

  const handleVoiceGuide = (exerciseIndex: number) => {
    if (!isVoiceEnabled) {
      alert('Voice guidance is disabled. Enable it by clicking the voice button.');
      return;
    }
    
    setIsVoiceGuiding(true);
    const exercise = workoutPlan.exercises[exerciseIndex];
    
    // Use Web Speech API if available
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Starting ${exercise.name}. ${exercise.description}. Remember, you can modify any movement to fit your needs. Listen to your body and take breaks whenever you need them.`
      );
      utterance.rate = 1.2;
      utterance.pitch = 1;
      utterance.volume = 0.7;
      utterance.onend = () => setIsVoiceGuiding(false);
      speechSynthesis.speak(utterance);
    } else {
      // Fallback for browsers without speech synthesis
      alert(`${exercise.name}: ${exercise.description}`);
      setIsVoiceGuiding(false);
    }
  };

  const handleDemo = (exerciseIndex: number) => {
    setShowDemo(exerciseIndex);
  };

  const closeDemo = () => {
    setShowDemo(null);
  };

  if (!sessionStarted) {
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
              <Zap className="w-8 h-8 text-blue-600 mr-3" />
              {workoutPlan.title}
            </h1>
                  
                  {/* Adaptive Exercise Notice */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">🛡️ Adaptive Exercises</h3>
                    <p className="text-sm text-blue-800 mb-2">
                      All exercises are automatically adapted based on your profile:
                    </p>
                    <ul className="text-xs text-blue-700 space-y-1">
                      {user.profile?.physicalLimitations && user.profile.physicalLimitations.length > 0 && 
                       !user.profile.physicalLimitations.includes('None of the above') && (
                        <li>• Modified for your physical considerations</li>
                      )}
                      <li>• Voice guidance available throughout</li>
                      <li>• Pause anytime without judgment</li>
                      <li>• Seated alternatives for all movements</li>
                    </ul>
                  </div>
            <p className="text-gray-600">
              Ready to start your workout?
            </p>
          </motion.div>

          {/* Workout Overview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Workout Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{workoutPlan.totalDuration}</p>
                  <p className="text-sm text-gray-600">Minutes</p>
                </div>
                <div className="text-center">
                  <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{workoutPlan.exercises.length}</p>
                  <p className="text-sm text-gray-600">Exercises</p>
                </div>
                <div className="text-center">
                  <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900 capitalize">{user.profile?.fitnessLevel}</p>
                  <p className="text-sm text-gray-600">Level</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {workoutPlan.exercises.map((exercise, index) => (
                  <div key={exercise.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{exercise.name}</h3>
                        <p className="text-sm text-gray-600">{exercise.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs"
                            onClick={() => handleDemo(index)}
                          >
                            <Play className="w-3 h-3 mr-1" />
                            Demo
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs"
                            onClick={() => handleVoiceGuide(index)}
                            disabled={isVoiceGuiding}
                          >
                            <Mic className="w-3 h-3 mr-1" />
                            {isVoiceGuiding ? 'Speaking...' : 'Voice Guide'}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{formatTime(exercise.duration)}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                    className="flex items-center space-x-2"
                  >
                    {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    <span>{isVoiceEnabled ? 'Voice On' : 'Voice Off'}</span>
                  </Button>
                </div>
              </div>

              <Button onClick={startSession} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                <Play className="w-5 h-5 mr-2" />
                Start Workout
              </Button>
            </Card>
          </motion.div>
        </div>
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
            <span>End Workout</span>
          </Button>
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Zap className="w-8 h-8 text-blue-600 mr-3" />
              Workout Session
            </h1>
            <div className="text-right">
              <p className="text-sm text-gray-600">Overall Progress</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(overallProgress)}%</p>
            </div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-blue-500 to-teal-500 h-3 rounded-full"
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Exercise {currentExercise + 1} of {workoutPlan.exercises.length}</span>
            <span>{completedExercises.length} completed</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Exercise */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-white to-blue-50/30">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {currentExerciseData.name}
                  </h2>
                  <p className="text-gray-600">{currentExerciseData.description}</p>
                </div>

                {/* Timer */}
                <div className="text-center mb-8">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-gray-200"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - progressPercentage / 100)}`}
                        className="text-blue-600 transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-gray-900">
                        {formatTime(timeRemaining)}
                      </span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex justify-center space-x-4 mb-6">
                    <Button
                      onClick={togglePlayPause}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                    <Button variant="outline" onClick={resetTimer}>
                      <RotateCcw className="w-5 h-5" />
                    </Button>
                    <Button variant="secondary" onClick={completeExercise}>
                      <CheckCircle className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Instructions</h3>
                  <ul className="space-y-2">
                    {currentExerciseData.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                        <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                          {index + 1}
                        </span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {currentExerciseData.adaptations.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">💡 Adaptations</h4>
                      <ul className="space-y-1">
                        {currentExerciseData.adaptations.map((adaptation, index) => (
                          <li key={index} className="text-sm text-blue-800">• {adaptation}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* AI Coach Encouragement */}
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">🤖 AI Coach</h4>
                    <p className="text-sm text-green-800">
                      "You're doing great! Remember, this is your journey. Move at your own pace and celebrate every moment of movement."
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Exercise List */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Exercise List</h3>
              <div className="space-y-3">
                {workoutPlan.exercises.map((exercise, index) => (
                  <button
                    key={exercise.id}
                    onClick={() => goToExercise(index)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      index === currentExercise
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : completedExercises.includes(index)
                        ? 'bg-green-50 border-2 border-green-200'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          completedExercises.includes(index)
                            ? 'bg-green-500 text-white'
                            : index === currentExercise
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {completedExercises.includes(index) ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{exercise.name}</h4>
                          <p className="text-xs text-gray-500">{formatTime(exercise.duration)}</p>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Demo Modal */}
        {showDemo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeDemo}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {workoutPlan.exercises[showDemo].name} Demo
                </h3>
                <Button variant="outline" onClick={closeDemo} className="text-gray-500">
                  ✕
                </Button>
              </div>
              
              <div className="space-y-4">
                {/* Demo Video Placeholder */}
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Exercise demonstration video</p>
                  <p className="text-sm text-gray-500">
                    {workoutPlan.exercises[showDemo].description}
                  </p>
                </div>
                
                {/* Step-by-step instructions */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3">Step-by-Step Instructions</h4>
                  <ol className="space-y-2">
                    {workoutPlan.exercises[showDemo].instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start space-x-3 text-sm text-blue-800">
                        <span className="w-6 h-6 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                
                {/* Adaptations */}
                {workoutPlan.exercises[showDemo].adaptations.length > 0 && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-3">💡 Adaptations</h4>
                    <ul className="space-y-1">
                      {workoutPlan.exercises[showDemo].adaptations.map((adaptation, index) => (
                        <li key={index} className="text-sm text-green-800">• {adaptation}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex space-x-3">
                  <Button
                    onClick={() => handleVoiceGuide(showDemo)}
                    disabled={isVoiceGuiding}
                    className="flex items-center space-x-2"
                  >
                    <Mic className="w-4 h-4" />
                    <span>{isVoiceGuiding ? 'Speaking...' : 'Voice Guide'}</span>
                  </Button>
                  <Button variant="outline" onClick={closeDemo}>
                    Close Demo
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}