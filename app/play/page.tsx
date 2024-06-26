'use client';
//
// import React from 'react';
import { useSearchParams } from 'next/navigation';
// import YouTubePlainPlayer from '@/components/YouTubePlainPlayer';
//
// const ClientPlayPage: React.FC = () => {
//     const searchParams = useSearchParams();
//     const videoId = searchParams.get('videoId');
//
//     return (
//         <>
//             {videoId ? (
//                 <YouTubePlainPlayer videoId={videoId} autoplay={true} />
//             ) : (
//                 <p>No video selected</p>
//             )}
//         </>
//     );
// };
//
// export default ClientPlayPage;

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
    const searchParams = useSearchParams();

    useEffect(() => {
        const videoId = searchParams.get('videoId');
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