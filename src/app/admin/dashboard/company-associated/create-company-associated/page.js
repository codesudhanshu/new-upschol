"use client";
import React, { useState, useEffect } from 'react';
import { BookOpen, FileText, GraduationCap, Plus, Calendar } from 'lucide-react';
import Swal from 'sweetalert2';
import { courseCategoryList, addcourse } from '../../../../api/admin/courseapi';
import { Loader, PageLoader } from '../../../../../utils/Loader';

export default function CourseCreateForm() {
  const [formData, setFormData] = useState({
    courseName: '',
    courseDescription: '',
    courseCategory: '',
    duration: '',
    prerequisites: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await courseCategoryList();
        
        if (result.status === true) {
          setCourseCategories(result.result?.data || []);
        } else {
          throw new Error(result.error || 'Failed to load course categories');
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error.message,
          confirmButtonColor: '#ef4444'
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = [];
    if (!formData.courseName.trim()) errors.push('Course Name');
    if (!formData.courseDescription.trim()) errors.push('Course Description');
    if (!formData.courseCategory) errors.push('Course Category');

    if (errors.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        html: `Please fill in: <strong>${errors.join(', ')}</strong>`,
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await addcourse({
        name: formData.courseName.trim(),
        description: formData.courseDescription.trim(),
        category: formData.courseCategory,
        prerequisites: formData.prerequisites.trim(),
        duration: formData.duration.trim(),
      });

      if (result.status === true) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: result.result.message,
          confirmButtonColor: '#3b82f6'
        });
        setFormData({
          courseName: '',
          courseDescription: '',
          courseCategory: '',
          duration: '',
          prerequisites: '',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: result.error || 'Failed to create course',
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
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      courseName: '',
      courseDescription: '',
      courseCategory: '',
      duration: '',
      prerequisites: '',
    });
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Course</h1>
            <p className="text-gray-600">Create New Course for your website</p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                <BookOpen className="h-4 w-4 mr-2 text-indigo-600" />
                Course Name *
              </label>
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all"
                placeholder="e.g., BTech"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                <GraduationCap className="h-4 w-4 mr-2 text-indigo-600" />
                Course Category *
              </label>
              <select
                name="courseCategory"
                value={formData.courseCategory}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                required
              >
                <option value="">Select Category</option>
                {courseCategories.map(category => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
              <FileText className="h-4 w-4 mr-2 text-indigo-600" />
              Course Description *
            </label>
            <textarea
              name="courseDescription"
              value={formData.courseDescription}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
              placeholder="Provide a detailed description of the course..."
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
              <Calendar className="h-4 w-4 mr-2 text-indigo-600" />
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
              placeholder="e.g., 4 years or 6 months"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
              <FileText className="h-4 w-4 mr-2 text-indigo-600" />
              Prerequisites
            </label>
            <textarea
              name="prerequisites"
              value={formData.prerequisites}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
              placeholder="List any prerequisite courses or requirements..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader size={4} color="border-white" />
                  <span className="ml-2">Creating...</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Course
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Reset Form
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}