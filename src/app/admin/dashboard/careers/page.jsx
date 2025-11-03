"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Plus, Edit, Trash2, Eye, X, FileText, MessageCircle, Award, GraduationCap, DollarSign, Clock, Calendar } from 'lucide-react';
import { getAlljob, deletejob } from '@/app/api/admin/apiService';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await getAlljob();
      if (response.status === true) {
        setJobs(response.result.jobs || []);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle Delete Job
  const handleDelete = async (jobId) => {
    try {
      const response = await deletejob(jobId);
      if (response.status === true) {
        setJobs(jobs.filter(job => job._id !== jobId));
      }
    } catch (error) {
      console.error('Error deleting job:', error);
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Posted Jobs List</h1>
            <p className="text-gray-600">All posted jobs list of your website</p>
          </div>
          <Link href="/admin/dashboard/careers/create-job">
            <button
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-left transition-all duration-200 text-white shadow-lg transform hover:scale-[1.02]"
              style={{ background: '#6941c6' }}
            >
              <Plus className="w-5 h-5" />Post A Job
            </button>
          </Link>
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading Jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No jobs found. Post your first job!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <div
                key={job._id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                      <Link href={`/admin/dashboard/careers/${job._id}`}>
                        {index + 1}. {job.title}
                        </Link>
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        job.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {job.status || 'active'}
                      </span>
                    </div>
                    <p className="text-gray-600 line-clamp-2 mb-3">
                      {job.description}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Award size={14} className="text-indigo-500" />
                        <span>Exp: {job.experience}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GraduationCap size={14} className="text-indigo-500" />
                        <span>{job.qualification}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign size={14} className="text-indigo-500" />
                        <span>{job.budget}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-indigo-500" />
                        <span>{job.noticePeriod}</span>
                      </div>
                    </div>
                    {job.createdAt && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                        <Calendar size={12} />
                        <span>Posted: {formatDate(job.createdAt)}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {/* View Button with Popup */}
                    <Popup
                      trigger={
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Job"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      }
                      modal
                      nested
                      onOpen={() => setSelectedJob(job)}
                    >
                      {close => (
                        <div className="bg-white rounded-xl overflow-hidden">
                          {/* Header */}
                          <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <h2 className="text-lg font-bold text-gray-900">Job Details</h2>
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
                              {/* Job Header */}
                              <div className="flex justify-between items-start p-4 bg-gray-50 rounded-lg">
                                <div>
                                  <h3 className="text-xl font-bold text-gray-900">{selectedJob?.title}</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                      selectedJob?.status === 'active' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-gray-100 text-gray-800'
                                    }`}>
                                      {selectedJob?.status || 'active'}
                                    </span>
                                    {selectedJob?.createdAt && (
                                      <span className="text-sm text-gray-600">
                                        Posted: {formatDate(selectedJob.createdAt)}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Job Information */}
                              <div className="bg-white border border-gray-100 rounded-lg p-4">
                                <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b">Job Information</h3>
                                <div className="space-y-1">
                                  <InfoItem 
                                    icon={FileText} 
                                    label="Job Title" 
                                    value={selectedJob?.title} 
                                  />
                                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <MessageCircle className="text-indigo-600 mt-0.5 flex-shrink-0" size={18} />
                                    <div className="min-w-0 flex-1">
                                      <p className="text-xs font-medium text-gray-500 mb-0.5">Description</p>
                                      <p className="text-sm text-gray-900 whitespace-pre-wrap break-words">
                                        {selectedJob?.description || 'Not provided'}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Requirements */}
                              <div className="bg-white border border-gray-100 rounded-lg p-4">
                                <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b">Requirements & Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <InfoItem 
                                    icon={Award} 
                                    label="Experience" 
                                    value={selectedJob?.experience} 
                                  />
                                  <InfoItem 
                                    icon={GraduationCap} 
                                    label="Qualification" 
                                    value={selectedJob?.qualification} 
                                  />
                                  <InfoItem 
                                    icon={DollarSign} 
                                    label="Budget" 
                                    value={selectedJob?.budget} 
                                  />
                                  <InfoItem 
                                    icon={Clock} 
                                    label="Notice Period" 
                                    value={selectedJob?.noticePeriod} 
                                  />
                                </div>
                              </div>

                              {/* Meta Information */}
                              <div className="bg-white border border-gray-100 rounded-lg p-4">
                                <h3 className="text-base font-semibold text-gray-900 mb-3 pb-2 border-b">Meta Information</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {selectedJob?.createdAt && (
                                    <div className="p-3 rounded-lg bg-gray-50">
                                      <p className="text-xs font-medium text-gray-500 mb-1">Created Date</p>
                                      <p className="text-sm text-gray-900">
                                        {formatDate(selectedJob.createdAt)}
                                      </p>
                                    </div>
                                  )}
                                  <div className="p-3 rounded-lg bg-gray-50">
                                    <p className="text-xs font-medium text-gray-500 mb-1">Created By</p>
                                    <p className="text-sm text-gray-900">
                                      {selectedJob?.createdBy || 'Not provided'}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="flex justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
                            <Link href={`/admin/dashboard/careers/edit-job/${selectedJob?._id}`}>
                              <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                                Edit Job
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
                    <Link href={`/admin/dashboard/careers/edit-job/${job._id}`}>
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit Job"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </Link>

                    {/* Delete Button with Popup */}
                    <Popup
                      trigger={
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Job"
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
                            <h2 className="text-lg font-bold text-gray-900">Delete Job</h2>
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
                              <p className="text-red-900 font-semibold">"{job.title}"</p>
                              <p className="text-red-700 text-sm mt-1">
                                Experience: {job.experience} | Budget: {job.budget}
                              </p>
                            </div>

                            <p className="text-gray-600 mb-6">
                              Are you sure you want to delete this job posting? All associated data will be permanently removed.
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
                                handleDelete(job._id);
                                close();
                              }}
                              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                            >
                              Delete Job
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

export default Careers;