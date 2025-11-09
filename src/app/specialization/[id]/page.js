'use client';
import { getSpecializationById } from '@/app/api/admin/apiService';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import Layout from '@/components/Candidatepagelayout';

const SpecializationDetailPage = () => {
  const params = useParams();
  const url = params.id; // URL slug from params
  
  const [specialization, setSpecialization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isShareHovered, setIsShareHovered] = useState(false); // New state for hover

  useEffect(() => {
    const fetchSpecializationDetail = async () => {
      try {
        const data = await getSpecializationById(url);
        setSpecialization(data?.result?.specialization?.[0] || null);
      } catch (error) {
        console.error('Error fetching specialization details:', error);
        setSpecialization(null);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchSpecializationDetail();
    }
  }, [url]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem' , color: "#7004e5"}}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!specialization) {
    return (
      <div style={{ textAlign: 'center', padding: '50px 0' }}>
        <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Specialization Not Found</h4>
        <p style={{ color: '#6c757d' }}>The specialization you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{specialization.title} - Upschol</title>
        <meta name="description" content={specialization.description} />
        <meta name="keywords" content={specialization.keywords?.join(', ') || 'MBA, Online Education'} />
        <meta name="author" content="Upschol" />
      </Head>

    <Layout>
      <section className="blog_details_section common_background_img">
        <div className="container">
          {/* Banner Image */}
          <div className="blog_detailsbanner box_shadow">
            <figure style={{ margin: 0 }}>
              <img 
                src={specialization.bannerImage} 
                alt={specialization.title}
                style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
              />
            </figure>
          </div>

          {/* Content Section */}
          <div className="blog_details box_shadow" style={{ 
            backgroundColor: '#fff', 
            padding: '40px', 
            borderRadius: '10px', 
            marginTop: '30px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#212529', marginBottom: '20px' }}>
              {specialization.title}
            </h1>
            
            <div className="author_details" style={{ marginBottom: '30px', color: '#6c757d', fontSize: '14px' }}>
              <span>by <a href="javascript:void(0);" style={{ color: '#7004e5', textDecoration: 'none' }}>
                {specialization.createdBy || 'Admin'}
              </a></span>
              <span> - {new Date(specialization.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}</span>
            </div>

            {/* Description */}
            <div style={{ 
              fontSize: '16px', 
              lineHeight: '1.8', 
              color: '#444',
              marginBottom: '20px'
            }}>
              <p>{specialization.description}</p>
            </div>

            {/* HTML Content */}
            <div 
              className="specialization-content"
              dangerouslySetInnerHTML={{ __html: specialization.content }}
              style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#444'
              }}
            />

            {/* Share Icons with Hover Effect */}
            <div className="blog_banner_icon" style={{ marginTop: '40px' }}>
              <div 
                className="icon d-flex latest_postsicon share-wrapper"
                onMouseEnter={() => setIsShareHovered(true)}
                onMouseLeave={() => setIsShareHovered(false)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <figure style={{ margin: '0 10px 0 0', backgroundColor: "white" }}>
                  <a href="javascript:void(0);">
                    <img 
                      className="share_icon share" 
                      src="/images/share_network_icon.svg" 
                      alt="Share"
                      style={{ width: '30px', height: '30px' }}
                    />
                  </a>
                </figure>

                <div 
                  className="share-btns" 
                  style={{ 
                    display: 'flex', 
                    gap: '15px',
                    opacity: isShareHovered ? 1 : 0,
                    transform: isShareHovered ? 'translateX(0)' : 'translateX(-10px)',
                    transition: 'all 0.3s ease-in-out',
                    visibility: isShareHovered ? 'visible' : 'hidden',
                    position: 'absolute',
                    left: '40px',
                    background: '#fff',
                    padding: '8px 15px',
                    borderRadius: '25px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                  }}
                >
                  <a 
                    target="_blank" 
                    href={`https://www.facebook.com/sharer.php?u=${typeof window !== 'undefined' ? window.location.href : ''}&t=${specialization.title}`}
                    rel="noopener noreferrer"
                    style={{ transition: 'transform 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <i className="fa fa-facebook-official fa-2x" aria-hidden="true" ></i>
                  </a>
                  <a 
                    target="_blank" 
                    href={`https://twitter.com/home/?status=${specialization.title} - ${typeof window !== 'undefined' ? window.location.href : ''}`}
                    rel="noopener noreferrer"
                    style={{ transition: 'transform 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <i className="fa fa-twitter-square fa-2x" aria-hidden="true" ></i>
                  </a>
                  <a 
                    target="_blank" 
                    href={`https://www.instagram.com/?url=${typeof window !== 'undefined' ? window.location.href : ''}`}
                    rel="noopener noreferrer"
                    style={{ transition: 'transform 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <i className="fa fa-instagram fa-2x" aria-hidden="true"></i>
                  </a>
                  <a 
                    target="_blank" 
                    href={`http://www.linkedin.com/shareArticle?mini=true&url=${typeof window !== 'undefined' ? window.location.href : ''}&title=${specialization.title}`}
                    rel="noopener noreferrer"
                    style={{ transition: 'transform 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <i className="fa fa-linkedin fa-2x" aria-hidden="true" ></i>
                  </a>
                  <a 
                    target="_blank" 
                    href={`https://api.whatsapp.com/send?text=${specialization.title} - ${typeof window !== 'undefined' ? window.location.href : ''}`}
                    rel="noopener noreferrer"
                    style={{ transition: 'transform 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <i className="fa fa-whatsapp fa-2x" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
</Layout>
    </>
  );
};

export default SpecializationDetailPage;