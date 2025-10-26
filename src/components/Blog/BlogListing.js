// components/BlogListing.js
'use client';

import { getAllBlogs, getTrendingPostsAll, } from '@/app/api/admin/apiService';
import { useState, useEffect } from 'react';
import LatestPosts from './LatestPosts';
import BlogBanner from './BlogBanner';
import TrendingPosts from './TrendingPosts';


export default function BlogListing() {
  const [featuredBlog, setFeaturedBlog] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const [allBlogsResponse, trendingResponse] = await Promise.all([
          getAllBlogs(),
          getTrendingPostsAll()
        ]);

        const allBlogs = allBlogsResponse?.result?.blogs || [];
        const trendingBlogs = trendingResponse?.result?.blogs || [];
        
        // Set featured blog (first blog from trending)
        const featured = trendingBlogs.length > 0 ? trendingBlogs[0] : null;
        setFeaturedBlog(featured);
        
        // Set latest posts (all blogs except featured)
        const latest = allBlogs.filter(blog => blog._id !== featured?._id);
        setLatestPosts(latest);
        
        // Set trending posts (all trending blogs except featured)
        const trending = trendingBlogs.filter(blog => blog._id !== featured?._id);
        setTrendingPosts(trending);

      } catch (err) {
        console.error('Error fetching blog data:', err);
        setError('Failed to load blog data');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <>
      <section className="common_banner contactus_banner blog_listingbanner">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="inner_page_banner blog_heading">
                <span>Blogs</span>
                <h1>Updates on the latest career opportunities, online education, online universities, & more</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog_listing_section">
        <div className="container">
          <BlogBanner featuredBlog={featuredBlog} />
          
          <div className="blog_listing d-flex">
            <LatestPosts posts={latestPosts} />
            <TrendingPosts posts={trendingPosts} />
          </div>
        </div>
      </section>
    </>
  );
}