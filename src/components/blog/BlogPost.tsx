'use client'

import React from 'react';
import { BlogPost as BlogPostType } from '../../types';

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px'
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#111'
  },
  content: {
    fontSize: '18px',
    lineHeight: '1.7',
    color: '#333'
  },
  metadata: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #eee',
    fontSize: '14px',
    color: '#666'
  }
};

interface BlogPostProps {
  post: BlogPostType;
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <article style={styles.container}>
      <h1 style={styles.title}>{post.title}</h1>
      <div style={styles.content}>
        {post.content}
      </div>
      <div style={styles.metadata}>
        Published: {new Date(post.createdAt).toLocaleDateString()}
        {post.updatedAt !== post.createdAt && (
          <span> • Updated: {new Date(post.updatedAt).toLocaleDateString()}</span>
        )}
      </div>
    </article>
  );
}