"use client"
import React, { useState } from 'react';
import { Plus, User, Briefcase, Building, Link2, MessageCircle } from 'lucide-react';
import Swal from 'sweetalert2';
import { Loader } from '@/utils/Loader';
import { createIndustryExpertTestimonials } from '@/app/api/admin/apiService';

const IndustryExpertTestimonialsForm = () => {
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
        text: 'Please select an image file (JPEG/PNG/WEBP)',
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
          confirmButtonColor: '#7004e5'
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
          text: result.error || 'Failed to add industry expert testimonial',
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
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Add Industry Expert Testimonial</h1>
          <p className="text-gray-600">Showcase testimonials from industry experts and professionals</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <User className="w-4 h-4 mr-2 text-indigo-600" />
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
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
          
          {/* Designation Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <Briefcase className="w-4 h-4 mr-2 text-indigo-600" />
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
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Company Name Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <Building className="w-4 h-4 mr-2 text-indigo-600" />
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
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* LinkedIn URL Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <Link2 className="w-4 h-4 mr-2 text-indigo-600" />
              LinkedIn URL*
            </label>
            <input
              type="text"
              name="linkedinurl"
              value={formData.linkedinurl}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/in/username"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Testimonials Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <MessageCircle className="w-4 h-4 mr-2 text-indigo-600" />
              Testimonials*
            </label>
            <textarea
              name="testimonials"
              value={formData.testimonials}
              onChange={handleInputChange}
              placeholder="Share the expert's testimonial about your services..."
              rows="4"
              disabled={isLoading}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all resize-vertical disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Image Upload Field */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Profile Image* (JPG/JPEG/PNG/WEBP)
            </label>
            <div className="flex items-center space-x-4">
              <label className={`flex flex-col items-center justify-center w-full h-32 border-2 ${image ? 'border-green-200 bg-green-50' : 'border-dashed border-gray-200 bg-gray-50'} rounded-lg cursor-pointer hover:bg-indigo-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <User className={`w-8 h-8 mb-3 ${image ? 'text-green-500' : 'text-indigo-500'}`} />
                  <p className="mb-2 text-sm text-gray-600">
                    {image ? image.name : 'Click to upload profile image'}
                  </p>
                  {image && (
                    <p className="text-xs text-green-600">Image selected</p>
                  )}
                </div>
                <input 
                  type="file" 
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  required
                  disabled={isLoading}
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader /> : (
              <>
                <Plus className="w-5 h-5" />
                <span>Add Industry Expert Testimonial</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndustryExpertTestimonialsForm;