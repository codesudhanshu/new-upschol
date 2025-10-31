"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  FileText, 
  GraduationCap, 
  FileImage,
  Plus, 
  Calendar,
  Home,
  Award,
  MapPin,
  Landmark,
  Globe,
  ClipboardList,
  HelpCircle,
  Link as LinkIcon,
  Star,
  Laptop,
  Book,
  DollarSign,
  Check,
  ChevronDown,
  ChevronUp,
  X,
  BarChart2,
  MessageSquare,
  ListOrdered,
  List,
  AlignRight,
  AlignCenter,
  AlignLeft,
  Underline,
  Italic,
  Bold,
  Image as ImageIcon
} from 'lucide-react';

// Mock Swal and Loader components
const Swal = {
  fire: (options) => {
    alert(`${options.title}\n${options.text}`);
    return Promise.resolve({ isConfirmed: true });
  }
};

const Loader = ({ size = 4, color = "border-white" }) => (
  <div className={`animate-spin rounded-full h-${size} w-${size} border-b-2 ${color}`}></div>
);

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  </div>
);

export default function UniversityCreateForm() {
  const editorRef = useRef(null);
  const specializationEditorRefs = useRef({});

  // Main form state
  const [formData, setFormData] = useState({
    universityName: '',
    keywordDescription: '',
    universityRating: '',
    digitalInfrastructure: '',
    curriculum: '',
    valueForMoney: '',
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
    isGlobalCollege: false,
    isLocalCollege: false,
    isDBA: false,
  });

  // Arrays for multiple entries
  const [universityFacts, setUniversityFacts] = useState([{ fact: '' }]);
  const [faqs, setFaqs] = useState([{ question: '', answer: '' }]);
  const [selectedApprovals, setSelectedApprovals] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [financialOptions, setFinancialOptions] = useState([
    { category: '', scholarshipCredit: '', eligibilityDocuments: '' }
  ]);
  const [examinationPatterns, setExaminationPatterns] = useState([{ pattern: '' }]);
  const [advantages, setAdvantages] = useState([
    { description: '', benefits: [''] }
  ]);
  const [rankings, setRankings] = useState([
    { RatingNumber: '', RatingDescription: '' }
  ]);
  const [reviews, setReviews] = useState([
    { name: '', Rating: '', description: '' }
  ]);

  // File uploads
  const [logo, setLogo] = useState(null);
  const [universityHomeImage, setUniversityHomeImage] = useState(null);
  const [sampleCertificate, setSampleCertificate] = useState(null);

  // Dropdown data
  const [approvals, setApprovals] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [courses, setCourses] = useState([]);
  const [department, setDepartment] = useState([]);
  const [specializations, setSpecializations] = useState({});

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    basicInfo: true,
    about: true,
    media: true,
    location: true,
    academics: true,
    financial: true,
    approvals: true,
    partners: true,
    courses: true,
    rankings: true,
    reviews: true
  });

  // Fetch dropdown data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Mock data - Replace with your actual API calls
        // const [approvalsRes, companiesRes, coursesRes, departmentRes] = await Promise.all([
        //   getAllApprovals(),
        //   getAllCompanies(),
        //   getAllCourses(),
        //   departmentList()
        // ]);

        // Mock data for testing
        setApprovals([
          { _id: 'a1', title: 'UGC Approved' },
          { _id: 'a2', title: 'AICTE Approved' },
          { _id: 'a3', title: 'NAAC A+ Accredited' }
        ]);

        setCompanies([
          { _id: 'c1', title: 'Google' },
          { _id: 'c2', title: 'Microsoft' },
          { _id: 'c3', title: 'Amazon' },
          { _id: 'c4', title: 'TCS' }
        ]);

        setCourses([
          { _id: '1', courseName: 'MBA' },
          { _id: '2', courseName: 'BBA' },
          { _id: '3', courseName: 'MCA' },
          { _id: '4', courseName: 'B.Tech' }
        ]);

        setDepartment([
          { _id: 'd1', name: 'Engineering' },
          { _id: 'd2', name: 'Management' }
        ]);

        // Mock specializations for each course
        setSpecializations({
          '1': [
            { _id: 's1', name: 'Finance' },
            { _id: 's2', name: 'Marketing' },
            { _id: 's3', name: 'HR Management' },
            { _id: 's4', name: 'Operations' }
          ],
          '2': [
            { _id: 's5', name: 'International Business' },
            { _id: 's6', name: 'Entrepreneurship' }
          ],
          '3': [
            { _id: 's7', name: 'Artificial Intelligence' },
            { _id: 's8', name: 'Data Science' },
            { _id: 's9', name: 'Cloud Computing' }
          ],
          '4': [
            { _id: 's10', name: 'Computer Science' },
            { _id: 's11', name: 'Mechanical Engineering' },
            { _id: 's12', name: 'Civil Engineering' }
          ]
        });

      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error.message || 'Failed to load dropdown data',
          confirmButtonColor: '#ef4444'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Rich text editor functions
  const formatText = (command) => {
    document.execCommand(command, false, null);
  };

  const changeFontSize = (size) => {
    document.execCommand('fontSize', false, size);
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      document.execCommand('createLink', false, url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      document.execCommand('insertImage', false, url);
    }
  };

  const handleContentChange = (e) => {
    // Content is automatically updated in the contentEditable div
  };

  // Handle basic input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle starting key points change
  const handleKeyPointChange = (index, value) => {
    const newKeyPoints = [...formData.startingKeyPoints];
    newKeyPoints[index] = value;
    setFormData(prev => ({
      ...prev,
      startingKeyPoints: newKeyPoints
    }));
  };

  // Handle university facts changes
  const handleFactChange = (index, value) => {
    const newFacts = [...universityFacts];
    newFacts[index].fact = value;
    setUniversityFacts(newFacts);
  };

  const addFact = () => {
    setUniversityFacts([...universityFacts, { fact: '' }]);
  };

  const removeFact = (index) => {
    const newFacts = [...universityFacts];
    newFacts.splice(index, 1);
    setUniversityFacts(newFacts);
  };

  // Handle FAQ changes
  const handleFaqChange = (index, field, value) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const removeFaq = (index) => {
    const newFaqs = [...faqs];
    newFaqs.splice(index, 1);
    setFaqs(newFaqs);
  };

  // Handle approvals selection
  const toggleApproval = (approvalId) => {
    setSelectedApprovals(prev => 
      prev.includes(approvalId) 
        ? prev.filter(id => id !== approvalId) 
        : [...prev, approvalId]
    );
  };

  // Handle companies selection
  const toggleCompany = (companyId) => {
    setSelectedCompanies(prev => 
      prev.includes(companyId) 
        ? prev.filter(id => id !== companyId) 
        : [...prev, companyId]
    );
  };

  // Handle courses selection and pricing
  const toggleCourse = (courseId) => {
    setSelectedCourses(prev => {
      if (prev.some(c => c.courseId === courseId)) {
        return prev.filter(c => c.courseId !== courseId);
      } else {
        return [...prev, { 
          courseId, 
          semesterPrice: '', 
          annualPrice: '', 
          oneTimePrice: '',
          totalAmount: '',
          loanAmount: '',
          courseContent: '',
          selectedSpecializations: []
        }];
      }
    });
  };

  const handleCoursePriceChange = (courseId, field, value) => {
    setSelectedCourses(prev => 
      prev.map(course => 
        course.courseId === courseId 
          ? { ...course, [field]: value } 
          : course
      )
    );
  };

  // Handle specialization selection
  const toggleSpecialization = (courseId, specializationId) => {
    setSelectedCourses(prev =>
      prev.map(course => {
        if (course.courseId === courseId) {
          const selectedSpecs = course.selectedSpecializations || [];
          if (selectedSpecs.some(s => s.specializationId === specializationId)) {
            return {
              ...course,
              selectedSpecializations: selectedSpecs.filter(s => s.specializationId !== specializationId)
            };
          } else {
            return {
              ...course,
              selectedSpecializations: [...selectedSpecs, {
                specializationId,
                specializationContent: ''
              }]
            };
          }
        }
        return course;
      })
    );
  };

  // Handle specialization content change
  const handleSpecializationContentChange = (courseId, specializationId) => {
    const editorKey = `${courseId}-${specializationId}`;
    const content = specializationEditorRefs.current[editorKey]?.innerHTML || '';
    
    setSelectedCourses(prev =>
      prev.map(course => {
        if (course.courseId === courseId) {
          return {
            ...course,
            selectedSpecializations: course.selectedSpecializations.map(spec =>
              spec.specializationId === specializationId
                ? { ...spec, specializationContent: content }
                : spec
            )
          };
        }
        return course;
      })
    );
  };

  // Handle financial options
  const handleFinancialChange = (index, field, value) => {
    const newFinancialOptions = [...financialOptions];
    newFinancialOptions[index][field] = value;
    setFinancialOptions(newFinancialOptions);
  };

  const addFinancialOption = () => {
    setFinancialOptions([...financialOptions, 
      { category: '', scholarshipCredit: '', eligibilityDocuments: '' }
    ]);
  };

  const removeFinancialOption = (index) => {
    const newFinancialOptions = [...financialOptions];
    newFinancialOptions.splice(index, 1);
    setFinancialOptions(newFinancialOptions);
  };

  // Handle examination patterns
  const handleExamPatternChange = (index, value) => {
    const newPatterns = [...examinationPatterns];
    newPatterns[index].pattern = value;
    setExaminationPatterns(newPatterns);
  };

  const addExamPattern = () => {
    setExaminationPatterns([...examinationPatterns, { pattern: '' }]);
  };

  const removeExamPattern = (index) => {
    const newPatterns = [...examinationPatterns];
    newPatterns.splice(index, 1);
    setExaminationPatterns(newPatterns);
  };

  // Handle advantages
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

  const addAdvantage = () => {
    setAdvantages([...advantages, { description: '', benefits: [''] }]);
  };

  const removeAdvantage = (index) => {
    const newAdvantages = [...advantages];
    newAdvantages.splice(index, 1);
    setAdvantages(newAdvantages);
  };

  // Handle rankings changes
  const handleRankingChange = (index, field, value) => {
    const newRankings = [...rankings];
    newRankings[index][field] = value;
    setRankings(newRankings);
  };

  const addRanking = () => {
    setRankings([...rankings, { RatingNumber: '', RatingDescription: '' }]);
  };

  const removeRanking = (index) => {
    const newRankings = [...rankings];
    newRankings.splice(index, 1);
    setRankings(newRankings);
  };

  // Handle reviews changes
  const handleReviewChange = (index, field, value) => {
    const newReviews = [...reviews];
    newReviews[index][field] = value;
    setReviews(newReviews);
  };

  const addReview = () => {
    setReviews([...reviews, { name: '', Rating: '', description: '' }]);
  };

  const removeReview = (index) => {
    const newReviews = [...reviews];
    newReviews.splice(index, 1);
    setReviews(newReviews);
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.universityName || !logo || !universityHomeImage) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'University Name, Logo, and Home Image are required fields',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      // Append basic form data
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'startingKeyPoints') {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      });

      // Append files
      if (logo) formDataToSend.append('logo', logo);
      if (universityHomeImage) formDataToSend.append('universityHomeImage', universityHomeImage);
      if (sampleCertificate) formDataToSend.append('sampleCertificate', sampleCertificate);

      // Get main course content
      const courseContent = editorRef.current?.innerHTML || '';

      // Append arrays
      formDataToSend.append('universityFacts', JSON.stringify(universityFacts));
      formDataToSend.append('faqs', JSON.stringify(faqs));
      formDataToSend.append('selectedApprovals', JSON.stringify(selectedApprovals));
      formDataToSend.append('selectedCompanies', JSON.stringify(selectedCompanies));
      formDataToSend.append('selectedCourses', JSON.stringify(selectedCourses.map(course => ({
        ...course,
        courseContent
      }))));
      formDataToSend.append('financialOptions', JSON.stringify(financialOptions));
      formDataToSend.append('examinationPatterns', JSON.stringify(examinationPatterns));
      formDataToSend.append('advantages', JSON.stringify(advantages));
      formDataToSend.append('rankings', JSON.stringify(rankings));
      formDataToSend.append('reviews', JSON.stringify(reviews));

      // Submit to API
      // const result = await createuniversity(formDataToSend);

      // Mock success for demo
      console.log('Form Data:', Object.fromEntries(formDataToSend));
      console.log('Selected Courses with Specializations:', selectedCourses);
      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'University created successfully!',
        confirmButtonColor: '#3b82f6'
      });
      
      // Uncomment to reset form on success
      // resetForm();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message || 'Failed to create university',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      universityName: '',
      keywordDescription: '',
      universityRating: '',
      digitalInfrastructure: '',
      curriculum: '',
      valueForMoney: '',
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
      isGlobalCollege: false,
      isLocalCollege: false,
      isDBA: false,
    });
    setUniversityFacts([{ fact: '' }]);
    setFaqs([{ question: '', answer: '' }]);
    setSelectedApprovals([]);
    setSelectedCompanies([]);
    setSelectedCourses([]);
    setFinancialOptions([{ category: '', scholarshipCredit: '', eligibilityDocuments: '' }]);
    setExaminationPatterns([{ pattern: '' }]);
    setAdvantages([{ description: '', benefits: [''] }]);
    setRankings([{ RatingNumber: '', RatingDescription: '' }]);
    setReviews([{ name: '', Rating: '', description: '' }]);
    setLogo(null);
    setUniversityHomeImage(null);
    setSampleCertificate(null);
    if (editorRef.current) editorRef.current.innerHTML = '';
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New University</h1>
            <p className="text-gray-600">Add a new university to the platform</p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
        {/* Basic Information Section */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div 
            className="flex justify-between items-center cursor-pointer mb-4"
            onClick={() => toggleSection('basicInfo')}
          >
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
              Basic Information
            </h2>
            {expandedSections.basicInfo ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
          
          {expandedSections.basicInfo && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <GraduationCap className="h-4 w-4 mr-2 text-indigo-600" />
                    University Name *
                  </label>
                  <input
                    type="text"
                    name="universityName"
                    value={formData.universityName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all"
                    placeholder="University Name"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <Star className="h-4 w-4 mr-2 text-indigo-600" />
                    University Rating
                  </label>
                  <input
                    type="number"
                    name="universityRating"
                    value={formData.universityRating}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all"
                    placeholder="Average rating (0-5)"
                  />
                </div>
                
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <Laptop className="h-4 w-4 mr-2 text-indigo-600" />
                    Digital Infrastructure
                  </label>
                  <input
                     type="number"
                    name="digitalInfrastructure"
                    value={formData.digitalInfrastructure}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all"
                    placeholder="Average rating (0-5)"
                  />
                </div>
                
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <Book className="h-4 w-4 mr-2 text-indigo-600" />
                    Curriculum
                  </label>
                  <input
                     type="number"
                    name="curriculum"
                    value={formData.curriculum}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all"
                    placeholder="Average rating (0-5)"
                  />
                </div>
                 <div>
                <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <DollarSign className="h-4 w-4 mr-2 text-indigo-600" />
                  Value For Money
                </label>
                <input
                type="number"
                  name="valueForMoney"
                  value={formData.valueForMoney}
                  onChange={handleInputChange}
                  min="0"
                    max="5"
                    step="0.1"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                  placeholder="Average rating (0-5)"
                />
              </div>
              </div>
               <div>
                <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <Check className="h-4 w-4 mr-2 text-indigo-600" />
                  Starting 2 Key Points
                </label>
                {formData.startingKeyPoints.map((point, index) => (
                  <input
                    key={index}
                    type="text"
                    value={point}
                    onChange={(e) => handleKeyPointChange(index, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 mb-2"
                    placeholder={`Key point ${index + 1}`}
                  />
                ))}
              </div>

               <div>
                <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <LinkIcon className="h-4 w-4 mr-2 text-indigo-600" />
                  College URL
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    https://upschol.com/university/
                  </span>
                  <input
                    type="text"
                    name="collegeUrl"
                    value={formData.collegeUrl}
                    onChange={handleInputChange}
                    className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-3 border bg-gray-50 text-gray-900"
                    placeholder="university-name"
                  />
                </div>
              </div>
              
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <FileText className="h-4 w-4 mr-2 text-indigo-600" />
                  Keyword
                </label>
                <input
                  type="text"
                  name="keyword"
                  value={formData.keyword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                  placeholder="SEO keyword for the university"
                />
              </div>
              <div>
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <FileText className="h-4 w-4 mr-2 text-indigo-600" />
                    SEO Description
                  </label>
                  <input
                    type="text"
                    name="keywordDescription"
                    value={formData.keywordDescription}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all"
                    placeholder="Brief description for keywords"
                  />
                </div>
              
              <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isGlobalCollege"
                    name="isGlobalCollege"
                    checked={formData.isGlobalCollege}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isGlobalCollege" className="ml-2 block text-sm text-gray-800">
                    Global College
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isLocalCollege"
                    name="isLocalCollege"
                    checked={formData.isLocalCollege}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isLocalCollege" className="ml-2 block text-sm text-gray-800">
                    Local College
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isDBA"
                    name="isDBA"
                    checked={formData.isDBA}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isDBA" className="ml-2 block text-sm text-gray-800">
                    DBA College
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* About College Section */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div 
            className="flex justify-between items-center cursor-pointer mb-4"
            onClick={() => toggleSection('about')}
          >
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Home className="h-5 w-5 mr-2 text-indigo-600" />
              About College
            </h2>
            {expandedSections.about ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
          
          {expandedSections.about && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <FileText className="h-4 w-4 mr-2 text-indigo-600" />
                  About College
                </label>
                <textarea
                  name="aboutCollege"
                  value={formData.aboutCollege}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                  placeholder="Detailed description about the college"
                />
              </div>
              
              
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <FileText className="h-4 w-4 mr-2 text-indigo-600" />
                  University Facts
                </label>
                {universityFacts.map((fact, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={fact.fact}
                      onChange={(e) => handleFactChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                      placeholder={`Fact ${index + 1}`}
                    />
                    {universityFacts.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFact(index)}
                        className="ml-2 p-2 text-red-500 hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFact}
                  className="mt-2 flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Another Fact
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mb-8 border-b border-gray-200 pb-6">
          <div 
            className="flex justify-between items-center cursor-pointer mb-4"
            onClick={() => toggleSection('location')}
          >
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
              Location
            </h2>
            {expandedSections.location ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
          
          {expandedSections.location && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
                  University Address
                </label>
                <textarea
                  name="universityAddress"
                  value={formData.universityAddress}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                  placeholder="Full address of the university"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                    placeholder="City"
                  />
                </div>
                
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                    placeholder="Pincode"
                  />
                </div>
                
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <MapPin className="h-4 w-4 mr-2 text-indigo-600" />
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                    placeholder="State"
                  />
                </div>
                
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <Globe className="h-4 w-4 mr-2 text-indigo-600" />
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                    placeholder="Country"
                  />
                </div>
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
                      onChange={(e) => setLogo(e.target.files[0])}
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
                      onChange={(e) => setUniversityHomeImage(e.target.files[0])}
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
                      onChange={(e) => setSampleCertificate(e.target.files[0])}
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
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div 
            className="flex justify-between items-center cursor-pointer mb-4"
            onClick={() => toggleSection('academics')}
          >
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
              Academics
            </h2>
            {expandedSections.academics ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
          
          {expandedSections.academics && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <ClipboardList className="h-4 w-4 mr-2 text-indigo-600" />
                  Admission Process
                </label>
                <textarea
                  name="admissionProcess"
                  value={formData.admissionProcess}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                  placeholder="Detailed admission process"
                />
              </div>
              
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <HelpCircle className="h-4 w-4 mr-2 text-indigo-600" />
                  FAQs
                </label>
                {faqs.map((faq, index) => (
                  <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">Question {index + 1}</label>
                      {faqs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFaq(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                      placeholder="Enter question"
                    />
                    <textarea
                      value={faq.answer}
                      onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                      placeholder="Enter answer"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFaq}
                  className="mt-2 flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Another FAQ
                </button>
              </div>
              
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <ClipboardList className="h-4 w-4 mr-2 text-indigo-600" />
                  Examination Pattern
                </label>
                {examinationPatterns.map((pattern, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={pattern.pattern}
                      onChange={(e) => handleExamPatternChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                      placeholder={`Examination pattern ${index + 1}`}
                    />
                    {examinationPatterns.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExamPattern(index)}
                        className="ml-2 p-2 text-red-500 hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addExamPattern}
                  className="mt-2 flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Another Pattern
                </button>
              </div>
              
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <Check className="h-4 w-4 mr-2 text-indigo-600" />
                  Advantages
                </label>
                {advantages.map((advantage, index) => (
                  <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">Advantage {index + 1}</label>
                      {advantages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAdvantage(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    <textarea
                      value={advantage.description}
                      onChange={(e) => handleAdvantageChange(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                      placeholder="Advantage description"
                    />
                    <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                    {advantage.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={benefit}
                          onChange={(e) => handleBenefitChange(index, benefitIndex, e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                          placeholder={`Benefit ${benefitIndex + 1}`}
                        />
                        {advantage.benefits.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeBenefit(index, benefitIndex)}
                            className="ml-2 p-1 text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addBenefit(index)}
                      className="mt-2 flex items-center text-xs text-indigo-600 hover:text-indigo-800"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Benefit
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAdvantage}
                  className="mt-2 flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Another Advantage
                </button>
              </div>
            </div>
          )}
        </div>


         {/* Affiliated Institutions Section */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div 
            className="flex justify-between items-center cursor-pointer mb-4"
            onClick={() => toggleSection('approvals')}
          >
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Award className="h-5 w-5 mr-2 text-indigo-600" />
              Affiliated Institutions
            </h2>
            {expandedSections.approvals ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
          
          {expandedSections.approvals && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Affiliated Institutions
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {approvals.map(approval => (
                  <div key={approval._id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`approval-${approval._id}`}
                      checked={selectedApprovals.includes(approval._id)}
                      onChange={() => toggleApproval(approval._id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`approval-${approval._id}`} className="ml-2 block text-sm text-gray-800">
                      {approval.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Placement Partners Section */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div 
            className="flex justify-between items-center cursor-pointer mb-4"
            onClick={() => toggleSection('partners')}
          >
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Landmark className="h-5 w-5 mr-2 text-indigo-600" />
              Placement Partners
            </h2>
            {expandedSections.partners ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
          
          {expandedSections.partners && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Placement Partners
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {companies.map(company => (
                  <div key={company._id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`company-${company._id}`}
                      checked={selectedCompanies.includes(company._id)}
                      onChange={() => toggleCompany(company._id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`company-${company._id}`} className="ml-2 block text-sm text-gray-800">
                      {company.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Courses Section with Specializations */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div 
            className="flex justify-between items-center cursor-pointer mb-4"
            onClick={() => toggleSection('courses')}
          >
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
              Courses Offered
            </h2>
            {expandedSections.courses ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
          
          {expandedSections.courses && (
            <div className="space-y-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Courses and Set Pricing
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
                {courses.map(course => {
                  const selectedCourse = selectedCourses.find(c => c.courseId === course._id);
                  const isSelected = !!selectedCourse;
                  
                  return (
                    <div key={course._id} className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center mb-3">
                        <input
                          type="checkbox"
                          id={`course-${course._id}`}
                          checked={isSelected}
                          onChange={() => toggleCourse(course._id)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`course-${course._id}`} className="ml-2 block text-sm font-bold text-gray-800">
                          {course.courseName}
                        </label>
                      </div>
                      
                      {isSelected && (
                        <div className="mt-3 space-y-3 border-t pt-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Semester Price</label>
                              <input
                                type="number"
                                value={selectedCourse.semesterPrice || ''}
                                onChange={(e) => handleCoursePriceChange(course._id, 'semesterPrice', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900"
                                placeholder="Amount"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Annual Price</label>
                              <input
                                type="number"
                                value={selectedCourse.annualPrice || ''}
                                onChange={(e) => handleCoursePriceChange(course._id, 'annualPrice', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900"
                                placeholder="Amount"
                              />
                            </div>

                            <div>
                              <label className="block text-xs text-gray-600 mb-1">One Time Price</label>
                              <input
                                type="number"
                                value={selectedCourse.oneTimePrice || ''}
                                onChange={(e) => handleCoursePriceChange(course._id, 'oneTimePrice', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900"
                                placeholder="Amount"
                              />
                            </div>

                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Total Amount</label>
                              <input
                                type="number"
                                value={selectedCourse.totalAmount || ''}
                                onChange={(e) => handleCoursePriceChange(course._id, 'totalAmount', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900"
                                placeholder="Total"
                              />
                            </div>

                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Loan Amount</label>
                              <input
                                type="number"
                                value={selectedCourse.loanAmount || ''}
                                onChange={(e) => handleCoursePriceChange(course._id, 'loanAmount', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900"
                                placeholder="Loan"
                              />
                            </div>
                          </div>

                          {/* Specializations Section */}
                          {specializations[course._id] && specializations[course._id].length > 0 && (
                            <div className="border-t pt-3 mt-3">
                              <label className="block text-xs font-semibold text-gray-700 mb-2">
                                Specializations (Optional)
                              </label>
                              <div className="space-y-3">
                                {specializations[course._id].map(spec => {
                                  const selectedSpec = selectedCourse.selectedSpecializations?.find(
                                    s => s.specializationId === spec._id
                                  );
                                  const isSpecSelected = !!selectedSpec;
                                  
                                  return (
                                    <div key={spec._id} className="bg-white p-3 rounded border border-gray-200">
                                      <div className="flex items-center mb-2">
                                        <input
                                          type="checkbox"
                                          id={`spec-${course._id}-${spec._id}`}
                                          checked={isSpecSelected}
                                          onChange={() => toggleSpecialization(course._id, spec._id)}
                                          className="h-3 w-3 text-indigo-600"
                                        />
                                        <label 
                                          htmlFor={`spec-${course._id}-${spec._id}`}
                                          className="ml-2 text-xs font-medium text-gray-700"
                                        >
                                          {spec.name}
                                        </label>
                                      </div>
                                      
                                      {isSpecSelected && (
                                        <div className="mt-2">
                                          <label className="block text-xs text-gray-600 mb-1">
                                            Specialization Content
                                          </label>
                                          
                                          {/* Mini Toolbar for specialization editor */}
                                          <div className="border border-gray-200 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1">
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const editorKey = `${course._id}-${spec._id}`;
                                                specializationEditorRefs.current[editorKey]?.focus();
                                                document.execCommand('bold');
                                              }}
                                              className="p-1 text-indigo-600 hover:bg-indigo-50 rounded"
                                              title="Bold"
                                            >
                                              <Bold className="h-3 w-3" />
                                            </button>
                                            
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const editorKey = `${course._id}-${spec._id}`;
                                                specializationEditorRefs.current[editorKey]?.focus();
                                                document.execCommand('italic');
                                              }}
                                              className="p-1 text-indigo-600 hover:bg-indigo-50 rounded"
                                              title="Italic"
                                            >
                                              <Italic className="h-3 w-3" />
                                            </button>
                                            
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const editorKey = `${course._id}-${spec._id}`;
                                                specializationEditorRefs.current[editorKey]?.focus();
                                                document.execCommand('underline');
                                              }}
                                              className="p-1 text-indigo-600 hover:bg-indigo-50 rounded"
                                              title="Underline"
                                            >
                                              <Underline className="h-3 w-3" />
                                            </button>

                                            <div className="h-4 w-px bg-gray-200"></div>
                                            
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const editorKey = `${course._id}-${spec._id}`;
                                                specializationEditorRefs.current[editorKey]?.focus();
                                                document.execCommand('insertUnorderedList');
                                              }}
                                              className="p-1 text-indigo-600 hover:bg-indigo-50 rounded"
                                              title="Bullet List"
                                            >
                                              <List className="h-3 w-3" />
                                            </button>

                                            <button
                                              type="button"
                                              onClick={() => {
                                                const editorKey = `${course._id}-${spec._id}`;
                                                specializationEditorRefs.current[editorKey]?.focus();
                                                document.execCommand('insertOrderedList');
                                              }}
                                              className="p-1 text-indigo-600 hover:bg-indigo-50 rounded"
                                              title="Numbered List"
                                            >
                                              <ListOrdered className="h-3 w-3" />
                                            </button>
                                          </div>
                                          
                                          {/* Specialization content editor */}
                                          <div
                                            ref={(el) => {
                                              if (el) {
                                                specializationEditorRefs.current[`${course._id}-${spec._id}`] = el;
                                              }
                                            }}
                                            contentEditable={!isSubmitting}
                                            onInput={() => handleSpecializationContentChange(course._id, spec._id)}
                                            className="min-h-32 p-3 border border-t-0 border-gray-200 rounded-b-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-gray-900 text-xs"
                                            style={{
                                              fontSize: '12px',
                                              lineHeight: '1.5',
                                              fontFamily: 'system-ui, sans-serif'
                                            }}
                                            suppressContentEditableWarning={true}
                                          />
                                          <div className="text-xs text-gray-500 mt-1">
                                            Write specialization details here...
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Main Course Content Editor */}
              <div className="border-t pt-6">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  General Course Content
                </label>
                
                {/* Toolbar */}
                <div className="border border-gray-200 rounded-t-lg bg-gray-50 p-3 flex flex-wrap gap-2">
                  <select 
                    onChange={(e) => changeFontSize(e.target.value)}
                    className="px-2 py-1 border border-gray-200 rounded text-sm text-gray-900 bg-white"
                    defaultValue="3"
                    disabled={isSubmitting}
                  >
                    <option value="1">Small</option>
                    <option value="2">Medium</option>
                    <option value="3">Normal</option>
                    <option value="4">Large</option>
                    <option value="5">Extra Large</option>
                  </select>
    
                  <div className="h-6 w-px bg-gray-200"></div>
    
                  <button
                    type="button"
                    onClick={() => formatText('bold')}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded"
                    title="Bold"
                    disabled={isSubmitting}
                  >
                    <Bold className="h-4 w-4" />
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => formatText('italic')}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded"
                    title="Italic"
                    disabled={isSubmitting}
                  >
                    <Italic className="h-4 w-4" />
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => formatText('underline')}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded"
                    title="Underline"
                    disabled={isSubmitting}
                  >
                    <Underline className="h-4 w-4" />
                  </button>
    
                  <div className="h-6 w-px bg-gray-200"></div>
    
                  <button
                    type="button"
                    onClick={() => formatText('justifyLeft')}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded"
                    title="Align Left"
                    disabled={isSubmitting}
                  >
                    <AlignLeft className="h-4 w-4" />
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => formatText('justifyCenter')}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded"
                    title="Align Center"
                    disabled={isSubmitting}
                  >
                    <AlignCenter className="h-4 w-4" />
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => formatText('justifyRight')}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded"
                    title="Align Right"
                    disabled={isSubmitting}
                  >
                    <AlignRight className="h-4 w-4" />
                  </button>
    
                  <div className="h-6 w-px bg-gray-200"></div>
    
                  <button
                    type="button"
                    onClick={() => formatText('insertUnorderedList')}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded"
                    title="Bullet List"
                    disabled={isSubmitting}
                  >
                    <List className="h-4 w-4" />
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => formatText('insertOrderedList')}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded"
                    title="Numbered List"
                    disabled={isSubmitting}
                  >
                    <ListOrdered className="h-4 w-4" />
                  </button>
    
                  <div className="h-6 w-px bg-gray-200"></div>
    
                  <button
                    type="button"
                    onClick={insertLink}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded"
                    title="Insert Link"
                    disabled={isSubmitting}
                  >
                    <LinkIcon className="h-4 w-4" />
                  </button>
                  
                  <button
                    type="button"
                    onClick={insertImage}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded"
                    title="Insert Image"
                    disabled={isSubmitting}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </button>
                </div>
    
                {/* Main Editor */}
                <div
                  ref={editorRef}
                  contentEditable={!isSubmitting}
                  onInput={handleContentChange}
                  className="min-h-96 p-4 border border-t-0 border-gray-200 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    fontFamily: 'system-ui, sans-serif',
                    minHeight: '400px'
                  }}
                  suppressContentEditableWarning={true}
                />
                <div className="text-sm text-gray-600 mt-1">
                  Write general course content here...
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Financial Section */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div 
            className="flex justify-between items-center cursor-pointer mb-4"
            onClick={() => toggleSection('financial')}
          >
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-indigo-600" />
              Financial Options
            </h2>
            {expandedSections.financial ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
          
          {expandedSections.financial && (
            <div className="space-y-6">
              {financialOptions.map((option, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">Financial Option {index + 1}</label>
                    {financialOptions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFinancialOption(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <input
                        type="text"
                        value={option.category}
                        onChange={(e) => handleFinancialChange(index, 'category', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                        placeholder="Category"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Scholarship Credit</label>
                      <input
                        type="text"
                        value={option.scholarshipCredit}
                        onChange={(e) => handleFinancialChange(index, 'scholarshipCredit', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                        placeholder="Scholarship credit"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility/Documents</label>
                      <input
                        type="text"
                        value={option.eligibilityDocuments}
                        onChange={(e) => handleFinancialChange(index, 'eligibilityDocuments', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                        placeholder="Eligibility documents"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addFinancialOption}
                className="mt-2 flex items-center text-sm text-indigo-600 hover:text-indigo-800"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Financial Option
              </button>
            </div>
          )}
        </div>

        {/* Rankings Section */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div 
            className="flex justify-between items-center cursor-pointer mb-4"
            onClick={() => toggleSection('rankings')}
          >
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <BarChart2 className="h-5 w-5 mr-2 text-indigo-600" />
              Rankings
            </h2>
            {expandedSections.rankings ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
          
          {expandedSections.rankings && (
            <div className="space-y-6">
              {rankings.map((ranking, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">Ranking {index + 1}</label>
                    {rankings.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRanking(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ranking Heading</label>
                      <input
                        type="text"
                        value={ranking.RatingNumber}
                        onChange={(e) => handleRankingChange(index, 'RatingNumber', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                        placeholder="Ranking number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ranking Description</label>
                      <input
                        type="text"
                        value={ranking.RatingDescription}
                        onChange={(e) => handleRankingChange(index, 'RatingDescription', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                        placeholder="Ranking description"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addRanking}
                className="mt-2 flex items-center text-sm text-indigo-600 hover:text-indigo-800"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Another Ranking
              </button>
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="mb-8">
          <div 
            className="flex justify-between items-center cursor-pointer mb-4"
            onClick={() => toggleSection('reviews')}
          >
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-indigo-600" />
              Reviews
            </h2>
            {expandedSections.reviews ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
          
          {expandedSections.reviews && (
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">Review {index + 1}</label>
                    {reviews.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeReview(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={review.name}
                        onChange={(e) => handleReviewChange(index, 'name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                        placeholder="Reviewer name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={review.Rating}
                        onChange={(e) => handleReviewChange(index, 'Rating', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                        placeholder="Rating (1-5)"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={review.description}
                      onChange={(e) => handleReviewChange(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900"
                      placeholder="Review description"
                    />
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addReview}
                className="mt-2 flex items-center text-sm text-indigo-600 hover:text-indigo-800"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Another Review
              </button>
            </div>
          )}
        </div>
        
        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
          <button
            type="button"
            onClick={resetForm}
            disabled={isSubmitting}
            className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}