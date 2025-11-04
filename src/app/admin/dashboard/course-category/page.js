"use client";

import { addcoursecatgory, getCourseCategories, updateCourseCategory, deleteCourseCategory } from '@/app/api/admin/courseapi';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Plus, Edit, Trash2, Power, X } from 'lucide-react';
import { Loader } from '@/utils/Loader';

const CourseCategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true
  });

  // Load categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getCourseCategories();
      
      if (response.success) {
        // Instant update ke liye direct setCategories
        setCategories(response.data || []);
      } else {
        throw new Error('Failed to fetch categories');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to fetch course categories',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Category name is required',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      let response;
      if (editMode) {
        response = await updateCourseCategory(currentCategory._id, formData);
      } else {
        response = await addcoursecatgory(formData);
      }
      
      if (response.status && response.result) {
        // INSTANT DATA UPDATE - Direct state update
        if (editMode) {
          // Update existing category in state
          setCategories(prev => prev.map(cat => 
            cat._id === currentCategory._id 
              ? { ...cat, ...formData, updatedAt: new Date().toISOString() }
              : cat
          ));
        } else {
          // Add new category to state (temporary until refresh)
          const newCategory = {
            _id: Date.now().toString(), // Temporary ID
            ...formData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          setCategories(prev => [newCategory, ...prev]);
        }
        
        Swal.fire({
          title: 'Success!',
          text: response.result.message || `Course category ${editMode ? 'updated' : 'created'} successfully`,
          icon: 'success',
          confirmButtonColor: '#3b82f6',
          timer: 1500,
          showConfirmButton: false
        });

        // Close popup and refresh data
        setShowPopup(false);
        
        // Background mein data refresh karo for consistency
        setTimeout(() => {
          fetchCategories();
        }, 1000);
        
      } else {
        throw new Error(response.result?.message || `Failed to ${editMode ? 'update' : 'create'} course category`);
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message || `Failed to ${editMode ? 'update' : 'create'} course category`,
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openCreatePopup = () => {
    setFormData({ name: '', description: '', isActive: true });
    setEditMode(false);
    setCurrentCategory(null);
    setShowPopup(true);
  };

  const openEditPopup = (category) => {
    setFormData({
      name: category.name,
      description: category.description || '',
      isActive: category.isActive
    });
    setEditMode(true);
    setCurrentCategory(category);
    setShowPopup(true);
  };

  const toggleCategoryStatus = async (categoryId, currentStatus) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to ${currentStatus ? 'deactivate' : 'activate'} this category?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#ef4444',
        confirmButtonText: `Yes, ${currentStatus ? 'deactivate' : 'activate'} it!`
      });

      if (result.isConfirmed) {
        // INSTANT UPDATE - Pehle UI update karo
        setCategories(prev => prev.map(cat => 
          cat._id === categoryId 
            ? { ...cat, isActive: !currentStatus }
            : cat
        ));

        const response = await updateCourseCategory(categoryId, { isActive: !currentStatus });
        
        if (response.status && response.result) {
          Swal.fire({
            title: 'Success!',
            text: `Category ${currentStatus ? 'deactivated' : 'activated'} successfully`,
            icon: 'success',
            confirmButtonColor: '#3b82f6',
            timer: 1500,
            showConfirmButton: false
          });
          
          // Background refresh for consistency
          setTimeout(() => {
            fetchCategories();
          }, 1000);
        }
      }
    } catch (error) {
      // Rollback on error
      setCategories(prev => prev.map(cat => 
        cat._id === categoryId 
          ? { ...cat, isActive: currentStatus }
          : cat
      ));
      
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to update category status',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  const handleDeleteCategory = async (categoryId, categoryName) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `You are about to delete "${categoryName}". This action cannot be undone!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      });

      if (result.isConfirmed) {
        // INSTANT DELETE - Pehle UI se remove karo
        setCategories(prev => prev.filter(cat => cat._id !== categoryId));

        const response = await deleteCourseCategory(categoryId);
        
        if (response.status && response.result) {
          Swal.fire({
            title: 'Deleted!',
            text: response.result.message || 'Category deleted successfully',
            icon: 'success',
            confirmButtonColor: '#3b82f6',
            timer: 1500,
            showConfirmButton: false
          });
          
          // Background refresh
          setTimeout(() => {
            fetchCategories();
          }, 1000);
        }
      }
    } catch (error) {
      // Rollback on error - data phir se fetch karo
      fetchCategories();
      
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to delete category',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Degree Management</h1>
          <p className="text-gray-600">Manage your course categories</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Category Overview</h2>
              <p className="text-gray-600 mt-1">View and manage all course categories</p>
            </div>
            <button
              onClick={openCreatePopup}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              disabled={loading}
            >
              <Plus className="w-5 h-5" />
              <span>Add Category</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-100 rounded-md">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7l2 2-2 2M5 13l2-2-2-2" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Categories</p>
                  <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-md">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Categories</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {categories.filter(cat => cat.isActive).length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-md">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Inactive Categories</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {categories.filter(cat => !cat.isActive).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900">
                All Categories ({categories.length})
              </h3>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader />
                <span className="ml-2 text-gray-600">Loading categories...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categories.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                          <div className="flex flex-col items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
                            </svg>
                            <p className="text-lg font-medium text-gray-900 mb-2">No categories found</p>
                            <p className="text-gray-600 mb-4">Create your first category to get started</p>
                            <button
                              onClick={openCreatePopup}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                            >
                              <Plus className="w-4 h-4" />
                              <span>Add Category</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      categories.map((category) => (
                        <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{category.name}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 max-w-xs">
                              {category.description || 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                              {category.code || 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              category.isActive ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
                            }`}>
                              {category.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {category.createdAt ? new Date(category.createdAt).toLocaleDateString('en-IN') : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => openEditPopup(category)}
                                className="text-indigo-600 hover:text-indigo-900 flex items-center space-x-1 transition-colors bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                                <span>Edit</span>
                              </button>
                              
                              <button
                                onClick={() => toggleCategoryStatus(category._id, category.isActive)}
                                className={`flex items-center space-x-1 transition-colors px-3 py-2 rounded-lg ${
                                  category.isActive 
                                    ? 'text-yellow-600 hover:text-yellow-900 bg-yellow-50 hover:bg-yellow-100' 
                                    : 'text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100'
                                }`}
                                title={category.isActive ? 'Deactivate' : 'Activate'}
                              >
                                <Power className="w-4 h-4" />
                                <span>{category.isActive ? 'Deactivate' : 'Activate'}</span>
                              </button>
                              
                              <button
                                onClick={() => handleDeleteCategory(category._id, category.name)}
                                className="text-red-600 hover:text-red-900 flex items-center space-x-1 transition-colors bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* POPUP instead of Modal */}
          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100">
                {/* Popup Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-t-2xl">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editMode ? 'Edit Course Category' : 'Add New Course Category'}
                  </h2>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Popup Content */}
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-2">
                        Category Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed shadow-sm"
                        placeholder="Enter category name"
                        disabled={isSubmitting}
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 placeholder-gray-400 transition-all resize-vertical disabled:bg-gray-100 disabled:cursor-not-allowed shadow-sm"
                        placeholder="Enter category description"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center">
                        <input
                          id="isActive"
                          name="isActive"
                          type="checkbox"
                          checked={formData.isActive}
                          onChange={handleInputChange}
                          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
                          disabled={isSubmitting}
                        />
                        <label htmlFor="isActive" className="ml-3 block text-sm font-medium text-gray-900">
                          Active Category
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => setShowPopup(false)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm font-medium"
                        disabled={isSubmitting}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 disabled:cursor-not-allowed shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200"
                      >
                        {isSubmitting ? <Loader /> : (
                          <>
                            {editMode ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                            <span>{editMode ? 'Update Category' : 'Create Category'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCategoryManagement;