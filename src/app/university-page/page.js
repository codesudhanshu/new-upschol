"use client"
import React, { useState, useEffect } from 'react';
import { getAllstate, getAllcity, LeadsAdd, getAllIndustryExpertData } from '../api/candidate/HomePage';
import Layout from '@/components/Candidatepagelayout';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const EducationForm = () => {
  const [currentSlide, setCurrentSlide] = useState(2);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    state: '',
    city: ''
  });
  
    const router = useRouter  ();
  const [statesData, setStatesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [expertImages, setExpertImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [consentChecked, setConsentChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const slides = [
    'images/Find Programs Form side Image 1-100.jpeg',
    'images/Find Programs Form side Image 2-100.jpeg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const states = await getAllstate();
        if (states.status && states.allowed) {
          setStatesData(states.result);
        }

        const experts = await getAllIndustryExpertData();
        if (experts.status) {
          setExpertImages(experts.result);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchInitialData();
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const showSuccessAlert = (message) => {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
      confirmButtonColor: '#7004e5',
    });
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: message,
      confirmButtonColor: '#7004e5',
      confirmButtonText: 'OK'
    });
  };

  const showWarningAlert = (message) => {
    Swal.fire({
      icon: 'warning',
      title: 'Warning!',
      text: message,
      confirmButtonColor: '#7004e5',
      confirmButtonText: 'OK'
    });
  };

const handleSubmit = async () => {
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
    
    if (!formData.state) {
      newErrors.state = 'Please select state.';
    }
    
    if (!formData.city) {
      newErrors.city = 'Please select city.';
    }

    if (!consentChecked) {
      showWarningAlert('Please consent to receive notifications.');
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedState = statesData.find(s => s._id === formData.state);
      const selectedCity = citiesData.find(c => c._id === formData.city);

      // Get university data from localStorage before removing it
      const universityData = localStorage.getItem('selectedUniversity');
      let universityName = '';
      let collegeUrl = '';
       let formAdditionalData = {};
      
      if (universityData) {
        try {
          const university = JSON.parse(universityData);
          universityName = university.universityName || '';
          collegeUrl = university.collegeUrl || '';
           formAdditionalData = JSON.parse(universityData);
        } catch (error) {
          console.error('Error parsing university data:', error);
        }
      }

      const submitData = {
        name: formData.full_name.trim(),
        email: formData.email.trim(),
        phoneNumber: Number(formData.phone_number.trim()),
        universityName: universityName || "",
        state: selectedState?.state || '',
        city: selectedCity?.district || '',
        courseName: formAdditionalData.courseName || "",
        couseCategory: formAdditionalData.degree || "",
      };

      const response = await LeadsAdd(submitData);
      
      if (response.status) {
        // Success alert with thenable to handle OK button click
        const result = await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Form submitted successfully! Our team will contact you soon.',
          confirmButtonColor: '#7004e5',
        });
        
        // User clicked OK, now redirect
        if (result.isConfirmed) {
          // Reset form
          setFormData({
            full_name: '',
            email: '',
            phone_number: '',
            state: '',
            city: '',
          });
          setConsentChecked(false);
          setErrors({});
          
          // Remove from localStorage
          localStorage.removeItem('selectedUniversity');
          
          // Redirect to university page if collegeUrl exists
          if (collegeUrl) {
            router.push(`/university/${collegeUrl}`);
          } else {
            // Fallback redirect if no collegeUrl
            router.push('/university');
          }
        }
      } else {
        showErrorAlert(response.message || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showErrorAlert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container cont">
        <div className="left-section">
          <div className="slider">
            {slides.map((slide, index) => (
              <img
                key={index}
                src={slide}
                alt={`Slide ${index + 1}`}
                className={index === currentSlide ? 'active' : ''}
              />
            ))}
          </div>
        </div>

        <div className="right-section">
          <div className="header">
            <h2>Apply from 100+ Online Approved Universities</h2>
            <p>No-Cost EMI <strong style={{ color: '#EC1C24' }}>From ₹4,585</strong></p>
          </div>

          <div className="d-flex fs-11 align-items-center justify-content-center gap-2 mt-0 flex-wrap py-3 shadow-sm rounded" style={{ background: 'white', border: '1px solid #ddd' }}>
            <img src="https://www.collegesathi.com/images/expertimages-01.svg" alt="Team image" style={{ width: '50px', height: 'auto' }} className="rounded-circle" />
            <span className="fw-bold fs-12 text-dark">Consult with Collegesathi experts.</span>
            <span className="text-warning"><i className="fas fa-handshake"></i></span>
          </div>

          <div className="enquire_now_modal_box">
            <div className="details_box_main">
              <div className="access_list_form fv-form fv-form-bootstrap">
                <input type="hidden" name="universitySlug" value="" />
                <input type="hidden" name="courseSlug" value="" />
                <input type="hidden" name="specSlug" value="" />

                <div className="row">
                  <div className="col-lg-6">
                    <div className="form_col_12">
                      <input
                        className="form-control field_class"
                        placeholder="Full Name*"
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
                  </div>

                  <div className="col-lg-6">
                    <div className="form_column form_col_12 w-100">
                      <input
                        className="form-control field_class"
                        placeholder="Email*"
                        name="email"
                        type="text"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {errors.email && (
                        <span className="error help-inline email contact_email_error help-block">
                          <small className="help-block">{errors.email}</small>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="access_list_box form_col_12 mobile_input d-block">
                  <div className="row uuuuu">
                    <div className="col-lg-12">
                      <div className="form_column countrynumber number_select w-100">
                        <div className="intl-tel-input allow-dropdown">
                          <div className="flag-container">
                            <div className="selected-flag" tabIndex="0" title="India (भारत): +91">
                              <div className="iti-flag in"></div>
                              <div className="iti-arrow"></div>
                            </div>
                          </div>
                          <input
                            className="w-100 form-control contactnoEnquiry mobile03"
                            id="phoneNumberCustomerEnquiry"
                            maxLength="10"
                            placeholder="Mobile Number*"
                            onChange={handleInputChange}
                            onKeyPress={isNum}
                            style={{ borderRadius: '0' }}
                            name="phone_number"
                            type="text"
                            autoComplete="off"
                            value={formData.phone_number}
                          />
                        </div>
                        {errors.phone_number && (
                          <span className="error help-inline phone_error phone student_signup_phone_error UserPhoneCustomer_enquiry_error not_valid_mobile_customer_enquiry contact_us_phone_number_error help-block">
                            <small className="help-block">{errors.phone_number}</small>
                          </span>
                        )}
                        <span className="fs-19 position-absolute end-0 me-0 px-0 rounded-bottom text-success z-index-1" style={{ bottom: '-9px', backgroundColor: 'white' }}>
                          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" fontSize="12" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647z"></path>
                          </svg>Privacy assured
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="access_list_box form_col_12">
                  <div className="form_column">
                    <div id="enquiry_state_div">
                      <select
                        className="form-control form-select"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                      >
                        <option value="" selected="selected">Please Select State*</option>
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
                    <div id="enquiry_city_div">
                      <select
                        className="autocomplete form-select show-tickform-select"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={handleInputChange}
                      >
                        <option value="">Please Select City</option>
                        {citiesData.map((city) => (
                          <option key={city._id} value={city._id}>{city.district}</option>
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

                <div className="row">
                  <div className="col-md-12 d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="chkbox"
                      style={{ width: '16px', height: '16px', cursor: 'pointer', marginRight: '8px' }}
                      checked={consentChecked}
                      onChange={(e) => setConsentChecked(e.target.checked)}
                    />
                    <label htmlFor="chkbox" className="consentmsgdesclass" style={{ fontSize: '14px', fontWeight: '500', color: 'black', lineHeight: '1.5' }}>
                      I hereby authorize you to send notifications via{' '}
                      <span style={{ color: 'black', fontWeight: '600' }}>SMS/RCS Messages</span>,{' '}
                      <span style={{ color: 'black', fontWeight: '600' }}>Promotional</span> /
                      <span style={{ color: 'black', fontWeight: '600' }}>Informational Messages</span>.
                    </label>
                  </div>
                </div>

                <div className="contact_btn" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    id="enquire_now_btn"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    style={{ 
                      backgroundColor: "#7004e5",
                      opacity: isSubmitting ? 0.6 : 1
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cont {
          display: flex;
          justify-content: space-between;
          width: 100%;
          max-width: 1200px;
          margin: 20px auto;
        }

        .left-section {
          width: 50%;
          position: relative;
          overflow: hidden;
          border-radius: 10px;
        }
       
        .slider {
          width: 100%;
          height: 100%;
          position: relative;
        }
       
        .slider img {
          width: 100%;
          height: auto;
          display: none;
          position: absolute;
          top: 0;
          left: 0;
        }
       
        .slider img.active {
          display: block;
        }

        .right-section {
          width: 50%;
          background: linear-gradient(-118deg, #FFFFFF 40%, #e8ceffff 100%);
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .right-section h2 {
          font-size: 24px;
          color: black;
          text-align: center;
          margin-bottom: 10px;
        }

        .right-section p {
          text-align: center;
          color: black;
          margin-bottom: 20px;
        }

        form label {
          font-weight: bold;
          margin-top: 10px;
          display: block;
        }

        input,
        select {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 13px;
        }

        .phone-input {
          display: flex;
          align-items: center;
        }

        .phone-input select {
          width: 70px;
          margin-right: 10px;
        }

        button {
          margin-top: 7px;
        }

        .footer-note {
          margin-top: 20px;
          text-align: center;
          color: #666;
        }

        @media (max-width: 991px) {
          .left-section {
            display: none;
          }

          .right-section {
            width: 100%;
            padding: 0px;
          }
        }

        @media (max-width: 768px) {
          .form_col_12.otpAction {
            margin-top: 25px !important;
          }
        }
      `}</style>
    </Layout>
  );
};

export default EducationForm;