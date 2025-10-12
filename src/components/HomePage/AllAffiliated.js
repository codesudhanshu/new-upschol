"use client"
import { getAllApprovals } from '@/app/api/admin/apiService';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AllAffiliated() {
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllApprovals();
        if (response.status && response.result.approvals) {
          setApprovals(response.result.approvals);
        }
      } catch (error) {
        console.error('Error fetching approvals data:', error);
      }
    };
    fetchData();
  }, []);

  // Duplicate approvals array to create seamless infinite scroll
  const duplicatedApprovals = approvals.length > 0 ? [...approvals, ...approvals, ...approvals] : [];

  if (approvals.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading Affiliations...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-10">
      <div className="max-w-8xl mx-auto px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">Affiliations</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Recognized and approved by leading educational authorities
          </p>
        </div>

        {/* Infinite Slider Container */}
        <div className="relative overflow-hidden bg-white">
          <div className="flex animate-scroll">
            {duplicatedApprovals.map((approval, index) => (
              <div
                key={`${approval._id || approval.id}-${index}`}
                className="flex-shrink-0 w-64 mx-4"
              >
                <div className="flex flex-col items-center bg-white p-6 rounded-lg border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:bg-slate-50">
                  
                  {/* Approval Image */}
                  <div className="w-full h-20 mb-4 flex items-center justify-center">
                    <Image
                      src={approval.image}
                      alt={approval.title}
                      width={200}
                      height={80}
                      className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Approval Title */}
                  <h3 className="text-lg font-semibold text-gray-800 text-center">
                    {approval.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        
        .animate-scroll {
          animation: scroll 35s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}