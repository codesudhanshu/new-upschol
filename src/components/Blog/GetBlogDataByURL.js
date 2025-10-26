// components/GetBlogDataByURL.js
import { getBlogById, getTrendingPosts } from '@/app/api/admin/apiService';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function GetBlogDataByURL({ blogUrl }) {
  const [blogData, setBlogData] = useState(null);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const blogDataResponse = await getBlogById(blogUrl);
        setBlogData(blogDataResponse?.result?.blog[0] || null);
        
        const trendingData = await getTrendingPosts(blogUrl);
        // Fixed: Access the correct property from trendingData
        setTrendingPosts(trendingData?.result?.blogs || []);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setError('Failed to load blog data');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [blogUrl]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    } catch (error) {
      return 'Invalid date';
    }
  };

  // Function to handle social sharing URLs safely
  const getShareUrl = (platform, title, url) => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareUrl = url || currentUrl;
    const shareTitle = title || '';

    switch (platform) {
      case 'facebook':
        return `https://www.facebook.com/sharer.php?u=${encodeURIComponent(shareUrl)}&t=${encodeURIComponent(shareTitle)}`;
      case 'twitter':
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
      case 'whatsapp':
        return `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`;
      default:
        return '#';
    }
  };

  if (loading) {
    return (
      <div className="blog_details_section common_background_img">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="text-center py-5">Loading...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog_details_section common_background_img">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="text-center py-5 text-danger">Error: {error}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="blog_details_section common_background_img">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="text-center py-5">Blog not found</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="blog_details_section common_background_img">
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <div className="blog_detailsbanner box_shadow">
              <figure>
                <img 
                  src={blogData.bannerImage} 
                  alt={blogData.title}
                  className="img-fluid"
                  onError={(e) => {
                    e.target.src = '/images/placeholder-blog.jpg';
                  }}
                />
              </figure>
            </div>
            
            <div className="blog_details box_shadow">
              <h1>{blogData.title}</h1>
              
              <div className="author_details">
                <span>by <a href="#">{blogData.createdBy || 'Unknown Author'}</a></span>
                <span>- {formatDate(blogData.createdAt)}</span>
              </div>

              {/* Render the blog content */}
              <div 
                dangerouslySetInnerHTML={{ __html: blogData.content }}
                className="blog-content"
              />

              {/* Social sharing icons */}
              <div className="blog_banner_icon">
                <div className="icon d-flex latest_postsicon share-wrapper">
                  <figure>
                    <a href="#">
                      <img className="share_icon share" src="/images/share_network_icon.svg" alt="Share" />
                      <img className="share_icon_white share" src="/images/share_network_icon_white.svg" alt="Share" />
                    </a>
                  </figure>

                  <div className="share-btns">
                    <a target="_blank" rel="noopener noreferrer" 
                       href={getShareUrl('facebook', blogData.title)}>
                      <i className="fa fa-facebook-official fa-2x" aria-hidden="true"></i>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" 
                       href={getShareUrl('twitter', blogData.title)}>
                      <i className="fa fa-twitter-square fa-2x" aria-hidden="true"></i>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" 
                       href={getShareUrl('linkedin', blogData.title)}>
                      <i className="fa fa-linkedin fa-2x" aria-hidden="true"></i>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" 
                       href={getShareUrl('whatsapp', blogData.title)}>
                      <i className="fa fa-whatsapp fa-2x" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trending Posts Sidebar */}
          <div className="col-md-3 trending_posts" id="blog_right">
            
            <h2 id="hdg">Trending Posts</h2>

            <div className="show" id="collapseExample">
              <ul className="trending_posts_listing">
                {trendingPosts.map((post, index) => (
                  <li key={post._id || index}>
                    <h5>
                      <Link href={`/blogs/${post.url}`}>{post.title}</Link>
                    </h5>
                    <div className="author_details">
                      <span>by <a href="#">{post.createdBy || 'Unknown Author'}</a></span>
                      <span>- {formatDate(post.createdAt)}</span>
                    </div>
                  </li>
                ))}
                {trendingPosts.length === 0 && (
                  <li>No trending posts available</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Modal */}
      <div className="modal fade" id="newsletterModal" tabIndex={-1} aria-labelledby="newsletterModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newsletterModalLabel">Subscribe</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="subscribe_form">
                <form method="POST" action="/api/subscribe" id="newsletterForm">
                  <input className="form-control news_letter_email" placeholder="Email Address" name="email" type="email" required />
                  <input type="text" name="first_name" placeholder="First name" className="form-control news_letter_email" />
                  <input type="text" name="last_name" placeholder="Last name" className="form-control news_letter_email" />
                  <button className="btn btn-primary subscribe_btn">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}