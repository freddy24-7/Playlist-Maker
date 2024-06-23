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
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,  // This ensures video plays immediately when loaded
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
                <div >
                    <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
                </div>
            )}
        </div>
    );
};

export default YouTubeLazyPlayer;