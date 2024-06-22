'use client';

import React, { useEffect, useRef } from 'react';
import { YouTubePlainPlayerRef } from '@/components/YouTubePlainPlayer';
import YouTubePlainPlayerFacade from '@/components/YouTubePlainPlayerFacade';

interface YouTubeVideoInspirationProps {
    selectedVideoId: string;
}

const YouTubeVideoInspiration: React.FC<YouTubeVideoInspirationProps> = ({ selectedVideoId }) => {
    const [videoId, setVideoId] = React.useState<string>('');
    const playerRef = useRef<YouTubePlainPlayerRef>(null);

    useEffect(() => {
        if (selectedVideoId) {
            setVideoId(selectedVideoId);
        }
    }, [selectedVideoId, setVideoId]);

    return (
        <div className="mt-4 order-2 md:order-none">
            {videoId ? (
                <YouTubePlainPlayerFacade ref={playerRef} videoId={videoId} autoplay={false}/>
                ) : (
                <p>No video selected</p>
            )}
        </div>
    );
};

export default YouTubeVideoInspiration;