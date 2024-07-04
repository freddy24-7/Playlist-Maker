import React, { useImperativeHandle, useRef, useState } from 'react';
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
    const { videoId, autoplay, onVideoEnd, className } = props;
    const playerRef = useRef<YouTubePlayer | null>(null);
    const [, setIsReady] = useState(false);

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

    const opts: YouTubeProps['opts'] = {
        playerVars: {
            autoplay: autoplay ? 1 : 0,
            controls: 1,
            rel: 0,
            enablejsapi: 1,
            modestbranding: 1,
            mute: 1, // 1 for mute
        },
    };

    return (
        <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onReady}
            onEnd={onEnd}
            className={className}
        />
    );
};

export default React.forwardRef(YouTubePlainPlayer);
