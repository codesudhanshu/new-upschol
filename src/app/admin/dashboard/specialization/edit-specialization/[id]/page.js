"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  FileText, 
  Link as LinkIcon, 
  Tag, 
  Image as ImageIcon, 
  Save, 
  ArrowLeft,
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Link,
  Upload,
  X
} from 'lucide-react';
import Swal from 'sweetalert2';
import { Loader } from '@/utils/Loader';
import { getspecializationsById, updatespecialization } from '@/app/api/admin/apiService';

const EditSpecialization = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    keywords: '',
    content: ''
  });
  const [bannerImage, setBannerImage] = useState(null);
  const [currentBannerImage, setCurrentBannerImage] = useState('');
  const [contentImages, setContentImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  const editorRef = useRef(null);
  const bannerInputRef = useRef(null);
  const nextImageId = useRef(1);

  // Fetch specialization data
  useEffect(() => {
    const fetchSpecializationData = async () => {
      try {
        setIsFetching(true);
        const response = await getspecializationsById(id);
        if (response.status === true) {
          const specialization = response.result.specialization;
          setFormData({
            title: specialization.title || '',
            url: specialization.url || '',
            description: specialization.description || '',
            keywords: specialization.keywords?.join(', ') || '',
            content: specialization.content || ''
          });
          setCurrentBannerImage(specialization.bannerImage || '');
          
          // Set editor content
          if (editorRef.current) {
            editorRef.current.innerHTML = specialization.content || '';
          }
        }
      } catch (error) {
        console.error('Error fetching specialization:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to load specialization data',
          confirmButtonColor: '#ef4444'
        });
      } finally {
        setIsFetching(false);
      }
    };

    if (id) {
      fetchSpecializationData();
    }
  }, [id]);

  // Text formatting functions
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleContentChange();
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      formatText('createLink', url);
    }
  };

  const insertImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const tempId = `temp-image-${nextImageId.current++}`;
        const blobUrl = URL.createObjectURL(file);
        
        const newImage = { 
          file, 
          tempId,
          altText: 'Image',
          description: '',
          blobUrl: blobUrl
        };
        
        setContentImages(prev => [...prev, newImage]);
        
        const img = document.createElement('img');
        img.src = blobUrl;
        img.setAttribute('data-temp-id', tempId);
        img.alt = 'Specialization image';
        img.style.maxWidth = '100%';
        img.style.maxHeight = '400px';
        img.style.display = 'block';
        img.style.margin = '20px auto';
        img.style.borderRadius = '8px';
        img.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        img.className = 'inserted-image';
        
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.insertNode(img);
          const br = document.createElement('br');
          range.insertNode(br);
          range.setStartAfter(br);
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        } else {
          editorRef.current.appendChild(img);
          editorRef.current.appendChild(document.createElement('br'));
        }
        
        handleContentChange();
      }
    };
    input.click();
  };

  const changeFontSize = (size) => {
    formatText('fontSize', size);
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      setFormData(prev => ({
        ...prev,
        content: editorRef.current.innerHTML
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImage(file);
    }
  };

  const removeBannerImage = () => {
    setBannerImage(null);
    if (bannerInputRef.current) {
      bannerInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.url.trim() || !formData.description.trim() || !formData.content.trim() || !formData.keywords.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: 'Please fill in all required fields',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    const wordCount = formData.description.trim().split(/\s+/).length;
    if (wordCount > 60) {
      Swal.fire({
        icon: 'error',
        title: 'Description Too Long',
        text: 'Description should be maximum 60 words',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    const urlPattern = /^[a-z0-9-]+$/;
    if (!urlPattern.test(formData.url.trim())) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid URL',
        text: 'URL should only contain lowercase letters, numbers, and hyphens',
        confirmButtonColor: '#ef4444'
      });
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title.trim());
      formDataToSend.append('description', formData.description.trim());
      formDataToSend.append('content', formData.content);
      formDataToSend.append('url', formData.url.trim());
      formDataToSend.append('keywords', formData.keywords);
      
      if (bannerImage) {
        formDataToSend.append('bannerImage', bannerImage);
      }
      
      contentImages.forEach(({ file, tempId, altText, description: imgDesc }) => {
        formDataToSend.append('images', file);
        formDataToSend.append('tempIds', tempId);
        formDataToSend.append('altTexts', altText);
        formDataToSend.append('imageDescriptions', imgDesc);
      });

      const result = await updatespecialization(id, formDataToSend);

      if (result.status === true) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Specialization updated successfully',
          confirmButtonColor: '#3b82f6'
        });
        router.push('/admin/dashboard/specialization');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: result.error || 'Failed to update specialization',
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Specialization</h1>
            <p className="text-gray-600">Update specialization details</p>
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
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Specialization Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter your specialization title here..."
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 text-lg font-medium transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* URL Field */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Specialization URL <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <span className="bg-gray-100 border border-r-0 border-gray-200 px-3 py-3 text-gray-600 rounded-l-lg text-sm">
                https://upschol.com/
              </span>
              <input
                type="text"
                name="url"
                value={formData.url}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  url: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
                }))}
                placeholder="specialization-url-here"
                disabled={isLoading}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Only lowercase letters, numbers, and hyphens allowed
            </p>
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Short Description <span className="text-red-500">*</span>
              <span className="text-sm text-gray-500 font-normal ml-2">(Max 60 words)</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Write a brief description of your specialization (maximum 60 words)..."
              disabled={isLoading}
              rows="3"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>This will be used as the meta description</span>
              <span className={formData.description.trim().split(/\s+/).length > 60 ? 'text-red-500' : ''}>
                {formData.description.trim().split(/\s+/).filter(word => word.length > 0).length}/60 words
              </span>
            </div>
          </div>

          {/* Keywords Field */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Keywords (comma separated) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="keywords"
              value={formData.keywords}
              onChange={handleInputChange}
              placeholder="education, learning, online courses"
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Banner Image */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Banner Image
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerImageChange}
                className="hidden"
                id="banner-upload"
                disabled={isLoading}
                ref={bannerInputRef}
              />
              <label htmlFor="banner-upload" className="cursor-pointer">
                {bannerImage ? (
                  <div className="relative">
                    <img 
                      src={URL.createObjectURL(bannerImage)} 
                      alt="Banner preview" 
                      className="max-h-48 mx-auto mb-3 rounded-lg shadow-md"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeBannerImage();
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <p className="text-indigo-600 font-medium truncate max-w-xs mx-auto">
                      {bannerImage.name}
                    </p>
                  </div>
                ) : currentBannerImage ? (
                  <div className="relative">
                    <img 
                      src={currentBannerImage} 
                      alt="Current banner" 
                      className="max-h-48 mx-auto mb-3 rounded-lg shadow-md"
                    />
                    <p className="text-gray-600">Current banner image</p>
                    <p className="text-sm text-gray-500">Upload new image to replace</p>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-indigo-500 mx-auto mb-3" />
                    <p className="text-gray-600 mb-2">Click to upload banner image</p>
                  </>
                )}
                <p className="text-sm text-gray-600">PNG, JPG, GIF up to 50MB</p>
              </label>
            </div>
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Specialization Content <span className="text-red-500">*</span>
            </label>
            
            {/* Toolbar */}
            <div className="border border-gray-200 rounded-t-lg bg-gray-50 p-3 flex flex-wrap gap-2">
              <select 
                onChange={(e) => changeFontSize(e.target.value)}
                className="px-2 py-1 border border-gray-200 rounded text-sm text-gray-900 bg-white focus:ring-indigo-500 focus:border-indigo-500"
                defaultValue="3"
                disabled={isLoading}
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
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                title="Bold"
                disabled={isLoading}
              >
                <Bold className="h-4 w-4" />
              </button>
              
              <button
                type="button"
                onClick={() => formatText('italic')}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                title="Italic"
                disabled={isLoading}
              >
                <Italic className="h-4 w-4" />
              </button>
              
              <button
                type="button"
                onClick={() => formatText('underline')}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                title="Underline"
                disabled={isLoading}
              >
                <Underline className="h-4 w-4" />
              </button>

              <div className="h-6 w-px bg-gray-200"></div>

              <button
                type="button"
                onClick={() => formatText('justifyLeft')}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                title="Align Left"
                disabled={isLoading}
              >
                <AlignLeft className="h-4 w-4" />
              </button>
              
              <button
                type="button"
                onClick={() => formatText('justifyCenter')}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                title="Align Center"
                disabled={isLoading}
              >
                <AlignCenter className="h-4 w-4" />
              </button>
              
              <button
                type="button"
                onClick={() => formatText('justifyRight')}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                title="Align Right"
                disabled={isLoading}
              >
                <AlignRight className="h-4 w-4" />
              </button>

              <div className="h-6 w-px bg-gray-200"></div>

              <button
                type="button"
                onClick={() => formatText('insertUnorderedList')}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                title="Bullet List"
                disabled={isLoading}
              >
                <List className="h-4 w-4" />
              </button>
              
              <button
                type="button"
                onClick={() => formatText('insertOrderedList')}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                title="Numbered List"
                disabled={isLoading}
              >
                <ListOrdered className="h-4 w-4" />
              </button>

              <div className="h-6 w-px bg-gray-200"></div>

              <button
                type="button"
                onClick={insertLink}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                title="Insert Link"
                disabled={isLoading}
              >
                <Link className="h-4 w-4" />
              </button>
              
              <button
                type="button"
                onClick={insertImage}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                title="Insert Image"
                disabled={isLoading}
              >
                <ImageIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Editor */}
            <div
              ref={editorRef}
              contentEditable={!isLoading}
              onInput={handleContentChange}
              className="min-h-96 p-4 border border-t-0 border-gray-200 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                minHeight: '400px'
              }}
              suppressContentEditableWarning={true}
            />
            <div className="text-sm text-gray-600 mt-1">
              Edit your specialization content here... Click the image button to insert new images.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Update Specialization</span>
                </>
              )}
            </button>
            
            <button
              type="button"
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

export default EditSpecialization;