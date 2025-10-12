"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getAllApprovals } from '@/app/api/admin/apiService';

const AffiliateInstitute = () => {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApprovals = async () => {
      try {
        const data = await getAllApprovals();
        console.log('API Response:', data); // Log the full response
        
        if (data.status) {
          // Check the actual structure of the response
          const approvalsData = data.result?.approvals || data.result || data.approvals || data;
          setApprovals(Array.isArray(approvalsData) ? approvalsData : []);
        } else {
          setError(data.error || 'Failed to fetch approvals');
        }
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchApprovals();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Affiliate Institute</h1>
            <p className="text-gray-600">All affiliate institute list of your website</p>
          </div>
          <Link href="/admin/dashboard/affiliate-institute/create-affiliate-institute">
            <button
              className="flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 text-white shadow-lg transform scale-[1.02]"
              style={{ background: '#6941c6' }}
            >
              <Plus className="w-5 h-5" /> Affiliate Institute
            </button>
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-8">
        {approvals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvals.map((approval) => (
              <div key={approval._id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={approval.image} 
                    alt={approval.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{approval.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {approval.description}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Created: {new Date(approval.createdOn).toLocaleDateString()}</span>
                    <Link href={`/admin/dashboard/affiliate-institute/${approval._id}`}>
                      <span className="text-indigo-600 hover:text-indigo-800 cursor-pointer">View Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No affiliate institutes found
          </div>
        )}
      </div>
    </div>
  );
};

export default AffiliateInstitute;