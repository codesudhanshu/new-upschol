import React from 'react';
import { GraduationCap, Target, Users, Shield, BookOpen, TrendingUp, Award, CheckCircle, MessageCircle, Clock, FileCheck, Search } from 'lucide-react';
import Layout from '@/components/Candidatepagelayout';

export default function AboutUs() {
  const stats = [
    { number: "9M+", label: "Students annually", icon: <Users className="w-8 h-8" /> },
    { number: "500+", label: "Online courses", icon: <BookOpen className="w-8 h-8" /> },
    { number: "95%", label: "Satisfaction rate", icon: <Award className="w-8 h-8" /> }
  ];

  const whatWeDoItems = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "Compare Top Online Universities",
      description: "Easily explore programs from universities like Amity, LPU, Manipal, Chandigarh University, and more.",
      color: "purple"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Personalized Guidance",
      description: "Our expert counselors help you choose the right course based on your career goals and background.",
      color: "blue"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "End-to-End Support",
      description: "From application to admission — we assist you through every step of your enrollment process.",
      color: "green"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "100% UGC-Approved Programs",
      description: "Study with confidence knowing your degree is recognized and valid for jobs, government exams, and higher studies.",
      color: "orange"
    }
  ];

  const whoWeHelp = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "12th Pass Students",
      description: "Looking to start their graduation journey online with flexible learning options.",
      gradient: "from-purple-500 to-purple-700"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Working Professionals",
      description: "Aiming to upgrade their qualifications without quitting their job.",
      gradient: "from-blue-500 to-blue-700"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Government Job Aspirants",
      description: "Who need recognized degrees for eligibility and promotions.",
      gradient: "from-green-500 to-green-700"
    }
  ];

  const courses = [
    "Online B.A.", "Online B.Com", "Online BBA", "Online MBA", "Online MCA"
  ];

  return (
    <Layout>
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative py-5 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-white opacity-70"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full  bg-[#7004e5] text-white text-sm font-semibold mb-6">
            <Award className="w-4 h-4 mr-2" />
            Your Pathway to a Recognized Online Degree
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About Us | <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Upschol</span>
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
            Empowering Students to Learn Without Limits
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            At Upschol, we believe higher education should be accessible, flexible, and career-focused. 
            We are an online education platform that helps students find and enroll in UGC-approved online 
            degree programs from top Indian universities—so you can graduate with the same recognition, 
            but with more flexibility and less hassle.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center shadow-2xl">
            <Target className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-xl text-white/90 leading-relaxed">
              To guide students and working professionals toward the right online university and course 
              that matches their career goals, lifestyle, and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-gray-600">Transforming lives through education every day</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-purple-600 flex justify-center mb-4">
                  {stat.icon}
                </div>
                <p className="text-5xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </p>
                <p className="text-lg text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full  bg-[#7004e5] text-white text-sm font-semibold mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              What We Do
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Trusted <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Education Partner</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Upschol acts as your trusted education partner, helping you make informed choices about your online learning journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whatWeDoItems.map((item, index) => (
              <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-${item.color}-100 text-${item.color}-600 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Help Section */}
      <section className="py-5 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full  bg-[#7004e5] text-white text-sm font-semibold mb-6">
              <Users className="w-4 h-4 mr-2" />
              Who We Help
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Designed For <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Your Success</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {whoWeHelp.map((item, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300 bg-gradient-to-r from-purple-400 to-purple-600">
                </div>
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${item.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
            <p className="text-lg text-gray-700 mb-6">
              Whether you're pursuing:
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {courses.map((course, index) => (
                <span key={index} className="px-5 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full font-semibold text-sm hover:shadow-md transition-shadow duration-300">
                  {course}
                </span>
              ))}
            </div>
            <p className="text-lg text-gray-700 font-semibold">
              Upschol ensures your learning journey is simple, guided, and result-driven.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full  bg-[#7004e5] text-white text-sm font-semibold mb-6">
            <CheckCircle className="w-4 h-4 mr-2" />
            Ready to Start?
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Join Our Educational <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Revolution</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Ready to start your journey with UpSchol? Discover courses, apply for scholarships, and take control of your future today with personalized guidance every step of the way.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button className="group relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <span className="flex items-center">
                Explore Programs
                <CheckCircle className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </button>
            {/* <button className="group flex items-center space-x-2 text-gray-900 font-semibold py-4 px-10 rounded-2xl border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300">
              <span>Watch Our Story</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button> */}
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm">
            {[
              { icon: <CheckCircle className="w-5 h-5" />, text: "Free Consultation" },
              { icon: <FileCheck className="w-5 h-5" />, text: "No Hidden Fees" },
              { icon: <Clock className="w-5 h-5" />, text: "24/7 Support" }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-2 text-gray-600">
                <div className="text-green-500">
                  {item.icon}
                </div>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </Layout>
  );
}