import { getAllIndustryExpertsTestimonialsHomepage } from '@/app/api/admin/apiService';
import { useState, useEffect } from 'react';
import '../../../public/css/developer.css';

export default function GetAllIndustryExpertsTesti() {
  const [experts, setExperts] = useState([]);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const response = await getAllIndustryExpertsTestimonialsHomepage();
        
        if (response.status && response.result.experts) {
          setExperts(response.result.experts);
        }
      } catch (error) {
        console.error('Error fetching experts:', error);
      }
    };

    fetchExperts();
  }, []);

  const handleReadMore = (expert) => {
    setSelectedExpert(expert);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedExpert(null);
    document.body.style.overflow = 'auto';
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('testimonialModal')) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showModal]);

  if (!experts || experts.length === 0) {
    return (
      <section className="industry-experts my-3">
        <div className="container">
          <div className="text-center">
            <h1 className="text-center heading">Insights from the <strong>Industry experts</strong></h1>
          </div>
          <div className="body mt-4">
            <div className="text-center">No data found</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="industry-experts pb-10">
        <div className="container">
          <div className="text-center">
            <h1 className="text-center heading">Insights from the <strong>Industry experts</strong></h1>
          </div>
          <div className="body mt-4">
            <div className="swiper my-expert swiper-initialized swiper-horizontal swiper-backface-hidden">
              <div 
                className="swiper-wrapper" 
                id="swiper-wrapper-535a25246a0ca19b" 
                aria-live="off" 
              >
                {experts.map((expert, index) => {
                  let slideClass = "swiper-slide";
                  if (index === 0) slideClass += " swiper-slide-active";
                  else if (index === 1) slideClass += " swiper-slide-next"; 
                  else if (index === experts.length - 1) slideClass += " swiper-slide-prev";

                  return (
                    <div 
                      key={expert._id} 
                      className={slideClass}
                      role="group" 
                      aria-label={`${index + 1} / ${experts.length}`} 
                      data-swiper-slide-index={index} 
                    >
                      <div className="card d-flex align-items-center justify-content-center ps-5">
                        <div className="row d-flex align-items-center flex-reverse-rap">
                          <div className="col-md-8">
                            <div className="content">
                              <p>
                                <strong>{expert.testimonials}</strong>
                                <button 
                                  className="btn testimonial-modal-box" 
                                  onClick={() => handleReadMore(expert)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                  
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                    padding: 0,
                                    marginLeft: '5px'
                                  }}
                                >
                                  Read More
                                </button>
                              </p>
                              <div className="red-box d-flex align-items-center">
                                <img 
                                  src="/images/left.png" 
                                  className="red-icon" 
                                  alt="icon" 
                                  decoding="async" 
                                />
                                <div className="name-info ms-4">
                                  <b>{expert.name}</b>
                                  <br />
                                  <small>{expert.designation}</small>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 text-center">
                            <img 
                              src={expert.image} 
                              alt={expert.name} 
                              className=""
                              style={{maxWidth: '100%', height: 'auto'}}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="swiper-pagination d-none swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal">
                {experts.map((_, index) => (
                  <span 
                    key={index} 
                    className={`swiper-pagination-bullet ${index === 0 ? 'swiper-pagination-bullet-active' : ''}`}
                    tabIndex="0" 
                    role="button" 
                    aria-label={`Go to slide ${index + 1}`}
                    {...(index === 0 && { 'aria-current': 'true' })}
                  ></span>
                ))}
              </div>
              
              <div 
                className="swiper-button-next custom-next" 
                tabIndex="0" 
                role="button" 
                aria-label="Next slide" 
                aria-controls="swiper-wrapper-535a25246a0ca19b"
              ></div>
              <div 
                className="swiper-button-prev custom-prev" 
                tabIndex="0" 
                role="button" 
                aria-label="Previous slide" 
                aria-controls="swiper-wrapper-535a25246a0ca19b"
              ></div>
              
              <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && selectedExpert && (
        <div 
          className={`modal testimonialModal fade ${showModal ? 'show' : ''}`}
          id="testimonialModalBox"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-modal="true"
          role="dialog"
          style={{ 
            display: 'block', 
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1050
          }}
          onClick={handleBackdropClick}
        >
          <div className="appendModalBox" style={{ height: '100%' }}>
            <div className="modal-dialog modal-dialog-centered" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="modal-content" style={{ position: 'relative', maxWidth: '600px', width: '90%' }}>
                {/* Close Button - Properly Visible */}
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={handleCloseModal}
                  aria-label="Close"
                  style={{
                    position: 'absolute',
      
                    top: '-20px',
                    zIndex: 1060,
                    background: '#000',
                    opacity: 1,
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundSize: '15px',
                    backgroundPosition: 'center',
                    border: '2px solid #000'
                  }}
                ></button>
                
                <div className="modal-body" style={{ padding: '30px' }}>
                  <div className="testimonials-fulldecription pb-4">
                    <figure className="text-center mb-4">
                      <img 
                        src={selectedExpert.image} 
                        alt={selectedExpert.name}
                        style={{
                          width: '150px',
                          height: '150px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '5px solid #f8f9fa'
                        }}
                      />
                    </figure>
                    <div className="headingDetail text-center">
                      <div className="nameView" style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '10px'}}>
                        {selectedExpert.name}
                      </div>
                      <div className="positionview" style={{fontSize: '18px', color: '#666', marginBottom: '5px'}}>
                        {selectedExpert.designation}
                      </div>
                      <div className="workview" style={{fontSize: '16px', color: '#888', marginBottom: '10px'}}>
                        {selectedExpert.companyname}
                      </div>
                      {selectedExpert.linkedinurl && (
                        <div className="linkview">
                          <a 
                            href={selectedExpert.linkedinurl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: 'none',
                              color: '#0077b5',
                              fontSize: '14px'
                            }}
                          >
                            <i className="fa fa-linkedin-square me-2" aria-hidden="true"></i>
                            LinkedIn Profile
                          </a>
                        </div>
                      )}
                    </div>
                    <div 
                      className="detailparagraphview testimonials_decription pt-0 text-center mt-4"
                      style={{
                        fontSize: '16px',
                        lineHeight: '1.6',
                        color: '#333'
                      }}
                    >
                      {selectedExpert.testimonials}
                    </div>
                    <div className="quote-icon mt-4 text-center">
                      <img 
                        src="/images/quote.svg" 
                        alt="quote" 
                        style={{width: '50px', opacity: '0.6'}}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}