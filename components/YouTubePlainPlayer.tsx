'use client';
import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';
import Spinner from '@/components/Spinner';

interface YouTubePlainPlayerProps {
    videoId?: string;
    autoplay?: boolean;
    className?: string;
}

export interface YouTubePlainPlayerRef {
    playVideo: () => void;
    pauseVideo: () => void;
}

const YouTubePlainPlayer = forwardRef<YouTubePlainPlayerRef, YouTubePlainPlayerProps>((props, ref) => {
    const { videoId, autoplay, className } = props;
    const [loading, setLoading] = useState<boolean>(true);
    const [isReady, setIsReady] = useState<boolean>(false);
    const playerRef = useRef<YouTubePlayer | null>(null);

    useImperativeHandle(ref, () => ({
        playVideo: () => {
            if (playerRef.current) {
                playerRef.current.playVideo();
            }
        },
        pauseVideo: () => {
            if (playerRef.current) {
                playerRef.current.pauseVideo();
            }
        },
    }));

    const onReady: YouTubeProps['onReady'] = (event) => {
        playerRef.current = event.target;
        setLoading(false);
        setIsReady(true);
    };

    useEffect(() => {
        if (isReady && autoplay && playerRef.current) {
            // Using a timeout to ensure the player is fully ready
            setTimeout(() => {
                playerRef.current?.playVideo();
            }, 1000);
        }
    }, [isReady, autoplay]);

    const opts: YouTubeProps['opts'] = {
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <div className={`relative ${className}`}>
            {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50">
                    <Spinner loading={loading} />
                </div>
            )}
            <div className="youtube-container">
                <YouTube videoId={videoId} opts={opts} onReady={onReady} className="youtube-player" />
            </div>
        </div>
    );
});

YouTubePlainPlayer.displayName = 'YouTubePlainPlayer';

export default YouTubePlainPlayer;
