// Theme Types
export interface PlumiflyTheme {
  colors?: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
    accent: string;
  };
  fonts?: {
    primary: string;
    secondary: string;
  };
  spacing?: {
    small: string;
    medium: string;
    large: string;
  };
}

// Core Configuration Types
export interface PlumiflyConfig {
  apiKey: string;
  baseUrl?: string;
  callbacks?: {
    onError?: (error: PlumiflyError) => void;
    onNavigate?: (path: string) => void;
  };
}

export interface PlumiflyInstance {
  apiKey: string;
  baseUrl: string;
  isInitialized: boolean;
  theme?: PlumiflyTheme;
  callbacks?: PlumiflyConfig['callbacks'];
}

// Error Handling
export class PlumiflyError extends Error {
  code: string;
  status?: number;
  context?: any;

  constructor({ 
    message, 
    code, 
    status, 
    context 
  }: { 
    message: string; 
    code: string; 
    status?: number; 
    context?: any; 
  }) {
    super(message);
    this.code = code;
    this.status = status;
    this.context = context;
    this.name = 'PlumiflyError';
  }
}

// Blog Data Types
export interface BlogPostTypes {
  id: string;
  title: string;
  description: string;
  content?: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  projectId?: string;
  image_url?: string;
  image_alt?: string;
  imageUrl?: string;
  imageAlt?: string;
  publishedAt?: string;
  metadata?: {
    author?: string;
    tags?: string[];
    readTime?: number;
    category?: string;
    [key: string]: any;
  };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
}

export interface BlogListResponse {
  project: {
    id: string;
    name: string;
    settings?: {
      theme?: PlumiflyTheme;
      layout?: 'grid' | 'list';
      postsPerPage?: number;
    };
  };
  blogs: BlogPostTypes[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

// Component Props Types
export interface BlogListProps {
  data: BlogListResponse;
  theme?: PlumiflyTheme;
  onBack?: () => void;
}

export interface BlogPostProps {
  post: BlogPostTypes;
  theme?: PlumiflyTheme;
  onBack?: () => void;
}

export interface BlogPageProps {
  data: BlogListResponse | BlogPostTypes;
}

// Navigation Props Types
export interface BlogRouteParams {
  slug?: string[];
  id?: string;
  preview?: boolean;
}