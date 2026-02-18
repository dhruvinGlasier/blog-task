'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Comment, fetchComments } from '@/lib/data';
import { isApiConfigured, fetchCommentsFromApi, postCommentToApi } from '@/lib/api';

/** Static avatar used for all comments (not from API). */
const COMMENT_AVATAR_STATIC =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop';

/** Face icons for rating (angry → happy). */
const RatingIcons = {
  bad: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
      <circle cx="9" cy="9.5" r="1" fill="currentColor" />
      <circle cx="15" cy="9.5" r="1" fill="currentColor" />
      <path d="M8 7l1-1.5M16 7l-1-1.5" />
    </svg>
  ),
  average: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M16 15.5s-1.5-1.5-4-1.5-4 1.5-4 1.5" />
      <circle cx="9" cy="9.5" r="1" fill="currentColor" />
      <circle cx="15" cy="9.5" r="1" fill="currentColor" />
    </svg>
  ),
  normal: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 15h8" />
      <circle cx="9" cy="9.5" r="1" fill="currentColor" />
      <circle cx="15" cy="9.5" r="1" fill="currentColor" />
    </svg>
  ),
  nice: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 13.5s1.5 1.5 4 1.5 4-1.5 4-1.5" />
      <circle cx="9" cy="9.5" r="1" fill="currentColor" />
      <circle cx="15" cy="9.5" r="1" fill="currentColor" />
    </svg>
  ),
  good: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12s2 3 4 3 4-3 4-3" />
      <circle cx="9" cy="9.5" r="1" fill="currentColor" />
      <circle cx="15" cy="9.5" r="1" fill="currentColor" />
    </svg>
  ),
};

interface CommentsProps {
  postSlug: string;
}

const RATING_OPTIONS = [
  { value: 1, label: 'Bad', icon: RatingIcons.bad, color: 'bg-red-500', iconColor: 'text-red-500' },
  { value: 2, label: 'Average', icon: RatingIcons.average, color: 'bg-orange-500', iconColor: 'text-orange-500' },
  { value: 3, label: 'Normal', icon: RatingIcons.normal, color: 'bg-amber-400', iconColor: 'text-amber-500' },
  { value: 4, label: 'Nice', icon: RatingIcons.nice, color: 'bg-sky-500', iconColor: 'text-sky-500' },
  { value: 5, label: 'Good', icon: RatingIcons.good, color: 'bg-green-500', iconColor: 'text-green-500' },
];

export default function Comments({ postSlug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
    usefulnessRating: 5,
  });

  const loadComments = async () => {
    try {
      setLoading(true);
      setFetchError(null);
      if (isApiConfigured()) {
        const fetchedComments = await fetchCommentsFromApi(postSlug);
        setComments(Array.isArray(fetchedComments) ? fetchedComments : []);
      } else {
        const fetchedComments = await fetchComments(postSlug);
        setComments(Array.isArray(fetchedComments) ? fetchedComments : []);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      setFetchError(error instanceof Error ? error.message : 'Failed to load comments');
      setComments([]);
      if (!isApiConfigured()) {
        try {
          const fallback = await fetchComments(postSlug);
          setComments(Array.isArray(fallback) ? fallback : []);
          setFetchError(null);
        } catch {
          // keep error and empty list
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postSlug]);

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isApiConfigured()) {
      try {
        setSubmitStatus('sending');
        await postCommentToApi(postSlug, {
          author: formData.name,
          comment: formData.comment,
          rating: formData.usefulnessRating,
          avatar: '',
        });
        setFormData({ name: '', email: '', comment: '', usefulnessRating: 5 });
        setSubmitStatus('success');
        const fetchedComments = await fetchCommentsFromApi(postSlug);
        setComments(fetchedComments);
      } catch (err) {
        console.error('Failed to post comment:', err);
        setSubmitStatus('error');
      }
    } else {
      console.log('Comment submitted (demo):', formData);
      setFormData({ name: '', email: '', comment: '', usefulnessRating: 5 });
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className=" pl-4 sm:pl-6">
      {/* Comments header with black vertical bar */}
      <h2 className="section-heading-with-bar text-2xl font-bold text-black mb-6">
        <span className="section-heading-bar" aria-hidden />
        Comments
      </h2>

      {/* Loading skeleton */}
      {loading ? (
        <div className="space-y-0">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse flex gap-4 py-6 border-b border-gray-200 first:pt-0">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        /* No data or fallback after error */
        <div className="py-8 mb-8 text-center border-b border-gray-200">
          <p className="text-gray-600 mb-2">
            {fetchError ? 'Couldn’t load comments.' : 'No Comments Found.'}
          </p>
          {fetchError && (
            <p className="text-sm text-gray-500 mb-3">{fetchError}</p>
          )}
          {fetchError && (
            <button
              type="button"
              onClick={loadComments}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Retry
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-0 mb-8">
          {comments.map((comment, index) => (
            <div
              key={comment.id}
              className={`flex gap-4 py-6 ${index > 0 ? 'border-t border-gray-200' : ''}`}
            >
              <div className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden bg-gray-100">
                <Image
                  src={COMMENT_AVATAR_STATIC}
                  alt={comment.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-black">{comment.author}</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  {renderStars(comment.rating)}
                  <span className="text-sm text-gray-600">({comment.rating}.0)</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{comment.date}</p>
                <p className="text-gray-700 mt-2 leading-relaxed">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add A Comment - header with black vertical bar */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="section-heading-with-bar text-2xl font-bold text-black mb-6">
          <span className="section-heading-bar" aria-hidden />
          Add A Comment
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className=" space-y-4">
              <div>
                <label htmlFor="comment-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  id="comment-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setSubmitStatus('idle'); }}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="comment-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="comment-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setSubmitStatus('idle'); }}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400"
                  required
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="comment-text" className="block text-sm font-medium text-gray-700 mb-1">
                Comment
              </label>
              <textarea
                id="comment-text"
                placeholder="Search Anything..."
                value={formData.comment}
                onChange={(e) => { setFormData({ ...formData, comment: e.target.value }); setSubmitStatus('idle'); }}
                rows={5}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 resize-y"
                required
              />
            </div>
          </div>

          {/* Rate usefulness: text left, emojis + Send right */}
          <div className="bg-gray-100 rounded-lg px-4 py-4 sm:px-5 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <span className="text-sm font-medium text-black shrink-0">
                Rate The Usefulness Of The Article
              </span>
              <div className="flex items-center gap-1.5 flex-wrap sm:justify-end">
                {RATING_OPTIONS.map((opt) => {
                  const isSelected = formData.usefulnessRating === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, usefulnessRating: opt.value })}
                      className={`
                        inline-flex items-center justify-center gap-1.5 font-medium
                        transition-all duration-200 ease-out
                        ${isSelected
                          ? `rounded-full px-4 py-2.5 text-base min-w-[100px] ${opt.color} shadow-md text-white`
                          : `w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-gray-50 ${opt.iconColor} [&_svg]:shrink-0`
                        }
                      `}
                      title={opt.label}
                    >
                      <span className="flex items-center justify-center [&_svg]:shrink-0">{opt.icon}</span>
                      {isSelected && <span>{opt.label}</span>}
                    </button>
                  );
                })}
                <button
                  type="submit"
                  disabled={submitStatus === 'sending'}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  {submitStatus === 'sending' ? 'Sending…' : 'Send'}
                </button>
              </div>
            </div>
          </div>
          {submitStatus === 'success' && (
            <p className="mt-3 text-sm text-green-600">Comment posted successfully.</p>
          )}
          {submitStatus === 'error' && (
            <p className="mt-3 text-sm text-red-600">Failed to post comment. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}
