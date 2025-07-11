import React from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export const ContactPage = (): JSX.Element => {
  const contactMethods = [
    {
      id: 1,
      title: 'Chat with us',
      description: 'Chat and apply for services with RTA.',
      icon: '/clip-path-group.png',
      action: 'Start Chat'
    },
    {
      id: 2,
      title: 'Email us',
      description: 'Send your questions or ideas by email.',
      icon: '/emails.svg',
      action: 'Send Email'
    },
    {
      id: 3,
      title: 'Feedback & Ideas',
      description: 'Let us know your ideas, complaints or questions.',
      icon: '/feedback.svg',
      action: 'Give Feedback'
    },
    {
      id: 4,
      title: 'Community Platform',
      description: 'Discover our projects, take part in decisions, and more.',
      icon: '/clip-path-group-1.png',
      action: 'Join Community'
    }
  ];

  const offices = [
    {
      id: 1,
      name: 'RTA Head Office',
      address: 'Dubai, United Arab Emirates',
      phone: '+971 800 9090',
      email: 'info@rta.ae',
      hours: 'Sunday - Thursday: 7:30 AM - 2:30 PM'
    },
    {
      id: 2,
      name: 'Customer Service Center',
      address: 'Multiple locations across Dubai',
      phone: '+971 800 9090',
      email: 'customerservice@rta.ae',
      hours: '24/7 Support Available'
    }
  ];

  return (
    <Layout>
      <div className="w-full">
        {/* Hero Section */}
        <div className="relative h-[300px] bg-gradient-to-r from-[#181c89] to-[#0e1152] text-white">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold mb-4">
                Contact Us
              </h1>
              <p className="text-xl">
                We're here to help. Get in touch with us through any of our convenient channels.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#222222]">
              How Can We Help You?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method) => (
                <Card key={method.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div 
                      className="w-12 h-12 bg-contain bg-no-repeat bg-center mx-auto mb-4"
                      style={{ backgroundImage: `url(${method.icon})` }}
                    />
                    <h3 className="text-lg font-bold mb-2 text-[#222222]">
                      {method.title}
                    </h3>
                    <p className="text-[#666666] mb-4 text-sm">
                      {method.description}
                    </p>
                    <Button className="w-full bg-[#181c89] hover:bg-[#0e1152]">
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-center mb-8 text-[#222222]">
                    Send us a Message
                  </h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#222222] mb-2">
                          First Name
                        </label>
                        <Input placeholder="Enter your first name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#222222] mb-2">
                          Last Name
                        </label>
                        <Input placeholder="Enter your last name" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#222222] mb-2">
                        Email
                      </label>
                      <Input type="email" placeholder="Enter your email" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#222222] mb-2">
                        Phone Number
                      </label>
                      <Input placeholder="Enter your phone number" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#222222] mb-2">
                        Subject
                      </label>
                      <Input placeholder="Enter message subject" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#222222] mb-2">
                        Message
                      </label>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md resize-none h-32"
                        placeholder="Enter your message"
                      />
                    </div>
                    <Button className="w-full bg-[#181c89] hover:bg-[#0e1152] py-3">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Office Information */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#222222]">
              Visit Our Offices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {offices.map((office) => (
                <Card key={office.id}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-[#222222]">
                      {office.name}
                    </h3>
                    <div className="space-y-3 text-[#666666]">
                      <div className="flex items-start">
                        <span className="font-medium w-16">Address:</span>
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium w-16">Phone:</span>
                        <span>{office.phone}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium w-16">Email:</span>
                        <span>{office.email}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium w-16">Hours:</span>
                        <span>{office.hours}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};