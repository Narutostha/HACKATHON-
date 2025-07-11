import React from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export const MediaCenterPage = (): JSX.Element => {
  const newsArticles = [
    {
      id: 1,
      title: 'RTA Launches New Smart Transportation Initiative',
      excerpt: 'Dubai\'s Roads and Transport Authority announces groundbreaking smart city transportation solutions.',
      date: '2025-01-15',
      category: 'Innovation',
      image: '/an-image-for-drive-dubai-s-future-with-the-rta-scaleup-mobility-.png'
    },
    {
      id: 2,
      title: 'Free WiFi Now Available on All Public Buses',
      excerpt: 'Passengers can now enjoy complimentary internet access across Dubai\'s entire bus network.',
      date: '2025-01-10',
      category: 'Public Transport',
      image: '/image.png'
    },
    {
      id: 3,
      title: 'Metro Extension Project Reaches New Milestone',
      excerpt: 'The Dubai Metro expansion continues to progress, bringing better connectivity to residents.',
      date: '2025-01-05',
      category: 'Infrastructure',
      image: '/burj-khalifa-dubai-mall-metro-station-jpg.png'
    },
    {
      id: 4,
      title: 'RTA Pay Digital Wallet Enhances User Experience',
      excerpt: 'New features and improvements make digital payments more convenient for all users.',
      date: '2024-12-28',
      category: 'Technology',
      image: '/an-image-for-don-t-miss-out-on-the-features-of-nol-pay.png'
    }
  ];

  const mediaTypes = [
    {
      id: 1,
      title: 'Press Releases',
      description: 'Official announcements and news from RTA',
      icon: '/icon.svg',
      count: '45+'
    },
    {
      id: 2,
      title: 'Photo Gallery',
      description: 'Visual documentation of our projects and events',
      icon: '/icon-2.svg',
      count: '200+'
    },
    {
      id: 3,
      title: 'Video Library',
      description: 'Educational and promotional video content',
      icon: '/icon-3.svg',
      count: '50+'
    },
    {
      id: 4,
      title: 'Publications',
      description: 'Reports, brochures, and informational materials',
      icon: '/icon-4.svg',
      count: '30+'
    }
  ];

  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const categories = ['All', 'Innovation', 'Public Transport', 'Infrastructure', 'Technology'];

  const filteredNews = selectedCategory === 'All' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  return (
    <Layout>
      <div className="w-full">
        {/* Hero Section */}
        <div className="relative h-[300px] bg-gradient-to-r from-[#181c89] to-[#0e1152] text-white">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold mb-4">
                Media Center
              </h1>
              <p className="text-xl">
                Stay updated with the latest news, announcements, and media resources from RTA.
              </p>
            </div>
          </div>
        </div>

        {/* Media Types */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#222222]">
              Media Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mediaTypes.map((type) => (
                <Card key={type.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div 
                      className="w-12 h-12 bg-contain bg-no-repeat bg-center mx-auto mb-4"
                      style={{ backgroundImage: `url(${type.icon})` }}
                    />
                    <h3 className="text-lg font-bold mb-2 text-[#222222]">
                      {type.title}
                    </h3>
                    <p className="text-[#666666] text-sm mb-3">
                      {type.description}
                    </p>
                    <div className="text-[#181c89] font-bold text-lg">
                      {type.count}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Latest News */}
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#222222]">
              Latest News
            </h2>
            
            {/* Category Filter */}
            <div className="flex justify-center mb-8">
              <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    className={`px-4 py-2 rounded-md transition-all ${
                      selectedCategory === category 
                        ? 'bg-[#181c89] text-white' 
                        : 'text-[#666666] hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredNews.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${article.image})` }}
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-[#181c89] text-white text-xs rounded-full">
                        {article.category}
                      </span>
                      <span className="text-sm text-[#666666]">
                        {new Date(article.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-[#222222]">
                      {article.title}
                    </h3>
                    <p className="text-[#666666] mb-4">
                      {article.excerpt}
                    </p>
                    <Button variant="outline" className="border-[#181c89] text-[#181c89]">
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <Card className="bg-[#181c89] text-white">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Stay Informed
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Subscribe to our newsletter for the latest updates and announcements
                </p>
                <div className="max-w-md mx-auto flex gap-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-md text-black"
                  />
                  <Button className="bg-white text-[#181c89] hover:bg-gray-100 px-6">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};