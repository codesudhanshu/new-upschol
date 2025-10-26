"use client";
import { useEffect, useState, useRef } from "react";
import { getUniversityByUrl } from "@/app/api/admin/apiService";
import { Star, CheckCircle, Download, ChevronRight, ChevronDown, X } from 'lucide-react';
import Link from "next/link";
import '../../public/css/style.css';
import '../../public/css/responsive.css';
import '../../public/css/developer.css';

export default function UniversityClient({ collegeUrl }) {
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("About");
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [showFeeModal, setShowFeeModal] = useState(false);
  const sectionRefs = useRef({});
  const observerRef = useRef(null);

  useEffect(() => {
    if (!collegeUrl) return;

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

  // Intersection Observer for active tab highlighting
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

    // Observe all sections
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

  const renderStars = (rating) => {
    const stars = [];
    const ratings = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5];
    
    ratings.forEach((value, index) => {
      const id = `rating${10 - index}`;
      const isHalf = value % 1 !== 0;
      const isActive = value <= rating;
      
      stars.push(
        <input 
          key={`input-${id}`}
          type="radio" 
          id={id} 
          name="rating" 
          value={value} 
          disabled 
        />
      );
      
      stars.push(
        <label 
          key={`label-${id}`}
          htmlFor={id}
          title={`${value} ${value === 1 ? 'star' : 'stars'}`}
          className={`${isHalf ? 'half' : ''} ${isActive ? 'active-star' : ''}`}
        ></label>
      );
    });
    
    return stars;
  };

  const renderPeripheralStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <img 
          key={`full-${i}`}
          src="/images/star-on.png" 
          alt="Filled Star" 
          style={{ marginTop: '6px', marginBottom: '6px', width: '15px' }} 
        />
      );
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(
        <img 
          key="half"
          src="/images/star-on.png"
          alt="Half Star" 
          style={{ marginTop: '6px', marginBottom: '6px', width: '15px' }} 
        />
      );
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <img 
          key={`empty-${i}`}
          src="/images/star-off.png" 
          alt="Empty Star" 
          style={{ marginTop: '6px', marginBottom: '6px', width: '15px' }} 
        />
      );
    }
    
    return stars;
  };

  const sections = [
    { id: 'About', name: 'About' },
    { id: 'Approvals', name: 'Approvals' },
    { id: 'Ranking', name: 'Ranking' },
    { id: 'Courses', name: 'Courses' },
    { id: 'ExaminationPattern', name: 'Examination Pattern' },
    { id: 'EducationLoanEMI', name: 'Financial Aid' },
    { id: 'Campuses', name: 'Campuses' },
    { id: 'PlacementPartners', name: 'Hiring Partners' },
    { id: 'AdmissionOpen', name: 'Admission Open 2025' },
    { id: 'FAQ', name: 'FAQ' },
    { id: 'OtherUniversities', name: 'Similar Universities' },
    { id: 'TestimonialsReviews', name: 'Reviews' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#14081E] mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-[#14081E]">Loading university data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center text-red-600 font-semibold text-xl">{error}</div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center text-gray-600 font-semibold text-xl">No university data found</div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="common_banner university-banner">
        <div className="container">
          <div className="programs_banner_content d-flex">
            <div className="programs_details">
              <div className="programs_details_contant">
                <h1>{university.universityName}</h1>
                <div className="certificate_listing uni-shor-des">
                  {university.startingKeyPoints?.filter(p => p && p !== "na").length > 0 && (
                    <ul>
                      {university.startingKeyPoints.filter(p => p && p !== "na").map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
                
                <div className="d-md-flex logobrand-card align-items-center">
                  <div className="info_logo">
                    <ul className="flex items-center">
                      {university.selectedApprovals?.slice(0, 4).map((approval, index) => (
                        <li key={index}>
                          <figure className="flex">
                            <img src={approval.image} alt={approval.title} className="images-section" />
                          </figure>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="compare_btn_box">
                  <div className="download_prospectus compare_btn_section">
                    <a href="" className="btn">
                      <span>Download Prospectus</span>
                    </a>
                  </div>
                  
                  <div className="d-flex addto_compare_box">
                    <div className="compare_btn">
                      <a href="javascript:void(0);">
                        <img className="plus_icon" src="/images/plus_icon.svg" alt="img" />
                        <img className="plus_icon_white" src="/images/plus_icon_white.svg" alt="img" />
                        Review Rating
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Star Rating Section */}
                <div className="star_rating" id="gauge-rating" data-rating={university.universityRating || 4}>
                  <div className="gauge-container" style={{ justifySelf: 'anchor-center' }}>
                    <div className="gauge-text">
                      <div className="gauge-label">Overall Ratings :</div>
                      <div className="gauge-score">
                        <span id="scoreValue">{university.universityRating || 4}</span>
                        <span className="gauge-small"> /of 5</span>
                      </div>
                      <fieldset className="gauge-container-rate">
                        {renderStars(university.universityRating || 4)}
                      </fieldset>
                    </div>
                  </div>
                  
                  <div className="col-md-6 col-12 PeripheralRating" style={{ marginLeft: '15%' }}>
                    <div className="d-flex flex-column">
                      <div className="mb-2">
                        <span className="fw-semibold" style={{ float: 'left' }}>Peripheral Rating</span>
                        <span style={{ fontSize: '.875rem', color: '#999', float: 'left', fontWeight: 400 }}>
                          (Out of 5)
                        </span>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <div style={{ fontWeight: 400, fontSize: '13px' }}>Average Ratings</div>
                        <div className="d-flex align-items-center">
                          <span className="me-3 fw-bold">4.0</span>
                          <div className="d-flex">
                            {renderPeripheralStars(4.0)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <div style={{ fontWeight: 400, fontSize: '13px' }}>Digital Infrastructure</div>
                        <div className="d-flex align-items-center">
                          <span className="me-3 fw-bold">4.1</span>
                          <div className="d-flex">
                            {renderPeripheralStars(4.1)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <div style={{ fontWeight: 400, fontSize: '13px' }}>Curriculum</div>
                        <div className="d-flex align-items-center">
                          <span className="me-3 fw-bold">3.9</span>
                          <div className="d-flex">
                            {renderPeripheralStars(3.9)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <div style={{ fontWeight: 400, fontSize: '13px' }}>Value For Money</div>
                        <div className="d-flex align-items-center">
                          <span className="me-3 fw-bold">3.9</span>
                          <div className="d-flex">
                            {renderPeripheralStars(3.9)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="btn-group">
                  <button className="btn-primary expbtn">
                    <i className="fa fa-university btn-icon"></i> 
                    <Link href="/expert-advice" style={{color: "white"}}>Apply Now</Link>
                  </button>
                  <Link href="/expert-advice">
                    <button className="btn-secondary exprtbtn">
                      Talk To Expert <i className="fa fa-comment-dots btn-icon"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="programs_crousel">
              <div className="slider responsive">
                <div className="programs_crousel_item">
                  <div className="program_img_box">
                    <figure>
                      <img 
                        src={university.universityHomeImage || "https://via.placeholder.com/585x405"} 
                        alt="University Campus" 
                        className=""
                      />
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

      {/* Fee Details Modal */}
      {showFeeModal && (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} id="enquiryModal">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 rounded-3 overflow-hidden">
              <div className="modal-body p-0">
                <div className="row g-0">
                  {/* Left Section */}
                  <div className="col-md-5 d-flex justify-content-center align-items-center p-3" style={{ background: 'linear-gradient(135deg, #eb7676ff, #ffcccc)' }}>
                    <img src="/images/Find Programs Form side Image 2-100.jpeg" className="img-fluid" alt="Promo" style={{ maxHeight: '400px' }} />
                  </div>

                  {/* Right Section */}
                  <div className="col-md-7 p-4" style={{ background: 'linear-gradient(90deg, #fff5f5, #ffecec)' }}>
                    {/* Close Button */}
                    <button 
                      className="btn-close position-absolute top-0 end-0 m-3" 
                      onClick={() => setShowFeeModal(false)}
                      style={{ zIndex: 10 }}
                    ></button>

                    {/* Logos Slider */}
                    <div className="logo-slider mb-4 overflow-hidden">
                      <div className="d-flex align-items-center logo-track">
                    
                        <img src={university.logo} alt="University Logo" className="mx-3" style={{ height: '40px' }} />
                      </div>
                    </div>

                    <h4 className="fw-bold mb-3">Enquire Now</h4>

                    <form id="FeesForm"  method="POST">
                      <input type="hidden" id="selectedCourseId" name="course_id" value="15" />

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <input type="text" className="form-control rounded-pill" id="fullName" name="fullName" placeholder="Your Name" required />
                          <div id="error" style={{ color: 'red', fontSize: '14px' }}></div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <input type="email" className="form-control rounded-pill" id="email" name="email" placeholder="Email Address" required />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <input type="tel" id="mobileNumber" className="form-control rounded-pill mobile02" name="mobileNumber" maxLength="10" placeholder="Mobile Number" required />
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="form_col_12 otpAction">
                            <input type="text" id="txtotpmobile02" maxLength="6" className="form-control rounded-pill txtotp txtotpmobile02" placeholder="OTP" required />

                            <div className="otpActionBtn mt-2 d-flex gap-2 feefrm">
                              <input id="enquiryBtnVerifymobile02" className="btn btn-outline-danger btn-sm" type="button" value="Verify" />
                              <input id="enquiryBtnResendmobile02" className="btn btn-outline-secondary btn-sm" type="button" value="Resend" />
                              <input id="enquiryBtnVerifySuccessmobile02" className="btn btn-success btn-sm" type="button" value="Verified" style={{ display: 'none' }} />
                            </div>

                            <span className="error help-inline otp_error_div help-block">
                              <small className="help-block" data-fv-validator="notEmpty" data-fv-for="otp_veryfy" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>
                                Please enter OTP.
                              </small>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="form-group text-center">
                        <button type="submit" className="btn btn-danger rounded-pill px-5">
                          Submit
                        </button>
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
            {/* Left Sidebar Navigation */}
            <div className="university_program_listing">
              <div id="ProgramsListScroll" className="list-group bg-white box_shadow programs_listing">
                <ul>
                  {sections.map((section, index) => (
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
                          <img src={`/images/${section.name}.svg`} alt="icon" className="icon-img" />
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
                    <h2 className="heading_program_details">{university.universityName} online</h2>
                    <p>{university.aboutCollege}</p>
                    
                    {/* Course Fees Section */}
                    <div className="course_fees">
                      <h2 className="heading_program_details">Updated Course Fees for 2025</h2>
                      <div className="table-responsive tableformat">
                        <table className="table-responsive align-middle text-start" 
                               style={{ border: '2px solid #8D0DFE', width: '100%', tableLayout: 'fixed' }}>
                          <thead>
                            <tr className="tophead" style={{ backgroundColor: '#8D0DFE', color: '#ffff' }}>
                              <th className="p-3 text-start align-middle" style={{ borderRight: '1px solid #F47C80' }}>
                                Course
                              </th>
                              <th>Per Semester</th>
                              <th>Total Fees</th>
                              <th>One Time Fees</th>
                            </tr>
                          </thead>
                          <tbody>
                            {university.selectedCourses?.map((course, index) => (
                              <tr key={index} style={{ border: '1px solid #f47c80' }}>
                                <th style={{ borderRight: '1px solid #f47c80', fontWeight: 500 }}>
                                  {course.courseName}
                                </th>
                                <td>₹{course.pricing?.semesterPrice?.toLocaleString('en-IN') || 'N/A'}/-</td>
                                <td>₹{course.pricing?.totalAmount?.toLocaleString('en-IN') || 'N/A'}/-</td>
                                <td>₹{course.pricing?.totalAmount?.toLocaleString('en-IN') || 'N/A'}/-</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="text-center mt-3">
                        <button 
                          className="btn btn-primary"
                          onClick={() => setShowFeeModal(true)}
                          style={{backgroundColor:"#8D0DFE"}}
                        >
                          Click here to view fee details
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Approvals Section */}
                <section id="Approvals" className="university_approved_main_section" ref={el => sectionRefs.current['Approvals'] = el}>
                  {university.selectedApprovals?.length > 0 && (
                    <>
                      <div className="university_approved">
                        <h2 className="heading_program_details mb-2 w-100">
                          {university.universityName} Approvals
                        </h2>
                        <p>
                          {university.universityName} is one of the leading universities in India, offering high-quality online education. 
                          The following accreditations and approvals prove the educational standards of the university. 
                          These approvals make the degrees acceptable and approved all over the world.
                        </p>
                      </div>
                      
                      <div className="university_approved_crousel">
                        <div className="slider approved_crousel">
                          {university.selectedApprovals.map((approval, index) => (
                            <div key={index} className="approved_logo_box">
                              <div className="approved_logo">
                                <figure>
                                  <img src={approval.image} alt={approval.title} className="" />
                                </figure>
                                <div className="logo_details">
                                  <strong>{approval.title}</strong>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </section>

                {/* Ranking Section */}
                <section className="certificate_main_section mt-5" id="Ranking" ref={el => sectionRefs.current['Ranking'] = el}>
                  <div className="courses_box">
                    <h2 className="heading_program_details pb-0">
                      {university.universityName} Ranking
                    </h2>
                  </div>
                  <div className="certificate_listing mb-0">
                    <p>
                      {university.universityName} is a prestigious university with various rankings and memberships 
                      in top associations. These credentials demonstrate the university's commitment to academic excellence 
                      and quality education standards.
                    </p>
                  </div>
                </section>

                {/* Courses Section */}
                <section className="courses_main_section mt-5 mb-5" id="Courses" ref={el => sectionRefs.current['Courses'] = el}>
                  {university.selectedCourses?.length > 0 && (
                    <>
                      <div className="courses_box">
                        <h2 className="heading_program_details">Courses</h2>
                        
                        <div className="slider courses_crousel slider_inner_content">
                          {university.selectedCourses.map((course, index) => (
                            <div key={index} className="crousel_item">
                              <div className="course_details eq_course_details card">
                                <div className="course-img-wrapper">
                                  <img 
                                    src={university.universityHomeImage || "https://via.placeholder.com/300x200"}
                                    alt={course.courseName}
                                    width="300" 
                                    height="200"
                                  />
                                </div>

                                <div className="card-body">
                                  <div className="small_logo_box">
                                    <figure className="university_logo_explore_program">
                                      <img src={university.logo || "https://via.placeholder.com/64"} alt="University Logo" />
                                    </figure>
                                  </div>

                                  <span className="courses-h5-classes">{course.courseName}</span>
                                  <p>Book Your seat now</p>
                                </div>

                                <div className="card-footer">
                                  <button className="btn btn-outline-primary">
                                    Read More
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </section>

                {/* Examination Pattern Section */}
                <section id="ExaminationPattern" className="mt-5" ref={el => sectionRefs.current['ExaminationPattern'] = el}>
                  {university.examinationPatterns?.filter(p => p.pattern && p.pattern !== "na").length > 0 && (
                    <>
                      <h2 className="heading_program_details">Examination Pattern</h2>
                      <div className="prose max-w-none text-gray-700">
                        {university.examinationPatterns
                          .filter(p => p.pattern && p.pattern !== "na")
                          .map((pattern, index) => (
                          <p key={index} className="mb-4">{pattern.pattern}</p>
                        ))}
                      </div>
                    </>
                  )}
                </section>

                {/* Financial Aid Section */}
                <section id="EducationLoanEMI" className="mt-5" ref={el => sectionRefs.current['EducationLoanEMI'] = el}>
                  {university.financialOptions?.filter(f => f.category && f.category !== "na").length > 0 && (
                    <>
                      <h2 className="heading_program_details">Financial Aid</h2>
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead className="tophead" style={{ backgroundColor: '#8D0DFE', color: '#fff' }}>
                            <tr>
                              <th>Category</th>
                              <th>Scholarship Credit</th>
                              <th>Eligibility Documents</th>
                            </tr>
                          </thead>
                          <tbody>
                            {university.financialOptions
                              .filter(f => f.category && f.category !== "na")
                              .map((option, index) => (
                              <tr key={index}>
                                <td>{option.category}</td>
                                <td>{option.scholarshipCredit || 'N/A'}</td>
                                <td>{option.eligibilityDocuments || 'N/A'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </section>

                {/* Placement Partners Section */}
                <section id="PlacementPartners" className="mt-5" ref={el => sectionRefs.current['PlacementPartners'] = el}>
                  {university.selectedCompanies?.length > 0 && (
                    <>
                      <h2 className="heading_program_details">Hiring Partners</h2>
                      <div className="university_approved_crousel">
                        <div className="slider approved_crousel">
                          {university.selectedCompanies.map((company, index) => (
                            <div key={index} className="approved_logo_box">
                              <div className="approved_logo">
                                <figure>
                                  <img src={company.image} alt={company.title} className="" />
                                </figure>
                                <div className="logo_details">
                                  <strong>{company.title}</strong>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </section>

                {/* Admission Open Section */}
                <section id="AdmissionOpen" className="mt-5" ref={el => sectionRefs.current['AdmissionOpen'] = el}>
                  {university.admissionProcess && (
                    <>
                      <h2 className="heading_program_details">Admission Open 2025</h2>
                      <div className="prose max-w-none text-gray-700">
                        <p>{university.admissionProcess}</p>
                      </div>
                    </>
                  )}
                </section>

                {/* FAQ Section */}
                <section id="FAQ" className="mt-5" ref={el => sectionRefs.current['FAQ'] = el}>
                  {university.faqs?.filter(f => f.question && f.question !== "na").length > 0 && (
                    <>
                      <h2 className="heading_program_details">FAQ</h2>
                      <div className="space-y-4">
                        {university.faqs
                          .filter(f => f.question && f.question !== "na")
                          .map((faq, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              className="w-full px-5 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                              onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                            >
                              <span className="font-medium text-gray-900">{faq.question}</span>
                              {expandedFAQ === index ? (
                                <ChevronDown className="w-5 h-5 text-gray-500" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-500" />
                              )}
                            </button>
                            {expandedFAQ === index && (
                              <div className="px-5 py-4 bg-white">
                                <p className="text-gray-700">{faq.answer}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </section>

                {/* Similar Universities Section */}
                <section id="OtherUniversities" className="mt-5" ref={el => sectionRefs.current['OtherUniversities'] = el}>
                  <h2 className="heading_program_details">Similar Universities</h2>
                  <div className="prose max-w-none text-gray-700">
                    <p>Content for similar universities will be displayed here.</p>
                  </div>
                </section>

                {/* Reviews Section */}
                <section id="TestimonialsReviews" className="mt-5" ref={el => sectionRefs.current['TestimonialsReviews'] = el}>
                  <h2 className="heading_program_details">Reviews</h2>
                  <div className="prose max-w-none text-gray-700">
                    <p>Student reviews and testimonials will be displayed here.</p>
                  </div>
                </section>

                {/* Apply Now CTA */}
                <section className="bg-[#8D0DFE] text-white p-8 rounded-lg mt-5">
                  <h2 className="text-2xl font-bold mb-4">Ready to Apply to {university.universityName}?</h2>
                  <button className="bg-white text-[#8D0DFE] hover:bg-gray-100 px-6 py-3 rounded-lg font-medium flex items-center gap-2">
                    Begin Application <ChevronRight className="w-5 h-5" />
                  </button>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}