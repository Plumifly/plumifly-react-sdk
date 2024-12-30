// src/index.ts
import './styles/global.css';   // Add this at the top
export { initPlumifly, getPlumiflyInstance } from './config';
export { BlogList, BlogPost } from './components';
export { fetchBlogPosts, fetchBlogPost } from './api/client';
export type { PlumiflyConfig, PlumiflyInstance, BlogPageProps } from './types';