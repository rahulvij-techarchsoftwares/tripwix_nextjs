'use client';

import 'videojs-youtube';
import 'video.js/dist/video-js.css';
import './styles.css';

import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';

import { Title, TitleVariants } from '~/components/Title';

import { VideoPlayerProps } from './types';

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  controls = true,
  autoplay = false,
  loop = false,
  title,
  extraClasses = 'mt-16 mb-10',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const isYouTubeUrl = (url: string) => {
    return /youtube\.com|youtu\.be/.test(url);
  };

  useEffect(() => {
    setIsMounted(true); // Set mounted flag when the component is mounted

    if (isMounted && videoRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls,
        autoplay: { autoplay },
        loop: { loop },
        fluid: true,
        poster: poster,
        muted: true,
        techOrder: ['youtube', 'html5'], // Use YouTube as a tech option if the source is a YouTube URL
        sources: [
          {
            src: src,
            type: isYouTubeUrl(src) ? 'video/youtube' : 'video/mp4', // Set YouTube type if applicable
          },
        ],
        youtube: {
          iv_load_policy: 3,
          modestbranding: 1,
        },
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose(); // Cleanup on unmount
      }
    };
  }, [src, controls, autoplay, loop, poster, isMounted]);

  return (
    <div className={`${extraClasses}`}>
      {title ? (
        <Title extraClasses={'mb-6'} titleVariant={TitleVariants.H4}>
          {title}
        </Title>
      ) : null}
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-default-skin" />
      </div>
    </div>
  );
};
