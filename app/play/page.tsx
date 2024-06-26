// import React, { Suspense } from 'react';
// import ClientPlayPage from '@/components/ClientPlayPage';
// import Spinner from '@/components/ui/Spinner';
//
// const PlayPage: React.FC = () => {
//     return (
//         <div className="flex flex-col items-center justify-start min-h-screen pt-10 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
//             <div className="w-full max-w-3xl bg-card text-card-foreground p-4 rounded-lg overflow-x-auto">
//                 <Suspense fallback={<Spinner loading={true} />}>
//                     <ClientPlayPage />
//                 </Suspense>
//             </div>
//         </div>
//     );
// };
//
// export default PlayPage;
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import YouTubePlainPlayer from '@/components/YouTubePlainPlayer';

interface Video {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        description: string;
        thumbnails: {
            default: {
                url: string;
            };
        };
    };
}

const ClientPlayPage: React.FC = () => {
    const router = useRouter();
    const [videos, setVideos] = useState<Video[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoplay, setAutoplay] = useState(false);

    useEffect(() => {
        const videoId = router.query.videoId as string; // Ensure videoId is treated as a string
        const playlist = localStorage.getItem('songList');

        if (playlist) {
            const songList: Video[] = JSON.parse(playlist); // Define the type on parsing
            setVideos(songList);
            const index = songList.findIndex(song => song.id.videoId === videoId);
            setCurrentIndex(index === -1 ? 0 : index);
            setAutoplay(true);
        }
    }, [router]);

    const onVideoEnd = () => {
        if (currentIndex < videos.length - 1) {
            setCurrentIndex(currentIndex + 1); // Move to next video in the list
        } else {
            console.log('Reached end of playlist.');
        }
    };

    return (
        <div>
            {videos.length > 0 && (
                <YouTubePlainPlayer
                    key={videos[currentIndex].id.videoId}
                    videoId={videos[currentIndex].id.videoId}
                    autoplay={autoplay}
                    onVideoEnd={onVideoEnd}
                />
            )}
            {videos.length === 0 && <p>No video selected</p>}
        </div>
    );
};

export default ClientPlayPage;
