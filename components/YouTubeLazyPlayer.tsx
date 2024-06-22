import React, { useState } from 'react';
import useYouTubePlayer from '@/hooks/useYouTubePlayer';
import YouTubeContainer from './YouTubeContainer';

interface YouTubeLazyPlayerProps {
    videoId: string;
    autoplay?: boolean;
}

const YouTubeLazyPlayer: React.FC<YouTubeLazyPlayerProps> = ({ videoId, autoplay = false }) => {
    const [showPlayer, setShowPlayer] = useState(false);
    const { loading, onReady, opts } = useYouTubePlayer({ videoId, autoplay });

    const handlePlayClick = () => {
        setShowPlayer(true);
    };

    return (
        <div className="relative">
            {!showPlayer ? (
                <div className="video-facade" onClick={handlePlayClick}>
                    <img
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt="Video thumbnail"
                        className="thumbnail"
                    />
                    <button className="play-button">Play</button>
                </div>
            ) : (
                <YouTubeContainer videoId={videoId} opts={opts} onReady={onReady} loading={loading} />
            )}
        </div>
    );
};

export default YouTubeLazyPlayer;
