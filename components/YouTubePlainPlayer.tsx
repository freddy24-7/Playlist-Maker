import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect, useContext } from 'react';
import YouTube, { YouTubePlayer, YouTubeProps } from 'react-youtube';
import { usePlayback } from "@/contexts/PlaybackContext"; // Ensure the path to your context is correct

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
    const { isPlaying } = usePlayback();  // Assuming usePlayback provides 'isPlaying' state
    const playerRef = useRef<YouTubePlayer | null>(null);
    const [isReady, setIsReady] = useState(false);
    const { startPlaying, stopPlaying } = usePlayback();

    useEffect(() => {
        if (videoId) {
            startPlaying();
        }
    }, [videoId]);

    useEffect(() => {
        console.log("YouTube Player Ready State:", isReady);
        console.log("YouTube Player Instance:", playerRef.current);

        if (isReady && playerRef.current) {
            if (!isPlaying) {
                console.log("Pausing video...");
                try {
                    playerRef.current.pauseVideo();
                } catch (error) {
                    console.error("Error pausing video:", error);
                }
            } else {
                try {
                    console.log("Cueing and playing video...");
                    playerRef.current.cueVideoById({ videoId: videoId });
                    if (autoplay) {
                        playerRef.current.playVideo();
                    }
                } catch (error) {
                    console.error("Error cueing or playing video:", error);
                }
            }
        }
    }, [videoId, autoplay, isReady, isPlaying]);


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

    // Inside YouTubePlainPlayer component
    useEffect(() => {
        console.log("Playback state change detected. isPlaying:", isPlaying);
        if (!isPlaying && playerRef.current) {
            playerRef.current.pauseVideo();
        }
    }, [isPlaying]); // Listen specifically to isPlaying changes


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
