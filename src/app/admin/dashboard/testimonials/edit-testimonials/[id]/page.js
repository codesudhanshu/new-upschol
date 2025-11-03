"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { User, MessageCircle, Star, Briefcase, Calendar, Building2, Save, ArrowLeft } from 'lucide-react';
import Swal from 'sweetalert2';
import { Loader } from '@/utils/Loader';
import { getTestimonialById, updateTestimonial } from '@/app/api/admin/apiService';
import { getAllpartnersdata, courseCategoryList, getAllCourses } from '@/app/api/admin/courseapi';

const EditTestimonials = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

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
  const [currentImage, setCurrentImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [courseCategories, setCourseCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [allUniversities, setAllUniversities] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);

  // Fetch testimonial data and dropdown data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true);
        
        // Fetch testimonial data
        const testimonialResponse = await getTestimonialById(id);
        if (testimonialResponse.status === true) {
          const testimonial = testimonialResponse.result.testimonial;
          setFormData({
            name: testimonial.name || '',
            description: testimonial.description || '',
            rating: testimonial.rating || 5,
            successStory: testimonial.successStory || '',
            workedAt: testimonial.workedAt || '',
            admissionOn: testimonial.admissionOn || '',
            courseCategory: testimonial.courseCategory || '',
            course: testimonial.course || '',
            university: testimonial.university || ''
          });
          setCurrentImage(testimonial.image || '');
        }

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
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to load data',
          confirmButtonColor: '#ef4444'
        });
      } finally {
        setIsFetching(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    // Filter courses based on selected category's _id
    if (formData.courseCategory && courses.length > 0) {
      const filtered = courses.filter(
        course => course.courseCategory === formData.courseCategory
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses([]);
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
        !formData.courseCategory || !formData.course || !formData.university) {
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

      const result = await updateTestimonial(id, formDataToSend);

      if (result.status === true) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Testimonial updated successfully',
          confirmButtonColor: '#3b82f6'
        });
        router.push('/admin/dashboard/testimonials');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: result.error || 'Failed to update testimonial',
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Testimonial</h1>
            <p className="text-gray-600">Update testimonial details</p>
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
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                disabled={!formData.courseCategory || filteredCourses.length === 0 || isLoading}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
              <Building2 className="w-4 h-4 mr-2 text-indigo-600" />
              Select University*
            </label>
            <select
              name="university"
              value={formData.university}
              onChange={handleInputChange}
              required
              disabled={!formData.course || filteredUniversities.length === 0 || isLoading}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
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
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Profile Image
            </label>
            
            {/* Current Image Preview */}
            {currentImage && !image && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                <img
                  src={currentImage}
                  alt="Current profile"
                  className="w-20 h-20 object-cover rounded-full border border-gray-200"
                />
              </div>
            )}

            {/* New Image Upload */}
            <div className="flex items-center space-x-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer bg-gray-50 hover:bg-indigo-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <User className="w-8 h-8 mb-3 text-indigo-500" />
                  <p className="mb-2 text-sm text-gray-600">
                    {image ? image.name : 'Click to upload new profile image'}
                  </p>
                  <p className="text-xs text-gray-500">(Leave empty to keep current image)</p>
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

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader /> : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Update Testimonial</span>
                </>
              )}
            </button>
            
            <button
              onClick={() => router.back()}
              disabled={isLoading}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTestimonials;