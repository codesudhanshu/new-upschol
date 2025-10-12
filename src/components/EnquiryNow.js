"use client"
import { enquirygadd } from '@/app/api/candidate/HomePage';
import { useState } from 'react';
import Swal from 'sweetalert2'; // SweetAlert import जोड़ें

const EnquireNow = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await enquirygadd({
        name: formData.full_name,
        email: formData.email,
        phoneNumber: formData.phone_number
      });

      console.log('API Response:', result); // Debugging के लिए

      if (result.status === true) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: result.result?.message || 'Enquiry submitted successfully!',
          confirmButtonColor: '#8D0DFE'
        });
        
        setIsModalOpen(false);
        setFormData({ full_name: '', email: '', phone_number: '' });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: result.result?.message || result.message || 'Enquiry not submitted successfully!',
          confirmButtonColor: '#8D0DFE'
        });
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message || 'Failed to submit enquiry. Please try again.',
        confirmButtonColor: '#8D0DFE'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Modal बंद करने के लिए function
  const closeModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
    }
  };

  // Background पर क्लिक करने पर modal बंद करें
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {/* Fixed Enquire Now Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed right-0 top-1/2 transform -translate-y-1/2 z-[100] bg-[#8D0DFE] text-white px-2 py-3 rounded-l-lg font-semibold shadow-lg hover:bg-[#7a0be0] transition-colors duration-300 cursor-pointer"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed'
        }}
      >
        Enquire Now
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ 
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(0, 0, 0, 0.65)'
          }}
          onClick={handleBackdropClick}
        >
          <div className="w-full max-w-md mx-4">
            <div className="bg-white rounded-2xl shadow-xl relative">
              {/* Close Button */}
              <button 
                type="button" 
                className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200 cursor-pointer"
                onClick={closeModal}
                disabled={isSubmitting}
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-6">
                <h3 className="text-center text-2xl font-bold text-gray-800 mb-2">
                  Connect With Our Experts
                </h3>
             
                <p className="text-center text-gray-600 mb-6">
                  Provide your details and get an expert career counselling for free!
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col space-y-4">
                    <div className="w-full">
                      <input 
                        type="text" 
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8D0DFE] focus:border-transparent outline-none transition-all duration-200"
                        placeholder="Full name*" 
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div className="w-full">
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8D0DFE] focus:border-transparent outline-none transition-all duration-200"
                        placeholder="Email address*" 
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="w-full">
                      <input 
                        type="tel" 
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8D0DFE] focus:border-transparent outline-none transition-all duration-200"
                        placeholder="Mobile number*" 
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="flex items-start mb-4">
                    <input 
                      type="checkbox" 
                      id="chkbox" 
                      className="w-4 h-4 cursor-pointer mr-2 mt-1"
                      defaultChecked 
                      required
                      disabled={isSubmitting}
                    />
                    <label htmlFor="chkbox" className="text-sm text-gray-600">
                      I hereby authorize you to send notifications via{' '}
                      <span className="text-blue-600">SMS/RCS Messages</span>,{' '}
                      <span className="text-red-600">Promotional</span> /{' '}
                      <span className="text-green-600">Informational Messages</span>.
                    </label>
                  </div>

                  <div className="text-center">
                    <button 
                      type="submit" 
                      className="w-full bg-[#8D0DFE] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#7a0be0] transition-colors duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Enquire Now!'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EnquireNow;