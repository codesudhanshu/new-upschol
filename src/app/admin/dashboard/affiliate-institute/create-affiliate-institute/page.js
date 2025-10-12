"use client"
import React, { useState } from 'react';
import { Plus, FileText, Award, FileImage } from 'lucide-react';
import Swal from 'sweetalert2';
import { Loader } from '@/utils/Loader';
import { createApproval } from '@/app/api/admin/apiService';

const ApprovalForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
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

  const handleSubmit = async () => {
    if (!formData.title.trim() || !image) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields and upload an image',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image', image);

      const result = await createApproval(formDataToSend);

      if (result.status == true) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: result.result.message,
          confirmButtonColor: '#3b82f6'
        });
        setFormData({ title: '', description: '' });
        setImage(null);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: result.error || 'Failed to add approval',
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Add New Affiliated Institutuion</h1>
          <p className="text-gray-600">Add new affiliated institutuion that assiciate with institute</p>
        </div>
      </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
                <Award className="w-4 h-4 mr-2 text-indigo-600" />
                Affiliated Institutuion Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Affiliated Institutuion Name"
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
                <FileText className="w-4 h-4 mr-2 text-indigo-600" />
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Details about the approval"
                rows="4"
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all resize-vertical disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Affiliated Institutuion Image
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer bg-gray-50 hover:bg-indigo-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileImage className="w-8 h-8 mb-3 text-indigo-500" />
                    <p className="mb-2 text-sm text-gray-600">
                      {image ? image.name : 'Click to upload Affiliated Institutuion image'}
                    </p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden"
                    onChange={(e) => setImage(e.target.files[0])}
                    disabled={isLoading}
                  />
                </label>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader /> : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>Add Affiliated Institutuion</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
  );
};

export default ApprovalForm;