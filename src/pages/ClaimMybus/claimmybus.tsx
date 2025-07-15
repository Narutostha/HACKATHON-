import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { MapPin, Bus, Clock, Users, Star } from 'lucide-react';

// Static data for available buses
const availableBuses = [
  {
    id: 1,
    plateNumber: 'BA 18 KHA 9001',
    route: 'Tinkune → Ratnapark → New Baneshwor',
    driver: 'Ram Bahadur Shrestha',
    capacity: 50,
    currentPassengers: 12,
    departureTime: '8:00 AM',
    claimPrice: 'Rs. 50',
    rating: 4.8,
    amenities: ['AC', 'WiFi', 'USB Charging'],
    estimatedDuration: '45 minutes'
  },
  {
    id: 2,
    plateNumber: 'BA 12 PA 1234',
    route: 'Bhaktapur → Koteshwor → Tinkune',
    driver: 'Sita Kumari Tamang',
    capacity: 45,
    currentPassengers: 8,
    departureTime: '7:30 AM',
    claimPrice: 'Rs. 40',
    rating: 4.6,
    amenities: ['AC', 'Music System'],
    estimatedDuration: '35 minutes'
  },
  {
    id: 3,
    plateNumber: 'BA 15 CHA 5678',
    route: 'Patan → Lagankhel → Tinkune',
    driver: 'Krishna Prasad Oli',
    capacity: 40,
    currentPassengers: 15,
    departureTime: '8:15 AM',
    claimPrice: 'Rs. 45',
    rating: 4.7,
    amenities: ['WiFi', 'USB Charging', 'Reading Lights'],
    estimatedDuration: '40 minutes'
  }
];

export function ClaimMyBusPage() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [selectedBus, setSelectedBus] = useState(null);
  const [showBuses, setShowBuses] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);

  const searchBuses = () => {
    if (!fromLocation || !toLocation) {
      alert('कृपया दुवै स्थान भर्नुहोस् (Please fill both locations)');
      return;
    }
    setShowBuses(true);
  };

  const selectBus = (bus) => {
    setSelectedBus(bus);
  };

  const claimBus = () => {
    setShowClaimModal(true);
  };

  const confirmClaim = () => {
    setShowClaimModal(false);
    alert(`🎉 Bus Claimed Successfully!\n\nBus: ${selectedBus.plateNumber}\nRoute: ${selectedBus.route}\nDeparture: ${selectedBus.departureTime}\nPrice: ${selectedBus.claimPrice}\n\n✅ Your seat has been reserved!`);
  };

  return (
    <Layout>
      <div className="w-full min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">✋ Claim MY Bus</h1>
            <p className="text-xl">Reserve your seat in 4 simple steps</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Step 1: Select Route */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Step 1: Select Your Route
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From (बाट)
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input 
                      placeholder="e.g., Tinkune, Ratnapark" 
                      className="pl-10 h-12"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To (सम्म)
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input 
                      placeholder="e.g., Bhaktapur, Patan" 
                      className="pl-10 h-12"
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-end">
                  <Button 
                    className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-lg"
                    onClick={searchBuses}
                  >
                    Search Buses
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Select Bus */}
          {showBuses && (
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Step 2: Select Bus
                </h2>
                <p className="text-center text-gray-600 mb-6">
                  Route: <span className="font-semibold">{fromLocation} → {toLocation}</span>
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableBuses.map((bus) => (
                    <div
                      key={bus.id}
                      className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                        selectedBus?.id === bus.id
                          ? 'border-teal-500 bg-teal-50 shadow-lg'
                          : 'border-gray-200 hover:border-teal-300 hover:shadow-md'
                      }`}
                      onClick={() => selectBus(bus)}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">🚌</div>
                        <h3 className="text-lg font-bold mb-2">{bus.plateNumber}</h3>
                        <p className="text-sm text-gray-600 mb-3">{bus.route}</p>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Departure:</span>
                            <span className="font-medium">{bus.departureTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span className="font-medium">{bus.estimatedDuration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Available:</span>
                            <span className="font-medium">{bus.capacity - bus.currentPassengers} seats</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Price:</span>
                            <span className="font-bold text-teal-600 text-lg">{bus.claimPrice}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-center mt-3">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-sm">{bus.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Vehicle Details */}
          {selectedBus && (
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Step 3: Vehicle Details
                </h2>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-teal-600">Bus Information</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Plate Number:</span>
                          <span className="font-medium">{selectedBus.plateNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Driver:</span>
                          <span className="font-medium">{selectedBus.driver}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Capacity:</span>
                          <span className="font-medium">{selectedBus.capacity} passengers</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Current Load:</span>
                          <span className="font-medium">{selectedBus.currentPassengers} passengers</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rating:</span>
                          <span className="font-medium flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            {selectedBus.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-teal-600">Trip Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Route:</span>
                          <span className="font-medium">{selectedBus.route}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Departure Time:</span>
                          <span className="font-medium">{selectedBus.departureTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{selectedBus.estimatedDuration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amenities:</span>
                          <span className="font-medium">{selectedBus.amenities.join(', ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Claim Price:</span>
                          <span className="font-bold text-teal-600 text-xl">{selectedBus.claimPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Claim It */}
          {selectedBus && (
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Step 4: Claim Your Bus
                </h2>
                
                <div className="text-center">
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-bold text-teal-800 mb-3">Ready to Claim?</h3>
                    <p className="text-teal-700 mb-4">
                      You're about to claim <strong>{selectedBus.plateNumber}</strong> for the route <strong>{fromLocation} → {toLocation}</strong>
                    </p>
                    <div className="text-3xl font-bold text-teal-600">{selectedBus.claimPrice}</div>
                  </div>
                  
                  <Button 
                    className="bg-teal-600 hover:bg-teal-700 text-white px-12 py-4 text-xl rounded-lg"
                    onClick={claimBus}
                  >
                    ✋ Claim This Bus
                  </Button>
                  
                  <p className="text-sm text-gray-500 mt-4">
                    By claiming, you guarantee your seat and get priority boarding
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Claim Confirmation Modal */}
        {showClaimModal && selectedBus && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-center">Confirm Your Claim</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🚌</div>
                  <h4 className="font-bold text-lg">{selectedBus.plateNumber}</h4>
                  <p className="text-gray-600 mb-2">{selectedBus.route}</p>
                  <p className="text-sm">Departure: {selectedBus.departureTime}</p>
                  <div className="text-2xl font-bold text-teal-600 mt-2">{selectedBus.claimPrice}</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowClaimModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-teal-600 hover:bg-teal-700"
                  onClick={confirmClaim}
                >
                  Confirm Claim
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}