import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { vehicleData } from '../../data/staticData';
import { SearchIcon, MapPinIcon, UserIcon, FileTextIcon, NavigationIcon, UsersIcon } from 'lucide-react';

export const VehicleStatusPage = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  const filteredVehicles = vehicleData.filter(vehicle =>
    vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get physical location based on GPS coordinates
  const getPhysicalLocation = (vehicle: any) => {
    const locationMappings = [
      { lat: 27.6960, lng: 85.2410, location: "Near Kalanki Chowk, Ring Road" },
      { lat: 27.6965, lng: 85.2600, location: "Kalimati Vegetable Market Area" },
      { lat: 27.6920, lng: 85.2800, location: "Tripureshwor, Bagmati Bridge" },
      { lat: 27.6930, lng: 85.2990, location: "Maitighar Mandala Junction" },
      { lat: 27.6955, lng: 85.3160, location: "Tinkune Traffic Signal" },
      { lat: 27.6915, lng: 85.3453, location: "Tinkune Bus Stop" },
      { lat: 27.6890, lng: 85.3420, location: "Koteshwor Junction" },
      { lat: 27.6880, lng: 85.3470, location: "Jadibuti Bus Park Area" }
    ];

    const closest = locationMappings.find(loc => 
      Math.abs(loc.lat - vehicle.location.lat) < 0.01 && 
      Math.abs(loc.lng - vehicle.location.lng) < 0.01
    );

    return closest ? closest.location : `Near ${vehicle.location.lat.toFixed(4)}, ${vehicle.location.lng.toFixed(4)}`;
  };


  // Parse route to get from and to
  const getRouteFromTo = (route: string) => {
    const parts = route.split('→').map(part => part.trim());
    return {
      from: parts[0] || 'Unknown',
      to: parts[parts.length - 1] || 'Unknown',
      fullRoute: route
    };
  };

  return (
    <Layout>
      <div className="w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">Vehicle Status Monitor</h1>
            <p className="text-xl">Search and monitor vehicle information and compliance</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Search and Vehicle List */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Search Vehicles</h2>
                  
                  {/* Search Input */}
                  <div className="mb-6">
                    <div className="relative">
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Search by plate, route, or driver..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 py-3"
                      />
                    </div>
                  </div>

                  {/* Vehicle List */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {searchTerm ? (
                      filteredVehicles.length > 0 ? (
                        filteredVehicles.map((vehicle) => (
                          <div
                            key={vehicle.id}
                            className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                              selectedVehicle?.id === vehicle.id
                                ? 'border-orange-500 bg-orange-50 shadow-md'
                                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                            }`}
                            onClick={() => setSelectedVehicle(vehicle)}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="font-bold text-lg">{vehicle.plateNumber}</div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                                {vehicle.status}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 mb-1">{getRouteFromTo(vehicle.route).fullRoute}</div>
                            <div className="text-sm text-gray-500 mb-2">{vehicle.driver}</div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="flex items-center text-blue-600">
                                <MapPinIcon className="w-4 h-4 mr-1" />
                                {vehicle.distance || 'Location tracking'}
                              </span>
                              <span className="flex items-center text-green-600">
                                <UsersIcon className="w-4 h-4 mr-1" />
                                {vehicle.currentPassengers}/{vehicle.capacity}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <div className="text-4xl mb-4">🔍</div>
                          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Vehicles Found</h3>
                          <p className="text-gray-500">Try different search terms</p>
                        </div>
                      )
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🚌</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Search for Vehicles</h3>
                        <p className="text-gray-500 mb-4">Enter plate number, route, or driver name to find vehicles</p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                          <h4 className="font-semibold text-blue-800 mb-2">Search Tips:</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Enter plate number: BA 12 PA 1234</li>
                            <li>• Search by route: Tinkune, Maitighar</li>
                            <li>• Find by driver name: Ram Bahadur</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Vehicle Details */}
            <div className="lg:col-span-2">
              {selectedVehicle ? (
                <div className="space-y-6">
                  {/* Vehicle Header */}
                  <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-3xl font-bold text-orange-800">
                          {selectedVehicle.plateNumber}
                        </h2>
                        <div className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(selectedVehicle.status)}`}>
                          {selectedVehicle.status}
                        </div>
                      </div>
                      <p className="text-orange-700 text-lg">{selectedVehicle.type} - {getRouteFromTo(selectedVehicle.route).fullRoute}</p>
                    </CardContent>
                  </Card>
                

                  {/* Route Information */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <NavigationIcon className="w-6 h-6 mr-2 text-blue-600" />
                        Route Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">From</label>
                            <div className="text-lg font-bold text-green-600">
                              {getRouteFromTo(selectedVehicle.route).from}
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">To</label>
                            <div className="text-lg font-bold text-red-600">
                              {getRouteFromTo(selectedVehicle.route).to}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">Full Route</label>
                            <div className="text-lg">{selectedVehicle.route}</div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Current Speed</label>
                            <div className="text-lg font-bold text-blue-600">{selectedVehicle.speed} km/h</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Current Location */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <MapPinIcon className="w-6 h-6 mr-2 text-green-600" />
                        Current Location
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">Physical Address</label>
                            <div className="text-lg font-bold text-green-600">
                              {getPhysicalLocation(selectedVehicle)}
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Distance from You</label>
                            <div className="text-lg text-blue-600">
                              {selectedVehicle.distance || 'Location updating...'}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">GPS Coordinates</label>
                            <div className="font-mono text-sm bg-gray-100 p-3 rounded">
                              <div>Lat: {selectedVehicle.location.lat.toFixed(6)}</div>
                              <div>Lng: {selectedVehicle.location.lng.toFixed(6)}</div>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Last Updated</label>
                            <div className="text-lg">{new Date().toLocaleTimeString()}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Passenger Information */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <UsersIcon className="w-6 h-6 mr-2 text-purple-600" />
                        Passenger Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-3xl font-bold text-purple-600">{selectedVehicle.currentPassengers}</div>
                          <div className="text-sm text-gray-600">Current Passengers</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-3xl font-bold text-blue-600">{selectedVehicle.capacity}</div>
                          <div className="text-sm text-gray-600">Total Capacity</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-3xl font-bold text-orange-600">
                            {Math.round((selectedVehicle.currentPassengers / selectedVehicle.capacity) * 100)}%
                          </div>
                          <div className="text-sm text-gray-600">Occupancy Rate</div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="text-sm font-medium text-gray-500">Occupancy Level</label>
                        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                          <div 
                            className={`h-4 rounded-full ${
                              (selectedVehicle.currentPassengers / selectedVehicle.capacity) > 0.8 ? 'bg-red-500' :
                              (selectedVehicle.currentPassengers / selectedVehicle.capacity) > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${(selectedVehicle.currentPassengers / selectedVehicle.capacity) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Driver Information */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center">
                        <UserIcon className="w-6 h-6 mr-2 text-indigo-600" />
                        Driver Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">Driver Name</label>
                            <div className="text-lg font-bold">{selectedVehicle.driver}</div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Driver License Number</label>
                            <div className="text-lg font-mono font-bold text-indigo-600">
                              {selectedVehicle.driverLicense}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">License Status</label>
                            <div className="text-lg">
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                Valid
                              </span>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">Contact</label>
                            <div className="space-y-1">
                              <Button variant="outline" size="sm" className="mr-2">
                                📞 Call Driver
                              </Button>
                              <Button variant="outline" size="sm">
                                💬 Send Message
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="h-96 flex items-center justify-center">
                  <CardContent className="text-center">
                    <div className="text-6xl mb-4">🚌</div>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Vehicle Selected</h3>
                    <p className="text-gray-500">Search and select a vehicle to view detailed information</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};