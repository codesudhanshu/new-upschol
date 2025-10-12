"use client"
import { getAllFAQData } from '@/app/api/candidate/HomePage';
import { useState, useEffect } from 'react';

export default function AllFAQ() {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllFAQData();
        if (response.status && response.result) {
          setFaqs(response.result);
        }
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
      }
    };
    fetchData();
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (faqs.length === 0) return <div className="text-center py-8">Loading FAQs...</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold  text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text mb-8">Frequently Asked Questions</h1>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={faq._id} 
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={() => toggleFAQ(index)}
            >
              <h2 className="text-lg font-medium flex justify-between items-center">
                {faq.title}
                <span className="text-xl">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </h2>
            </button>
            
            {activeIndex === index && (
              <div className="px-6 py-4 bg-white">
                <p className="text-gray-700">{faq.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}