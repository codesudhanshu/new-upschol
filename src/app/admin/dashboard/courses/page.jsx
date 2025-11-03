"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, BookOpen, Calendar, GraduationCap } from 'lucide-react';
import Swal from 'sweetalert2';
import { getAllCourses, deleteCourse } from '@/app/api/admin/courseapi';
import { Loader } from '@/utils/Loader';

const CoursesSection = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showViewPopup, setShowViewPopup] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const response = await getAllCourses();
      
      if (response && response.result && response.result.courses) {
        setCourses(response.result.courses);
      } else {
        throw new Error('Failed to load courses');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to load courses',
        confirmButtonColor: '#3b82f6'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (courseId, courseName) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete "${courseName}". This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const swalInstance = Swal.fire({
          title: 'Deleting Course',
          html: 'Please wait...',
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading()
        });

        const response = await deleteCourse(courseId);
        await swalInstance.close();

        if (response && response.message) {
          await Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: response.message,
            confirmButtonColor: '#3b82f6',
            timer: 3000
          });
          
          // Refresh the courses list
          fetchCourses();
        } else {
          throw new Error('Failed to delete course');
        }
      } catch (error) {
        console.error('Delete error:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Failed to delete course',
          confirmButtonColor: '#3b82f6'
        });
      }
    }
  };

  const handleView = (course) => {
    setSelectedCourse(course);
    setShowViewPopup(true);
  };

  const closePopup = () => {
    setSelectedCourse(null);
    setShowViewPopup(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Courses</h1>
            <p className="text-gray-600">Manage all courses on your website</p>
            <p className="text-sm text-gray-500 mt-1">
              Total Courses: <span className="font-semibold">{courses.length}</span>
            </p>
          </div>
          <Link href="/admin/dashboard/courses/create-course">
            <button
              className="flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 text-white shadow-lg transform hover:scale-[1.02]"
              style={{ background: '#6941c6' }}
            >
              <Plus className="w-5 h-5 mr-2" />Add Course
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Courses Found</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first course</p>
            <Link href="/admin/dashboard/courses/create-course">
              <button
                className="flex items-center px-4 py-2 rounded-lg text-white mx-auto"
                style={{ background: '#6941c6' }}
              >
                <Plus className="w-4 h-4 mr-2" />Create First Course
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course._id} className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{course.courseName}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(course)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <Link href={`/admin/dashboard/courses/edit-course/${course._id}`}>
                      <button
                        className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Edit Course"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(course._id, course.courseName)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete Course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    <span>{course.courseCategory}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{course.duration || 'Not specified'}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {course.courseDescription}
                  </p>
                  
                  {course.prerequisites && (
                    <div className="text-xs text-gray-500">
                      <strong>Prerequisites:</strong> {course.prerequisites}
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                  Created: {new Date(course.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Course Details Popup */}
      {showViewPopup && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-t-xl p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Course Details</h2>
                <button
                  onClick={closePopup}
                  className="p-2 hover:bg-white rounded-lg transition-colors text-gray-600 hover:text-gray-800"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Course Name
                  </label>
                  <p className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 text-gray-900">
                    {selectedCourse.courseName}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Category
                  </label>
                  <p className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 text-gray-900">
                    {selectedCourse.courseCategory}
                  </p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Description
                </label>
                <p className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 text-gray-900 min-h-[100px] whitespace-pre-wrap">
                  {selectedCourse.courseDescription}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Duration
                  </label>
                  <p className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 text-gray-900">
                    {selectedCourse.duration || 'Not specified'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Prerequisites
                  </label>
                  <p className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 text-gray-900">
                    {selectedCourse.prerequisites || 'None'}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
                <div>
                  <strong>Created:</strong> {new Date(selectedCourse.createdAt).toLocaleString()}
                </div>
                <div>
                  <strong>Last Updated:</strong> {new Date(selectedCourse.updatedAt).toLocaleString()}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 p-6 border-t border-gray-200">
              <Link href={`/admin/dashboard/courses/edit-course/${selectedCourse._id}`}>
                <button
                  className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Edit Course
                </button>
              </Link>
              <button
                onClick={closePopup}
                className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesSection;