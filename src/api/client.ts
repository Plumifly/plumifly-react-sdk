// src/api/server.ts
import { BlogListResponse, BlogPost } from '../types';
import { getPlumiflyInstance } from '../config';

export async function fetchBlogPosts(): Promise<BlogListResponse> {
  const { apiKey, baseUrl } = getPlumiflyInstance();

  const res = await fetch(`${baseUrl}/blogs`, {
    headers: {
      'X-API-Key': apiKey,
    },
    cache: 'no-store', // Fetch fresh data on every request
  });

  if (!res.ok) {
    throw new Error('Failed to fetch blogs');
  }

  return res.json();
}

export async function fetchBlogPost(id: string): Promise<BlogPost> {
  const { apiKey, baseUrl } = getPlumiflyInstance();

  const res = await fetch(`${baseUrl}/blog/${id}`, {
    headers: {
      'X-API-Key': apiKey,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch blog post');
  }

  return res.json();
}
