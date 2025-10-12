"use client"
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Loader } from '@/utils/Loader';
import { createIndustryExpertTestimonials } from '@/app/api/admin/apiService';

const IndustryExperttestimonialsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    companyname: '',
    linkedinurl: '',
    testimonials: ''
  });
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File',
        text: 'Please select an image file (JPEG/PNG)',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  const handleSubmit = async () => {
    // Required field validation
    if (!formData.name.trim() || !formData.designation.trim() || !formData.companyname.trim() || !formData.linkedinurl.trim() || !formData.testimonials.trim() || !image) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields including profile image',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      
      formDataToSend.append('image', image);

      const result = await createIndustryExpertTestimonials(formDataToSend);

      if (result.status == true) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: result.result.message,
          confirmButtonColor: '#3b82f6'
        });
        // Reset form
        setFormData({
          name: '',
          designation: '',
          companyname: '',
          linkedinurl: '',
          testimonials: ''
        });
        setImage(null);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: result.error || 'Failed to add industry expert',
          confirmButtonColor: '#ef4444'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An unexpected error occurred',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm mb-4">
        <div className="card-body bg-light rounded">
          <div>
            <h1 className="h2 card-title text-dark mb-2">Add Industry Expert Testimonial</h1>
            <p className="text-muted">Add testimonial details for industry experts</p>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row g-3">
            {/* Name Field */}
            <div className="col-12">
              <label className="form-label text-dark mb-2">
                Name*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Expert's full name"
                disabled={isLoading}
                required
                className="form-control"
              />
            </div>
            
            {/* Designation Field */}
            <div className="col-12">
              <label className="form-label text-dark mb-2">
                Designation*
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                placeholder="Current position/role"
                required
                disabled={isLoading}
                className="form-control"
              />
            </div>

            {/* Company Name Field */}
            <div className="col-12">
              <label className="form-label text-dark mb-2">
                Company Name*
              </label>
              <input
                type="text"
                name="companyname"
                value={formData.companyname}
                onChange={handleInputChange}
                placeholder="Company name"
                required
                disabled={isLoading}
                className="form-control"
              />
            </div>

            {/* LinkedIn URL Field */}
            <div className="col-12">
              <label className="form-label text-dark mb-2">
                LinkedIn URL*
              </label>
              <input
                type="text"
                name="linkedinurl"
                value={formData.linkedinurl}
                onChange={handleInputChange}
                placeholder="LinkedIn profile URL"
                required
                disabled={isLoading}
                className="form-control"
              />
            </div>

            {/* Testimonials Field */}
            <div className="col-12">
              <label className="form-label text-dark mb-2">
                Testimonials*
              </label>
              <textarea
                name="testimonials"
                value={formData.testimonials}
                onChange={handleInputChange}
                placeholder="Testimonial content"
                rows="4"
                disabled={isLoading}
                required
                className="form-control"
              />
            </div>

            {/* Image Upload Field */}
            <div className="col-12">
              <label className="form-label text-dark mb-2">
                Profile Image* (JPG/JPEG/PNG/WEBP)
              </label>
              <div className="d-flex align-items-center">
                <label className={`form-control ${image ? 'border-success bg-success bg-opacity-10' : ''} d-flex flex-column align-items-center justify-content-center cursor-pointer`}>
                  <div className="text-center py-3">
                    <i className={`bi bi-person fs-1 mb-2 ${image ? 'text-success' : 'text-primary'}`}></i>
                    <p className="mb-2 text-muted">
                      {image ? image.name : 'Click to upload profile image'}
                    </p>
                    {image && (
                      <p className="text-success small">Image selected</p>
                    )}
                  </div>
                  <input 
                    type="file" 
                    className="d-none"
                    onChange={handleImageChange}
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    required
                    disabled={isLoading}
                  />
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-12">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2"
              >
                {isLoading ? <Loader /> : (
                  <>
                    <i className="bi bi-plus"></i>
                    <span>Add Industry Expert Testimonial</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryExperttestimonialsForm;