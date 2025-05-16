import React from 'react';

import { useTruncatedElement } from '~/lib/hooks/useTruncatedElement';

export const TestimonialCard = ({ content }: { content: string }) => {
  const ref = React.useRef(null);
  const { isTruncated, isReadingMore, setIsReadingMore } = useTruncatedElement({
    ref,
  });
  return (
    <div className="min-h-32 md:min-h-36">
      <p
        ref={ref}
        className={`break-words mt-4 pb-0 mb-4 text-base md:text-lg ${!isReadingMore && 'line-clamp-3'}`}
      >
        {content}
      </p>
      <div className="text-xs mt-6 mb-3">
        {isTruncated && !isReadingMore && (
          <button
            className={
              'hover:text-tertiary text-sm underline transition-colors'
            }
            onClick={() => setIsReadingMore(true)}
          >
            Read More
          </button>
        )}
      </div>
    </div>
  );
};
