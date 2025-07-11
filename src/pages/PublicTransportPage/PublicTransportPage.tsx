import React from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export const PublicTransportPage = (): JSX.Element => {
  const transportModes = [
    {
      id: 1,
      name: 'Metro',
      description: 'Fast, efficient metro system connecting major areas of Dubai',
      image: '/burj-khalifa-dubai-mall-metro-station-jpg.png',
      features: ['Air Conditioned', 'WiFi Available', 'Accessible']
    },
    {
      id: 2,
      name: 'Bus',
      description: 'Comprehensive bus network covering all areas of Dubai',
      image: '/image.png',
      features: ['Free WiFi', 'Real-time Tracking', 'Multiple Routes']
    },
    {
      id: 3,
      name: 'Tram',
      description: 'Modern tram system serving Dubai Marina and JBR',
      image: '/al-safa-street-improvement-jpg.png',
      features: ['Scenic Routes', 'Modern Fleet', 'Frequent Service']
    }
  ];

  return (
    <Layout>
      <div className="w-full">
        {/* Hero Section */}
        <div className="relative h-[400px] bg-gradient-to-r from-[#181c89] to-[#0e1152] text-white">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold mb-4">
                Public Transport
              </h1>
              <p className="text-xl mb-8">
                Discover Dubai's world-class public transportation system. Fast, reliable, and sustainable.
              </p>
              <Button className="bg-white text-[#181c89] hover:bg-gray-100 px-8 py-3">
                Plan Your Journey
              </Button>
            </div>
          </div>
        </div>

        {/* Journey Planner Section */}
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-center mb-8 text-[#222222]">
                  Plan Your Journey
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#222222] mb-2">
                      From
                    </label>
                    <Input placeholder="Enter starting location" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#222222] mb-2">
                      To
                    </label>
                    <Input placeholder="Enter destination" />
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full bg-[#181c89] hover:bg-[#0e1152]">
                      Find Route
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Transport Modes */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#222222]">
              Transportation Options
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {transportModes.map((mode) => (
                <Card key={mode.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${mode.image})` }}
                  />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-[#222222]">
                      {mode.name}
                    </h3>
                    <p className="text-[#666666] mb-4">
                      {mode.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      {mode.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-[#666666]">
                          <div className="w-2 h-2 bg-[#181c89] rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full border-[#181c89] text-[#181c89]">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* RTA Apps Section */}
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-[#222222]">
                RTA Smart Apps
              </h2>
              <p className="text-lg text-[#666666]">
                Download our apps for a seamless travel experience
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[url(/app-ios.svg)] bg-contain bg-no-repeat" />
                <span className="text-[#222222]">iOS App</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[url(/app-android.svg)] bg-contain bg-no-repeat" />
                <span className="text-[#222222]">Android App</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[url(/app-gallery.svg)] bg-contain bg-no-repeat" />
                <span className="text-[#222222]">Huawei Gallery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};