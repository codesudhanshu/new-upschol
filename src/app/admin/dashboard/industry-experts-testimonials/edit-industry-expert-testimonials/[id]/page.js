"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { User, Briefcase, Building, Link2, MessageCircle, Save, ArrowLeft } from 'lucide-react';
import Swal from 'sweetalert2';
import { Loader } from '@/utils/Loader';
import { getIndustryExpertByIdTestimonials, updateIndustryExpertTestimonials } from '@/app/api/admin/apiService';

const EditIndustryExpertTestimonials = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    companyname: '',
    linkedinurl: '',
    testimonials: ''
  });
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Fetch expert testimonial data
  useEffect(() => {
    const fetchExpertData = async () => {
      try {
        setIsFetching(true);
        const response = await getIndustryExpertByIdTestimonials(id);
        if (response.status === true) {
          const expert = response.result.expert;
          setFormData({
            name: expert.name || '',
            designation: expert.designation || '',
            companyname: expert.companyname || '',
            linkedinurl: expert.linkedinurl || '',
            testimonials: expert.testimonials || ''
          });
          setCurrentImage(expert.image || '');
        }
      } catch (error) {
        console.error('Error fetching expert testimonial:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to load expert testimonial data',
          confirmButtonColor: '#ef4444'
        });
      } finally {
        setIsFetching(false);
      }
    };

    if (id) {
      fetchExpertData();
    }
  }, [id]);

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
    if (!formData.name.trim() || !formData.designation.trim() || 
        !formData.companyname.trim() || !formData.linkedinurl.trim() || 
        !formData.testimonials.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields',
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
      
      if (image) {
        formDataToSend.append('image', image);
      }

      const result = await updateIndustryExpertTestimonials(id, formDataToSend);

      if (result.status === true) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Industry expert testimonial updated successfully',
          confirmButtonColor: '#3b82f6'
        });
        router.push('/admin/dashboard/industry-experts-testimonials');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: result.error || 'Failed to update industry expert testimonial',
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

  if (isFetching) {
    return (
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Industry Expert Testimonial</h1>
            <p className="text-gray-600">Update expert testimonial details</p>
          </div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
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
              placeholder="LinkedIn profile URL"
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
              placeholder="Testimonial content"
              rows="4"
              disabled={isLoading}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all resize-vertical disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Image Upload Field */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Profile Image (JPG/JPEG/PNG/WEBP)
            </label>
            
            {/* Current Image Preview */}
            {currentImage && !image && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                <img
                  src={currentImage}
                  alt="Current profile"
                  className="w-20 h-20 object-cover rounded-full border border-gray-200"
                />
              </div>
            )}

            {/* New Image Upload */}
            <div className="flex items-center space-x-4">
              <label className={`flex flex-col items-center justify-center w-full h-32 border-2 ${image ? 'border-green-200 bg-green-50' : 'border-dashed border-gray-200 bg-gray-50'} rounded-lg cursor-pointer hover:bg-indigo-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <User className={`w-8 h-8 mb-3 ${image ? 'text-green-500' : 'text-indigo-500'}`} />
                  <p className="mb-2 text-sm text-gray-600">
                    {image ? image.name : 'Click to upload new profile image'}
                  </p>
                  <p className="text-xs text-gray-500">(Leave empty to keep current image)</p>
                </div>
                <input 
                  type="file" 
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  disabled={isLoading}
                />
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader /> : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Update Testimonial</span>
                </>
              )}
            </button>
            
            <button
              onClick={() => router.back()}
              disabled={isLoading}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditIndustryExpertTestimonials;