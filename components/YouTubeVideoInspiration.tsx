'use client';

import React, { useEffect, useRef } from 'react';
import YouTubePlainPlayer, { YouTubePlainPlayerRef } from './YouTubePlainPlayer';
import { useVideo } from '@/context/VideoContext';

interface YouTubeVideoInspirationProps {
    selectedVideoId: string;
}

const YouTubeVideoInspiration: React.FC<YouTubeVideoInspirationProps> = ({ selectedVideoId }) => {
    const { videoId, setVideoId } = useVideo();
    const playerRef = useRef<YouTubePlainPlayerRef>(null);

    useEffect(() => {
        if (selectedVideoId) {
            setVideoId(selectedVideoId);
        }
    }, [selectedVideoId, setVideoId]);

    return (
        <div className="mt-4 order-2 md:order-none">
            {videoId ? (
                <YouTubePlainPlayer ref={playerRef} videoId={videoId} />
            ) : (
                <p>No video selected</p>
            )}
        </div>
    );
};

export default YouTubeVideoInspiration;
