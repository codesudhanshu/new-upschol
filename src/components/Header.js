"use client"
import React, { useState, useEffect } from 'react';
import { Search, X, ChevronDown, Menu, Phone, ChevronRight } from 'lucide-react';
import { getAllCourses } from '@/app/api/admin/apiService';
import HeaderSearchTrigger from "@/components/HeaderSearchTrigger"
import SearchModal from "@/components/SearchModal"
import Link from 'next/link';
import { slugify } from '@/utils/slugify';

const UpScholHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgramsModalOpen, setIsProgramsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [activeCourse, setActiveCourse] = useState(null);

  // Fetch categories data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getAllCourses();
        if (data?.status) {
          setCategories(data.result);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Map API categories to tab structure
  const programCategories = categories.map((category, index) => ({
    id: `tab${index + 1}`,
    name: category.name,
    description: category.description,
    courses: category.courses || []
  }));

  const courseImages = {
    "Btech": "/uploads/dropdown/1745819761-dropdown-image.svg",
    "Online MBA": "/uploads/dropdown/1745819789-dropdown-image.svg",
    "Executive MBA": "/uploads/dropdown/1745818950-dropdown-image.svg",
    "Dual MBA": "/uploads/dropdown/1745818974-dropdown-image.svg",
    "MCA": "/uploads/dropdown/1745819117-dropdown-image.svg",
    "M.Com": "/uploads/dropdown/1745819091-dropdown-image.svg",
    "BBA": "/uploads/dropdown/1745818950-dropdown-image.svg",
    "BCom": "/uploads/dropdown/1745819091-dropdown-image.svg",
    "BCA": "/uploads/dropdown/1745819117-dropdown-image.svg",
    "Digital Marketing": "/uploads/dropdown/1745819291-dropdown-image.svg",
    "Hospital & Health Care Management": "/uploads/dropdown/1745819306-dropdown-image.svg",
    "Project Management": "/uploads/dropdown/1745819422-dropdown-image.svg",
    "PGCM": "/uploads/dropdown/1745819366-dropdown-image.svg",
    "UI & UX": "/uploads/dropdown/1745819379-dropdown-image.svg"
  };

  // Specialization images mapping<link
  const getSpecializationImage = (specialization) => {
    const specializationImages = {
      "Applied Sciences": "/uploads/specializations/applied-sciences.svg",
      "Arts & Humanities": "/uploads/specializations/arts-humanities.svg",
      "Medical & Health Sciences": "/uploads/specializations/medical-health.svg",
      "Science & Technology": "/uploads/specializations/science-tech.svg",
      "Law & Governance": "/uploads/specializations/law-governance.svg",
      "Travel, Media & Miscellaneous": "/uploads/specializations/travel-media.svg",
      "Human Resources": "/uploads/specializations/hr.svg",
      "MBA": "/uploads/specializations/mba.svg"
    };
    
    return specializationImages[specialization.name] || "/uploads/specializations/default-spec.svg";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Programs Modal Component
 // Programs Modal Component - FIXED VERSION
const ProgramsModal = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    programCategories.find(cat => cat.name === "UG Course") || programCategories[0]
  );
  const [viewMode, setViewMode] = useState('courses');

  const handleViewSpecialisations = (course) => {
    setActiveCourse(course);
    setViewMode('specialisations');
  };

  const handleBackToCourses = () => {
    setActiveCourse(null);
    setViewMode('courses');
  };

  // Category change handler - ensure it only changes when explicitly clicked
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setViewMode('courses');
    setActiveCourse(null);
  };

  return (
    <div className={`modal fade ${isProgramsModalOpen ? 'show' : ''}`} id="programsModal" 
         style={{ 
           display: isProgramsModalOpen ? 'block' : 'none', 
           backgroundColor: 'rgba(0,0,0,0.5)' 
         }} 
         tabIndex="-1">
      <div className="modal-dialog modalbx" style={{ maxWidth: '90%', width: '95%' }}>
        <div className="modal-content mdlcnt" style={{ height: '80vh' }}>
          <div className="modal-header">
            <p className="modal-title">Explore All Programs</p>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setIsProgramsModalOpen(false)}
              style={{ border: '2px solid #EC1C24!important' }}
            >
              <X size={16} />
            </button>
          </div>
          <div className="modal-body fndprg" style={{ overflow: 'hidden' }}>
            <div className="explore-programm-wrap d-flex" style={{ height: '100%' }}>
              {/* Sidebar */}
              <div className="programm-tab-left" style={{ width: '250px', flexShrink: 0 }}>
                <span className="h2-classes">Browse by Domains</span>
                <ul className="nav nav-pills flex-column" role="tablist">
                  {programCategories.map((category) => (
                    <li key={category.id} className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${selectedCategory?.id === category.id ? 'active' : ''}`}
                        onClick={() => handleCategoryChange(category)}
                        type="button"
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Main Content */}
              <div className="programm-tab-content flex-fill" style={{ overflow: 'auto' }}>
                <div className="tab-content">
                  <div className="tab-pane fade show active">
                    {viewMode === 'courses' ? (
                      <>
                        {/* Course Grid View */}
                        <div className="course-grid row g-3 mt-3">
                          {selectedCategory?.courses?.map((course) => (
                            <div key={course._id} className="col-md-4 col-lg-3">
                              <div className="course-card text-center p-3 border rounded shadow-sm h-100">
                                {/* <img 
                                  src={courseImages[course.courseName] || '/uploads/dropdown/1745818950-dropdown-image.svg'} 
                                  alt={course.courseName} 
                                  style={{ height: '60px', objectFit: 'contain', marginBottom: '15px' }}
                                /> */}
                                <p className="course-title fw-bold mb-2">{course.courseName}</p>
                                {course.specializations && course.specializations.length > 0 ? (
                                  <Link 
                                    href="javascript:void(0);" 
                                    className="view-specs-link  fw-semibold"
                                    style={{color: "#7004e5"}}
                                    onClick={() => handleViewSpecialisations(course)}
                                  >
                                    View Specializations ({course.specializations.length}) →
                                  </Link>
                                ) : (
                                  <span className="no-specs-text text-muted">No Specializations</span>
                                )}
                              </div>
                            </div>
                          ))}
                          
                          {(!selectedCategory?.courses || selectedCategory.courses.length === 0) && (
                            <div className="col-12 text-center py-4">
                              <p className="text-muted">No courses available in this category</p>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      /* Specializations View - FULL WINDOW */
                      <div className="specs-grid h-100">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <button 
                            className="btn btn-sm btn-outline-secondary back-to-courses-btn"
                            onClick={handleBackToCourses}
                          >
                            ← Back to {selectedCategory?.name} Courses
                          </button>
                          <h5 className="mb-0 text-center flex-grow-1">
                            Specializations for {activeCourse?.courseName}
                          </h5>
                          <div style={{ width: '100px' }}></div>
                        </div>
                        
                        <div className="specialisations-wrapper h-100">
                          <div className="container-fluid h-100">
                            <div className="row g-4">
                              {activeCourse?.specializations?.map((specialization, index) => (
                                <div key={specialization._id || index} className="col-xl-3 col-lg-4 col-md-6">
                                  <div className="specialization-card text-center p-4 border rounded shadow-sm h-100 d-flex flex-column">
                                    <div className="flex-grow-1">
                                      {/* <img 
                                        src={getSpecializationImage(specialization)} 
                                        alt={specialization.name} 
                                        style={{ 
                                          height: '60px', 
                                          objectFit: 'contain', 
                                          marginBottom: '15px' 
                                        }} 
                                      /> */}
                                      <h6 className="course-title fw-bold mb-2">{specialization.name}</h6>
                                      {specialization.description && (
                                        <p className="specialization-desc text-muted small mb-3">
                                          {specialization.description}
                                        </p>
                                      )}
                                    </div>
                                    <Link 
                                      href={`/university?categoryname=${slugify(selectedCategory?.name)}&&coursename=${slugify(activeCourse.courseName)}&&specialization=${slugify(specialization.name)}`}
                                      className="view-universities-link fw-semibold mt-auto"
                                      style={{color: "#7004e5"}}
                                    >
                                      View Info →
                                    </Link>
                                  </div>
                                </div>
                              ))}
                              
                              {(!activeCourse?.specializations || activeCourse.specializations.length === 0) && (
                                <div className="col-12 text-center py-5">
                                  <p className="text-muted">No specializations available for this course</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

  // Mobile Accordion Component
  const MobileAccordion = () => {
    const [openCategory, setOpenCategory] = useState(null);
    const [openCourse, setOpenCourse] = useState(null);

    return (
      <div 
        className={`mobile-accordion ${isMobileMenuOpen ? 'mobile-menu-open' : 'mobile-menu-closed'}`}
        style={{
          display: isMobileMenuOpen ? 'block' : 'none',
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          zIndex: 1000,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}
      >
        <div className="accordion" id="accordionExample">
          {programCategories.map((category, categoryIndex) => (
            <div key={category.id} className="accordion-item">
              <span className="accordion-header h2-classes">
                <button 
                  className={`accordion-button ${openCategory === category.id ? '' : 'collapsed'}`}
                  type="button"
                  onClick={() => setOpenCategory(openCategory === category.id ? null : category.id)}
                >
                  {category.name}
                </button>
              </span>
              
              <div 
                className={`accordion-collapse Subaccordion-collapse collapse ${openCategory === category.id ? 'show' : ''}`}
                style={openCategory === category.id ? { display: 'block' } : {}}
              >
                <div className="accordion-body p-0">
                  <div className="FlexTopheading">
                    <button 
                      className="back-btn" 
                      type="button"
                      onClick={() => setOpenCategory(null)}
                    >
                      ←
                    </button>
                    <span className="box-heading h2-classes">{category.name}</span>
                  </div>
                  
                  <div className="accordion Subaccordion">
                    {category.courses?.map((course, courseIndex) => (
                      <div key={course._id} className="accordion-item">
                        <span className="accordion-header h2-classes">
                          <button 
                            className={`accordion-button ${openCourse === course._id ? '' : 'collapsed'}`}
                            type="button"
                            onClick={() => setOpenCourse(openCourse === course._id ? null : course._id)}
                          >
                            {course.courseName}
                            {course.specializations && course.specializations.length > 0 && (
                              <span className="badge bg-primary ms-2">
                                {course.specializations.length}
                              </span>
                            )}
                          </button>
                        </span>
                        
                        <div 
                          className={`accordion-collapse Subaccordion-collapse collapse ${openCourse === course._id ? 'show' : ''}`}
                          style={openCourse === course._id ? { display: 'block' } : {}}
                        >
                          <div className="accordion-body programm-tab-content p-0">
                            <div className="FlexTopheading">
                              <button 
                                className="back-btn" 
                                type="button"
                                onClick={() => setOpenCourse(null)}
                              >
                                ←
                              </button>
                              <span className="box-heading h2-classes">{course.courseName}</span>
                            </div>
                            
                            <div className="dynamic-content">
                              <div className="specialisations-wrapper" style={{ display: 'block' }}>
                                <h6 className="px-3 py-2 mb-0" style={{ backgroundColor: '#f8f9fa' }}>
                                  Specializations
                                </h6>
                                <div className="row gx-3 gy-4 px-2 py-2">
                                  {course.specializations?.map((specialization, specIndex) => (
                                    <div key={specialization._id || specIndex} className="col-6 col-md-4 col-lg-3">
                                      <div className="specialisation-card p-3 border rounded shadow-sm h-100 d-flex flex-column">
                                        <div className="d-flex align-items-center mb-2 flex-grow-1">
                                          {/* <img 
                                            src={getSpecializationImage(specialization)} 
                                            alt={specialization.name} 
                                            style={{ 
                                              width: '30px', 
                                              height: '30px', 
                                              objectFit: 'contain', 
                                              marginRight: '10px' 
                                            }} 
                                          /> */}
                                          <p className="course-title" style={{ fontSize: '14px', margin: 0 }}>
                                            {specialization.name}
                                          </p>
                                        </div>
                                        {specialization.description && (
                                          <p style={{ 
                                            fontSize: '12px', 
                                            color: '#666', 
                                            marginBottom: '8px',
                                            lineHeight: '1.3'
                                          }}>
                                            {specialization.description.length > 80 
                                              ? `${specialization.description.substring(0, 80)}...`
                                              : specialization.description
                                            }
                                          </p>
                                        )}
                                        <Link 
                                          href="javascript:void(0);" 
                                          className="card-link load-universities fw-semibold mt-auto"
                                          style={{color: "##3b82f6"}}
                                        >
                                          View Info →
                                        </Link>
                                      </div>
                                    </div>
                                  ))}
                                  
                                  {(!course.specializations || course.specializations.length === 0) && (
                                    <div className="col-12 text-center py-3">
                                      <p className="text-muted">No specializations available</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {(!category.courses || category.courses.length === 0) && (
                      <div className="p-3 text-center">
                        <p className="text-muted">No courses available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Rest of the component remains the same...
  return (
    <>
      <header>
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-transparent">
            <div className="navigation_main hdrr">
              <Link className="navbar-brand" href="https://www.new-upschol.vercel.app">
                <figure>
                  <img 
                    className="img-fluid" 
                    src="/images/logo.jpeg" 
                    alt="logo" 
                    style={{marginTop:"18px"}}
                  />
                </figure>
              </Link>

              {/* Desktop Navigation */}
              <div className="navigation" style={{ marginRight: '170px' }}>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="desk">
                  <li className="nav-item">
                    <div className="responsive_nav">
                      <Link 
                        className="btn" 
                        href="#" 
                        id="findProgramsBtn"
                        onClick={() => setIsProgramsModalOpen(true)}
                      >
                        Find Programs
                        <i className="fa fa-sort-desc" aria-hidden="true"></i>
                      </Link>
                    </div>
                  </li>
                  
                  <li className="nav-item">
                    <Link className="nav-link" href="/university">
                      Top Universities
                    </Link>
                  </li>
                  
                  <li className="nav-item button-hdr">
                    <Link href="/expert-advice" className="hdr ai-powered">
                      <span className="tips">✅ ClikPick</span>
                    </Link>
                  </li>
                </ul>
                
                {/* Mobile Navigation */}
                <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="mob">
                  <li className="nav-item">
                    <div className="responsive_nav">
                      <Link 
                        className="sub_menu_dropdown active" 
                        onClick={toggleMobileMenu}
                        role="button"
                        style={{ cursor: 'pointer' }}
                        href="#"
                      >
                        Find Programs <i className="fa fa-sort-desc" aria-hidden="true"></i>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="menu_icon">
              <div className="top_right_icon">
                <ul>
                  <li className="nav-item" >
                    <div style={{
                      borderRadius: '5px',
                      color: 'red',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      width: '160px',
                      backgroundColor: '#f2f2f2',
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                      position: 'relative',
                      padding: '10px'
                    }}>
                      <span style={{ color: '#000000c7' }}>9810102541</span>
                    </div>

                    <span className="helpline-text" style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '43px',
                      backgroundColor: '#7004e5',
                      borderRadius: '15px',
                      padding: '1px 10px',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                      overflow: 'hidden'
                    }}>
                      Helpline
                    </span>
                  </li>
                </ul>
              </div>

              <HeaderSearchTrigger onClick={() => setIsSearchModalOpen(true)} />
              <SearchModal 
                isOpen={isSearchModalOpen} 
                onClose={() => setIsSearchModalOpen(false)} 
              />
              
              <button className="menu" onClick={toggleMobileMenu}>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Accordion */}
        <MobileAccordion />

        {/* Programs Modal */}
        {isProgramsModalOpen && <ProgramsModal />}

        {/* Modal Backdrop */}
        {isProgramsModalOpen && (
          <div 
            className="modal-backdrop fade show" 
            onClick={() => setIsProgramsModalOpen(false)}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }}
          ></div>
        )}
      </header>
    </>
  );
};

export default UpScholHeader;