import React from 'react';
import Image from 'next/image';
import { GraduationCap, Users, BookOpen, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

const UpscholBanner = () => {
  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Budget-Friendly Online Learning",
      description: "Quality education doesn't have to break the bank. Our comprehensive online degree programs are designed to be accessible and affordable for every student."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Industry-Expert Counselors",
      description: "Get personalized guidance from our experienced counselors who are dedicated to helping you choose the perfect online degree path for your career goals."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Career-Ready Programs",
      description: "Our meticulously crafted online courses are designed to equip you with the skills and knowledge needed to excel in your chosen field."
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Comprehensive Placement Support",
      description: "Our dedicated placement team provides ongoing support to connect you with top employers, especially for our online MBA and professional degree graduates."
    }
  ];

  const highlights = [
    "Top-tier university partnerships",
    "Expert guidance & counseling",
    "Dream scholarships available",
    "Flexible online learning"
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#14081E] leading-tight">
                  Elevate Your Skills To
                  <span className="block text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">
                    Accelerate Your Career
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Unlock endless possibilities with Upschol: affordable courses, prestigious universities, 
                  expert counseling, and scholarship opportunities. Your journey to a brighter, more secure 
                  future starts with just one click.
                </p>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#14081E] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-[#14081E] text-[#14081E] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#14081E] hover:text-white transition-all duration-300">
                  Explore Courses
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#14081E]">10K+</div>
                  <div className="text-sm text-gray-600">Students Placed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#14081E]">500+</div>
                  <div className="text-sm text-gray-600">Partner Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#14081E]">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Image/Visual */}
            <div className="relative">
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl p-8 shadow-2xl">
                  <div className="aspect-square relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl opacity-10"></div>
                    <div className="relative z-10 flex items-center justify-center h-full">
                      <div className="text-center space-y-6">
                        <div className="w-24 h-24 mx-auto bg-[#14081E] rounded-full flex items-center justify-center">
                          <GraduationCap className="w-12 h-12 text-white" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-[#14081E]">Your Success Story</h3>
                          <p className="text-gray-600">Starts Here</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 z-20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Expert Guidance</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 z-20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#14081E]">
              Why Choose Upschol?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing you with the best educational experience and career support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-12 h-12 bg-[#14081E] rounded-lg flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#14081E] mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-[#14081E] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful graduates who chose Upschol for their educational journey. 
            Your dream career is just one step away.
          </p>
          <button className="bg-white text-[#14081E] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Free Counseling Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpscholBanner;