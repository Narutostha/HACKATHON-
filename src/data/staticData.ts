// Static data for Kathmandu Valley Vehicle Management System

export const vehicleData = [{
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

export const routeData = [
  {
    id: 'R001',
    name: 'Ring Road Circuit',
    startPoint: 'Kalanki',
    endPoint: 'Koteshwor',
    distance: '27 km',
    duration: '45 mins',
    fare: 'Rs. 25',
    stops: ['Kalanki', 'Kalimati', 'Tripureshwor', 'Ratna Park', 'New Baneshwor', 'Koteshwor'],
    frequency: '5-10 mins',
    operatingHours: '5:00 AM - 10:00 PM'
  },
  {
    id: 'R002',
    name: 'Kathmandu - Bhaktapur Express',
    startPoint: 'Ratna Park',
    endPoint: 'Bhaktapur Durbar Square',
    distance: '15 km',
    duration: '30 mins',
    fare: 'Rs. 35',
    stops: ['Ratna Park', 'Maitighar', 'Thimi', 'Bhaktapur'],
    frequency: '15-20 mins',
    operatingHours: '6:00 AM - 9:00 PM'
  },
  {
    id: 'R003',
    name: 'Patan Heritage Route',
    startPoint: 'New Baneshwor',
    endPoint: 'Patan Durbar Square',
    distance: '8 km',
    duration: '20 mins',
    fare: 'Rs. 20',
    stops: ['New Baneshwor', 'Bagbazar', 'Kupondole', 'Patan'],
    frequency: '10-15 mins',
    operatingHours: '5:30 AM - 9:30 PM'
  }
];

export const busStops = [
  {
    id: 'BS001',
    name: 'Ratna Park',
    location: { lat: 27.7056, lng: 85.3144 },
    routes: ['R001', 'R002'],
    facilities: ['Shelter', 'Seating', 'Digital Display'],
    nearbyLandmarks: ['Ratna Park', 'Dharahara', 'Tundikhel']
  },
  {
    id: 'BS002',
    name: 'New Baneshwor',
    location: { lat: 27.6915, lng: 85.3206 },
    routes: ['R001', 'R003'],
    facilities: ['Shelter', 'Seating', 'Ticket Counter'],
    nearbyLandmarks: ['World Trade Center', 'Baneshwor Campus']
  },
  {
    id: 'BS003',
    name: 'Patan Dhoka',
    location: { lat: 27.6766, lng: 85.3250 },
    routes: ['R003'],
    facilities: ['Shelter', 'Digital Display'],
    nearbyLandmarks: ['Patan Durbar Square', 'Patan Hospital']
  }
];

export const paymentData = {
  methods: [
    {
      id: 'esewa',
      name: 'eSewa',
      type: 'Digital Wallet',
      fee: '0%',
      processingTime: 'Instant',
      logo: '/esewa-logo.png'
    },
    {
      id: 'khalti',
      name: 'Khalti',
      type: 'Digital Wallet',
      fee: '0%',
      processingTime: 'Instant',
      logo: '/khalti-logo.png'
    },
    {
      id: 'ime_pay',
      name: 'IME Pay',
      type: 'Digital Wallet',
      fee: '0%',
      processingTime: 'Instant',
      logo: '/ime-pay-logo.png'
    },
    {
      id: 'nabil_bank',
      name: 'Nabil Bank',
      type: 'Bank Transfer',
      fee: 'Rs. 5',
      processingTime: '1-2 mins',
      logo: '/nabil-logo.png'
    }
  ],
  recentTransactions: [
    {
      id: 'TXN001',
      date: '2025-01-15',
      amount: 'Rs. 25',
      route: 'Ratna Park - Bhaktapur',
      method: 'eSewa',
      status: 'Completed'
    },
    {
      id: 'TXN002',
      date: '2025-01-14',
      amount: 'Rs. 20',
      route: 'New Baneshwor - Patan',
      method: 'Khalti',
      status: 'Completed'
    },
    {
      id: 'TXN003',
      date: '2025-01-13',
      amount: 'Rs. 35',
      route: 'Kalanki - Koteshwor',
      method: 'IME Pay',
      status: 'Completed'
    }
  ]
};

export const belongingTrackingData = [
  {
    id: 'BT001',
    itemName: 'Black Backpack',
    description: 'Black leather backpack with laptop compartment',
    reportedDate: '2025-01-14',
    route: 'Ratna Park - Bhaktapur',
    vehicleId: 'KTM-001',
    status: 'Found',
    contactInfo: 'Ram Bahadur - 9841234567',
    location: 'Bhaktapur Bus Station'
  },
  {
    id: 'BT002',
    itemName: 'Mobile Phone',
    description: 'Samsung Galaxy A54, Blue color',
    reportedDate: '2025-01-13',
    route: 'New Baneshwor - Patan',
    vehicleId: 'KTM-002',
    status: 'Searching',
    contactInfo: 'Sita Gurung - 9851234567',
    location: 'Under Investigation'
  },
  {
    id: 'BT003',
    itemName: 'Umbrella',
    description: 'Red umbrella with wooden handle',
    reportedDate: '2025-01-12',
    route: 'Maharajgunj - Kirtipur',
    vehicleId: 'KTM-003',
    status: 'Returned',
    contactInfo: 'Bikash Tamang - 9861234567',
    location: 'Returned to Owner'
  }
];

export const sosAlerts = [
  {
    id: 'SOS001',
    vehicleId: 'KTM-001',
    alertType: 'Medical Emergency',
    location: { lat: 27.7172, lng: 85.3240 },
    timestamp: '2025-01-15 14:30:00',
    status: 'Resolved',
    description: 'Passenger feeling unwell, medical assistance provided',
    responders: ['Ambulance', 'Traffic Police']
  },
  {
    id: 'SOS002',
    vehicleId: 'KTM-002',
    alertType: 'Vehicle Breakdown',
    location: { lat: 27.6915, lng: 85.3206 },
    timestamp: '2025-01-14 16:45:00',
    status: 'In Progress',
    description: 'Engine overheating, passengers evacuated safely',
    responders: ['Mechanic', 'Backup Vehicle']
  },
  {
    id: 'SOS003',
    vehicleId: 'KTM-003',
    alertType: 'Accident',
    location: { lat: 27.7219, lng: 85.3147 },
    timestamp: '2025-01-13 09:15:00',
    status: 'Resolved',
    description: 'Minor collision, no injuries reported',
    responders: ['Traffic Police', 'Insurance Agent']
  }
];

export const trafficData = {
  currentConditions: [
    {
      location: 'New Road',
      status: 'Heavy Traffic',
      delay: '15-20 mins',
      reason: 'Road Construction'
    },
    {
      location: 'Ring Road (Kalanki)',
      status: 'Moderate Traffic',
      delay: '5-10 mins',
      reason: 'Peak Hour'
    },
    {
      location: 'Maitighar Mandala',
      status: 'Light Traffic',
      delay: '2-5 mins',
      reason: 'Normal Flow'
    }
  ],
  roadClosures: [
    {
      location: 'Durbar Marg',
      reason: 'VIP Movement',
      duration: '2:00 PM - 4:00 PM',
      alternateRoute: 'Via Kantipath'
    }
  ]
};

export const weatherData = {
  current: {
    temperature: '18°C',
    condition: 'Partly Cloudy',
    humidity: '65%',
    windSpeed: '8 km/h',
    visibility: '10 km'
  },
  forecast: [
    { day: 'Today', high: '22°C', low: '12°C', condition: 'Sunny' },
    { day: 'Tomorrow', high: '20°C', low: '10°C', condition: 'Cloudy' },
    { day: 'Day After', high: '19°C', low: '9°C', condition: 'Light Rain' }
  ]
};