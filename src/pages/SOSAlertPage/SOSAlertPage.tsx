import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { sosAlerts } from '../../data/staticData';

export const SOSAlertPage = (): JSX.Element => {
  const [selectedAlert, setSelectedAlert] = useState(sosAlerts[0]);
  const [showEmergencyForm, setShowEmergencyForm] = useState(false);
  const [emergencyType, setEmergencyType] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [emergencySubmitted, setEmergencySubmitted] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'Medical Emergency': return 'bg-red-500';
      case 'Vehicle Breakdown': return 'bg-orange-500';
      case 'Accident': return 'bg-purple-500';
      case 'Security Issue': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const emergencyTypes = [
    { id: 'medical', name: 'Medical Emergency', icon: '🚑', description: 'Health-related emergency' },
    { id: 'breakdown', name: 'Vehicle Breakdown', icon: '🔧', description: 'Vehicle malfunction or breakdown' },
    { id: 'accident', name: 'Accident', icon: '⚠️', description: 'Traffic accident or collision' },
    { id: 'security', name: 'Security Issue', icon: '🛡️', description: 'Safety or security concern' },
    { id: 'fire', name: 'Fire Emergency', icon: '🔥', description: 'Fire-related emergency' },
    { id: 'other', name: 'Other Emergency', icon: '🚨', description: 'Other urgent situation' }
  ];

  const triggerEmergency = () => {
    setShowConfirmation(true);
  };

  const confirmEmergency = () => {
    setShowConfirmation(false);
    setEmergencySubmitted(true);
    setTimeout(() => {
      setEmergencySubmitted(false);
      setShowEmergencyForm(false);
      setEmergencyType('');
    }, 4000);
  };

  const submitEmergencyReport = () => {
    if (!emergencyType) {
      alert('कृपया आपातकालीन प्रकार छान्नुहोस् (Please select emergency type)');
      return;
    }
    triggerEmergency();
  };
  return (
    <Layout>
      <div className="w-full">
        {/* Header */}
        <div className="bg-red-600 text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">SOS Safety Alert System</h1>
            <p className="text-xl">Emergency response and safety monitoring for all passengers</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Emergency Button */}
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <div className="text-6xl mb-2">🚨</div>
                <h2 className="text-3xl font-bold text-red-600 mb-2">Emergency Alert</h2>
                <p className="text-gray-700">Press the button below in case of emergency</p>
              </div>
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white text-xl px-12 py-4 h-auto"
                onClick={triggerEmergency}
              >
                🚨 EMERGENCY SOS
              </Button>
              <div className="mt-4 text-center">
                <Button 
                  variant="outline"
                  onClick={() => setShowEmergencyForm(!showEmergencyForm)}
                >
                  📝 Report Non-Emergency Issue
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Form */}
          {showEmergencyForm && (
            <Card className="mb-8 border-red-300">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-red-600">Report Emergency</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {emergencyTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        emergencyType === type.id
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setEmergencyType(type.id)}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">{type.icon}</div>
                        <div className="font-bold">{type.name}</div>
                        <div className="text-sm text-gray-600">{type.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Location
                    </label>
                    <Input placeholder="Current location or vehicle ID" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number
                    </label>
                    <Input placeholder="98XXXXXXXX" />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Details
                  </label>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md h-24"
                    placeholder="Describe the emergency situation..."
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={submitEmergencyReport}
                  >
                    🚨 Send Emergency Alert
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowEmergencyForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
                
                {/* Emergency Confirmation Modal */}
                {showConfirmation && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 text-center">
                      <div className="text-6xl mb-4">⚠️</div>
                      <h3 className="text-xl font-bold mb-4 text-red-600">Confirm Emergency Alert</h3>
                      <p className="text-gray-600 mb-6">
                        This will immediately alert emergency services and dispatch help to your location.
                        Are you sure this is a real emergency?
                      </p>
                      <div className="flex gap-3">
                        <Button 
                          className="flex-1 bg-red-600 hover:bg-red-700"
                          onClick={confirmEmergency}
                        >
                          🚨 YES, SEND ALERT
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => setShowConfirmation(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Emergency Submitted Modal */}
                {emergencySubmitted && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 text-center">
                      <div className="text-6xl mb-4">🚨</div>
                      <h3 className="text-xl font-bold mb-4 text-red-600">Emergency Alert Sent!</h3>
                      <div className="text-left space-y-2 mb-6">
                        <p>✅ Alert ID: SOS{Date.now().toString().slice(-6)}</p>
                        <p>✅ Location shared with responders</p>
                        <p>✅ Emergency services notified</p>
                        <p>✅ Help is on the way</p>
                      </div>
                      <div className="bg-red-50 p-3 rounded mb-4">
                        <p className="text-sm text-red-700">
                          <strong>Stay calm and stay on the line.</strong><br/>
                          Emergency responders will contact you shortly.
                        </p>
                      </div>
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        📞 Call Emergency Services
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Alerts List */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Recent Alerts</h2>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {sosAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedAlert.id === alert.id
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedAlert(alert)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 ${getAlertTypeColor(alert.alertType)} rounded-full mr-2`}></div>
                            <div className="font-bold text-sm">{alert.alertType}</div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                            {alert.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">Vehicle: {alert.vehicleId}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(alert.timestamp).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          ID: {alert.id}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alert Details */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Alert Overview */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Alert Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Alert ID</label>
                          <div className="text-lg font-bold">{selectedAlert.id}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Alert Type</label>
                          <div className="flex items-center">
                            <div className={`w-4 h-4 ${getAlertTypeColor(selectedAlert.alertType)} rounded-full mr-2`}></div>
                            <div className="text-lg font-bold">{selectedAlert.alertType}</div>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Vehicle ID</label>
                          <div className="text-lg">{selectedAlert.vehicleId}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Timestamp</label>
                          <div className="text-lg">{new Date(selectedAlert.timestamp).toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Current Status</label>
                          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedAlert.status)}`}>
                            {selectedAlert.status}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Location</label>
                          <div className="text-lg">
                            {selectedAlert.location.lat.toFixed(4)}, {selectedAlert.location.lng.toFixed(4)}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Responders</label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {selectedAlert.responders.map((responder, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {responder}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Description</label>
                          <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                            {selectedAlert.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Response Timeline */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Response Timeline</h2>
                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                      <div className="space-y-6">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4">
                            !
                          </div>
                          <div>
                            <div className="font-bold">Emergency Alert Received</div>
                            <div className="text-sm text-gray-600">{new Date(selectedAlert.timestamp).toLocaleString()}</div>
                            <div className="text-sm text-gray-500">Alert triggered from vehicle {selectedAlert.vehicleId}</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4">
                            2
                          </div>
                          <div>
                            <div className="font-bold">Response Team Dispatched</div>
                            <div className="text-sm text-gray-600">2 minutes after alert</div>
                            <div className="text-sm text-gray-500">
                              Dispatched: {selectedAlert.responders.join(', ')}
                            </div>
                          </div>
                        </div>
                        {selectedAlert.status === 'Resolved' && (
                          <div className="flex items-start">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4">
                              ✓
                            </div>
                            <div>
                              <div className="font-bold">Situation Resolved</div>
                              <div className="text-sm text-gray-600">15 minutes after alert</div>
                              <div className="text-sm text-gray-500">Emergency successfully handled</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contacts */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Emergency Contacts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="text-2xl mr-3">🚑</div>
                          <div>
                            <div className="font-bold">Medical Emergency</div>
                            <div className="text-sm text-gray-600">102 / 1115</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="text-2xl mr-3">🚓</div>
                          <div>
                            <div className="font-bold">Police</div>
                            <div className="text-sm text-gray-600">100 / 1114</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="text-2xl mr-3">🚒</div>
                          <div>
                            <div className="font-bold">Fire Department</div>
                            <div className="text-sm text-gray-600">101 / 1113</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="text-2xl mr-3">🚌</div>
                          <div>
                            <div className="font-bold">Transport Authority</div>
                            <div className="text-sm text-gray-600">1660</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};