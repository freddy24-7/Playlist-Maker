// YouTubeContainer.tsx
'use client';

import React from 'react';
import YouTubePlainPlayer from './YouTubePlainPlayer';

interface YouTubeContainerProps {
    videoId?: string;
    autoplay?: boolean;
}

const YouTubeContainer: React.FC<YouTubeContainerProps> = ({ videoId, autoplay }) => {
    return (
        <div className="relative w-full h-0 pb-[56.25%] sm:pb-[75%] md:pb-[50%] lg:pb-[40%]">
            <YouTubePlainPlayer videoId={videoId} autoplay={autoplay} className="absolute top-0 left-0 w-full h-full" />
        </div>
    );
};

export default YouTubeContainer;
