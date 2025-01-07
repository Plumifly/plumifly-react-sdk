import { BlogListResponse, BlogPostTypes, PlumiflyError } from "../types";
import { getPlumiflyInstance } from "../config";

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

async function plumiflyFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { apiKey, baseUrl, callbacks } = getPlumiflyInstance();

  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new PlumiflyError({
        message: data.message || `API Error: ${res.status}`,
        code: `API_ERROR_${res.status}`,
        status: res.status,
        context: data
      });
    }

    return data as T;
  } catch (error) {
    if (error instanceof PlumiflyError) {
      callbacks?.onError?.(error);
      throw error;
    }

    // Handle network or parsing errors
    const plumiflyError = new PlumiflyError({
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      code: 'NETWORK_ERROR',
      context: error
    });

    callbacks?.onError?.(plumiflyError);
    throw plumiflyError;
  }
}

export async function fetchBlogPosts(
  params?: {
    page?: number;
    limit?: number;
    status?: 'draft' | 'published' | 'archived';
  }
): Promise<BlogListResponse> {
  const queryParams = new URLSearchParams();
  
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.status) queryParams.append('status', params.status);

  const queryString = queryParams.toString();
  const endpoint = `/blogs${queryString ? `?${queryString}` : ''}`;

  return plumiflyFetch<BlogListResponse>(endpoint);
}

export async function fetchBlogPost(
  idOrSlug: string,
  params?: {
    preview?: boolean;
  }
): Promise<BlogPostTypes> {
  const queryParams = new URLSearchParams();
  if (params?.preview) queryParams.append('preview', 'true');

  const queryString = queryParams.toString();
  const endpoint = `/blog/${idOrSlug}${queryString ? `?${queryString}` : ''}`;

  return plumiflyFetch<BlogPostTypes>(endpoint);
}

// Additional utility exports if needed
export type { FetchOptions };