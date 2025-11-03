"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Plus, Edit, Trash2, Eye, X, FileText, Calendar, User, Link as LinkIcon, Image, Tag } from 'lucide-react';
import { getAllspecializations, deletespecialization } from '@/app/api/admin/apiService';

const Specialization = () => {
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);

  // Fetch all specializations
  const fetchSpecializations = async () => {
    try {
      setLoading(true);
      const response = await getAllspecializations();
      if (response.status === true) {
        setSpecializations(response.result.specializations || []);
      }
    } catch (error) {
      console.error('Error fetching specializations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecializations();
  }, []);

  // Handle Delete Specialization
  const handleDelete = async (specializationId) => {
    try {
      const response = await deletespecialization(specializationId);
      if (response.status === true) {
        setSpecializations(specializations.filter(spec => spec._id !== specializationId));
      }
    } catch (error) {
      console.error('Error deleting specialization:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <Icon className="text-indigo-600 mt-0.5 flex-shrink-0" size={18} />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-gray-500 mb-0.5">{label}</p>
        <p className="text-sm text-gray-900 break-words">{value || 'Not provided'}</p>
      </div>
    </div>
  );

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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Specialization</h1>
            <p className="text-gray-600">All Specialization list in your website</p>
          </div>
          <Link href="/admin/dashboard/specialization/create-specialization">
            <button
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-left transition-all duration-200 text-white shadow-lg transform hover:scale-[1.02]"
              style={{ background: '#6941c6' }}
            >
              <Plus className="w-5 h-5" />Add Specialization
            </button>
          </Link>
        </div>
      </div>

      {/* Specializations List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading Specializations...</p>
          </div>
        ) : specializations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No specializations found. Create your first specialization!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {specializations.map((specialization, index) => (
              <div
                key={specialization._id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4 flex-1">
                    {specialization.bannerImage && (
                      <img
                        src={specialization.bannerImage}
                        alt={specialization.title}
                        className="w-20 h-16 object-cover rounded-lg border border-gray-200"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {index + 1}. {specialization.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 mb-2">
                        {specialization.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <LinkIcon size={14} />
                          <span>/specialization/{specialization.url}</span>
                        </div>
                        {specialization.keywords && specialization.keywords.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Tag size={14} />
                            <span>{specialization.keywords.slice(0, 2).join(', ')}</span>
                            {specialization.keywords.length > 2 && (
                              <span>+{specialization.keywords.length - 2} more</span>
                            )}
                          </div>
                        )}
                        {specialization.createdAt && (
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>Created: {formatDate(specialization.createdAt)}</span>
                          </div>
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
                          title="View Specialization"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      }
                      modal
                      nested
                      onOpen={() => setSelectedSpecialization(specialization)}
                    >
                      {close => (
                        <div className="bg-white rounded-xl overflow-hidden">
                          {/* Header */}
                          <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <h2 className="text-lg font-bold text-gray-900">Specialization Details</h2>
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
                              {/* Banner Image */}
                              {selectedSpecialization?.bannerImage && (
                                <div className="flex justify-center">
                                  <img
                                    src={selectedSpecialization.bannerImage}
                                    alt={selectedSpecialization.title}
                                    className="w-full max-w-2xl h-48 object-cover rounded-lg border border-gray-200"
                                  />
                                </div>
                              )}

                              {/* Specialization Information */}
                              <div className="bg-white border border-gray-100 rounded-lg p-4">
                                <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b">Specialization Information</h3>
                                <div className="space-y-1">
                                  <InfoItem 
                                    icon={FileText} 
                                    label="Title" 
                                    value={selectedSpecialization?.title} 
                                  />
                                  <InfoItem 
                                    icon={LinkIcon} 
                                    label="URL" 
                                    value={`/specialization/${selectedSpecialization?.url}`} 
                                  />
                                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <FileText className="text-indigo-600 mt-0.5 flex-shrink-0" size={18} />
                                    <div className="min-w-0 flex-1">
                                      <p className="text-xs font-medium text-gray-500 mb-0.5">Description</p>
                                      <p className="text-sm text-gray-900 whitespace-pre-wrap break-words">
                                        {selectedSpecialization?.description || 'Not provided'}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Content Preview */}
                              <div className="bg-white border border-gray-100 rounded-lg p-4">
                                <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b">Content Preview</h3>
                                <div className="max-h-60 overflow-y-auto p-3 bg-gray-50 rounded-lg">
                                  <div 
                                    className="prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ 
                                      __html: selectedSpecialization?.content?.substring(0, 500) + '...' || 'No content' 
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Keywords */}
                              {selectedSpecialization?.keywords && selectedSpecialization.keywords.length > 0 && (
                                <div className="bg-white border border-gray-100 rounded-lg p-4">
                                  <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b">Keywords</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedSpecialization.keywords.map((keyword, index) => (
                                      <span
                                        key={index}
                                        className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
                                      >
                                        {keyword}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Meta Information */}
                              <div className="bg-white border border-gray-100 rounded-lg p-4">
                                <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b">Meta Information</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {selectedSpecialization?.createdAt && (
                                    <div className="p-3 rounded-lg bg-gray-50">
                                      <p className="text-xs font-medium text-gray-500 mb-1">Created Date</p>
                                      <p className="text-sm text-gray-900">
                                        {formatDate(selectedSpecialization.createdAt)}
                                      </p>
                                    </div>
                                  )}
                                  <div className="p-3 rounded-lg bg-gray-50">
                                    <p className="text-xs font-medium text-gray-500 mb-1">Created By</p>
                                    <p className="text-sm text-gray-900">
                                      {selectedSpecialization?.createdBy || 'Not provided'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
                            <Link href={`/admin/dashboard/specialization/edit-specialization/${selectedSpecialization?._id}`}>
                              <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                                Edit Specialization
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
                    <Link href={`/admin/dashboard/specialization/edit-specialization/${specialization._id}`}>
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit Specialization"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </Link>

                    {/* Delete Button with Popup */}
                    <Popup
                      trigger={
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Specialization"
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
                            <h2 className="text-lg font-bold text-gray-900">Delete Specialization</h2>
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
                              <p className="text-red-800 font-medium mb-2">You are about to delete:</p>
                              <p className="text-red-900 font-semibold">"{specialization.title}"</p>
                              <p className="text-red-700 text-sm mt-1">
                                URL: /specialization/{specialization.url}
                              </p>
                            </div>

                            <p className="text-gray-600 mb-6">
                              Are you sure you want to delete this specialization? All associated data including images will be permanently removed.
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
                                handleDelete(specialization._id);
                                close();
                              }}
                              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                            >
                              Delete Specialization
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
        )}
      </div>
    </div>
  );
};

export default Specialization;