'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TrendingPosts({ posts }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const displayedPosts = isCollapsed ? posts.slice(0, 5) : posts;

  return (
    <div className="trending_posts">
      <h2>Trending Posts</h2>
      
      <button 
        className={`posts_menu accordion_filter ${isCollapsed ? 'collapsed' : ''}`}
        onClick={() => setIsCollapsed(!isCollapsed)}
        type="button"
      >
        Trending Posts
      </button>

      <div>
        <ul className="trending_posts_listing">
          {displayedPosts.map((post) => (
            <li key={post._id}>
              <h5>
                <Link href={`/blogs/${post.url}`}>{post.title}</Link>
              </h5>
              <div className="author_details">
                <span>by <Link href="/">{post.createdBy}</Link> </span>
                <span>- {formatDate(post.createdAt)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}