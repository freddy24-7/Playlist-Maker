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

const YouTubePlainPlayer: React.ForwardRefRenderFunction<YouTubePlainPlayerRef, YouTubePlainPlayerProps> = (props, ref) => {
    const { videoId, autoplay, onVideoEnd } = props;
    const playerRef = useRef<YouTubePlayer | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
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
            if (playerRef.current) {
                playerRef.current.playVideo();
            }
        },
        pauseVideo: () => {
            if (playerRef.current) {
                playerRef.current.pauseVideo();
            }
        }
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
        // Handle state changes if necessary
    };

    const opts: YouTubeProps['opts'] = {
        playerVars: {
            autoplay: autoplay ? 1 : 0,
            controls: 1,
            rel: 0,
            enablejsapi: 1,
            modestbranding: 1,
            mute: 1, // Ensure video starts muted for autoplay
        },
    };

    return (
        <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onReady}
            onEnd={onEnd}
            onStateChange={onStateChange}
            className={props.className}
        />
    );
};

export default React.forwardRef(YouTubePlainPlayer);
