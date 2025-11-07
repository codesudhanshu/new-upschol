"use client";
import { useEffect, useState, useRef } from "react";
import { Star, CheckCircle, Download, ChevronRight, ChevronDown, X, Check } from 'lucide-react';
import { useRouter } from "next/navigation";
import { getUniversityByUrl } from "@/app/api/admin/apiService";
import UniversityRatingGauge from "./UniversityRatingGauge";

export default function UniversityClient({ collegeUrl }) {
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("About");
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [showFeeModal, setShowFeeModal] = useState(false);
  const sectionRefs = useRef({});
  const observerRef = useRef(null);
  const router = useRouter();
  const gaugeCanvasRef = useRef(null);

  // Slider refs
  const approvalSliderRef = useRef(null);
  const hiringSliderRef = useRef(null);

  useEffect(() => {
    if (!collegeUrl) return;
    localStorage.removeItem('selectedUniversity');
    
    const fetchUniversity = async () => {
      try {
        const data = await getUniversityByUrl(collegeUrl);
       if (data?.status) {
          setUniversity(data.result.data);
        } else {
          setError("University not found");
        }
      } catch (err) {
        setError("Failed to fetch university");
      } finally {
        setLoading(false);
      }
    };

    fetchUniversity();
  }, [collegeUrl]);

  // Draw gauge when university data is loaded
  useEffect(() => {
    if (university && gaugeCanvasRef.current) {
      drawGauge(university.universityRating || 4.0);
    }
  }, [university]);

  // Auto-scroll sliders
  useEffect(() => {
    const autoScroll = (sliderRef) => {
      if (!sliderRef.current) return;
      
      const slider = sliderRef.current;
      let scrollAmount = 0;
      const step = 2;
      
      const scroll = () => {
        scrollAmount += step;
        if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
          scrollAmount = 0;
        }
        slider.scrollLeft = scrollAmount;
      };
      
      return setInterval(scroll, 30);
    };

    const approvalInterval = autoScroll(approvalSliderRef);
    const hiringInterval = autoScroll(hiringSliderRef);

    return () => {
      clearInterval(approvalInterval);
      clearInterval(hiringInterval);
    };
  }, [university]);

  // Intersection Observer
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    }, options);

    Object.values(sectionRefs.current).forEach(section => {
      if (section) {
        observerRef.current.observe(section);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [university]);

  // Draw Gauge Function
  const drawGauge = (rating) => {
    const canvas = gaugeCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background arc
    ctx.beginPath();
    ctx.arc(centerX, centerY - 20, radius, Math.PI, 2 * Math.PI);
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#e8e8e8';
    ctx.lineCap = 'round';
    ctx.stroke();

    // Color segments
    const segments = [
      { start: 0, end: 0.2, color: '#ff5252' },
      { start: 0.2, end: 0.4, color: '#ffb300' },
      { start: 0.4, end: 0.6, color: '#fdd835' },
      { start: 0.6, end: 0.8, color: '#9ccc65' },
      { start: 0.8, end: 1, color: '#66bb6a' }
    ];

    segments.forEach(seg => {
      ctx.beginPath();
      const startAngle = Math.PI + (seg.start * Math.PI);
      const endAngle = Math.PI + (seg.end * Math.PI);
      ctx.arc(centerX, centerY - 20, radius, startAngle, endAngle);
      ctx.strokeStyle = seg.color;
      ctx.lineWidth = 20;
      ctx.lineCap = 'round';
      ctx.stroke();
    });

    // Draw needle
    const needleAngle = Math.PI + (rating / 5 * Math.PI);
    const needleLength = radius - 25;

    ctx.save();
    ctx.translate(centerX, centerY - 20);
    ctx.rotate(needleAngle);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -needleLength);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();

    ctx.restore();
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="text-warning" fill="currentColor" size={20} />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="text-warning" fill="currentColor" size={20} style={{ clipPath: 'inset(0 50% 0 0)' }} />);
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-muted" size={20} />);
    }
    
    return stars;
  };

  // Get active star classes for fieldset
  const getStarClasses = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    
    return {
      fullStars,
      hasHalf
    };
  };

  const handleRedirect = (university) => {
    localStorage.setItem('selectedUniversity', JSON.stringify({ 
      universityName: university.universityName, 
      collegeUrl: university.collegeUrl 
    }));
    router.push('/university-page');
  };

  const handleRedirect2 = (university) => {
    localStorage.setItem('expertadvice', JSON.stringify({ 
      universityName: university.universityName, 
      collegeUrl: university.collegeUrl 
    }));
    router.push('/expert-advice');
  };

  const handleApprovalClick = (approval) => {
    if (approval.link) {
      window.open(approval.link, '_blank');
    }
  };

  const handleCompanyClick = (company) => {
    if (company.link) {
      window.open(company.link, '_blank');
    }
  };

  const sections = [
    { id: 'About', name: 'About', image: 'About' },
    { id: 'Approvals', name: 'Approvals', image: 'Approvals' },
    { id: 'Ranking', name: 'Ranking', image: 'Ranking' },
    { id: 'Courses', name: 'Courses', image: 'Courses' },
    { id: 'SampleCertificate', name: 'Sample Certificate', image: 'Examination Pattern' },
    { id: 'ExaminationPattern', name: 'Examination Pattern', image: 'Examination Pattern' },
    { id: 'Campuses', name: 'Campuses', image: 'Similar Universities' },
    { id: 'advantage', name: 'Advantages', image: 'Examination Pattern' },
    { id: 'FinancialAid', name: 'Financial Aid', image: 'Hiring partners' },
    { id: 'PlacementPartners', name: 'Hiring Partners', image: 'Hiring partners' },
    { id: 'AdmissionOpen', name: 'Admission Open 2025', image: 'Admission Open 2025' },
    { id: 'FAQ', name: 'FAQ', image: 'FAQ' },
    { id: 'TestimonialsReviews', name: 'Reviews', image: 'Reviews' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-4" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="fs-5 fw-semibold">Loading university data...</div>
        </div>
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="min-h-screen bg-white d-flex align-items-center justify-content-center">
        <div className="text-center text-danger fw-semibold fs-5">{error || "No university data found"}</div>
      </div>
    );
  }

  const { fullStars, hasHalf } = getStarClasses(university.universityRating || 4.0);

  return (
    <div>
      {/* Hero Section */}
      <section className="common_banner university-banner">
        <div className="container">
          <div className="programs_banner_content d-flex">
            <div className="programs_details">
              <div className="programs_details_contant">
                <h1>{university.universityName}</h1>
                
                {university.startingKeyPoints?.filter(p => p && p !== "na").length > 0 && (
                  <div className="certificate_listing uni-shor-des">
                    <ul>
                      {university.startingKeyPoints.filter(p => p && p !== "na").map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="d-md-flex logobrand-card align-items-center">
                  <div className="info_logo">
                    <ul className="d-flex align-items-center">
                      {university.selectedApprovals?.slice(0, 4).map((approval, index) => (
                        <li key={index}>
                          <figure className="d-flex">
                            <img src={approval.image} alt={approval.title} className="images-section" width="57" height="57" />
                          </figure>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
           
<UniversityRatingGauge rating={university.universityRating || 4.0} />
                
                
                <div className="btn-group gap-2">
                  <button className="btn btn-primary d-flex align-items-center" style={{ backgroundColor: "#8D0DFE", border: 'none' }} onClick={() => handleRedirect(university)}>
                    <i className="fa fa-university me-2"></i>
                    Apply Now
                  </button>
                  <button className="btn btn-primary d-flex align-items-center" style={{ backgroundColor: "#8D0DFE", border: 'none' }} onClick={() => handleRedirect2(university)}>
                    <i className="fa fa-comment-dots me-2"></i>
                    Talk To Expert
                  </button>
                </div>
              </div>
            </div>
            
            <div className="programs_crousel">
              <div className="slider responsive">
                <div className="programs_crousel_item">
                  <div className="program_img_box">
                    <figure>
                      <img src={university.universityHomeImage || "https://via.placeholder.com/585x405"} alt="University Campus" />
                    </figure>
                    <div className="small_logo">
                      <figure className="university_logo_explore_program">
                        <img src={university.logo || "https://via.placeholder.com/64"} alt="University Logo" />
                      </figure>
                    </div>
                    {university.nirfRanking && (
                      <div className="nirf-content">
                        <h2>
                          <div className="nirf-box">
                            <img src="/images/info-logo6.png" alt="img" className="nirf-icon" />
                            <strong className="nirf-rank">#{university.nirfRanking}</strong>
                          </div>
                        </h2>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Modal */}
      {showFeeModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 rounded-3 overflow-hidden">
              <div className="modal-body p-0">
                <div className="row g-0">
                  <div className="col-md-5 d-flex justify-content-center align-items-center p-3" style={{ background: 'linear-gradient(135deg, #eb7676ff, #ffcccc)' }}>
                    <img src="/images/Find Programs Form side Image 2-100.jpeg" className="img-fluid" alt="Promo" style={{ maxHeight: '400px' }} />
                  </div>

                  <div className="col-md-7 p-4" style={{ background: 'linear-gradient(90deg, #fff5f5, #ffecec)' }}>
                    <button className="btn-close position-absolute top-0 end-0 m-3" onClick={() => setShowFeeModal(false)}></button>

                    <div className="logo-slider mb-4 overflow-hidden">
                      <div className="d-flex align-items-center">
                        <img src={university.logo} alt="University Logo" className="mx-3" style={{ height: '40px' }} />
                      </div>
                    </div>

                    <h4 className="fw-bold mb-3">Enquire Now</h4>

                    <form>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <input type="text" className="form-control rounded-pill" placeholder="Your Name" required />
                        </div>
                        <div className="col-md-6 mb-3">
                          <input type="email" className="form-control rounded-pill" placeholder="Email Address" required />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <input type="tel" className="form-control rounded-pill" maxLength="10" placeholder="Mobile Number" required />
                        </div>
                        <div className="col-md-6 mb-3">
                          <input type="text" className="form-control rounded-pill" maxLength="6" placeholder="OTP" required />
                        </div>
                      </div>

                      <div className="text-center">
                        <button type="submit" className="btn btn-danger rounded-pill px-5">Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="programs_details_section university_details_section">
        <div className="container">
          <div className="programs_tab_listing d-flex">
            {/* Left Sidebar */}
            <div className="university_program_listing">
              <div className="list-group bg-white box_shadow programs_listing">
                <ul>
                  {sections.map((section) => (
                    <li key={section.id} className={`nav-item ${activeTab === section.id ? 'active' : ''}`}>
                      <a 
                        className="list-group-item list-group-item-action d-flex align-items-center gap-2" 
                        href={`#${section.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab(section.id);
                          sectionRefs.current[section.id]?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <span className="icon-circle me-2">
                          <img src={`/images/${section.image}.svg`} alt="icon" className="icon-img" />
                        </span>
                        <span>{section.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Content */}
            <div className="university_program_detaile">
              <div className="bg-white box_shadow scrollspy-example">
                {/* About Section */}
                <section id="About" className="about_main_section mt-4" ref={el => sectionRefs.current['About'] = el}>
                  <div className="about">
                    <h2 className="heading_program_details">{university.universityName} Online</h2>
                    <p>{university.aboutCollege}</p>
                  </div>
                </section>

                {/* Approvals Section with Slider */}
                <section id="Approvals" className="university_approved_main_section" ref={el => sectionRefs.current['Approvals'] = el}>
                  {university.selectedApprovals?.length > 0 && (
                    <>
                      <div className="university_approved">
                        <h2 className="heading_program_details mb-3">{university.universityName} Approvals</h2>
                        <p>{university.universityName} is one of the leading universities in India, offering high-quality online education.</p>
                      </div>
                      
                      <div 
                        ref={approvalSliderRef}
                        className="d-flex gap-3 overflow-auto pb-3"
                        style={{ scrollBehavior: 'smooth', scrollbarWidth: 'thin' }}
                      >
                        {university.selectedApprovals.map((approval, index) => (
                          <div 
                            key={index} 
                            className="card shadow-sm flex-shrink-0" 
                            style={{ width: '150px', cursor: approval.link ? 'pointer' : 'default', transition: 'transform 0.2s' }}
                            onClick={() => handleApprovalClick(approval)}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                          >
                            <div className="card-body text-center p-3 d-flex justify-content-center align-items-center">
                              <img src={approval.image} alt={approval.title} className="img-fluid mb-2" style={{ height: '80px', objectFit: 'contain' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </section>

                {/* Ranking Section */}
                <section className="mt-5" id="Ranking" ref={el => sectionRefs.current['Ranking'] = el}>
                  <h2 className="heading_program_details">{university.universityName} Ranking</h2>
                  <div className="certificate_listing">
                    {university.rankings?.map((ranking, index) => (
                      <div key={index} className="d-flex align-items-start gap-2 mb-2">
                        <Check className="text-success mt-1" size={20} />
                        <p className="mb-0">{ranking.RatingNumber}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Course Fees */}
                <div className="course_fees mt-5">
                  <h2 className="heading_program_details">Updated Course Fees for 2025</h2>
                  <div className="table-responsive">
                    <table className="table table-bordered align-middle">
                      <thead className="table-primary" style={{ backgroundColor: '#8D0DFE', color: 'white' }}>
                        <tr>
                          <th>Course</th>
                          <th>Per Semester</th>
                          <th>Total Fees</th>
                          <th>One Time Fees</th>
                        </tr>
                      </thead>
                      <tbody>
                        {university.selectedDepartments?.map((course, index) => (
                          <tr key={index}>
                            <td>{course.departmentContent}</td>
                            <td>₹{course.feeDetails?.semesterFee?.toLocaleString('en-IN') || 'N/A'}/-</td>
                            <td>₹{course.feeDetails?.totalAmount?.toLocaleString('en-IN') || 'N/A'}/-</td>
                            <td>₹{course.feeDetails?.oneTimeFee?.toLocaleString('en-IN') || 'N/A'}/-</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="text-center mt-3">
                    <button className="btn btn-primary" onClick={() => setShowFeeModal(true)} style={{ backgroundColor: "#8D0DFE", border: 'none' }}>
                      Click here to view fee details
                    </button>
                  </div>
                </div>

                {/* Courses Section */}
                <section className="mt-5" id="Courses" ref={el => sectionRefs.current['Courses'] = el}>
                  {university.selectedCourses?.length > 0 && (
                    <>
                      <h2 className="heading_program_details">Courses</h2>
                      <div className="row g-3">
                        {university.selectedCourses.map((course, index) => (
                          <div key={index} className="col-md-4">
                            <div className="card h-100 shadow-sm">
                              <img src={university.universityHomeImage || "https://via.placeholder.com/300x200"} className="card-img-top" alt={course.courseName} />
                              <div className="card-body">
                                <div className="small_logo_box mb-2">
                                  <img src={university.logo || "https://via.placeholder.com/64"} alt="Logo" style={{ height: '40px' }} />
                                </div>
                                <h5 className="card-title">{course.courseName}</h5>
                                <p className="card-text small text-muted">Book Your seat now</p>
                              </div>
                              <div className="card-footer bg-transparent">
                                <button className="btn btn-outline-primary btn-sm w-100">Read More</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </section>

                {/* Sample Certificate */}
                <section id="SampleCertificate" className="mt-5" ref={el => sectionRefs.current['SampleCertificate'] = el}>
                  {university.sampleCertificate && (
                    <>
                      <h2 className="heading_program_details">Sample Certificate</h2>
                      <img src={university.sampleCertificate} alt="Sample Certificate" className="img-fluid rounded shadow" />
                    </>
                  )}
                </section>

                {/* Examination Pattern */}
                <section id="ExaminationPattern" className="mt-5" ref={el => sectionRefs.current['ExaminationPattern'] = el}>
                  {university.examinationPatterns?.filter(p => p.pattern && p.pattern !== "na").length > 0 && (
                    <>
                      <h2 className="heading_program_details">Examination Pattern</h2>
                      {university.examinationPatterns.filter(p => p.pattern && p.pattern !== "na").map((pattern, index) => (
                        <p key={index} className="mb-3">{pattern.pattern}</p>
                      ))}
                    </>
                  )}
                </section>

                {/* Campuses */}
                <section id="Campuses" className="mt-5" ref={el => sectionRefs.current['Campuses'] = el}>
                  {university.collegeType && (
                    <>
                      <h2 className="heading_program_details">{university.universityName} Campuses</h2>
                      <p className="badge fs-6" style={{backgroundColor: "#8D0DFE"}}>{university.collegeType === "local" ? "All Over India" : "Study Abroad"}</p>
                    </>
                  )}
                </section>

                {/* Advantages */}
                <section id="advantage" className="mt-5" ref={el => sectionRefs.current['advantage'] = el}>
                  {university.advantages?.length > 0 && (
                    <>
                      <h2 className="heading_program_details">{university.universityName} Advantages</h2>
                      {university.advantages.map((adv, index) => (
                        <div key={index} className="d-flex align-items-start gap-2 mb-3">
                          <CheckCircle className="text-success mt-1" size={20} />
                          <p className="mb-0">{adv.description}</p>
                        </div>
                      ))}
                    </>
                  )}
                </section>

                {/* Financial Aid */}
                <section id="FinancialAid" className="mt-5" ref={el => sectionRefs.current['FinancialAid'] = el}>
                  {university.financialAidContent && (
                    <>
                      <h2 className="heading_program_details">Financial Aid</h2>
                      <div dangerouslySetInnerHTML={{ __html: university.financialAidContent }} />
                    </>
                  )}
                </section>

                {/* Hiring Partners with Slider */}
                <section id="PlacementPartners" className="mt-5" ref={el => sectionRefs.current['PlacementPartners'] = el}>
                  {university.selectedCompanies?.length > 0 && (
                    <>
                      <h2 className="heading_program_details">Hiring Partners</h2>
                      <div 
                        ref={hiringSliderRef}
                        className="d-flex gap-3 overflow-auto pb-3"
                        style={{ scrollBehavior: 'smooth', scrollbarWidth: 'thin' }}
                      >
                        {university.selectedCompanies.map((company, index) => (
                          <div 
                            key={index} 
                            className="card shadow-sm flex-shrink-0" 
                            style={{ width: '150px', cursor: company.link ? 'pointer' : 'default', transition: 'transform 0.2s' }}
                            onClick={() => handleCompanyClick(company)}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                          >
                            <div className="card-body text-center p-3 d-flex justify-content-center align-items-center">
                              <img src={company.image} alt={company.title} className="img-fluid mb-2" style={{ height: '80px', objectFit: 'contain' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </section>

                {/* Admission Open */}
                <section id="AdmissionOpen" className="mt-5" ref={el => sectionRefs.current['AdmissionOpen'] = el}>
                  {university.admissionProcess && (
                    <>
                      <h2 className="heading_program_details">Admission Open 2025</h2>
                      <p>{university.admissionProcess}</p>
                    </>
                  )}
                </section>

                {/* FAQ */}
                <section id="FAQ" className="mt-5" ref={el => sectionRefs.current['FAQ'] = el}>
                  {university.faqs?.filter(f => f.question && f.question !== "na").length > 0 && (
                    <>
                      <h2 className="heading_program_details">Frequently Asked Questions</h2>
                      <div className="accordion" id="faqAccordion">
                        {university.faqs.filter(f => f.question && f.question !== "na").map((faq, index) => (
                          <div key={index} className="accordion-item mb-2 border rounded">
                            <h2 className="accordion-header">
                              <button 
                                className={`accordion-button ${expandedFAQ !== index ? 'collapsed' : ''}`}
                                type="button"
                                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                              >
                                {faq.question}
                              </button>
                            </h2>
                            <div className={`accordion-collapse collapse ${expandedFAQ === index ? 'show' : ''}`}>
                              <div className="accordion-body">
                                {faq.answer}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </section>

                {/* Reviews Section */}
                <section id="TestimonialsReviews" className="mt-5" ref={el => sectionRefs.current['TestimonialsReviews'] = el}>
                  {university.reviews?.length > 0 && (
                    <>
                      <h2 className="heading_program_details">Student Reviews</h2>
                      <div className="row g-3">
                        {university.reviews.map((review, index) => (
                          <div key={index} className="col-md-6">
                            <div className="card shadow-sm h-100" style={{ borderLeft: '4px solid #8D0DFE' }}>
                              <div className="card-body">
                                <div className="d-flex align-items-center mb-3">
                                  <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '60px', height: '60px' }}>
                                    <i className="fa fa-user fa-2x text-muted"></i>
                                  </div>
                                  <div className="flex-grow-1">
                                    <h5 className="mb-1 fw-bold">{review.name || 'Anonymous'}</h5>
                                    <div className="d-flex align-items-center gap-1">
                                      {renderStars(review.Rating || 5)}
                                      <span className="badge bg-success ms-2">{review.Rating || 5}/5</span>
                                    </div>
                                  </div>
                                  <div className="text-end">
                                    <CheckCircle className="text-success" size={24} />
                                    <small className="d-block text-muted">Verified</small>
                                  </div>
                                </div>
                                <p className="mb-0 text-muted">{review.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </section>

                {/* Apply Now CTA */}
                <section className="mt-5 mb-5">
                  <div className="card text-white" style={{ background: 'linear-gradient(135deg, #8D0DFE, #B84FFF)' }}>
                    <div className="card-body p-4">
                      <h4 className="card-title mb-3">Ready to Apply to {university.universityName}?</h4>
                      <p className="mb-4">Start your journey towards a successful career. Apply now and unlock your potential!</p>
                      <button 
                        className="btn btn-light btn-md d-inline-flex align-items-center gap-2"
                        onClick={() => handleRedirect(university)}
                        style={{ color: '#8D0DFE', fontWeight: 'bold' }}
                      >
                        Begin Application <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .gauge-container {
          position: relative;
          width: 300px;
          height: 300px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          padding: 20px;
        }

        #gaugeCanvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .gauge-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: 10;
          width: 100%;
          margin-top: 20px;
        }

        .gauge-label {
          font-size: 12px;
          color: #999;
          margin-bottom: 8px;
        }

        .gauge-score {
          font-size: 42px;
          font-weight: 700;
          color: #333;
          margin-bottom: 10px;
          line-height: 1;
        }

        .gauge-small {
          font-size: 16px;
          font-weight: 400;
          color: #999;
        }

        .gauge-container-rate {
          border: none;
          display: flex;
          flex-direction: row-reverse;
          justify-content: center;
          gap: 2px;
        }

        .gauge-container-rate input {
          display: none;
        }

        .gauge-container-rate label {
          cursor: default;
          width: 24px;
          height: 24px;
          background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23333"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>') no-repeat center;
          background-size: contain;
        }

        .gauge-container-rate label.active-star {
          background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffc107"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>') no-repeat center;
          background-size: contain;
        }

        .gauge-container-rate label.half {
          width: 12px;
          margin-right: -12px;
          background-position: left center;
          z-index: 2;
        }

        .gauge-container-rate label.half.active-star {
          background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><linearGradient id="half"><stop offset="50%" stop-color="%23ffc107"/><stop offset="50%" stop-color="%23333"/></linearGradient></defs><path fill="url(%23half)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>') no-repeat center;
          background-size: contain;
        }

        .icon-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .icon-img {
          width: 18px;
          height: 18px;
          object-fit: contain;
        }

        .list-group-item {
          border: none;
          border-left: 3px solid transparent;
          transition: all 0.3s ease;
        }

        .list-group-item:hover {
          background-color: #f8f9fa;
         
        }

        .nav-item.active .list-group-item {
          background-color: #f0e6ff
          font-weight: 600;
        }

        .overflow-auto::-webkit-scrollbar {
          height: 8px;
        }

        .overflow-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .overflow-auto::-webkit-scrollbar-thumb {
          background: #8D0DFE;
          border-radius: 10px;
        }

        .overflow-auto::-webkit-scrollbar-thumb:hover {
          background: #7a0bd9;
        }

        .card {
          transition: all 0.3s ease;
        }

        .card:hover {
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }

        .star_rating svg {
          transition: transform 0.2s ease;
        }

        .star_rating svg:hover {
          transform: scale(1.2);
        }

        .modal.show {
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .accordion-button:not(.collapsed) {
          background-color: #f0e6ff;
          color: #8D0DFE;
          font-weight: 600;
        }

        .accordion-button:focus {
          box-shadow: 0 0 0 0.25rem rgba(141, 13, 254, 0.25);
        }

        .card[style*="borderLeft"] {
          border-radius: 8px;
          overflow: hidden;
        }

        .table-bordered {
          border: 2px solid #8D0DFE;
        }

        .table-bordered th,
        .table-bordered td {
          border-color: #d4b3ff;
        }

        .table-primary {
          --bs-table-bg: #8D0DFE;
          --bs-table-color: white;
        }

        .btn {
          transition: all 0.3s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .btn:active {
          transform: translateY(0);
        }

        .badge {
          padding: 0.5em 1em;
        }

       

        @media (max-width: 768px) {
          .programs_tab_listing {
            flex-direction: column;
          }

          .university_program_listing {
            width: 100%;
            margin-bottom: 20px;
          }

          .university_program_detaile {
            width: 100%;
          }

          .overflow-auto {
            -webkit-overflow-scrolling: touch;
          }

          .gauge-container {
            width: 250px;
            height: 250px;
          }

          .gauge-score {
            font-size: 36px;
          }
        }

        html {
          scroll-behavior: smooth;
        }

        .spinner-border {
          border-width: 3px;
        }

        img {
          transition: transform 0.3s ease;
        }

        .card:hover img {
          transform: scale(1.05);
        }

        ::selection {
          background-color: #8D0DFE;
          color: white;
        }

        a:focus,
        button:focus {
      
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}