import type { Comment } from './data';

const DEFAULT_API_URL = 'http://localhost:4000';

const getBaseUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL ?? '';
  if (envUrl) return envUrl;
  // In browser on localhost, default to backend so comment API works without .env.local
  if (typeof window !== 'undefined' && window.location?.hostname === 'localhost') {
    return DEFAULT_API_URL;
  }
  return '';
};

export const isApiConfigured = (): boolean => !!getBaseUrl();

/**
 * Fetch all blog posts from the API (for static generation or listing).
 */
export async function fetchPostsFromApi(): Promise<unknown[]> {
  const base = getBaseUrl();
  if (!base) return [];
  const res = await fetch(`${base}/api/posts`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

/**
 * Fetch a single blog post by slug from the API.
 */
export async function fetchPostFromApi(slug: string): Promise<unknown | null> {
  const base = getBaseUrl();
  if (!base) return null;
  const res = await fetch(`${base}/api/posts/${slug}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}

/**
 * Fetch comments for a post from the API.
 */
export async function fetchCommentsFromApi(postSlug: string): Promise<Comment[]> {
  const base = getBaseUrl();
  if (!base) throw new Error('API URL not configured');
  const res = await fetch(`${base}/api/posts/${postSlug}/comments`);
  if (!res.ok) throw new Error('Failed to fetch comments');
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

/**
 * Submit a new comment (with rating) to the API.
 */
export async function postCommentToApi(
  postSlug: string,
  body: { author: string; comment: string; rating: number; avatar?: string }
): Promise<Comment> {
  const base = getBaseUrl();
  if (!base) throw new Error('API URL not configured');
  const res = await fetch(`${base}/api/posts/${postSlug}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to post comment');
  }
  return res.json();
}
