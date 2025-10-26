// components/BlogBanner.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogBanner({ featuredBlog }) {
  const [imageError, setImageError] = useState(false);

  if (!featuredBlog) {
    return (
      <div className="blog_banner_slider">
        <h2 className="blog_posts_heading">Featured Blog Posts</h2>
        <div className="bg-white box_shadow">
          <div className="text-center p-5">
            <p>No featured blog available</p>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

    const getShareUrl = (platform, title,url) => {
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

  return (
    <div className="blog_banner_slider">
      <h2 className="blog_posts_heading">Featured Blog Posts</h2>
      <div className="bg-white box_shadow">
        <div className="blog_item d-flex">
          <div className="featured_blog">
            <Link href={`/blogs/${featuredBlog.url}`}>
              <figure>
                <Image
                  src={imageError ? '/images/placeholder-blog.jpg' : featuredBlog.bannerImage}
                  alt={featuredBlog.title}
                  width={547}
                  height={312}
                  className="img-fluid"
                  onError={() => setImageError(true)}
                />
              </figure>
            </Link>
          </div>
          
          <div className="featured_blog_content">
            <Link href={`/blogs/${featuredBlog.url}`}>
              <h2>{featuredBlog.title}</h2>
            </Link>
            
            <div className="author_details">
              <span>by <Link href="/">{featuredBlog.createdBy}</Link> </span>
              <span>- {formatDate(featuredBlog.createdAt)}</span>
            </div>

            <Link href={`/blogs/${featuredBlog.url}`}>
              <p>
                {featuredBlog.description?.replace(/<[^>]*>/g, '').substring(0, 200)}...
              </p>
            </Link>

            <div className="blog_banner_icon">
                 <div className="">
                <div className="icon d-flex latest_postsicon share-wrapper">
                  <figure>
                    <Link href="#">
                      <img className="share_icon share" src="/images/share_network_icon.svg" alt="Share" />
                      <img className="share_icon_white share" src="/images/share_network_icon_white.svg" alt="Share" />
                    </Link>
                  </figure>

                  <div className="share-btns">
                    <Link target="_blank" rel="noopener noreferrer" 
                       href={getShareUrl('facebook', featuredBlog.title)}>
                      <i className="fa fa-facebook-official fa-2x" aria-hidden="true"></i>
                    </Link>
                    <Link target="_blank" rel="noopener noreferrer" 
                       href={getShareUrl('twitter', featuredBlog.title)}>
                      <i className="fa fa-twitter-square fa-2x" aria-hidden="true"></i>
                    </Link>
                    <Link target="_blank" rel="noopener noreferrer" 
                       href={getShareUrl('linkedin', featuredBlog.title)}>
                      <i className="fa fa-linkedin fa-2x" aria-hidden="true"></i>
                    </Link>
                    <Link target="_blank" rel="noopener noreferrer" 
                       href={getShareUrl('whatsapp', featuredBlog.title)}>
                      <i className="fa fa-whatsapp fa-2x" aria-hidden="true"></i>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="blog_btnbox">
                <Link href={`/blogs/${featuredBlog.url}`} className="btn btn-primary" style={{backgroundColor:"#8D0DFE"}}>
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}