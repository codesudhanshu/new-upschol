import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/Candidatepagelayout';
import Link from 'next/link';

export default function vision() {

  const stats = [
    { number: "9M+", label: "Students annually", icon: "👥" },
    { number: "500+", label: "Online courses", icon: "📚" },
    { number: "95%", label: "Satisfaction rate", icon: "⭐" }
  ];

  return (
    <Layout>
      <div className="min-h-0 bg-white">
        <Head>
          <title>Vision and Mission - UpSchol | Your Guide for the Right Path</title>
          <meta name="description" content="Learn about UpSchol's mission to provide education for all through online courses and scholarships" />
        </Head>
    

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

          {/* Mission & Vision Section */}
          <section className="py-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#7004e5] text-white text-sm font-medium mb-6">
                🎯 Our Purpose
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#7004e5] mb-4">Mission & Vision</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Driving educational transformation through innovation, accessibility, and excellence
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="group relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-3xl"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#7004e5] mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To bridge the gap between students and universities by providing transparent, reliable and easy access to online degree programs empowering learners to make smart, future-ready education choices.
                </p>
              </div>

              <div className="group relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl border border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 to-teal-600 rounded-t-3xl"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#7004e5] mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To become India’s most trusted online education platform, helping every learner achieve their academic and career goals without barriers of time, place or financial limitations.
                </p>
              </div>
            </div>
          </section>


          {/* CTA Section */}
          <section className="py-10 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center px-3 py-1 rounded-full  bg-[#7004e5] text-white text-sm font-medium mb-6">
                🚀 Ready to Start?
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#7004e5] mb-6">
                Join Our Educational <span className="bg-gradient-to-r from-purple-600 to-[#7004e5] bg-clip-text text-transparent">Revolution</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                Ready to start your journey with UpSchol? Discover courses, apply for scholarships, and take control of your future today with personalized guidance every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group relative bg-gradient-to-r from-[#7004e5] to-purple-600 hover:from-purple-600 hover:to-[#7004e5] text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                  <span className="relative z-10">
                    <Link href="/university" className='text-white'>Explore Programs</Link>
                  </span>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                {/* <button className="group flex items-center space-x-2 text-[#7004e5] font-semibold py-4 px-8 rounded-2xl border-2 border-[#7004e5] hover:bg-[#7004e5] hover:text-white transition-all duration-300">
                  <span>Watch Our Story</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button> */}
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>No Hidden Fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}