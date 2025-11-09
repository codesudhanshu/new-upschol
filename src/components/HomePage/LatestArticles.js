'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTrendingPostsAll } from '@/app/api/admin/apiService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CalendarCheck, MoveRight } from 'lucide-react';

export default function LatestArticles() {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await getTrendingPostsAll();
        const trendingBlogs = response?.result?.blogs || [];
        setTrendingPosts(trendingBlogs);
      } catch (err) {
        console.error('Error fetching blog data:', err);
        setError('Failed to load blog data');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <section className="latest-articles my-5">
        <div className="container">
          <div className="text-center">Loading blogs...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="latest-articles my-5">
        <div className="container">
          <div className="text-center text-danger">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="latest-articles my-5">
      <div className="container">
        <div className="headers text-center">
          <h2 className="text-center heading">
            Explore Our <strong>Latest Blog</strong>
          </h2>
          <p>We explore how these institutions are pushing the boundaries of technology and science.</p>
        </div>
        
        <div className="body mt-4">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{
              el: '.swiper-pagination',
              clickable: true,
            }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="my-blog"
          >
            {trendingPosts.map((blog) => (
              <SwiperSlide key={blog._id}>
                <div className="card d-block border-0 p-0 h-100 shadow-sm">
                  <Link href={`/blogs/${blog.url}`} className="d-block">
                    <Image 
                      src={blog.bannerImage} 
                      alt={blog.title}
                      width={404}
                      height={225}
                      style={{ 
                        width: '100%', 
                        height: '225px', 
                        objectFit: 'cover' 
                      }}
                      className="blog-image rounded-top"
                    />
                  </Link>
                  
                  <div className="card-body px-3 pt-3 d-flex flex-column">
                    <div className="mb-2 flex-grow-0">
                      <h5 className="card-title">
                        <Link 
                          href={`/blogs/${blog.url}`}
                          className="text-dark text-decoration-none"
                        >
                          {truncateText(blog.title, 50)}
                        </Link>
                      </h5>
                    </div>
                    
                    <p className="card-text text-muted flex-grow-1">
                      {truncateText(blog.title, 120)}
                    </p>
                    
                    <div className="date mt-3 d-flex align-items-center text-muted flex-grow-0">
                      <CalendarCheck style={{color:"#7004e5"}} className="mr-2" />
                      {formatDate(blog.createdAt)} | {blog.createdBy}
                    </div>
                  </div>
                  
                  <div className="card-footer bg-transparent border-0 pt-0 pb-3 mt-auto">
                    <Link 
                      href={`/blogs/${blog.url}`}
                      className=" d-flex align-items-center justify-content-end  fw-semibold"
                     
                    >
                      <span className="me-2" style={{color:"#7004e5"}}>Continue Reading</span>
                      <MoveRight style={{color:"#7004e5"}}/>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            
            {/* Swiper Pagination */}
            {/* <div className="swiper-pagination mt-4"></div> */}
            
            {/* Swiper Navigation */}
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </Swiper>
          
          <div className="blog_btn text-center mt-4">
            <Link href="/blogs" className="btn btn-primary px-4 py-2" style={{backgroundColor:"#7004e5"}}>
              View All Blog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}