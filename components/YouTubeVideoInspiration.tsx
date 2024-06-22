'use client';

<<<<<<< HEAD
import React, { useEffect } from 'react';
import YouTubeLazyPlayer from '@/components/YouTubeLazyPlayer'; // Import the lazy loading player
import { useVideo } from '@/context/VideoContext';
=======
import React, { useEffect, useRef } from 'react';
import YouTubePlainPlayer, { YouTubePlainPlayerRef } from './YouTubePlainPlayer';
>>>>>>> origin/03-Refactoring

interface YouTubeVideoInspirationProps {
    selectedVideoId: string;
}

const YouTubeVideoInspiration: React.FC<YouTubeVideoInspirationProps> = ({ selectedVideoId }) => {
<<<<<<< HEAD
    const { videoId, setVideoId } = useVideo();
=======
    const [videoId, setVideoId] = React.useState<string>('');
    const playerRef = useRef<YouTubePlainPlayerRef>(null);
>>>>>>> origin/03-Refactoring

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
