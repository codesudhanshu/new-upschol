"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Plus, Edit, Trash2, Eye, X, Building2, MapPin, Calendar, Globe, BookOpen, Users, Star } from 'lucide-react';
import { deleteuniversity, getAlluniversity } from '@/app/api/admin/courseapi';

const UniversitySection = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [limit] = useState(10);

  // Fetch universities when page or search term changes
  useEffect(() => {
    fetchUniversities();
  }, [currentPage, searchTerm]);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: limit,
        search: searchTerm
      };
      
      const result = await getAlluniversity(params);
      if (result.status === true) {
        setUniversities(result.result.data || []);
        setTotalPages(result.result.pages || 1);
        setTotalCount(result.result.total || 0);
      }
    } catch (error) {
      console.error('Error fetching universities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteuniversity(id);
      if (response.status === true) {
        setUniversities(universities.filter(uni => uni._id !== id));
        fetchUniversities(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting university:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const InfoItem = ({ icon: Icon, label, value, className = "" }) => (
    <div className={`flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors ${className}`}>
      <Icon className="text-indigo-600 mt-0.5 flex-shrink-0" size={18} />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-gray-500 mb-0.5">{label}</p>
        <p className="text-sm text-gray-900 break-words">{value || 'Not provided'}</p>
      </div>
    </div>
  );

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        <span className="w-4 h-4">←</span>
      </button>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-lg border ${
            currentPage === i
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        <span className="w-4 h-4">→</span>
      </button>
    );

    return pages;
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
      <style jsx global>{`
        .popup-content {
          padding: 0 !important;
          border: none !important;
          border-radius: 12px !important;
          width: 95vw !important;
          max-width: 1000px !important;
          max-height: 90vh !important;
          overflow: hidden !important;
        }
        
        .popup-overlay {
          background: rgba(0, 0, 0, 0.7) !important;
          backdrop-filter: blur(4px) !important;
        }
        
        @media (max-width: 768px) {
          .popup-content {
            width: 98vw !important;
            max-height: 95vh !important;
          }
        }
      `}</style>

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">University</h1>
            <p className="text-gray-600">University list of your website</p>
          </div>
          <Link href="/admin/dashboard/university/create-university">
            <button
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-left transition-all duration-200 text-white shadow-lg transform hover:scale-[1.02]"
              style={{ background: '#6941c6' }}
            >
              <Plus className="w-5 h-5" />Add University
            </button>
          </Link>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search universities..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-80"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <span className="text-gray-600">
              Showing {universities.length} of {totalCount} universities
            </span>
          </div>
        </div>
      </div>

      {/* Universities List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading Universities...</p>
          </div>
        ) : universities.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">
              {searchTerm ? 'No universities found matching your search' : 'No universities found. Create your first university!'}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {universities.map((university, index) => (
                <div
                  key={university._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4 flex-1">
                      {university.logo && (
                        <img
                          src={university.logo}
                          alt={university.universityName}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {index + 1}. {university.universityName}
                          </h3>
                        </div>
                        <p className="text-gray-600 line-clamp-2 mb-2">
                          {university.aboutCollege || 'No description available'}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          {university.location && <span>📍 {university.location}</span>}
                          {university.establishedYear && <span>🏛️ Est. {university.establishedYear}</span>}
                          {university.createdAt && (
                            <span>Created: {formatDate(university.createdAt)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {/* View Button with Popup */}
                      <Popup
                        trigger={
                          <button
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View University"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        }
                        modal
                        nested
                        onOpen={() => setSelectedUniversity(university)}
                      >
                        {close => (
                          <div className="bg-white rounded-xl overflow-hidden">
                            {/* Header */}
                            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                              <h2 className="text-lg font-bold text-gray-900">University Details</h2>
                              <button
                                onClick={close}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
                              >
                                <X size={20} />
                              </button>
                            </div>

                            {/* Content */}
                            <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-4">
                              <div className="grid grid-cols-1 gap-4">
                                {/* University Profile */}
                                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                  {selectedUniversity?.logo && (
                                    <img
                                      src={selectedUniversity.logo}
                                      alt={selectedUniversity.universityName}
                                      className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                    />
                                  )}
                                  <div>
                                    <h3 className="text-xl font-bold text-gray-900">{selectedUniversity?.universityName}</h3>
                                    {selectedUniversity?.establishedYear && (
                                      <p className="text-gray-600 mt-1">
                                        Established: {selectedUniversity.establishedYear}
                                      </p>
                                    )}
                                    {selectedUniversity?.location && (
                                      <p className="text-gray-600 mt-1">
                                        📍 {selectedUniversity.location}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* Basic Information */}
                                <div className="bg-white border border-gray-100 rounded-lg p-4">
                                  <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b">Basic Information</h3>
                                  <div className="space-y-1">
                                    <InfoItem 
                                      icon={Building2} 
                                      label="University Name" 
                                      value={selectedUniversity?.universityName} 
                                    />
                                    <InfoItem 
                                      icon={Globe} 
                                      label="Website" 
                                      value={`https://upschol.com/university/${selectedUniversity?.collegeUrl}`} 
                                    />
                                  </div>
                                </div>

                                {/* About University */}
                                <div className="bg-white border border-gray-100 rounded-lg p-4">
                                  <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b">About University</h3>
                                  <div className="space-y-1">
                                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                      <BookOpen className="text-indigo-600 mt-0.5 flex-shrink-0" size={18} />
                                      <div className="min-w-0 flex-1">
                                        <p className="text-xs font-medium text-gray-500 mb-0.5">Description</p>
                                        <p className="text-sm text-gray-900 whitespace-pre-wrap break-words">
                                          {selectedUniversity?.aboutCollege || 'Not provided'}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Additional Information */}
                                <div className="bg-white border border-gray-100 rounded-lg p-4">
                                  <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b">Additional Information</h3>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {selectedUniversity?.totalStudents && (
                                      <div className="p-3 rounded-lg bg-gray-50">
                                        <p className="text-xs font-medium text-gray-500 mb-1">Total Students</p>
                                        <p className="text-sm text-gray-900">
                                          {selectedUniversity.totalStudents}
                                        </p>
                                      </div>
                                    )}
                                    {selectedUniversity?.coursesOffered && (
                                      <div className="p-3 rounded-lg bg-gray-50">
                                        <p className="text-xs font-medium text-gray-500 mb-1">Courses Offered</p>
                                        <p className="text-sm text-gray-900">
                                          {selectedUniversity.coursesOffered}
                                        </p>
                                      </div>
                                    )}
                                    {selectedUniversity?.ranking && (
                                      <div className="p-3 rounded-lg bg-gray-50">
                                        <p className="text-xs font-medium text-gray-500 mb-1">Ranking</p>
                                        <p className="text-sm text-gray-900">
                                          {selectedUniversity.ranking}
                                        </p>
                                      </div>
                                    )}
                                    {selectedUniversity?.accreditation && (
                                      <div className="p-3 rounded-lg bg-gray-50">
                                        <p className="text-xs font-medium text-gray-500 mb-1">Accreditation</p>
                                        <p className="text-sm text-gray-900">
                                          {selectedUniversity.accreditation}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Meta Information */}
                                <div className="bg-white border border-gray-100 rounded-lg p-4">
                                  <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b">Meta Information</h3>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {selectedUniversity?.createdAt && (
                                      <div className="p-3 rounded-lg bg-gray-50">
                                        <p className="text-xs font-medium text-gray-500 mb-1">Created Date</p>
                                        <p className="text-sm text-gray-900">
                                          {formatDate(selectedUniversity.createdAt)}
                                        </p>
                                      </div>
                                    )}
                                    <div className="p-3 rounded-lg bg-gray-50">
                                      <p className="text-xs font-medium text-gray-500 mb-1">Status</p>
                                      <p className="text-sm text-gray-900">
                                        {selectedUniversity?.isActive ? 'Active' : 'Inactive'}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
                              <Link href={`/admin/dashboard/university/edit-university/${selectedUniversity?._id}`}>
                                <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                                  Edit University
                                </button>
                              </Link>
                              <button
                                onClick={close}
                                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        )}
                      </Popup>

                      {/* Edit Button */}
                      <Link href={`/admin/dashboard/university/edit-university/${university._id}`}>
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit University"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>

                      {/* Delete Button with Popup */}
                      <Popup
                        trigger={
                          <button
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete University"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        }
                        modal
                        nested
                      >
                        {close => (
                          <div className="bg-white rounded-xl overflow-hidden">
                            {/* Header */}
                            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                              <h2 className="text-lg font-bold text-gray-900">Delete University</h2>
                              <button
                                onClick={close}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
                              >
                                <X size={20} />
                              </button>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-red-100 rounded-lg">
                                  <Trash2 className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
                                  <p className="text-gray-600">This action cannot be undone.</p>
                                </div>
                              </div>
                              
                              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                <p className="text-red-800 font-medium mb-2">You are about to delete university:</p>
                                <p className="text-red-900 font-semibold">"{university.universityName}"</p>
                                {university.location && (
                                  <p className="text-red-700 text-sm mt-1">
                                    Location: {university.location}
                                  </p>
                                )}
                              </div>

                              <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this university? All associated data will be permanently removed.
                              </p>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
                              <button
                                onClick={close}
                                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => {
                                  handleDelete(university._id);
                                  close();
                                }}
                                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                              >
                                Delete University
                              </button>
                            </div>
                          </div>
                        )}
                      </Popup>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-6">
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  {renderPagination()}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UniversitySection;