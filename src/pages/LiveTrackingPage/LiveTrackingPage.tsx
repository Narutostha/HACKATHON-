import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { MapPinIcon, BusIcon, SearchIcon, ChevronDownIcon, NavigationIcon, ClockIcon } from 'lucide-react';

// Updated vehicle data with driver license
// Updated vehicle data with driver license
const vehicleData = [
  {
    id: 1,
    plateNumber: 'BA 18 KHA 9001',
    type: 'Bus',
    driver: 'Suman Thapa',
    driverLicense: 'DL-10001-2023',
    route: 'Nagdhunga → Kalanki → Ratnapark → Airport',
    status: 'Active',
    speed: 42,
    currentPassengers: 30,
    capacity: 50,
    location: { lat: 27.6960, lng: 85.2410 }, // ~ Kalanki area
    distance: '0.5 km from you',
    estimatedArrival: '5 minutes',
    upcomingStops: ['Kalanki', 'Rabi Bhawan', 'Tripureshwor', 'Ratnapark']
  },
  {
    id: 2,
    plateNumber: 'BA 18 KHA 9002',
    type: 'Bus',
    driver: 'Krishna Shrestha',
    driverLicense: 'DL-10002-2023',
    route: 'Nagdhunga → Kalanki → Ratnapark → Airport',
    status: 'Active',
    speed: 40,
    currentPassengers: 28,
    capacity: 50,
    location: { lat: 27.6965, lng: 85.2600 }, // ~ Kalimati area
    distance: '2.1 km from you',
    estimatedArrival: '12 minutes',
    upcomingStops: ['Tripureshwor', 'Ratnapark', 'Singha Durbar']
  },
  {
    id: 3,
    plateNumber: 'BA 18 KHA 9003',
    type: 'Bus',
    driver: 'Hari Prasad Oli',
    driverLicense: 'DL-34567-2023',
    route: 'Nagdhunga → Kalanki → Ratnapark → Airport',
    status: 'Active',
    speed: 38,
    currentPassengers: 26,
    capacity: 50,
    location: { lat: 27.6920, lng: 85.2800 }, // ~ Tripureshwor
    distance: '4.2 km from you',
    estimatedArrival: '18 minutes',
    upcomingStops: ['Singha Durbar', 'Maitighar', 'Bijulibazar']
  },
  {
    id: 4,
    plateNumber: 'BA 18 KHA 9004',
    type: 'Bus',
    driver: 'Bikash Gurung',
    driverLicense: 'DL-10004-2023',
    route: 'Nagdhunga → Kalanki → Ratnapark → Airport',
    status: 'Active',
    speed: 36,
    currentPassengers: 32,
    capacity: 50,
    location: { lat: 27.6930, lng: 85.2990 }, // ~ Maitighar area
    distance: '6.3 km from you',
    estimatedArrival: '22 minutes',
    upcomingStops: ['Bijulibazar', 'Naya Baneshwor', 'Tinkune']
  },
  {
    id: 5,
    plateNumber: 'BA 18 KHA 9005',
    type: 'Bus',
    driver: 'Sita Karki',
    driverLicense: 'DL-10005-2023',
    route: 'Nagdhunga → Kalanki → Ratnapark → Airport',
    status: 'Active',
    speed: 35,
    currentPassengers: 29,
    capacity: 50,
    location: { lat: 27.6955, lng: 85.3160 }, // ~ Tinkune area
    distance: '8.2 km from you',
    estimatedArrival: '27 minutes',
    upcomingStops: ['Sinamangal', 'Airport']
  },

  // Inactive buses
  {
    id: 6,
    plateNumber: 'BA 18 KHA 9006',
    type: 'Bus',
    driver: 'Ramesh Bhandari',
    driverLicense: 'DL-20001-2023',
    route: 'Godawari → Ratnapark',
    status: 'Inactive',
    speed: 0,
    currentPassengers: 0,
    capacity: 50,
    location: { lat: 27.6630, lng: 85.3240 },
    distance: 'Parked',
    estimatedArrival: 'Not in service',
    upcomingStops: []
  },
  {
    id: 7,
    plateNumber: 'BA 18 KHA 9007',
    type: 'Bus',
    driver: 'Meena Maharjan',
    driverLicense: 'DL-20002-2023',
    route: 'Lagankhel → New Buspark',
    status: 'Inactive',
    speed: 0,
    currentPassengers: 0,
    capacity: 50,
    location: { lat: 27.6790, lng: 85.3245 },
    distance: 'Parked',
    estimatedArrival: 'Not in service',
    upcomingStops: []
  },
  {
    id: 8,
    plateNumber: 'BA 18 KHA 9008',
    type: 'Bus',
    driver: 'Suresh Manandhar',
    driverLicense: 'DL-20003-2023',
    route: 'Lele → Jamal',
    status: 'Inactive',
    speed: 0,
    currentPassengers: 0,
    capacity: 50,
    location: { lat: 27.6540, lng: 85.3000 },
    distance: 'Maintenance',
    estimatedArrival: 'Not in service',
    upcomingStops: []
  },
  {
    id: 9,
    plateNumber: 'BA 18 KHA 9009',
    type: 'Bus',
    driver: 'Rita Tamang',
    driverLicense: 'DL-20004-2023',
    route: 'Nagdhunga → Budhanilkantha',
    status: 'Inactive',
    speed: 0,
    currentPassengers: 0,
    capacity: 50,
    location: { lat: 27.7350, lng: 85.3200 },
    distance: 'Idle',
    estimatedArrival: 'Not in service',
    upcomingStops: []
  },
  {
    id: 10,
    plateNumber: 'BA 18 KHA 9010',
    type: 'Bus',
    driver: 'Anil Shahi',
    driverLicense: 'DL-20005-2023',
    route: 'Lagankhel → Budhanilkantha',
    status: 'Inactive',
    speed: 0,
    currentPassengers: 0,
    capacity: 50,
    location: { lat: 27.7020, lng: 85.3440 },
    distance: 'Idle',
    estimatedArrival: 'Not in service',
    upcomingStops: []
  },
  {
    id: 11,
    plateNumber: 'BA 12 PA 1234',
    type: 'Bus',
    driver: 'Ram Bahadur Shrestha',
    driverLicense: 'DL-12345-2025',
    route: 'Tinkune → Maitighar → New Baneshwor',
    status: 'Active',
    speed: 45,
    currentPassengers: 32,
    capacity: 45,
    location: { lat: 27.6915, lng: 85.3453 },
    distance: '0.5 km from you',
    estimatedArrival: '3 minutes',
    upcomingStops: ['Maitighar', 'New Baneshwor', 'Thapathali', 'Tripureshwor']
  },
  {
    id: 12,
    plateNumber: 'BA 15 CHA 5678',
    type: 'Microbus',
    driver: 'Sita Kumari Tamang',
    driverLicense: 'DL-67890-2024',
    route: 'Tinkune → Bhaktapur → Madhyapur',
    status: 'Active',
    speed: 35,
    currentPassengers: 18,
    capacity: 25,
    location: { lat: 27.6890, lng: 85.3420 },
    distance: '1.2 km from you',
    estimatedArrival: '8 minutes',
    upcomingStops: ['Bhaktapur Durbar Square', 'Madhyapur Thimi', 'Lokanthali', 'Gatthaghar']
  },
  {
    id: 13,
    plateNumber: 'BA 18 KHA 9012',
    type: 'Bus',
    driver: 'Hari Prasad Oli',
    driverLicense: 'DL-34567-2023',
    route: 'Tinkune → Patan → Lalitpur',
    status: 'Active',
    speed: 40,
    currentPassengers: 28,
    capacity: 50,
    location: { lat: 27.6880, lng: 85.3470 },
    distance: '2.1 km from you',
    estimatedArrival: '12 minutes',
    upcomingStops: ['Patan Dhoka', 'Lagankhel', 'Pulchowk', 'Jawalakhel']
  }
];
export const LiveTrackingPage = (): JSX.Element => {
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('default');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showRouteDetails, setShowRouteDetails] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState(vehicleData);

  const userLocation = "Tinkune, Kathmandu";

  const trackingOptions = [
    { value: 'default', label: 'Select Your Requirement' },
    { value: 'active', label: 'Active Buses' },
    { value: 'nearby', label: 'Near Me' },
    { value: 'search', label: 'Search With Routes & Stops' }
  ];

  useEffect(() => {
    filterVehicles();
  }, [selectedOption, searchTerm]);

  const filterVehicles = () => {
    let filtered = [];

    switch (selectedOption) {
      case 'active':
        filtered = vehicleData.filter(vehicle => vehicle.status === 'Active');
        break;
      case 'nearby':
        // Filter by distance within 2 km and sort by distance (closest first)
        filtered = vehicleData
          .filter(vehicle => {
            // Extract numeric distance from string like "0.5 km from you"
            const distanceMatch = vehicle.distance.match(/(\d+\.?\d*)\s*km/);
            if (distanceMatch) {
              const distance = parseFloat(distanceMatch[1]);
              return distance <= 2; // Only show buses within 2 km
            }
            return false; // Exclude buses with non-numeric distances (like "Parked", "Maintenance", etc.)
          })
          .sort((a, b) => {
            const distanceA = parseFloat(a.distance.match(/(\d+\.?\d*)/)?.[1] || '0');
            const distanceB = parseFloat(b.distance.match(/(\d+\.?\d*)/)?.[1] || '0');
            return distanceA - distanceB;
          });
        break;
      case 'search':
        if (searchTerm) {
          filtered = vehicleData.filter(vehicle =>
            vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.upcomingStops.some(stop => 
              stop.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        } else {
          filtered = vehicleData; // Show all when search is active but no term entered
        }
        break;
      default:
        // Show no vehicles for default option
        filtered = [];
    }

    setFilteredVehicles(filtered);
  };

  // Function to get physical location based on GPS coordinates
  const getPhysicalLocation = (vehicle: any) => {
    // Map GPS coordinates to actual physical locations in Kathmandu
    const locationMappings = [
      { lat: 27.6960, lng: 85.2410, location: "Baneshwor" },
      { lat: 27.6965, lng: 85.2600, location: "Kalimati Vegetable Market Area" },
      { lat: 27.6920, lng: 85.2800, location: "Tripureshwor, Bagmati Bridge" },
      { lat: 27.6930, lng: 85.2990, location: "Maitighar Mandala Junction" },
      { lat: 27.6955, lng: 85.3160, location: "Tinkune Traffic Signal" },
      { lat: 27.6915, lng: 85.3453, location: "Tinkune Bus Stop" },
      { lat: 27.6890, lng: 85.3420, location: "Koteshwor Junction" },
      { lat: 27.6880, lng: 85.3470, location: "Jadibuti Bus Park Area" }
    ];

    // Find closest location match (within 0.01 degree radius)
    const closest = locationMappings.find(loc => 
      Math.abs(loc.lat - vehicle.location.lat) < 0.01 && 
      Math.abs(loc.lng - vehicle.location.lng) < 0.01
    );

    return closest ? closest.location : `Near ${vehicle.location.lat.toFixed(4)}, ${vehicle.location.lng.toFixed(4)}`;
  };

  const contactDriver = () => {
    setShowContactModal(true);
  };

  const viewRouteDetails = () => {
    setShowRouteDetails(true);
  };

  const reportIssue = () => {
    alert(`🚨 Issue Report for Vehicle ${selectedVehicle.plateNumber}\n\nIssue Types:\n• Vehicle breakdown\n• Route deviation\n• Driver behavior\n• Cleanliness\n• Safety concern\n\nYour report has been submitted to the control center.`);
  };

  const shareLocation = () => {
    const physicalLocation = getPhysicalLocation(selectedVehicle);
    const locationText = `📍 Bus Location Update\n\nVehicle: ${selectedVehicle.plateNumber}\nPhysical Location: ${physicalLocation}\nRoute: ${selectedVehicle.route}\nGPS: ${selectedVehicle.location.lat.toFixed(4)}, ${selectedVehicle.location.lng.toFixed(4)}\nSpeed: ${selectedVehicle.speed} km/h\nDistance from you: ${selectedVehicle.distance}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Bus Location',
        text: locationText,
      });
    } else {
      navigator.clipboard.writeText(locationText);
      alert('📋 Location details copied to clipboard!');
    }
  };

  return (
    <Layout>
      <div className="w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">Live GPS Tracking</h1>
                <p className="text-xl">Real-time vehicle tracking across Kathmandu Valley</p>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-xl p-4">
                <MapPinIcon className="w-6 h-6" />
                <div>
                  <div className="font-semibold">Your Location</div>
                  <div className="text-blue-100">{userLocation}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Tracking Options */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Select Tracking Option</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {trackingOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={selectedOption === option.value ? "default" : "outline"}
                    className={`h-auto p-4 flex flex-col items-center space-y-2 ${
                      selectedOption === option.value 
                        ? 'bg-blue-600 text-white' 
                        : 'hover:bg-blue-50'
                    }`}
                    onClick={() => setSelectedOption(option.value)}
                  >
                    <div className="text-2xl">
                      {option.value === 'active' && '🚌'}
                      {option.value === 'nearby' && '📍'}
                      {option.value === 'search' && '🔍'}
                      {option.value === 'default' && '⚙️'}
                    </div>
                    <span className="text-sm font-medium text-center">{option.label}</span>
                  </Button>
                ))}
              </div>

              {/* Search Input - Only show when search option is selected */}
              {selectedOption === 'search' && (
                <div className="mt-4">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Search by routes, stops, plate number, or driver..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 py-3 text-lg"
                    />
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <strong>Popular Routes:</strong> Tinkune → New Buspark, Tinkune → Bhaktapur, Tinkune → Patan
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Vehicle List */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">
                      {selectedOption === 'active' && 'Active Buses'}
                      {selectedOption === 'nearby' && 'Buses Near You'}
                      {selectedOption === 'search' && 'Search Results'}
                      {selectedOption === 'default' && 'Bus Information'}
                    </h2>
                    {selectedOption !== 'default' && (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {filteredVehicles.length} found
                      </span>
                    )}
                  </div>

                  {/* Vehicle List or No Data Message */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {selectedOption === 'default' ? (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🚌</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Bus Data Here</h3>
                        <p className="text-gray-500 mb-4">Please select a tracking option above to view available buses</p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                          <h4 className="font-semibold text-blue-800 mb-2">Available Options:</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• <strong>Active Buses:</strong> View all currently running buses</li>
                            <li>• <strong>Near Me:</strong> Find buses closest to Tinkune</li>
                            <li>• <strong>Search:</strong> Find specific routes or destinations</li>
                          </ul>
                        </div>
                      </div>
                    ) : filteredVehicles.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Buses Found</h3>
                        <p className="text-gray-500">
                          {selectedOption === 'search' 
                            ? 'Try searching with different routes or destinations'
                            : 'No buses match your current filter'
                          }
                        </p>
                      </div>
                    ) : (
                      filteredVehicles.map((vehicle) => (
                        <div
                          key={vehicle.id}
                          className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                            selectedVehicle?.id === vehicle.id
                              ? 'border-blue-500 bg-blue-50 shadow-md'
                              : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                          }`}
                          onClick={() => setSelectedVehicle(vehicle)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-bold text-lg">{vehicle.plateNumber}</div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              vehicle.status === 'Active' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {vehicle.status}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">{vehicle.route}</div>
                          <div className="text-sm text-gray-500 mb-2">{vehicle.driver}</div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="flex items-center text-blue-600">
                              <NavigationIcon className="w-4 h-4 mr-1" />
                              {vehicle.distance}
                            </span>
                            <span className="flex items-center text-green-600">
                              <ClockIcon className="w-4 h-4 mr-1" />
                              {vehicle.estimatedArrival}
                            </span>
                          </div>
                          <div className="mt-2 text-sm">
                            <span>Passengers: {vehicle.currentPassengers}/{vehicle.capacity}</span>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${(vehicle.currentPassengers / vehicle.capacity) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map and Details */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Current Location & Selected Vehicle */}
                {selectedVehicle && (
                  <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-blue-800 flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
                          Current Bus Location - LIVE
                        </h2>
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          🟢 Tracking Active
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="flex items-center space-x-2 mb-2">
                            <BusIcon className="w-5 h-5 text-blue-600" />
                            <span className="font-semibold text-gray-700">Vehicle Info</span>
                          </div>
                          <div className="text-lg font-bold">{selectedVehicle.plateNumber}</div>
                          <div className="text-sm text-gray-600">{selectedVehicle.type}</div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="flex items-center space-x-2 mb-2">
                            <MapPinIcon className="w-5 h-5 text-green-600" />
                            <span className="font-semibold text-gray-700">Distance</span>
                          </div>
                          <div className="text-lg font-bold text-green-600">{selectedVehicle.distance}</div>
                          <div className="text-sm text-gray-600">From Tinkune</div>
                        </div>
                        
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="flex items-center space-x-2 mb-2">
                            <ClockIcon className="w-5 h-5 text-orange-600" />
                            <span className="font-semibold text-gray-700">Arrival</span>
                          </div>
                          <div className="text-lg font-bold text-orange-600">{selectedVehicle.estimatedArrival}</div>
                          <div className="text-sm text-gray-600">Estimated</div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                          📍 Current Physical Location
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-600">Physical Address</div>
                            <div className="font-bold text-lg text-green-600 mb-2">{getPhysicalLocation(selectedVehicle)}</div>
                            <div className="text-sm text-gray-600">Current Route</div>
                            <div className="font-medium text-blue-600">{selectedVehicle.route}</div>
                            <div className="text-sm text-gray-600 mt-1">Speed: {selectedVehicle.speed} km/h</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">GPS Coordinates</div>
                            <div className="font-mono text-sm bg-gray-100 p-2 rounded mb-2">
                              <div>Lat: {selectedVehicle.location.lat.toFixed(6)}</div>
                              <div>Lng: {selectedVehicle.location.lng.toFixed(6)}</div>
                            </div>
                            <div className="text-xs text-gray-500">Last Updated: {new Date().toLocaleTimeString()}</div>
                            <div className="mt-2">
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium underline">
                                📍 Open in Google Maps
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Real-time Status Indicators */}
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                          <div className="text-green-600 font-semibold text-sm">Status</div>
                          <div className="text-green-800 font-bold">{selectedVehicle.status}</div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                          <div className="text-blue-600 font-semibold text-sm">Moving</div>
                          <div className="text-blue-800 font-bold">{selectedVehicle.speed > 0 ? 'Yes' : 'No'}</div>
                        </div>
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
                          <div className="text-orange-600 font-semibold text-sm">Occupancy</div>
                          <div className="text-orange-800 font-bold">{Math.round((selectedVehicle.currentPassengers / selectedVehicle.capacity) * 100)}%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Live Map */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Live Map</h2>
                    <div className="w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center relative overflow-hidden border-2 border-gray-200">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-200/50 to-blue-200/50"></div>
                      <div className="relative z-10 text-center">
                        <div className="text-6xl mb-4">🗺️</div>
                        <div className="text-xl font-bold text-gray-700 mb-2">Interactive Map</div>
                        {selectedVehicle ? (
                          <div className="text-gray-600 space-y-1">
                            <div className="font-bold text-lg text-blue-800">Vehicle: {selectedVehicle.plateNumber}</div>
                            <div className="font-semibold text-green-700">📍 {getPhysicalLocation(selectedVehicle)}</div>
                            <div>GPS: {selectedVehicle.location.lat.toFixed(4)}, {selectedVehicle.location.lng.toFixed(4)}</div>
                            <div className="font-medium text-orange-600">Your Location: {userLocation}</div>
                            <div className="font-medium text-blue-600">Distance: {selectedVehicle.distance}</div>
                          </div>
                        ) : (
                          <div className="text-gray-600">
                            Select a vehicle to view its location
                          </div>
                        )}
                        {/* Simulated vehicle marker */}
                        {selectedVehicle && (
                          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-6 h-6 bg-blue-600 rounded-full animate-pulse flex items-center justify-center">
                              <BusIcon className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                        {/* User location marker */}
                        <div className="absolute bottom-1/3 right-1/3 transform translate-x-1/2 translate-y-1/2">
                          <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                          <div className="text-xs mt-1 text-green-700 font-medium">You</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Routes */}
                {selectedVehicle && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">Upcoming Routes & Stops</h2>
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="font-semibold text-lg mb-2">Next Stops</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {selectedVehicle.upcomingStops.map((stop, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm">
                                <div className={`w-3 h-3 rounded-full ${
                                  index === 0 ? 'bg-blue-600' : 'bg-gray-300'
                                }`}></div>
                                <span className={index === 0 ? 'font-semibold text-blue-600' : 'text-gray-600'}>
                                  {stop}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="font-semibold text-blue-800">Next Stop</div>
                            <div className="text-blue-600">{selectedVehicle.upcomingStops[0]}</div>
                            <div className="text-blue-500">ETA: {selectedVehicle.estimatedArrival}</div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="font-semibold text-green-800">Current Speed</div>
                            <div className="text-green-600">{selectedVehicle.speed} km/h</div>
                            <div className="text-green-500">Normal Speed</div>
                          </div>
                          <div className="bg-orange-50 p-3 rounded-lg">
                            <div className="font-semibold text-orange-800">Occupancy</div>
                            <div className="text-orange-600">{Math.round((selectedVehicle.currentPassengers / selectedVehicle.capacity) * 100)}% Full</div>
                            <div className="text-orange-500">{selectedVehicle.currentPassengers}/{selectedVehicle.capacity} passengers</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Vehicle Details */}
                {selectedVehicle && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">Vehicle Details</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">Plate Number</label>
                            <div className="text-lg font-bold">{selectedVehicle.plateNumber}</div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Vehicle Type</label>
                            <div className="text-lg">{selectedVehicle.type}</div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Driver</label>
                            <div className="text-lg">{selectedVehicle.driver}</div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Driver License</label>
                            <div className="text-lg font-mono">{selectedVehicle.driverLicense}</div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">Current Speed</label>
                            <div className="text-lg font-bold text-blue-600">{selectedVehicle.speed} km/h</div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Route</label>
                            <div className="text-lg">{selectedVehicle.route}</div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Passengers</label>
                            <div className="text-lg">
                              {selectedVehicle.currentPassengers}/{selectedVehicle.capacity}
                              <span className="text-sm text-gray-500 ml-2">
                                ({Math.round((selectedVehicle.currentPassengers / selectedVehicle.capacity) * 100)}% full)
                              </span>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Distance from You</label>
                            <div className="text-lg font-semibold text-green-600">{selectedVehicle.distance}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Quick Actions */}
                {selectedVehicle && (
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
                      <div className="flex flex-wrap gap-3">
                        <Button 
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={contactDriver}
                        >
                          📞 Contact Driver
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={viewRouteDetails}
                        >
                          🗺️ View Route Details
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={reportIssue}
                        >
                          ⚠️ Report Issue
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={shareLocation}
                        >
                          📤 Share Location
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Modal */}
        {showContactModal && selectedVehicle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl max-w-md w-full mx-4 shadow-2xl">
              <h3 className="text-xl font-bold mb-4">Contact Driver</h3>
              <div className="space-y-3">
                <p><strong>Driver:</strong> {selectedVehicle.driver}</p>
                <p><strong>License:</strong> {selectedVehicle.driverLicense}</p>
                <p><strong>Vehicle:</strong> {selectedVehicle.plateNumber}</p>
                <p><strong>Route:</strong> {selectedVehicle.route}</p>
                <div className="flex gap-2 mt-4">
                  <Button className="flex-1">📞 Call Driver</Button>
                  <Button variant="outline" className="flex-1">💬 Send Message</Button>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => setShowContactModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
        
        {/* Route Details Modal */}
        {showRouteDetails && selectedVehicle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl max-w-lg w-full mx-4 shadow-2xl">
              <h3 className="text-xl font-bold mb-4">Route Details</h3>
              <div className="space-y-3">
                <p><strong>Route:</strong> {selectedVehicle.route}</p>
                <p><strong>Current Physical Location:</strong> <span className="text-green-600 font-semibold">{getPhysicalLocation(selectedVehicle)}</span></p>
                <p><strong>Next Stops:</strong> {selectedVehicle.upcomingStops.join(' → ')}</p>
                <p><strong>Estimated Arrival:</strong> {selectedVehicle.estimatedArrival}</p>
                <p><strong>Distance from You:</strong> {selectedVehicle.distance}</p>
                <p><strong>Current Speed:</strong> {selectedVehicle.speed} km/h</p>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm"><strong>Traffic Status:</strong> Normal traffic conditions</p>
                  <p className="text-sm"><strong>Occupancy:</strong> {Math.round((selectedVehicle.currentPassengers / selectedVehicle.capacity) * 100)}% full</p>
                  <p className="text-sm"><strong>GPS:</strong> {selectedVehicle.location.lat.toFixed(6)}, {selectedVehicle.location.lng.toFixed(6)}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => setShowRouteDetails(false)}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};