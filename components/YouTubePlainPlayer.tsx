import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';
import Spinner from './Spinner';

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

<<<<<<< HEAD
    const opts: YouTubeProps['opts'] = {
        width: '100%', // Default width to 100% to fill container
=======
    useEffect(() => {
        if (isReady && autoplay && playerRef.current) {
            // Using a timeout to ensure the player is fully ready
            setTimeout(() => {
                playerRef.current?.playVideo();
            }, 1000);
        }
    }, [isReady, autoplay]);

    const opts: YouTubeProps['opts'] = {
>>>>>>> origin/03-Refactoring
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
<<<<<<< HEAD
        <div className="relative">
            {loading ? (
=======
        <div className={`relative ${className}`}>
            {loading && (
>>>>>>> origin/03-Refactoring
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50">
                    <Spinner loading={true} />
                </div>
            ) : (
                <div className="aspect-w-16 aspect-h-9"> {/* Maintain aspect ratio 16:9 */}
                    <YouTube videoId={videoId} opts={opts} onReady={onReady} className="absolute top-0 left-0 w-full h-full" />
                </div>
            )}
<<<<<<< HEAD
=======
            <YouTube videoId={videoId} opts={opts} onReady={onReady} className="w-full h-full" />
>>>>>>> origin/03-Refactoring
        </div>
    );
});

YouTubePlainPlayer.displayName = 'YouTubePlainPlayer';

export default YouTubePlainPlayer;
