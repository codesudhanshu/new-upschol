"use client"
import React, { useState, useEffect } from 'react';
import { Search, X, ChevronDown, Menu, Phone, ChevronRight } from 'lucide-react';
import { getAllCourses } from '@/app/api/admin/apiService';
import HeaderSearchTrigger from "@/components/HeaderSearchTrigger"
import SearchModal from "@/components/SearchModal"

const UpScholHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgramsModalOpen, setIsProgramsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tab2');
  const [activeCourse, setActiveCourse] = useState(null);
  const [activeSpec, setActiveSpec] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

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

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Programs Modal Component
  const ProgramsModal = () => {
    const [selectedCategory, setSelectedCategory] = useState(programCategories[1] || programCategories[0]);
    const [viewMode, setViewMode] = useState('courses'); // 'courses' or 'specialisations'

    const handleViewSpecialisations = (course) => {
      setActiveCourse(course);
      setViewMode('specialisations');
    };

    const handleBackToCourses = () => {
      setActiveCourse(null);
      setViewMode('courses');
    };

    return (
      <div className={`modal fade ${isProgramsModalOpen ? 'show' : ''}`} id="programsModal" 
           style={{ display: isProgramsModalOpen ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
        <div className="modal-dialog modalbx">
          <div className="modal-content mdlcnt">
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
            <div className="modal-body fndprg">
              <div className="explore-programm-wrap d-flex">
                {/* Sidebar */}
                <div className="programm-tab-left">
                  <span className="h2-classes">Browse by Domains</span>
                  <ul className="nav nav-pills flex-column" role="tablist">
                    {programCategories.map((category) => (
                      <li key={category.id} className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${selectedCategory?.id === category.id ? 'active' : ''}`}
                          onClick={() => {
                            setSelectedCategory(category);
                            setViewMode('courses');
                            setActiveCourse(null);
                          }}
                          type="button"
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Main Content */}
                <div className="programm-tab-content flex-fill">
                  <div className="tab-content">
                    <div className="tab-pane fade show active">
                      {viewMode === 'courses' ? (
                        <>
                          {/* Course Grid View */}
                          <div className="course-grid row g-3 mt-3" style={{ marginLeft: '78px' }}>
                            {selectedCategory?.courses?.map((course) => (
                              <div key={course._id} className="col-md-4" style={{ width: '22.333333%' }}>
                                <div className="course-card">
                                  <img 
                                    src={courseImages[course.courseName] || '/uploads/dropdown/1745818950-dropdown-image.svg'} 
                                    alt={course.courseName} 
                                    style={{ height: '50px' }}
                                  />
                                  <p className="course-title">{course.courseName}</p>
                                  <a 
                                    href="javascript:void(0);" 
                                    className="view-specs-link"
                                    onClick={() => handleViewSpecialisations(course)}
                                  >
                                    View Specialisations →
                                  </a>
                                </div>
                              </div>
                            ))}
                            
                            {/* Fallback when no courses in category */}
                            {(!selectedCategory?.courses || selectedCategory.courses.length === 0) && (
                              <div className="col-12 text-center py-4">
                                <p>No courses available in this category</p>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        /* Specialisations View */
                        <div className="specs-grid">
                          <button 
                            className="btn btn-sm btn-secondary mb-3 back-to-courses-btn"
                            onClick={handleBackToCourses}
                          >
                            ← Back to Courses
                          </button>
                          
                          <div className="specialisations-wrapper">
                            <div className="container">
                              <div className="row justify-content-center">
                                {/* Mock specialisations - replace with your actual data */}
                                <div className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex justify-content-center">
                                  <div className="course-card text-center p-3 shadow-sm rounded" style={{ width: '100%', maxWidth: '280px' }}>
                                    <img 
                                      src="/uploads/dropdown/1753162924-dropdown-image.svg" 
                                      alt="Specialisation" 
                                      style={{ height: '50px', objectFit: 'contain', marginBottom: '10px' }} 
                                    />
                                    <p className="course-title">Specialisation 1</p>
                                    <a href="javascript:void(0);" className="view-universities-link">
                                      View Info →
                                    </a>
                                  </div>
                                </div>
                                
                                <div className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex justify-content-center">
                                  <div className="course-card text-center p-3 shadow-sm rounded" style={{ width: '100%', maxWidth: '280px' }}>
                                    <img 
                                      src="/uploads/dropdown/1753075466-dropdown-image.svg" 
                                      alt="Specialisation" 
                                      style={{ height: '50px', objectFit: 'contain', marginBottom: '10px' }} 
                                    />
                                    <p className="course-title">Specialisation 2</p>
                                    <a href="javascript:void(0);" className="view-universities-link">
                                      View Info →
                                    </a>
                                  </div>
                                </div>
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
                                <div className="row gx-3 gy-4 px-2 py-2">
                                  {/* Mock specialisations for mobile */}
                                  <div className="col-6 col-md-4 col-lg-3">
                                    <div className="specialisation-card p-3 border rounded shadow-sm h-100">
                                      <div className="d-flex align-items-center mb-2">
                                        {/* <img 
                                          src="/uploads/dropdown/1753162924-dropdown-image.svg" 
                                          alt="Specialisation" 
                                          style={{ width: '30px', height: '30px', objectFit: 'contain', marginRight: '10px' }} 
                                        /> */}
                                        <p className="course-title">Specialisation</p>
                                      </div>
                                      <a href="javascript:void(0);" className="card-link load-universities text-primary fw-semibold">
                                        View Info →
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {(!category.courses || category.courses.length === 0) && (
                      <div className="p-3 text-center">
                        <p>No courses available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* <div className="bottom-stuff mt-4 pt-2" id="scli">
          <div className="socials-btn d-flex align-items-center justify-content-center mt-4">
            <a href="https://www.facebook.com/people/UpSchol/61552821882181/">
              <img src="/assets/icons/fb.webp" width="50" height="50" alt="Facebook" />
            </a>
            <a href="https://www.youtube.com/@upskillwithus" className="me-1">
              <img src="/assets/icons/utb.webp" width="51" height="51" alt="YouTube" />
            </a>
            <a href="https://www.instagram.com/upschol/">
              <img src="/assets/icons/inst.png" width="42" height="42" alt="Instagram" />
            </a>
          </div>
        </div> */}
      </div>
    );
  };

  return (
    <>
      <header>
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-transparent">
            <div className="navigation_main hdrr">
              <a className="navbar-brand" href="https://www.new-upschol.vercel.app">
                <figure>
                  <img 
                    className="img-fluid" 
                    src="/images/logo.jpeg" 
                    alt="logo" 
                    style={{marginTop:"18px"}}
                  />
                </figure>
              </a>

              {/* Desktop Navigation */}
              <div className="navigation" style={{ marginRight: '170px' }}>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="desk">
                  <li className="nav-item">
                    <div className="responsive_nav">
                      <a 
                        className="btn" 
                        href="#" 
                        id="findProgramsBtn"
                        onClick={() => setIsProgramsModalOpen(true)}
                      >
                        Find Programs
                        <i className="fa fa-sort-desc" aria-hidden="true"></i>
                      </a>
                    </div>
                  </li>
                  
                  <li className="nav-item">
                    <a className="nav-link" href="/university">
                      Top Universities
                    </a>
                  </li>
                  
                  <li className="nav-item button-hdr">
                    <a href="/expert-advice" className="hdr ai-powered">
                      <span className="tips">✅ ClikPick</span>
                    </a>
                  </li>
                </ul>
                
                {/* Mobile Navigation */}
                <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="mob">
                  <li className="nav-item">
                    <div className="responsive_nav">
                      <a 
                        className="sub_menu_dropdown active" 
                        onClick={toggleMobileMenu}
                        role="button"
                        style={{ cursor: 'pointer' }}
                      >
                        Find Programs <i className="fa fa-sort-desc" aria-hidden="true"></i>
                      </a>
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