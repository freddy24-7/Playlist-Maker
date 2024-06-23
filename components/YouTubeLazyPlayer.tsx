import React, { useState } from 'react';
import YouTubeContainer from './YouTubeContainer';
import Spinner from './Spinner';

interface YouTubeLazyPlayerProps {
    videoId: string;
    autoplay?: boolean;
}

const YouTubeLazyPlayer: React.FC<YouTubeLazyPlayerProps> = ({ videoId, autoplay = false }) => {
    const [showPlayer, setShowPlayer] = useState(false);
    const [loading, setLoading] = useState(false);

    const onPlayerReady = (event: any) => {
        setLoading(false);
        if (autoplay) {
            event.target.playVideo();
        }
    };

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: autoplay ? 1 : 0,  // Adjust autoplay based on prop
            controls: 1,
            enablejsapi: 1,
            modestbranding: 1
        },
    };

    const handlePlayClick = () => {
        setLoading(true);
        setShowPlayer(true);
    };

    return (
        <div className="relative">
            {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50">
                    <Spinner loading={true} />
                </div>
            )}
            {!showPlayer ? (
                <div className="video-facade" onClick={handlePlayClick}>
                    <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt="Video thumbnail" />
                    <button className="play-button">Play</button>
                </div>
            ) : (
                <div className="custom-container">
                    <YouTubeContainer videoId={videoId} opts={opts} onReady={onPlayerReady} loading={loading} />
                </div>
            )}
        </div>
    );
};

export default YouTubeLazyPlayer;
