'use client';
import { getAllSpecializations } from '@/app/api/admin/apiService';
import Layout from '@/components/Candidatepagelayout';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const AllSpecializations = () => {
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const specializationsData = await getAllSpecializations();
        setSpecializations(specializationsData?.result?.specializations || []);
      } catch (error) {
        console.error('Error fetching specializations:', error);
        setSpecializations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecializations();
  }, []);

  // Function to truncate description to 30 characters
  const truncateDescription = (description) => {
    if (!description) return '';
    if (description.length <= 150) return description;
    return description.substring(0, 150) + '...';
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem' , color: "#7004e5"}}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Layout>
    <section className="all-specializations py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        {/* Header Section */}
        <div className="row">
          <div className="col-12">
            <div className="text-center mb-5">
              <h2 className="fw-bold mb-3" style={{ fontSize: '2.5rem' }}>
                All <span style={{ color: '#7004e5' }}>Specializations</span>
              </h2>
              <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                Explore all available specializations to find the perfect fit for your career goals
              </p>
            </div>
          </div>
        </div>
        
        {/* Specializations Grid */}
        {specializations.length > 0 ? (
          <div className="row g-4">
            {specializations.map((specialization) => (
              <div 
                key={specialization._id} 
                className="col-lg-4 col-md-6 col-sm-12"
              >
                <div className="card h-100 border-0 shadow-sm" style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                  <Link href={`/specialization/${specialization.url}`} className="text-decoration-none">
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                      <img 
                        src={specialization.bannerImage} 
                        alt={specialization.title} 
                        className="card-img-top"
                        style={{ 
                          height: '200px', 
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                      <div 
                        className="position-absolute bottom-0 start-0 w-100 text-white px-3 py-2" 
                        style={{ 
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}
                      >
                        Specialization
                      </div>
                    </div>
                    
                    <div className="card-body p-4">
                      <h5 className="card-title fw-bold mb-3" style={{ color: '#212529', fontSize: '1.1rem' }}>
                        {specialization.title}
                      </h5>
                      <p className="card-text text-muted mb-3" style={{ fontSize: '14px' }}>
                        {truncateDescription(specialization.description)}
                      </p>
                      <div className="d-flex align-items-center" style={{ color: '#7004e5', fontSize: '14px', fontWeight: '600' }}>
                        Learn More <span className="ms-2">→</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="row">
            <div className="col-12">
              <div className="text-center py-5">
                <h4 className="fw-bold mb-2">No Specializations Found</h4>
                <p className="text-muted">There are no specializations available at the moment.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
        }
        
        .card:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
    </Layout>
  );
};

export default AllSpecializations;