"use client";
import { useEffect, useState } from "react";
import { getAllfaq } from "@/app/api/admin/faqapi";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await getAllfaq();
        if (data.status && data.result) {
          setFaqs(data.result);
        } else {
          setError("Failed to fetch FAQs");
        }
      } catch (err) {
        setError("An error occurred while fetching FAQs");
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* Hero Section - Same as HTML structure */}
      <section className="blog_details_section common_background_img faq-banner">
        <div className="container">
          <div className="faq-sction-start">
            <div className="left-col">
              <span>Help Center</span>
              <h1>Frequently <br />Asked Questions</h1>
            </div>
            <div className="right-col">
              {/* Right column content if any */}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content Section */}
      <div className="faq-box-start">
        <div className="container">
          <div className="faq_content">
            {loading && (
              <div className="text-center py-8">
                <p className="text-gray-500 font-medium">Loading FAQs...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-8">
                <p className="text-red-500 font-medium">{error}</p>
              </div>
            )}

            {!loading && !error && (
              <div className="faq_content_box accordion accordion-flush" id="accordionFlushExample">
                {faqs.map((faq, index) => (
                  <div key={faq._id} className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${openIndex === index ? '' : 'collapsed'}`}
                        type="button"
                        onClick={() => toggleFaq(index)}
                      >
                        {faq.title}
                      </button>
                    </h2>
                    <AnimatePresence>
                      {openIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div 
                            id={`flush-collapseOne_${faq._id}`}
                            className=""
                          >
                            <div className="accordion-body" >
                              {faq.description}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}