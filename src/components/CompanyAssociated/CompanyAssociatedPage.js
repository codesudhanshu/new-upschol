"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllCompanies } from "@/app/api/admin/apiService";

export default function CompanyAssociatedPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedcompany, setSelectedcompany] = useState(null);
  const [companies, setcompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchcompanies = async () => {
      try {
        const data = await getAllCompanies();
        console.log("API Response:", data);

        if (data.status && data.result && data.result.companies) {
          setcompanies(data.result.companies);
        } else {
          setError("Failed to fetch companies");
        }
      } catch (err) {
        console.error("Error fetching companies:", err);
        setError("Error fetching companies: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchcompanies();
  }, []);

  const handleImageClick = (company) => {
    setSelectedcompany(company);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedcompany(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center mx-4 my-12 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-[#14081E] mx-auto mb-4"></div>
          <p className="text-[#14081E] text-lg sm:text-xl font-semibold">
            Loading companies...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center mx-2 my-12 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20">
        <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-md mx-4 shadow-lg">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-[#14081E] text-base sm:text-lg font-semibold mb-2">
              Error Loading Data
            </h3>
            <p className="text-red-600 text-sm sm:text-base">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
<>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {companies.map((company, index) => (
          <div
            key={company._id}
            className="group cursor-pointer transform transition-all duration-500 hover:scale-105 sm:hover:scale-110 hover:-translate-x-1 sm:hover:-translate-x-2 hover:translate-y-1"
            onClick={() => handleImageClick(company)}
          >
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 hover:border-[#14081E]/30 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-gray-300/50 relative overflow-hidden">
              {/* Left slide animation element */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#14081E]/5 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>

              {/* Right slide animation element */}
              <div className="absolute inset-0 bg-gradient-to-l from-purple-500/5 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out delay-100"></div>

              <div className="relative z-10">
                <div className="relative overflow-hidden rounded-lg sm:rounded-xl mb-3 sm:mb-4">
                  <Image
                    src={company.image}
                    alt={company.title}
                    width={200}
                    height={200}
                    className="w-full h-24 sm:h-28 md:h-32 object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-[#14081E] font-semibold text-xs sm:text-sm text-center line-clamp-2 group-hover:text-purple-700 transition-colors duration-500">
                  {company.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {companies.length === 0 && (
        <div className="text-center py-12 sm:py-16">
          <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg
              className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-[#14081E] text-lg sm:text-xl font-semibold mb-2">
            No companies Found
          </h3>
          <p className="text-gray-600 text-sm sm:text-base px-4">
            Check back later for updates on our institutional companies.
          </p>
        </div>
      )}

      {isOpen && selectedcompany && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl mx-2">
            {/* Modal Header */}
            <div className="bg-gradient-to-r bg-gradient-to-r from-purple-600 to-indigo-600 p-4 sm:p-6 rounded-t-2xl sm:rounded-t-3xl">
              <div className="flex justify-between items-start">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white pr-2 sm:pr-4">
                  {selectedcompany.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 sm:p-2 transition-all duration-200 flex-shrink-0"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6">
              <div className="text-center mb-4 sm:mb-6">
                <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 inline-block">
                  <Image
                    src={selectedcompany.image}
                    alt={selectedcompany.title}
                    width={200}
                    height={200}
                    className="object-contain mx-auto w-32 h-32 sm:w-48 sm:h-48"
                  />
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {selectedcompany.description}
                  </p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Link
                  href="/testimonials"
                  className="flex-1 bg-gradient-to-r bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:from-purple-800 hover:to-[#14081E] transition-all duration-300 text-center font-semibold shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  View Alumini
                </Link>
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold text-sm sm:text-base"
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
