"use client"
import React, { useState, useEffect } from 'react';
import { getAllCoursesData } from '@/app/api/candidate/HomePage';
import Link from 'next/link';

const Allcourses = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCoursesData();
        if (response.status && response.result) {
          setCoursesData(response.result);
          // Set first category as active by default
          if (response.result.length > 0) {
            setActiveTab(response.result[0].name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
          }
        }
      } catch (error) {
        console.error('Error fetching courses data:', error);
      }
    };
    fetchData();
  }, []);

  const handleTabClick = (categoryName) => {
    const tabId = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    setActiveTab(tabId);
  };

  const handleCourseClick = (course) => {
    console.log('Redirecting to university page for course:', course.courseName);
    window.location.href = 'https://www.collegesathi.com/university-page';
  };

  const getBadgeText = (categoryName) => {
    const badges = {
      'PG Courses': 'After Graduation',
      'UG Courses': 'After 12th',
      'Executive Programs': 'Working Professionals',
      'Certification': 'Get Certified',
      'Doctorate/Ph.D': 'Get Dr. Title',
      'Diploma Programs': 'Short-term'
    };
    return badges[categoryName] || 'Available';
  };

  return (
    <section className="top-programs mt-4">
      <div className="container">
        <div className="program-header text-center mx-auto">
          <h2 className="text-center heading">
            Explore <strong>Top-Ranked Online Programs</strong>
          </h2>
        </div>
        
        <div className="body mt-4">
          {/* Navigation Pills */}
          <ul className="nav justify-content-center nav-pills mb-3 gap-2" id="pills-tab" role="tablist">
            {coursesData.map((category) => {
              const tabId = category.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
              const isActive = activeTab === tabId;
              
              return (
                <li 
                  key={category._id} 
                  className="nav-item" 
                  role="presentation" 
                  style={{ borderRadius: '7px', border: '2px solid #14081E' }}
                >
                  <button
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    id={`pills-${tabId}-tab`}
                    data-bs-toggle="pill"
                    data-bs-target={`#pills-${tabId}`}
                    type="button"
                    role="tab"
                    aria-controls={`pills-${tabId}`}
                    aria-selected={isActive}
                    onClick={() => handleTabClick(category.name)}
                  >
                    <p className="course-title mb-0">{category.name}</p>
                    <span className="badge">{getBadgeText(category.name)}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Tab Content */}
          <div className="tab-content" id="pills-tabContent" style={{ marginTop: '-12px' }}>
            {coursesData.map((category) => {
              const tabId = category.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
              const isActive = activeTab === tabId;
              const courses = category.courses || [];
              
              return (
                <div
                  key={category._id}
                  className={`tab-pane fade ${isActive ? 'show active' : ''}`}
                  id={`pills-${tabId}`}
                  role="tabpanel"
                  aria-labelledby={`pills-${tabId}-tab`}
                  tabIndex="0"
                >
                  <div className="pg-courses-tab inner-tab-content my-5 py-3 px-1">
                    <div className="pg-cards-list d-flex flex-wrap">
                      {courses.map((course, courseIndex) => (
                        <div
                          key={course._id}
                          className={`pg-card position-relative ${courseIndex >= 6 ? 'view-more' : ''}`}
                        >
                          <Link href="https://www.collegesathi.com/university-page">
                            <div className="c-header position-relative">
                              <small className="badge c-badge">
                                {course.duration}
                              </small>
                            </div>

                            <div className="c-body text-center">
                              {course.image && (
                                <img
                                  src={course.image}
                                  alt={course.courseName}
                                  style={{ height: '50px' }}
                                  decoding="async"
                                 
                                />
                              )}
                              <p
                                className="d-block"
                                style={{ color: 'black' }}
                              >
                                {course.courseName}
                              </p>

                              <a
                                href="javascript:void(0);"
                                className="nav-link c-footer submit-global"
                                data-course={course.courseName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleCourseClick(course);
                                }}
                              >
                                View Program
                              </a>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>

                    {/* View All Button for Mobile */}
                    {courses.length > 6 && (
                      <div className="text-center mt-3 view-all-wrapper d-md-none">
                        <button className="btn btn-primary view-all-btn">
                          View All
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`  .c-body p {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /* Restrict to 2 lines */
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        /* Allows proper wrapping */
        max-height: 48px;
        /* Ensures two-line height */
        line-height: 24px;
        /* Adjust line height to match design */


    }

    .top-programs .program-header {
        max-width: 786px
    }

    .top-programs .nav-pills {
        max-width: 1022px;
        margin-left: auto;
        margin-right: auto
    }

    .top-programs .pg-cards-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 13px;
    }

    .top-programs .pg-cards-list .pg-card {
        width: 143px;
        /* height: 161px; */
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
        /* padding: 5px;  */
        transition: transform 0.3s ease;
        border: 1px solid #eaeaea;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }


    .c-footer {
        display: block;
        margin-top: 8px;
        color: #007bff;
background: #0056b3;
        color: white;
        /* border-radius: 5px; */
        text-decoration: none;
    }

    .show .mt-2 {
        color: black;
        font-family: "Montserrat", sans-serif !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        line-height: 24px !important;
    }

    .top-programs .pg-card .c-footer a {
        font-size: 15px;
        !important
    }

    @media (max-width:1199px) {
        .top-programs .pg-cards-list .pg-card {
            max-width: calc(100% / 5 - 10px)
        }
    }

    @media (max-width:991px) {
        .top-programs .pg-cards-list .pg-card {
            max-width: calc(100% / 4 - 10px)
        }
    }

    @media (max-width:768px) {
        .top-programs .pg-cards-list .pg-card {
            max-width: calc(100% / 3 - 10px);

        }

        .top-programs .program-header .txtexp {
            display: none;
        }

        .c-footer {
            font-size: 8px !important;
            padding: 4px;
        }

        /* .c-body {
       flex-direction: unset;
    } */
        /* .c-body p {
        -webkit-line-clamp: 3;
        max-height: 63px;
    } */
        .show .mt-2 {
            font-size: 10px !important;
        }

        .top-programs .pg-cards-list .pg-card.view-more {
            display: none;
            /* Hide extra cards in responsive view */
        }

        .nav-pills {
            overflow-x: scroll;
            scroll-behavior: smooth;
        }

        .nav-pills::-webkit-scrollbar {
            display: none;
        }

        .nav-item:last-child {
            scroll-margin-right: 20px;
        }
    }

    @media (max-width:540px) {
        .top-programs .nav-pills {
            flex-direction: row !important;
            justify-content: inherit;
            flex-wrap: nowrap !important
        }

        .c-footer {
            font-size: 8px !important;
            padding: 4px;
        }

        .show .mt-2 {
            font-size: 10px !important;
        }

        /* .c-body {
       flex-direction: unset;
    } */
        /* .c-body p {
        -webkit-line-clamp: 3;
        max-height: 70px;
    } */
        .top-programs .nav-pills .nav-link {
            margin: 0 !important;
            text-align: center !important
        }

        .top-programs .nav-pills .nav-link.active p {
            font-weight: 700 !important;
            border-bottom: 1px solid #EC1E24
        }

        .top-programs .nav-pills .nav-link p {
            font-size: 10px !important
        }

        .top-programs .nav-pills .nav-link span {
            display: none
        }

        /* .top-programs .pg-cards-list .pg-card {
            max-width: calc(100% / 2 - 10px);
            aspect-ratio: 1/1; 
        } */

        .top-programs .pg-courses-tab {
            margin-top: 1.33rem !important
        }
    }

    .top-programs .view-more {
        display: none
    }

    @media(max-width:540px) {
        .top-programs .btn {
            font-size: 14.33px !important;
            padding-top: 10px;
            padding-bottom: 10px
        }
    }

    @media (min-width:768px) {
        .top-programs .view-more {
            display: block
        }
    }

    @media (min-width:768px) {
        .top-programs .view-all-wrapper {
            display: none
        }
    }`}</style>
    </section>
  );
};

export default Allcourses;