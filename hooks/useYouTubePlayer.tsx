import { useRef, useState, useCallback, useEffect } from 'react';
import type { YT } from 'youtube';

interface UseYouTubePlayerProps {
    videoId: string;
    autoplay: boolean;
    onVideoEnd?: () => void;
}

const useYouTubePlayer = ({ videoId, autoplay, onVideoEnd }: UseYouTubePlayerProps) => {
    const playerRef = useRef<YT.Player | null>(null);
    const [loading, setLoading] = useState(true);

    const onPlayerReady = useCallback((event: YT.PlayerEvent) => {
        setLoading(false);
        if (autoplay) {
            event.target.playVideo();
        }
    }, [autoplay]);

    const onStateChange = useCallback((event: YT.OnStateChangeEvent) => {
        if (event.data === YT.PlayerState.ENDED && onVideoEnd) {
            onVideoEnd();
        }
    }, [onVideoEnd]);

    useEffect(() => {
        const createPlayer = () => {
            if (!window.YT) {  // Make sure the YouTube IFrame API is loaded
                const tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                window.onYouTubeIframeAPIReady = () => {
                    playerRef.current = new YT.Player('player', {
                        videoId: videoId,
                        events: {
                            onReady: onPlayerReady,
                            onStateChange: onStateChange
                        },
                        playerVars: {
                            autoplay: autoplay ? 1 : 0,
                            controls: 1,
                            enablejsapi: 1,
                            modestbranding: 1
                        }
                    });
                };
            }
        };

        createPlayer();

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, [videoId, autoplay, onPlayerReady, onStateChange]);

    return { playerRef, loading };
};

export default useYouTubePlayer;
