import { useState, useRef, useEffect } from 'react';
import { YouTubePlayer, YouTubeProps } from 'react-youtube';

interface UseYouTubePlayerProps {
    videoId: string;
    autoplay: boolean;
}

interface UseYouTubePlayerReturn {
    playerRef: React.MutableRefObject<YouTubePlayer | null>;
    loading: boolean;
    onReady: YouTubeProps['onReady'];
    opts: YouTubeProps['opts'];
}

const useYouTubePlayer = ({ videoId, autoplay }: UseYouTubePlayerProps): UseYouTubePlayerReturn => {
    const [loading, setLoading] = useState(true);
    const playerRef = useRef<YouTubePlayer | null>(null);

    const onReady: YouTubeProps['onReady'] = (event) => {
        playerRef.current = event.target;
        setLoading(false);
        if (autoplay) {
            event.target.playVideo();
        }
    };

    const opts: YouTubeProps['opts'] = {
        width: '100%',
        height: '100%',
        playerVars: {
            autoplay: autoplay ? 1 : 0,
            controls: 1,
            enablejsapi: 1,
            modestbranding: 1,
        },
    };

    useEffect(() => {
        setLoading(true);
    }, [videoId]);

    return { playerRef, loading, onReady, opts };
};

export default useYouTubePlayer;
