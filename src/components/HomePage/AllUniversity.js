"use client"
import { getAllpartnersdata } from '@/app/api/admin/courseapi';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AllUniversity() {
  const [partners, setPartners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperWrapperRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllpartnersdata();
        if (response.status && response.result.data) {
          setPartners(response.result.data);
        }
      } catch (error) {
        console.error('Error fetching partners data:', error);
      }
    };
    fetchData();
  }, []);

  const slideWidth = 272;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : partners.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < partners.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    if (swiperWrapperRef.current) {
      swiperWrapperRef.current.style.transform = `translate3d(-${currentIndex * slideWidth}px, 0px, 0px)`;
    }
  }, [currentIndex]);

  if (partners.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading Universities...</p>
        </div>
      </div>
    );
  }

  const colorClasses = ['c-1', 'c-2', 'c-3', 'c-4', 'c-5'];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Title */}
    <div className="d-flex justify-content-between align-items-center mb-4">
  <h2 className="h1 fw-bold">
    Discover <span style={{color: "#8D0DFE"}}>Leading Universities</span>
  </h2>
  <a href="/universities" className="btn fw-medium" style={{backgroundColor: "#8D0DFE", color: "white"}}>
    View All &gt;
  </a>
</div>


        {/* Swiper */}
        <div className="swiper my-leading swiper-initialized swiper-horizontal swiper-backface-hidden">
          <div 
            ref={swiperWrapperRef}
            className="swiper-wrapper"
            id="swiper-wrapper-e48e451babdf107e2"
            aria-live="off"
            style={{
              transitionDuration: '300ms',
              transform: `translate3d(-${currentIndex * slideWidth}px, 0px, 0px)`,
              transitionDelay: '0ms'
            }}
          >
            {partners.map((partner, index) => (
              <div
                key={partner._id}
                className="swiper-slide"
                role="group"
                aria-label={`${index + 1} / ${partners.length}`}
                data-swiper-slide-index={index}
                style={{ width: '252px', marginRight: '20px' }}
              >
                <div className={`card-content cards p-0 border-0 ${colorClasses[index % 5]}`}>
                  <div 
                    className="card-background"
                    style={{
                      backgroundImage: `url(${partner.universityHomeImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <div className="body p-2">
                    <Link href={`/university/${partner.collegeUrl}`}>
                      <div className="logo-circle">
                        <Image
                          src={partner.logo}
                          alt="u-logo"
                          width={150}
                          height={150}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                      <p className="mb-0" style={{color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: '14px'}}>
                        {partner.universityName}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div 
            className="swiper-button-prev"
            tabIndex={0}
            role="button"
            aria-label="Previous slide"
            aria-controls="swiper-wrapper-e48e451babdf107e2"
            onClick={handlePrev}
          ></div>
          <div 
            className="swiper-button-next"
            tabIndex={0}
            role="button"
            aria-label="Next slide"
            aria-controls="swiper-wrapper-e48e451babdf107e2"
            onClick={handleNext}
          ></div>
          <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
        </div>
      </div>

      <style jsx>{`
        .swiper {
          position: relative;
          overflow: hidden;
        }
        
        .swiper-wrapper {
          display: flex;
          transition-timing-function: ease-out;
        }
        
        .swiper-slide {
          flex-shrink: 0;
        }
        
        .card-content {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .card-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          filter: brightness(0.5);
          z-index: 0;
        }
        
        .card-content:hover {
          transform: translateY(-5px);
        }
        
        .body {
          position: relative;
          z-index: 1;
          text-align: center;
        }
        
        .body a {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .logo-circle {
          width: 140px;
          height: 140px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .swiper-button-prev,
        .swiper-button-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          background: #8D0DFE;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          z-index: 10;
          transition: all 0.3s ease;
          color: white;
        }
        
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: #8D0DFE;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        .swiper-button-prev::after,
        .swiper-button-next::after {
          content: '';
          width: 10px;
          height: 10px;
          border-top: 2px solid white;
          border-right: 2px solid white;
        }
        
        .swiper-button-prev {
          left: 10px;
        }
        
        .swiper-button-prev::after {
          transform: rotate(-135deg);
          margin-left: 3px;
        }
        
        .swiper-button-next {
          right: 10px;
        }
        
        .swiper-button-next::after {
          transform: rotate(45deg);
          margin-right: 3px;
        }

        .p-0 {
          padding: 0;
        }

        .border-0 {
          border: 0;
        }

        .p-2 {
          padding: 0.5rem;
        }

        .mb-0 {
          margin-bottom: 0;
        }
      `}</style>
    </section>
  );
}