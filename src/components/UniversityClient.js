"use client";
import { useEffect, useState, useRef } from "react";
import { getUniversityByUrl } from "@/app/api/admin/apiService";
import { Star, CheckCircle, Download, ChevronRight, ChevronDown } from 'lucide-react';
import Link from "next/link";

export default function UniversityClient({ collegeUrl }) {
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("About");
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const sectionRefs = useRef({});

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

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

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

  const sections = [
    { id: 'About', name: 'About' },
    { id: 'Approvals', name: 'Approvals' },
    { id: 'Ranking', name: 'Ranking' },
    { id: 'Courses', name: 'Courses' },
    { id: 'ExaminationPattern', name: 'Examination Pattern' },
    { id: 'EducationLoanEMI', name: 'Education loan- Monthly EMI' },
    { id: 'Campuses', name: 'Similar Universities' },
    { id: 'PlacementPartners', name: 'Hiring Partners' },
    { id: 'AdmissionOpen', name: 'Admission Open 2025' },
    { id: 'FAQ', name: 'FAQ' },
    { id: 'OtherUniversities', name: 'Similar Universities' },
    { id: 'TestimonialsReviews', name: 'Reviews' }
  ];

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
                    <ul className="flex items-center gap-4">
                      {university.selectedApprovals?.slice(0, 4).map((approval, index) => (
                        <li key={index}>
                          <figure className="flex items-center justify-center">
                            <img src={approval.image} alt={approval.title} className="" />
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
                      <div className="flex">
                        {renderStars(university.universityRating || 4)}
                      </div>
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
                            {renderStars(4.0)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <div style={{ fontWeight: 400, fontSize: '13px' }}>Digital Infrastructure</div>
                        <div className="d-flex align-items-center">
                          <span className="me-3 fw-bold">4.1</span>
                          <div className="d-flex">
                            {renderStars(4.1)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <div style={{ fontWeight: 400, fontSize: '13px' }}>Curriculum</div>
                        <div className="d-flex align-items-center">
                          <span className="me-3 fw-bold">3.9</span>
                          <div className="d-flex">
                            {renderStars(3.9)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <div style={{ fontWeight: 400, fontSize: '13px' }}>Value For Money</div>
                        <div className="d-flex align-items-center">
                          <span className="me-3 fw-bold">3.9</span>
                          <div className="d-flex">
                            {renderStars(3.9)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="btn-group">
                  <button className="btn-primary expbtn">
                    <i className="fa fa-university btn-icon"></i> 
                    <Link href="/free-counselling">Apply Now</Link>
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
                        <img src={university.logo || "https://via.placeholder.com/64"} alt="image" />
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
                               style={{ border: '2px solid #F47C80', width: '100%', tableLayout: 'fixed' }}>
                          <thead>
                            <tr className="tophead" style={{ backgroundColor: '#Ed2024', color: '#ffff' }}>
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
                                    src={course.image || "https://via.placeholder.com/300x200"}
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
                          <thead className="tophead" style={{ backgroundColor: '#Ed2024', color: '#fff' }}>
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

                {/* Apply Now CTA */}
                <section className="bg-[#Ed2024] text-white p-8 rounded-lg mt-5">
                  <h2 className="text-2xl font-bold mb-4">Ready to Apply to {university.universityName}?</h2>
                  <button className="bg-white text-[#Ed2024] hover:bg-gray-100 px-6 py-3 rounded-lg font-medium flex items-center gap-2">
                    Begin Application <ChevronRight className="w-5 h-5" />
                  </button>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add Required CSS Styles */}
      <style jsx>{`
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
          object-fit: contain;
        }

        .list-group-item {
          display: flex;
          align-items: center;
          padding: 10px;
          font-size: 14px;
        }

        .nav-item.active .list-group-item {
          background-color: #Ed2024;
          color: white;
        }

        .university-banner {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 40px 0;
        }

        .programs_banner_content {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .programs_details {
          flex: 1;
        }

        .programs_crousel {
          flex: 1;
          max-width: 50%;
        }

        .program_img_box {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
        }

        .small_logo {
          position: absolute;
          top: 12px;
          left: 12px;
          background: white;
          border-radius: 50%;
          padding: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .nirf-content {
          position: absolute;
          top: 12px;
          right: 12px;
        }

        .nirf-box {
          background: white;
          padding: 8px 12px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .btn-group {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn-primary {
          background-color: #Ed2024;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-secondary {
          background-color: transparent;
          color: #Ed2024;
          border: 2px solid #Ed2024;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .star_rating {
          display: flex;
          gap: 2rem;
          margin: 2rem 0;
          align-items: flex-start;
        }

        .gauge-container {
          flex: 1;
        }

        .PeripheralRating {
          flex: 1;
        }

        .heading_program_details {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #1a1a1a;
        }

        .table-responsive table {
          width: 100%;
          border-collapse: collapse;
        }

        .table-responsive th,
        .table-responsive td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        .approved_crousel {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .approved_logo_box {
          flex: 0 0 150px;
          text-align: center;
        }

        .approved_logo img {
          width: 60px;
          height: 60px;
          object-fit: contain;
          margin-bottom: 8px;
        }

        .courses_crousel {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .crousel_item {
          flex: 0 0 300px;
        }

        .course_details {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          background: white;
        }

        .course-img-wrapper img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .card-body {
          padding: 1rem;
        }

        .card-footer {
          padding: 1rem;
          border-top: 1px solid #ddd;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .programs_tab_listing {
          display: flex;
          gap: 2rem;
        }

        .university_program_listing {
          flex: 0 0 300px;
        }

        .university_program_detaile {
          flex: 1;
        }

        .programs_listing {
          position: sticky;
          top: 20px;
        }
      `}</style>
    </div>
  );
}