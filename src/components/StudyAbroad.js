'use client'
import React, { useState } from 'react'
import Layout from './Candidatepagelayout'
import Head from 'next/head'

const StudyAbroad = () => {
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "George Bush",
      role: "President",
      content: "This course exceeded my expectations! The comprehensive content, interactive sessions, and supportive instructors made learning enjoyable and rewarding. Highly recommend for any student seeking a top-notch educational experience.",
      rating: 4
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Software Engineer",
      content: "Amazing experience! The program provided me with all the tools and knowledge I needed to succeed in my career. The international exposure was invaluable and the support throughout was exceptional.",
      rating: 5
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Data Scientist",
      content: "Upschol Abroad transformed my career trajectory completely. The quality of education, affordable pricing, and post-study opportunities made this the best investment I've ever made.",
      rating: 5
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Marketing Manager",
      content: "The global perspective I gained through this program is irreplaceable. The curriculum was well-structured and the faculty support was outstanding. Truly a life-changing experience!",
      rating: 4
    }
  ]

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [expandedFaq, setExpandedFaq] = useState(null)

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => 
      prev === testimonials.length - 2 ? 0 : prev + 1
    )
  }

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => 
      prev === 0 ? testimonials.length - 2 : prev - 1
    )
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`text-xl ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ))
  }

  return (
    <>
    
      <Layout>
        <div className="font-[Poppins] min-h-screen bg-white">
          {/* Hero Section */}
          <div className="relative overflow-hidden">
            <div className="container mx-auto px-20 py-12 lg:py-16">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Left Content */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                      <span style={{ color: '#14081E' }}>Upschol </span>
                      <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                        Abroad:
                      </span>
                      <br />
                      <span className="bg-gradient-to-r from-purple-500 to-orange-400 bg-clip-text text-transparent">
                        International Degree
                      </span>
                      {/* <span style={{ color: '#14081E' }}> in</span> */}
                      <br />
                      <span style={{ color: '#14081E' }}>in Local Budget</span>
                    </h1>
                    
                    <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                      Globally Accredited & Recognized Degrees | Post Study Work Visa Qualified Programs | On-Campus Scholarships Available
                    </p>
                  </div>

                  <button 
                    className="px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{ backgroundColor: '#14081E' }}
                  >
                    Explore Colleges
                  </button>

                  {/* Stats */}
                  <div className="flex gap-12 pt-8">
                    <div className="space-y-2">
                      <div className="text-3xl font-bold" style={{ color: '#14081E' }}>
                        45k+
                      </div>
                      <div className="text-gray-600 text-sm">
                        University Partners
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold" style={{ color: '#14081E' }}>
                        5000k+
                      </div>
                      <div className="text-gray-600 text-sm">
                        Careers Transformed
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Content - Image Section */}
                <div className="relative">
                  {/* Main image container */}
                  <div className="relative z-10">
                    <div className="w-[600px] h-[600px] rounded-full overflow-hidden mx-auto">
                      <img 
                        src="/study-abroad-img.webp" 
                        alt="Student with books" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Us Section - Reduced top padding from py-16 to py-8 */}
          <div className="py-8 bg-white">
            <div className="container mx-auto px-20">
              {/* About Us Header */}
              <div className="text-center mb-16">
                <h2 className="text-purple-500 text-lg font-semibold mb-4">About Us</h2>
                <h1 style={{ color: '#14081E' }} className="text-4xl lg:text-5xl font-bold">Get Set, Study Abroad</h1>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left - Image */}
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden">
                    <img 
                      src="/abroad-img.webp" 
                      alt="Students studying together" 
                      className="w-full h-[500px] object-cover"
                    />
                  </div>
                </div>

                {/* Right - Content */}
                <div className="space-y-8">
                  <div>
                    <h2 style={{ color: '#14081E' }} className="text-3xl font-bold mb-6">Our Vision & Mission</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 style={{ color: '#14081E' }} className="text-xl font-semibold mb-3">
                          Vision: Get Set for Affordable Opportunities--
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          Upschol Abroad envisions empowering everyone through accessible and affordable global education, 
                          simplifying the journey from education to impactful careers.
                        </p>
                      </div>

                      <div>
                        <h3 style={{ color: '#14081E' }} className="text-xl font-semibold mb-3">
                          Mission: Get Set for Affordable Opportunities--
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          Upschol Abroad envisions empowering everyone through accessible and affordable global education, 
                          simplifying the journey from education to impactful careers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default StudyAbroad