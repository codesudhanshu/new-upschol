"use client"
import React, { useState, useEffect } from 'react';
import { Plus, User, MessageCircle, Star, Briefcase, Calendar } from 'lucide-react';
import Swal from 'sweetalert2';
import { createTestimonial } from '@/app/api/admin/apiService';
import { Loader } from '@/utils/Loader';
import { getAllpartnersdata, courseCategoryList, getAllCourses } from '@/app/api/admin/courseapi';

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rating: 5,
    successStory: '',
    workedAt: '',
    admissionOn: '',
    courseCategory: '',
    course: '',
    university: ''
  });
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [allUniversities, setAllUniversities] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch course categories
        const categoriesResponse = await courseCategoryList();
        if (categoriesResponse.success) {
          setCourseCategories(categoriesResponse.data);
        }
        
        // Fetch all courses
        const coursesResponse = await getAllCourses();
        if (coursesResponse.status) {
          setCourses(coursesResponse.result.courses);
        }
        
        // Fetch universities/partners
        const universitiesResponse = await getAllpartnersdata();
        if (universitiesResponse.status) {
          setAllUniversities(universitiesResponse.result.data);
          setFilteredUniversities(universitiesResponse.result.data); // Initially show all universities
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to load dropdown data',
          confirmButtonColor: '#ef4444'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    // Filter courses based on selected category's _id
    if (formData.courseCategory && courses.length > 0) {
      const filtered = courses.filter(
        course => course.courseCategory === formData.courseCategory
      );
      setFilteredCourses(filtered);
      
      // Reset course and university selection when category changes
      setFormData(prev => ({ ...prev, course: '', university: '' }));
    } else {
      setFilteredCourses([]);
      setFormData(prev => ({ ...prev, course: '', university: '' }));
    }
  }, [formData.courseCategory, courses]);

  useEffect(() => {
    // Filter universities based on selected course
    if (formData.course && allUniversities.length > 0) {
      const filtered = allUniversities.filter(university => 
        university.selectedCourses?.some(
          course => course.courseId === formData.course
        )
      );
      setFilteredUniversities(filtered);
      
      // Reset university selection when course changes
      setFormData(prev => ({ ...prev, university: '' }));
    } else {
      setFilteredUniversities(allUniversities);
    }
  }, [formData.course, allUniversities]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.description.trim() || 
        !formData.courseCategory || !formData.course || !formData.university || 
        !image) {
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
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      if (image) {
        formDataToSend.append('image', image);
      }

      const result = await createTestimonial(formDataToSend);

      if (result.status == true) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: result.result.message,
          confirmButtonColor: '#3b82f6'
        });
        setFormData({
          name: '',
          description: '',
          rating: 5,
          successStory: '',
          workedAt: '',
          admissionOn: '',
          courseCategory: '',
          course: '',
          university: ''
        });
        setImage(null);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: result.error || 'Failed to create testimonial',
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Add New Testimonial</h1>
          <p className="text-gray-600">Share inspiring success stories from your students</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-6">
         <div className="grid grid-cols-2 gap-4">
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
                placeholder="Enter name"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400"
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
                <Star className="w-4 h-4 mr-2 text-indigo-600" />
                Rating* (1-5)
              </label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
                <Briefcase className="w-4 h-4 mr-2 text-indigo-600" />
                Course Category*
              </label>
              <select
                name="courseCategory"
                value={formData.courseCategory}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
              >
                <option value="">Select Category</option>
                {courseCategories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
                <Briefcase className="w-4 h-4 mr-2 text-indigo-600" />
                Course*
              </label>
              <select
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                required
                disabled={!formData.courseCategory || filteredCourses.length === 0}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
              >
                <option value="">{filteredCourses.length === 0 ? 'No courses available' : 'Select Course'}</option>
                {filteredCourses.map(course => (
                  <option key={course._id} value={course._id}>
                    {course.courseName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
              Select University*
            </label>
            <select
              name="university"
              value={formData.university}
              onChange={handleInputChange}
              required
              disabled={!formData.course || filteredUniversities.length === 0}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
            >
              <option value="">{
                filteredUniversities.length === 0 
                  ? 'No universities available for this course' 
                  : 'Select University'
              }</option>
              {filteredUniversities.map(univ => (
                <option key={univ._id} value={univ._id}>
                  {univ.universityName}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
                <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                Admission Date
              </label>
              <input
                type="date"
                name="admissionOn"
                value={formData.admissionOn}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
                <Briefcase className="w-4 h-4 mr-2 text-indigo-600" />
                Worked At
              </label>
              <input
                type="text"
                name="workedAt"
                value={formData.workedAt}
                onChange={handleInputChange}
                placeholder="Current company/position"
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <MessageCircle className="w-4 h-4 mr-2 text-indigo-600" />
              Testimonial*
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="What they said..."
              rows="4"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Profile Image*
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-indigo-50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <User className="w-8 h-8 mb-3 text-indigo-500" />
                  <p className="mb-2 text-sm text-gray-600">
                    {image ? image.name : 'Click to upload profile image'}
                  </p>
                </div>
                <input 
                  type="file" 
                  className="hidden"
                  required
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <MessageCircle className="w-4 h-4 mr-2 text-indigo-600" />
              Success Story*
            </label>
            <textarea
              name="successStory"
              value={formData.successStory}
              onChange={handleInputChange}
              placeholder="Detailed success story..."
              rows="4"
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader /> : (
              <>
                <Plus className="w-5 h-5" />
                <span>Add Testimonial</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialForm;