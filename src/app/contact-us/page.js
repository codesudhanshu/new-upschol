"use client";
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { getAllstate, getAllcity, LeadsAdd } from '../api/candidate/HomePage';
import { getAllCourses, searchUniversities } from "../api/admin/apiService";
import Layout from "@/components/Candidatepagelayout";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    university_id: "",
    course_type: "",
    state: "",
    city: "",
    message: "",
  });

  const [categories, setCategories] = useState([]);
  const [allUniversities, setAllUniversities] = useState([]);
  const [statesData, setStatesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
          setCategories(data.result);
        } else {
          setError('Failed to load course categories');
        }
      } catch (err) {
        setError('Something went wrong while fetching course categories');
      }
    };

    fetchCourses();
  }, []);

  // Fetch universities
  useEffect(() => {
    const fetchAllUniversities = async () => {
      try {
        setLoading(true);
        const result = await searchUniversities();
        if (result.status) {
          setAllUniversities(result.result);
        }
      } catch (error) {
        console.error("Error fetching universities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUniversities();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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

  const handleSubmit = async (e) => {
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
    
    if (!formData.university_id) {
      newErrors.university_id = 'Please select university.';
    }
    
    if (!formData.course_type) {
      newErrors.course_type = 'Please select course.';
    }
    
    if (!formData.state) {
      newErrors.state = 'Please select state.';
    }
    
    if (!formData.city) {
      newErrors.city = 'Please select city.';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      // Find university name
      const selectedUniversity = allUniversities.find(uni => uni._id === formData.university_id);
      const universityName = selectedUniversity ? selectedUniversity.title : '';

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
        universityName: universityName,
        courseName: formData.course_type,
        city: cityName,
        state: stateName,
        message: formData.message,
      };

      // Send data to API
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
    <>
    <Layout>
      <section className="common_banner contactus_banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="inner_page_banner text-center text-md-start">
                <span style={{ fontSize: '20px', fontWeight: 600 }}>📞 Contact us</span>
                
                <h1 className="m-auto m-md-0" style={{ fontSize: '48px', fontWeight: 700, lineHeight: 1.3 }}>
                  We would love to<br/>
                  hear from You
                </h1>
                <p style={{ marginTop: '15px', fontSize: '18px', opacity: 0.9 }}>
                  Have questions? Our experts are available 24/7 to assist you!
                </p>
                
                <div className="contact_buttons mt-4">
                  <a href="mailto:info@upschol.com" className="btn btn-warning px-4 py-2" style={{ fontSize: '18px', borderRadius: '50px', fontWeight: 600 }}>
                    Get in Touch 🚀
                  </a>
                  <a href="tel:+919810800221" className="btn btn-light px-4 py-2" style={{ fontSize: '18px', borderRadius: '50px', fontWeight: 600, marginLeft: '10px' }}>
                    📞 Call Us
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="contact_banner_img position-relative">
                <figure>
                  <img src="/images/contact_banner.svg" alt="Contact us" style={{ width: '100%', maxWidth: '450px', animation: 'float 3s ease-in-out infinite' }} />
                </figure>
              </div>
            </div>
          </div>
        </div>
        
        <div className="floating-shapes">
          <div className="shape1"></div>
          <div className="shape2"></div>
          <div className="shape3"></div>
        </div>
      </section>

      <section className="contact_info_box">
        <div className="container">
          <div className="contact_info_main">
            <div className="contact_info_contant">
              <div className="card box_shadow">
                <figure>
                  <img src="/images/phone-call-01.svg" alt="img" />
                </figure>
                <div className="contact_details">
                  <h6>
                    <a href="tel:+919810800221">+91 9810800221</a>
                  </h6>
                  <p>Helpline</p>
                </div>
              </div>
            </div>
            
            <div className="contact_info_contant">
              <div className="card box_shadow">
                <figure>
                  <img src="/images/email-01.svg" alt="img" />
                </figure>
                <div className="contact_details">
                  <h6>
                    <a href="mailto:info@upschol.com">info@upschol.com</a>
                  </h6>
                </div>
              </div>
            </div>
            
            <div className="contact_info_contant">
              <div className="card box_shadow">
                <figure>
                  <img src="/images/location-01.svg" alt="img" />
                </figure>
                <div className="contact_details">
                  <p>
                    <b>UpSchol Office : </b>212-A, 2nd floor, Jyoti Shikhar Building, District Centre, Janakpuri West, Delhi 110058
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact_info">
            <div className="contact_map access_column">
              <div className="bg-white box_shadow" style={{ background: '#fff' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28016.22771085879!2d77.04373397431638!3d28.62890900000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d04bf181475f3%3A0x27f3d6226e57b9d4!2sJyoti%20Shikhar%20Building!5e0!3m2!1sen!2sus!4v1753300388250!5m2!1sen!2sus" 
                  width="100%" 
                  height="450" 
                  style={{ border: 0 }} 
                  allowFullScreen={true}
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location Map"
                />
              </div>
            </div>
            
            <div className="contact_details_box access_column leave_message">
              <div className="bg-white details_box_main box_shadow">
                <h2>Leave a message</h2>
                
                <div className="access_list_form fv-form fv-form-bootstrap">
                  <div className="form_col_12 mb-3">
                    <input 
                      className="form-control" 
                      placeholder="Please enter full name.*" 
                      name="full_name" 
                      type="text" 
                      value={formData.full_name}
                      onChange={handleInputChange}
                    />
                    {errors.full_name && (
                      <span className="error help-inline full_name contact_us_full_name_error_div help-block">
                        <small className="help-block">{errors.full_name}</small>
                      </span>
                    )}
                  </div>

                  <div className="form_col_12 mobile_input mb-3">
                    <div className="contact_number">
                      <input 
                        className="form-control contactnoEnquiry" 
                        placeholder="Please enter mobile number.*" 
                        name="phone_number" 
                        type="text"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        onKeyPress={isNum}
                        maxLength="10"
                      />
                    </div>
                    {errors.phone_number && (
                      <span className="error help-inline phone_error phone student_signup_phone_error help-block">
                        <small className="help-block">{errors.phone_number}</small>
                      </span>
                    )}
                  </div>
                  
                  <div className="form_col_12 mb-3">
                    <input 
                      className="form-control" 
                      placeholder="Please enter email.*" 
                      name="email" 
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <span className="error help-inline email contact_email_error help-block">
                        <small className="help-block">{errors.email}</small>
                      </span>
                    )}
                  </div>
                  
                  <div className="form_col_12 mb-3">
                    <select 
                      className="form-select show-tick" 
                      name="university_id"
                      value={formData.university_id}
                      onChange={handleInputChange}
                    >
                      <option value="">Please Select University*</option>
                      {allUniversities.map((uni, index) => (
                        <option key={index} value={uni._id || index}>{uni.title}</option>
                      ))}
                    </select>
                    {errors.university_id && (
                      <span className="error help-inline university_id contact_university_error help-block">
                        <small className="help-block">{errors.university_id}</small>
                      </span>
                    )}
                  </div>
                  
                  <div className="form_col_12 mb-3">
                    <select 
                      className="form-select show-tick" 
                      name="course_type"
                      value={formData.course_type}
                      onChange={handleInputChange}
                    >
                      <option value="">Please Select Course*</option>
                      {categories.map((course, index) => (
                        <option key={index} value={course.name}>
                          {course.name}
                        </option>
                      ))}
                    </select>
                    {errors.course_type && (
                      <span className="error help-inline course_type contact_course_type_error help-block">
                        <small className="help-block">{errors.course_type}</small>
                      </span>
                    )}
                  </div>
                  
                  <div className="access_list_box form_col_12 mb-3">
                    <div className="form_column">
                      <div id="state_div">
                        <select 
                          className="form-control form-select" 
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                        >
                          <option value="">Please Select State*</option>
                          {statesData.map((state) => (
                            <option key={state._id} value={state._id}>{state.state}</option>
                          ))}
                        </select>
                      </div>
                      {errors.state && (
                        <span className="error help-inline state contact_state_error help-block">
                          <small className="help-block">{errors.state}</small>
                        </span>
                      )}
                    </div>
                    
                    <div className="form_column">
                      <div id="city_div">
                        <select 
                          className="form-select show-tick" 
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                        >
                          <option value="">Please select city.*</option>
                          {citiesData.map((city) => (
                            <option key={city._id} value={city.district}>{city.district}</option>
                          ))}
                        </select>
                      </div>
                      {errors.city && (
                        <span className="error help-inline city contact_city_error help-block">
                          <small className="help-block">{errors.city}</small>
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="form_col_12 mb-3">
                    <textarea 
                      className="form-control" 
                      placeholder="Your Message*" 
                      name="message" 
                      cols="50" 
                      rows="10"
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                    {errors.message && (
                      <span className="error help-inline message contact_message_error help-block">
                        <small className="help-block">{errors.message}</small>
                      </span>
                    )}
                  </div>
                  
                  <div className="contact_btn">
                    <button className="btn btn-primary submit_btn" type="button" onClick={handleSubmit} disabled={loading} style={{backgroundColor: "#7004e5"}}>
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </Layout>
    </>
  );
};

export default ContactUsPage;