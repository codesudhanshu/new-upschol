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
import { getAllIndustryExpertData } from "@/app/api/candidate/HomePage";

export default function AllIndustryExpert() {
  const [experts, setExperts] = useState([]);
  const [selectedExpert, setSelectedExpert] = useState(null);

  // Fetch experts data
  useEffect(() => {
    const fetchExperts = async () => {
      const data = await getAllIndustryExpertData();
      if (data.status) {
        setExperts(data.result);
      }
    };
    fetchExperts();
  }, []);

  const openPopup = (expert) => {
    setSelectedExpert(expert);
  };

  const closePopup = () => {
    setSelectedExpert(null);
  };

  return (
    <>
      <section className="teachers-section py-5">
        <div className="container">
          <div className="header text-center mx-auto">
            <h2 className="heading">Meet some of our <strong style={{color: "white"}}>Program Experts</strong></h2>
          </div>
          <div className="body mt-4">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
              }}
              className="my-tech"
            >
              {experts.map((expert) => (
                <SwiperSlide key={expert._id}>
                  <div className="card d-block border-0 p-0">
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={expert.image}
                        alt={expert.name}
                        fill
                        className="card-img obj-contain"
                        decoding="async"
                  
                      />
                    </div>
                    <div className="body px-2 py-4 text-center">
                      <h4 className="mb-1">{expert.name}</h4>
                      <div>
                        <small className="pe-3">{expert.designation}</small>
                      </div>
                      <p className="mb-3 mt-2">
                        {expert.highestDegree}, {expert.experience}+ Years of Expertise
                      </p>
                      <button 
                        // onClick={() => openPopup(expert)}
                        className="btn btn-navi"
                      >
                       <Link href="/expert-advice" style={{color: "white"}}>Consult Now</Link>
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {selectedExpert && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-200 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{selectedExpert.name}</h2>
                <p className="text-purple-600 font-semibold text-lg">{selectedExpert.designation}</p>
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
              {/* Expert Image */}
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <Image
                  src={selectedExpert.image}
                  alt={selectedExpert.name}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full">
                  <p className="text-purple-700 font-semibold">
                    {selectedExpert.experience} + Years Experience
                  </p>
                </div>
              </div>

              {/* Expert Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-purple-50 rounded-xl p-4">
                  <h3 className="font-semibold text-purple-800 mb-1">Specialization</h3>
                  <p className="text-gray-700">{selectedExpert.expertIn}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="font-semibold text-blue-800 mb-1">Experience</h3>
                  <p className="text-gray-700">{selectedExpert.experience} + Years</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <h3 className="font-semibold text-green-800 mb-1">Highest Degree</h3>
                  <p className="text-gray-700">{selectedExpert.highestDegree}</p>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4">
                  <h3 className="font-semibold text-yellow-800 mb-1">Rating</h3>
                  <p className="text-gray-700 flex items-center">
                    <span className="text-yellow-500 mr-1">⭐</span>
                    {selectedExpert.rating}/5
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">About</h3>
                <p className="text-gray-700 leading-relaxed">{selectedExpert.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={closePopup}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
                <Link
                  href="/get-in-touch"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 text-center shadow-lg"
                >
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}