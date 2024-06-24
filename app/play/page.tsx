'use client'

import React from 'react';
import { useSearchParams } from 'next/navigation';
import YouTubePlainPlayer from '@/components/YouTubePlainPlayer';

const PlayPage: React.FC = () => {
    const searchParams = useSearchParams();
    const videoId = searchParams.get('videoId');

    return (
        <div className="flex flex-col items-center justify-start min-h-screen pt-10 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
            <div className="w-full max-w-3xl bg-card text-card-foreground p-4 rounded-lg">
                {videoId ? (
                    <YouTubePlainPlayer videoId={videoId} autoplay={true} />
                ) : (
                    <p>No video selected</p>
                )}
            </div>
        </div>
    );
};

export default PlayPage;