export interface PlumiflyConfig {
  apiKey: string;
  baseUrl?: string;
}

export interface PlumiflyInstance {
  apiKey: string;
  isInitialized: boolean;
  baseUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content?: string;
  slug: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
  projectId?: string;
  image_url?: string;
  image_alt?: string;
}

export interface BlogPageProps {
  slug?: string[];
  id?: string;
}

export interface BlogListResponse {
  project: {
    id: string;
    name: string;
    settings?: string;
  };
  blogs: BlogPost[];
}