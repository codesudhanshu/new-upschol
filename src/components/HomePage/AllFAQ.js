"use client"
import { getAllFAQData } from '@/app/api/candidate/HomePage';
import { useState, useEffect } from 'react';

export default function AllFAQHome() {
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
    <section className="faq-section my-5">
      <div className="container">
        <div className="header">
          <h2>FAQ: Get the Information You Need</h2>
        </div>
        <div className="body mt-4">
          <div className="accordion" id="accordionExample">
            {faqs.map((faq, index) => (
              <div className="accordion-item" key={faq._id}>
                <h2 className="accordion-header">
                  <button 
                    className={`accordion-button faq-acc ${activeIndex === index ? '' : 'collapsed'}`} 
                    type="button"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span>⭐</span>
                    <b className="ms-5">{faq.title}</b>
                  </button>
                </h2>
                <div className={`accordion-collapse faq-collapse ${activeIndex === index ? 'visible' : 'collapse'}`}>
                  <div className="accordion-body">
                    <strong>{faq.description}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}