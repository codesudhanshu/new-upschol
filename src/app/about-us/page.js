import Head from 'next/head';
import Image from 'next/image';
import Layout from '@/components/Candidatepagelayout';
import Link from 'next/link';

export default function AboutUs() {
  const leaders = [
    {
      name: "David Mitchell",
      role: "Founder",
      quote: "At UpSchol, we envision a world where education knows no limits. The pandemic has accelerated online learning's potential, revolutionizing how we access knowledge.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "Sarah Johnson",
      role: "Co-founder",
      quote: "The rise of online learning is not just a phase but a window to endless opportunities. At UpSchol, we put you first and offer the best online education possible.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80"
    },
    {
      name: "Michael Chen",
      role: "Co-founder",
      quote: "Education is changing fast, and online learning is at the forefront. At UpSchol, we support you at every step with personalized counseling and guidance.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    }
  ];

  const stats = [
    { number: "9M+", label: "Students annually", icon: "👥" },
    { number: "500+", label: "Online courses", icon: "📚" },
    { number: "95%", label: "Satisfaction rate", icon: "⭐" }
  ];

  return (
    <Layout>
      <div className="min-h-0 bg-white">
        <Head>
          <title>About Us - UpSchol | Your Guide for the Right Path</title>
          <meta name="description" content="Learn about UpSchol's mission to provide education for all through online courses and scholarships" />
        </Head>
    

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

          {/* Introduction Section */}
          <section className="py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
                  ✨ Our Story
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#14081E] mb-6 leading-tight">
                  UpSchol: <br />
                  <span className="bg-gradient-to-r from-purple-600 to-[#14081E] bg-clip-text text-transparent">
                    Upskilling with Scholarships
                  </span>
                </h2>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    UpSchol, short for <strong className="text-[#14081E]">Upskilling with Scholarships</strong>, envisions education for all. It is the perfect platform for students, helping them discover the best online courses with cutting-edge technology and personalized guidance.
                  </p>
                  <p>
                    With a base of <strong className="text-[#14081E]">9+ million students</strong> annually enrolling in online programs, we aim to provide a clear path for students, offering not only the right education but also scholarships and placement assurance.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Personalized Learning Paths</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Scholarship Opportunities</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Placement Support</span>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-[#14081E] rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
                  <Image 
                    src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80"
                    alt="Students learning online together"
                    width={600}
                    height={400}
                    className="relative rounded-2xl shadow-2xl object-cover hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-[#14081E]">98% Success Rate</p>
                        <p className="text-sm text-gray-600">Student Satisfaction</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Vision Section */}
          <section className="py-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                🎯 Our Purpose
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#14081E] mb-4">Mission & Vision</h2>
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
                <h3 className="text-2xl font-bold text-[#14081E] mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To offer correct information and guidance to those pursuing higher education online or seeking upskilling opportunities. We aim to reach every corner, making people aware of the benefits of online education and serving society through excellence, leadership, and scholarships for all.
                </p>
              </div>

              <div className="group relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl border border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 to-teal-600 rounded-t-3xl"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#14081E] mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To create a platform that guides individuals in making informed decisions about their higher education journey. We strive to simplify the online education landscape, making it accessible to all, including those facing financial constraints.
                </p>
              </div>
            </div>
          </section>

          {/* Leadership Section */}
          <section className="py-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
                👑 Leadership Team
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#14081E] mb-4">Our Visionary Leaders</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet the passionate minds driving educational innovation and change
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leaders.map((leader, index) => (
                <div key={index} className="group relative bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <div className="relative h-64 bg-gradient-to-br from-[#14081E] to-purple-600 overflow-hidden">
                    <Image 
                      src={leader.image}
                      alt={`${leader.name} - ${leader.role}`}
                      fill
                      className="object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14081E]/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{leader.name}</h3>
                      <p className="text-purple-200">{leader.role}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start space-x-2 mb-4">
                      <svg className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <p className="text-gray-700 italic leading-relaxed">"{leader.quote}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-10">
            <div className="relative bg-gradient-to-br from-[#14081E] via-purple-900 to-[#14081E] rounded-3xl overflow-hidden">
              <div className="relative px-8 py-16">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Impact in Numbers</h2>
                  <p className="text-xl text-purple-200">Transforming lives through education every day</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center group">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300">
                        <div className="text-4xl mb-4">{stat.icon}</div>
                        <p className="text-5xl md:text-6xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                          {stat.number}
                        </p>
                        <p className="text-xl text-purple-200">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-10 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
                🚀 Ready to Start?
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#14081E] mb-6">
                Join Our Educational <span className="bg-gradient-to-r from-purple-600 to-[#14081E] bg-clip-text text-transparent">Revolution</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                Ready to start your journey with UpSchol? Discover courses, apply for scholarships, and take control of your future today with personalized guidance every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group relative bg-gradient-to-r from-[#14081E] to-purple-600 hover:from-purple-600 hover:to-[#14081E] text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                  <span className="relative z-10">
                    <Link href="/university">Explore Programs</Link>
                  </span>
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button className="group flex items-center space-x-2 text-[#14081E] font-semibold py-4 px-8 rounded-2xl border-2 border-[#14081E] hover:bg-[#14081E] hover:text-white transition-all duration-300">
                  <span>Watch Our Story</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
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