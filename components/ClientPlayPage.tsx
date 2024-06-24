'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import YouTubePlainPlayer from '@/components/YouTubePlainPlayer';

const ClientPlayPage: React.FC = () => {
    const searchParams = useSearchParams();
    const videoId = searchParams.get('videoId');

    return (
        <>
            {videoId ? (
                <YouTubePlainPlayer videoId={videoId} autoplay={true} />
            ) : (
                <p>No video selected</p>
            )}
        </>
    );
};

export default ClientPlayPage;
