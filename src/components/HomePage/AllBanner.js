"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { getAllBannerData } from '@/app/api/candidate/HomePage';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const QuestionsSection = () => {
  const swiperRef = useRef(null);
  const [questionImages, setQuestionImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load question images data
  useEffect(() => {
    const loadQuestionImages = async () => {
      setIsLoading(true);
      const data = await getAllBannerData();
      if (data.status && data.result.banners) {
        setQuestionImages(data.result.banners);
      }
      setIsLoading(false);
    };

    loadQuestionImages();
  }, []);

  return (
    <>
      <section className="questions my-5">
        <div className="container">
          <div className="header">
            <h2 className="text-center heading">
              <strong>Questions?</strong> We can help
            </h2>
            <p className="paragraphline text-center">
              Of course! Feel free to ask your questions, and we will do our best to provide a detailed and helpful response.
            </p>
          </div>
          <div className="question-list mt-4">
            {/* Loading State */}
            {isLoading ? (
              <div className="swiper my-swiper swiper-qst">
                <div className="swiper-wrapper">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="swiper-slide">
                      <div className="card f-card">
                        <div className="w-full h-60 bg-gray-200 rounded-lg animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : questionImages.length > 0 ? (
              /* Swiper Container */
              <div className="swiper my-swiper swiper-qst">
                <Swiper
                  ref={swiperRef}
                  modules={[Navigation, Autoplay]}
                  slidesPerView={3}
                  spaceBetween={10}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 0
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 60
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 10
                    }
                  }}
                  className="swiper-wrapper"
                >
                  {questionImages.map((banner) => (
                    <SwiperSlide key={banner._id}>
                      <div className="card f-card">
                        <img 
                          src={banner.image}
                          className="card-img"
                          alt={banner.title || 'Question Image'}
                          width="360"
                          height="240"
                          decoding="async"
                     
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg==';
                          }}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                  {/* Navigation Buttons */}
                  <div className="swiper-button-next" style={{color:"white"}}></div>
                  <div className="swiper-button-prev" style={{color:"white"}}></div>
                </Swiper>
              </div>
            ) : (
              /* No Data State */
              <div className="swiper my-swiper swiper-qst">
                <div className="swiper-wrapper">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="swiper-slide">
                      <div className="card f-card">
                        <div className="w-full h-60 bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="text-gray-500">No questions available</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        .questions .header {
          max-width: 621px;
          margin: 0 auto 20px;
          text-align: center;
        }
        
        .swiper-qst {
          width: 100%;
        }
        
        .f-card {
          max-width: 100%;
          border: none;
        }
        
        .card-img {
          width: 100%;
          height: auto;
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
        
        @media (max-width: 500px) {
          .my-sm-2 {
            margin-top: 14px;
            margin-bottom: 14px;
          }
        }
      `}</style>
    </>
  );
};

export default QuestionsSection;  