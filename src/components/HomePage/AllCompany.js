"use client"
import { getAllCompanyData } from '@/app/api/candidate/HomePage';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AllCompany() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCompanyData();
        if (response.status && response.result.companies) {
          setCompanies(response.result.companies);
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };
    fetchData();
  }, []);

  // Duplicate companies array to create seamless infinite scroll
  const duplicatedCompanies = companies.length > 0 ? [...companies, ...companies, ...companies] : [];

  if (companies.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Loading Companies...</p>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="max-w-8xl mx-auto px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">Placement Partners</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Leading companies where our students build successful careers
          </p>
        </div>

        {/* Infinite Slider Container */}
        <div className="relative overflow-hidden bg-white">
          <div className="flex animate-scroll">
            {duplicatedCompanies.map((company, index) => (
              <div
                key={`${company._id}-${index}`}
                className="flex-shrink-0 w-64 mx-4"
              >
                <div className="flex flex-col items-center bg-white p-6 rounded-lg border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:bg-slate-50">
                  
                  {/* Company Logo */}
                  <div className="w-full h-20 mb-4 flex items-center justify-center">
                    <Image
                      src={company.image}
                      alt={company.title}
                      width={200}
                      height={80}
                      className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Company Title */}
                  <h3 className="text-lg font-semibold text-gray-800 text-center">
                    {company.title}
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
          animation: scroll 40s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}