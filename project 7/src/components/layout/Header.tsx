import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Brain, Menu, User, LogOut, ChevronDown, Activity, Utensils, BarChart3, Shield, Target } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { motion } from 'framer-motion';

export function Header() {
  const { user, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;


  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <Brain className="w-8 h-8 text-brand-800" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gold-500 rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-brand-800 to-accent-600 bg-clip-text text-transparent font-display">ReNova</span>
                <span className="text-xs text-gray-500 -mt-1 hidden sm:block italic">Rebirth of Light</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {!user && (
                <Link
                  to="/"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/') ? 'text-brand-600' : 'text-gray-700 hover:text-brand-600'
                  }`}
                >
                  Home
                </Link>
              )}
              {user && (
                <>
                  <Link
                    to="/dashboard"
                    className={`text-sm font-medium transition-colors ${
                      isActive('/dashboard') ? 'text-brand-600' : 'text-gray-700 hover:text-brand-600'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/mood"
                    className={`text-sm font-medium transition-colors ${
                      isActive('/mood') ? 'text-brand-600' : 'text-gray-700 hover:text-brand-600'
                    }`}
                  >
                    Mental Health
                  </Link>
                  <Link
                    to="/nutrition"
                    className={`text-sm font-medium transition-colors ${
                      isActive('/nutrition') ? 'text-brand-600' : 'text-gray-700 hover:text-brand-600'
                    }`}
                  >
                    Nutrition
                  </Link>
                  <Link
                    to="/workout"
                    className={`text-sm font-medium transition-colors ${
                      isActive('/workout') ? 'text-brand-600' : 'text-gray-700 hover:text-brand-600'
                    }`}
                  >
                    Fitness
                  </Link>
                  <Link
                    to="/progress"
                    className={`text-sm font-medium transition-colors ${
                      isActive('/progress') ? 'text-brand-600' : 'text-gray-700 hover:text-brand-600'
                    }`}
                  >
                    Progress
                  </Link>
                </>
              )}
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.name}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                  
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="hidden md:block absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>Your Care Profile</span>
                        <div className="flex items-center space-x-1 ml-auto">
                          {user.profile?.mentalHealthChallenges && user.profile.mentalHealthChallenges.length > 0 && 
                           !user.profile.mentalHealthChallenges.includes('None of the above') && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          {user.profile?.physicalLimitations && user.profile.physicalLimitations.length > 0 && 
                           !user.profile.physicalLimitations.includes('None of the above') && (
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          )}
                          {user.profile?.goals && user.profile.goals.length > 0 && (
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          )}
                        </div>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-brand-600 hover:text-brand-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Sign In
                    </motion.button>
                  </Link>
                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-lg hover:shadow-xl"
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </div>
              )}
              {user && (
                <button 
                  className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                  <Menu className="w-6 h-6 text-gray-600" />
                </button>
              )}
              {!user && (
                <div className="md:hidden flex items-center space-x-2">
                  <Link to="/login">
                    <button className="text-brand-600 hover:text-brand-700 px-3 py-2 rounded-lg text-sm font-semibold transition-colors">
                      Sign In
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="bg-brand-600 hover:bg-brand-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Overlay to close user menu when clicking outside */}
        {showUserMenu && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowUserMenu(false)}
          />
        )}
      </motion.header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <>
          {/* Mobile menu overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-25 z-30 md:hidden" 
            onClick={closeMobileMenu}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="md:hidden bg-white shadow-2xl fixed top-16 right-0 w-80 h-[50vh] z-50 overflow-y-auto rounded-l-lg"
          >
            <div className="px-4 py-4">
              {user && (
                <>
                <>
                  {/* User Profile Section */}
                  <div className="border-b border-gray-100 pb-3 mb-4">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setShowMobileUserMenu(!showMobileUserMenu)}
                        className="flex items-center justify-between flex-1 text-left hover:bg-gray-50 rounded-lg p-2 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-brand-100 to-accent-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-brand-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showMobileUserMenu ? 'rotate-180' : ''}`} />
                      </button>
                      <button
                        onClick={closeMobileMenu}
                        className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    </div>
                    
                    {/* Expandable User Menu */}
                    {showMobileUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-gray-100 space-y-2"
                      >
                        <button
                          onClick={() => {
                            // Handle change password - you can navigate to a change password page or show a modal
                            alert('Change Password functionality would go here');
                            closeMobileMenu();
                          }}
                          className="flex items-center space-x-3 w-full px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                          </div>
                          <span className="text-sm text-gray-700">Change Password</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            handleLogout();
                            closeMobileMenu();
                          }}
                          className="flex items-center space-x-3 w-full px-3 py-2 text-left hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <div className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center">
                            <LogOut className="w-3 h-3 text-red-600" />
                          </div>
                          <span className="text-sm text-red-600">Sign Out</span>
                        </button>
                      </motion.div>
                    )}

                  {/* Navigation Section */}
                  <div className="mb-4">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Navigation</h3>
                    <div>
                      <div className="space-y-0.5">
                        <Link
                          to="/dashboard"
                          onClick={closeMobileMenu}
                          className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                            isActive('/dashboard') 
                              ? 'bg-brand-50 text-brand-700 border-l-4 border-brand-500' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                            <User className="w-3 h-3 text-blue-600" />
                          </div>
                          <span className="text-sm font-medium">Dashboard</span>
                        </Link>
                        <Link
                          to="/mood"
                          onClick={closeMobileMenu}
                          className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                            isActive('/mood') 
                              ? 'bg-brand-50 text-brand-700 border-l-4 border-brand-500' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div className="w-6 h-6 bg-pink-100 rounded-lg flex items-center justify-center">
                            <Brain className="w-3 h-3 text-pink-600" />
                          </div>
                          <span className="text-sm font-medium">Mental Health</span>
                        </Link>
                        <Link
                          to="/nutrition"
                          onClick={closeMobileMenu}
                          className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                            isActive('/nutrition') 
                              ? 'bg-brand-50 text-brand-700 border-l-4 border-brand-500' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                            <Utensils className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-sm font-medium">Nutrition</span>
                        </Link>
                        <Link
                          to="/workout"
                          onClick={closeMobileMenu}
                          className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                            isActive('/workout') 
                              ? 'bg-brand-50 text-brand-700 border-l-4 border-brand-500' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Activity className="w-3 h-3 text-orange-600" />
                          </div>
                          <span className="text-sm font-medium">Fitness</span>
                        </Link>
                        <Link
                          to="/progress"
                          onClick={closeMobileMenu}
                          className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                            isActive('/progress') 
                              ? 'bg-brand-50 text-brand-700 border-l-4 border-brand-500' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                            <BarChart3 className="w-3 h-3 text-purple-600" />
                          </div>
                          <span className="text-sm font-medium">Progress</span>
                        </Link>
                        <Link
                          to="/profile"
                          onClick={closeMobileMenu}
                         className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                            isActive('/profile') 
                              ? 'bg-brand-50 text-brand-700 border-l-4 border-brand-500' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                         <div className="w-6 h-6 bg-brand-100 rounded-lg flex items-center justify-center relative">
                           <User className="w-3 h-3 text-brand-600" />
                            <div className="absolute -top-1 -right-1 flex space-x-0.5">
                              {user.profile?.mentalHealthChallenges && user.profile.mentalHealthChallenges.length > 0 && 
                               !user.profile.mentalHealthChallenges.includes('None of the above') && (
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              )}
                              {user.profile?.physicalLimitations && user.profile.physicalLimitations.length > 0 && 
                               !user.profile.physicalLimitations.includes('None of the above') && (
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              )}
                              {user.profile?.goals && user.profile.goals.length > 0 && (
                                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                         <span className="text-sm font-medium">Your Care Profile</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
                </>
              )}
              {!user && (
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className={`block text-base font-medium transition-colors ${
                    isActive('/') ? 'text-brand-600' : 'text-gray-700 hover:text-brand-600'
                  }`}
                >
                  Home
                </Link>
              )}
              {!user && (
                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="block text-brand-600 hover:text-brand-700 text-sm font-semibold transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMobileMenu}
                    className="block bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors text-center"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}