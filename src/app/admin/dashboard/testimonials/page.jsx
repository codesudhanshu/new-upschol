"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Plus, Edit, Trash2, Eye, X, User, MessageCircle, Star, Briefcase, Calendar, Building2 } from 'lucide-react';
import { getAllTestimonials, deleteTestimonial } from '@/app/api/admin/apiService';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  // Fetch all testimonials
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await getAllTestimonials();
      if (response.status === true) {
        setTestimonials(response.result.testimonials || []);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle Delete Testimonial
  const handleDelete = async (testimonialId) => {
    try {
      const response = await deleteTestimonial(testimonialId);
      if (response.status === true) {
        setTestimonials(testimonials.filter(testimonial => testimonial._id !== testimonialId));
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Testimonials</h1>
            <p className="text-gray-600">All testimonials list of your website</p>
          </div>
          <Link href="/admin/dashboard/testimonials/create-testimonials">
            <button
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-left transition-all duration-200 text-white shadow-lg transform hover:scale-[1.02]"
              style={{ background: '#6941c6' }}
            >
              <Plus className="w-5 h-5" />Add Testimonial
            </button>
          </Link>
        </div>
      </div>

      {/* Testimonials List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading Testimonials...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No testimonials found. Create your first testimonial!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial._id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4 flex-1">
                    {testimonial.image && (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 object-cover rounded-full border border-gray-200"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {index + 1}. {testimonial.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          {renderStars(testimonial.rating || 5)}
                        </div>
                      </div>
                      <p className="text-gray-600 line-clamp-2 mb-2">
                        {testimonial.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span>Course: {testimonial.course}</span>
                        <span>University: {testimonial.university}</span>
                        {testimonial.createdAt && (
                          <span>Created: {formatDate(testimonial.createdAt)}</span>
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
                          title="View Testimonial"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      }
                      modal
                      nested
                      onOpen={() => setSelectedTestimonial(testimonial)}
                    >
                      {close => (
                        <div className="bg-white rounded-xl overflow-hidden">
                          {/* Header */}
                          <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <h2 className="text-lg font-bold text-gray-900">Testimonial Details</h2>
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
                              {/* Student Profile */}
                              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                {selectedTestimonial?.image && (
                                  <img
                                    src={selectedTestimonial.image}
                                    alt={selectedTestimonial.name}
                                    className="w-20 h-20 object-cover rounded-full border border-gray-200"
                                  />
                                )}
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900">{selectedTestimonial?.name}</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    {renderStars(selectedTestimonial?.rating || 5)}
                                    <span className="text-sm text-gray-600">
                                      ({selectedTestimonial?.rating || 5}/5)
                                    </span>
                                  </div>
                                  {selectedTestimonial?.workedAt && (
                                    <p className="text-gray-600 mt-1">
                                      Works at: {selectedTestimonial.workedAt}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Testimonial Information */}
                              <div className="bg-white border border-gray-100 rounded-lg p-4">
                                <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b">Testimonial Information</h3>
                                <div className="space-y-1">
                                  <InfoItem 
                                    icon={MessageCircle} 
                                    label="Testimonial" 
                                    value={selectedTestimonial?.description} 
                                  />
                                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <MessageCircle className="text-indigo-600 mt-0.5 flex-shrink-0" size={18} />
                                    <div className="min-w-0 flex-1">
                                      <p className="text-xs font-medium text-gray-500 mb-0.5">Success Story</p>
                                      <p className="text-sm text-gray-900 whitespace-pre-wrap break-words">
                                        {selectedTestimonial?.successStory || 'Not provided'}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Education Information */}
                              <div className="bg-white border border-gray-100 rounded-lg p-4">
                                <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b">Education Information</h3>
                                <div className="space-y-1">
                                  <InfoItem 
                                    icon={Briefcase} 
                                    label="Course Category" 
                                    value={selectedTestimonial?.courseCategory} 
                                  />
                                  <InfoItem 
                                    icon={Briefcase} 
                                    label="Course" 
                                    value={selectedTestimonial?.course} 
                                  />
                                  <InfoItem 
                                    icon={Building2} 
                                    label="University" 
                                    value={selectedTestimonial?.university} 
                                  />
                                  {selectedTestimonial?.admissionOn && (
                                    <InfoItem 
                                      icon={Calendar} 
                                      label="Admission Date" 
                                      value={formatDate(selectedTestimonial.admissionOn)} 
                                    />
                                  )}
                                </div>
                              </div>

                              {/* Meta Information */}
                              <div className="bg-white border border-gray-100 rounded-lg p-4">
                                <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b">Meta Information</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {selectedTestimonial?.createdAt && (
                                    <div className="p-3 rounded-lg bg-gray-50">
                                      <p className="text-xs font-medium text-gray-500 mb-1">Created Date</p>
                                      <p className="text-sm text-gray-900">
                                        {formatDate(selectedTestimonial.createdAt)}
                                      </p>
                                    </div>
                                  )}
                                  <div className="p-3 rounded-lg bg-gray-50">
                                    <p className="text-xs font-medium text-gray-500 mb-1">Created By</p>
                                    <p className="text-sm text-gray-900">
                                      {selectedTestimonial?.createdBy || 'Not provided'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
                            <Link href={`/admin/dashboard/testimonials/edit-testimonials/${selectedTestimonial?._id}`}>
                              <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                                Edit Testimonial
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
                    <Link href={`/admin/dashboard/testimonials/edit-testimonials/${testimonial._id}`}>
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit Testimonial"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </Link>

                    {/* Delete Button with Popup */}
                    <Popup
                      trigger={
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Testimonial"
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
                            <h2 className="text-lg font-bold text-gray-900">Delete Testimonial</h2>
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
                              <p className="text-red-800 font-medium mb-2">You are about to delete testimonial from:</p>
                              <p className="text-red-900 font-semibold">"{testimonial.name}"</p>
                              <p className="text-red-700 text-sm mt-1">
                                Course: {testimonial.course} | University: {testimonial.university}
                              </p>
                            </div>

                            <p className="text-gray-600 mb-6">
                              Are you sure you want to delete this testimonial? All associated data will be permanently removed.
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
                                handleDelete(testimonial._id);
                                close();
                              }}
                              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                            >
                              Delete Testimonial
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

export default Testimonials;