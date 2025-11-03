"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FileText, MessageCircle, Award, GraduationCap, DollarSign, Clock, Save, ArrowLeft } from 'lucide-react';
import Swal from 'sweetalert2';
import { Loader } from '@/utils/Loader';
import { getjobById, updatejob } from '@/app/api/admin/apiService';

const EditJob = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    experience: '',
    qualification: '',
    budget: '',
    noticePeriod: '',
    status: 'active'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Fetch job data
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setIsFetching(true);
        const response = await getjobById(id);
        if (response.status === true) {
          const job = response.result.job;
          setFormData({
            title: job.title || '',
            description: job.description || '',
            experience: job.experience || '',
            qualification: job.qualification || '',
            budget: job.budget || '',
            noticePeriod: job.noticePeriod || '',
            status: job.status || 'active'
          });
        }
      } catch (error) {
        console.error('Error fetching job:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to load job data',
          confirmButtonColor: '#ef4444'
        });
      } finally {
        setIsFetching(false);
      }
    };

    if (id) {
      fetchJobData();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim() || !formData.experience.trim() || 
        !formData.qualification.trim() || !formData.budget.trim() || !formData.noticePeriod.trim()) {
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
      const result = await updatejob(id, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        experience: formData.experience.trim(),
        qualification: formData.qualification.trim(),
        budget: formData.budget.trim(),
        noticePeriod: formData.noticePeriod.trim(),
        status: formData.status
      });

      if (result.status === true) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Job updated successfully',
          confirmButtonColor: '#3b82f6'
        });
        router.push('/admin/dashboard/careers');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: result.error || 'Failed to update job',
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Job</h1>
            <p className="text-gray-600">Update job posting details</p>
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
          {/* Job Title */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <FileText className="h-4 w-4 mr-2 text-indigo-600" />
              Job Title*
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter the Job title"
              disabled={isLoading}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <MessageCircle className="h-4 w-4 mr-2 text-indigo-600" />
              Description*
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter the detailed job description"
              rows="5"
              disabled={isLoading}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all resize-vertical disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <Award className="h-4 w-4 mr-2 text-indigo-600" />
              Experience*
            </label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="Enter required experience (e.g., 2-5 years)"
              disabled={isLoading}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Qualification */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <GraduationCap className="h-4 w-4 mr-2 text-indigo-600" />
              Qualification*
            </label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleInputChange}
              placeholder="Enter required qualification (e.g., Bachelor's degree in Computer Science)"
              disabled={isLoading}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <DollarSign className="h-4 w-4 mr-2 text-indigo-600" />
              Budget*
            </label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="Enter budget range (e.g., $50,000 - $70,000)"
              disabled={isLoading}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Notice Period */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <Clock className="h-4 w-4 mr-2 text-indigo-600" />
              Notice Period*
            </label>
            <input
              type="text"
              name="noticePeriod"
              value={formData.noticePeriod}
              onChange={handleInputChange}
              placeholder="Enter notice period (e.g., 30 days, Immediate)"
              disabled={isLoading}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Status */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="closed">Closed</option>
            </select>
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
                  <span>Update Job</span>
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

export default EditJob;