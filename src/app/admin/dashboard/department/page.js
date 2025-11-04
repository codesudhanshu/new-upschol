"use client";

import { adddepartment, departmentList, getDepartmentById, updatedepartment, deletedepartment } from '@/app/api/admin/courseapi';
import { Plus, Eye, Edit, Trash2, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const DepartmentManagement = () => {
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState('create'); // 'create', 'view', 'edit'
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true,
  });

  // Fetch departments on component mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await departmentList();
      if (response.success) {
        setDepartments(response.data);
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to fetch departments',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      isActive: true,
    });
    setSelectedDepartment(null);
  };

  const openPopup = (type, department = null) => {
    setPopupType(type);
    setSelectedDepartment(department);
    
    if (type === 'edit' && department) {
      setFormData({
        name: department.name,
        description: department.description,
        isActive: department.isActive,
      });
    } else if (type === 'view' && department) {
      setFormData({
        name: department.name,
        description: department.description,
        isActive: department.isActive,
      });
    } else {
      resetForm();
    }
    
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    resetForm();
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
      let response;

      if (popupType === 'create') {
        response = await adddepartment(formData);
      } else if (popupType === 'edit') {
        response = await updatedepartment(selectedDepartment._id, formData);
      }

      if (response.status && response.result) {
        Swal.fire({
          title: 'Success!',
          text: response.result.message || `Department ${popupType === 'create' ? 'created' : 'updated'} successfully`,
          icon: 'success',
          confirmButtonColor: '#3b82f6'
        });
        closePopup();
        fetchDepartments();
      } else {
        throw new Error(response.message || `Failed to ${popupType === 'create' ? 'create' : 'update'} department`);
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message || `Failed to ${popupType === 'create' ? 'create' : 'update'} department`,
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (department) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete "${department.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        const response = await deletedepartment(department._id);

        if (response.status && response.result) {
          Swal.fire({
            title: 'Deleted!',
            text: response.result.message || 'Department deleted successfully',
            icon: 'success',
            confirmButtonColor: '#3b82f6'
          });
          fetchDepartments();
        } else {
          throw new Error(response.message || 'Failed to delete department');
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: error.message || 'Failed to delete department',
          icon: 'error',
          confirmButtonColor: '#ef4444'
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const getPopupTitle = () => {
    switch (popupType) {
      case 'create': return 'Add New Department';
      case 'view': return 'Department Details';
      case 'edit': return 'Edit Department';
      default: return 'Department';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Department Management</h1>
              <p className="text-gray-600 text-lg">
                Manage your organization departments efficiently
              </p>
            </div>
            <button
              onClick={() => openPopup('create')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={loading}
            >
              <Plus className="w-5 h-5" />
              <span>Add New Department</span>
            </button>
          </div>
        </div>

        {/* Departments Table */}
        <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                <tr>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                    Department Name
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                    Description
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                    Status
                  </th>
                  <th className="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {departments.map((department, index) => (
                  <tr 
                    key={department._id} 
                    className="hover:bg-blue-50/50 transition-colors duration-200"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                        <div className="text-sm font-semibold text-gray-900">{department.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-md">
                        {department.description || (
                          <span className="text-gray-400 italic">No description provided</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        department.isActive 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${
                          department.isActive ? 'bg-green-500' : 'bg-red-500'
                        }`}></span>
                        {department.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => openPopup('view', department)}
                          className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                          disabled={loading}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openPopup('edit', department)}
                          className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                          disabled={loading}
                          title="Edit Department"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(department)}
                          className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                          disabled={loading}
                          title="Delete Department"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {departments.length === 0 && !loading && (
          <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-12 text-center mt-8">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Departments Found</h3>
              <p className="text-gray-500 mb-6">Get started by creating your first department</p>
              <button
                onClick={() => openPopup('create')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-300"
              >
                Create First Department
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Popup Overlay */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          {/* Popup Container */}
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl transform animate-scaleIn">
            {/* Popup Header */}
            <div className="flex justify-between items-center p-8 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800">{getPopupTitle()}</h2>
              <button
                onClick={closePopup}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Popup Content */}
            <form onSubmit={handleSubmit} className="p-8">
              {/* Department Name */}
              <div className="mb-8">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                  Department Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-400 transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter department name"
                  disabled={loading || popupType === 'view'}
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-8">
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-400 transition-all duration-300 resize-vertical disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter department description"
                  disabled={loading || popupType === 'view'}
                />
              </div>

              {/* Active Checkbox */}
              <div className="mb-8">
                <div className="flex items-center">
                  <input
                    id="isActive"
                    name="isActive"
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-indigo-600 focus:ring-2 focus:ring-indigo-500 border-2 border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200"
                    disabled={loading || popupType === 'view'}
                  />
                  <label htmlFor="isActive" className="ml-3 block text-sm font-medium text-gray-700">
                    Mark as Active Department
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              {popupType !== 'view' && (
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={closePopup}
                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-semibold"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl flex items-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        <span>{popupType === 'create' ? 'Create' : 'Update'} Department</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* View Only Close Button */}
              {popupType === 'view' && (
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={closePopup}
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    Close
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DepartmentManagement;