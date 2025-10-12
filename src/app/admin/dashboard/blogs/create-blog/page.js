"use client"
import React, { useState, useRef } from 'react'
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Link,
  Image as ImageIcon,
  Upload,
  X
} from 'lucide-react'
import { createBlog } from '@/app/api/admin/apiService'
import Swal from 'sweetalert2'
import { Loader } from '@/utils/Loader'

const SimpleBlogCreatePage = () => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [keywords, setKeywords] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [bannerImage, setBannerImage] = useState(null)
  const [contentImages, setContentImages] = useState([])
  const [bannerImagePreview, setBannerImagePreview] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const editorRef = useRef(null)
  const bannerInputRef = useRef(null)
  const nextImageId = useRef(1)

  // Text formatting functions
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  const insertLink = () => {
    const url = prompt('Enter URL:')
    if (url) {
      formatText('createLink', url)
    }
  }

  const insertImage = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        // Create temp ID first
        const tempId = `temp-image-${nextImageId.current++}`
        const blobUrl = URL.createObjectURL(file)
        
        // Store image with metadata IMMEDIATELY
        const newImage = { 
          file, 
          tempId,
          altText: 'Image', // Default alt text
          description: '',
          blobUrl: blobUrl
        }
        
        setContentImages(prev => [...prev, newImage])
        
        // Create image element
        const img = document.createElement('img')
        img.src = blobUrl
        img.setAttribute('data-temp-id', tempId)
        img.alt = 'Blog image'
        img.style.maxWidth = '100%'
        img.style.maxHeight = '400px'
        img.style.display = 'block'
        img.style.margin = '20px auto'
        img.style.borderRadius = '8px'
        img.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
        img.className = 'inserted-image'
        
        // Insert at cursor position
        const selection = window.getSelection()
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0)
          range.insertNode(img)
          
          // Add line breaks for spacing
          const br = document.createElement('br')
          range.insertNode(br)
          
          // Move cursor after image
          range.setStartAfter(br)
          range.collapse(true)
          selection.removeAllRanges()
          selection.addRange(range)
        } else {
          // If no selection, append to end
          editorRef.current.appendChild(img)
          editorRef.current.appendChild(document.createElement('br'))
        }
        
        // Update content
        handleContentChange()
        
        Swal.fire({
          icon: 'success',
          title: 'Image Added!',
          text: 'Image has been inserted into editor',
          timer: 1500,
          showConfirmButton: false
        })
      }
    }
    input.click()
  }

  const changeFontSize = (size) => {
    formatText('fontSize', size)
  }

  const handleContentChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML)
    }
  }

  const handleBannerImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setBannerImage(file)
      setBannerImagePreview(URL.createObjectURL(file))
    }
  }

  const removeBannerImage = () => {
    setBannerImage(null)
    setBannerImagePreview('')
    if (bannerInputRef.current) {
      bannerInputRef.current.value = ''
    }
  }

  const resetForm = () => {
    setTitle('')
    setUrl('')
    setKeywords('')
    setDescription('')
    setContent('')
    setBannerImage(null)
    setContentImages([])
    setBannerImagePreview('')
    nextImageId.current = 1
    if (editorRef.current) {
      editorRef.current.innerHTML = ''
    }
  }

  const handleSubmit = async () => {
    if (!title.trim() || !url.trim() || !description.trim() || !content.trim() || !bannerImage || !keywords.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: 'Please fill in all required fields',
        confirmButtonColor: '#ef4444'
      })
      return
    }

    // Validate description word count
    const wordCount = description.trim().split(/\s+/).length
    if (wordCount > 60) {
      Swal.fire({
        icon: 'error',
        title: 'Description Too Long',
        text: 'Description should be maximum 60 words',
        confirmButtonColor: '#ef4444'
      })
      return
    }

    const urlPattern = /^[a-z0-9-]+$/
    if (!urlPattern.test(url.trim())) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid URL',
        text: 'URL should only contain lowercase letters, numbers, and hyphens',
        confirmButtonColor: '#ef4444'
      })
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('title', title.trim())
      formData.append('description', description.trim())
      formData.append('content', content)
      formData.append('url', url.trim())
      formData.append('keywords', keywords)
      
      if (bannerImage) {
        formData.append('bannerImage', bannerImage)
      }
      
      // Add content images
      contentImages.forEach(({ file, tempId, altText, description: imgDesc }) => {
        formData.append('images', file)
        formData.append('tempIds', tempId)
        formData.append('altTexts', altText)
        formData.append('imageDescriptions', imgDesc)
      })

      const result = await createBlog(formData)
      if(result.result.message == "A blog with this URL already exists")
      {
        Swal.fire({
          icon: 'error',
          title: 'error!',
          text: result.result.message,
          confirmButtonColor: '#3b82f6'
        })
      }else{
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Blog created successfully',
          confirmButtonColor: '#3b82f6'
        }).then(() => {
          resetForm()
        })
      }
      
    } catch (error) {
      console.error('Error creating blog:', error)
      Swal.fire({
        icon: 'error',
        title: 'Creation Failed',
        text: error.message || 'Failed to create blog',
        confirmButtonColor: '#ef4444'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Blog Post</h1>
        <p className="text-gray-600">Share your knowledge with the world</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Blog Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title here..."
              disabled={isSubmitting}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 text-lg font-medium transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* URL Field */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Blog URL <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <span className="bg-gray-100 border border-r-0 border-gray-200 px-3 py-3 text-gray-600 rounded-l-lg text-sm">
                https://upschol.com/
              </span>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="blog-url-here"
                disabled={isSubmitting}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a brief description of your blog (maximum 60 words)..."
              disabled={isSubmitting}
              rows="3"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>This will be used as the meta description</span>
              <span className={description.trim().split(/\s+/).length > 60 ? 'text-red-500' : ''}>
                {description.trim().split(/\s+/).filter(word => word.length > 0).length}/60 words
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
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="education, learning, online courses"
              disabled={isSubmitting}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 text-gray-900 placeholder-gray-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Banner Image */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Banner Image <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerImageChange}
                className="hidden"
                id="banner-upload"
                disabled={isSubmitting}
                ref={bannerInputRef}
              />
              <label htmlFor="banner-upload" className="cursor-pointer">
                {bannerImagePreview ? (
                  <div className="relative">
                    <img 
                      src={bannerImagePreview} 
                      alt="Banner preview" 
                      className="max-h-48 mx-auto mb-3 rounded-lg shadow-md"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeBannerImage()
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <p className="text-indigo-600 font-medium truncate max-w-xs mx-auto">
                      {bannerImage.name}
                    </p>
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
              Blog Content <span className="text-red-500">*</span>
            </label>
            
            {/* Toolbar */}
            <div className="border border-gray-200 rounded-t-lg bg-gray-50 p-3 flex flex-wrap gap-2">
              <select 
                onChange={(e) => changeFontSize(e.target.value)}
                className="px-2 py-1 border border-gray-200 rounded text-sm text-gray-900 bg-white focus:ring-indigo-500 focus:border-indigo-500"
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
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                title="Bold"
                disabled={isSubmitting}
              >
                <Bold className="h-4 w-4" />
              </button>
              
              <button
                type="button"
                onClick={() => formatText('italic')}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                title="Italic"
                disabled={isSubmitting}
              >
                <Italic className="h-4 w-4" />
              </button>
              
              <button
                type="button"
                onClick={() => formatText('underline')}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                title="Underline"
                disabled={isSubmitting}
              >
                <Underline className="h-4 w-4" />
              </button>

              <div className="h-6 w-px bg-gray-200"></div>

              <button
                type="button"
                onClick={() => formatText('justifyLeft')}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                title="Align Left"
                disabled={isSubmitting}
              >
                <AlignLeft className="h-4 w-4" />
              </button>
              
              <button
                type="button"
                onClick={() => formatText('justifyCenter')}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                title="Align Center"
                disabled={isSubmitting}
              >
                <AlignCenter className="h-4 w-4" />
              </button>
              
              <button
                type="button"
                onClick={() => formatText('justifyRight')}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                title="Align Right"
                disabled={isSubmitting}
              >
                <AlignRight className="h-4 w-4" />
              </button>

              <div className="h-6 w-px bg-gray-200"></div>

              <button
                type="button"
                onClick={() => formatText('insertUnorderedList')}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                title="Bullet List"
                disabled={isSubmitting}
              >
                <List className="h-4 w-4" />
              </button>
              
              <button
                type="button"
                onClick={() => formatText('insertOrderedList')}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                title="Numbered List"
                disabled={isSubmitting}
              >
                <ListOrdered className="h-4 w-4" />
              </button>

              <div className="h-6 w-px bg-gray-200"></div>

              <button
                type="button"
                onClick={insertLink}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                title="Insert Link"
                disabled={isSubmitting}
              >
                <Link className="h-4 w-4" />
              </button>
              
              <button
                type="button"
                onClick={insertImage}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                title="Insert Image"
                disabled={isSubmitting}
              >
                <ImageIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Editor - Fixed with proper styling */}
            <div
              ref={editorRef}
              contentEditable={!isSubmitting}
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
              Start writing your blog content here... Click the image button to insert images.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader />
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Publish Blog</span>
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={resetForm}
              disabled={isSubmitting}
              className="px-6 py-3 border border-gray-200 text-gray-800 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset Form
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleBlogCreatePage