"use client"
import React, { useState } from 'react';
import { Plus, FileText, MessageCircle } from 'lucide-react';
import Swal from 'sweetalert2';
import { createFAQ } from '@/app/api/admin/faqapi';
import { Loader } from '@/utils/Loader';

const FAQForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showSuccessAlert = (title, message) => {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonColor: '#3b82f6',
      confirmButtonText: 'OK'
    });
  };

  const showErrorAlert = (title, message) => {
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'OK'
    });
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      showErrorAlert('Validation Error', 'Please fill in both title and description fields.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await createFAQ({
        title: formData.title.trim(),
        description: formData.description.trim()
      });

      if (result.status === true && result.error === null) {
        showSuccessAlert('Success!', 'FAQ has been created successfully.');
        setFormData({ title: '', description: '' });
      } else {
        const errorMessage = result.error || 'Something went wrong';
        showErrorAlert('Error!', errorMessage);
      }
    } catch (error) {
      showErrorAlert('Error!', 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New FAQ</h1>
          <p className="text-gray-600">Add a new frequently asked question to help your users</p>
        </div>
      </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
                <FileText className="h-4 w-4 mr-2 text-indigo-600" />
                FAQ Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter the FAQ title"
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
                <MessageCircle className="h-4 w-4 mr-2 text-indigo-600" />
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter the detailed answer or description"
                rows="5"
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all resize-vertical disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  <span>Create FAQ</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-indigo-800">Quick Tip</h3>
              <p className="mt-1 text-sm text-indigo-700">
                Make sure your FAQ title is clear and descriptive, and provide a comprehensive answer in the description field.
              </p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default FAQForm;