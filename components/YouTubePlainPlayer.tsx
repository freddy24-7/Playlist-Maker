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
    const playerRef = useRef<YouTubePlayer | null>(null);
    const videoId = props.videoId || contextVideoId;

    useImperativeHandle(ref, () => ({
        playVideo: () => {
            playerRef.current?.playVideo();
        },
        pauseVideo: () => {
            playerRef.current?.pauseVideo();
        },
    }));

    const onReady: YouTubeProps['onReady'] = (event) => {
        playerRef.current = event.target;
        setLoading(false);
        event.target.playVideo();  // Ensure video plays as soon as it's ready
    };

    const opts: YouTubeProps['opts'] = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,  // Ensure autoplay is set
            controls: 1,  // Show controls if needed
            enablejsapi: 1,
            modestbranding: 1
        },
    };

    useEffect(() => {
        setLoading(false);
    }, [videoId]);

    return (
        <div className="relative">
            {loading ? (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50">
                    <Spinner loading={true} />
                </div>
            ) : (
                <YouTube videoId={videoId} opts={opts} onReady={onReady} />
            )}
        </div>
    );
});

YouTubePlainPlayer.displayName = 'YouTubePlainPlayer';

export default YouTubePlainPlayer;
