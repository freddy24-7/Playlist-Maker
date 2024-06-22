import React, { forwardRef, useImperativeHandle } from 'react';
import useYouTubePlayer from '@/hooks/useYouTubePlayer';
import YouTubeContainer from '@/components/YouTubeContainer';
import { useVideo } from '@/context/VideoContext';

interface YouTubePlainPlayerProps {
    videoId?: string;
    autoplay?: boolean;
}

export interface YouTubePlainPlayerRef {
    playVideo: () => void;
    pauseVideo: () => void;
}

// eslint-disable-next-line react/display-name
const YouTubePlainPlayer = forwardRef<YouTubePlainPlayerRef, YouTubePlainPlayerProps>((props, ref) => {
    const { videoId: contextVideoId } = useVideo();
    const videoId = props.videoId || contextVideoId;
    const { playerRef, loading, onReady, opts } = useYouTubePlayer({ videoId, autoplay: props.autoplay ?? false });

    useImperativeHandle(ref, () => ({
        playVideo: () => {
            playerRef.current?.playVideo();
        },
        pauseVideo: () => {
            playerRef.current?.pauseVideo();
        },
    }));

    return (
        <YouTubeContainer videoId={videoId} opts={opts} onReady={onReady} loading={loading} />
    );
});

export default YouTubePlainPlayer;
