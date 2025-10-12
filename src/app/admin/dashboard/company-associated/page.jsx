import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

const companyassociated = () => {
  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Company Association</h1>
            <p className="text-gray-600">All company association List in your website</p>
          </div>
          <Link href="/admin/dashboard/company-associated/create-company-associated">
            <button
              className="flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 text-white shadow-lg transform scale-[1.02]"
              style={{ background: '#6941c6' }}
            >
              <Plus className="w-5 h-5" /> Add Company Association
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-8"></div>
    </div>
  );
};

export default companyassociated;