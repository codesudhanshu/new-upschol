"use client";

import { adddepartment } from '@/app/api/admin/courseapi';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const DepartmentManagement = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    subCourses: []
  });

  const [newSubCourse, setNewSubCourse] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSubCourse = () => {
    if (newSubCourse.trim()) {
      setFormData(prev => ({
        ...prev,
        subCourses: [...prev.subCourses, newSubCourse.trim()]
      }));
      setNewSubCourse('');
    }
  };

  const removeSubCourse = (index) => {
    setFormData(prev => ({
      ...prev,
      subCourses: prev.subCourses.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Department name is required',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    try {
      setLoading(true);
      
      const payload = {
        ...formData
      };

      const response = await adddepartment(payload);
      
      if (response.status && response.result) {
        Swal.fire({
          title: 'Success!',
          text: response.result.message || 'Department created successfully',
          icon: 'success',
          confirmButtonColor: '#3b82f6'
        });
        setFormData({ name: '', description: '', subCourses: [] });
        setShowModal(false);
      } else {
        throw new Error(response.message || 'Failed to create department');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to create department',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-8 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Department Management</h2>
            <p className="text-gray-600 mt-1">Manage your organization departments and their sub-courses</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 disabled:cursor-not-allowed"
            disabled={loading}
          >
            <Plus className="w-5 h-5" />
            <span>Add Department</span>
          </button>
        </div>
      </div>

      {showModal && (
        <div className="bg-black bg-opacity-5 flex items-center justify-center z-50 " style={{marginTop: "-10em"}}>
          <div className="bg-white rounded-xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Add New Department
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
                disabled={loading}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-2">
                  Department Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter department name"
                  disabled={loading}
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-800 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all resize-vertical disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter department description"
                  disabled={loading}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Sub Courses
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newSubCourse}
                    onChange={(e) => setNewSubCourse(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter sub course name"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={addSubCourse}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-3 rounded-lg transition-colors disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    Add
                  </button>
                </div>
                
                {formData.subCourses.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.subCourses.map((course, index) => (
                      <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                        {course}
                        <button
                          type="button"
                          onClick={() => removeSubCourse(index)}
                          className="text-indigo-600 hover:text-indigo-800 disabled:text-indigo-400 disabled:cursor-not-allowed"
                          disabled={loading}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border border-gray-200 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating...' : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>Create Department</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default DepartmentManagement;