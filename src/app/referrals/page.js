'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getAllcity, getAllstate } from '../api/candidate/HomePage';
import Layout from '@/components/Candidatepagelayout';

const ReferAndEarn = () => {
  const [formData, setFormData] = useState({
    referee_name: '',
    referee_phone: '',
    referee_email: '',
    referee_city: '',
    reference_name: '',
    reference_phone: '',
    reference_email: '',
    reference_city: ''
  });

  const [errors, setErrors] = useState({});
  const [statesData, setStatesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [refereeCities, setRefereeCities] = useState([]);
  const [referenceCities, setReferenceCities] = useState([]);

  // Fetch states on component mount
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

  // Fetch cities for referee when state changes
  useEffect(() => {
    const fetchRefereeCities = async () => {
      if (formData.referee_state) {
        try {
          const cities = await getAllcity(formData.referee_state);
          if (cities.status && cities.result && cities.result.length > 0) {
            const districts = cities.result[0].districts;
            const cityObjects = districts.map((district, index) => ({
              _id: `${formData.referee_state}_${index}`,
              district: district
            }));
            setRefereeCities(cityObjects);
          } else {
            setRefereeCities([]);
          }
        } catch (error) {
          console.error('Error fetching referee cities:', error);
          setRefereeCities([]);
        }
      } else {
        setRefereeCities([]);
        setFormData(prev => ({ ...prev, referee_city: '' }));
      }
    };
    fetchRefereeCities();
  }, [formData.referee_state]);

  // Fetch cities for reference when state changes
  useEffect(() => {
    const fetchReferenceCities = async () => {
      if (formData.reference_state) {
        try {
          const cities = await getAllcity(formData.reference_state);
          if (cities.status && cities.result && cities.result.length > 0) {
            const districts = cities.result[0].districts;
            const cityObjects = districts.map((district, index) => ({
              _id: `${formData.reference_state}_${index}`,
              district: district
            }));
            setReferenceCities(cityObjects);
          } else {
            setReferenceCities([]);
          }
        } catch (error) {
          console.error('Error fetching reference cities:', error);
          setReferenceCities([]);
        }
      } else {
        setReferenceCities([]);
        setFormData(prev => ({ ...prev, reference_city: '' }));
      }
    };
    fetchReferenceCities();
  }, [formData.reference_state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form validation and submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <Layout>
        <section className="common_banner referal-banner">
          <div className="container p-0 m-0">
            <div className="contacts_banner_img d-block d-lg-none">
              <figure className="m-0 p-0">
                <Image 
                  alt="Refer and Earn Banner" 
                  src="/images/refer-and-earn-phone-banner.jpg"
                  width={400}
                  height={200}
                  style={{ width: '100%', height: 'auto' }}
                />
              </figure>
            </div>
          </div>
        </section>

        <section className="referal-section">
          <div className="container">
            <form 
              method="POST" 
              onSubmit={handleSubmit}
              className="fv-form fv-form-bootstrap"
              noValidate
            >
              <h2 className="inner_heading text-center">
                Refer your family, friends &amp; colleagues now &amp; claim<br />
                upto <b>25000/-</b> referral bonus
              </h2>
              
              <div className="referal-form-start d-flex flex-wrap">
                {/* Referee Details Section */}
                <div className="form-content">
                  <h3>Referee Details<span>(Yours)</span></h3>
                  <div className="access_list_form">
                    {/* Name Field */}
                    <div className="form_col_12 mb-3">
                      <input 
                        className="form-control" 
                        placeholder="Full Name*" 
                        id="referee_name" 
                        name="referee_name" 
                        type="text" 
                        value={formData.referee_name}
                        onChange={handleInputChange}
                      />
                      <div className="error error_referee_name text-danger help-block">
                        <small 
                          className="help-block" 
                          data-fv-validator="notEmpty" 
                          data-fv-for="referee_name" 
                          data-fv-result="NOT_VALIDATED" 
                          style={{ display: 'none' }}
                        >
                          Please enter full name.
                        </small>
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div className="form_col_12 mobile_input mb-3">
                      <div className="number_select contact_number">
                        <div className="country_code" style={{ display: 'none' }}>
                          <span>
                            <Image 
                              src="/images/india.png" 
                              alt="India Flag" 
                              width={20}
                              height={15}
                            />
                          </span>
                          <span>+91</span>
                        </div>
                        <input 
                          className="form-control" 
                          placeholder="Mobile Number*" 
                          id="referee_phone" 
                          name="referee_phone" 
                          type="text" 
                          value={formData.referee_phone}
                          onChange={handleInputChange}
                        />
                        <div className="error error_referee_phone text-danger help-block">
                          <small 
                            className="help-block" 
                            data-fv-validator="notEmpty" 
                            data-fv-for="referee_phone" 
                            data-fv-result="NOT_VALIDATED" 
                            style={{ display: 'none' }}
                          >
                            Please enter phone number.
                          </small>
                          <small 
                            className="help-block" 
                            data-fv-validator="callback" 
                            data-fv-for="referee_phone" 
                            data-fv-result="NOT_VALIDATED" 
                            style={{ display: 'none' }}
                          >
                            Please enter a valid value
                          </small>
                        </div>
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="form_col_12 mb-3">
                      <input 
                        className="form-control" 
                        placeholder="Email Address*" 
                        id="referee_email" 
                        name="referee_email" 
                        type="email" 
                        value={formData.referee_email}
                        onChange={handleInputChange}
                      />
                      <div className="error error_referee_email text-danger help-block">
                        <small 
                          className="help-block" 
                          data-fv-validator="notEmpty" 
                          data-fv-for="referee_email" 
                          data-fv-result="NOT_VALIDATED" 
                          style={{ display: 'none' }}
                        >
                          Please enter email.
                        </small>
                        <small 
                          className="help-block" 
                          data-fv-validator="emailAddress" 
                          data-fv-for="referee_email" 
                          data-fv-result="NOT_VALIDATED" 
                          style={{ display: 'none' }}
                        >
                          Please enter valid email.
                        </small>
                      </div>
                    </div>

                    {/* State Field for Referee */}
                    <div className="form_col_12 mb-3">
                      <select 
                        className="form-control" 
                        id="referee_state" 
                        name="referee_state" 
                        value={formData.referee_state}
                        onChange={handleInputChange}
                      >
                        <option value="">Select State*</option>
                        {statesData.map((state) => (
                          <option key={state._id} value={state._id}>
                            {state.state}
                          </option>
                        ))}
                      </select>
                      <div className="error error_referee_state text-danger help-block">
                        <small 
                          className="help-block" 
                          data-fv-validator="notEmpty" 
                          data-fv-for="referee_state" 
                          data-fv-result="NOT_VALIDATED" 
                          style={{ display: 'none' }}
                        >
                          Please select state.
                        </small>
                      </div>
                    </div>

                    {/* City Field for Referee */}
                    <div className="form_col_12 mb-3">
                      <select 
                        className="form-control" 
                        id="referee_city" 
                        name="referee_city" 
                        value={formData.referee_city}
                        onChange={handleInputChange}
                        disabled={!formData.referee_state}
                      >
                        <option value="">Select City*</option>
                        {refereeCities.map((city) => (
                          <option key={city._id} value={city._id}>
                            {city.district}
                          </option>
                        ))}
                      </select>
                      <div className="error error_referee_city text-danger help-block">
                        <small 
                          className="help-block" 
                          data-fv-validator="notEmpty" 
                          data-fv-for="referee_city" 
                          data-fv-result="NOT_VALIDATED" 
                          style={{ display: 'none' }}
                        >
                          Please select city.
                        </small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reference Details Section */}
                <div className="form-content">
                  <h3>Reference Details<span>(whom you need to refer)</span></h3>
                  <div className="access_list_form">
                    {/* Name Field */}
                    <div className="form_col_12 mb-3">
                      <input 
                        className="form-control" 
                        placeholder="Full Name*" 
                        id="reference_name" 
                        name="reference_name" 
                        type="text" 
                        value={formData.reference_name}
                        onChange={handleInputChange}
                      />
                      <div className="error error_reference_name text-danger help-block">
                        <small 
                          className="help-block" 
                          data-fv-validator="notEmpty" 
                          data-fv-for="reference_name" 
                          data-fv-result="NOT_VALIDATED" 
                          style={{ display: 'none' }}
                        >
                          Please enter full name.
                        </small>
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div className="form_col_12 mobile_input mb-3">
                      <div className="number_select contact_number">
                        <div className="country_code" style={{ display: 'none' }}>
                          <span>
                            <Image 
                              src="/images/india.png" 
                              alt="India Flag" 
                              width={20}
                              height={15}
                            />
                          </span>
                          <span>+91</span>
                        </div>
                        <input 
                          className="form-control" 
                          placeholder="Mobile Number*" 
                          id="reference_phone" 
                          name="reference_phone" 
                          type="text" 
                          value={formData.reference_phone}
                          onChange={handleInputChange}
                        />
                        <div className="error error_reference_phone text-danger help-block">
                          <small 
                            className="help-block" 
                            data-fv-validator="notEmpty" 
                            data-fv-for="reference_phone" 
                            data-fv-result="NOT_VALIDATED" 
                            style={{ display: 'none' }}
                          >
                            Please enter phone number.
                          </small>
                          <small 
                            className="help-block" 
                            data-fv-validator="callback" 
                            data-fv-for="reference_phone" 
                            data-fv-result="NOT_VALIDATED" 
                            style={{ display: 'none' }}
                          >
                            Please enter a valid value
                          </small>
                        </div>
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="form_col_12 mb-3">
                      <input 
                        className="form-control" 
                        placeholder="Email Address*" 
                        id="reference_email" 
                        name="reference_email" 
                        type="email" 
                        value={formData.reference_email}
                        onChange={handleInputChange}
                      />
                      <div className="error error_reference_email text-danger help-block">
                        <small 
                          className="help-block" 
                          data-fv-validator="notEmpty" 
                          data-fv-for="reference_email" 
                          data-fv-result="NOT_VALIDATED" 
                          style={{ display: 'none' }}
                        >
                          Please enter email.
                        </small>
                        <small 
                          className="help-block" 
                          data-fv-validator="emailAddress" 
                          data-fv-for="reference_email" 
                          data-fv-result="NOT_VALIDATED" 
                          style={{ display: 'none' }}
                        >
                          Please enter valid email.
                        </small>
                      </div>
                    </div>

                    {/* State Field for Reference */}
                    <div className="form_col_12 mb-3">
                      <select 
                        className="form-control" 
                        id="reference_state" 
                        name="reference_state" 
                        value={formData.reference_state}
                        onChange={handleInputChange}
                      >
                        <option value="">Select State*</option>
                        {statesData.map((state) => (
                          <option key={state._id} value={state._id}>
                            {state.state}
                          </option>
                        ))}
                      </select>
                      <div className="error error_reference_state text-danger help-block">
                        <small 
                          className="help-block" 
                          data-fv-validator="notEmpty" 
                          data-fv-for="reference_state" 
                          data-fv-result="NOT_VALIDATED" 
                          style={{ display: 'none' }}
                        >
                          Please select state.
                        </small>
                      </div>
                    </div>

                    {/* City Field for Reference */}
                    <div className="form_col_12 mb-3">
                      <select 
                        className="form-control" 
                        id="reference_city" 
                        name="reference_city" 
                        value={formData.reference_city}
                        onChange={handleInputChange}
                        disabled={!formData.reference_state}
                      >
                        <option value="">Select City*</option>
                        {referenceCities.map((city) => (
                          <option key={city._id} value={city._id}>
                            {city.district}
                          </option>
                        ))}
                      </select>
                      <div className="error error_reference_city text-danger help-block">
                        <small 
                          className="help-block" 
                          data-fv-validator="notEmpty" 
                          data-fv-for="reference_city" 
                          data-fv-result="NOT_VALIDATED" 
                          style={{ display: 'none' }}
                        >
                          Please select city.
                        </small>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="contact_btn">
                      <button type="submit" className="btn btn-primary" id="referal_form_btn">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="tearm_condition_details">
                <h2>Terms &amp; Conditions</h2>
                <ul>
                  <li>The referral bonus amount is subject to the chosen payment mode of the referee.</li>
                  <li>Referral bonuses will be credited to the referee's account upon confirmation of admission of the referred individual.</li>
                  <li>We retain the right to terminate or alter the referral program at our discretion without prior notification.</li>
                </ul>
              </div>
            </form>
          </div>
        </section>

        <style jsx>{`
         
     
        `}</style>
      </Layout>
    </>
  );
};

export default ReferAndEarn;