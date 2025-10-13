'use client';

import AllAffiliated from "@/components/HomePage/AllAffiliated";
import AllBanner from "@/components/HomePage/AllBanner";
import AllCompany from "@/components/HomePage/AllCompany";
import Allcourses from "@/components/HomePage/Allcourses";
import AllIndustryExpert from "@/components/HomePage/AllIndustryExpert";
import AllPartner from "@/components/HomePage/AllPartner";
import AllTestimonial from "@/components/HomePage/AllTestimonial";
import AllUniversity from "@/components/HomePage/AllUniversity";
import { GraduationCap, Users, BookOpen, TrendingUp } from 'lucide-react';
import Link from "next/link";
import ScholarshipSection from "@/components/HomePage/ApplyScholarship";
import ContactSection from "@/components/HomePage/ContactusComponent";
import { useEffect, useRef, useState } from 'react';

// Import Swiper React components and styles (NPM method)
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from "next/image";
import Layout from "@/components/Candidatepagelayout";
import GetAllIndustryExpertsTesti from "@/components/IndustyExpert/IndustryExprtTestimonial";
import SpecializationsSection from "@/components/HomePage/AllSpecialization";

export default function Home() {
  const [activeTab, setActiveTab] = useState('Search1');
  
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

  const collegesathiData = {
    Search1: {
      title: "Search",
      image: "/images/search-image.svg",
      features: [
        "<strong>50+</strong> Universities at one platform.",
        "Check admission <strong>eligibility</strong> criteria.",
        "Choose your <strong>favorite</strong> university."
      ]
    },
    Search2: {
      title: "Study",
      image: "/images/study-image.svg",
      features: [
        "Find the university with best <strong>placements.</strong>",
        "Find the university with flexible <strong>payment</strong> options.",
        "Find the university with your preferred <strong>learning</strong> methods.",
        "Find the university with flexible <strong>exam</strong> schedule."
      ]
    },
    Search3: {
      title: "Support",
      image: "/images/support-image.svg",
      features: [
        "Experienced <strong>experts.</strong>",
        "<strong>Unbiased</strong> guidance.",
        "Timely <strong>updates.</strong>",
        "<strong>24*7</strong> assistance.",
        "100% post admission <strong>support.</strong>"
      ]
    }
  };

  const tabs = [
    { id: 'Search1', label: 'Search' },
    { id: 'Search2', label: 'Study' },
    { id: 'Search3', label: 'Support' }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <Layout>
    <div>
      <section className="banner_section">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
          }}
          speed={600}
          className="banner"
        >
          <SwiperSlide className="bnr">
            <img src="images/Bannerad.jpeg" className="img-fluid desktop_img" alt="Desktop Banner" decoding="async" />
            <img src="images/Phone-banner1.jpeg" className="img-fluid mobile_img" alt="Mobile Banner" decoding="async" />
          </SwiperSlide>
          <SwiperSlide className="bnr">
            <img src="images/Bannerbt.jpeg" className="img-fluid desktop_img" alt="Desktop Banner" decoding="async" />
            <img src="images/Phone-banner2.jpeg" className="img-fluid mobile_img" alt="Mobile Banner" decoding="async" />
          </SwiperSlide>
          <SwiperSlide className="bnr">
            <img src="images/bannerwr.jpeg" className="img-fluid desktop_img" alt="Desktop Banner" decoding="async" />
            <img src="images/Phone-banner3.jpeg" className="img-fluid mobile_img" alt="Mobile Banner" decoding="async" />
          </SwiperSlide>
        </Swiper>
      </section>

      <AllPartner />

      <section className="top-cards">
        <div className="container">
          <div className="card-container d-flex justify-content-center mx-auto flex-nowrap">
            <div className="top-card d-flex flex-column justify-content-center align-items-center px-2">
              <div className="d-none d-md-block">
                <Image
                  src="/images/website icons-05.svg" 
                  alt="Desktop Icon"
                  width={250}
                  height={250}
                  className="img-fluid"
                />
              </div>
              <div className="d-md-none">
                <Image 
                  src="/images/website icons phone-08-08-06.svg" 
                  alt="Mobile Icon"
                  width={40}
                  height={40}
                  className="img-fluid"
                />
              </div>
            </div>
            
            <div className="top-card d-flex flex-column justify-content-center align-items-center px-2">
              <div className="d-none d-md-block">
                <Image 
                  src="/images/website icons-03.svg" 
                  alt="Desktop Icon"
                  width={250}
                  height={250}
                  className="img-fluid"
                />
              </div>
              <div className="d-md-none">
                <Image 
                  src="/images/website icons phone-08-08-07.svg" 
                  alt="Mobile Icon"
                  width={40}
                  height={40}
                  className="img-fluid"
                />
              </div>
            </div>
            
            <div className="top-card d-flex flex-column justify-content-center align-items-center px-2">
              <div className="d-none d-md-block">
                <Image 
                  src="/images/website icons-04.svg" 
                  alt="Desktop Icon"
                  width={250}
                  height={250}
                  className="img-fluid"
                />
              </div>
              <div className="d-md-none">
                <Image 
                  src="/images/website icons phone-08-08-08.svg" 
                  alt="Mobile Icon"
                  width={40}
                  height={40}
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

          <Allcourses />
      <AllBanner />
      <AllUniversity />

        <GetAllIndustryExpertsTesti />

      <AllIndustryExpert />

      {/* Collegesathi Section - Original CSS Style */}
      <section className="collegesathi_section">
        <div className="container">
          <div className="headingCard">
            <h2 className="text-center heading"> Need a reason to pick <strong>Upschol</strong></h2>
            <p className="paragraphline text-center">Empowering Students with Upschol's Educational Expertise and Support.</p>
          </div>
          
          {/* Tabs Navigation */}
          <ul className="nav nav-pills navbarPill" id="pillsss-tab" role="tablist">
            {tabs.map((tab) => (
              <li key={tab.id} className="nav-item" role="presentation">
                <button 
                  className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => handleTabClick(tab.id)}
                  type="button" 
                  role="tab"
                  aria-selected={activeTab === tab.id}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
          
          <div className="collegesathiExpertise">
            <div className="tab-content" id="pills-tabContent">
              {tabs.map((tab) => {
                const data = collegesathiData[tab.id];
                return (
                  <div
                    key={tab.id}
                    className={`tab-pane fade ${activeTab === tab.id ? 'show active' : ''}`}
                    role="tabpanel"
                    tabIndex="0"
                  >
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <figure className="imagethumbBox text-center">
                          <img alt="image" src={data.image} />
                        </figure>
                      </div>
                      <div className="col-md-6">
                        <div className="boxshadow">
                          <h3>{data.title}</h3>
                          <ul className="checkListing certificate_listing">
                            {data.features.map((feature, index) => (
                              <li key={index} dangerouslySetInnerHTML={{ __html: feature }} />
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Background Circles */}
        <ul className="circles">
          {[...Array(10)].map((_, i) => (
            <li key={i} />
          ))}
        </ul>
      </section>
{/* 
      <AllAffiliated />
      <AllCompany />
      <ScholarshipSection />
      


      <AllTestimonial /> */}
      <SpecializationsSection />
      <ContactSection /> 

    </div>
    </Layout>
  );
}