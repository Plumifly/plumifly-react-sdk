// Config exports
export { initPlumifly, getPlumiflyInstance } from './config';

// Component exports
export { BlogList, BlogPost } from './components';

// API client exports
export { fetchBlogPosts, fetchBlogPost } from './api/client';

// Type exports
export type {
  // Core types
  PlumiflyConfig,
  PlumiflyInstance,
  PlumiflyTheme,
  
  // Error types
  PlumiflyError,
  
  // Data types
  BlogPostTypes,
  BlogListResponse,
  
  // Component prop types
  BlogListProps,
  BlogPostProps,
  BlogPageProps,
  
  // Route/Navigation types
  BlogRouteParams
} from './types';