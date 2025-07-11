import React, { useState, useRef, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { vehicleData } from '../../data/staticData';
import { CameraIcon, XIcon, WalletIcon, MapPinIcon, NavigationIcon, ScanIcon } from 'lucide-react';

interface Location {
  name: string;
  lat: number;
  lng: number;
}

const locations: Location[] = [
  { name: 'Tinkune', lat: 27.6915, lng: 85.3453 },
  { name: 'Maitighar', lat: 27.6930, lng: 85.2990 },
  { name: 'New Baneshwor', lat: 27.6915, lng: 85.3206 },
  { name: 'Ratna Park', lat: 27.7056, lng: 85.3144 },
  { name: 'Bhaktapur', lat: 27.6710, lng: 85.4298 },
  { name: 'Patan', lat: 27.6766, lng: 85.3250 },
  { name: 'Kalanki', lat: 27.6960, lng: 85.2410 },
  { name: 'Koteshwor', lat: 27.6890, lng: 85.3420 },
  { name: 'Airport', lat: 27.6955, lng: 85.3160 },
  { name: 'Kirtipur', lat: 27.6789, lng: 85.2951 }
];

const walletMethods = [
  { id: 'esewa', name: 'eSewa', fee: '0%' },
  { id: 'khalti', name: 'Khalti', fee: '0%' },
  { id: 'mobile_banking', name: 'Mobile Banking', fee: 'Rs. 5' }
];

export const PaymentPage = (): JSX.Element => {
  const [balance, setBalance] = useState(150.50); // User's Nyxis balance
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [calculatedCost, setCalculatedCost] = useState(0);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loadAmount, setLoadAmount] = useState('');
  const [selectedWalletMethod, setSelectedWalletMethod] = useState(walletMethods[0]);
  const [transactionPin, setTransactionPin] = useState('');
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [systemPrompt, setSystemPrompt] = useState<{show: boolean, title: string, message: string, type: 'error' | 'success' | 'info'}>({
    show: false, title: '', message: '', type: 'info'
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  const recentTransactions = [
    { id: 'TXN001', date: '2025-01-15', amount: '25 NY', route: 'Tinkune → Maitighar', vehicle: 'BA 12 PA 1234', status: 'Completed' },
    { id: 'TXN002', date: '2025-01-14', amount: '30 NY', route: 'Ratna Park → Bhaktapur', vehicle: 'BA 15 CHA 5678', status: 'Completed' },
    { id: 'TXN003', date: '2025-01-13', amount: '20 NY', route: 'Koteshwor → Tinkune ', vehicle: 'BA 18 KHA 9001', status: 'Completed' }
  ];

  // Show system prompt instead of alert
  const showSystemPrompt = (title: string, message: string, type: 'error' | 'success' | 'info' = 'info') => {
    setSystemPrompt({ show: true, title, message, type });
    setTimeout(() => {
      setSystemPrompt({ show: false, title: '', message: '', type: 'info' });
    }, 4000);
  };

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (from: Location, to: Location): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (to.lat - from.lat) * Math.PI / 180;
    const dLng = (to.lng - from.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(from.lat * Math.PI / 180) * Math.cos(to.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Calculate cost based on distance
  const calculateCostByDistance = (distance: number): number => {
    if (distance <= 5) return 20;
    if (distance <= 7) return 25;
    if (distance <= 10) return 30;
    if (distance <= 30) return 45;
    return 45; // Default for very long distances
  };

  // Update cost when locations change
  useEffect(() => {
    if (fromLocation && toLocation) {
      const from = locations.find(loc => loc.name === fromLocation);
      const to = locations.find(loc => loc.name === toLocation);
      
      if (from && to) {
        const distance = calculateDistance(from, to);
        const cost = calculateCostByDistance(distance);
        setCalculatedCost(cost);
      }
    } else {
      setCalculatedCost(0);
    }
  }, [fromLocation, toLocation]);

  // Start QR Scanner
  const startQRScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 640 },
          height: { ideal: 480 }
        } 
      });
      setCameraStream(stream);
      setShowQRScanner(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      showSystemPrompt(
        'Camera Access Denied',
        'Please allow camera access to scan QR codes.',
        'error'
      );
    }
  };

  // Stop QR Scanner
  const stopQRScanner = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setShowQRScanner(false);
  };

  // Simulate QR code detection
  const simulateQRDetection = () => {
    const qrData = {
      vehicleId: 'BA 12 PA 1234',
      from: 'Tinkune',
      to: 'Maitighar',
      cost: 25
    };
    
    setSelectedVehicle(qrData.vehicleId);
    setFromLocation(qrData.from);
    setToLocation(qrData.to);
    setCalculatedCost(qrData.cost);
    stopQRScanner();
    
    showSystemPrompt(
      'QR Code Scanned Successfully!',
      `Vehicle: ${qrData.vehicleId}\nRoute: ${qrData.from} → ${qrData.to}\nCost: ${qrData.cost} NY`,
      'success'
    );
  };

  // Handle payment
  const handlePayment = () => {
    if (!selectedVehicle || !fromLocation || !toLocation || calculatedCost === 0) {
      showSystemPrompt(
        'Incomplete Information',
        'कृपया सबै जानकारी चयन गर्नुहोस् (Please select all information)',
        'error'
      );
      return;
    }
    
    if (balance < calculatedCost) {
      showSystemPrompt(
        'Insufficient Balance',
        'Please load your wallet first.',
        'error'
      );
      return;
    }
    
    setShowPaymentModal(true);
  };

  // Process payment
  const processPayment = () => {
    setBalance(prev => prev - calculatedCost);
    setShowPaymentModal(false);
    setPaymentSuccess(true);
    
    setTimeout(() => {
      setPaymentSuccess(false);
      setSelectedVehicle('');
      setFromLocation('');
      setToLocation('');
      setCalculatedCost(0);
    }, 3000);
  };

  // Load wallet
  const loadWallet = () => {
    if (!loadAmount || parseFloat(loadAmount) <= 0) {
      showSystemPrompt(
        'Invalid Amount',
        'Please enter a valid amount',
        'error'
      );
      return;
    }
    
    if (transactionPin !== '1379') {
      showSystemPrompt(
        'Invalid Transaction PIN',
        'Please enter correct PIN to proceed.',
        'error'
      );
      return;
    }
    
    const amount = parseFloat(loadAmount);
    const fee = selectedWalletMethod.id === 'mobile_banking' ? 5 : 0;
    const totalAmount = amount - fee;
    
    setBalance(prev => prev + totalAmount);
    setShowWalletModal(false);
    setLoadAmount('');
    setTransactionPin('');
    
    showSystemPrompt(
      'Wallet Loaded Successfully!',
      `Amount: Rs. ${amount}\nFee: Rs. ${fee}\nCredited: ${totalAmount} NY\nNew Balance: ${(balance + totalAmount).toFixed(2)} NY`,
      'success'
    );
  };

  return (
    <Layout>
      <div className="w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Nyxis Payment System</h1>
                <p className="text-xl">Digital transport payments with Nyxis currency</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center min-w-[200px]">
                <div className="text-sm opacity-90 mb-1">Your Balance</div>
                <div className="text-3xl font-bold mb-3">{balance.toFixed(2)} NY</div>
                <Button 
                  variant="secondary" 
                  className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold shadow-lg"
                  onClick={() => setShowWalletModal(true)}
                >
                  <WalletIcon className="w-4 h-4 mr-2" />
                  Load Wallet
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Make Payment</h2>
                  
                  {/* QR Scanner Button */}
                  <div className="mb-6">
                    <Button 
                      onClick={startQRScanner}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-4 text-lg"
                    >
                      <ScanIcon className="w-6 h-6 mr-3" />
                      Scan QR Code for Quick Payment
                    </Button>
                  </div>

                  <div className="text-center text-gray-500 mb-6">
                    <div className="flex items-center">
                      <hr className="flex-1" />
                      <span className="px-4">OR ENTER MANUALLY</span>
                      <hr className="flex-1" />
                    </div>
                  </div>

                  {/* Vehicle Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Vehicle
                    </label>
                    <select 
                      className="w-full p-3 border border-gray-300 rounded-md"
                      value={selectedVehicle}
                      onChange={(e) => setSelectedVehicle(e.target.value)}
                    >
                      <option value="">Choose vehicle...</option>
                      {vehicleData.filter(v => v.status === 'Active').map((vehicle) => (
                        <option key={vehicle.id} value={vehicle.plateNumber}>
                          {vehicle.plateNumber} - {vehicle.route}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* From Location */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPinIcon className="w-4 h-4 inline mr-1" />
                      From
                    </label>
                    <select 
                      className="w-full p-3 border border-gray-300 rounded-md"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                    >
                      <option value="">Select starting point...</option>
                      {locations.map((location) => (
                        <option key={location.name} value={location.name}>
                          {location.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* To Location */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <NavigationIcon className="w-4 h-4 inline mr-1" />
                      To
                    </label>
                    <select 
                      className="w-full p-3 border border-gray-300 rounded-md"
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                    >
                      <option value="">Select destination...</option>
                      {locations.map((location) => (
                        <option key={location.name} value={location.name}>
                          {location.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Cost Calculation */}
                  {calculatedCost > 0 && (
                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                      <h3 className="font-bold mb-2 text-blue-800">Route Information</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Route:</span>
                          <span>{fromLocation} → {toLocation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Distance:</span>
                          <span>
                            {fromLocation && toLocation ? 
                              calculateDistance(
                                locations.find(l => l.name === fromLocation)!,
                                locations.find(l => l.name === toLocation)!
                              ).toFixed(1) + ' km' : 'N/A'
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Vehicle:</span>
                          <span>{selectedVehicle || 'Not selected'}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between font-bold text-lg text-blue-800">
                          <span>Total Cost:</span>
                          <span>{calculatedCost} NY</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pricing Info */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-bold mb-2">Pricing Information</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>0-5 km: <strong>20 NY</strong></div>
                      <div>5-7 km: <strong>25 NY</strong></div>
                      <div>7-10 km: <strong>30 NY</strong></div>
                      <div>10-30 km: <strong>45 NY</strong></div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-3"
                    disabled={!selectedVehicle || !fromLocation || !toLocation || calculatedCost === 0}
                    onClick={handlePayment}
                  >
                    Pay {calculatedCost} NY with Nyxis
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions & Info */}
            <div className="space-y-6">
              {/* Recent Transactions */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
                  <div className="space-y-3">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{transaction.route}</div>
                          <div className="text-sm text-gray-500">
                            {transaction.date} • {transaction.vehicle}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-purple-600">{transaction.amount}</div>
                          <div className="text-xs text-green-500">{transaction.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Balance Info */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Account Balance</h2>
                  <div className="text-center py-6">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      {balance.toFixed(2)} NY
                    </div>
                    <div className="text-gray-500 mb-4">Available Balance</div>
                    <Button 
                      onClick={() => setShowWalletModal(true)}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    >
                      <WalletIcon className="w-4 h-4 mr-2" />
                      Load Wallet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* QR Scanner Modal */}
        {showQRScanner && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-md w-full mx-4 overflow-hidden">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="text-lg font-bold">Scan QR Code</h3>
                <Button variant="ghost" size="sm" onClick={stopQRScanner}>
                  <XIcon className="w-5 h-5" />
                </Button>
              </div>
              <div className="relative">
                <video 
                  ref={videoRef}
                  autoPlay 
                  playsInline
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-white border-dashed rounded-lg"></div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-4 text-center">
                  Position the QR code within the frame to scan
                </p>
                <Button 
                  onClick={simulateQRDetection}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Simulate QR Detection (Demo)
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Wallet Loading Modal */}
        {showWalletModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Load Wallet</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Payment Method
                </label>
                <div className="space-y-2">
                  {walletMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedWalletMethod.id === method.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedWalletMethod(method)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{method.name}</span>
                        <span className="text-sm text-gray-500">Fee: {method.fee}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (Rs.)
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount to load"
                  value={loadAmount}
                  onChange={(e) => setLoadAmount(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction PIN
                </label>
                <Input
                  type="password"
                  placeholder="Enter PIN "
                  value={transactionPin}
                  onChange={(e) => setTransactionPin(e.target.value)}
                  maxLength={4}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={loadWallet}
                  disabled={!loadAmount || !transactionPin}
                >
                  Load Wallet
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowWalletModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Confirmation Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Confirm Payment</h3>
              <div className="space-y-2 mb-4">
                <p><strong>Vehicle:</strong> {selectedVehicle}</p>
                <p><strong>Route:</strong> {fromLocation} → {toLocation}</p>
                <p><strong>Amount:</strong> {calculatedCost} NY</p>
                <p><strong>Current Balance:</strong> {balance.toFixed(2)} NY</p>
                <p><strong>Balance After:</strong> {(balance - calculatedCost).toFixed(2)} NY</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                  onClick={processPayment}
                >
                  Confirm Payment
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Success Modal */}
        {paymentSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2 text-green-600">Payment Successful!</h3>
              <p className="text-gray-600 mb-4">
                Your payment of {calculatedCost} NY has been processed successfully.
              </p>
              <p className="text-sm text-gray-500">Transaction ID: TXN{Date.now()}</p>
              <p className="text-sm text-purple-600 mt-2">New Balance: {balance.toFixed(2)} NY</p>
            </div>
          </div>
        )}

        {/* System Prompt Modal */}
        {systemPrompt.show && (
          <div className="fixed top-4 right-4 z-50 max-w-sm">
            <div className={`p-4 rounded-lg shadow-2xl border-l-4 ${
              systemPrompt.type === 'success' ? 'bg-green-50 border-green-500' :
              systemPrompt.type === 'error' ? 'bg-red-50 border-red-500' :
              'bg-blue-50 border-blue-500'
            } transform transition-all duration-300 ease-in-out`}>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    systemPrompt.type === 'success' ? 'bg-green-500' :
                    systemPrompt.type === 'error' ? 'bg-red-500' :
                    'bg-blue-500'
                  }`}>
                    {systemPrompt.type === 'success' ? '✓' : 
                     systemPrompt.type === 'error' ? '✕' : 'i'}
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <h4 className={`text-sm font-semibold ${
                    systemPrompt.type === 'success' ? 'text-green-800' :
                    systemPrompt.type === 'error' ? 'text-red-800' :
                    'text-blue-800'
                  }`}>
                    {systemPrompt.title}
                  </h4>
                  <div className={`mt-1 text-sm whitespace-pre-line ${
                    systemPrompt.type === 'success' ? 'text-green-700' :
                    systemPrompt.type === 'error' ? 'text-red-700' :
                    'text-blue-700'
                  }`}>
                    {systemPrompt.message}
                  </div>
                </div>
                <button
                  onClick={() => setSystemPrompt({ show: false, title: '', message: '', type: 'info' })}
                  className={`ml-2 text-lg font-bold leading-none ${
                    systemPrompt.type === 'success' ? 'text-green-600 hover:text-green-800' :
                    systemPrompt.type === 'error' ? 'text-red-600 hover:text-red-800' :
                    'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};