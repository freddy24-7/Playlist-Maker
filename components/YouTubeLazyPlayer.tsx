import React, { useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import Spinner from './Spinner';
import Image from 'next/image'


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
                    <Image
                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                        alt="Video thumbnail"
                        width={500}
                        height={500}
                    />
                    <button className="play-button">Play</button>
                </div>
            ) : (
                <div>
                    <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
                </div>
            )}
        </div>
    );
};

export default YouTubeLazyPlayer;