"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Building2, FileText, Save, ArrowLeft } from 'lucide-react';
import Swal from 'sweetalert2';
import { Loader } from '@/utils/Loader';
import { getCompanyById, updateCompany } from '@/app/api/admin/apiService';

const EditCompanyAssociated = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Fetch company data
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setIsFetching(true);
        const response = await getCompanyById(id);
        if (response.status === true) {
          const company = response.result.company;
          setFormData({
            title: company.title || '',
            description: company.description || ''
          });
          setCurrentImage(company.image || '');
        }
      } catch (error) {
        console.error('Error fetching company:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to load company data',
          confirmButtonColor: '#ef4444'
        });
      } finally {
        setIsFetching(false);
      }
    };

    if (id) {
      fetchCompanyData();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      if (image) {
        formDataToSend.append('image', image);
      }

      const result = await updateCompany(id, formDataToSend);

      if (result.status === true) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Company updated successfully',
          confirmButtonColor: '#3b82f6'
        });
        router.push('/admin/dashboard/company-associated');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: result.error || 'Failed to update company',
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
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Company</h1>
            <p className="text-gray-600">Update company association details</p>
          </div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <Building2 className="w-4 h-4 mr-2 text-indigo-600" />
              Company Name *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Organization name"
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              <FileText className="w-4 h-4 mr-2 text-indigo-600" />
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="About the Company organization"
              rows="4"
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all resize-vertical disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Logo/Image
            </label>
            
            {/* Current Image Preview */}
            {currentImage && !image && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                <img
                  src={currentImage}
                  alt="Current company logo"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                />
              </div>
            )}

            {/* New Image Upload */}
            <div className="flex items-center space-x-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer bg-gray-50 hover:bg-indigo-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Building2 className="w-8 h-8 mb-3 text-indigo-500" />
                  <p className="mb-2 text-sm text-gray-600">
                    {image ? image.name : 'Click to upload new logo/image'}
                  </p>
                  <p className="text-xs text-gray-500">(Leave empty to keep current image)</p>
                </div>
                <input 
                  type="file" 
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                  disabled={isLoading}
                />
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader /> : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Update Company</span>
                </>
              )}
            </button>
            
            <button
              onClick={() => router.back()}
              disabled={isLoading}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCompanyAssociated;