import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { vehicleData, routeData } from '../../data/staticData';

export const HomePage = (): JSX.Element => {
  const [fromLocation, setFromLocation] = React.useState('');
  const [toLocation, setToLocation] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  const [showResults, setShowResults] = React.useState(false);

  const handleRouteSearch = () => {
    if (!fromLocation || !toLocation) {
      alert('कृपया दुवै स्थान भर्नुहोस् (Please fill both locations)');
      return;
    }

    const filtered = routeData.filter(route =>
      route.startPoint.toLowerCase().includes(fromLocation.toLowerCase()) ||
      route.endPoint.toLowerCase().includes(toLocation.toLowerCase()) ||
      route.stops.some(stop => 
        stop.toLowerCase().includes(fromLocation.toLowerCase()) ||
        stop.toLowerCase().includes(toLocation.toLowerCase())
      )
    );
    
    setSearchResults(filtered.length > 0 ? filtered : routeData);
    setShowResults(true);
  };

  const downloadApp = () => {
    alert('🚀 App Download Links:\n\n📱 Android: Play Store\n🍎 iOS: App Store\n📲 APK: Direct Download\n\nFeatures:\n✅ Real-time tracking\n✅ Digital payments\n✅ Route planning\n✅ Emergency SOS');
  };
  const services = [
    {
      id: 'live-tracking',
      title: 'Live GPS Tracking',
      description: 'Track vehicles in real-time across Kathmandu Valley',
      icon: '🚌',
      path: '/live-tracking',
      color: 'bg-blue-500'
    },
    {
      id: 'payment',
      title: 'Payment',
      description: 'Pay fares using eSewa, Khalti, and other digital wallets',
      icon: '💳',
      path: '/payment',
      color: 'bg-green-500'
    },
    {
      id: 'vehicle-status',
      title: 'Vehicle Status',
      description: 'Check vehicle health and maintenance status',
      icon: '🔧',
      path: '/vehicle-status',
      color: 'bg-orange-500'
    },
    {
      id: 'route-finder',
      title: 'Route Finder System',
      description: 'Find the best routes across Kathmandu Valley',
      icon: '🗺️',
      path: '/route-finder',
      color: 'bg-purple-500'
    },
    {
      id: 'belonging-tracking',
      title: 'Belonging Tracking',
      description: 'Track lost items with order status',
      icon: '🎒',
      path: '/belonging-tracking',
      color: 'bg-indigo-500'
    },
    {
      id: 'nearby-stops',
      title: 'Nearby Stops',
      description: 'Find bus stops and stations near you',
      icon: '📍',
      path: '/nearby-stops',
      color: 'bg-red-500'
    },
    {
      id: 'sos-alert',
      title: 'SOS Safety Alert',
      description: 'Emergency alert system for passenger safety',
      icon: '🚨',
      path: '/sos-alert',
      color: 'bg-red-600'
    }
  ];

  return (
    <Layout>
      <div className="w-full">
        {/* Hero Section */}
        <div className="relative h-[500px] bg-gradient-to-r from-blue-600 to-purple-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg')] bg-cover bg-center opacity-30" />
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-6xl font-bold mb-6">
                RTA NEPAL - NYXIS TECH 
                <br />
                <span className="text-yellow-300">Smart Transport</span>
              </h1>
              <p className="text-xl mb-8 leading-relaxed">
                Experience seamless public transportation across Kathmandu Valley with real-time tracking, 
                digital payments, and smart route planning. Your journey starts here.
              </p>
              <div className="flex gap-4">
                <Link to="/route-finder">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 text-lg">
                  Plan Your Journey
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg"
                  onClick={downloadApp}
                >
                  Download App
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Route Finder */}
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                  Find Your Route
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From (स्थान)
                    </label>
                    <Input 
                      placeholder="e.g., Ratna Park, New Baneshwor" 
                      className="h-12"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      To (गन्तव्य)
                    </label>
                    <Input 
                      placeholder="e.g., Bhaktapur, Patan" 
                      className="h-12"
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button 
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg"
                      onClick={handleRouteSearch}
                    >
                      खोज्नुहोस् (Search)
                    </Button>
                  </div>
                </div>
                
                {/* Search Results */}
                {showResults && (
                  <div className="mt-6">
                    <h3 className="text-lg font-bold mb-4">खोज परिणामहरू (Search Results):</h3>
                    <div className="space-y-3">
                      {searchResults.map((route) => (
                        <div key={route.id} className="p-4 border rounded-lg bg-blue-50">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold">{route.name}</h4>
                              <p className="text-sm text-gray-600">{route.startPoint} → {route.endPoint}</p>
                              <p className="text-sm">Distance: {route.distance} | Duration: {route.duration}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-blue-600 text-lg">{route.fare}</div>
                              <Link to="/route-finder">
                                <Button size="sm" className="mt-2">
                                  Select Route
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Services Grid */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">
                Our Services
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive transportation solutions for Kathmandu Valley residents and visitors
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service) => (
                <Link key={service.id} to={service.path}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                    <CardContent className="p-6 text-center h-full flex flex-col">
                      <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center text-2xl mb-4 mx-auto`}>
                        {service.icon}
                      </div>
                      <h3 className="text-lg font-bold mb-3 text-gray-800">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm flex-grow">
                        {service.description}
                      </p>
                      <Button variant="outline" className="mt-4 w-full">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">150+</div>
                <div className="text-lg">Active Vehicles</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">25+</div>
                <div className="text-lg">Routes</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-lg">Bus Stops</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className="text-lg">Daily Passengers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">
                Why Choose Our System?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                  ⚡
                </div>
                <h3 className="text-xl font-bold mb-3">Real-time Updates</h3>
                <p className="text-gray-600">
                  Get live updates on vehicle locations, delays, and route changes
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                  💰
                </div>
                <h3 className="text-xl font-bold mb-3">Digital Payments</h3>
                <p className="text-gray-600">
                  Pay seamlessly with eSewa, Khalti, IME Pay, and other digital wallets
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                  🛡️
                </div>
                <h3 className="text-xl font-bold mb-3">Safety First</h3>
                <p className="text-gray-600">
                  Emergency SOS system and real-time safety monitoring for all passengers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};