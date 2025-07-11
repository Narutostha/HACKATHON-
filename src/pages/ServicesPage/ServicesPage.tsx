import React from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export const ServicesPage = (): JSX.Element => {
  const services = [
    {
      id: 1,
      title: 'Vehicle Registration',
      description: 'Register your vehicle and get all necessary documentation.',
      image: '/car.svg',
      category: 'Driver Services'
    },
    {
      id: 2,
      title: 'Public Transport Cards',
      description: 'Get your Nol card and manage your public transport payments.',
      image: '/bus.svg',
      category: 'Public Transport'
    },
    {
      id: 3,
      title: 'Traffic Fines',
      description: 'View and pay your traffic fines online.',
      image: '/fines.svg',
      category: 'Driver Services'
    },
    {
      id: 4,
      title: 'Route Planning',
      description: 'Plan your journey using our smart route finder.',
      image: '/journey-planner.svg',
      category: 'Public Transport'
    },
    {
      id: 5,
      title: 'Vehicle Status Check',
      description: 'Check your vehicle status and documentation.',
      image: '/status-health-1.svg',
      category: 'Driver Services'
    },
    {
      id: 6,
      title: 'Salik Services',
      description: 'Manage your Salik account and payments.',
      image: '/salik.svg',
      category: 'Driver Services'
    }
  ];

  const categories = ['All', 'Driver Services', 'Public Transport', 'Business Services'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <Layout>
      <div className="w-full py-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#222222] mb-4">
              Our Services
            </h1>
            <p className="text-lg text-[#666666] max-w-2xl mx-auto">
              Discover our comprehensive range of transportation services designed to make your journey easier and more efficient.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  className={`px-6 py-2 rounded-md transition-all ${
                    selectedCategory === category 
                      ? 'bg-[#181c89] text-white' 
                      : 'text-[#666666] hover:bg-white'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-12 h-12 bg-contain bg-no-repeat bg-center mr-4"
                      style={{ backgroundImage: `url(${service.image})` }}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-[#222222]">
                        {service.title}
                      </h3>
                      <span className="text-sm text-[#181c89] font-medium">
                        {service.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-[#666666] mb-4">
                    {service.description}
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full border-[#181c89] text-[#181c89] hover:bg-[#181c89] hover:text-white"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};