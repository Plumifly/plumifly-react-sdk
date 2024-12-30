'use client'

import React from 'react';
import { BlogPost } from '../../types';

const styles = {
  list: {
    maxWidth: '1024px',
    margin: '0 auto',
    padding: '20px'
  },
  article: {
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'box-shadow 0.2s ease'
  },
  articleHover: {
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#111'
  },
  description: {
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#444',
    marginBottom: '15px'
  },
  metadata: {
    fontSize: '14px',
    color: '#666'
  }
};

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  const handleClick = (slug: string) => {
    const basePath = window.location.pathname.split('/blog')[0];
    window.location.href = `${basePath}/blog/${slug}`;
  };

  return (
    <div style={styles.list}>
      {posts.map((post) => (
        <article 
          key={post.id}
          style={styles.article}
          onClick={() => handleClick(post.slug)}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, styles.articleHover);
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, styles.article);
          }}
        >
          <h2 style={styles.title}>{post.title}</h2>
          <p style={styles.description}>{post.description}</p>
          <div style={styles.metadata}>
            Posted: {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </article>
      ))}
    </div>
  );
}