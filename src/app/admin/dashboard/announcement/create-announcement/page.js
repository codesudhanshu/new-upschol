"use client"
import React, { useState } from 'react';
import { Plus, Building2, FileText, User } from 'lucide-react';
import Swal from 'sweetalert2';
import { Loader } from '@/utils/Loader';
import { createAnnouncement } from '@/app/api/admin/apiService';

const AnnouncementForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    status: 'active'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle status change
  const handleStatusChange = (value) => {
    setFormData(prev => ({
      ...prev,
      status: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in the title field',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    setIsLoading(true);

    try {
      // Send as JSON object instead of FormData
      const dataToSend = {
        title: formData.title,
        status: formData.status
      };
      
      console.log('Data to send:', dataToSend);
      
      const result = await createAnnouncement(dataToSend);

      if (result.status == true) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: result.result.message,
          confirmButtonColor: '#3b82f6'
        });
        setFormData({ title: '', status: 'active' });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: result.error || 'Failed to add Announcement',
          confirmButtonColor: '#ef4444'
        });
      }
    } catch (error) {
      console.error('Submit error:', error);
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Add Leading Announcement</h1>
          <p className="text-gray-600">Add a Announcement in the Website</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <User className="w-4 h-4 mr-2 text-indigo-600" />
              Announcement title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Announcement name"
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <Building2 className="w-4 h-4 mr-2 text-indigo-600" />
              Announcement Status
            </label>
            <select 
              value={formData.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              <option value="active">Active</option>
              <option value="blocked">Block</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader /> : (
              <>
                <Plus className="w-5 h-5" />
                <span>Add Announcement</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementForm;