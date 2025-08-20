import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Toast } from '../components/ui/Toast';
import { useToast } from '../hooks/useToast';
import { validateEmail, validatePassword, validateName, getPasswordStrength } from '../utils/validation';

interface AuthProps {
  mode: 'login' | 'signup';
}

export function Auth({ mode }: AuthProps) {
  const navigate = useNavigate();
  const { login, signup } = useUser();
  const { toast, showToast, hideToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isLogin = mode === 'login';

  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'name':
        error = validateName(value) || '';
        break;
      case 'email':
        error = validateEmail(value) || '';
        break;
      case 'password':
        error = validatePassword(value) || '';
        break;
      case 'confirmPassword':
        if (!isLogin && value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      if (!isLogin) {
        // Validate all fields for signup
        const nameValid = validateField('name', formData.name);
        const emailValid = validateField('email', formData.email);
        const passwordValid = validateField('password', formData.password);
        const confirmPasswordValid = validateField('confirmPassword', formData.confirmPassword);
        
        if (!nameValid || !emailValid || !passwordValid || !confirmPasswordValid) {
          setLoading(false);
          return;
        }

        const success = await signup(formData.name, formData.email, formData.password);
        if (success) {
          showToast(`Welcome to Mind & Motion, ${formData.name}! 🎉`, 'success');
          navigate('/onboarding');
        } else {
          setErrors({ email: 'An account with this email already exists' });
        }
      } else {
        // Validate email for login
        const emailValid = validateField('email', formData.email);
        if (!emailValid) {
          setLoading(false);
          return;
        }
        
        const success = await login(formData.email, formData.password);
        if (success) {
          showToast('Welcome back! 👋', 'success');
          navigate('/dashboard');
        } else {
          setErrors({ email: 'Invalid email or password' });
        }
      }
    } catch (err) {
      showToast('An error occurred. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Real-time validation for password confirmation
    if (name === 'confirmPassword' && !isLogin) {
      validateField('confirmPassword', value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value) {
      validateField(name, value);
    }
  };

  const handleForgotPassword = () => {
    showToast('Password reset link sent to your email! 📧', 'success');
    setShowForgotPassword(false);
  };

  const passwordStrength = !isLogin ? getPasswordStrength(formData.password) : null;

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <Brain className="w-8 h-8 text-brand-800" />
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-800 to-accent-600 bg-clip-text text-transparent font-display">ReNova</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin 
              ? 'Sign in to continue your wellness journey' 
              : 'Start your personalized wellness journey today'
            }
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <form onSubmit={handleSubmit} className="space-y-6">

              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required={!isLogin}
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      disabled={loading}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors ${
                        errors.name 
                          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                          : 'border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200'
                      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      placeholder="Enter your full name"
                      aria-label="Full name"
                      aria-invalid={!!errors.name}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    disabled={loading}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200'
                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="Enter your email"
                    aria-label="Email address"
                    aria-invalid={!!errors.email}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    disabled={loading}
                    className={`w-full pl-10 pr-12 py-3 rounded-xl border transition-colors ${
                      errors.password 
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200'
                    } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder={isLogin ? "Enter your password" : "Create a strong password"}
                    aria-label="Password"
                    aria-invalid={!!errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                )}
                {!isLogin && formData.password && passwordStrength && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Password strength:</span>
                      <span className={`font-medium ${
                        passwordStrength.color === 'red' ? 'text-red-600' :
                        passwordStrength.color === 'orange' ? 'text-orange-600' :
                        passwordStrength.color === 'yellow' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength.color === 'red' ? 'bg-red-500' :
                          passwordStrength.color === 'orange' ? 'bg-orange-500' :
                          passwordStrength.color === 'yellow' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required={!isLogin}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      disabled={loading}
                      className={`w-full pl-10 pr-12 py-3 rounded-xl border transition-colors ${
                        errors.confirmPassword 
                          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                          : 'border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200'
                      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      placeholder="Confirm your password"
                      aria-label="Confirm password"
                      aria-invalid={!!errors.confirmPassword}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-brand-600 hover:text-brand-500 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <Link
                  to={isLogin ? '/signup' : '/login'}
                  className="font-semibold text-brand-600 hover:text-brand-500 transition-colors"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </Link>
              </p>
            </div>
          </Card>

          {/* Forgot Password Modal */}
          {showForgotPassword && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setShowForgotPassword(false)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-xl p-6 max-w-sm mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Reset Password</h3>
                <p className="text-gray-600 mb-4">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-colors mb-4"
                />
                <div className="flex space-x-3">
                  <Button
                    onClick={handleForgotPassword}
                    className="flex-1"
                  >
                    Send Reset Link
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowForgotPassword(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <p className="text-xs text-gray-500">
            By {isLogin ? 'signing in' : 'creating an account'}, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
    </>
  );
}