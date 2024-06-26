'use client';

import React, { useEffect } from 'react';
import YouTubeLazyPlayer from '@/components/search/YouTubeLazyPlayer'; // Import the lazy loading player

interface YouTubeVideoInspirationProps {
    selectedVideoId: string;
}

const YouTubeVideoInspiration: React.FC<YouTubeVideoInspirationProps> = ({ selectedVideoId }) => {
    const [videoId, setVideoId] = React.useState<string>('');

    useEffect(() => {
        if (selectedVideoId) {
            setVideoId(selectedVideoId);
        }
    }, [selectedVideoId, setVideoId]);

    return (
        <div className="mt-4 order-2 md:order-none">
            {videoId ? (
                <YouTubeLazyPlayer videoId={videoId} autoplay={true} />
            ) : (
                <p>No video selected</p>
            )}
        </div>
    );
};

export default YouTubeVideoInspiration;