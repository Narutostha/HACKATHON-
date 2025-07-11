import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Layout } from '../../components/Layout';
import { Phone, MapPin, Clock, User, AlertTriangle, Star, Search, Share2, Package, MessageCircle, CheckCircle } from 'lucide-react';

// Sample data for belonging tracking
const belongingTrackingData = [
  {
    id: 'BT001',  
    itemName: 'Black Backpack',
    description: 'Black backpack with laptop compartment',
    route: 'Ratna Park - Bhaktapur',
    vehicleId: 'BA-3-KHA-1234',
    reportedDate: '2025-07-10',
    status: 'Found',
    location: 'Bhaktapur Bus Station',
    contactInfo: '+977-9841234567'
  },
  {
    id: 'BT002',
    itemName: 'Mobile Phone',
    description: 'Samsung Galaxy S23, Blue color',
    route: 'Kathmandu - Pokhara',
    vehicleId: 'BA-2-CHA-5678',
    reportedDate: '2025-07-09',
    status: 'Searching',
    location: 'Under Investigation',
    contactInfo: '+977-9812345678'
  },
  {
    id: 'BT003',
    itemName: 'Wallet',
    description: 'Brown leather wallet with ID cards',
    route: 'Lalitpur - Kathmandu',
    vehicleId: 'BA-1-PA-9012',
    reportedDate: '2025-07-08',
    status: 'Returned',
    location: 'Returned to Owner',
    contactInfo: '+977-9823456789'
  }
];

// Enhanced sample travel records with more details
const travelRecords = [
  {
    id: 'TR001',
    date: '2025-07-11',
    time: '08:30 AM',
    route: 'Kathmandu - Bhaktapur',
    vehicleId: 'BA-3-KHA-1234',
    driverName: 'Ram Bahadur Shrestha',
    driverContact: '+977-9841111111',
    ticketPrice: 'Rs. 45',
    seatNumber: '12A',
    status: 'Completed',
    boardingPoint: 'Ratna Park Bus Station',
    dropPoint: 'Bhaktapur Durbar Square',
    operatorName: 'Green Line Express',
    duration: '45 minutes',
    rating: 4.5
  },
  {
    id: 'TR002',
    date: '2025-07-10',
    time: '02:15 PM',
    route: 'Bhaktapur - Kathmandu',
    vehicleId: 'BA-2-CHA-5678',
    driverName: 'Shyam Kumar Tamang',
    driverContact: '+977-9842222222',
    ticketPrice: 'Rs. 45',
    seatNumber: '08B',
    status: 'Completed',
    boardingPoint: 'Bhaktapur Bus Station',
    dropPoint: 'New Bus Park',
    operatorName: 'City Express',
    duration: '50 minutes',
    rating: 4.2
  },
  {
    id: 'TR003',
    date: '2025-07-09',
    time: '06:45 PM',
    route: 'Kathmandu - Lalitpur',
    vehicleId: 'BA-1-PA-9012',
    driverName: 'Hari Prasad Gurung',
    driverContact: '+977-9843333333',
    ticketPrice: 'Rs. 35',
    seatNumber: '15C',
    status: 'Completed',
    boardingPoint: 'Ratna Park',
    dropPoint: 'Lagankhel',
    operatorName: 'Valley Transport',
    duration: '35 minutes',
    rating: 4.8
  },
  {
    id: 'TR004',
    date: '2025-07-08',
    time: '09:20 AM',
    route: 'Lalitpur - Patan',
    vehicleId: 'BA-4-GHA-3456',
    driverName: 'Krishna Bahadur Magar',
    driverContact: '+977-9844444444',
    ticketPrice: 'Rs. 25',
    seatNumber: '06A',
    status: 'Completed',
    boardingPoint: 'Lagankhel Bus Station',
    dropPoint: 'Patan Durbar Square',
    operatorName: 'Local Bus Service',
    duration: '25 minutes',
    rating: 4.0
  },
  {
    id: 'TR005',
    date: '2025-07-07',
    time: '11:00 AM',
    route: 'Kathmandu - Pokhara',
    vehicleId: 'BA-5-NA-7890',
    driverName: 'Binod Thapa Magar',
    driverContact: '+977-9845555555',
    ticketPrice: 'Rs. 850',
    seatNumber: '22A',
    status: 'Completed',
    boardingPoint: 'Gongabu Bus Park',
    dropPoint: 'Pokhara Bus Park',
    operatorName: 'Tourist Bus Service',
    duration: '6 hours',
    rating: 4.6
  }
];

const BelongingTrackingPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [selectedItem, setSelectedItem] = useState(belongingTrackingData[0]);
  const [showReportForm, setShowReportForm] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showTravelReportForm, setShowTravelReportForm] = useState(false);
  const [selectedTravelRecord, setSelectedTravelRecord] = useState(null);
  const [reportReason, setReportReason] = useState('');
  const [reportExplanation, setReportExplanation] = useState('');
  const [reportContactNumber, setReportContactNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Form states for reporting lost items
  const [lostItemForm, setLostItemForm] = useState({
    itemName: '',
    description: '',
    route: '',
    vehicleId: '',
    dateLost: '',
    contactNumber: '',
    alternateContact: '',
    estimatedValue: '',
    category: '',
    urgency: 'medium'
  });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Found': return 'bg-green-100 text-green-800 border-green-200';
      case 'Returned': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Searching': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    
    return stars;
  };

  const trackItem = () => {
    if (!trackingId.trim()) {
      showNotification('कृपया ट्र्याकिङ आईडी प्रविष्ट गर्नुहोस् (Please enter tracking ID)', 'error');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const foundItem = belongingTrackingData.find(item => item.id.toLowerCase() === trackingId.toLowerCase());
      if (foundItem) {
        setSelectedItem(foundItem);
        showNotification(`✅ Item Found! ${foundItem.itemName} - Status: ${foundItem.status}`, 'success');
      } else {
        showNotification('❌ Item not found. Please check your tracking ID or contact support.', 'error');
      }
      setLoading(false);
    }, 1000);
  };

  const handleLostItemFormChange = (field, value) => {
    setLostItemForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const submitReport = () => {
    // Validate form
    if (!lostItemForm.itemName || !lostItemForm.description || !lostItemForm.contactNumber) {
      showNotification('कृपया आवश्यक क्षेत्रहरू भर्नुहोस् (Please fill required fields)', 'error');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const newTrackingId = 'BT' + (Date.now().toString().slice(-3));
      showNotification(`✅ Lost Item Report Submitted! Tracking ID: ${newTrackingId}`, 'success');
      
      // Reset form
      setLostItemForm({
        itemName: '',
        description: '',
        route: '',
        vehicleId: '',
        dateLost: '',
        contactNumber: '',
        alternateContact: '',
        estimatedValue: '',
        category: '',
        urgency: 'medium'
      });
      
      setShowReportForm(false);
      setLoading(false);
    }, 1500);
  };

  const submitTravelReport = () => {
    if (!reportReason || !reportExplanation || reportExplanation.length < 20) {
      showNotification('कृपया सबै आवश्यक क्षेत्रहरू भर्नुहोस् (Please fill all required fields)', 'error');
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      const reportId = 'RPT' + Date.now().toString().slice(-4);
      showNotification(`✅ Travel Report Submitted! Report ID: ${reportId}`, 'success');
      
      // Reset form
      setShowTravelReportForm(false);
      setReportReason('');
      setReportExplanation('');
      setReportContactNumber('');
      setSelectedTravelRecord(null);
      setLoading(false);
    }, 1500);
  };

  const callDriver = (driverContact, driverName, record) => {
    const confirmCall = window.confirm(`📞 Call ${driverName}?\n\nNumber: ${driverContact}\n\nThis will open your phone dialer to call the driver directly.`);
    
    if (confirmCall) {
      window.open(`tel:${driverContact}`);
      showNotification(`📞 Calling ${driverName} - ${record.route}`, 'info');
    }
  };

  const openTravelReportForm = (record) => {
    setSelectedTravelRecord(record);
    setShowTravelReportForm(true);
  };

  const contactSupport = () => {
    setShowContactModal(true);
  };

  const updateInformation = () => {
    setShowUpdateModal(true);
  };

  const shareTracking = async () => {
    const trackingText = `📦 Lost Item Tracking\n\nTracking ID: ${selectedItem.id}\nItem: ${selectedItem.itemName}\nStatus: ${selectedItem.status}\nLocation: ${selectedItem.location}\n\nContact: ${selectedItem.contactInfo}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Item Tracking',
          text: trackingText,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(trackingText);
        showNotification('📋 Tracking information copied to clipboard!', 'success');
      } catch (err) {
        console.log('Copy failed:', err);
      }
    }
  };

  const arrangePickup = () => {
    showNotification(`📦 Pickup arranged for ${selectedItem.itemName}!`, 'success');
  };

  return (
    <Layout>
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg border max-w-sm ${
          notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
          notification.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
          'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
            {notification.type === 'error' && <AlertTriangle className="w-5 h-5" />}
            {notification.type === 'info' && <MessageCircle className="w-5 h-5" />}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      <div className="w-full min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold mb-4">Belonging Tracking System</h1>
              <p className="text-xl text-indigo-100 mb-8">Track lost items and report travel issues with real-time updates</p>
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span>Real-time Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span>Instant Notifications</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Quick Track Section */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Search className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold">Track Your Item</h2>
              </div>
              <div className="flex gap-4">
                <Input
                  placeholder="Enter tracking ID (e.g., BT001)"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && trackItem()}
                />
                <Button 
                  className="bg-indigo-600 hover:bg-indigo-700 px-8"
                  onClick={trackItem}
                  disabled={loading}
                >
                  {loading ? 'Tracking...' : 'Track Item'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowReportForm(!showReportForm)}
                  className="px-6"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Report Lost Item
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Travel Records Section */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-2xl font-bold">Past Travel Records</h2>
                </div>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {travelRecords.length} travel records found
                </div>
              </div>
              
              <div className="space-y-4">
                {travelRecords.map((record) => (
                  <div key={record.id} className="border rounded-xl p-6 bg-white hover:shadow-lg transition-all duration-200 border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        {/* Route and Status */}
                        <div className="flex items-center gap-3 mb-3">
                          <MapPin className="w-5 h-5 text-indigo-600" />
                          <span className="font-bold text-xl text-gray-800">{record.route}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                          <div className="flex items-center gap-1">
                            {renderStars(record.rating)}
                            <span className="text-sm text-gray-600 ml-1">({record.rating})</span>
                          </div>
                        </div>

                        {/* Trip Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <div>
                              <div className="font-medium">{record.date}</div>
                              <div className="text-gray-600">{record.time}</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-500">Vehicle</div>
                            <div className="font-medium">{record.vehicleId}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Seat & Fare</div>
                            <div className="font-medium">{record.seatNumber} • {record.ticketPrice}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Duration</div>
                            <div className="font-medium">{record.duration}</div>
                          </div>
                        </div>

                        {/* Route Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                          <div>
                            <div className="text-gray-500">Boarding Point</div>
                            <div className="font-medium">{record.boardingPoint}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Drop Point</div>
                            <div className="font-medium">{record.dropPoint}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Operator</div>
                            <div className="font-medium">{record.operatorName}</div>
                          </div>
                        </div>

                        {/* Driver Info */}
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          <User className="w-4 h-4" />
                          <span><strong>Driver:</strong> {record.driverName}</span>
                          <span className="text-gray-400">•</span>
                          <span>{record.driverContact}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2 ml-6">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => callDriver(record.driverContact, record.driverName, record)}
                          className="flex items-center gap-2 hover:bg-green-50 hover:border-green-300"
                        >
                          <Phone className="w-4 h-4" />
                          Call Driver
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openTravelReportForm(record)}
                          className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                        >
                          <AlertTriangle className="w-4 h-4" />
                          Report Issue
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Travel Report Form */}
          {showTravelReportForm && selectedTravelRecord && (
            <Card className="mb-8 border-red-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <h2 className="text-2xl font-bold text-red-800">Report Travel Issue</h2>
                </div>

                {/* Trip Summary */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6 border">
                  <h3 className="font-bold mb-3 text-gray-800">Trip Details:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><strong>Route:</strong> {selectedTravelRecord.route}</div>
                    <div><strong>Date & Time:</strong> {selectedTravelRecord.date} at {selectedTravelRecord.time}</div>
                    <div><strong>Vehicle ID:</strong> {selectedTravelRecord.vehicleId}</div>
                    <div><strong>Seat Number:</strong> {selectedTravelRecord.seatNumber}</div>
                    <div><strong>Driver:</strong> {selectedTravelRecord.driverName}</div>
                    <div><strong>Operator:</strong> {selectedTravelRecord.operatorName}</div>
                    <div><strong>Fare Paid:</strong> {selectedTravelRecord.ticketPrice}</div>
                    <div><strong>Trip ID:</strong> {selectedTravelRecord.id}</div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Reason Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Report *
                    </label>
                    <select 
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      required
                    >
                      <option value="">Select a reason</option>
                      <option value="Driver Behavior">Inappropriate Driver Behavior</option>
                      <option value="Vehicle Condition">Poor Vehicle Condition</option>
                      <option value="Schedule Issue">Schedule/Timing Issue</option>
                      <option value="Safety Concern">Safety Concern</option>
                      <option value="Lost Item">Lost Item in Vehicle</option>
                      <option value="Overcharging">Overcharging/Fare Issue</option>
                      <option value="Route Deviation">Route Deviation</option>
                      <option value="Cleanliness">Cleanliness Issue</option>
                      <option value="Harassment">Harassment/Misconduct</option>
                      <option value="Accident">Accident/Incident</option>
                      <option value="Other">Other Issue</option>
                    </select>
                  </div>
                  
                  {/* Detailed Explanation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Explain the Issue in Detail *
                    </label>
                    <textarea 
                      value={reportExplanation}
                      onChange={(e) => setReportExplanation(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Please provide a detailed explanation of what happened during your journey. Include specific times, locations, and any other relevant details..."
                      required
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Minimum 20 characters required ({reportExplanation.length}/20)
                    </div>
                  </div>
                  
                  {/* Contact Information */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Contact Number *
                    </label>
                    <Input 
                      placeholder="98XXXXXXXX" 
                      value={reportContactNumber}
                      onChange={(e) => setReportContactNumber(e.target.value)}
                      className="focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      We may call you for additional information
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <Button 
                    className="bg-red-600 hover:bg-red-700 flex-1"
                    onClick={submitTravelReport}
                    disabled={loading || !reportReason || !reportExplanation || reportExplanation.length < 20}
                  >
                    {loading ? 'Submitting...' : 'Submit Report'}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => callDriver(selectedTravelRecord.driverContact, selectedTravelRecord.driverName, selectedTravelRecord)}
                    className="flex items-center justify-center gap-2 flex-1 hover:bg-green-50"
                  >
                    <Phone className="w-4 h-4" />
                    Call Driver Directly
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setShowTravelReportForm(false);
                      setReportReason('');
                      setReportExplanation('');
                      setReportContactNumber('');
                      setSelectedTravelRecord(null);
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lost Item Report Form */}
          {showReportForm && (
            <Card className="mb-8 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-2xl font-bold">Report Lost Item</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Item Name *
                    </label>
                    <Input 
                      placeholder="e.g., Black Backpack" 
                      value={lostItemForm.itemName}
                      onChange={(e) => handleLostItemFormChange('itemName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Route/Vehicle *
                    </label>
                    <Input 
                      placeholder="e.g., Ratna Park - Bhaktapur" 
                      value={lostItemForm.route}
                      onChange={(e) => handleLostItemFormChange('route', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date Lost *
                    </label>
                    <Input 
                      type="date" 
                      value={lostItemForm.dateLost}
                      onChange={(e) => handleLostItemFormChange('dateLost', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number *
                    </label>
                    <Input 
                      placeholder="98XXXXXXXX" 
                      value={lostItemForm.contactNumber}
                      onChange={(e) => handleLostItemFormChange('contactNumber', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-md h-24"
                      placeholder="Describe your lost item in detail..."
                      value={lostItemForm.description}
                      onChange={(e) => handleLostItemFormChange('description', e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button 
                    className="bg-indigo-600 hover:bg-indigo-700"
                    onClick={submitReport}
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit Report'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowReportForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Recent Lost Item Reports</h2>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {belongingTrackingData.map((item) => (
                      <div
                        key={item.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedItem.id === item.id
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedItem(item)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-bold">{item.itemName}</div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-1">{item.route}</div>
                        <div className="text-sm text-gray-500">
                          Reported: {item.reportedDate}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {item.id}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Item Details */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Status Timeline */}
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Tracking Status</h2>
                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                      <div className="space-y-6">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4">
                            1
                          </div>
                          <div>
                            <div className="font-bold">Item Reported</div>
                            <div className="text-sm text-gray-600">{selectedItem.reportedDate}</div>
                            <div className="text-sm text-gray-500">Lost item report submitted</div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4">
                            2
                          </div>
                          <div>
                            <div className="font-bold">Investigation Started</div>
                            <div className="text-sm text-gray-600">{selectedItem.reportedDate}</div>
                            <div className="text-sm text-gray-500">Searching in vehicle and stations</div>
                          </div>
                        </div>
                        {selectedItem.status !== 'Searching' && (
                          <div className="flex items-start">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4">
                              3
                            </div>
                            <div>
                              <div className="font-bold">Item {selectedItem.status}</div>
                              <div className="text-sm text-gray-600">Today</div>
                              <div className="text-sm text-gray-500">
                                {selectedItem.status === 'Found' ? 'Item located and secured' : 'Item returned to owner'}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Item Details */}
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Item Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Tracking ID</label>
                          <div className="text-lg font-bold">{selectedItem.id}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Item Name</label>
                          <div className="text-lg font-bold">{selectedItem.itemName}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Description</label>
                          <div className="text-lg">{selectedItem.description}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Route</label>
                          <div className="text-lg">{selectedItem.route}</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Vehicle ID</label>
                          <div className="text-lg">{selectedItem.vehicleId}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Reported Date</label>
                          <div className="text-lg">{selectedItem.reportedDate}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Current Status</label>
                          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedItem.status)}`}>
                            {selectedItem.status}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Contact Info</label>
                          <div className="text-lg">{selectedItem.contactInfo}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Location & Actions */}
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Current Location & Actions</h2>
                    <div className="mb-4">
                      <label className="text-sm font-medium text-gray-500">Current Location</label>
                      <div className="text-lg font-bold text-indigo-600">{selectedItem.location}</div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <Button 
                        className="bg-indigo-600 hover:bg-indigo-700"
                        onClick={contactSupport}
                      >
                        Contact Support
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={updateInformation}
                      >
                        Update Information
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={shareTracking}
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Tracking
                      </Button>
                      {selectedItem.status === 'Found' && (
                        <Button 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={arrangePickup}
                        >
                          Arrange Pickup
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {/* Contact Support Modal */}
        {showContactModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Contact Support</h3>
              <div className="space-y-3">
                <p><strong>Item:</strong> {selectedItem.itemName}</p>
                <p><strong>Tracking ID:</strong> {selectedItem.id}</p>
                <div className="space-y-2">
                  <Button className="w-full">📞 Call Support: 1660</Button>
                  <Button variant="outline" className="w-full">💬 Live Chat</Button>
                  <Button variant="outline" className="w-full">📧 Email Support</Button>
                  <Button variant="outline" className="w-full">📱 WhatsApp: +977-98XXXXXXXX</Button>
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
        
        {/* Update Information Modal */}
        {showUpdateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Update Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Additional Description</label>
                  <textarea className="w-full p-2 border rounded h-20" placeholder="Add more details about your item..."></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Number</label>
                  <input type="tel" className="w-full p-2 border rounded" placeholder="98XXXXXXXX" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Alternative Contact</label>
                  <input type="tel" className="w-full p-2 border rounded" placeholder="Alternative number" />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                  Update
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BelongingTrackingPage;