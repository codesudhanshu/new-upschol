import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

const profilesection = () => {
  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h1>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-8"></div>
    </div>
  );
};

export default profilesection;