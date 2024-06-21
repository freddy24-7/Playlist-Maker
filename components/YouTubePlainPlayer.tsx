'use client';

import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';
import { useVideo } from '@/context/VideoContext';
import Spinner from './Spinner';

interface YouTubePlainPlayerProps {
    videoId?: string;
    autoplay?: boolean;
}

export interface YouTubePlainPlayerRef {
    playVideo: () => void;
    pauseVideo: () => void;
}

const YouTubePlainPlayer = forwardRef<YouTubePlainPlayerRef, YouTubePlainPlayerProps>((props, ref) => {
    const { videoId: contextVideoId } = useVideo();
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

    const videoId = props.videoId || contextVideoId;

    const onReady: YouTubeProps['onReady'] = (event) => {
        playerRef.current = event.target;
        setLoading(false);
        setIsReady(true);
    };

    useEffect(() => {
        if (isReady && props.autoplay && playerRef.current) {
            // Using a timeout to ensure the player is fully ready
            setTimeout(() => {
                playerRef.current?.playVideo();
            }, 1000);
        }
    }, [isReady, props.autoplay]);

    const opts: YouTubeProps['opts'] = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <div className="relative">
            {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50">
                    <Spinner loading={loading} />
                </div>
            )}
            <YouTube videoId={videoId} opts={opts} onReady={onReady} />
        </div>
    );
});

YouTubePlainPlayer.displayName = 'YouTubePlainPlayer';

export default YouTubePlainPlayer;
