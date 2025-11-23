"use client"
import { useState, useEffect } from "react";
import { searchUniversities } from "@/app/api/admin/apiService";
import { getAllCoursesData } from "@/app/api/candidate/HomePage";
import Link from "next/link";
import Image from "next/image";
import { slugify } from '@/utils/slugify';

export default function CollegeListingPage() {
  const [universities, setUniversities] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUniversities, setTotalUniversities] = useState(0);
  
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);

  // Search state for filters
  const [courseSearch, setCourseSearch] = useState("");
  const [specSearch, setSpecSearch] = useState("");

  // Initial load
  useEffect(() => {
    fetchUniversities(1);
    fetchCategories();
  }, []);

  // Fetch universities with pagination
  const fetchUniversities = async (page = 1) => {
    try {
      setLoading(true);
      
      const filterData = {
        categoryId: selectedCategory,
        courseId: selectedCourse,
        specialization: selectedSpecialization
      };

      const result = await searchUniversities(filterData, page);
      
      if (result.status) {
        if (page === 1) {
          setUniversities(result.result.universities || []);
        } else {
          setUniversities(prev => [...prev, ...(result.result.universities || [])]);
        }
        
        setTotalPages(result.result.totalPages || 1);
        setCurrentPage(result.result.currentPage || 1);
        setTotalUniversities(result.result.totalUniversities || 0);
      }
    } catch (error) {
      console.error("Error fetching universities:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const result = await getAllCoursesData();
      if (result.status && result.result) {
        setAllCategories(result.result);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Handle category selection - UPDATED
  const handleCategorySelect = (category) => {
    setSelectedCategory(category._id);
    setSelectedCourse(null);
    setSelectedSpecialization(null);
    setCurrentPage(1);
    
    // Update URL - FIXED
    const url = new URL(window.location);
    url.searchParams.set('categoryname', slugify(category.name));
    url.searchParams.delete('coursename');
    url.searchParams.delete('specialization');
    window.history.pushState({}, '', url);
    
    // Fetch data with new filters
    fetchUniversities(1);
  };

  // Handle course selection - UPDATED
  const handleCourseSelect = (course, category) => {
    setSelectedCategory(category._id); // ✅ सही category set करें
    setSelectedCourse(course._id);
    setSelectedSpecialization(null);
    setCurrentPage(1);
    
    // Update URL - FIXED
    const url = new URL(window.location);
    url.searchParams.set('categoryname', slugify(category.name));
    url.searchParams.set('coursename', slugify(course.courseName));
    url.searchParams.delete('specialization');
    window.history.pushState({}, '', url);
    
    // Fetch data with new filters
    fetchUniversities(1);
  };

  // Handle specialization selection - UPDATED
  const handleSpecializationSelect = (specialization, course, category) => {
    setSelectedCategory(category._id); // ✅ सही category set करें
    setSelectedCourse(course._id);
    setSelectedSpecialization(specialization.name);
    setCurrentPage(1);
    
    // Update URL - FIXED
    const url = new URL(window.location);
    url.searchParams.set('categoryname', slugify(category.name));
    url.searchParams.set('coursename', slugify(course.courseName));
    url.searchParams.set('specialization', slugify(specialization.name));
    window.history.pushState({}, '', url);
    
    // Fetch data with new filters
    fetchUniversities(1);
  };

  // Clear all filters - UPDATED
  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedCourse(null);
    setSelectedSpecialization(null);
    setCourseSearch("");
    setSpecSearch("");
    setCurrentPage(1);
    
    // Clear URL parameters
    const url = new URL(window.location);
    url.searchParams.delete('categoryname');
    url.searchParams.delete('coursename');
    url.searchParams.delete('specialization');
    window.history.pushState({}, '', url);
    
    // Fetch all universities
    fetchUniversities(1);
  };

  // Load more universities
  const loadMore = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      fetchUniversities(nextPage);
    }
  };

  // Filter courses based on search
  const getFilteredCourses = (category) => {
    if (!category.courses || category.courses.length === 0) return [];
    
    if (!courseSearch.trim()) return category.courses;
    
    return category.courses.filter(course => 
      course.courseName.toLowerCase().includes(courseSearch.toLowerCase())
    );
  };

  // Filter specializations based on search
  const getFilteredSpecializations = (course) => {
    if (!course.specializations || course.specializations.length === 0) return [];
    
    if (!specSearch.trim()) return course.specializations;
    
    return course.specializations.filter(spec => 
      spec.name.toLowerCase().includes(specSearch.toLowerCase())
    );
  };

  // Check if category has courses
  const hasCourses = (category) => {
    return category.courses && category.courses.length > 0;
  };

  // Render filter accordions
  const renderFilterAccordions = () => {
    return (
      <div className="specialisations-filter accordion custom-accordion mt-3" id="filter-accordion">
        <form className="mws-form specialisations_listing" id="filter_form">
          {allCategories.map((category, categoryIndex) => (
            <div key={category._id} className="accordion-item">
              <h2 className="accordion-header">
                <button 
                  className={`accordion-button ${selectedCategory === category._id ? 'collapse' : 'visible'}`}
                  type="button" 
                  data-bs-toggle="collapse" 
                  style={{boxShadow: "none", backgroundColor: "white"}}
                  data-bs-target={`#collapse${categoryIndex}`}
                  onClick={() => {
                    // सिर्फ तभी category select करें जब उसमें courses नहीं हैं
                    if (!hasCourses(category)) {
                      handleCategorySelect(category);
                    }
                  }}
                >
                  {category.name}
                  {selectedCategory === category._id && (
                    <span className="badge bg-primary ms-2">Selected</span>
                  )}
      
                </button>
              </h2>
              
              {hasCourses(category) && (
                <div 
                  id={`collapse${categoryIndex}`} 
                  className={`accordion-collapse ${selectedCategory === category._id ? 'collapse' : 'visible'}`}
                  data-bs-parent="#filter-accordion"
                >
                  <div className="accordion-body">
                    <div className="course_filters">
                      {/* Course Search */}
                      <div className="form-group mb-3 course-search-toggle-wrapper">
                        <h6 className="mb-2 fw-semibold">🔍 Search Courses</h6>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder={`Search courses in ${category.name}...`}
                          value={courseSearch}
                          onChange={(e) => setCourseSearch(e.target.value)}
                        />
                      </div>
                      
                      {/* Courses List */}
                      <div className="course-list">
                        <h6 className="mb-2 fw-semibold">📚 Available Courses</h6>
                        {getFilteredCourses(category).map((course) => (
                          <div key={course._id} className="course-wrapper mb-3">
                            {/* Course Item */}
                            <div 
                              className={`course-item p-3 border rounded cursor-pointer ${
                                selectedCourse === course._id ? 'checked' : ''
                              }`}
                              onClick={() => handleCourseSelect(course, category)}
                              style={{ 
                                backgroundColor: selectedCourse === course._id ? '#7004e5' : 'white',
                                color: selectedCourse === course._id ? 'white' : 'black',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              <div className="d-flex justify-content-between align-items-center">
                                <span className="fw-semibold">{course.courseName}</span>
                                {course.specializations && course.specializations.length > 0 && (
                                  <span className="badge bg-light text-dark">
                                    {course.specializations.length} specializations
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Specializations - Show only if course is selected and has specializations */}
                            {selectedCourse === course._id && course.specializations && course.specializations.length > 0 && (
                              <div className="specialisation-list mt-2 p-3 border rounded">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <h6 className="mb-0 fw-semibold">🎯 Specializations</h6>
                                  <span className="badge bg-info">
                                    {course.specializations.length} available
                                  </span>
                                </div>
                                
                                {/* Specialization Search */}
                                <div className="form-group mb-3 spec-search-toggle-wrapper">
                                  <input 
                                    type="text" 
                                    className="form-control form-control-sm" 
                                    placeholder="Search specializations..."
                                    value={specSearch}
                                    onChange={(e) => setSpecSearch(e.target.value)}
                                  />
                                </div>
                                
                                <div className="row g-2">
                                  {getFilteredSpecializations(course).map((specialization, specIndex) => (
                                    <div key={specialization._id || specIndex} className="col-12 col-md-6 col-lg-4">
                                      <div 
                                        className={`specialization-item p-2 border rounded cursor-pointer ${
                                          selectedSpecialization === specialization.name ? 'active' : ''
                                        }`}
                                        onClick={() => handleSpecializationSelect(specialization, course, category)}
                                        style={{
                                          backgroundColor: selectedSpecialization === specialization.name ? '#7004e5' : '#f8f9fa',
                                          color: selectedSpecialization === specialization.name ? 'white' : 'black',
                                          cursor: 'pointer',
                                          transition: 'all 0.3s ease'
                                        }}
                                      >
                                        <div className="d-flex align-items-center">
                                          {specialization.emoji && (
                                            <span className="me-2" style={{ fontSize: '16px' }}>
                                              {specialization.emoji}
                                            </span>
                                          )}
                                          <div>
                                            <span className="small fw-medium">{specialization.name}</span>
                                            {specialization.description && (
                                              <p className="small mb-0 mt-1" style={{ 
                                                fontSize: '0.7rem',
                                                opacity: selectedSpecialization === specialization.name ? 0.8 : 0.6
                                              }}>
                                                {specialization.description.length > 60 
                                                  ? `${specialization.description.substring(0, 60)}...`
                                                  : specialization.description
                                                }
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                  
                                  {getFilteredSpecializations(course).length === 0 && (
                                    <div className="col-12 text-center py-2">
                                      <p className="text-muted small mb-0">No specializations found</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {getFilteredCourses(category).length === 0 && (
                          <div className="text-center py-3">
                            <p className="text-muted mb-0">No courses found</p>
                            {courseSearch && (
                              <button 
                                className="btn btn-sm btn-outline-secondary mt-2"
                                onClick={() => setCourseSearch("")}
                              >
                                Clear Search
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </form>
      </div>
    );
  };

  // Rest of your component (pagination, university cards, etc.)
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <nav aria-label="University pagination" className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => fetchUniversities(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &laquo; Previous
            </button>
          </li>
          
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => fetchUniversities(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            );
          })}
          
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => fetchUniversities(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next &raquo;
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  // Compare functionality (your existing code)
  const addToCompare = (university) => {
    if (compareList.length >= 3) return;
    if (!compareList.find(item => item._id === university._id)) {
      setCompareList([...compareList, university]);
    }
  };

  const removeFromCompare = (universityId) => {
    setCompareList(compareList.filter(item => item._id !== universityId));
  };

  const getComparisonUrl = () => {
    const urls = compareList.map(uni => {
      return uni?.universityurl || '';
    }).filter(url => url);
    
    return `/compare-universities/${urls.join('-vs-')}`;
  };

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating || 0);
    
    return (
      <span className="rating" data-score={rating} title="good">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            <Image 
              src={star <= fullStars ? "/images/star-on.png" : "/images/star-off.png"} 
              alt={star.toString()}
              title="good"
              width={12}
              height={12}
              style={{display: 'inline-block'}}
            />
            {star < 5 && <span>&nbsp;</span>}
          </span>
        ))}
        <input name="score" type="hidden" value={rating} readOnly />
      </span>
    );
  };

  return (
    <>
      <section className="best_colleges">
        <div className="container">
          <div className="programs_listing">
            <div className="search_by_filters">
              <h2>Search By Filters</h2>
              <a className="filters_menu accordion_filter collapsed" data-bs-toggle="collapse" href="#collapseExample" role="button">
                Search By Filters
              </a>

              <div className="collapse" id="collapseExample">
                {renderFilterAccordions()}
                
                <div className="form-check mt-3 ps-0">
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={clearFilters}
                    style={{backgroundColor: "#7004e5", border: "none"}}
                  >
                    🗑️ Clear All Filters
                  </button>
                </div>
              </div>
            </div>

            {/* University Listing */}
            <div className="best_college_listing">
              {/* Results count */}
              <div className="results-count mb-3">
                <p className="text-muted mb-1">
                  📊 Showing <strong>{universities.length}</strong> of <strong>{totalUniversities}</strong> universities
                  {currentPage > 1 && ` - Page ${currentPage} of ${totalPages}`}
                </p>
              </div>

              {/* Active Filters Display */}
              {(selectedCategory || selectedCourse || selectedSpecialization) && (
                <div className="active-filters mb-3 p-3 border rounded bg-light">
                  <h6 className="mb-2">🎯 Active Filters:</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {selectedCategory && (
                      <span className="badge bg-primary p-2">
                        📁 Category: {allCategories.find(c => c._id === selectedCategory)?.name}
                      </span>
                    )}
                    {selectedCourse && (
                      <span className="badge bg-secondary p-2">
                        📚 Course: {allCategories.flatMap(c => c.courses || []).find(c => c._id === selectedCourse)?.courseName}
                      </span>
                    )}
                    {selectedSpecialization && (
                      <span className="badge bg-info p-2">
                        🎯 Specialization: {selectedSpecialization}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <ul className="management_listing my-0 university-data">
                {loading && currentPage === 1 ? (
                  <li className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading universities...</p>
                  </li>
                ) : universities.length > 0 ? (
                  universities.map((university) => (
                    <li key={university._id}>
                      <div className="card">
                        {/* Your existing university card code */}
                        <div className="slider responsive responsive1 slick-initialized slick-slider slick-dotted">
                          <div className="slick-list draggable">
                            <div className="slick-track" style={{opacity: 1, width: '328px', transform: 'translate3d(0px, 0px, 0px)'}}>
                              <div className="slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" tabIndex={0} role="tabpanel" style={{width: '328px'}}>
                                <div style={{width: '100%', height: '200px', position: 'relative', overflow: 'hidden'}}>
                                  <Image
                                    src={university.bannerImage || "/default-banner.jpg"}
                                    alt={university.title || "University Banner"}
                                    fill
                                    style={{objectFit: 'cover'}}
                                    sizes="328px"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-body">
                          <div className="management_logo">
                            <Link href={`/university/${university.universityurl}`} className="text-decoration-none text-dark">
                              <figure className="university_logo_explore_program">
                                <div style={{width: '80px', height: '80px', position: 'relative'}}>
                                  <Image
                                    src={university.logo || "/default-logo.png"}
                                    alt="University Logo"
                                    fill
                                    style={{objectFit: 'contain'}}
                                    sizes="80px"
                                  />
                                </div>
                              </figure>
                            </Link>
                          </div>

                          <Link href={`/university/${university.universityurl}`} className="text-decoration-none text-dark">
                            <h4 className="card-title">{university.title}</h4>
                          </Link>

                          <div className="star_rating">
                            <StarRating rating={university.rating} />
                          </div>

                          <div className="download">
                            <a className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                              <Image 
                                src="/images/download.svg" 
                                alt="" 
                                width={12}
                                height={12}
                                style={{marginRight: '8px'}}
                              /> 
                              Download Prospectus
                            </a>
                          </div>

                          <h6>
                            {university.affiliatedInstitutes?.join(', ')}
                          </h6>
                        </div>

                        <div className="card-footer d-flex">
                          <div className="form-check">
                            <div>
                              <input
                                className="form-check-input addToCompare"
                                type="checkbox"
                                checked={compareList.some(item => item._id === university._id)}
                                onChange={() => {
                                  const isAdded = compareList.some(item => item._id === university._id);
                                  if (isAdded) {
                                    removeFromCompare(university._id);
                                  } else {
                                    addToCompare(university);
                                    setShowCompareModal(true);
                                  }
                                }}
                                id={`Addtocompare${university._id}`}
                              />
                              <label className="form-check-label" htmlFor={`Addtocompare${university._id}`}>
                                Add to compare
                              </label>
                            </div>
                          </div>
                          <Link href={`/university/${university.universityurl}`} className="btn btn-primary" style={{backgroundColor: "#7004e5", border: "none"}}>
                            View details
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-center py-4">
                    <p>No universities found matching your filters.</p>
                    <button 
                      className="btn btn-primary"
                      onClick={clearFilters}
                      style={{backgroundColor: "#7004e5", border: "none"}}
                    >
                      Clear Filters
                    </button>
                  </li>
                )}
              </ul>

              {/* Pagination */}
              {renderPagination()}

              {/* Load More Button */}
              {currentPage < totalPages && (
                <div className="collage_listing_btn seemore text-center mt-4">
                  <button 
                    className="btn btn-primary view_more" 
                    onClick={loadMore}
                    style={{backgroundColor: "#7004e5", border: "none"}}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : `Load More (${totalUniversities - universities.length} remaining)`}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Your existing compare modal code */}
      </section>

      <style jsx>{`
        .course-item.checked,
        .specialization-item.active {
          background-color: #7004e5 !important;
          color: white !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .course-item:hover,
        .specialization-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .specialisation-list {
          background-color: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 8px;
        }

        .cursor-pointer {
          cursor: pointer;
        }

        .pagination .page-item.active .page-link {
          background-color: #7004e5;
          border-color: #7004e5;
        }
        
        .pagination .page-link {
          color: #7004e5;
        }
        
        .pagination .page-link:hover {
          color: #5a03b8;
        }

        /* Custom accordion styles */
        .custom-accordion .accordion-button {
          background-color: #f8f9fa !important;
          color: #333 !important;
          border: 1px solid #dee2e6 !important;
          font-weight: 600;
        }

        .custom-accordion .accordion-button:not(.collapsed) {
          background-color: #7004e5 !important;
          color: white !important;
          border-color: #7004e5 !important;
          box-shadow: none !important;
        }

        .custom-accordion .accordion-button:focus {
          box-shadow: none !important;
          border-color: #7004e5 !important;
        }

        .custom-accordion .accordion-button::after {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23333'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e") !important;
        }

        .custom-accordion .accordion-button:not(.collapsed)::after {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='white'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e") !important;
        }
      `}</style>
    </>
  );
}