import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './contexts/UserContext';
import { Header } from './components/layout/Header';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { MoodTracking } from './pages/MoodTracking';
import { ScheduleCheckin } from './pages/ScheduleCheckin';
import { ProgressTracking } from './pages/ProgressTracking';
import { NutritionPlan } from './pages/NutritionPlan';
import { WorkoutSession } from './pages/WorkoutSession';
import { Community } from './pages/Community';
import { AICoach } from './pages/AICoach';
import { Profile } from './pages/Profile';
import { About } from './pages/About';
import { Mission } from './pages/Mission';
import { Careers } from './pages/Careers';
import { Press } from './pages/Press';
import { HelpCenter } from './pages/HelpCenter';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!user.onboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
}

function OnboardingRoute({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function AppContent() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/press" element={<Press />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/onboarding" element={
            <OnboardingRoute><Onboarding /></OnboardingRoute>
          } />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/mood" 
            element={
              <ProtectedRoute>
                <MoodTracking />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/schedule" 
            element={
              <ProtectedRoute>
                <ScheduleCheckin />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/nutrition" 
            element={
              <ProtectedRoute>
                <NutritionPlan />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/progress" 
            element={
              <ProtectedRoute>
                <ProgressTracking />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/workout" 
            element={
              <ProtectedRoute>
                <WorkoutSession />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/community" 
            element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ai-coach" 
            element={
              <ProtectedRoute>
                <AICoach />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;