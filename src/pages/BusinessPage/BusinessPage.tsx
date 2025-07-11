import React from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export const BusinessPage = (): JSX.Element => {
  const businessServices = [
    {
      id: 1,
      title: 'Corporate Transport Solutions',
      description: 'Comprehensive transport solutions for businesses and organizations.',
      icon: '/bus.svg',
      features: ['Fleet Management', 'Employee Transport', 'Custom Routes']
    },
    {
      id: 2,
      title: 'Freight & Logistics',
      description: 'Efficient freight and logistics services for your business needs.',
      icon: '/car.svg',
      features: ['Cargo Transport', 'Supply Chain', 'Tracking Systems']
    },
    {
      id: 3,
      title: 'Partnership Programs',
      description: 'Join our partnership programs and grow your business with RTA.',
      icon: '/icon.svg',
      features: ['Business Development', 'Revenue Sharing', 'Technical Support']
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'Smart City Initiative',
      description: 'Leading Dubai\'s transformation into a smart city through innovative transport solutions.',
      image: '/an-image-for-drive-dubai-s-future-with-the-rta-scaleup-mobility-.png',
      status: 'Ongoing'
    },
    {
      id: 2,
      title: 'Sustainable Transport',
      description: 'Implementing eco-friendly transport solutions for a greener future.',
      image: '/al-safa-street-improvement-jpg.png',
      status: 'Planning'
    },
    {
      id: 3,
      title: 'Digital Innovation',
      description: 'Leveraging technology to enhance transport services and user experience.',
      image: '/-d8-aa-d9-82-d8-a7-d8-b7-d8-b9--d8-a7-d9-94-d9-85--d8-a7-d9-84-d.png',
      status: 'Completed'
    }
  ];

  return (
    <Layout>
      <div className="w-full">
        {/* Hero Section */}
        <div className="relative h-[400px] bg-gradient-to-r from-[#0e1152] to-[#181c89] text-white">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold mb-4">
                Business & Corporate
              </h1>
              <p className="text-xl mb-8">
                Partner with RTA for innovative transport solutions that drive your business forward.
              </p>
              <Button className="bg-white text-[#181c89] hover:bg-gray-100 px-8 py-3">
                Get Started
              </Button>
            </div>
          </div>
        </div>

        {/* Business Services */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#222222]">
              Business Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {businessServices.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div 
                      className="w-16 h-16 bg-contain bg-no-repeat bg-center mx-auto mb-4"
                      style={{ backgroundImage: `url(${service.icon})` }}
                    />
                    <h3 className="text-xl font-bold mb-3 text-[#222222]">
                      {service.title}
                    </h3>
                    <p className="text-[#666666] mb-4">
                      {service.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-center text-sm text-[#666666]">
                          <div className="w-2 h-2 bg-[#181c89] rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button className="w-full bg-[#181c89] hover:bg-[#0e1152]">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#222222]">
              Our Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-[#222222]">
                        {project.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                        project.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-[#666666] mb-4">
                      {project.description}
                    </p>
                    <Button variant="outline" className="w-full border-[#181c89] text-[#181c89]">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <Card className="bg-[#181c89] text-white">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Partner with RTA?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Join us in shaping the future of transportation in Dubai
                </p>
                <Button className="bg-white text-[#181c89] hover:bg-gray-100 px-8 py-3">
                  Contact Us Today
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};