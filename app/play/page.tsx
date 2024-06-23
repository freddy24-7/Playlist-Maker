'use client';

import React from 'react';
import { useVideo } from '@/context/VideoContext';
import YouTubePlainPlayer from '@/components/YouTubePlainPlayer';

const PlayPage: React.FC = () => {
    const { videoId } = useVideo();
    console.log(videoId);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen pt-10 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
            <div className="w-full max-w-3xl bg-card text-card-foreground p-4 rounded-lg">
                <YouTubePlainPlayer videoId={videoId} autoplay={true} />
            </div>
        </div>
    );
};

export default PlayPage;
