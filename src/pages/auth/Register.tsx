import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components//ui/button';
import { Input } from '../../components/ui/input';
import { EyeIcon, EyeOffIcon, UserIcon, MailIcon, LockIcon, PhoneIcon, AlertCircleIcon, CheckCircleIcon, ArrowLeftIcon } from 'lucide-react';

export const RegisterPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'citizen',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const userTypes = [
    { value: 'citizen', label: 'Citizen' },
    { value: 'driver', label: 'Driver' },
    { value: 'business', label: 'Business Owner' },
    { value: 'government', label: 'Government Employee' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Check if email already exists (simulate)
      const existingEmails = ['existing@example.com', 'test@example.com'];
      
      if (existingEmails.includes(formData.email)) {
        setErrors({
          email: 'An account with this email already exists'
        });
        setIsLoading(false);
        return;
      }

      // Simulate successful registration
      setRegistrationSuccess(true);
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
      setIsLoading(false);
    }, 1500);
  };

  if (registrationSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircleIcon className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-4">Your account has been created successfully. Redirecting to login...</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Branding */}
          <div className="lg:w-2/5 bg-gradient-to-br from-green-600 to-green-800 p-8 lg:p-12 text-white">
            <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🏛️</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">RTA Portal</h1>
                  <p className="text-green-200">Roads & Transport Authority</p>
                </div>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Join Our Community
              </h2>
              <p className="text-green-100 text-lg leading-relaxed">
                Create your account to access all transport services, track your journeys, and stay updated with the latest features.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <CheckCircleIcon className="w-5 h-5" />
                </div>
                <span>Free Account Registration</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <CheckCircleIcon className="w-5 h-5" />
                </div>
                <span>Access to All Services</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <CheckCircleIcon className="w-5 h-5" />
                </div>
                <span>Real-time Notifications</span>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="lg:w-3/5 p-8 lg:p-12">
            <div className="w-full max-w-lg mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h3>
                <p className="text-gray-600">Fill in your information to get started</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First name"
                        className={`pl-10 py-3 rounded-xl border-2 transition-colors ${
                          errors.firstName ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                        }`}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last name"
                        className={`pl-10 py-3 rounded-xl border-2 transition-colors ${
                          errors.lastName ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                        }`}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className={`pl-10 py-3 rounded-xl border-2 transition-colors ${
                        errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className={`pl-10 py-3 rounded-xl border-2 transition-colors ${
                        errors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* User Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                    className="w-full py-3 px-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                  >
                    {userTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create password"
                        className={`pl-10 pr-12 py-3 rounded-xl border-2 transition-colors ${
                          errors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm password"
                        className={`pl-10 pr-12 py-3 rounded-xl border-2 transition-colors ${
                          errors.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-green-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                {/* Terms Agreement */}
                <div>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className={`w-5 h-5 text-green-600 border-2 rounded focus:ring-green-500 mt-0.5 ${
                        errors.agreeToTerms ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    <span className="text-sm text-gray-600">
                      I agree to the{' '}
                      <Link to="/terms" className="text-green-600 hover:text-green-500 font-medium">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-green-600 hover:text-green-500 font-medium">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-green-600 hover:text-green-500 font-semibold transition-colors">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};