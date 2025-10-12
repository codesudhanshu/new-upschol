"use client"
import React, { useState, useEffect } from 'react';
import { GraduationCap, Award, Users, CheckCircle, Star, Phone, Mail, User, BookOpen, ArrowRight } from 'lucide-react';
import { getAllCourses, searchUniversities } from '@/app/api/admin/apiService';

const ScholarshipSection = () => {
  const [step, setStep] = useState(1); // 1: Category, 2: Course, 3: University, 4: User Details
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    courseCategory: '',
    courseCategoryName: '',
    course: '',
    courseName: '',
    university: '',
    universityName: '',
    academicPercentage: '',
    familyIncome: '',
    reason: ''
  });

  const [categories, setCategories] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Fetch course categories on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getAllCourses();
        if (data?.status) {
          setCategories(data.result);
        }
      } catch (err) {
        console.error('Error fetching course categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Fetch all universities on component mount
  useEffect(() => {
    const fetchAllUniversities = async () => {
      try {
        const result = await searchUniversities();
        if (result.status) {
          setUniversities(result.result);
        }
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    fetchAllUniversities();
  }, []);

  // Handle course category selection
  const handleCategorySelect = (categoryId) => {
    const selectedCategory = categories.find(cat => cat._id === categoryId);
    setAvailableCourses(selectedCategory?.courses || []);
    setFormData(prev => ({
      ...prev,
      courseCategory: categoryId,
      courseCategoryName: selectedCategory?.name || '',
      course: '',
      courseName: '',
      university: '',
      universityName: ''
    }));
    setStep(2);
  };

  // Handle course selection
  const handleCourseSelect = (courseId) => {
    const selectedCourse = availableCourses.find(course => course._id === courseId);
    setFormData(prev => ({
      ...prev,
      course: courseId,
      courseName: selectedCourse?.courseName || '',
      university: '',
      universityName: ''
    }));
    setFilteredUniversities(universities);
    setStep(3);
  };

  // Handle university selection
  const handleUniversitySelect = (universityId) => {
    const selectedUniversity = filteredUniversities.find(uni => uni._id === universityId);
    setFormData(prev => ({
      ...prev,
      university: universityId,
      universityName: selectedUniversity?.title || ''
    }));
    setStep(4);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for free counselling
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      courseCategory: '',
      courseCategoryName: '',
      course: '',
      courseName: '',
      university: '',
      universityName: '',
      academicPercentage: '',
      familyIncome: '',
      reason: ''
    });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
          <p className="text-gray-600 mb-6">Thank you for applying for our scholarship program. Our counselling team will contact you within 24 hours.</p>
          <button 
            onClick={resetForm}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply for Another Scholarship
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start min-h-screen">
          
          {/* Left Side - Content */}
          <div className="space-y-8 flex flex-col justify-center h-full py-8 lg:-mt-16">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Award className="w-4 h-4 mr-2" />
                <span className="text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text font-semibold">
                  Scholarship Program
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                Unlock Your Future with Our 
                <span className="text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text"> Scholarship Program</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We believe every student deserves quality education. Apply for our merit-based scholarship program and get up to 70% financial assistance for your dream course.
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Merit Based</h3>
                <p className="text-gray-600">Scholarships awarded based on academic excellence and potential.</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Free Counselling</h3>
                <p className="text-gray-600">Get personalized guidance from our education experts.</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Top Universities</h3>
                <p className="text-gray-600">Access to scholarships from India's leading institutions.</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Up to 70% Off</h3>
                <p className="text-gray-600">Substantial financial assistance to make education affordable.</p>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-gray-600">Students Benefited</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">₹2Cr+</div>
                  <div className="text-gray-600">Scholarships Given</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                  <div className="text-gray-600">Partner Universities</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Multi-Step Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 min-h-screen flex flex-col">
            {/* Progress Indicator */}
            <div className="mb-8 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-500">Step {step} of 4</div>
                {step > 1 && (
                  <button
                    onClick={goBack}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    ← Go Back
                  </button>
                )}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step Content - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              {/* Step 1: Course Category Selection */}
              {step === 1 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Course Category</h2>
                  <p className="text-gray-600">Select the category that matches your educational goals</p>
                </div>

                <div className="space-y-4">
                  {loading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-16"></div>
                      ))}
                    </div>
                  ) : (
                    categories.map((category) => (
                      <button
                        key={category._id}
                        onClick={() => handleCategorySelect(category._id)}
                        className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">
                              {category.name} ({category.code})
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Course Selection */}
            {step === 2 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Your Course</h2>
                  <p className="text-gray-600">Choose the specific course from <span className="font-medium text-blue-600">{formData.courseCategoryName}</span></p>
                </div>

                <div className="space-y-4">
                  {availableCourses.length > 0 ? (
                    availableCourses.map((course) => (
                      <button
                        key={course._id}
                        onClick={() => handleCourseSelect(course._id)}
                        className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">
                              {course.courseName}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{course.courseDescription}</p>
                            {course.duration && (
                              <p className="text-xs text-blue-600 mt-1">Duration: {course.duration} years</p>
                            )}
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No courses available in this category yet.</p>
                      <button
                        onClick={() => setStep(4)}
                        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Continue with General Application
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: University Selection */}
            {step === 3 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your University</h2>
                  <p className="text-gray-600">Select your preferred university for <span className="font-medium text-blue-600">{formData.courseName}</span></p>
                </div>

                <div className="space-y-4">
                  {filteredUniversities.map((university) => (
                    <button
                      key={university._id}
                      onClick={() => handleUniversitySelect(university._id)}
                      className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {university.logo && (
                            <img 
                              src={university.logo} 
                              alt={university.title}
                              className="w-12 h-12 rounded-lg object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          )}
                          <div>
                            <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">
                              {university.title}
                            </h3>
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(university.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-gray-600 ml-2">
                                {university.rating} rating
                              </span>
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                      </div>
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setStep(4)}
                    className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-center"
                  >
                    <div className="text-gray-600">
                      <p className="font-medium">Not sure about university?</p>
                      <p className="text-sm">Skip this step - our counsellors will help you choose</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: User Details */}
            {step === 4 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Details</h2>
                  <p className="text-gray-600">Final step - tell us about yourself to complete your scholarship application</p>
                  
                  {/* Selection Summary */}
                  <div className="mt-6 bg-blue-50 rounded-lg p-4 text-left">
                    <h3 className="font-semibold text-gray-800 mb-2">Your Selection:</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Category:</span> {formData.courseCategoryName}</p>
                      {formData.courseName && <p><span className="font-medium">Course:</span> {formData.courseName}</p>}
                      {formData.universityName && <p><span className="font-medium">University:</span> {formData.universityName}</p>}
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>

                  {/* Academic & Financial Details */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Academic Percentage *</label>
                      <input
                        type="number"
                        required
                        min="0"
                        max="100"
                        value={formData.academicPercentage}
                        onChange={(e) => handleInputChange('academicPercentage', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="85"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Family Income (Annual)</label>
                      <select
                        value={formData.familyIncome}
                        onChange={(e) => handleInputChange('familyIncome', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Range</option>
                        <option value="below-2lakh">Below ₹2 Lakh</option>
                        <option value="2-5lakh">₹2-5 Lakh</option>
                        <option value="5-10lakh">₹5-10 Lakh</option>
                        <option value="above-10lakh">Above ₹10 Lakh</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Why do you deserve this scholarship?</label>
                    <textarea
                      value={formData.reason}
                      onChange={(e) => handleInputChange('reason', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us about your achievements, goals, and why you need financial assistance..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    ) : (
                      <ArrowRight className="w-5 h-5 mr-2" />
                    )}
                    {isSubmitting ? 'Submitting...' : 'Get Free Counselling'}
                  </button>
                </form>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By submitting this form, you agree to receive counselling calls and updates about our scholarship programs.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ScholarshipSection;