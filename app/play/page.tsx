'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import YouTubeContainer from '@/components/YouTubeContainer';

const PlayPage: React.FC = () => {
    const searchParams = useSearchParams();
    const videoId = searchParams.get('videoId');

    return (
        <div className="flex flex-col items-center justify-start min-h-screen pt-10 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-primary-foreground">Enjoy...!</h1>
            <div className="w-full max-w-3xl bg-card text-card-foreground p-4 sm:p-6 md:p-8 rounded-lg">
                {videoId ? (
                    <YouTubeContainer videoId={videoId} autoplay={true} />
                ) : (
                    <p>No video selected</p>
                )}
            </div>
        </div>
    );
};

export default PlayPage;
