'use client';
import { getAllSpecializationshome } from '@/app/api/admin/apiService';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';

const SpecializationsSection = () => {
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const specializationsData = await getAllSpecializationshome();
        setSpecializations(specializationsData?.result?.specializations || []);
      } catch (error) {
        console.error('Error fetching specializations:', error);
        setSpecializations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecializations();
  }, []);

  // Function to truncate description to 30 characters
  const truncateDescription = (description) => {
    if (!description) return '';
    if (description.length <= 150) return description;
    return description.substring(0, 150) + '...';
  };

  if (loading) {
    return <div className="text-center py-5">Loading specializations...</div>;
  }

  return (
    <section className="top-choice-uni top-choice my-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-5">
            <div className="left-stuf txt-center-sm mb-lg-10">
              <h2>Best <strong style={{color:"#7004e5"}}>Trending Specialization</strong> of 2025 </h2>
              <p>These emerging fields offer exciting opportunities for professionals to drive impactful change and lead the future of innovation</p>
              <Link href="/specialization" className="btn btn-red">View All</Link>
            </div>
          </div>
          <div className="col-xl-7 position-relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: '.custom-next',
                prevEl: '.custom-prev',
              }}
              spaceBetween={-24}
              slidesPerView={'auto'}
              className="my-trend"
            >
              {specializations.map((specialization, index) => (
                <SwiperSlide 
                  key={specialization._id}
                  style={{ width: '398px' }}
                >
                  <div className="card d-block border-0 p-0">
                    <Link href={`/specialization/${specialization.url}`}>
                      <img 
                        src={specialization.bannerImage} 
                        alt={specialization.title} 
                        className="w-100"
                        style={{ height: '258px', objectFit: 'cover' }}
                      />
                    </Link>
                    <div className="px-2 py-2">
                      <small>Specialization</small>
                      <br />
                      <Link href={`/specialization/${specialization.url}`}>
                        <h6 className="mb-2 d-block" style={{color:"#000"}}>
                          {specialization.title}
                        </h6>
                        <p className="d-flex align-items-center mb-0 mt-0">
                          <small className="ps-1" style={{color:"#000"}}>
                            {truncateDescription(specialization.description)}
                          </small>
                        </p>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              
              {/* Navigation buttons */}
              <div className="swiper-button-next custom-next" tabIndex="0" role="button" aria-label="Next slide"></div>
              <div className="swiper-button-prev custom-prev" tabIndex="0" role="button" aria-label="Previous slide"></div>
              <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecializationsSection;