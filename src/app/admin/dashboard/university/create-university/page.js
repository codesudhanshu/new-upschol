"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, FileText, GraduationCap, FileImage, Plus, Calendar,
  Home, Award, MapPin, Landmark, Globe, ClipboardList, HelpCircle,
  Link as LinkIcon, Star, Laptop, Book, DollarSign, Check,
  ChevronDown, ChevronUp, X, BarChart2, MessageSquare, ListOrdered,
  List, AlignRight, AlignCenter, AlignLeft, Underline, Italic, Bold,
  Image as ImageIcon
} from 'lucide-react';
import { getAllApprovals, getAllCompanies, getAllCourses } from '@/app/api/admin/apiService';
import { createuniversity, departmentList } from '@/app/api/admin/courseapi';
import Swal from 'sweetalert2';

const Loader = ({ size = 4, color = "border-white" }) => (
  <div className={`animate-spin rounded-full h-${size} w-${size} border-b-2 ${color}`}></div>
);

export default function UniversityCreateForm() {
  const departmentEditorRefs = useRef({});
  const courseEditorRefs = useRef({});
  const specializationEditorRefs = useRef({});

  // Form state
  const [formData, setFormData] = useState({
    universityName: '',
    keywordDescription: '',
    universityRating: '',
    valueForMoney: '',
    curriculum: '',
    digitalInfrastructure: '',
    averageRating: '',
    aboutCollege: '',
    startingKeyPoints: ['', ''],
    sampleCertificateDescription: '',
    universityAddress: '',
    city: '',
    pincode: '',
    state: '',
    country: '',
    admissionProcess: '',
    collegeUrl: '',
    keyword: '',
    collegeType: '',
    isDBA: false,
  });

  const [universityFacts, setUniversityFacts] = useState([{ fact: '' }]);
  const [faqs, setFaqs] = useState([{ question: '', answer: '' }]);
  const [selectedApprovals, setSelectedApprovals] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [examinationPatterns, setExaminationPatterns] = useState([{ pattern: '' }]);
  const [advantages, setAdvantages] = useState([{ description: '', benefits: [''] }]);
  const [rankings, setRankings] = useState([{ RatingNumber: '', RatingDescription: '' }]);
  const [reviews, setReviews] = useState([{ name: '', Rating: '', description: '' }]);
  const [financialAidContent, setFinancialAidContent] = useState('');

  // Files
  const [logo, setLogo] = useState(null);
  const [universityHomeImage, setUniversityHomeImage] = useState(null);
  const [sampleCertificate, setSampleCertificate] = useState(null);

  // Dropdown data
  const [approvals, setApprovals] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    basicInfo: true,
    about: true,
    media: true,
    academics: true,
    financial: true,
    approvals: true,
    partners: true,
    departments: true,
    rankings: true,
    reviews: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [approvalsRes, companiesRes, departmentRes, specializationsRes] = await Promise.all([
          getAllApprovals(),
          getAllCompanies(),
          getAllCourses(), // DEGREES/COURSES KA DATA
          departmentList() // DEPARTMENTS/SPECIALIZATIONS KA DATA
        ]);

        setApprovals(approvalsRes.result?.approvals || []);
        setCompanies(companiesRes.result?.companies || []);
        setDepartments(departmentRes.result || []);
        setSpecializations(specializationsRes.data || []);
      } catch (error) {
        alert('Error loading data: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleKeyPointChange = (index, value) => {
    const newKeyPoints = [...formData.startingKeyPoints];
    newKeyPoints[index] = value;
    setFormData(prev => ({ ...prev, startingKeyPoints: newKeyPoints }));
  };

  const handleFactChange = (index, value) => {
    const newFacts = [...universityFacts];
    newFacts[index].fact = value;
    setUniversityFacts(newFacts);
  };

  const addFact = () => setUniversityFacts([...universityFacts, { fact: '' }]);
  const removeFact = (index) => {
    const newFacts = [...universityFacts];
    newFacts.splice(index, 1);
    setUniversityFacts(newFacts);
  };

  const handleFaqChange = (index, field, value) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  const addFaq = () => setFaqs([...faqs, { question: '', answer: '' }]);
  const removeFaq = (index) => {
    const newFaqs = [...faqs];
    newFaqs.splice(index, 1);
    setFaqs(newFaqs);
  };

  const toggleApproval = (approval) => {
    setSelectedApprovals(prev => {
      const exists = prev.find(a => a._id === approval._id);
      if (exists) {
        return prev.filter(a => a._id !== approval._id);
      }
      return [...prev, { _id: approval._id, title: approval.title }];
    });
  };

  const toggleCompany = (company) => {
    setSelectedCompanies(prev => {
      const exists = prev.find(c => c._id === company._id);
      if (exists) {
        return prev.filter(c => c._id !== company._id);
      }
      return [...prev, { _id: company._id, title: company.title }];
    });
  };

  const toggleDepartment = (departmentId, departmentName) => {
    setSelectedDepartments(prev => {
      const exists = prev.find(d => d.departmentId === departmentId);
      if (exists) {
        return prev.filter(d => d.departmentId !== departmentId);
      }
      
      // Degree ka data find karo
      const degree = departments.find(dept => dept._id === departmentId);
      
      // Automatically us degree ke saare courses add karo
      const initialCourses = degree?.courses?.map(course => ({
        courseId: course._id,
        courseName: course.courseName,
        courseContent: '',
        feeDetails: { semesterFee: '', annualFee: '', oneTimeFee: '', totalAmount: '', loanAmount: '' },
        selectedSpecializations: []
      })) || [];

      return [...prev, {
        departmentId,
        departmentName,
        departmentContent: '',
        feeDetails: { semesterFee: '', annualFee: '', oneTimeFee: '', totalAmount: '', loanAmount: '' },
        selectedCourses: initialCourses
      }];
    });
  };

  const toggleCourse = (departmentId, course) => {
    setSelectedDepartments(prev =>
      prev.map(dept => {
        if (dept.departmentId === departmentId) {
          const courseExists = dept.selectedCourses.find(c => c.courseId === course._id);
          if (courseExists) {
            return {
              ...dept,
              selectedCourses: dept.selectedCourses.filter(c => c.courseId !== course._id)
            };
          }
          return {
            ...dept,
            selectedCourses: [...dept.selectedCourses, {
              courseId: course._id,
              courseName: course.courseName,
              courseContent: '',
              feeDetails: { semesterFee: '', annualFee: '', oneTimeFee: '', totalAmount: '', loanAmount: '' },
              selectedSpecializations: []
            }]
          };
        }
        return dept;
      })
    );
  };

  const toggleSpecialization = (departmentId, courseId, spec) => {
    setSelectedDepartments(prev =>
      prev.map(dept => {
        if (dept.departmentId === departmentId) {
          return {
            ...dept,
            selectedCourses: dept.selectedCourses.map(course => {
              if (course.courseId === courseId) {
                const specExists = course.selectedSpecializations.find(s => s.specializationId === spec._id);
                if (specExists) {
                  return {
                    ...course,
                    selectedSpecializations: course.selectedSpecializations.filter(s => s.specializationId !== spec._id)
                  };
                }
                return {
                  ...course,
                  selectedSpecializations: [...course.selectedSpecializations, {
                    specializationId: spec._id,
                    specializationName: spec.name
                  }]
                };
              }
              return course;
            })
          };
        }
        return dept;
      })
    );
  };

  const handleDepartmentContentChange = (departmentId) => {
    const content = departmentEditorRefs.current[departmentId]?.innerHTML || '';
    setSelectedDepartments(prev =>
      prev.map(dept =>
        dept.departmentId === departmentId
          ? { ...dept, departmentContent: content }
          : dept
      )
    );
  };

  const handleCourseContentChange = (departmentId, courseId) => {
    const editorKey = `${departmentId}-${courseId}`;
    const content = courseEditorRefs.current[editorKey]?.innerHTML || '';
    setSelectedDepartments(prev =>
      prev.map(dept => {
        if (dept.departmentId === departmentId) {
          return {
            ...dept,
            selectedCourses: dept.selectedCourses.map(course =>
              course.courseId === courseId
                ? { ...course, courseContent: content }
                : course
            )
          };
        }
        return dept;
      })
    );
  };

  const handleDepartmentFeeChange = (departmentId, field, value) => {
    setSelectedDepartments(prev =>
      prev.map(dept =>
        dept.departmentId === departmentId
          ? { ...dept, feeDetails: { ...dept.feeDetails, [field]: value } }
          : dept
      )
    );
  };

  const handleCourseFeeChange = (departmentId, courseId, field, value) => {
    setSelectedDepartments(prev =>
      prev.map(dept => {
        if (dept.departmentId === departmentId) {
          return {
            ...dept,
            selectedCourses: dept.selectedCourses.map(course =>
              course.courseId === courseId
                ? { ...course, feeDetails: { ...course.feeDetails, [field]: value } }
                : course
            )
          };
        }
        return dept;
      })
    );
  };

  const handleExamPatternChange = (index, value) => {
    const newPatterns = [...examinationPatterns];
    newPatterns[index].pattern = value;
    setExaminationPatterns(newPatterns);
  };

  const addExamPattern = () => setExaminationPatterns([...examinationPatterns, { pattern: '' }]);
  const removeExamPattern = (index) => {
    const newPatterns = [...examinationPatterns];
    newPatterns.splice(index, 1);
    setExaminationPatterns(newPatterns);
  };

  const handleAdvantageChange = (index, field, value) => {
    const newAdvantages = [...advantages];
    newAdvantages[index][field] = value;
    setAdvantages(newAdvantages);
  };

  const handleBenefitChange = (advantageIndex, benefitIndex, value) => {
    const newAdvantages = [...advantages];
    newAdvantages[advantageIndex].benefits[benefitIndex] = value;
    setAdvantages(newAdvantages);
  };

  const addBenefit = (advantageIndex) => {
    const newAdvantages = [...advantages];
    newAdvantages[advantageIndex].benefits.push('');
    setAdvantages(newAdvantages);
  };

  const removeBenefit = (advantageIndex, benefitIndex) => {
    const newAdvantages = [...advantages];
    newAdvantages[advantageIndex].benefits.splice(benefitIndex, 1);
    setAdvantages(newAdvantages);
  };

  const addAdvantage = () => setAdvantages([...advantages, { description: '', benefits: [''] }]);
  const removeAdvantage = (index) => {
    const newAdvantages = [...advantages];
    newAdvantages.splice(index, 1);
    setAdvantages(newAdvantages);
  };

  const handleRankingChange = (index, field, value) => {
    const newRankings = [...rankings];
    newRankings[index][field] = value;
    setRankings(newRankings);
  };

  const addRanking = () => setRankings([...rankings, { RatingNumber: '', RatingDescription: '' }]);
  const removeRanking = (index) => {
    const newRankings = [...rankings];
    newRankings.splice(index, 1);
    setRankings(newRankings);
  };

  const handleReviewChange = (index, field, value) => {
    const newReviews = [...reviews];
    newReviews[index][field] = value;
    setReviews(newReviews);
  };

  const addReview = () => setReviews([...reviews, { name: '', Rating: '', description: '' }]);
  const removeReview = (index) => {
    const newReviews = [...reviews];
    newReviews.splice(index, 1);
    setReviews(newReviews);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };


   const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          title: 'Invalid File!',
          text: 'Please upload an image file',
          icon: 'error',
          confirmButtonColor: '#ef4444'
        });
        return;
      }
      setLogo(file);
    }
  };

  const handleHomeImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          title: 'Invalid File!',
          text: 'Please upload an image file',
          icon: 'error',
          confirmButtonColor: '#ef4444'
        });
        return;
      }
      setUniversityHomeImage(file);
    }
  };

  const handleCertificateUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          title: 'Invalid File!',
          text: 'Please upload an image file',
          icon: 'error',
          confirmButtonColor: '#ef4444'
        });
        return;
      }
      setSampleCertificate(file);
    }
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.universityName || !logo || !universityHomeImage) {
      Swal.fire({
        title: 'Missing Fields!',
        text: 'University Name, Logo, and Home Image are required!',
        icon: 'warning',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData object for file upload
      const formDataToSend = new FormData();

      // Add files to FormData
      if (logo) formDataToSend.append('logo', logo);
      if (universityHomeImage) formDataToSend.append('universityHomeImage', universityHomeImage);
      if (sampleCertificate) formDataToSend.append('sampleCertificate', sampleCertificate);

      // Add all form data as JSON string
      const submissionData = {
        ...formData,
        universityFacts: universityFacts.filter(fact => fact.fact.trim() !== ''),
        faqs: faqs.filter(faq => faq.question.trim() !== '' && faq.answer.trim() !== ''),
        selectedApprovals,
        selectedCompanies,
        selectedDepartments: selectedDepartments.map(dept => ({
          ...dept,
          selectedCourses: dept.selectedCourses.map(course => ({
            ...course,
            selectedSpecializations: course.selectedSpecializations
          }))
        })),
        examinationPatterns: examinationPatterns.filter(pattern => pattern.pattern.trim() !== ''),
        advantages: advantages.filter(adv => adv.description.trim() !== ''),
        rankings: rankings.filter(rank => rank.RatingNumber.trim() !== '' || rank.RatingDescription.trim() !== ''),
        reviews: reviews.filter(review => review.name.trim() !== '' || review.description.trim() !== ''),
        financialAidContent
      };

      // Add JSON data to FormData
      formDataToSend.append('data', JSON.stringify(submissionData));

      // Send FormData to API
      const response = await createuniversity(formDataToSend);
      
      if (response.status) {
        Swal.fire({
          title: 'Success!',
          text: 'University created successfully!',
          icon: 'success',
          confirmButtonColor: '#10b981'
        });
        
        // Reset form after success
        setFormData({
          universityName: '',
          keywordDescription: '',
          universityRating: '',
          valueForMoney: '',
    curriculum: '',
    digitalInfrastructure: '',
    averageRating: '',
          aboutCollege: '',
          startingKeyPoints: ['', ''],
          sampleCertificateDescription: '',
          universityAddress: '',
          city: '',
          pincode: '',
          state: '',
          country: '',
          admissionProcess: '',
          collegeUrl: '',
          keyword: '',
          collegeType: '',
          isDBA: false,
        });
        setUniversityFacts([{ fact: '' }]);
        setFaqs([{ question: '', answer: '' }]);
        setSelectedApprovals([]);
        setSelectedCompanies([]);
        setSelectedDepartments([]);
        setExaminationPatterns([{ pattern: '' }]);
        setAdvantages([{ description: '', benefits: [''] }]);
        setRankings([{ RatingNumber: '', RatingDescription: '' }]);
        setReviews([{ name: '', Rating: '', description: '' }]);
        setFinancialAidContent('');
        setLogo(null);
        setUniversityHomeImage(null);
        setSampleCertificate(null);
      } else {
        Swal.fire({
          title: 'Error!',
          text: response.message || 'Failed to create university',
          icon: 'error',
          confirmButtonColor: '#ef4444'
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to create university',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatText = (command, departmentId = null, courseId = null, specId = null) => {
    let ref;
    if (specId && courseId && departmentId) {
      ref = specializationEditorRefs.current[`${departmentId}-${courseId}-${specId}`];
    } else if (courseId && departmentId) {
      ref = courseEditorRefs.current[`${departmentId}-${courseId}`];
    } else if (departmentId) {
      ref = departmentEditorRefs.current[departmentId];
    }
    
    if (ref) {
      ref.focus();
      document.execCommand(command);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size={12} color="border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Create New University</h1>
          <p className="text-gray-600 mt-2">Add comprehensive university information</p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          {/* Basic Information */}
          <div className="mb-8 border-b pb-6">
            <div className="flex justify-between items-center cursor-pointer mb-4" onClick={() => toggleSection('basicInfo')}>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
                Basic Information
              </h2>
              {expandedSections.basicInfo ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
            
            {expandedSections.basicInfo && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">University Name *</label>
                  <input
                    type="text"
                    name="universityName"
                    value={formData.universityName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Starting Key Points</label>
                  {formData.startingKeyPoints.map((point, index) => (
                    <input
                      key={index}
                      type="text"
                      value={point}
                      onChange={(e) => handleKeyPointChange(index, e.target.value)}
                      className="w-full px-4 py-3 border rounded-lg mb-2"
                      placeholder={`Key point ${index + 1}`}
                    />
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">College URL</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-gray-50 text-gray-500 text-sm">
                      https://upschol.com/university/
                    </span>
                    <input
                      type="text"
                      name="collegeUrl"
                      value={formData.collegeUrl}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-3 border rounded-r-md"
                      placeholder="university-name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Keyword</label>
                    <input
                      type="text"
                      name="keyword"
                      value={formData.keyword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">SEO Description</label>
                    <input
                      type="text"
                      name="keywordDescription"
                      value={formData.keywordDescription}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                </div>


                  <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Average Rating</label>
                    <input
                      type="number"
                      name="averageRating"
                      value={formData.averageRating}
                      onChange={handleInputChange}
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Digital Infrastructure</label>
                    <input
                      type="number"
                      name="digitalInfrastructure"
                      value={formData.digitalInfrastructure}
                      onChange={handleInputChange}
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">curriculum</label>
                    <input
                      type="number"
                      name="curriculum"
                      value={formData.curriculum}
                      onChange={handleInputChange}
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">value For Money</label>
                    <input
                      type="number"
                      name="valueForMoney"
                      value={formData.valueForMoney}
                      onChange={handleInputChange}
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                 </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">University Rating</label>
                    <input
                      type="number"
                      name="universityRating"
                      value={formData.universityRating}
                      onChange={handleInputChange}
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>

                  <div className="flex items-center justify-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="collegeType"
                        value="global"
                        checked={formData.collegeType === "global"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600"
                      />
                      <span className="ml-2 text-sm">Study Abroad</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="collegeType"
                        value="local"
                        checked={formData.collegeType === "local"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600"
                      />
                      <span className="ml-2 text-sm">Indian University</span>
                    </label>
                  </div>

                  <div className="flex items-center justify-center">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isDBA"
                        checked={formData.isDBA}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600"
                      />
                      <span className="ml-2 text-sm">DBA University</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* About Section */}
          <div className="mb-8 border-b pb-6">
            <div className="flex justify-between items-center cursor-pointer mb-4" onClick={() => toggleSection('about')}>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Home className="h-5 w-5 mr-2 text-indigo-600" />
                About College
              </h2>
              {expandedSections.about ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
            
            {expandedSections.about && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">About College</label>
                  <textarea
                    name="aboutCollege"
                    value={formData.aboutCollege}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">University Facts</label>
                  {universityFacts.map((fact, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={fact.fact}
                        onChange={(e) => handleFactChange(index, e.target.value)}
                        className="flex-1 px-4 py-3 border rounded-lg"
                        placeholder={`Fact ${index + 1}`}
                      />
                      {universityFacts.length > 1 && (
                        <button type="button" onClick={() => removeFact(index)} className="ml-2 p-2 text-red-500">
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={addFact} className="mt-2 flex items-center text-sm text-indigo-600">
                    <Plus className="h-4 w-4 mr-1" /> Add Fact
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Media Section */}
  <div className="mb-8 border-b border-gray-200 pb-6">
          <div 
            className="flex justify-between items-center cursor-pointer mb-4"
            onClick={() => toggleSection('media')}
          >
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <FileImage className="h-5 w-5 mr-2 text-indigo-600" />
              Media
            </h2>
            {expandedSections.media ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
          
          {expandedSections.media && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  University Logo *
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer bg-gray-50 hover:bg-indigo-50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FileImage className="w-8 h-8 mb-3 text-indigo-500" />
                      <p className="mb-2 text-sm text-gray-600">
                        {logo ? logo.name : 'Click to upload university logo'}
                      </p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden"
                     onChange={handleLogoUpload}
                      required
                    />
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  University Home Image *
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer bg-gray-50 hover:bg-indigo-50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FileImage className="w-8 h-8 mb-3 text-indigo-500" />
                      <p className="mb-2 text-sm text-gray-600">
                        {universityHomeImage ? universityHomeImage.name : 'Click to upload home image'}
                      </p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden"
                      onChange={handleHomeImageUpload}
                      required
                    />
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Sample Certificate
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer bg-gray-50 hover:bg-indigo-50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FileImage className="w-8 h-8 mb-3 text-indigo-500" />
                      <p className="mb-2 text-sm text-gray-600">
                        {sampleCertificate ? sampleCertificate.name : 'Click to upload sample certificate'}
                      </p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden"
                       onChange={handleCertificateUpload}
                    />
                  </label>
                </div>
              </div>
              
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <FileText className="h-4 w-4 mr-2 text-indigo-600" />
                  Sample Certificate Description
                </label>
                <textarea
                  name="sampleCertificateDescription"
                  value={formData.sampleCertificateDescription}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                  placeholder="Description about the sample certificate"
                />
              </div>
            </div>
          )}
        </div>
        

          {/* Academics Section */}
          <div className="mb-8 border-b pb-6">
            <div className="flex justify-between items-center cursor-pointer mb-4" onClick={() => toggleSection('academics')}>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
                Academics
              </h2>
              {expandedSections.academics ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
            
            {expandedSections.academics && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Admission Process</label>
                  <textarea
                    name="admissionProcess"
                    value={formData.admissionProcess}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">FAQs</label>
                  {faqs.map((faq, index) => (
                    <div key={index} className="border rounded-lg p-4 mb-4">
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">Question {index + 1}</label>
                        {faqs.length > 1 && (
                          <button type="button" onClick={() => removeFaq(index)} className="text-red-500">
                            <X className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg mb-3"
                        placeholder="Question"
                      />
                      <textarea
                        value={faq.answer}
                        onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                        rows={2}
                        className="w-full px-4 py-2 border rounded-lg"
                        placeholder="Answer"
                      />
                    </div>
                  ))}
                  <button type="button" onClick={addFaq} className="mt-2 flex items-center text-sm text-indigo-600">
                    <Plus className="h-4 w-4 mr-1" /> Add FAQ
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Examination Pattern</label>
                  {examinationPatterns.map((pattern, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={pattern.pattern}
                        onChange={(e) => handleExamPatternChange(index, e.target.value)}
                        className="flex-1 px-4 py-3 border rounded-lg"
                        placeholder={`Pattern ${index + 1}`}
                      />
                      {examinationPatterns.length > 1 && (
                        <button type="button" onClick={() => removeExamPattern(index)} className="ml-2 p-2 text-red-500">
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={addExamPattern} className="mt-2 flex items-center text-sm text-indigo-600">
                    <Plus className="h-4 w-4 mr-1" /> Add Pattern
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Advantages</label>
                  {advantages.map((advantage, index) => (
                    <div key={index} className="border rounded-lg p-4 mb-4">
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium">Advantage {index + 1}</label>
                        {advantages.length > 1 && (
                          <button type="button" onClick={() => removeAdvantage(index)} className="text-red-500">
                            <X className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                      <textarea
                        value={advantage.description}
                        onChange={(e) => handleAdvantageChange(index, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-4 py-2 border rounded-lg mb-3"
                        placeholder="Description"
                      />
                      <label className="block text-sm font-medium mb-2">Benefits</label>
                      {advantage.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center mb-2">
                          <input
                            type="text"
                            value={benefit}
                            onChange={(e) => handleBenefitChange(index, benefitIndex, e.target.value)}
                            className="flex-1 px-4 py-2 border rounded-lg"
                            placeholder={`Benefit ${benefitIndex + 1}`}
                          />
                          {advantage.benefits.length > 1 && (
                            <button type="button" onClick={() => removeBenefit(index, benefitIndex)} className="ml-2 p-1 text-red-500">
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button type="button" onClick={() => addBenefit(index)} className="mt-2 flex items-center text-xs text-indigo-600">
                        <Plus className="h-3 w-3 mr-1" /> Add Benefit
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addAdvantage} className="mt-2 flex items-center text-sm text-indigo-600">
                    <Plus className="h-4 w-4 mr-1" /> Add Advantage
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Affiliated Institutions */}
          <div className="mb-8 border-b pb-6">
            <div className="flex justify-between items-center cursor-pointer mb-4" onClick={() => toggleSection('approvals')}>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Award className="h-5 w-5 mr-2 text-indigo-600" />
                Affiliated Institutions
              </h2>
              {expandedSections.approvals ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
            
            {expandedSections.approvals && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {approvals.map(approval => (
                  <label key={approval._id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedApprovals.some(a => a._id === approval._id)}
                      onChange={() => toggleApproval(approval)}
                      className="h-4 w-4 text-indigo-600 rounded"
                    />
                    <span className="ml-2 text-sm">{approval.title}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Placement Partners */}
          <div className="mb-8 border-b pb-6">
            <div className="flex justify-between items-center cursor-pointer mb-4" onClick={() => toggleSection('partners')}>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <Landmark className="h-5 w-5 mr-2 text-indigo-600" />
                Placement Partners
              </h2>
              {expandedSections.partners ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
            
            {expandedSections.partners && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {companies.map(company => (
                  <label key={company._id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCompanies.some(c => c._id === company._id)}
                      onChange={() => toggleCompany(company)}
                      className="h-4 w-4 text-indigo-600 rounded"
                    />
                    <span className="ml-2 text-sm">{company.title}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Courses & Degrees Section */}
          <div className="mb-8 border-b pb-6">
            <div className="flex justify-between items-center cursor-pointer mb-4" onClick={() => toggleSection('departments')}>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
                Courses & Degrees
              </h2>
              {expandedSections.departments ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
            
            {expandedSections.departments && (
              <div className="space-y-6">
                {/* Degree Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Select Degree</label>
                  <select 
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => {
                      if (e.target.value) {
                        const selectedDegree = departments.find(dept => dept._id === e.target.value);
                        if (selectedDegree) {
                          toggleDepartment(selectedDegree._id, selectedDegree.name);
                        }
                      }
                    }}
                    value=""
                  >
                    <option value="">Select a degree</option>
                    {departments.map(degree => (
                      <option key={degree._id} value={degree._id}>
                        {degree.name} {degree.description ? `- ${degree.description}` : ''}
                        {degree.courses && ` (${degree.courses.length} courses)`}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500 mt-1">Select degree to see available courses</p>
                </div>

                {/* Selected Degrees and Their Courses */}
                {selectedDepartments.map(selectedDept => {
                  const degree = departments.find(dept => dept._id === selectedDept.departmentId);
                  
                  return (
                    <div key={selectedDept.departmentId} className="border-2 rounded-lg p-6 bg-gray-50">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{selectedDept.departmentName}</h3>
                          <p className="text-sm text-gray-600">{degree?.description}</p>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => toggleDepartment(selectedDept.departmentId, selectedDept.departmentName)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Degree About Content */}
                      <div className="mt-4 space-y-6 border-t pt-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">About {selectedDept.departmentName}</label>
                          
                          <div className="border rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1">
                            <button type="button" onClick={() => formatText('bold', selectedDept.departmentId)} className="p-1 hover:bg-indigo-50 rounded" title="Bold">
                              <Bold className="h-4 w-4" />
                            </button>
                            <button type="button" onClick={() => formatText('italic', selectedDept.departmentId)} className="p-1 hover:bg-indigo-50 rounded" title="Italic">
                              <Italic className="h-4 w-4" />
                            </button>
                            <button type="button" onClick={() => formatText('underline', selectedDept.departmentId)} className="p-1 hover:bg-indigo-50 rounded" title="Underline">
                              <Underline className="h-4 w-4" />
                            </button>
                            <div className="h-4 w-px bg-gray-300"></div>
                            <button type="button" onClick={() => formatText('insertUnorderedList', selectedDept.departmentId)} className="p-1 hover:bg-indigo-50 rounded" title="Bullet List">
                              <List className="h-4 w-4" />
                            </button>
                            <button type="button" onClick={() => formatText('insertOrderedList', selectedDept.departmentId)} className="p-1 hover:bg-indigo-50 rounded" title="Numbered List">
                              <ListOrdered className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <div
                            ref={(el) => { 
                              if (el) {
                                departmentEditorRefs.current[selectedDept.departmentId] = el;
                                if (selectedDept.departmentContent && el.innerHTML !== selectedDept.departmentContent) {
                                  el.innerHTML = selectedDept.departmentContent;
                                }
                              }
                            }}
                            contentEditable={!isSubmitting}
                            onInput={() => handleDepartmentContentChange(selectedDept.departmentId)}
                            className="min-h-32 p-3 border border-t-0 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"
                            suppressContentEditableWarning={true}
                          />
                        </div>

                        {/* Degree Fee Details */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Degree Fee Details</label>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            <input
                              type="number"
                              value={selectedDept.feeDetails.semesterFee}
                              onChange={(e) => handleDepartmentFeeChange(selectedDept.departmentId, 'semesterFee', e.target.value)}
                              className="px-3 py-2 border rounded-lg text-sm"
                              placeholder="Semester Fee"
                            />
                            <input
                              type="number"
                              value={selectedDept.feeDetails.annualFee}
                              onChange={(e) => handleDepartmentFeeChange(selectedDept.departmentId, 'annualFee', e.target.value)}
                              className="px-3 py-2 border rounded-lg text-sm"
                              placeholder="Annual Fee"
                            />
                            <input
                              type="number"
                              value={selectedDept.feeDetails.oneTimeFee}
                              onChange={(e) => handleDepartmentFeeChange(selectedDept.departmentId, 'oneTimeFee', e.target.value)}
                              className="px-3 py-2 border rounded-lg text-sm"
                              placeholder="One Time Fee"
                            />
                            <input
                              type="number"
                              value={selectedDept.feeDetails.totalAmount}
                              onChange={(e) => handleDepartmentFeeChange(selectedDept.departmentId, 'totalAmount', e.target.value)}
                              className="px-3 py-2 border rounded-lg text-sm"
                              placeholder="Total Amount"
                            />
                            <input
                              type="number"
                              value={selectedDept.feeDetails.loanAmount}
                              onChange={(e) => handleDepartmentFeeChange(selectedDept.departmentId, 'loanAmount', e.target.value)}
                              className="px-3 py-2 border rounded-lg text-sm"
                              placeholder="Loan Amount"
                            />
                          </div>
                        </div>

                        {/* Courses in this Degree */}
                        {selectedDept.selectedCourses.length > 0 ? (
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                              Courses in {selectedDept.departmentName} ({selectedDept.selectedCourses.length})
                            </label>
                            <div className="space-y-4">
                              {selectedDept.selectedCourses.map(selectedCourse => {
                                const course = degree?.courses?.find(c => c._id === selectedCourse.courseId);
                                
                                return (
                                  <div key={selectedCourse.courseId} className="bg-white border-2 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-3">
                                      <div>
                                        <h4 className="text-base font-bold text-gray-800">{selectedCourse.courseName}</h4>
                                        {course?.courseDescription && (
                                          <p className="text-sm text-gray-600 mt-1">{course.courseDescription}</p>
                                        )}
                                        {course?.duration && (
                                          <p className="text-xs text-gray-500 mt-1">Duration: {course.duration} years</p>
                                        )}
                                      </div>
                                      <button 
                                        type="button" 
                                        onClick={() => toggleCourse(selectedDept.departmentId, course)}
                                        className="text-red-500 hover:text-red-700"
                                      >
                                        <X className="h-4 w-4" />
                                      </button>
                                    </div>

                                    {course && (
                                      <div className="mt-3 space-y-4 border-t pt-3">
                                        {/* Course About Content */}
                                        <div>
                                          <label className="block text-xs font-semibold text-gray-600 mb-2">About {selectedCourse.courseName}</label>
                                          
                                          <div className="border rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1">
                                            <button type="button" onClick={() => formatText('bold', selectedDept.departmentId, course._id)} className="p-1 hover:bg-indigo-50 rounded">
                                              <Bold className="h-3 w-3" />
                                            </button>
                                            <button type="button" onClick={() => formatText('italic', selectedDept.departmentId, course._id)} className="p-1 hover:bg-indigo-50 rounded">
                                              <Italic className="h-3 w-3" />
                                            </button>
                                            <button type="button" onClick={() => formatText('underline', selectedDept.departmentId, course._id)} className="p-1 hover:bg-indigo-50 rounded">
                                              <Underline className="h-3 w-3" />
                                            </button>
                                            <div className="h-3 w-px bg-gray-300"></div>
                                            <button type="button" onClick={() => formatText('insertUnorderedList', selectedDept.departmentId, course._id)} className="p-1 hover:bg-indigo-50 rounded">
                                              <List className="h-3 w-3" />
                                            </button>
                                            <button type="button" onClick={() => formatText('insertOrderedList', selectedDept.departmentId, course._id)} className="p-1 hover:bg-indigo-50 rounded">
                                              <ListOrdered className="h-3 w-3" />
                                            </button>
                                          </div>
                                          
                                          <div
                                            ref={(el) => { 
                                              if (el) {
                                                courseEditorRefs.current[`${selectedDept.departmentId}-${course._id}`] = el;
                                                if (selectedCourse.courseContent && el.innerHTML !== selectedCourse.courseContent) {
                                                  el.innerHTML = selectedCourse.courseContent;
                                                }
                                              }
                                            }}
                                            contentEditable={!isSubmitting}
                                            onInput={() => handleCourseContentChange(selectedDept.departmentId, course._id)}
                                            className="min-h-24 p-3 border border-t-0 rounded-b-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-gray-900 text-sm"
                                            suppressContentEditableWarning={true}
                                          />
                                        </div>

                                        {/* Course Fee Details */}
                                        <div>
                                          <label className="block text-xs font-semibold text-gray-600 mb-2">Course Fee Details</label>
                                          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                            <input
                                              type="number"
                                              value={selectedCourse.feeDetails.semesterFee}
                                              onChange={(e) => handleCourseFeeChange(selectedDept.departmentId, course._id, 'semesterFee', e.target.value)}
                                              className="px-3 py-2 border rounded-lg text-xs"
                                              placeholder="Semester"
                                            />
                                            <input
                                              type="number"
                                              value={selectedCourse.feeDetails.annualFee}
                                              onChange={(e) => handleCourseFeeChange(selectedDept.departmentId, course._id, 'annualFee', e.target.value)}
                                              className="px-3 py-2 border rounded-lg text-xs"
                                              placeholder="Annual"
                                            />
                                            <input
                                              type="number"
                                              value={selectedCourse.feeDetails.oneTimeFee}
                                              onChange={(e) => handleCourseFeeChange(selectedDept.departmentId, course._id, 'oneTimeFee', e.target.value)}
                                              className="px-3 py-2 border rounded-lg text-xs"
                                              placeholder="One Time"
                                            />
                                            <input
                                              type="number"
                                              value={selectedCourse.feeDetails.totalAmount}
                                              onChange={(e) => handleCourseFeeChange(selectedDept.departmentId, course._id, 'totalAmount', e.target.value)}
                                              className="px-3 py-2 border rounded-lg text-xs"
                                              placeholder="Total"
                                            />
                                            <input
                                              type="number"
                                              value={selectedCourse.feeDetails.loanAmount}
                                              onChange={(e) => handleCourseFeeChange(selectedDept.departmentId, course._id, 'loanAmount', e.target.value)}
                                              className="px-3 py-2 border rounded-lg text-xs"
                                              placeholder="Loan"
                                            />
                                          </div>
                                        </div>

                                        {/* Specializations */}
                                        {specializations.length > 0 && (
                                          <div className="border-t pt-3">
                                            <label className="block text-xs font-semibold text-gray-600 mb-2">Specializations (Optional)</label>
                                            <div className="grid grid-cols-2 gap-2">
                                              {specializations.map(spec => (
                                                <label key={spec._id} className="flex items-center p-2 bg-gray-50 rounded">
                                                  <input
                                                    type="checkbox"
                                                    checked={selectedCourse.selectedSpecializations.some(s => s.specializationId === spec._id)}
                                                    onChange={() => toggleSpecialization(selectedDept.departmentId, course._id, spec)}
                                                    className="h-3 w-3 text-indigo-600 rounded"
                                                  />
                                                  <span className="ml-2 text-xs">{spec.name}</span>
                                                </label>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4 text-gray-500">
                            No courses available for this degree
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Financial Aid */}
          <div className="mb-8 border-b pb-6">
            <div className="flex justify-between items-center cursor-pointer mb-4" onClick={() => toggleSection('financial')}>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-indigo-600" />
                Financial Aid
              </h2>
              {expandedSections.financial ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
            
            {expandedSections.financial && (
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Financial Aid Content</label>
                <textarea
                  value={financialAidContent}
                  onChange={(e) => setFinancialAidContent(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Enter financial aid information"
                />
              </div>
            )}
          </div>

          {/* Rankings */}
          <div className="mb-8 border-b pb-6">
            <div className="flex justify-between items-center cursor-pointer mb-4" onClick={() => toggleSection('rankings')}>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-indigo-600" />
                Rankings
              </h2>
              {expandedSections.rankings ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
            
            {expandedSections.rankings && (
              <div className="space-y-4">
                {rankings.map((ranking, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Ranking {index + 1}</label>
                      {rankings.length > 1 && (
                        <button type="button" onClick={() => removeRanking(index)} className="text-red-500">
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={ranking.RatingNumber}
                        onChange={(e) => handleRankingChange(index, 'RatingNumber', e.target.value)}
                        className="px-4 py-2 border rounded-lg"
                        placeholder="Ranking Heading"
                      />
                      <input
                        type="text"
                        value={ranking.RatingDescription}
                        onChange={(e) => handleRankingChange(index, 'RatingDescription', e.target.value)}
                        className="px-4 py-2 border rounded-lg"
                        placeholder="Description"
                      />
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addRanking} className="flex items-center text-sm text-indigo-600">
                  <Plus className="h-4 w-4 mr-1" /> Add Ranking
                </button>
              </div>
            )}
          </div>

          {/* Reviews */}
          <div className="mb-8">
            <div className="flex justify-between items-center cursor-pointer mb-4" onClick={() => toggleSection('reviews')}>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-indigo-600" />
                Reviews
              </h2>
              {expandedSections.reviews ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
            
            {expandedSections.reviews && (
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Review {index + 1}</label>
                      {reviews.length > 1 && (
                        <button type="button" onClick={() => removeReview(index)} className="text-red-500">
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <input
                        type="text"
                        value={review.name}
                        onChange={(e) => handleReviewChange(index, 'name', e.target.value)}
                        className="px-4 py-2 border rounded-lg"
                        placeholder="Name"
                      />
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={review.Rating}
                        onChange={(e) => handleReviewChange(index, 'Rating', e.target.value)}
                        className="px-4 py-2 border rounded-lg"
                        placeholder="Rating (1-5)"
                      />
                    </div>
                    <textarea
                      value={review.description}
                      onChange={(e) => handleReviewChange(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Review description"
                    />
                  </div>
                ))}
                <button type="button" onClick={addReview} className="flex items-center text-sm text-indigo-600">
                  <Plus className="h-4 w-4 mr-1" /> Add Review
                </button>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader size={4} color="border-white" />
                  <span className="ml-2">Creating...</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Create University
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}