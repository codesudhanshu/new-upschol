"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  BookOpen, FileText, GraduationCap, FileImage, Plus, Calendar,
  Home, Award, MapPin, Landmark, Globe, ClipboardList, HelpCircle,
  Link as LinkIcon, Star, Laptop, Book, DollarSign, Check,
  ChevronDown, ChevronUp, X, BarChart2, MessageSquare, ListOrdered,
  List, AlignRight, AlignCenter, AlignLeft, Underline, Italic, Bold,
  Image as ImageIcon, Save
} from 'lucide-react';
import { getAllApprovals, getAllCompanies, getAllCourses } from '@/app/api/admin/apiService';
import { getuniversityById, updateuniversity, departmentList } from '@/app/api/admin/courseapi';
import Swal from 'sweetalert2';

const Loader = ({ size = 4, color = "border-white" }) => (
  <div className={`animate-spin rounded-full h-${size} w-${size} border-b-2 ${color}`}></div>
);

export default function EditUniversityForm() {
  const { id } = useParams();
  const router = useRouter();
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
  const [existingFiles, setExistingFiles] = useState({
    logo: '',
    universityHomeImage: '',
    sampleCertificate: ''
  });

  // Dropdown data
  const [approvals, setApprovals] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  // UI states
  const [isLoading, setIsLoading] = useState(true);
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

  // Fetch university data
  useEffect(() => {
    const fetchUniversityData = async () => {
      try {
        setIsLoading(true);
        const [universityRes, approvalsRes, companiesRes, departmentRes, specializationsRes] = await Promise.all([
          getuniversityById(id),
          getAllApprovals(),
          getAllCompanies(),
          getAllCourses(),
          departmentList()
        ]);

        if (universityRes.status === true) {
          const university = universityRes.result.data;
          
          // Set form data
          setFormData({
            universityName: university.universityName || '',
            keywordDescription: university.keywordDescription || '',
            universityRating: university.universityRating || '',
            valueForMoney: university.valueForMoney || '',
            curriculum: university.curriculum || '',
            digitalInfrastructure: university.digitalInfrastructure || '',
            averageRating: university.averageRating || '',
            aboutCollege: university.aboutCollege || '',
            startingKeyPoints: university.startingKeyPoints || ['', ''],
            sampleCertificateDescription: university.sampleCertificateDescription || '',
            universityAddress: university.universityAddress || '',
            city: university.city || '',
            pincode: university.pincode || '',
            state: university.state || '',
            country: university.country || '',
            admissionProcess: university.admissionProcess || '',
            collegeUrl: university.collegeUrl || '',
            keyword: university.keyword || '',
            collegeType: university.collegeType || '',
            isDBA: university.isDBA || false,
          });

          // Set arrays
          setUniversityFacts(university.universityFacts?.length > 0 ? university.universityFacts : [{ fact: '' }]);
          setFaqs(university.faqs?.length > 0 ? university.faqs : [{ question: '', answer: '' }]);
          setSelectedApprovals(university.selectedApprovals || []);
          setSelectedCompanies(university.selectedCompanies || []);
          setSelectedDepartments(university.selectedDepartments || []);
          setExaminationPatterns(university.examinationPatterns?.length > 0 ? university.examinationPatterns : [{ pattern: '' }]);
          setAdvantages(university.advantages?.length > 0 ? university.advantages : [{ description: '', benefits: [''] }]);
          setRankings(university.rankings?.length > 0 ? university.rankings : [{ RatingNumber: '', RatingDescription: '' }]);
          setReviews(university.reviews?.length > 0 ? university.reviews : [{ name: '', Rating: '', description: '' }]);
          setFinancialAidContent(university.financialAidContent || '');

          // Set existing files
          setExistingFiles({
            logo: university.logo || '',
            universityHomeImage: university.universityHomeImage || '',
            sampleCertificate: university.sampleCertificate || ''
          });
        }

        // Set dropdown data
        setApprovals(approvalsRes.result?.approvals || []);
        setCompanies(companiesRes.result?.companies || []);
        setDepartments(departmentRes.result || []);
        setSpecializations(specializationsRes.data || []);

      } catch (error) {
        console.error('Error fetching university data:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to load university data',
          icon: 'error',
          confirmButtonColor: '#ef4444'
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchUniversityData();
    }
  }, [id]);

  // All the handler functions (same as create form)
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
      
      const degree = departments.find(dept => dept._id === departmentId);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.universityName) {
      Swal.fire({
        title: 'Missing Fields!',
        text: 'University Name is required!',
        icon: 'warning',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData object for file upload
      const formDataToSend = new FormData();

      // Add files to FormData if they are new
      if (logo) formDataToSend.append('logo', logo);
      if (universityHomeImage) formDataToSend.append('universityHomeImage', universityHomeImage);
      if (sampleCertificate) formDataToSend.append('sampleCertificate', sampleCertificate);

      // Prepare submission data
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

      // Send update request
      const response = await updateuniversity(id, formDataToSend);
      
      if (response.status) {
        Swal.fire({
          title: 'Success!',
          text: 'University updated successfully!',
          icon: 'success',
          confirmButtonColor: '#10b981'
        }).then(() => {
          router.push('/admin/dashboard/university');
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: response.message || 'Failed to update university',
          icon: 'error',
          confirmButtonColor: '#ef4444'
        });
      }
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to update university',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size={12} color="border-indigo-600" />
        <span className="ml-4 text-gray-600">Loading university data...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit University</h1>
              <p className="text-gray-600 mt-2">Update university information</p>
            </div>
            <button
              onClick={() => router.push('/admin/dashboard/university')}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back to List
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          {/* Basic Information Section - Same as create form */}
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
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Curriculum</label>
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
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Value For Money</label>
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

          {/* Media Section with existing file preview */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <div className="flex justify-between items-center cursor-pointer mb-4" onClick={() => toggleSection('media')}>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <FileImage className="h-5 w-5 mr-2 text-indigo-600" />
                Media
              </h2>
              {expandedSections.media ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
            
            {expandedSections.media && (
              <div className="space-y-6">
                {/* Logo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    University Logo {!logo && existingFiles.logo && <span className="text-green-600 text-sm">(Current file exists)</span>}
                  </label>
                  <div className="flex items-center space-x-4">
                    {existingFiles.logo && !logo && (
                      <div className="w-20 h-20 border rounded-lg overflow-hidden">
                        <img 
                          src={existingFiles.logo} 
                          alt="Current logo" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer bg-gray-50 hover:bg-indigo-50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileImage className="w-8 h-8 mb-3 text-indigo-500" />
                        <p className="mb-2 text-sm text-gray-600">
                          {logo ? logo.name : (existingFiles.logo ? 'Change logo' : 'Click to upload university logo')}
                        </p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden"
                        onChange={handleLogoUpload}
                      />
                    </label>
                  </div>
                </div>

                {/* Home Image */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    University Home Image {!universityHomeImage && existingFiles.universityHomeImage && <span className="text-green-600 text-sm">(Current file exists)</span>}
                  </label>
                  <div className="flex items-center space-x-4">
                    {existingFiles.universityHomeImage && !universityHomeImage && (
                      <div className="w-20 h-20 border rounded-lg overflow-hidden">
                        <img 
                          src={existingFiles.universityHomeImage} 
                          alt="Current home image" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer bg-gray-50 hover:bg-indigo-50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileImage className="w-8 h-8 mb-3 text-indigo-500" />
                        <p className="mb-2 text-sm text-gray-600">
                          {universityHomeImage ? universityHomeImage.name : (existingFiles.universityHomeImage ? 'Change home image' : 'Click to upload home image')}
                        </p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden"
                        onChange={handleHomeImageUpload}
                      />
                    </label>
                  </div>
                </div>

                {/* Sample Certificate */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Sample Certificate {!sampleCertificate && existingFiles.sampleCertificate && <span className="text-green-600 text-sm">(Current file exists)</span>}
                  </label>
                  <div className="flex items-center space-x-4">
                    {existingFiles.sampleCertificate && !sampleCertificate && (
                      <div className="w-20 h-20 border rounded-lg overflow-hidden">
                        <img 
                          src={existingFiles.sampleCertificate} 
                          alt="Current certificate" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer bg-gray-50 hover:bg-indigo-50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileImage className="w-8 h-8 mb-3 text-indigo-500" />
                        <p className="mb-2 text-sm text-gray-600">
                          {sampleCertificate ? sampleCertificate.name : (existingFiles.sampleCertificate ? 'Change certificate' : 'Click to upload sample certificate')}
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

          {/* All other sections remain exactly the same as create form */}
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

          {/* Rest of the sections (Academics, Affiliations, Courses, etc.) */}
          {/* ... Include all other sections exactly as in the create form ... */}

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
                  <span className="ml-2">Updating...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update University
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard/university')}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}