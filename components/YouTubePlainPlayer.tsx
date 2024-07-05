import React, { useImperativeHandle, useRef, useState, useEffect } from 'react';
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';
import Draggable from 'react-draggable';

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
    const [mute, setMute] = useState(0);

    // Determine the mute value based on screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setMute(1); // Mute for small and medium screens (<= 768px)
            } else {
                setMute(0); // Unmute for large screens
            }
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize); // Add event listener for screen resize

        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup on unmount
        };
    }, []);

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
            mute: mute, // Conditionally set mute value
        },
    };

    return (
        <Draggable>
            <div className="draggable-container">
                <YouTube
                    videoId={videoId}
                    opts={opts}
                    onReady={onReady}
                    onEnd={onEnd}
                    className={className}
                />
            </div>
        </Draggable>
    );
};

export default React.forwardRef(YouTubePlainPlayer);
