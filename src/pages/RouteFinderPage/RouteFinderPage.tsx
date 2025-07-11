import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { routeData } from '../../data/staticData';

export const RouteFinderPage = (): JSX.Element => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [searchResults, setSearchResults] = useState(routeData);
  const [searchTriggered, setSearchTriggered] = useState(false);

  const handleSearch = () => {
    setSearchTriggered(true);

    const from = fromLocation.trim().toLowerCase();
    const to = toLocation.trim().toLowerCase();

    if (!from && !to) {
      setSearchResults(routeData);
      return;
    }

    const filtered = routeData.filter(route => {
      const allStops = [route.startPoint, ...route.stops, route.endPoint].map(s =>
        s.toLowerCase()
      );
      return allStops.includes(from) && allStops.includes(to);
    });

    setSearchResults(filtered.length > 0 ? filtered : []);
  };

  return (
    <Layout>
      <div className="w-full">
        {/* Header */}
        <div className="bg-purple-600 text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">Route Finder System</h1>
            <p className="text-xl">Find the best routes across Kathmandu Valley</p>
          </div>
        </div>

        {/* Search Section */}
        <div className="container mx-auto px-4 py-8">
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Search Route</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <Input
                    placeholder="e.g., Ratna Park"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <Input
                    placeholder="e.g., Bhaktapur"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Route Results */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Available Routes</h2>

              {!searchTriggered && (
                <div className="text-gray-500 text-center mb-4">
                  🚏 Select From and TO to search routes
                </div>
              )}

              {searchResults.length === 0 && (
                <div className="text-red-500 text-center mt-4">
                  ❌ No routes found for given input
                </div>
              )}

              <div className="space-y-6">
                {searchResults.map((route) => (
                  <div
                    key={route.id}
                    className="p-4 border rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    <h3 className="font-bold text-lg text-purple-700">{route.name}</h3>
                    <div className="text-gray-600">
                      {route.startPoint} → {route.endPoint}
                    </div>
                    <div className="text-sm mt-1 text-gray-500">
                      Stops: {route.stops.join(' → ')}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Fare: {route.fare} | Duration: {route.duration} | Distance: {route.distance}
                    </div>

                    {/* Vehicle Info */}
                    {route.vehicles && route.vehicles.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-700 mb-2">🚍 Vehicles on this route:</h4>
                        <div className="space-y-2">
                          {route.vehicles.map((vehicle, index) => (
                            <div key={index} className="bg-gray-100 p-3 rounded-md">
                              <div className="flex justify-between text-sm">
                                <div>
                                  <div><strong>Plate:</strong> {vehicle.plateNumber}</div>
                                  <div><strong>Driver:</strong> {vehicle.driver}</div>
                                </div>
                                <div className="text-right">
                                  <div><strong>Status:</strong> {vehicle.status}</div>
                                  <div><strong>📍 Location:</strong> {vehicle.location}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
  