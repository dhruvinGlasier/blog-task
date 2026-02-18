'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { BlogPost } from '@/lib/data';
import { blogPosts } from '@/lib/data';

interface AboutAuthorProps {
  post: BlogPost;
}

export default function AboutAuthor({ post }: AboutAuthorProps) {
  const sliderRef = useRef<Slider>(null);

  // Get all unique authors from posts (order preserved)
  const authorsMap = new Map<string, BlogPost['author']>();
  blogPosts.forEach((p) => {
    if (!authorsMap.has(p.author.name)) {
      authorsMap.set(p.author.name, p.author);
    }
  });
  const authors = Array.from(authorsMap.values());

  // Find current author index for initial slide
  const currentAuthorIndex = authors.findIndex((a) => a.name === post.author.name);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    initialSlide: currentAuthorIndex >= 0 ? currentAuthorIndex : 0,
  };

  const goToPrevious = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  // Labels under buttons: current post's previous/next article titles (match design)
  const previousPostTitle = post.previousPost?.title ?? null;
  const nextPostTitle = post.nextPost?.title ?? null;

  return (
    <div className="my-8 md:my-10">
      {/* Light gray container with dotted blue left border */}
      <div className=" border-t border-gray-200 rounded-lg py-8 md:py-8 px-6 md:px-10">
        <Slider ref={sliderRef} {...settings}>
          {authors.map((author) => (
            <div key={author.name} className="outline-none">
              {/* Centered heading */}
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center mb-6">
                About {author.name}
              </h2>

              <div className="flex flex-col items-center">
                {/* Circular profile picture with light gray border */}
                <div className="relative w-28 h-28 md:w-32 md:h-32 mb-6 flex-shrink-0 rounded-full overflow-hidden border-[6px] border-gray-200 bg-gray-200">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Biography text - italic, left-aligned, dark gray */}
                <p className="text-gray-700 text-left w-full leading-relaxed text-sm md:text-base italic px-2">
                  {author.bio || 'No bio available for this author.'}
                </p>

                {/* Slider navigation: Previous and Next buttons */}
                <div className="border-t border-gray-200 flex items-end justify-between w-full gap-4 mt-10 pt-5 flex-wrap">
                  {/* Previous */}
                  <div className="flex-1 min-w-0 flex flex-col items-start">
                    <button
                      type="button"
                      onClick={goToPrevious}
                      className="inline-flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm"
                    >
                      <span className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </span>
                      Previous
                    </button>
                    {previousPostTitle && (
                      <p className="text-sm text-gray-600 mt-2 text-left max-w-[220px]">
                        {previousPostTitle}
                      </p>
                    )}
                  </div>

                  {/* Next */}
                  <div className="flex-1 min-w-0 flex flex-col items-end">
                    <button
                      type="button"
                      onClick={goToNext}
                      className="inline-flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium text-sm ml-auto"
                    >
                      Next
                      <span className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </button>
                    {nextPostTitle && (
                      <p className="text-sm text-gray-600 mt-2 text-right max-w-[220px]">
                        {nextPostTitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
