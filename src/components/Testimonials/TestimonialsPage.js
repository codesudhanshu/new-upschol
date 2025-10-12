"use client"
import Layout from "@/components/Candidatepagelayout";
import { getAllTestimonials } from "../../app/api/admin/apiService";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  // Fetch testimonials data
  useEffect(() => {
    const fetchTestimonials = async () => {
      const data = await getAllTestimonials();
      if (data.status) {
        setTestimonials(data.result.result.testimonials);
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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial._id}
            className="group bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
          >
            {/* Testimonial Image */}
            <div className="relative h-72 overflow-hidden">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              {/* Rating Badge */}
              <div className="absolute bottom-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                ⭐ {testimonial.rating}/5
              </div>
            </div>

            {/* Testimonial Info */}
            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{testimonial.name}</h2>
                <p className="text-purple-600 font-semibold text-lg">{testimonial.workedAt}</p>
              </div>

              <p className="text-gray-600 leading-relaxed line-clamp-3 text-sm">
                {testimonial.description}
              </p>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => openPopup(testimonial)}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTestimonial && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-200 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{selectedTestimonial.name}</h2>
                <p className="text-purple-600 font-semibold text-lg">{selectedTestimonial.workedAt}</p>
              </div>
              <button
                onClick={closePopup}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Testimonial Image */}
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <Image
                  src={selectedTestimonial.image}
                  alt={selectedTestimonial.name}
                  fill
                  className="w-full h-64 object-cover object-top"
                />
              </div>

              {/* Education Details Section - NEW */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">Education Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Course Category</h4>
                    <p className="font-semibold text-gray-800">
                      {selectedTestimonial.courseCategory || 'Not specified'}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Course</h4>
                    <p className="font-semibold text-gray-800">
                      {selectedTestimonial.course || 'Not specified'}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">University</h4>
                    <p className="font-semibold text-gray-800">
                      {selectedTestimonial.university || 'Not specified'}
                    </p>
                  </div>
                  </div>
              </div>

              {/* Testimonial Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-purple-50 rounded-xl p-4">
                  <h3 className="font-semibold text-purple-800 mb-1">Rating</h3>
                  <p className="text-gray-700 flex items-center">
                    <span className="text-yellow-500 mr-1">⭐</span>
                    {selectedTestimonial.rating}/5
                  </p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="font-semibold text-blue-800 mb-1">Admission Date</h3>
                  <p className="text-gray-700">
                    {new Date(selectedTestimonial.admissionOn).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">Testimonial</h3>
                <p className="text-gray-700 leading-relaxed">{selectedTestimonial.description}</p>
              </div>

              {/* Success Story */}
              {selectedTestimonial.successStory && (
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="font-semibold text-green-800 mb-3 text-lg">Success Story</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedTestimonial.successStory}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={closePopup}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}