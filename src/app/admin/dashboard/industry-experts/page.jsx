"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Plus, Edit, Trash2, Eye, X, User, Briefcase, Award, BookOpen, Clock, Star, Users } from 'lucide-react';
import { getAllIndustryExperts, deleteIndustryExpert } from '@/app/api/admin/apiService';

const IndustryExperts = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExpert, setSelectedExpert] = useState(null);

  // Fetch all industry experts
  const fetchExperts = async () => {
    try {
      setLoading(true);
      const response = await getAllIndustryExperts();
      if (response.status === true) {
        setExperts(response.result.experts || []);
      }
    } catch (error) {
      console.error('Error fetching industry experts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  // Handle Delete Expert
  const handleDelete = async (expertId) => {
    try {
      const response = await deleteIndustryExpert(expertId);
      if (response.status === true) {
        setExperts(experts.filter(expert => expert._id !== expertId));
      }
    } catch (error) {
      console.error('Error deleting industry expert:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const renderStars = (rating) => {
    const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating;
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < numericRating ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Industry Experts</h1>
            <p className="text-gray-600">All industry expert list of your website</p>
          </div>
          <Link href="/admin/dashboard/industry-experts/create-industry-expert">
            <button
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-left transition-all duration-200 text-white shadow-lg transform hover:scale-[1.02]"
              style={{ background: '#6941c6' }}
            >
              <Plus className="w-5 h-5" />Add Industry Expert
            </button>
          </Link>
        </div>
      </div>

      {/* Experts List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading Industry Experts...</p>
          </div>
        ) : experts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No industry experts found. Create your first expert!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {experts.map((expert, index) => (
              <div
                key={expert._id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4 flex-1">
                    {expert.image && (
                      <img
                        src={expert.image}
                        alt={expert.name}
                        className="w-16 h-16 object-cover rounded-full border border-gray-200"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {index + 1}. {expert.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          {renderStars(expert.rating || 4.5)}
                          <span className="text-sm text-gray-600 ml-1">
                            ({expert.rating || 4.5})
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 font-medium mb-1">{expert.designation}</p>
                      <p className="text-gray-600 mb-2">Expert in: {expert.expertIn}</p>
                      <p className="text-gray-600 line-clamp-2 mb-2">
                        {expert.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span>Experience: {expert.experience} years</span>
                        {expert.createdAt && (
                          <span>Added: {formatDate(expert.createdAt)}</span>
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
                          title="View Expert"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      }
                      modal
                      nested
                      onOpen={() => setSelectedExpert(expert)}
                    >
                      {close => (
                        <div className="bg-white rounded-xl overflow-hidden">
                          {/* Header */}
                          <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <h2 className="text-lg font-bold text-gray-900">Expert Details</h2>
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
                              {/* Expert Profile */}
                              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                {selectedExpert?.image && (
                                  <img
                                    src={selectedExpert.image}
                                    alt={selectedExpert.name}
                                    className="w-20 h-20 object-cover rounded-full border border-gray-200"
                                  />
                                )}
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900">{selectedExpert?.name}</h3>
                                  <p className="text-gray-700 font-medium">{selectedExpert?.designation}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    {renderStars(selectedExpert?.rating || 4.5)}
                                    <span className="text-sm text-gray-600">
                                      ({selectedExpert?.rating || 4.5}/5)
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Expert Information */}
                              <div className="bg-white border border-gray-100 rounded-lg p-4">
                                <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b">Expert Information</h3>
                                <div className="space-y-1">
                                  <InfoItem 
                                    icon={Briefcase} 
                                    label="Designation" 
                                    value={selectedExpert?.designation} 
                                  />
                                  <InfoItem 
                                    icon={Award} 
                                    label="Expert In" 
                                    value={selectedExpert?.expertIn} 
                                  />
                                  <InfoItem 
                                    icon={Clock} 
                                    label="Experience" 
                                    value={selectedExpert?.experience ? `${selectedExpert.experience} years` : 'Not provided'} 
                                  />
                                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <BookOpen className="text-indigo-600 mt-0.5 flex-shrink-0" size={18} />
                                    <div className="min-w-0 flex-1">
                                      <p className="text-xs font-medium text-gray-500 mb-0.5">Description</p>
                                      <p className="text-sm text-gray-900 whitespace-pre-wrap break-words">
                                        {selectedExpert?.description || 'Not provided'}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Rating Information */}
                              <div className="bg-white border border-gray-100 rounded-lg p-4">
                                <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b">Rating Information</h3>
                                <div className="flex items-center gap-4 p-3">
                                  <div className="flex items-center gap-2">
                                    {renderStars(selectedExpert?.rating || 4.5)}
                                  </div>
                                  <span className="text-lg font-semibold text-gray-900">
                                    {selectedExpert?.rating || 4.5} out of 5
                                  </span>
                                </div>
                              </div>

                              {/* Meta Information */}
                              <div className="bg-white border border-gray-100 rounded-lg p-4">
                                <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b">Meta Information</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {selectedExpert?.createdAt && (
                                    <div className="p-3 rounded-lg bg-gray-50">
                                      <p className="text-xs font-medium text-gray-500 mb-1">Created Date</p>
                                      <p className="text-sm text-gray-900">
                                        {formatDate(selectedExpert.createdAt)}
                                      </p>
                                    </div>
                                  )}
                                  <div className="p-3 rounded-lg bg-gray-50">
                                    <p className="text-xs font-medium text-gray-500 mb-1">Created By</p>
                                    <p className="text-sm text-gray-900">
                                      {selectedExpert?.createdBy || 'Not provided'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
                            <Link href={`/admin/dashboard/industry-experts/edit-industry-expert/${selectedExpert?._id}`}>
                              <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                                Edit Expert
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
                    <Link href={`/admin/dashboard/industry-experts/edit-industry-expert/${expert._id}`}>
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit Expert"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </Link>

                    {/* Delete Button with Popup */}
                    <Popup
                      trigger={
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Expert"
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
                            <h2 className="text-lg font-bold text-gray-900">Delete Expert</h2>
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
                              <p className="text-red-900 font-semibold">"{expert.name}"</p>
                              <p className="text-red-700 text-sm mt-1">
                                {expert.designation} | Expert in: {expert.expertIn}
                              </p>
                            </div>

                            <p className="text-gray-600 mb-6">
                              Are you sure you want to delete this industry expert? All associated data will be permanently removed.
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
                                handleDelete(expert._id);
                                close();
                              }}
                              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                            >
                              Delete Expert
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

export default IndustryExperts;