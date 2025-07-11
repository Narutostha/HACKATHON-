import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LiveTrackingPage } from './pages/LiveTrackingPage';
import { PaymentPage } from './pages/PaymentPage';
import { VehicleStatusPage } from './pages/VehicleStatusPage';
import { RouteFinderPage } from './pages/RouteFinderPage';
import { BelongingTrackingPage } from './pages/BelongingTrackingPage';
import { NearbyStopsPage } from './pages/NearbyStopsPage';
import { SOSAlertPage } from './pages/SOSAlertPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/auth/Login';
import { RegisterPage } from './pages/auth/Register';

export const App = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        {/* Main Application Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/live-tracking" element={<LiveTrackingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/vehicle-status" element={<VehicleStatusPage />} />
        <Route path="/route-finder" element={<RouteFinderPage />} />
        <Route path="/belonging-tracking" element={<BelongingTrackingPage />} />
        <Route path="/nearby-stops" element={<NearbyStopsPage />} />
        <Route path="/sos-alert" element={<SOSAlertPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Additional Routes for New Navigation Structure */}
        <Route path="/driver-vehicle" element={<VehicleStatusPage />} />
        <Route path="/public-transport" element={<LiveTrackingPage />} />
        <Route path="/business-services" element={<ServicesPage />} />
        <Route path="/accessibility" element={<SOSAlertPage />} />
        
        {/* Utility Routes */}
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

// Additional Page Components you might need to create

// 404 Not Found Page
const NotFoundPage = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-6xl">🚫</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-x-4">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Go Home
          </a>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

// Terms of Service Page
const TermsPage = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing and using the RTA (Roads & Transport Authority) services, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
            <p className="text-gray-700 mb-6">
              RTA provides digital transportation services including but not limited to live tracking, payment processing, route finding, and emergency services.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use services in compliance with applicable laws</li>
              <li>Report any suspicious activities or security breaches</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Privacy Policy</h2>
            <p className="text-gray-700 mb-6">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact Information</h2>
            <p className="text-gray-700">
              For questions about these Terms of Service, please contact us at legal@rta.gov
            </p>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Privacy Policy Page
const PrivacyPage = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-700 mb-6">
              We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and customer service requests</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
            <p className="text-gray-700 mb-6">
              We do not share, sell, rent, or trade personally identifiable information with third parties for their commercial purposes.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 mb-6">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, please contact us at privacy@rta.gov
            </p>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Forgot Password Page
const ForgotPasswordPage = (): JSX.Element => {
  const [email, setEmail] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate password reset
    setIsSubmitted(true);
  };
  
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📧</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <a
            href="/login"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Back to Login
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔐</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
          <p className="text-gray-600">Enter your email address and we'll send you a link to reset your password.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full py-3 px-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Send Reset Link
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <a href="/login" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};