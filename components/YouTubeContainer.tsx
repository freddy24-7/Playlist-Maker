import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import Spinner from './ui/Spinner';

interface YouTubeContainerProps {
    videoId: string;
    opts: YouTubeProps['opts'];
    onReady: YouTubeProps['onReady'];
    loading: boolean;
}

const YouTubeContainer: React.FC<YouTubeContainerProps> = ({ videoId, opts, onReady, loading }) => {
    return (
        <div className="relative">
            {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50">
                    <Spinner loading={true} />
                </div>
            )}
            <div className="youtube-container">
                <YouTube videoId={videoId} opts={opts} onReady={onReady} className="youtube-player" />
            </div>
        </div>
    );
};

export default YouTubeContainer;
