import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { MapPin, Navigation, Star, Share2, AlertTriangle, Clock, Bus, Zap, Wifi, Car } from 'lucide-react';

// Enhanced bus stops data with Tinkune area focus
const busStops = [
  {
    id: 'stop-001',
    name: 'Tinkune Bus Stop',
    location: { lat: 27.6789, lng: 85.3456 },
    routes: ['R001', 'R003', 'R005'],
    facilities: ['Shelter', 'Seating', 'CCTV', 'Lighting'],
    nearbyLandmarks: ['Tinkune Chowk', 'Local Market', 'School'],
    type: 'major',
    accessibility: true,
    lastUpdated: '2 mins ago'
  },
  {
    id: 'stop-002',
    name: 'Sinamangal Chowk',
    location: { lat: 27.6823, lng: 85.3478 },
    routes: ['R002', 'R004'],
    facilities: ['Shelter', 'Ticket Counter', 'WiFi'],
    nearbyLandmarks: ['Sinamangal Temple', 'Hospital', 'Bank'],
    type: 'major',
    accessibility: true,
    lastUpdated: '5 mins ago'
  },
  {
    id: 'stop-003',
    name: 'Airport Road Junction',
    location: { lat: 27.6756, lng: 85.3512 },
    routes: ['R001', 'R002', 'R006'],
    facilities: ['Shelter', 'Parking', 'Food Stall'],
    nearbyLandmarks: ['Airport Road', 'Hotel', 'Office Complex'],
    type: 'minor',
    accessibility: false,
    lastUpdated: '1 min ago'
  },
  {
    id: 'stop-004',
    name: 'Baneshwor Chowk',
    location: { lat: 27.6845, lng: 85.3389 },
    routes: ['R003', 'R005', 'R007'],
    facilities: ['Shelter', 'Seating', 'CCTV', 'Toilet'],
    nearbyLandmarks: ['Baneshwor Temple', 'Shopping Center', 'College'],
    type: 'major',
    accessibility: true,
    lastUpdated: '3 mins ago'
  },
  {
    id: 'stop-005',
    name: 'Koteshwor Chowk',
    location: { lat: 27.6712, lng: 85.3423 },
    routes: ['R004', 'R006'],
    facilities: ['Shelter', 'Lighting'],
    nearbyLandmarks: ['Koteshwor Temple', 'Market', 'Clinic'],
    type: 'minor',
    accessibility: false,
    lastUpdated: '7 mins ago'
  }
];

// Route data
const routeData = [
  {
    id: 'R001',
    name: 'Tinkune - Ratna Park',
    startPoint: 'Tinkune',
    endPoint: 'Ratna Park',
    fare: 'Rs. 25',
    duration: '25 mins',
    distance: '8.5 km',
    frequency: 'Every 10 mins',
    operatingHours: '5:30 AM - 10:00 PM'
  },
  {
    id: 'R002',
    name: 'Airport Route',
    startPoint: 'Sinamangal',
    endPoint: 'Tribhuvan Airport',
    fare: 'Rs. 15',
    duration: '15 mins',
    distance: '4.2 km',
    frequency: 'Every 15 mins',
    operatingHours: '24 Hours'
  },
  {
    id: 'R003',
    name: 'Ring Road Circle',
    startPoint: 'Tinkune',
    endPoint: 'Kalanki',
    fare: 'Rs. 35',
    duration: '45 mins',
    distance: '15.3 km',
    frequency: 'Every 20 mins',
    operatingHours: '6:00 AM - 9:00 PM'
  }
];

export const NearbyStopsPage = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedStop, setSelectedStop] = useState(busStops[0]);
  // Set current location to Tinkune coordinates
  const [userLocation] = useState({ 
    lat: 27.6789, 
    lng: 85.3456, 
    name: 'Tinkune, Kathmandu'
  });
  const [favorites, setFavorites] = useState([]);
  const [showDirections, setShowDirections] = useState(false);
  const [nearbyStops, setNearbyStops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced distance calculation using Haversine formula
  const calculateDistance = (stop) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (stop.location.lat - userLocation.lat) * Math.PI / 180;
    const dLng = (stop.location.lng - userLocation.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(stop.location.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance.toFixed(2);
  };

  // Filter stops within 1 km and sort by distance
  useEffect(() => {
    const filteredStops = busStops
      .map(stop => ({
        ...stop,
        distance: parseFloat(calculateDistance(stop))
      }))
      .filter(stop => stop.distance <= 1.0) // Only stops within 1 km
      .sort((a, b) => a.distance - b.distance);
    
    setNearbyStops(filteredStops);
    if (filteredStops.length > 0) {
      setSelectedStop(filteredStops[0]);
    }
  }, []);

  const searchNearbyStops = () => {
    if (!searchLocation.trim()) {
      alert('कृपया स्थान प्रविष्ट गर्नुहोस् (Please enter a location)');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      alert(`🔍 Searching stops near: ${searchLocation}\n\n📍 Found ${nearbyStops.length} stops within 1 km from Tinkune:\n${nearbyStops.map(stop => `• ${stop.name} - ${stop.distance} km`).join('\n')}\n\n✅ Results updated on map`);
      setIsLoading(false);
    }, 1000);
  };

  const useCurrentLocation = () => {
    setIsLoading(true);
    setTimeout(() => {
      alert(`📍 Current Location: ${userLocation.name}\n\nCoordinates: ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}\n\n🔍 Found ${nearbyStops.length} bus stops within 1 km:\n${nearbyStops.map(stop => `• ${stop.name} - ${stop.distance} km`).join('\n')}\n\n✅ Showing nearest stops first`);
      setIsLoading(false);
    }, 800);
  };

  const getDirections = () => {
    setShowDirections(true);
  };

  const setAsFavorite = () => {
    if (!favorites.includes(selectedStop.id)) {
      setFavorites([...favorites, selectedStop.id]);
      alert(`⭐ ${selectedStop.name} added to favorites!\n\n📱 You can now:\n• Get quick directions\n• Receive arrival notifications\n• View in favorites list\n\n✅ Saved to your profile`);
    } else {
      alert('⭐ Stop already in favorites!');
    }
  };

  const shareLocation = () => {
    const locationText = `📍 Bus Stop: ${selectedStop.name}\n\nDistance from Tinkune: ${selectedStop.distance} km\nLocation: ${selectedStop.location.lat.toFixed(4)}, ${selectedStop.location.lng.toFixed(4)}\n\nRoutes: ${selectedStop.routes.join(', ')}\nFacilities: ${selectedStop.facilities.join(', ')}\n\nNearby: ${selectedStop.nearbyLandmarks.join(', ')}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Bus Stop Location',
        text: locationText,
      });
    } else {
      navigator.clipboard.writeText(locationText);
      alert('📋 Location information copied to clipboard!');
    }
  };

  const reportIssue = () => {
    alert(`🚨 Report Issue - ${selectedStop.name}\n\nIssue Types:\n• Stop condition\n• Missing facilities\n• Safety concerns\n• Cleanliness\n• Accessibility\n• Signage problems\n\n📝 Your report helps improve stop conditions\n✅ Issue reported to maintenance team`);
  };

  const viewLiveArrivals = () => {
    alert(`🚌 Live Bus Arrivals - ${selectedStop.name}\n\nNext Arrivals:\n🚌 Route R001: 3 minutes\n🚌 Route R002: 8 minutes\n🚌 Route R003: 12 minutes\n\nUpdated: ${new Date().toLocaleTimeString()}\n\n📱 Enable notifications for real-time updates`);
  };

  const getFacilityIcon = (facility) => {
    switch (facility.toLowerCase()) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'parking': return <Car className="w-4 h-4" />;
      case 'cctv': return <Zap className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <Layout>
      <div className="w-full">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">Nearby Stops & Stations</h1>
              <p className="text-xl text-blue-100 mb-6">Find bus stops and stations within 1 km of your location</p>
              <div className="flex items-center justify-center gap-2 text-blue-100">
                <MapPin className="w-5 h-5" />
                <span className="text-lg font-medium">Current Location: {userLocation.name}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Enhanced Location Search */}
          <Card className="mb-8 shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Navigation className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold">Find Nearby Stops</h2>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  {nearbyStops.length} stops within 1 km
                </span>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Enter location or search for stops..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10 h-12 text-lg"
                    onKeyPress={(e) => e.key === 'Enter' && searchNearbyStops()}
                  />
                </div>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 h-12 px-8"
                  onClick={searchNearbyStops}
                  disabled={isLoading}
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={useCurrentLocation}
                  className="h-12 px-6"
                  disabled={isLoading}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Use Current Location
                </Button>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                📍 Showing stops within 1 km radius from Tinkune • Last updated: {new Date().toLocaleTimeString()}
              </div>
            </CardContent>
          </Card>

          {nearbyStops.length === 0 ? (
            <Card className="shadow-lg">
              <CardContent className="p-8 text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-600 mb-2">No stops found within 1 km</h3>
                <p className="text-gray-500">Try searching for a different location or expand your search radius.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Enhanced Stops List */}
              <div className="lg:col-span-1">
                <Card className="shadow-lg sticky top-4">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">Nearby Stops</h2>
                      <span className="text-sm text-gray-500">Within 1 km</span>
                    </div>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {nearbyStops.map((stop) => (
                        <div
                          key={stop.id}
                          className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                            selectedStop.id === stop.id
                              ? 'border-blue-500 bg-blue-50 shadow-md'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                          onClick={() => setSelectedStop(stop)}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="font-bold text-lg flex items-center gap-2">
                                {stop.name}
                                {stop.type === 'major' && (
                                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                    Major
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                <Clock className="w-3 h-3" />
                                Updated {stop.lastUpdated}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-blue-600">
                                {stop.distance} km
                              </div>
                              <div className="text-xs text-gray-500">
                                ~{Math.round(stop.distance * 12)} min walk
                              </div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <div className="text-sm text-gray-600 mb-2">
                              <Bus className="w-4 h-4 inline mr-1" />
                              Routes: {stop.routes.join(', ')}
                            </div>
                            <div className="text-sm text-gray-500">
                              📍 {stop.nearbyLandmarks.slice(0, 2).join(', ')}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {stop.facilities.slice(0, 3).map((facility, index) => (
                              <span key={index} className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                                {getFacilityIcon(facility)}
                                {facility}
                              </span>
                            ))}
                            {stop.facilities.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                                +{stop.facilities.length - 3} more
                              </span>
                            )}
                          </div>

                          {stop.accessibility && (
                            <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                              <span>♿</span>
                              Wheelchair Accessible
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Map and Details */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {/* Enhanced Map */}
                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">Location Map</h2>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span>Your Location</span>
                          <div className="w-3 h-3 bg-blue-500 rounded-full ml-3"></div>
                          <span>Selected Stop</span>
                        </div>
                      </div>
                      <div className="w-full h-80 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center relative overflow-hidden border-2 border-blue-200">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50"></div>
                        <div className="relative z-10 text-center">
                          <div className="text-6xl mb-4">🗺️</div>
                          <div className="text-xl font-bold text-gray-700 mb-2">Interactive Map View</div>
                          <div className="text-gray-600 space-y-1">
                            <div>📍 Current: {userLocation.name}</div>
                            <div>🚏 Selected: {selectedStop.name}</div>
                            <div className="text-lg font-bold text-blue-600">
                              📏 Distance: {selectedStop.distance} km
                            </div>
                          </div>
                        </div>
                        
                        {/* Simulated markers with enhanced positioning */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse border-2 border-white shadow-lg"></div>
                          <div className="text-xs font-bold text-red-600 mt-1 whitespace-nowrap">You are here</div>
                        </div>
                        
                        {/* Selected stop marker */}
                        <div className="absolute top-1/3 right-1/3">
                          <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                          <div className="text-xs font-bold text-blue-600 mt-1 whitespace-nowrap">{selectedStop.name}</div>
                        </div>

                        {/* Other nearby stops */}
                        {nearbyStops.slice(1, 4).map((stop, index) => (
                          <div 
                            key={stop.id} 
                            className={`absolute w-4 h-4 bg-green-500 rounded-full border border-white shadow ${
                              index === 0 ? 'bottom-1/3 left-1/4' :
                              index === 1 ? 'top-1/4 right-1/4' :
                              'bottom-1/4 right-1/2'
                            }`}
                          ></div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Stop Details */}
                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold">Stop Information</h2>
                        <div className="flex items-center gap-2">
                          {selectedStop.accessibility && (
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                              ♿ Accessible
                            </span>
                          )}
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                            selectedStop.type === 'major' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {selectedStop.type === 'major' ? '🚏 Major Stop' : '🚏 Minor Stop'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <label className="text-sm font-medium text-blue-700">Stop Name</label>
                            <div className="text-xl font-bold text-blue-900">{selectedStop.name}</div>
                          </div>
                          
                          <div className="bg-green-50 p-4 rounded-lg">
                            <label className="text-sm font-medium text-green-700">Distance from Tinkune</label>
                            <div className="text-xl font-bold text-green-900">{selectedStop.distance} km away</div>
                            <div className="text-sm text-green-600 mt-1">
                              ~{Math.round(selectedStop.distance * 12)} minutes walking
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium text-gray-500">Available Routes</label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {selectedStop.routes.map((routeId) => {
                                const route = routeData.find(r => r.id === routeId);
                                return (
                                  <span key={routeId} className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                                    <Bus className="w-4 h-4" />
                                    {route?.name || routeId}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500 mb-2 block">Available Facilities</label>
                            <div className="grid grid-cols-2 gap-2">
                              {selectedStop.facilities.map((facility, index) => (
                                <div key={index} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg text-sm">
                                  {getFacilityIcon(facility)}
                                  {facility}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium text-gray-500">Nearby Landmarks</label>
                            <div className="mt-2 space-y-1">
                              {selectedStop.nearbyLandmarks.map((landmark, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                  <MapPin className="w-3 h-3" />
                                  {landmark}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <label className="text-sm font-medium text-gray-500">Coordinates</label>
                            <div className="text-sm text-gray-600 mt-1 font-mono">
                              {selectedStop.location.lat.toFixed(6)}, {selectedStop.location.lng.toFixed(6)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Route Information */}
                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">Routes from This Stop</h2>
                      <div className="space-y-4">
                        {selectedStop.routes.map((routeId) => {
                          const route = routeData.find(r => r.id === routeId);
                          if (!route) return null;
                          
                          return (
                            <div key={routeId} className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h3 className="font-bold text-lg flex items-center gap-2">
                                    <Bus className="w-5 h-5 text-blue-600" />
                                    {route.name}
                                  </h3>
                                  <div className="text-gray-600 flex items-center gap-2 mt-1">
                                    <Navigation className="w-4 h-4" />
                                    {route.startPoint} → {route.endPoint}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-blue-600 text-lg">{route.fare}</div>
                                  <div className="text-sm text-gray-500">{route.duration}</div>
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div className="bg-blue-50 p-3 rounded-lg text-center">
                                  <span className="text-blue-600 font-medium">Distance</span>
                                  <div className="font-bold text-blue-900">{route.distance}</div>
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg text-center">
                                  <span className="text-green-600 font-medium">Frequency</span>
                                  <div className="font-bold text-green-900">{route.frequency}</div>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-lg text-center">
                                  <span className="text-purple-600 font-medium">Operating</span>
                                  <div className="font-bold text-purple-900">{route.operatingHours}</div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Quick Actions */}
                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700 h-12"
                          onClick={getDirections}
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={setAsFavorite}
                          className="h-12"
                        >
                          <Star className={`w-4 h-4 mr-2 ${favorites.includes(selectedStop.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                          {favorites.includes(selectedStop.id) ? 'Favorited' : 'Add Favorite'}
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={shareLocation}
                          className="h-12"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share Location
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={reportIssue}
                          className="h-12"
                        >
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Report Issue
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={viewLiveArrivals}
                          className="h-12"
                        >
                          <Bus className="w-4 h-4 mr-2" />
                          Live Arrivals
                        </Button>
                        <Button 
                          variant="outline"
                          className="h-12"
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          Set Reminder
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Directions Modal */}
          {showDirections && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Navigation className="w-6 h-6 text-blue-600" />
                    Directions to {selectedStop.name}
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-blue-600 font-medium">Distance</span>
                          <div className="font-bold">{selectedStop.distance} km</div>
                        </div>
                        <div>
                          <span className="text-blue-600 font-medium">Walking Time</span>
                          <div className="font-bold">~{Math.round(selectedStop.distance * 12)} minutes</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium mb-2">🚶‍♂️ Walking Route:</p>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>1. Head northeast from Tinkune Chowk</p>
                        <p>2. Continue straight for {Math.round(selectedStop.distance * 800)}m</p>
                        <p>3. {selectedStop.name} will be on your {selectedStop.distance < 0.5 ? 'right' : 'left'}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <MapPin className="w-4 h-4 mr-2" />
                        Open in Maps
                      </Button>
                      <Button variant="outline">
                        <Navigation className="w-4 h-4 mr-2" />
                        Start Navigation
                      </Button>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => setShowDirections(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};