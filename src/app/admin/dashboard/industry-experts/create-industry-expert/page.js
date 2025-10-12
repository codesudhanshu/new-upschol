"use client"
import React, { useState } from 'react';
import { Plus, User, Briefcase, Award, BookOpen, Clock, Star, Users } from 'lucide-react';
import Swal from 'sweetalert2';
import { Loader } from '@/utils/Loader';
import { createIndustryExpert } from '@/app/api/admin/apiService';

const IndustryExpertForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    expertIn: '',
    description: '',
    experience: '',
    highestDegree: '',
    ratingWhole: '4',
    ratingDecimal: '5',
    counselingCount: ''
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

  const handleNumberInput = (e) => {
    const { name, value } = e.target;
    // Only allow numbers
    if (value === '' || /^[0-9]+$/.test(value)) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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
    if (!formData.designation.trim() || !formData.expertIn.trim() || !image) {
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
      // Combine rating parts before submission
      const completeRating = `${formData.ratingWhole}.${formData.ratingDecimal}`;
      
      const formDataToSend = new FormData();
      Object.entries({
        ...formData,
        rating: completeRating
      }).forEach(([key, value]) => {
        if (key !== 'ratingWhole' && key !== 'ratingDecimal') {
          formDataToSend.append(key, value);
        }
      });
      
      formDataToSend.append('image', image);

      const result = await createIndustryExpert(formDataToSend);

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
          expertIn: '',
          description: '',
          experience: '',
          highestDegree: '',
          ratingWhole: '4',
          ratingDecimal: '5',
          counselingCount: ''
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
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Add Industry Expert</h1>
          <p className="text-gray-600">Showcase your industry experts and their qualifications</p>
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

          {/* Highest Degree Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <Award className="w-4 h-4 mr-2 text-indigo-600" />
              Highest Degree*
            </label>
            <input
              type="text"
              name="highestDegree"
              value={formData.highestDegree}
              onChange={handleInputChange}
              placeholder="Highest qualification"
              disabled={isLoading}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Expert In Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <Award className="w-4 h-4 mr-2 text-indigo-600" />
              Expert In*
            </label>
            <input
              type="text"
              name="expertIn"
              value={formData.expertIn}
              onChange={handleInputChange}
              placeholder="Area of expertise"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <BookOpen className="w-4 h-4 mr-2 text-indigo-600" />
              Description*
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="About the expert"
              rows="4"
              disabled={isLoading}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all resize-vertical disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Experience Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <Clock className="w-4 h-4 mr-2 text-indigo-600" />
              Experience (years)*
            </label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleNumberInput}
              placeholder="Numbers only (e.g. 5)"
              disabled={isLoading}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Rating Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <Star className="w-4 h-4 mr-2 text-indigo-600" />
              Rating*
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <select
                  name="ratingWhole"
                  value={formData.ratingWhole}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <span className="text-gray-500">.</span>
                <select
                  name="ratingDecimal"
                  value={formData.ratingDecimal}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <div className="text-gray-700">
                Current rating: {formData.ratingWhole}.{formData.ratingDecimal}
              </div>
            </div>
          </div>

          {/* Counseling Count Field */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <Users className="w-4 h-4 mr-2 text-indigo-600" />
              Number of Counseling Sessions*
            </label>
            <input
              type="text"
              name="counselingCount"
              value={formData.counselingCount}
              onChange={handleNumberInput}
              placeholder="Numbers only (e.g. 50)"
              disabled={isLoading}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                <span>Add Industry Expert</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndustryExpertForm;