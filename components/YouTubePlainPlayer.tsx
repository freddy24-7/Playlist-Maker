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
    const [isMuted, setIsMuted] = useState(true); // New state to track mute status

    useEffect(() => {
        const opts: YouTubeProps['opts'] = {
            playerVars: {
                autoplay: autoplay ? 1 : 0,
                controls: 1,
                rel: 0,
                enablejsapi: 1,
                modestbranding: 1,
                mute: 1, // Start the video muted
            },
        };

        if (isReady && playerRef.current) {
            try {
                playerRef.current.cueVideoById({ videoId });
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

    const onStateChange: YouTubeProps['onStateChange'] = (event) => {
        // Unmute the video once it starts playing
        if (event.data === YouTube.PlayerState.PLAYING && isMuted && playerRef.current) {
            playerRef.current.unMute();
            setIsMuted(false);
        }
    };

    const opts: YouTubeProps['opts'] = {
        playerVars: {
            autoplay: autoplay ? 1 : 0,
            controls: 1,
            rel: 0,
            enablejsapi: 1,
            modestbranding: 1,
            mute: 1, // Start the video muted
        },
    };

    return (
        <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onReady}
            onEnd={onEnd}
            onStateChange={onStateChange} // Add onStateChange handler
            className={props.className}
        />
    );
});

export default YouTubePlainPlayer;
