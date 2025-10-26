// components/LatestPosts.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LatestPosts({ posts }) {
  const [loadingMore, setLoadingMore] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(6);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const loadMore = async () => {
    setLoadingMore(true);
    // Simulate API call delay
    setTimeout(() => {
      setVisiblePosts(prev => prev + 6);
      setLoadingMore(false);
    }, 1000);
  };

  const displayedPosts = posts.slice(0, visiblePosts);

 const getShareUrl = (platform, title, url) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareUrl = url && title ? `${url}/${encodeURIComponent(title)}` : currentUrl;

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
    <div className="latest_posts">
      <h3>Latest Posts</h3>
      <ul className="blog-append-list">
        {displayedPosts.map((post) => (
          <li key={post._id}>
            <div className="card">
              <figure>
                <Link href={`/blogs/${post.url}`}>
                  <Image
                    src={post.bannerImage}
                    alt={post.title}
                    width={498}
                    height={280}
                    className="img-fluid"
                  />
                </Link>
              </figure>
              
              <div className="card-body">
                <h4 className="card-title">
                  <Link href={`/blogs/${post.url}`}>{post.title}</Link>
                </h4>
                
                <div className="author_details">
                  <span>by <Link href="/">{post.createdBy}</Link></span>
                  <span>- {formatDate(post.createdAt)}</span>
                </div>

                <Link href={`/blogs/${post.url}`}>
                  <p>
                    {post.description?.replace(/<[^>]*>/g, '').substring(0, 100)}...
                  </p>
                </Link>

                <div className="blog_banner_icon">
                  <div className="blog_btnbox content_btn pt-0">
                    <Link href={`/blogs/${post.url}`} className="btn-link">
                      Read More
                    </Link>
                  </div>
                  
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
                       href={getShareUrl('facebook', post.title)}>
                      <i className="fa fa-facebook-official fa-2x" aria-hidden="true"></i>
                    </Link>
                    <Link target="_blank" rel="noopener noreferrer" 
                       href={getShareUrl('twitter', post.title)}>
                      <i className="fa fa-twitter-square fa-2x" aria-hidden="true"></i>
                    </Link>
                    <Link target="_blank" rel="noopener noreferrer" 
                       href={getShareUrl('linkedin', post.title)}>
                      <i className="fa fa-linkedin fa-2x" aria-hidden="true"></i>
                    </Link>
                    <Link target="_blank" rel="noopener noreferrer" 
                       href={getShareUrl('whatsapp', post.title)}>
                      <i className="fa fa-whatsapp fa-2x" aria-hidden="true"></i>
                    </Link>
                  </div>
                </div>
              </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {visiblePosts < posts.length && (
        <div className="loadmore content_btn text-center mb-5">
          <button 
            className="btn btn-primary load_more" 
            onClick={loadMore}
            disabled={loadingMore}
          >
            {loadingMore ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Loading...
              </>
            ) : (
              'View More'
            )}
          </button>
        </div>
      )}
    </div>
  );
}