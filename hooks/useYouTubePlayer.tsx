import { useRef, useState, useEffect, useCallback } from 'react';
import { YouTubePlayer } from 'react-youtube';

interface UseYouTubePlayerProps {
    videoId: string;
    autoplay: boolean;
    onVideoEnd?: () => void;
}

interface UseYouTubePlayerReturn {
    playerRef: React.MutableRefObject<YouTubePlayer | null>;
    loading: boolean;
    onReady: (event: YT.PlayerEvent) => void;
    opts: YT.PlayerOptions;
}

const useYouTubePlayer = ({ videoId, autoplay, onVideoEnd }: UseYouTubePlayerProps): UseYouTubePlayerReturn => {
    const playerRef = useRef<YouTubePlayer | null>(null);
    const [loading, setLoading] = useState(true);

    const onReady: (event: YT.PlayerEvent) => void = (event) => {
        playerRef.current = event.target as YouTubePlayer;
        setLoading(false);
        if (autoplay) {
            event.target.playVideo();
        }
    };

    const onStateChange: (event: YT.OnStateChangeEvent) => void = useCallback((event) => {
        if (event.data === YT.PlayerState.ENDED && onVideoEnd) {
            onVideoEnd();
        }
    }, [onVideoEnd]);

    const opts: YT.PlayerOptions = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: autoplay ? 1 : 0,
            controls: 1,
            enablejsapi: 1,
            modestbranding: 1,
        },
        events: {
            onReady,
            onStateChange,
        },
    };

    useEffect(() => {
        setLoading(true);
        if (playerRef.current) {
            playerRef.current.loadVideoById({ videoId });
        }
    }, [videoId]);

    return { playerRef, loading, onReady, opts };
};

export default useYouTubePlayer;
