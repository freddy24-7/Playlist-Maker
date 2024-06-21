import React, { useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import Spinner from './Spinner';

interface YouTubeLazyPlayerProps {
    videoId: string;
    autoplay?: boolean;
}

const YouTubeLazyPlayer: React.FC<YouTubeLazyPlayerProps> = ({ videoId, autoplay = false }) => {
    const [showPlayer, setShowPlayer] = useState(false);
    const [loading, setLoading] = useState(false);

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        setLoading(false);
        if (autoplay) {
            event.target.playVideo();
        }
    };

    const opts: YouTubeProps['opts'] = {
        width: '100%', // Default width to 100% to fill container
        playerVars: {
            autoplay: autoplay ? 1 : 0,  // Convert boolean to 0 or 1 for YouTube API
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
                <Spinner loading={true} />
            )}
            {!showPlayer ? (
                <div className="video-facade" onClick={handlePlayClick}>
                    <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt="Video thumbnail" />
                    <button className="play-button">Play</button>
                </div>
            ) : (
                <div className="aspect-w-16 aspect-h-9"> {/* Maintain aspect ratio 16:9 */}
                    <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} className="absolute top-0 left-0 w-full h-full" />
                </div>
            )}
        </div>
    );
};

export default YouTubeLazyPlayer;
