"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Plus, Edit, Trash2, X, FileImage, Award, FileText, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import { Loader } from '@/utils/Loader';
import { getAllApprovals, updateApproval, deleteApproval } from '@/app/api/admin/apiService';

const AffiliateInstitute = () => {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    try {
      const data = await getAllApprovals();
      if (data.status) {
        const approvalsData = data.result?.approvals || data.result || data.approvals || data;
        setApprovals(Array.isArray(approvalsData) ? approvalsData : []);
      } else {
        setError(data.error || 'Failed to fetch approvals');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (approval) => {
    setSelectedApproval(approval);
    setFormData({
      title: approval.title,
      description: approval.description
    });
    setImage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (closeEdit) => {
    if (!formData.title.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in title',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      if (image) {
        formDataToSend.append('image', image);
      }

      const result = await updateApproval(selectedApproval._id, formDataToSend);

      if (result.status == true) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: result.result.message,
          confirmButtonColor: '#3b82f6'
        });
        if (closeEdit) closeEdit();
        fetchApprovals();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: result.error || 'Failed to update approval',
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
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async (close) => {
    setIsSubmitting(true);
    try {
      const result = await deleteApproval(selectedApproval._id);

      if (result.status == true) {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: result.result.message,
          confirmButtonColor: '#3b82f6'
        });
        if (close) close();
        fetchApprovals();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: result.error || 'Failed to delete approval',
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
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
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

  if (loading) return <div className="text-white text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Affiliate Institute</h1>
            <p className="text-gray-600">All affiliate institute list of your website</p>
          </div>
          <Link href="/admin/dashboard/affiliate-institute/create-affiliate-institute">
            <button
              className="flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 text-white shadow-lg transform hover:scale-[1.02]"
              style={{ background: '#6941c6' }}
            >
              <Plus className="w-5 h-5 mr-2" /> Affiliate Institute
            </button>
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-8">
        {approvals.length > 0 ? (
          <div className="space-y-4">
            {approvals.map((approval) => (
              <div key={approval._id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center p-4">
                  <div className="w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                    <img 
                      src={approval.image} 
                      alt={approval.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 ml-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{approval.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {approval.description}
                    </p>
                    <div className="text-xs text-gray-500">
                      Created: {new Date(approval.createdOn).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {/* View Button with Popup */}
                    <Popup
                      trigger={
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      }
                      modal
                      nested
                      onOpen={() => setSelectedApproval(approval)}
                    >
                      {close => (
                        <div className="bg-white rounded-xl overflow-hidden">
                          {/* Header */}
                          <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <h2 className="text-lg font-bold text-gray-900">Affiliate Institute Details</h2>
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
                              {/* Image */}
                              <div className="flex justify-center">
                                <div className="w-48 h-48 overflow-hidden rounded-lg border border-gray-200">
                                  <img 
                                    src={selectedApproval?.image} 
                                    alt={selectedApproval?.title} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>

                              {/* Institute Content */}
                              <div className="bg-white border border-gray-100 rounded-lg p-4">
                                <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b">Institute Information</h3>
                                <div className="space-y-1">
                                  <InfoItem 
                                    icon={Award} 
                                    label="Title" 
                                    value={selectedApproval?.title} 
                                  />
                                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <FileText className="text-indigo-600 mt-0.5 flex-shrink-0" size={18} />
                                    <div className="min-w-0 flex-1">
                                      <p className="text-xs font-medium text-gray-500 mb-0.5">Description</p>
                                      <p className="text-sm text-gray-900 whitespace-pre-wrap break-words">
                                        {selectedApproval?.description || 'Not provided'}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Meta Information */}
                              <div className="bg-white border border-gray-100 rounded-lg p-4">
                                <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b">Meta Information</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <div className="p-3 rounded-lg bg-gray-50">
                                    <p className="text-xs font-medium text-gray-500 mb-1">Created Date</p>
                                    <p className="text-sm text-gray-900">
                                      {selectedApproval?.createdOn ? formatDateTime(selectedApproval.createdOn) : 'Not provided'}
                                    </p>
                                  </div>
                                  <div className="p-3 rounded-lg bg-gray-50">
                                    <p className="text-xs font-medium text-gray-500 mb-1">Last Updated</p>
                                    <p className="text-sm text-gray-900">
                                      {selectedApproval?.updatedAt ? formatDateTime(selectedApproval.updatedAt) : 'Not provided'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
                            <Popup
                              trigger={
                                <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                                  Edit Institute
                                </button>
                              }
                              modal
                              nested
                              onOpen={() => handleEdit(selectedApproval)}
                            >
                              {closeEdit => (
                                <div className="bg-white rounded-xl overflow-hidden">
                                  {/* Header */}
                                  <div className="flex justify-between items-center p-4 border-b border-gray-200">
                                    <h2 className="text-lg font-bold text-gray-900">Edit Affiliate Institute</h2>
                                    <button
                                      onClick={closeEdit}
                                      className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
                                      disabled={isSubmitting}
                                    >
                                      <X size={20} />
                                    </button>
                                  </div>

                                  {/* Content */}
                                  <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-4">
                                    <div className="space-y-6">
                                      <div>
                                        <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
                                          <Award className="w-4 h-4 mr-2 text-indigo-600" />
                                          Affiliated Institution Title
                                        </label>
                                        <input
                                          type="text"
                                          name="title"
                                          value={formData.title}
                                          onChange={handleInputChange}
                                          placeholder="Affiliated Institution Name"
                                          disabled={isSubmitting}
                                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        />
                                      </div>

                                      <div>
                                        <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
                                          <FileText className="w-4 h-4 mr-2 text-indigo-600" />
                                          Description
                                        </label>
                                        <textarea
                                          name="description"
                                          value={formData.description}
                                          onChange={handleInputChange}
                                          placeholder="Details about the approval"
                                          rows="4"
                                          disabled={isSubmitting}
                                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all resize-vertical disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        />
                                      </div>

                                      <div>
                                        <label className="block text-sm font-medium text-gray-800 mb-2">
                                          Update Image (Optional)
                                        </label>
                                        <div className="flex items-center space-x-4">
                                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer bg-gray-50 hover:bg-indigo-50 transition-colors">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                              <FileImage className="w-8 h-8 mb-3 text-indigo-500" />
                                              <p className="mb-2 text-sm text-gray-600">
                                                {image ? image.name : 'Click to upload new image'}
                                              </p>
                                            </div>
                                            <input 
                                              type="file" 
                                              className="hidden"
                                              onChange={(e) => setImage(e.target.files[0])}
                                              disabled={isSubmitting}
                                            />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Footer */}
                                  <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
                                    <button
                                      onClick={closeEdit}
                                      disabled={isSubmitting}
                                      className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() => handleUpdate(closeEdit)}
                                      disabled={isSubmitting}
                                      className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                                    >
                                      {isSubmitting ? <Loader /> : 'Update Institute'}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </Popup>
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

                    {/* Edit Button with Popup */}
                    <Popup
                      trigger={
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit Institute"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      }
                      modal
                      nested
                      onOpen={() => handleEdit(approval)}
                    >
                      {closeEdit => (
                        <div className="bg-white rounded-xl overflow-hidden">
                          {/* Header */}
                          <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <h2 className="text-lg font-bold text-gray-900">Edit Affiliate Institute</h2>
                            <button
                              onClick={closeEdit}
                              className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
                              disabled={isSubmitting}
                            >
                              <X size={20} />
                            </button>
                          </div>

                          {/* Content */}
                          <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-4">
                            <div className="space-y-6">
                              <div>
                                <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
                                  <Award className="w-4 h-4 mr-2 text-indigo-600" />
                                  Affiliated Institution Title
                                </label>
                                <input
                                  type="text"
                                  name="title"
                                  value={formData.title}
                                  onChange={handleInputChange}
                                  placeholder="Affiliated Institution Name"
                                  disabled={isSubmitting}
                                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                              </div>

                              <div>
                                <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
                                  <FileText className="w-4 h-4 mr-2 text-indigo-600" />
                                  Description
                                </label>
                                <textarea
                                  name="description"
                                  value={formData.description}
                                  onChange={handleInputChange}
                                  placeholder="Details about the approval"
                                  rows="4"
                                  disabled={isSubmitting}
                                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all resize-vertical disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-800 mb-2">
                                  Update Image (Optional)
                                </label>
                                <div className="flex items-center space-x-4">
                                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer bg-gray-50 hover:bg-indigo-50 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                      <FileImage className="w-8 h-8 mb-3 text-indigo-500" />
                                      <p className="mb-2 text-sm text-gray-600">
                                        {image ? image.name : 'Click to upload new image'}
                                      </p>
                                    </div>
                                    <input 
                                      type="file" 
                                      className="hidden"
                                      onChange={(e) => setImage(e.target.files[0])}
                                      disabled={isSubmitting}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
                            <button
                              onClick={closeEdit}
                              disabled={isSubmitting}
                              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleUpdate(closeEdit)}
                              disabled={isSubmitting}
                              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                              {isSubmitting ? <Loader /> : 'Update Institute'}
                            </button>
                          </div>
                        </div>
                      )}
                    </Popup>

                    {/* Delete Button with Popup */}
                    <Popup
                      trigger={
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Institute"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      }
                      modal
                      nested
                      onOpen={() => setSelectedApproval(approval)}
                    >
                      {close => (
                        <div className="bg-white rounded-xl overflow-hidden">
                          {/* Header */}
                          <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <h2 className="text-lg font-bold text-gray-900">Delete Affiliate Institute</h2>
                            <button
                              onClick={close}
                              className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
                              disabled={isSubmitting}
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
                              <p className="text-red-900 font-semibold">"{selectedApproval?.title}"</p>
                              {selectedApproval?.description && (
                                <p className="text-red-700 text-sm mt-2">{selectedApproval.description}</p>
                              )}
                            </div>

                            <p className="text-gray-600 mb-6">
                              Are you sure you want to delete this affiliate institute? All associated data will be permanently removed.
                            </p>
                          </div>

                          {/* Footer */}
                          <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
                            <button
                              onClick={close}
                              disabled={isSubmitting}
                              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleDeleteConfirm(close)}
                              disabled={isSubmitting}
                              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                              {isSubmitting ? <Loader /> : 'Delete Institute'}
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
        ) : (
          <div className="text-center py-8 text-gray-500">
            No affiliate institutes found
          </div>
        )}
      </div>
    </div>
  );
};

export default AffiliateInstitute;