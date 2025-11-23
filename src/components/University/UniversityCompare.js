'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getUniversitydataBycollegeUrl } from '@/app/api/admin/courseapi';

const UniversityComparison = ({ collegeUrl }) => {
  const [universitiesData, setUniversitiesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [compareCriteria, setCompareCriteria] = useState('all');
  const [showAllApprovals, setShowAllApprovals] = useState(false);
  const [showAllPlacements, setShowAllPlacements] = useState(false);
  const [expandedContent, setExpandedContent] = useState({});

  useEffect(() => {
    const fetchUniversityData = async () => {
      try {
        setLoading(true);
        const data = await getUniversitydataBycollegeUrl(collegeUrl);
        setUniversitiesData(data.result.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch university data');
        console.error('Error fetching university data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversityData();
  }, [collegeUrl]);

  const toggleApprovals = () => {
    setShowAllApprovals(!showAllApprovals);
  };

  const togglePlacements = () => {
    setShowAllPlacements(!showAllPlacements);
  };

  const handleCriteriaChange = (event) => {
    setCompareCriteria(event.target.value);
  };

  const toggleExpandContent = (key) => {
    setExpandedContent(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Helper function to render expandable content
  const renderExpandableContent = (content, maxLength = 100, contentKey) => {
    if (!content) return 'N/A';
    
    const isExpanded = expandedContent[contentKey];
    
    if (content.length <= maxLength || isExpanded) {
      return (
        <div>
          <span>{content}</span>
          {content.length > maxLength && (
            <button 
              className="text-blue-500 hover:text-blue-700 ml-1 text-sm font-medium"
              onClick={() => toggleExpandContent(contentKey)}
            >
              Read Less
            </button>
          )}
        </div>
      );
    }
    
    return (
      <div>
        <span>{content.substring(0, maxLength)}...</span>
        <button 
          className="text-blue-500 hover:text-blue-700 ml-1 text-sm font-medium"
          onClick={() => toggleExpandContent(contentKey)}
        >
          Read More
        </button>
      </div>
    );
  };

  // Get all unique approvals from all universities
  const getAllUniqueApprovals = () => {
    if (!universitiesData) return [];
    const allApprovals = new Set();
    universitiesData.forEach(university => {
      if (university.selectedApprovals && university.selectedApprovals.length > 0) {
        university.selectedApprovals.forEach(approval => {
          allApprovals.add(approval.title);
        });
      }
    });
    return Array.from(allApprovals);
  };

  // Get all unique placement partners from all universities
  const getAllUniquePlacementPartners = () => {
    if (!universitiesData) return [];
    const allPartners = new Set();
    universitiesData.forEach(university => {
      if (university.selectedCompanies && university.selectedCompanies.length > 0) {
        university.selectedCompanies.forEach(company => {
          allPartners.add(company.title);
        });
      }
    });
    return Array.from(allPartners);
  };

  // Extract all courses from selectedDepartments
  const getAllCourses = (university) => {
    if (!university.selectedDepartments || !Array.isArray(university.selectedDepartments)) {
      return [];
    }

    const courses = [];
    university.selectedDepartments.forEach(department => {
      if (department.selectedCourses && Array.isArray(department.selectedCourses)) {
        department.selectedCourses.forEach(course => {
          if (course.courseName) {
            courses.push({
              name: course.courseName,
              slug: course.courseId || course._id,
              courseContent: course.courseContent,
              feeDetails: course.feeDetails
            });
          }
        });
      }
    });
    return courses;
  };

  if (loading) {
    return (
      <div className="card" style={{ border: 'none', outline: 'none', background: 'none', marginTop: '2%', marginLeft: '2%', marginRight: '2%', marginBottom: '2%' }}>
        <div className="container pb-5 mb-2">
          <div className="text-center">
            <div className="spinner-border " role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading university data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card" style={{ border: 'none', outline: 'none', background: 'none', marginTop: '2%', marginLeft: '2%', marginRight: '2%', marginBottom: '2%' }}>
        <div className="container pb-5 mb-2">
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!universitiesData || !Array.isArray(universitiesData) || universitiesData.length === 0) {
    return (
      <div className="card" style={{ border: 'none', outline: 'none', background: 'none', marginTop: '2%', marginLeft: '2%', marginRight: '2%', marginBottom: '2%' }}>
        <div className="container pb-5 mb-2">
          <div className="text-center">
            <p>No university data found for this URL.</p>
          </div>
        </div>
      </div>
    );
  }

  const uniqueApprovals = getAllUniqueApprovals();
  const uniquePlacementPartners = getAllUniquePlacementPartners();

  return (
    <div className="card" style={{ border: 'none', outline: 'none', background: 'none', marginTop: '2%', marginLeft: '2%', marginRight: '2%', marginBottom: '2%' }}>
      <div className="container pb-5 mb-2" id="comparison-container">
        <div className="comparison-table-responsive">
          <div className="comparison-table" style={{ width: '100%', margin: '20px auto', boxShadow: '9px 9px 15px 13px rgba(0,0,0,.3)', overflowX: 'auto' }}>
            
            <table className="table align-middle text-start" id="university-comparision-table" style={{ border: '2px solid #7004e5', marginBottom: '0px', width: '100%', minWidth: '800px' }}>
              <thead className="bg-primary">
                <tr className="tophead" style={{ backgroundColor: '#7004e5', color: 'white' }}>
                  <td className="align-middle" style={{ border: '2px solid #7004e5', minWidth: '200px' }}>
                    <select 
                      className="form-control custom-select" 
                      id="compare-criteria" 
                      data-filter="trigger"
                      value={compareCriteria}
                      onChange={handleCriteriaChange}
                    >
                      <option value="all">Comparison criteria *</option>
                      <option value="summary">Summary</option>
                      <option value="about">About University</option>
                      <option value="facts">University Facts</option>
                      <option value="faqs">FAQs</option>
                      <option value="advantages">Advantages</option>
                      <option value="courses">University Courses</option>
                      <option value="approvals">Approvals</option>
                      <option value="companies">Associated Companies</option>
                      <option value="ratings">Ratings</option>
                      <option value="certificates">Certificates</option>
                      <option value="placement_partners">Placement Partners</option>
                    </select>
                    <small className="form-text text-muted">* Choose criteria to filter</small>
                  </td>
                  
                  {universitiesData.map((university) => (
                    <td key={university._id} style={{ border: '2px solid #7004e5', minWidth: '250px' }}>
                      <div className="comparison-item text-center">
                        <Link className="comparison-item-thumb d-block mb-2" target="_blank" href={`/university/${university.collegeUrl}`}>
                          <Image 
                            src={university.logo} 
                            alt={`${university.universityName} logo`}
                            width={80}
                            height={60}
                            style={{ objectFit: 'contain' }}
                            className="mx-auto"
                          />
                        </Link>
                        <Link className="comparison-item-title d-block mb-2 fw-bold text-decoration-none" style={{color: "#7004e5"}} target="_blank" href={`/university/${university.collegeUrl}`}>
                          {university.universityName}
                        </Link>
                        <Link className="btn btn-pill btn-outline-primary btn-sm" target="_blank" href={`/university/${university.collegeUrl}`} type="button">
                          Visit University
                        </Link>
                      </div>
                    </td>
                  ))}
                  
                  {/* Third university placeholder if only 2 universities */}
                  {universitiesData.length === 2 && null}
                </tr>
              </thead>

              {/* About University Section */}
              {(compareCriteria === 'all' || compareCriteria === 'about') && (
                <tbody id="about" data-filter="target">
                  <tr style={{ border: '1px solid #7004e5' }}>
                    <th className="text-center" colSpan={universitiesData.length + 1} style={{ borderRight: '1px solid #7004e5', backgroundColor: '#7004e5', color: 'white' }}>
                      About University
                    </th>
                  </tr>
                  
                  <tr className="bg-primary" style={{ border: '1px solid #7004e5', backgroundColor: '#f8f9fa' }}>
                    <th className="text-uppercase" style={{  borderColor: 'black #7004e5 black black', minWidth: '200px' }}>
                      Description
                    </th>
                    {universitiesData.map((university) => (
                      <td key={university._id} style={{ textAlign: 'center', border: '1px solid #7004e5' }} className="px-3 text-start align-middle">
                        <div className="bg-light p-3 rounded-lg border" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                          {university.aboutCollege ? (
                            <div className="text-sm text-gray-700 leading-relaxed">
                              {renderExpandableContent(university.aboutCollege, 150, `about-${university._id}`)}
                            </div>
                          ) : (
                            <span className="text-muted text-sm">No description available</span>
                          )}
                        </div>
                      </td>
                    ))}
                    {universitiesData.length === 2 && <td style={{ border: '1px solid #7004e5' }}></td>}
                  </tr>
                </tbody>
              )}

              {/* University Facts Section */}
              {(compareCriteria === 'all' || compareCriteria === 'facts') && (
                <tbody id="facts" data-filter="target">
                  <tr style={{ border: '1px solid #7004e5' }}>
                    <th className="text-center" colSpan={universitiesData.length + 1} style={{ borderRight: '1px solid #7004e5', backgroundColor: '#7004e5', color: 'white' }}>
                      University Facts
                    </th>
                  </tr>
                  
                  {(() => {
                    const maxFacts = Math.max(...universitiesData.map(u => u.universityFacts?.length || 0));
                    if (maxFacts === 0) {
                      return (
                        <tr style={{ border: '1px solid #7004e5' }}>
                          <th style={{  borderColor: 'black #7004e5 black black' }}>
                            University Facts
                          </th>
                          {universitiesData.map((university) => (
                            <td key={university._id} style={{ border: '1px solid #7004e5' }} className="px-3 text-start align-middle">
                              <span className="text-muted">No facts available</span>
                            </td>
                          ))}
                          {universitiesData.length === 2 && <td style={{ border: '1px solid #7004e5' }}></td>}
                        </tr>
                      );
                    }

                    return Array.from({ length: maxFacts }).map((_, index) => (
                      <tr key={index} style={{ border: '1px solid #7004e5' }}>
                        <th style={{  borderColor: 'black #7004e5 black black' }}>
                          Fact {index + 1}
                        </th>
                        {universitiesData.map((university) => (
                          <td key={university._id} style={{ border: '1px solid #7004e5' }} className="px-3 text-start align-middle">
                            <div className="bg-success bg-opacity-10 p-2 rounded-lg text-xs mb-2 border border-success border-opacity-25">
                              {university.universityFacts?.[index]?.fact || 'N/A'}
                            </div>
                          </td>
                        ))}
                        {universitiesData.length === 2 && <td style={{ border: '1px solid #7004e5' }}></td>}
                      </tr>
                    ));
                  })()}
                </tbody>
              )}

              {/* FAQs Section */}
              {(compareCriteria === 'all' || compareCriteria === 'faqs') && (
                <tbody id="faqs" data-filter="target">
                  <tr style={{ border: '1px solid #7004e5' }}>
                    <th className="text-center" colSpan={universitiesData.length + 1} style={{ borderRight: '1px solid #7004e5', backgroundColor: '#7004e5', color: 'white' }}>
                      Frequently Asked Questions
                    </th>
                  </tr>
                  
                  {(() => {
                    const maxFaqs = Math.max(...universitiesData.map(u => u.faqs?.length || 0));
                    if (maxFaqs === 0) {
                      return (
                        <tr style={{ border: '1px solid #7004e5' }}>
                          <th style={{  borderColor: 'black #7004e5 black black' }}>
                            FAQs
                          </th>
                          {universitiesData.map((university) => (
                            <td key={university._id} style={{ border: '1px solid #7004e5' }} className="px-3 text-start align-middle">
                              <span className="text-muted">No FAQs available</span>
                            </td>
                          ))}
                          {universitiesData.length === 2 && <td style={{ border: '1px solid #7004e5' }}></td>}
                        </tr>
                      );
                    }

                    return Array.from({ length: maxFaqs }).map((_, index) => (
                      <tr key={index} style={{ border: '1px solid #7004e5' }}>
                        <th style={{  borderColor: 'black #7004e5 black black' }}>
                          {universitiesData[0]?.faqs?.[index]?.question || `Question ${index + 1}`}
                        </th>
                        {universitiesData.map((university) => (
                          <td key={university._id} style={{ border: '1px solid #7004e5' }} className="px-3 text-start align-middle">
                            <div className="bg-warning bg-opacity-10 p-2 rounded-lg text-xs mb-2 border border-warning border-opacity-25">
                              <div className="text-gray-700">
                                {university.faqs?.[index]?.answer || 'N/A'}
                              </div>
                            </div>
                          </td>
                        ))}
                        {universitiesData.length === 2 && <td style={{ border: '1px solid #7004e5' }}></td>}
                      </tr>
                    ));
                  })()}
                </tbody>
              )}

              {/* Advantages Section */}
              {(compareCriteria === 'all' || compareCriteria === 'advantages') && (
                <tbody id="advantages" data-filter="target">
                  <tr style={{ border: '1px solid #7004e5' }}>
                    <th className="text-center" colSpan={universitiesData.length + 1} style={{ borderRight: '1px solid #7004e5', backgroundColor: '#7004e5', color: 'white' }}>
                      Advantages
                    </th>
                  </tr>
                  
                  {(() => {
                    const maxAdvantages = Math.max(...universitiesData.map(u => u.advantages?.length || 0));
                    if (maxAdvantages === 0) {
                      return (
                        <tr style={{ border: '1px solid #7004e5' }}>
                          <th style={{  borderColor: 'black #7004e5 black black' }}>
                            Advantages
                          </th>
                          {universitiesData.map((university) => (
                            <td key={university._id} style={{ border: '1px solid #7004e5' }} className="px-3 text-start align-middle">
                              <span className="text-muted">No advantages listed</span>
                            </td>
                          ))}
                          {universitiesData.length === 2 && <td style={{ border: '1px solid #7004e5' }}></td>}
                        </tr>
                      );
                    }

                    return Array.from({ length: maxAdvantages }).map((_, index) => (
                      <tr key={index} style={{ border: '1px solid #7004e5' }}>
                        <th style={{  borderColor: 'black #7004e5 black black' }}>
                          Advantage {index + 1}
                        </th>
                        {universitiesData.map((university) => (
                          <td key={university._id} style={{ border: '1px solid #7004e5' }} className="px-3 text-start align-middle">
                            <div className="bg-info bg-opacity-10 p-2 rounded-lg text-xs mb-2 border border-info border-opacity-25">
                              <div className="fw-medium  mb-1" style={{color: "#7004e5"}}>
                                {university.advantages?.[index]?.description || 'N/A'}
                              </div>
                              {university.advantages?.[index]?.benefits?.map((benefit, bIndex) => (
                                <div key={bIndex} className="text-gray-700 text-xs">
                                  • {benefit}
                                </div>
                              ))}
                            </div>
                          </td>
                        ))}
                        {universitiesData.length === 2 && <td style={{ border: '1px solid #7004e5' }}></td>}
                      </tr>
                    ));
                  })()}
                </tbody>
              )}

              {/* Summary Section */}
              {(compareCriteria === 'all' || compareCriteria === 'summary') && (
                <tbody id="summary" data-filter="target">
                  <tr style={{ border: '1px solid #7004e5' }}>
                    <th className="text-center" colSpan={universitiesData.length + 1} style={{ borderRight: '1px solid #7004e5', backgroundColor: '#7004e5', color: 'white' }}>
                      University Summary
                    </th>
                  </tr>
                  
                  <tr className="bg-primary" style={{ border: '1px solid #7004e5', backgroundColor: '#f8f9fa' }}>
                    <th className="text-uppercase" style={{  borderColor: 'black #7004e5 black black' }}>
                      University Rating
                    </th>
                    {universitiesData.map((university) => (
                      <td key={university._id} style={{ textAlign: 'center', border: '1px solid #7004e5' }} className="px-3 text-start align-middle">
                        <span className="text-dark fw-bold">{university.universityRating || 'N/A'}/5</span>
                      </td>
                    ))}
                    {universitiesData.length === 2 && <td style={{ border: '1px solid #7004e5' }}></td>}
                  </tr>

                  <tr style={{ border: '1px solid #7004e5' }}>
                    <th style={{  borderColor: 'black #7004e5 black black' }}>
                      Location
                    </th>
                    {universitiesData.map((university) => (
                      <td key={university._id} style={{ border: '1px solid #7004e5' }} className="px-3 text-start align-middle">
                        <div className="bg-light p-2 rounded border">
                          {university.city && university.state ? (
                            <div>
                              <div className="fw-medium">{university.city}, {university.state}</div>
                              {university.country && <div className="text-muted small">{university.country}</div>}
                            </div>
                          ) : (
                            <span className="text-muted">Location not specified</span>
                          )}
                        </div>
                      </td>
                    ))}
                    {universitiesData.length === 2 && <td style={{ border: '1px solid #7004e5' }}></td>}
                  </tr>

                  <tr style={{ border: '1px solid #7004e5' }}>
                    <th style={{  borderColor: 'black #7004e5 black black' }}>
                      College Type
                    </th>
                    {universitiesData.map((university) => (
                      <td key={university._id} style={{ textAlign: 'center', border: '1px solid #7004e5' }} className="px-3 text-start align-middle">
                        <span className={`badge ${university.collegeType === 'global' ? 'bg-warning' : '#7004e5'}`}>
                          {university.collegeType || 'N/A'}
                        </span>
                      </td>
                    ))}
                    {universitiesData.length === 2 && <td style={{ border: '1px solid #7004e5' }}></td>}
                  </tr>
                </tbody>
              )}

              {/* Courses Section */}
              {(compareCriteria === 'all' || compareCriteria === 'courses') && (
                <tbody id="courses" data-filter="target">
                  <tr style={{ border: '1px solid #7004e5' }}>
                    <th className="text-center" colSpan={universitiesData.length + 1} style={{ borderRight: '1px solid #7004e5', backgroundColor: '#7004e5', color: 'white' }}>
                      University Courses
                    </th>
                  </tr>

                  <tr style={{ border: '1px solid #7004e5', backgroundColor: '#f8f9fa' }}>
                    <th className="text-uppercase" style={{  borderColor: 'black #7004e5 black black' }}>
                      All Courses
                    </th>
                    {universitiesData.map((university) => (
                      <td key={university._id} style={{ border: '1px solid #7004e5' }} className="px-3 text-start align-middle">
                        {(() => {
                          const courses = getAllCourses(university);
                          return courses.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {courses.map((course, index) => (
                                <div key={index} className="bg-light p-2 rounded border">
                                  <div className="fw-medium">{course.name}</div>
                                  {course.feeDetails?.totalAmount > 0 && (
                                    <div className="text-success small">Fees: ₹{course.feeDetails.totalAmount}</div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted">No courses available</span>
                          );
                        })()}
                      </td>
                    ))}
                    {universitiesData.length === 2 && <td style={{ border: '1px solid #7004e5' }}></td>}
                  </tr>

                  <tr style={{ border: '1px solid #7004e5', backgroundColor: '#f8f9fa' }}>
                    <th className="text-uppercase" style={{  borderColor: 'black #7004e5 black black' }}>
                      Departments
                    </th>
                    {universitiesData.map((university) => (
                      <td key={university._id} style={{ border: '1px solid #7004e5' }} className="px-3 text-start align-middle">
                        {university.selectedDepartments && university.selectedDepartments.length > 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            {university.selectedDepartments.map((dept, index) => (
                              <span key={index} className="text-dark d-block small">
                                • {dept.departmentName}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-muted">No departments listed</span>
                        )}
                      </td>
                    ))}
                    {universitiesData.length === 2 && <td style={{ border: '1px solid #7004e5' }}></td>}
                  </tr>
                </tbody>
              )}

              {/* Associated Companies Section */}
              {(compareCriteria === 'all' || compareCriteria === 'companies') && (
                <tbody id="companies" data-filter="target">
                  <tr style={{ border: '1px solid #7004e5' }}>
                    <th className="text-center" colSpan={universitiesData.length + 1} style={{ borderRight: '1px solid #7004e5', backgroundColor: '#7004e5', color: 'white' }}>
                      Associated Companies
                    </th>
                  </tr>
                  
                  <tr style={{ border: '1px solid #7004e5' }}>
                    <th style={{  borderColor: 'black #7004e5 black black' }}>
                      Partner Companies
                    </th>
                    {universitiesData.map((university) => (
                      <td key={university._id} style={{ border: '1px solid #7004e5' }} className="px-3 text-start align-middle">
                        <div className="d-flex flex-wrap gap-2 justify-content-center">
                          {university.selectedCompanies && university.selectedCompanies.length > 0 ? (
                            university.selectedCompanies.slice(0, 4).map((company) => (
                              <div key={company._id} className="bg-primary bg-opacity-10 p-2 rounded-lg border border-primary border-opacity-25 text-center" style={{ minWidth: '80px', backgroundColor: "#7004e5" }}>
                                <Image 
                                  src={company.image} 
                                  alt={company.title}
                                  width={40}
                                  height={40}
                                  className="object-contain mx-auto mb-1"
                                  style={{ objectFit: 'contain' }}
                                />
                                <div className="text-xs fw-medium  line-clamp-2" style={{color: "#7004e5"}}>{company.title}</div>
                              </div>
                            ))
                          ) : (
                            <span className="text-muted text-sm">No companies listed</span>
                          )}
                          {university.selectedCompanies && university.selectedCompanies.length > 4 && (
                            <div className="w-100 text-center mt-1">
                              <small className="text-muted">+{university.selectedCompanies.length - 4} more</small>
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                    {universitiesData.length === 2 && <td style={{ border: '1px solid #7004e5' }}></td>}
                  </tr>
                </tbody>
              )}

              {/* Ratings Section */}
              {(compareCriteria === 'all' || compareCriteria === 'ratings') && (
                <tbody id="ratings" data-filter="target">
                  <tr style={{ border: '1px solid #7004e5' }}>
                    <th className="text-center" colSpan={universitiesData.length + 1} style={{ borderRight: '1px solid #7004e5', backgroundColor: '#7004e5', color: 'white' }}>
                      Detailed Ratings
                    </th>
                  </tr>
                  
                  <tr style={{ border: '1px solid #7004e5' }}>
                    <th style={{  borderColor: 'black #7004e5 black black' }}>
                      Overall Rating
                    </th>
                    {universitiesData.map((university) => (
                      <td key={university._id} style={{ border: '1px solid #7004e5' }} className="px-3 text-start align-middle">
                        <div className="bg-primary bg-opacity-10 p-2 rounded-lg border border-primary border-opacity-25">
                          <div className="text-xs text-muted mb-1">Overall Rating</div>
                          <div className="text-sm fw-semibold " style={{color: "#7004e5"}}>{university.universityRating || 'N/A'}/5</div>
                        </div>
                      </td>
                    ))}
                    {universitiesData.length === 2 && <td style={{ border: '1px solid #7004e5' }}></td>}
                  </tr>

                  <tr style={{ border: '1px solid #7004e5' }}>
                    <th style={{  borderColor: 'black #7004e5 black black' }}>
                      Digital Infrastructure
                    </th>
                    {universitiesData.map((university) => (
                      <td key={university._id} style={{ border: '1px solid #7004e5' }} className="px-3 text-start align-middle">
                        <div className="bg-primary bg-opacity-10 p-2 rounded-lg border border-primary border-opacity-25">
                          <div className="text-sm fw-semibold " style={{color: "#7004e5"}}>{university.digitalInfrastructure || 'N/A'}/5</div>
                        </div>
                      </td>
                    ))}
                    {universitiesData.length === 2 && <td style={{ border: '1px solid #7004e5' }}></td>}
                  </tr>

                  <tr style={{ border: '1px solid #7004e5' }}>
                    <th style={{  borderColor: 'black #7004e5 black black' }}>
                      Value for Money
                    </th>
                    {universitiesData.map((university) => (
                      <td key={university._id} style={{ border: '1px solid #7004e5' }} className="px-3 text-start align-middle">
                        <div className="bg-primary bg-opacity-10 p-2 rounded-lg border border-primary border-opacity-25">
                          <div className="text-sm fw-semibold " style={{color: "#7004e5"}}>{university.valueForMoney || 'N/A'}/5</div>
                        </div>
                      </td>
                    ))}
                    {universitiesData.length === 2 && <td style={{ border: '1px solid #7004e5' }}></td>}
                  </tr>

                  <tr style={{ border: '1px solid #7004e5' }}>
                    <th style={{  borderColor: 'black #7004e5 black black' }}>
                      Curriculum
                    </th>
                    {universitiesData.map((university) => (
                      <td key={university._id} style={{ border: '1px solid #7004e5' }} className="px-3 text-start align-middle">
                        <div className="bg-primary bg-opacity-10 p-2 rounded-lg border border-primary border-opacity-25">
                          <div className="text-sm fw-semibold " style={{color: "#7004e5"}}>{university.curriculum || 'N/A'}/5</div>
                        </div>
                      </td>
                    ))}
                    {universitiesData.length === 2 && <td style={{ border: '1px solid #7004e5' }}></td>}
                  </tr>
                </tbody>
              )}

              {/* Approvals Section */}
              {(compareCriteria === 'all' || compareCriteria === 'approvals') && (
                <tbody id="approvals" data-filter="target">
                  <tr style={{ border: '1px solid #7004e5', backgroundColor: '#7004e5', color: 'white' }}>
                    <th 
                      className="text-center toggle-approvals" 
                      style={{ cursor: 'pointer',  borderColor: 'black #7004e5 black black' }} 
                      colSpan={universitiesData.length + 1}
                      onClick={toggleApprovals}
                    >
                      <u>University Approvals {showAllApprovals ? '▲' : '▼'}</u>
                    </th>
                  </tr>

                  {uniqueApprovals.slice(0, showAllApprovals ? undefined : 3).map((approval, index) => (
                    <tr key={index} style={{ border: '1px solid #7004e5' }}>
                      <th style={{  borderColor: 'black #7004e5 black black' }}>
                        {approval}
                      </th>
                      {universitiesData.map((university) => (
                        <td key={university._id} className="px-3 text-start align-middle" style={{ border: '1px solid #7004e5' }}>
                          <span style={{ color: university.selectedApprovals?.some(a => a.title === approval) ? 'green' : 'red' }}>
                            {university.selectedApprovals?.some(a => a.title === approval) ? '✔️' : '❌'}
                          </span>
                        </td>
                      ))}
                      {universitiesData.length === 2 && <td style={{ border: '1px solid #7004e5' }}></td>}
                    </tr>
                  ))}

                  {uniqueApprovals.length === 0 && (
                    <tr style={{ border: '1px solid #7004e5' }}>
                      <th style={{  borderColor: 'black #7004e5 black black' }}>
                        UGC Approved
                      </th>
                      {universitiesData.map((university) => (
                        <td key={university._id} className="px-3 text-start align-middle" style={{ border: '1px solid #7004e5' }}>
                          <span style={{ color: 'green' }}>✔️</span>
                        </td>
                      ))}
                      {universitiesData.length === 2 && <td style={{ border: '1px solid #7004e5' }}></td>}
                    </tr>
                  )}
                </tbody>
              )}

              {/* Certificates Section */}
              {(compareCriteria === 'all' || compareCriteria === 'certificates') && (
                <tbody id="certificates" data-filter="target">
                  <tr style={{ border: '1px solid #7004e5' }}>
                    <th className="text-center" style={{  borderColor: 'black #7004e5 black black', backgroundColor: '#7004e5', color: 'white' }} colSpan={universitiesData.length + 1}>
                      University Certificate
                    </th>
                  </tr>
                  <tr style={{ border: '1px solid #7004e5' }}>
                    <th className="align-middle" style={{  borderColor: 'black #7004e5 black black' }}>
                      Sample Certificate
                    </th>
                    {universitiesData.map((university) => (
                      <td key={university._id} style={{ border: '1px solid #7004e5', textAlign: 'center' }} className="px-3 text-start align-middle">
                        <figure className="text-center">
                          <Link href={university.sampleCertificate || '#'} className="image-popup-no-margins d-inline-block">
                            <Image 
                              src={university.sampleCertificate || '/default-certificate.jpg'} 
                              alt="university-certificate"
                              width={150}
                              height={200}
                              style={{ objectFit: 'contain' }}
                              className="border rounded"
                            />
                          </Link>
                          <figcaption className="mt-2 small text-muted">
                            {university.sampleCertificateDescription || 'Sample Certificate'}
                          </figcaption>
                        </figure>
                      </td>
                    ))}
                    {universitiesData.length === 2 && <td style={{ border: '1px solid #7004e5' }}></td>}
                  </tr>
                </tbody>
              )}

              {/* Placement Partners Section */}
              {(compareCriteria === 'all' || compareCriteria === 'placement_partners') && (
                <tbody id="placement_partners" data-filter="target">
                  <tr style={{ border: '1px solid #7004e5', backgroundColor: '#7004e5', color: 'white' }}>
                    <th 
                      className="text-center toggle-placement" 
                      style={{  borderColor: 'black #7004e5 black black', cursor: 'pointer' }} 
                      colSpan={universitiesData.length + 1}
                      onClick={togglePlacements}
                    >
                      <u>University Placement Partners {showAllPlacements ? '▲' : '▼'}</u>
                    </th>
                  </tr>

                  {uniquePlacementPartners.slice(0, showAllPlacements ? undefined : 3).map((partner, index) => (
                    <tr key={index} style={{ border: '1px solid #7004e5' }}>
                      <th style={{  borderColor: 'black #7004e5 black black' }}>
                        {partner}
                      </th>
                      {universitiesData.map((university) => (
                        <td key={university._id} className="px-3 text-start align-middle" style={{ border: '1px solid #7004e5' }}>
                          <span style={{ color: university.selectedCompanies?.some(p => p.title === partner) ? 'green' : 'red' }}>
                            {university.selectedCompanies?.some(p => p.title === partner) ? '✔️' : '❌'}
                          </span>
                        </td>
                      ))}
                      {universitiesData.length === 2 && <td style={{ border: '1px solid #7004e5' }}></td>}
                    </tr>
                  ))}

                  {uniquePlacementPartners.length === 0 && (
                    <>
                      <tr style={{ border: '1px solid #7004e5' }}>
                        <th style={{  borderColor: 'black #7004e5 black black' }}>
                          Top Companies
                        </th>
                        {universitiesData.map((university) => (
                          <td key={university._id} className="px-3 text-start align-middle" style={{ border: '1px solid #7004e5' }}>
                            <span style={{ color: university.selectedCompanies && university.selectedCompanies.length > 0 ? 'green' : 'orange' }}>
                              {university.selectedCompanies && university.selectedCompanies.length > 0 ? '✔️' : '⚠️'}
                            </span>
                          </td>
                        ))}
                        {universitiesData.length === 2 && <td style={{ border: '1px solid #7004e5' }}></td>}
                      </tr>
                    </>
                  )}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityComparison;