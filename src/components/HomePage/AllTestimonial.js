"use client"
import Layout from "@/components/Candidatepagelayout";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getAllTestimonialData } from "@/app/api/candidate/HomePage";

export default function AllTestimonial() {
  const [testimonials, setTestimonials] = useState([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch testimonials data
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getAllTestimonialData();
        if (data.status) {
          setTestimonials(data.result.slice(0, 6)); // Show 6 testimonials for better display
        } else {
          setError("Failed to load testimonials");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const openPopup = (testimonial) => {
    setSelectedTestimonial(testimonial);
  };

  const closePopup = () => {
    setSelectedTestimonial(null);
  };

  // Truncate text for testimonial preview
  const truncateText = (text, maxLength = 120) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Check if text needs truncation
  const needsReadMore = (text, maxLength = 120) => {
    return text && text.length > maxLength;
  };

  if (loading) {
    return <div className="text-center py-8">Loading testimonials...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (!testimonials || testimonials.length === 0) {
    return <div className="text-center py-8">No testimonials found</div>;
  }

  return (
    <>
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
       <div className="flex justify-between items-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900">
                  <span className="text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">Testimonials and Success Story</span>
                </h2>
                <Link href="/testimonials" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-md font-medium transition-colors duration-300">
                  View All
                </Link>
              </div>
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial._id}>
              <div className="bg-white shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 border border-gray-100 h-70 w-full max-w-sm mx-auto p-6 flex flex-col">
                {/* Testimonial Header with Image and Info in Flex */}
                <div className="flex items-center space-x-4 mb-4 flex-shrink-0">
                  {/* Small Circular Image */}
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover rounded-full border-2 border-gray-100"
                    />
                  </div>
                  
                  {/* Name and Company Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 truncate">{testimonial.name}</h3>
                    <p className="text-purple-600 font-medium text-sm truncate">{testimonial.workedAt}</p>
                    {testimonial.course && (
                      <p className="text-gray-500 text-xs truncate">{testimonial.course}</p>
                    )}
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold shadow-md flex-shrink-0">
                    ⭐ {testimonial.rating}
                  </div>
                </div>

                {/* Testimonial Quote - Limited text for homepage */}
                <div className="bg-gray-50 rounded-lg p-4 flex-1 flex flex-col">
                  <p className="text-gray-600 text-sm leading-relaxed italic flex-1">
                    "{truncateText(testimonial.description, 120)}"
                  </p>
                  
                  {/* Read More link - show on every testimonial */}
                  <button
                    onClick={() => openPopup(testimonial)}
                    className="text-purple-600 hover:text-purple-800 text-xs font-medium mt-2 text-left underline underline-offset-2"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal remains the same for full details */}
      {selectedTestimonial && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-200 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedTestimonial.name}</h2>
                <p className="text-purple-600 font-semibold">{selectedTestimonial.workedAt}</p>
              </div>
              <button
                onClick={closePopup}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Full Image */}
              <div className="relative h-64 rounded-xl overflow-hidden">
                <Image
                  src={selectedTestimonial.image}
                  alt={selectedTestimonial.name}
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <h4 className="text-sm font-medium text-purple-800">Rating</h4>
                  <p className="text-lg font-bold text-purple-900">⭐ {selectedTestimonial.rating}/5</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <h4 className="text-sm font-medium text-blue-800">Course</h4>
                  <p className="text-sm font-semibold text-blue-900">{selectedTestimonial.course || 'N/A'}</p>
                </div>
              </div>

              {/* Full Testimonial */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-3">Full Testimonial</h3>
                <p className="text-gray-700 leading-relaxed">{selectedTestimonial.description}</p>
              </div>

              {/* Success Story if available */}
              {selectedTestimonial.successStory && (
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="font-semibold text-green-800 mb-3">Success Story</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedTestimonial.successStory}</p>
                </div>
              )}

              {/* Education Info */}
              <div className="bg-indigo-50 rounded-xl p-6">
                <h3 className="font-semibold text-indigo-800 mb-3">Education Background</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">University:</span> {selectedTestimonial.university || 'Not specified'}</p>
                  <p><span className="font-medium">Course Category:</span> {selectedTestimonial.courseCategory || 'Not specified'}</p>
                  <p><span className="font-medium">Admission Date:</span> {new Date(selectedTestimonial.admissionOn).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={closePopup}
                className="w-full bg-gray-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
        
      )}
      </div>
    </>
  );
}