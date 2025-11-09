"use client";
import React, { useState, useEffect } from "react";
import { getAllstate, getAllcity, LeadsAdd } from '../api/candidate/HomePage';
import { getAllCourses, searchUniversities } from "../api/admin/apiService";
import Layout from "@/components/Candidatepagelayout";
import Swal from "sweetalert2";

const ScholarshipPage = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    course: "",
    state: "",
    city: "",
    university_id: ""
  });

  const [courses, setCourses] = useState([]);
  const [statesData, setStatesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch states
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const states = await getAllstate();
        if (states.status && states.allowed) {
          setStatesData(states.result);
        }
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
    fetchStates();
  }, []);

  // Fetch cities when state changes
  useEffect(() => {
    const fetchCities = async () => {
      if (formData.state) {
        try {
          const cities = await getAllcity(formData.state);
          if (cities.status && cities.result && cities.result.length > 0) {
            const districts = cities.result[0].districts;
            const cityObjects = districts.map((district, index) => ({
              _id: `${formData.state}_${index}`,
              district: district
            }));
            setCitiesData(cityObjects);
          } else {
            setCitiesData([]);
          }
        } catch (error) {
          console.error('Error fetching cities:', error);
          setCitiesData([]);
        }
      } else {
        setCitiesData([]);
        setFormData(prev => ({ ...prev, city: '' }));
      }
    };
    fetchCities();
  }, [formData.state]);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        if (data?.status) {
          setCourses(data.result);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };
    fetchCourses();
  }, []);

  // Fetch all universities
  useEffect(() => {
    const fetchAllUniversities = async () => {
      try {
        const result = await searchUniversities();
        if (result.status) {
          setUniversities(result.result);
          setFilteredUniversities(result.result);
        }
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };
    fetchAllUniversities();
  }, []);

  // Filter universities when course changes
  useEffect(() => {
    if (formData.course && universities.length > 0) {
      // Filter universities based on selected course
      // This is a basic filter - you might need to adjust based on your data structure
      const filtered = universities.filter(uni => 
        uni.courses && uni.courses.includes(formData.course)
      );
      setFilteredUniversities(filtered);
    } else {
      setFilteredUniversities(universities);
    }
  }, [formData.course, universities]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Reset dependent fields
    if (name === 'state') {
      setFormData(prev => ({ ...prev, city: '' }));
    }
    if (name === 'course') {
      setFormData(prev => ({ ...prev, university_id: '' }));
    }
  };

  const isNum = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      e.preventDefault();
      return false;
    }
    return true;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Please enter full name.';
    }
    
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter valid email.';
    }
    
    if (!formData.phone_number || formData.phone_number.length !== 10) {
      newErrors.phone_number = 'Please enter valid phone number.';
    }
    
    if (!formData.course) {
      newErrors.course = 'Please select course.';
    }
    
    if (!formData.state) {
      newErrors.state = 'Please select state.';
    }
    
    if (!formData.city) {
      newErrors.city = 'Please select city.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);

    try {

      // Find state name from statesData
      const selectedState = statesData.find(state => state._id === formData.state);
      const stateName = selectedState ? selectedState.state : formData.state;

      // Find city name from citiesData
      const selectedCity = citiesData.find(city => city.district === formData.city);
      const cityName = selectedCity ? selectedCity.district : formData.city;

      // Prepare data for API - field names according to your API response
      const contactData = {
        name: formData.full_name,
        email: formData.email,
        phoneNumber: formData.phone_number,
        courseName: formData.course_type,
        city: cityName,
        state: stateName,
        message: formData.message,
      };
    
  const result = await LeadsAdd(contactData);

      if (result.status === true) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: result.result?.message || 'Enquiry submitted successfully!',
          confirmButtonColor: '#7004e5'
        });
        
        // Reset form
        setFormData({
          full_name: "",
          phone_number: "",
          email: "",
          university_id: "",
          course_type: "",
          state: "",
          city: "",
          message: "",
        });
        setErrors({});
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: result.result?.message || result.message || 'Enquiry not submitted successfully!',
          confirmButtonColor: '#7004e5'
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Enquiry not submitted successfully!',
        confirmButtonColor: '#7004e5'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="common_banner scholarship-banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="inner_page_banner text-center text-md-start">
                <span>Scholarship</span>
                <h1 className="m-auto m-md-0">For Army Professionals</h1>
                <p className="mt-3" style={{color: '#fff', opacity: 0.9}}>
                  Exclusive educational benefits for our brave army personnel and their families
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="contact_banner_img d-block text-center">
                <figure>
                  <img 
                    src="https://www.collegesathi.com/images/army-banner-img.png" 
                    alt="Army Professional" 
                    style={{maxWidth: '300px', opacity: 0.9}}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="referal-section scholarship-section">
        <div className="container">
          <h2 className="inner_heading text-center">Honoring Our Heroes!</h2>

          <p className="text-center">
            Upschol deeply respects your dedication to our nation. As a token of our appreciation, 
            we extend exclusive discounts on various programs tailored for army professionals. Your 
            commitment inspires us, and we are here to help you achieve your educational goals.
          </p>

          <p className="text-center"><strong>Compare and Choose to begin our journey together!</strong></p>
          
          <div className="referal-form-start d-flex flex-wrap justify-content-center">
            <div className="form-content">
              <h3>Personal Information<span>(Yours)</span></h3>
              
              <form onSubmit={handleSubmit} className="access_list_form">
                {/* Full Name */}
                <div className="form_col_12 mb-3">
                  <input 
                    className="form-control" 
                    placeholder="Full Name*" 
                    name="full_name" 
                    type="text" 
                    value={formData.full_name}
                    onChange={handleInputChange}
                  />
                  {errors.full_name && (
                    <div className="error error_full_name text-danger help-block">
                      <small className="help-block">{errors.full_name}</small>
                    </div>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="form_col_12 mobile_input mb-3">
                  <div className="number_select contact_number">
                    <input 
                      className="form-control" 
                      placeholder="Mobile Number*" 
                      name="phone_number" 
                      type="text" 
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      onKeyPress={isNum}
                      maxLength="10"
                    />
                    {errors.phone_number && (
                      <div className="error error_phone text-danger help-block">
                        <small className="help-block">{errors.phone_number}</small>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="form_col_12 mb-3">
                  <input 
                    className="form-control" 
                    placeholder="Email Address*" 
                    name="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <div className="error error_email text-danger help-block">
                      <small className="help-block">{errors.email}</small>
                    </div>
                  )}
                </div>

                {/* Course Selection */}
                <div className="form_col_12 mb-3">
                  <select 
                    className="form-control" 
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                  >
                    <option value="">Select the course you are interested in*</option>
                    {courses.map((course, index) => (
                      <option key={index} value={course._id || course.name}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                  {errors.course && (
                    <div className="error error_course text-danger help-block">
                      <small className="help-block">{errors.course}</small>
                    </div>
                  )}
                </div>

            

                {/* State and City Selection */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form_col_12">
                      <select 
                        className="form-control" 
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                      >
                        <option value="">Select State*</option>
                        {statesData.map((state) => (
                          <option key={state._id} value={state._id}>
                            {state.state}
                          </option>
                        ))}
                      </select>
                      {errors.state && (
                        <div className="error error_state text-danger help-block">
                          <small className="help-block">{errors.state}</small>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form_col_12">
                      <select 
                        className="form-control" 
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        disabled={!formData.state}
                      >
                        <option value="">Select City*</option>
                        {citiesData.map((city) => (
                          <option key={city._id} value={city.district}>
                            {city.district}
                          </option>
                        ))}
                      </select>
                      {!formData.state && (
                        <small className="text-muted">Please select state first</small>
                      )}
                      {errors.city && (
                        <div className="error error_city text-danger help-block">
                          <small className="help-block">{errors.city}</small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* reCAPTCHA placeholder */}
                <div className="form_col_12 mb-3">
                  <div className="form-group col-sm-6 g-recaptcha-box">
                    <input type="hidden" id="g-recaptcha-response-scholarship" name="g-recaptcha-response" />
                    <span className="error help-inline g-recaptcha-response_error scholarship-g-recaptcha-response_error" id="g-recaptcha-response_error_div"></span>
                  </div>
                </div>

                <div className="contact_btn">
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    id="scholarship_form_btn"
                    disabled={loading}
                    style={{backgroundColor: "#7004e5"}}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" ></span>
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default ScholarshipPage;