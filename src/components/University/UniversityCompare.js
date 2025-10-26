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

  // Helper function to render expandable content
  const renderExpandableContent = (content, maxLength = 100, contentKey) => {
    if (!content) return 'N/A';
    if (content.length <= maxLength) return content;
    
    return (
      <div>
        <span>{content.substring(0, maxLength)}...</span>
        <button 
          className="text-blue-500 hover:text-blue-700 ml-1 text-sm font-medium"
        >
          Read More
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="card" style={{ border: 'none', outline: 'none', background: 'none', marginTop: '2%', marginLeft: '2%', marginRight: '2%', marginBottom: '2%' }}>
        <div className="container pb-5 mb-2">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
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

  return (
    <div className="card" style={{ border: 'none', outline: 'none', background: 'none', marginTop: '2%', marginLeft: '2%', marginRight: '2%', marginBottom: '2%' }}>
      <div className="container pb-5 mb-2" id="comparison-container">
        <div className="comparison-table" style={{ display: 'flex', justifyContent: 'space-around', width: '100%', margin: '20px auto', boxShadow: '9px 9px 15px 13px rgba(0,0,0,.3)' }}>
          
          <input type="hidden" name="comparision_ids[]" id="comparision_ids" value="3,10,30" />
          <input type="hidden" name="universitySlugs" id="universitySlugs" value="amity-university-online-vs-manipal-online-university-vs-nmims-online" />
          
          <table className="table align-middle text-start" id="university-comparision-table" style={{ border: '2px solid rgb(244, 124, 128)', marginBottom: '0px', width: '100%', tableLayout: 'fixed' }}>
            <thead className="bg-secondary">
              <tr className="tophead" style={{ backgroundColor: 'rgb(237, 32, 36)', color: 'rgb(255, 255, 255)' }}>
                <td className="align-middle" style={{ border: '2px solid #F47C80' }}>
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
                  <td key={university._id} style={{ border: '2px solid #F47C80' }}>
                    <div className="comparison-item">
                      <a className="comparison-item-thumb" href="shop-single.html">
                        <Image 
                          src={university.logo} 
                          alt="University-image"
                          width={80}
                          height={60}
                          style={{ objectFit: 'contain' }}
                        />
                      </a>
                      <a className="comparison-item-title" target="_blank" href={`/university/${university.slug || university.collegeUrl}`}>
                        {university.universityName}
                      </a>
                      <a className="btn btn-pill btn-outline-primary btn-sm" target="_blank" href={`/university/${university.slug || university.collegeUrl}`} type="button" data-toggle="toast" data-target="#cart-toast">
                        Visit University
                      </a>
                    </div>
                  </td>
                ))}
              </tr>
            </thead>

            {/* About University Section */}
            {(compareCriteria === 'all' || compareCriteria === 'about') && (
              <tbody id="about" data-filter="target">
                <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th className="text-center bg-secondary text-black" colSpan="4" style={{ borderRight: '1px solid rgb(244, 124, 128)' }}>
                    About University
                  </th>
                </tr>
                
                <tr className="bg-secondary" style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th className="text-uppercase" style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                    Description
                  </th>
                  {universitiesData.map((university) => (
                    <td key={university._id} style={{ textAlign: 'center', border: '1px solid rgb(244, 124, 128)' }} className="px-4 text-start align-middle">
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {university.aboutCollege ? (
                          <div className="text-sm text-gray-700 leading-relaxed">
                            {renderExpandableContent(university.aboutCollege, 150, `about-${university._id}`)}
                          </div>
                        ) : (
                          <span className="text-gray-500 text-sm">No description available</span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            )}

            {/* University Facts Section */}
            {(compareCriteria === 'all' || compareCriteria === 'facts') && (
              <tbody id="facts" data-filter="target">
                <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th className="text-center bg-secondary text-black" colSpan="4" style={{ borderRight: '1px solid rgb(244, 124, 128)' }}>
                    University Facts
                  </th>
                </tr>
                
                {universitiesData[0]?.universityFacts?.map((fact, index) => (
                  <tr key={index} style={{ border: '1px solid rgb(244, 124, 128)' }}>
                    <th style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                      Fact {index + 1}
                    </th>
                    {universitiesData.map((university) => (
                      <td key={university._id} style={{ border: '1px solid rgb(244, 124, 128)' }} className="px-4 text-start align-middle">
                        <div className="bg-green-50 p-2 rounded-lg text-xs mb-2 border border-green-100">
                          {university.universityFacts?.[index]?.fact || 'N/A'}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}

                {(!universitiesData[0]?.universityFacts || universitiesData[0].universityFacts.length === 0) && (
                  <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                    <th style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                      University Facts
                    </th>
                    {universitiesData.map((university) => (
                      <td key={university._id} style={{ border: '1px solid rgb(244, 124, 128)' }} className="px-4 text-start align-middle">
                        <span className="text-muted">No facts available</span>
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            )}

            {/* FAQs Section */}
            {(compareCriteria === 'all' || compareCriteria === 'faqs') && (
              <tbody id="faqs" data-filter="target">
                <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th className="text-center bg-secondary text-black" colSpan="4" style={{ borderRight: '1px solid rgb(244, 124, 128)' }}>
                    Frequently Asked Questions
                  </th>
                </tr>
                
                {universitiesData[0]?.faqs?.map((faq, index) => (
                  <tr key={index} style={{ border: '1px solid rgb(244, 124, 128)' }}>
                    <th style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                      {faq.question}
                    </th>
                    {universitiesData.map((university) => (
                      <td key={university._id} style={{ border: '1px solid rgb(244, 124, 128)' }} className="px-4 text-start align-middle">
                        <div className="bg-yellow-50 p-2 rounded-lg text-xs mb-2 border border-yellow-100">
                          <div className="text-gray-700">
                            {university.faqs?.[index]?.answer || 'N/A'}
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}

                {(!universitiesData[0]?.faqs || universitiesData[0].faqs.length === 0) && (
                  <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                    <th style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                      FAQs
                    </th>
                    {universitiesData.map((university) => (
                      <td key={university._id} style={{ border: '1px solid rgb(244, 124, 128)' }} className="px-4 text-start align-middle">
                        <span className="text-muted">No FAQs available</span>
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            )}

            {/* Advantages Section */}
            {(compareCriteria === 'all' || compareCriteria === 'advantages') && (
              <tbody id="advantages" data-filter="target">
                <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th className="text-center bg-secondary text-black" colSpan="4" style={{ borderRight: '1px solid rgb(244, 124, 128)' }}>
                    Advantages
                  </th>
                </tr>
                
                {universitiesData[0]?.advantages?.map((advantage, index) => (
                  <tr key={index} style={{ border: '1px solid rgb(244, 124, 128)' }}>
                    <th style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                      {advantage.title || `Advantage ${index + 1}`}
                    </th>
                    {universitiesData.map((university) => (
                      <td key={university._id} style={{ border: '1px solid rgb(244, 124, 128)' }} className="px-4 text-start align-middle">
                        <div className="bg-purple-50 p-2 rounded-lg text-xs mb-2 border border-purple-100">
                          <div className="font-medium text-purple-800 mb-1">
                            {university.advantages?.[index]?.description || 'N/A'}
                          </div>
                          {university.advantages?.[index]?.benefits?.map((benefit, bIndex) => (
                            <div key={bIndex} className="text-gray-700 text-xs">
                              • {benefit.description}
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}

                {(!universitiesData[0]?.advantages || universitiesData[0].advantages.length === 0) && (
                  <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                    <th style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                      Advantages
                    </th>
                    {universitiesData.map((university) => (
                      <td key={university._id} style={{ border: '1px solid rgb(244, 124, 128)' }} className="px-4 text-start align-middle">
                        <span className="text-muted">No advantages listed</span>
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            )}

            {/* Summary Section */}
            {(compareCriteria === 'all' || compareCriteria === 'summary') && (
              <tbody id="summary" data-filter="target">
                <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th className="text-center bg-secondary text-black" colSpan="4" style={{ borderRight: '1px solid rgb(244, 124, 128)' }}>
                    University Summary
                  </th>
                </tr>
                
                <tr className="bg-secondary" style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th className="text-uppercase" style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                    NIRF Ranking
                  </th>
                  {universitiesData.map((university) => (
                    <td key={university._id} style={{ textAlign: 'center', border: '1px solid rgb(244, 124, 128)' }} className="px-4 text-start align-middle">
                      <span className="text-dark"># {university.nirfRanking || 'N/A'}</span>
                    </td>
                  ))}
                </tr>

                <tr className="equal-height-row" style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                    Location
                  </th>
                  {universitiesData.map((university) => (
                    <td key={university._id} style={{ border: '1px solid rgb(244, 124, 128)' }} className="px-4 text-start align-middle">
                      <table className="table inner-table align-middle text-start" style={{ minWidth: '10px', border: '2px solid rgb(244, 124, 128)', width: '100%', tableLayout: 'fixed' }}>
                        <thead className="bg-secondary">
                          <tr style={{ border: '1px solid rgb(244, 124, 128)' }} className="tophead">
                            <th colSpan="2" style={{ textAlign: 'center', borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }} className="px-4 text-start align-middle">
                              University Campuses
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                            <td className="px-4 text-start align-middle" style={{ border: '1px solid rgb(244, 124, 128)' }}>
                              Indian
                            </td>
                            <td className="px-4 text-start align-middle" style={{ border: '1px solid rgb(244, 124, 128)' }}>
                              International
                            </td>
                          </tr>
                          <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                            <td className="px-4 text-start align-middle" style={{ border: '1px solid rgb(244, 124, 128)' }}>
                              {university.indianCampuses || 'N/A'}
                            </td>
                            <td className="px-4 text-start align-middle" style={{ border: '1px solid rgb(244, 124, 128)' }}>
                              {university.internationalCampuses || 'N/A'}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  ))}
                </tr>

                <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                    EMI/Loan Facility
                  </th>
                  {universitiesData.map((university) => (
                    <td key={university._id} style={{ textAlign: 'center', border: '1px solid rgb(244, 124, 128)' }} className="px-4 text-start align-middle">
                      {university.emiLoanFacility ? 'Yes' : 'No'}
                    </td>
                  ))}
                </tr>
              </tbody>
            )}

            {/* Courses Section */}
            {(compareCriteria === 'all' || compareCriteria === 'courses') && (
              <tbody id="courses" data-filter="target">
                <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th className="text-center bg-secondary text-black" colSpan="4" style={{ borderRight: '1px solid rgb(244, 124, 128)' }}>
                    University Courses
                  </th>
                </tr>

                <tr className="bg-secondary" style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th className="text-uppercase" style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                    PG Courses
                  </th>
                  {universitiesData.map((university) => (
                    <td key={university._id} style={{ border: '1px solid rgb(244, 124, 128)' }} className="px-4 text-start align-middle">
                      {university.pgCourses && university.pgCourses.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                          {university.pgCourses.map((course, index) => (
                            <a key={index} href={`/university/${university.slug || university.collegeUrl}/${course.slug}`} target="_blank">
                              <span className="text-dark d-block" style={{ cursor: 'pointer' }}>
                                • <u>{course.name}</u>
                              </span>
                            </a>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted">Not Available</span>
                      )}
                    </td>
                  ))}
                </tr>

                <tr className="bg-secondary" style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th className="text-uppercase" style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                    UG Courses
                  </th>
                  {universitiesData.map((university) => (
                    <td key={university._id} style={{ border: '1px solid rgb(244, 124, 128)' }} className="px-4 text-start align-middle">
                      {university.ugCourses && university.ugCourses.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                          {university.ugCourses.map((course, index) => (
                            <a key={index} href={`/university/${university.slug || university.collegeUrl}/${course.slug}`} target="_blank">
                              <span className="text-dark d-block" style={{ cursor: 'pointer' }}>
                                • <u>{course.name}</u>
                              </span>
                            </a>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted">Not Available</span>
                      )}
                    </td>
                  ))}
                </tr>

                <tr className="bg-secondary" style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th className="text-uppercase" style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                    Executive Programs
                  </th>
                  {universitiesData.map((university) => (
                    <td key={university._id} style={{ border: '1px solid rgb(244, 124, 128)' }} className="px-4 text-start align-middle">
                      {university.executivePrograms && university.executivePrograms.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                          {university.executivePrograms.map((program, index) => (
                            <span key={index} className="text-dark d-block" style={{ cursor: 'pointer' }}>
                              • <u>{program.name}</u>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted">Not Available</span>
                      )}
                    </td>
                  ))}
                </tr>

                <tr className="bg-secondary" style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th className="text-uppercase" style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                    Certification
                  </th>
                  {universitiesData.map((university) => (
                    <td key={university._id} style={{ border: '1px solid rgb(244, 124, 128)' }} className="px-4 text-start align-middle">
                      {university.certifications && university.certifications.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                          {university.certifications.map((cert, index) => (
                            <a key={index} href={`/university/${university.slug || university.collegeUrl}/${cert.slug}`} target="_blank">
                              <span className="text-dark d-block" style={{ cursor: 'pointer' }}>
                                • <u>{cert.name}</u>
                              </span>
                            </a>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted">Not Available</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            )}

            {/* Associated Companies Section */}
            {(compareCriteria === 'all' || compareCriteria === 'companies') && (
              <tbody id="companies" data-filter="target">
                <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th className="text-center bg-secondary text-black" colSpan="4" style={{ borderRight: '1px solid rgb(244, 124, 128)' }}>
                    Associated Companies
                  </th>
                </tr>
                
                <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                    Partner Companies
                  </th>
                  {universitiesData.map((university) => (
                    <td key={university._id} style={{ border: '1px solid rgb(244, 124, 128)' }} className="px-4 text-start align-middle">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {university.selectedCompanies && university.selectedCompanies.length > 0 ? (
                          university.selectedCompanies.map((company) => (
                            <div key={company._id} className="bg-blue-50 p-2 rounded-lg border border-blue-100 text-center min-w-[80px]">
                              <Image 
                                src={company.image} 
                                alt={company.title}
                                width={32}
                                height={32}
                                className="object-contain mx-auto mb-1"
                              />
                              <div className="text-xs font-medium text-blue-800 line-clamp-2">{company.title}</div>
                            </div>
                          ))
                        ) : (
                          <span className="text-gray-500 text-sm">No companies listed</span>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            )}

            {/* Ratings Section */}
            {(compareCriteria === 'all' || compareCriteria === 'ratings') && (
              <tbody id="ratings" data-filter="target">
                <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th className="text-center bg-secondary text-black" colSpan="4" style={{ borderRight: '1px solid rgb(244, 124, 128)' }}>
                    Detailed Ratings
                  </th>
                </tr>
                
                <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                    Overall Rating
                  </th>
                  {universitiesData.map((university) => (
                    <td key={university._id} style={{ border: '1px solid rgb(244, 124, 128)' }} className="px-4 text-start align-middle">
                      <div className="bg-indigo-50 p-2 rounded-lg border border-indigo-100">
                        <div className="text-xs text-gray-600 mb-1">Overall Rating</div>
                        <div className="text-sm font-semibold text-indigo-800">{university.universityRating}/5</div>
                      </div>
                    </td>
                  ))}
                </tr>

                <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                    Digital Infrastructure
                  </th>
                  {universitiesData.map((university) => (
                    <td key={university._id} style={{ border: '1px solid rgb(244, 124, 128)' }} className="px-4 text-start align-middle">
                      <div className="bg-indigo-50 p-2 rounded-lg border border-indigo-100">
                        <div className="text-sm font-semibold text-indigo-800">{university.digitalInfrastructure}/5</div>
                      </div>
                    </td>
                  ))}
                </tr>

                <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                    Value for Money
                  </th>
                  {universitiesData.map((university) => (
                    <td key={university._id} style={{ border: '1px solid rgb(244, 124, 128)' }} className="px-4 text-start align-middle">
                      <div className="bg-indigo-50 p-2 rounded-lg border border-indigo-100">
                        <div className="text-sm font-semibold text-indigo-800">{university.valueForMoney}/5</div>
                      </div>
                    </td>
                  ))}
                </tr>

                <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                    Curriculum
                  </th>
                  {universitiesData.map((university) => (
                    <td key={university._id} style={{ border: '1px solid rgb(244, 124, 128)' }} className="px-4 text-start align-middle">
                      <div className="bg-indigo-50 p-2 rounded-lg border border-indigo-100">
                        <div className="text-sm font-semibold text-indigo-800">{university.curriculum}/5</div>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            )}

            {/* Approvals Section */}
            {(compareCriteria === 'all' || compareCriteria === 'approvals') && (
              <tbody id="approvals" data-filter="target">
                <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th 
                    className="text-center bg-secondary text-black toggle-approvals" 
                    style={{ cursor: 'pointer', borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }} 
                    colSpan="4"
                    onClick={toggleApprovals}
                  >
                    <u>University Approvals</u>
                  </th>
                </tr>

                {/* Sample approval data - you'll need to replace this with actual data from your API */}
                {universitiesData[0]?.approvals?.slice(0, showAllApprovals ? undefined : 2).map((approval, index) => (
                  <tr key={index} className={`approval-row ${index >= 2 && !showAllApprovals ? 'd-none' : ''}`} style={{ border: '1px solid rgb(244, 124, 128)' }}>
                    <th style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                      {approval.title}
                    </th>
                    {universitiesData.map((university) => (
                      <td key={university._id} className="px-4 text-start align-middle" style={{ border: '1px solid rgb(244, 124, 128)' }}>
                        <span style={{ color: university.approvals?.some(a => a.title === approval.title) ? 'green' : 'red' }}>
                          {university.approvals?.some(a => a.title === approval.title) ? '✔️' : '❌'}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Fallback if no approval data */}
                {(!universitiesData[0]?.approvals || universitiesData[0].approvals.length === 0) && (
                  <tr className="approval-row" style={{ border: '1px solid rgb(244, 124, 128)' }}>
                    <th style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                      UGC-entitled
                    </th>
                    {universitiesData.map((university) => (
                      <td key={university._id} className="px-4 text-start align-middle" style={{ border: '1px solid rgb(244, 124, 128)' }}>
                        <span style={{ color: university.ugcEntitled ? 'green' : 'red' }}>
                          {university.ugcEntitled ? '✔️' : '❌'}
                        </span>
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            )}

            {/* Certificates Section */}
            {(compareCriteria === 'all' || compareCriteria === 'certificates') && (
              <tbody id="certificates" data-filter="target">
                <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th className="text-center bg-secondary text-black" style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }} colSpan="4">
                    University Certificate
                  </th>
                </tr>
                <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th className="align-middle" style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                    Certificates
                  </th>
                  {universitiesData.map((university) => (
                    <td key={university._id} style={{ border: '1px solid rgb(244, 124, 128)', textAlign: 'center' }} className="px-4 text-start align-middle">
                      <figure>
                        <a href={university.sampleCertificate || '#'} className="image-popup-no-margins">
                          <Image 
                            src={university.sampleCertificate || '/default-certificate.jpg'} 
                            alt="university-certificate"
                            width={213}
                            height={296}
                            style={{ objectFit: 'contain' }}
                          />
                        </a>
                      </figure>
                    </td>
                  ))}
                </tr>
              </tbody>
            )}

            {/* Placement Partners Section */}
            {(compareCriteria === 'all' || compareCriteria === 'placement_partners') && (
              <tbody id="placement_partners" data-filter="target">
                <tr style={{ border: '1px solid rgb(244, 124, 128)' }}>
                  <th 
                    className="text-center bg-secondary text-black toggle-placement" 
                    style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black', cursor: 'pointer' }} 
                    colSpan="4"
                    onClick={togglePlacements}
                  >
                    <u>University Placement Partners</u>
                  </th>
                </tr>

                {/* Sample placement data - you'll need to replace this with actual data from your API */}
                {universitiesData[0]?.placementPartners?.slice(0, showAllPlacements ? undefined : 3).map((partner, index) => (
                  <tr key={index} className={`placement-row ${index >= 3 && !showAllPlacements ? 'd-none' : ''}`} style={{ border: '1px solid rgb(244, 124, 128)' }}>
                    <th style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                      {partner.name}
                    </th>
                    {universitiesData.map((university) => (
                      <td key={university._id} className="px-4 text-start align-middle" style={{ border: '1px solid rgb(244, 124, 128)' }}>
                        <span style={{ color: university.placementPartners?.some(p => p.name === partner.name) ? 'green' : 'red' }}>
                          {university.placementPartners?.some(p => p.name === partner.name) ? '✔️' : '❌'}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Fallback if no placement data */}
                {(!universitiesData[0]?.placementPartners || universitiesData[0].placementPartners.length === 0) && (
                  <>
                    <tr className="placement-row" style={{ border: '1px solid rgb(244, 124, 128)' }}>
                      <th style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                        IBM
                      </th>
                      {universitiesData.map((university) => (
                        <td key={university._id} className="px-4 text-start align-middle" style={{ border: '1px solid rgb(244, 124, 128)' }}>
                          <span style={{ color: 'green' }}>✔️</span>
                        </td>
                      ))}
                    </tr>
                    <tr className="placement-row" style={{ border: '1px solid rgb(244, 124, 128)' }}>
                      <th style={{ borderWidth: '2px 1px 2px 2px', borderStyle: 'solid', borderColor: 'black rgb(244, 124, 128) black black' }}>
                        Microsoft
                      </th>
                      {universitiesData.map((university) => (
                        <td key={university._id} className="px-4 text-start align-middle" style={{ border: '1px solid rgb(244, 124, 128)' }}>
                          <span style={{ color: 'green' }}>✔️</span>
                        </td>
                      ))}
                    </tr>
                  </>
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default UniversityComparison;