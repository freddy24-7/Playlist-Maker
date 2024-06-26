import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';

interface YouTubePlainPlayerProps {
    videoId?: string;
    autoplay?: boolean;
    onVideoEnd?: () => void;
    className?: string;
}

export interface YouTubePlainPlayerRef {
    playVideo: () => void;
    pauseVideo: () => void;
}

// eslint-disable-next-line react/display-name
const YouTubePlainPlayer = forwardRef<YouTubePlainPlayerRef, YouTubePlainPlayerProps>((props, ref) => {
    const { videoId, autoplay, onVideoEnd } = props;
    const playerRef = useRef<YouTubePlayer | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (isReady && playerRef.current) {
            try {
                playerRef.current.cueVideoById({ videoId: videoId });
                if (autoplay) {
                    playerRef.current.playVideo();
                }
            } catch (error) {
                console.error("Error cueing or playing video:", error);
            }
        }
    }, [videoId, autoplay, isReady]);

    useImperativeHandle(ref, () => ({
        playVideo: () => {
            if (isReady && playerRef.current) {
                playerRef.current.playVideo();
            }
        },
        pauseVideo: () => {
            if (isReady && playerRef.current) {
                playerRef.current.pauseVideo();
            }
        },
    }));

    const onReady: YouTubeProps['onReady'] = (event) => {
        playerRef.current = event.target;
        setIsReady(true);
        if (autoplay && playerRef.current) {
            playerRef.current.playVideo();
        }
    };

    const onEnd: YouTubeProps['onEnd'] = () => {
        if (onVideoEnd) {
            onVideoEnd();
        }
    };

    const opts: YouTubeProps['opts'] = {
        playerVars: {
            autoplay: autoplay ? 1 : 0,
            controls: 1,
            rel: 0,
            enablejsapi: 1,
            modestbranding: 1,
        },
    };

    return (
        <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onReady}
            onEnd={onEnd}
            className={props.className}
        />
    );
});

export default YouTubePlainPlayer;
