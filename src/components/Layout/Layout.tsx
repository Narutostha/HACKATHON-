import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { SearchIcon, UserIcon, AccessibilityIcon, BellIcon, SettingsIcon, ChevronDownIcon, XIcon, CheckIcon, AlertTriangleIcon, InfoIcon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps): JSX.Element => {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [user, setUser] = useState<any>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Check for logged in user on component mount
  React.useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Monitor online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'info',
      title: 'Service Update',
      message: 'Bus route 25A will have temporary stops due to road construction.',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Payment Confirmed',
      message: 'Your monthly transport pass has been successfully renewed.',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Schedule Change',
      message: 'Metro Line 2 will operate on reduced schedule this weekend.',
      time: '3 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'info',
      title: 'New Feature',
      message: 'Real-time bus tracking is now available in your area.',
      time: '1 day ago',
      read: true
    }
  ];

  // Close notification panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowUserMenu(false);
    window.location.href = '/';
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckIcon className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangleIcon className="w-5 h-5 text-amber-500" />;
      case 'info':
      default:
        return <InfoIcon className="w-5 h-5 text-blue-500" />;
    }
  };
  
  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "Driver & Vehicle", path: "/driver-vehicle" },
    { label: "Public Transport", path: "/public-transport" },
    { label: "Business Services", path: "/business-services" },
    { label: "Accessibility", path: "/accessibility" },
  ];

  return (
    <div className="relative w-full bg-gray-50 min-h-screen">
      {/* Modern Header */}
      <header className="w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Left side - Modern Government Branding */}
            <div className="flex items-center space-x-6">
              {/* Government Logo */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">🏛️</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">RTA</div>
                  <div className="text-gray-500 text-sm font-medium">NYXIS TECH</div>
                </div>
              </div>
              
              {/* Modern Separator */}
              <div className="h-10 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
              
            </div>

            {/* Center - Modern Navigation */}
            <nav className="hidden xl:flex items-center bg-gray-50 rounded-2xl p-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-white text-blue-600 shadow-md transform scale-105'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-white/50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side - Modern Controls */}
            <div className="flex items-center space-x-4">
              {/* Modern Search */}
              <div className="hidden lg:flex items-center">
                <div className="relative group">
                  <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    placeholder="Search services..."
                    className="pl-12 pr-4 py-3 w-64 text-sm bg-gray-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Notification Bell - Only show if user is logged in */}
              {user && (
                <div className="relative" ref={notificationRef}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="relative p-3 rounded-xl hover:bg-gray-100 transition-colors"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <BellIcon className="w-5 h-5 text-gray-600" />
                    {unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{unreadCount}</span>
                      </div>
                    )}
                  </Button>

                  {/* Notification Overlay */}
                  {showNotifications && (
                    <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden">
                      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900">Notifications</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowNotifications(false)}
                          className="p-1 hover:bg-gray-100 rounded-lg"
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${
                              !notification.read ? 'bg-blue-50/50' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="mt-0.5">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="font-semibold text-gray-900 text-sm">
                                    {notification.title}
                                  </p>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  )}
                                </div>
                                <p className="text-gray-600 text-sm mb-2">
                                  {notification.message}
                                </p>
                                <p className="text-gray-400 text-xs">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-gray-100">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-blue-600 hover:bg-blue-50"
                        >
                          View All Notifications
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Settings - Only show if user is logged in */}
              {user && (
                <Button variant="ghost" size="sm" className="p-3 rounded-xl hover:bg-gray-100 transition-colors">
                  <SettingsIcon className="w-5 h-5 text-gray-600" />
                </Button>
              )}

              {/* Accessibility */}
              <Button variant="ghost" size="sm" className="p-3 rounded-xl hover:bg-blue-50 text-blue-600 transition-colors">
                <AccessibilityIcon className="w-5 h-5" />
              </Button>

              {/* User Menu or Login Button */}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 transition-colors"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {user.email?.[0]?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div className="hidden md:block text-left">
                      <div className="font-semibold text-gray-900 text-sm">
                        {user.role || 'User'}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {user.email}
                      </div>
                    </div>
                    <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                  </Button>

                  {/* User Menu Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">
                              {user.email?.[0]?.toUpperCase() || 'U'}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{user.role}</div>
                            <div className="text-gray-500 text-sm">{user.email}</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start p-3 hover:bg-gray-50 rounded-lg"
                        >
                          <UserIcon className="w-4 h-4 mr-3" />
                          Profile Settings
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start p-3 hover:bg-gray-50 rounded-lg"
                        >
                          <SettingsIcon className="w-4 h-4 mr-3" />
                          Account Settings
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start p-3 hover:bg-gray-50 rounded-lg"
                        >
                          <BellIcon className="w-4 h-4 mr-3" />
                          Notification Preferences
                        </Button>
                        <div className="border-t border-gray-100 my-2"></div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleLogout}
                          className="w-full justify-start p-3 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg"
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                    <UserIcon className="w-4 h-4 mr-2" />
                    Login
                    <ChevronDownIcon className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full">
        {children}
      </main>

      {/* Modern Footer */}
      <footer className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 mt-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RTA</span>
                </div>
                <h3 className="text-xl font-bold">Transport Authority</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Smart transportation ecosystem for modern cities. Making public transport 
                more efficient, safe, and accessible through innovative technology.
              </p>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors">
                  <span className="text-white text-xs font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-300 transition-colors">
                  <span className="text-white text-xs font-bold">t</span>
                </div>
                <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                  <span className="text-white text-xs font-bold">in</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Services</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link to="/public-transport" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Public Transport</Link></li>
                <li><Link to="/driver-vehicle" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Vehicle Services</Link></li>
                <li><Link to="/business-services" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Business Solutions</Link></li>
                <li><Link to="/accessibility" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Accessibility Services</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Support</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li><Link to="/contact" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Contact Support</Link></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Help Center</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Report Issues</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">Feedback</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Emergency Contacts</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between items-center bg-red-600/20 px-3 py-2 rounded-lg">
                  <span className="text-gray-300">Police</span>
                  <span className="font-bold text-red-400">911</span>
                </li>
                <li className="flex justify-between items-center bg-blue-600/20 px-3 py-2 rounded-lg">
                  <span className="text-gray-300">Medical</span>
                  <span className="font-bold text-blue-400">911</span>
                </li>
                <li className="flex justify-between items-center bg-orange-600/20 px-3 py-2 rounded-lg">
                  <span className="text-gray-300">Fire</span>
                  <span className="font-bold text-orange-400">911</span>
                </li>
                <li className="flex justify-between items-center bg-green-600/20 px-3 py-2 rounded-lg">
                  <span className="text-gray-300">Transport</span>
                  <span className="font-bold text-green-400">311</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; 2025 Roads & Transport Authority. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};