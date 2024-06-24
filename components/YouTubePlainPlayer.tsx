import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import { YouTubeProps, YouTubePlayer } from 'react-youtube';
import YouTubeContainer from "@/components/YouTubeContainer";

interface YouTubePlainPlayerProps {
    videoId?: string;
    autoplay?: boolean;
    className?: string;
}

export interface YouTubePlainPlayerRef {
    playVideo: () => void;
    pauseVideo: () => void;
}

// eslint-disable-next-line react/display-name
const YouTubePlainPlayer = forwardRef<YouTubePlainPlayerRef, YouTubePlainPlayerProps>((props, ref) => {
    const { videoId, autoplay} = props;
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
        <YouTubeContainer videoId={videoId} opts={opts} onReady={onReady} loading={loading} />
    );
});

export default YouTubePlainPlayer;