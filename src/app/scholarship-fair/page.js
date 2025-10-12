"use client"
import Layout from '@/components/Candidatepagelayout';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';

export default function ScholarshipFair() {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupdownloadbook, setshowPopupdownloadbook] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [coursesCurrentSlide, setCoursesCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const courses = [
    {
      title: "Digital Marketing",
      description: "Digital Marketing courses equip students with in-demand skills to create effective online strategies, helping businesses grow and succeed in the rapidly evolving digital landscape.",
      icon: "💼",
      images: "/digital_marketing.webp"
    },
    {
      title: "Data Science",
      description: "Data Science courses teach valuable analytical and technical skills, enabling students to harness data for impactful decision-making and thrive in today's data-driven industries.",
      icon: "📊",
      images: "/data_science.webp"
    },
    {
      title: "Film Making",
      description: "Film making courses offer creative and technical expertise, empowering students to tell compelling stories through visual media and pursue diverse careers in the entertainment industry.",
      icon: "🎬",
      images: "/film_making.webp"
    },
    {
      title: "Artificial Intelligence",
      description: "AI courses provide cutting-edge knowledge in automation and machine learning, preparing students for innovative, high-growth careers in technology and data-driven industries.",
      icon: "🤖",
      images: "/ai.webp"
    },
    {
      title: "Paramedical Courses",
      description: "Paramedical courses offer hands-on medical training, equipping students with essential skills for high-demand healthcare careers and immediate job opportunities in the medical field.",
      icon: "⚕️",
      images: "/paramedical.webp"
    },
    {
      title: "Humanities",
      description: "Humanities delves into culture, society, and human behavior, opening up a wide range of career opportunities in areas like law, education, journalism, and social work.",
      icon: "📚",
      images: "/humanities.webp"
    },
    {
      title: "Medicine",
      description: "Medical focus on healthcare and life sciences, leading to rewarding careers in medicine, research, and patient care.",
      icon: "📚",
      images: "/medicine.webp"
    },
    {
      title: "Engineering",
      description: "Engineering cultivates critical thinking and innovation, offering diverse career paths in fields like technology.",
      icon: "📚",
      images: "/engineering.png"
    },
    {
      title: "Commerce",
      description: "Commerce provides a solid foundation for careers in management, entrepreneurship, and financial services.",
      icon: "📚",
      images: "/commerce.webp"
    }
  ];

  // Duplicate courses for seamless infinite carousel
  const carouselCourses = [...courses, ...courses, ...courses];

  const exhibitors = [
    { name: "Amity", logo: "/amity_logo.png" },
    { name: "NMIMS", logo: "/nmims_logo.png" },
    { name: "LPU", logo: "/lpu/cropped-download-1.png" },
    { name: "MANIPAL", logo: "/lpu/manipallogo.png" },
    { name: "DPU", logo: "/logo-01.png" }
  ];

  // Duplicate exhibitors for seamless infinite carousel
  const carouselExhibitors = [...exhibitors, ...exhibitors, ...exhibitors];

  const faqs = [
    {
      question: "What is the Upschol Scholarship Fair 2025?",
      answer: "It's India's biggest virtual scholarship fair connecting students with educational institutions and scholarship providers."
    },
    {
      question: "Who can attend the Scholarship Fair?",
      answer: "All students from 10th grade to college graduates looking for higher education opportunities."
    },
    {
      question: "What can I expect from the event?",
      answer: "Placement Supports, direct interaction with college experts, scholarship opportunities, and free career guidance."
    },
    {
      question: "Why should I attend the Scholarship Fair?",
      answer: "To access scholarships up to 100%, get personalized guidance, and explore innovative courses."
    },
    {
      question: "How do I apply for scholarships during the fair?",
      answer: "You can apply directly through our platform during the event with guidance from our experts."
    },
    {
      question: "Is there any registration fee?",
      answer: "No, the scholarship fair is completely free for all attendees."
    }
  ];

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Form validation function
  const isFormValid = () => {
    const { name, email, phone } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    
    return (
      name.trim().length > 0 &&
      emailRegex.test(email) &&
      phoneRegex.test(phone)
    );
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Phone number validation - only allow digits and limit to 10
    if (name === 'phone') {
      const cleanedValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData({
        ...formData,
        [name]: cleanedValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle form submission with API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    
    setLoading(true);
    
    try {
      const response = await fetch("/api/scholarship-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Redirect to thank you page on success
        window.location.href = "/thank-you";
      } else {
        const data = await response.json();
        setMessage(data.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

   const handleSubmit1 = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    
    setLoading(true);
    
    try {
      const response = await fetch("/api/scholarship-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Close the popup first
        setshowPopupdownloadbook(false);
        
        // Download the PDF
        const link = document.createElement('a');
        link.href = '/OnlineUGandPG.pdf';
        link.download = 'OnlineUGandPG.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Small delay before redirect to ensure download starts
        setTimeout(() => {
          window.location.href = "/thank-you";
        }, 500);
      } else {
        const data = await response.json();
        setMessage(data.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Set up the infinite carousel for exhibitors
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % exhibitors.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [exhibitors.length]);

  // Set up the infinite carousel for courses
  useEffect(() => {
    const interval = setInterval(() => {
      setCoursesCurrentSlide(prev => (prev + 1) % courses.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [courses.length]);

  const openPopup = () => setShowPopup(true);
  const closePopup = () => {
    setShowPopup(false);
    setMessage('');
    setFormData({ name: '', email: '', phone: '' });
  };

  const openguide = () => setshowPopupdownloadbook(true);
  const closePopupguide = () => {
    setshowPopupdownloadbook(false);
    setMessage('');
    setFormData({ name: '', email: '', phone: '' });
  };

  return (
    <>
    <Head>
      <title>Scholarship Fair</title>
    </Head>
    <Layout>
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="text-2xl mr-3">📅</span>
              <span className="text-white font-medium">15th September 2025</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              India&apos;s Biggest
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
                Scholarship Fair 2025
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto mb-12 leading-relaxed">
              Scholarships upto <span className="text-yellow-400 font-bold">100%</span> • 
              Career Guidance • Placement Supports
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <button 
                onClick={openPopup}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-xl"
              >
                Register Now (Free)
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-4xl mb-3">🏆</div>
                <p className="text-white font-medium">Scholarships upto 100%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-4xl mb-3">👥</div>
                <p className="text-white font-medium">Career Guidance</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-4xl mb-3">🎥</div>
                <p className="text-white font-medium">Placement Support</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-4xl mb-3">🗺️</div>
                <p className="text-white font-medium">30+ Top online Universities</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About the <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Fair</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            The Upschol Scholarship Fair 2025 brings together students, educators, and institutions to unlock educational opportunities. Get personalized guidance and discover your perfect academic path.
          </p>
        </div>
      </div>

      {/* Exhibitors Section with Mobile Responsive Infinite Carousel */}
      <div className="bg-gray-50 px-4 sm:px-6 lg:px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Our Universities</h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Universities at Upschol Scholarship Fair 2025 showcase educational institutions, programs, and career opportunities, offering students insights and guidance for their academic and professional futures.
          </p>
          
          {/* Mobile Responsive Infinite Carousel */}
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-1000 ease-in-out"
                 style={{ transform: `translateX(-${currentSlide * (100 / exhibitors.length)}%)` }}>
              {carouselExhibitors.map((exhibitor, index) => (
                <div key={index} className={`flex-shrink-0 ${isMobile ? 'w-1/1' : 'w-1/5'}`}>
                  <div className="bg-white p-6 flex flex-col items-center justify-center transition-all duration-300 group text-center">
                    {/* Increased container size for mobile */}
                    <div className={`mb-4 flex items-center justify-center ${
                      isMobile ? 'w-40 h-32' : 'w-30 h-20'
                    }`}>
                      <img
                        src={exhibitor.logo}
                        alt={`${exhibitor.name} logo`}
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />             
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center">
              {exhibitors.map((_, index) => (
                <button
                  key={index}
                  className={`h-3 w-3 rounded-full mx-1 ${currentSlide === index ? 'bg-purple-600' : 'bg-gray-300'}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Us Section */}
      <div className="py-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">Why Upschol?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-8 group">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl text-white">👥</span>
            </div>
            <h3 className="text-4xl font-black text-gray-900 mb-2">30M+</h3>
            <p className="text-gray-600 font-medium text-lg">Reach</p>
          </div>
          <div className="text-center p-8 group">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl text-white">🏆</span>
            </div>
            <h3 className="text-4xl font-black text-gray-900 mb-2">88%</h3>
            <p className="text-gray-600 font-medium text-lg">Admit Rate</p>
          </div>
          <div className="text-center p-8 group">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl text-white">📚</span>
            </div>
            <h3 className="text-4xl font-black text-gray-900 mb-2">100K+</h3>
            <p className="text-gray-600 font-medium text-lg">Students Catered</p>
          </div>
          <div className="text-center p-8 group">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl text-white">🏫</span>
            </div>
            <h3 className="text-4xl font-black text-gray-900 mb-2">1,100+</h3>
            <p className="text-gray-600 font-medium text-lg">Universities</p>
          </div>
        </div>
      </div>

      {/* Courses Section - Now with Carousel */}
      <div className="bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Innovative Courses</h2>
          <p className="text-xl text-gray-600 mb-16 text-center max-w-3xl mx-auto">
            The Upschol Scholarship Education Fair 2025 features innovative courses designed to equip students with cutting-edge skills and knowledge.
          </p>
          
          {/* Mobile and Desktop Responsive Carousel */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ 
                transform: `translateX(-${coursesCurrentSlide * (isMobile ? 100 : 33.333)}%)` 
              }}
            >
              {carouselCourses.map((course, index) => (
                <div 
                  key={index} 
                  className={`flex-shrink-0 px-4 ${isMobile ? 'w-full' : 'w-1/3'}`}
                >
                  <div className="card min-w-[250px] group rounded-lg">
                    <figure className="relative w-full rounded-lg aspect-[0.71/1] overflow-hidden mb-4">
                      <img 
                        alt={course.title}
                        loading="lazy"
                        decoding="async"
                        className="object-cover rounded-lg w-full h-full group-hover:scale-110 transition-transform duration-300"
                        src={course.images}
                      />
                      
                      {/* Overlay with course info - similar to original design */}
                      <div className="absolute opacity-100 group-hover:opacity-0 rounded-lg inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                        <span className="text-white font-bold text-lg block transform translate-y-0 group-hover:-translate-y-8 transition-transform duration-300">
                          {course.title}
                        </span>
                      </div>
                      
                      <div className="absolute inset-0 flex flex-col rounded-lg justify-end p-4 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white font-bold text-lg transform translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                          {course.title}
                        </span>
                        <span className="text-white mt-2 transform translate-y-12 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                          {course.description}
                        </span>
                      </div>
                    </figure>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <div className="flex gap-2 justify-center items-center mt-6">
              <button 
                className="bg-purple text-white rounded-lg p-2 md:text-2xl text-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => setCoursesCurrentSlide(prev => prev === 0 ? courses.length - 1 : prev - 1)}
              >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path>
                </svg>
              </button>
              <button 
                className="bg-purple text-white rounded-lg md:text-2xl text-lg p-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => setCoursesCurrentSlide(prev => (prev + 1) % courses.length)}
              >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Career Guidance Roadmap Section - Updated with Responsive Flexbox */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <section className="bg-[#14081E] text-white p-6 sm:p-8 rounded-lg">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Content Section */}
            <div className="flex-1">
              <h2 className="text-2xl sm:text-2xl lg:text-2xl font-bold mb-2 sm:mb-4">
                Career Guidance
              </h2>
              <h3 className="text-lg sm:text-xl lg:text-xl font-semibold leading-loose">
                Feeling stuck or confused about your future? Download this guidebook to find the right direction for your journey
              </h3>
            </div>
            
            {/* Button Section */}
            <div className="w-full lg:w-auto flex justify-center lg:justify-end">
              <button 
                onClick={openguide}
                className="bg-white text-[#14081E] hover:bg-gray-100 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg w-full sm:w-auto justify-center"
              >
                <span>Download Guidebook</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5" 
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <h3 className="font-bold text-xl text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"></div>
        <div className="relative max-w-4xl mx-auto text-center py-10 px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to Find Your Perfect Scholarship?</h2>
          <p className="text-xl text-purple-100 mb-10 max-w-3xl mx-auto leading-relaxed">Join India&apos;s biggest scholarship fair and unlock opportunities.</p>
          <button 
            onClick={openPopup}
            className="bg-white text-purple-600 px-12 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-2xl"
          >
            Register Now (Free)
          </button>
        </div>
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative transform transition-all duration-300">
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-2xl"
            >
              ×
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Register for Scholarship Fair</h3>
              <p className="text-gray-600">Join India&apos;s biggest scholarship fair and unlock opportunities.</p>
            </div>

            {message && (
              <div className={`mb-4 p-3 rounded-lg ${message.includes('error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {message}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number * (10 digits)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Enter 10 digit phone number"
                  maxLength="10"
                />
                {formData.phone && formData.phone.length !== 10 && (
                  <p className="text-red-500 text-sm mt-1">Phone number must be exactly 10 digits</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={loading || !isFormValid()}
                onClick={handleSubmit}
                className={`w-full py-3 rounded-lg font-semibold text-lg transition-all duration-200 transform flex items-center justify-center ${
                  isFormValid() && !loading
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Register Now (Free)"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Book Popup Form */}
      {showPopupdownloadbook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative transform transition-all duration-300">
            <button 
              onClick={closePopupguide}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-2xl"
            >
              ×
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Career Guide</h3>
              <p className="text-gray-600">Get your free career guidance roadmap and find the right direction for your journey.</p>
            </div>

            {message && (
              <div className={`mb-4 p-3 rounded-lg ${message.includes('error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {message}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number * (10 digits)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Enter 10 digit phone number"
                  maxLength="10"
                />
                {formData.phone && formData.phone.length !== 10 && (
                  <p className="text-red-500 text-sm mt-1">Phone number must be exactly 10 digits</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={loading || !isFormValid()}
                onClick={handleSubmit1}
                className={`w-full py-3 rounded-lg font-semibold text-lg transition-all duration-200 transform flex items-center justify-center ${
                  isFormValid() && !loading
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Download Guide & Register"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div></Layout>
    </>
  );
}