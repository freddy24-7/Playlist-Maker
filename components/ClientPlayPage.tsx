'use client'

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
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
    const searchParams = useSearchParams();
    const [videos, setVideos] = useState<Video[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [, setAutoplay] = useState(false);

    useEffect(() => {
        const videoId = searchParams.get('videoId') as string;
        const playlist = localStorage.getItem('songList');
        const shuffledList = localStorage.getItem('shuffledList');
        const isShuffleActive = localStorage.getItem('shuffleActive') === 'true';

        if (isShuffleActive && shuffledList) {
            const shuffled: Video[] = JSON.parse(shuffledList);
            setVideos(shuffled);
            const index = shuffled.findIndex(song => song.id.videoId === videoId);
            setCurrentIndex(index === -1 ? 0 : index);
        } else if (playlist) {
            const songList: Video[] = JSON.parse(playlist);
            setVideos(songList);
            const index = songList.findIndex(song => song.id.videoId === videoId);
            setCurrentIndex(index === -1 ? 0 : index);
        }
        setAutoplay(true);
    }, [searchParams]);

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
                    autoplay={true}
                    onVideoEnd={onVideoEnd}
                />
            )}
            {videos.length === 0 && <p>No video selected</p>}
        </div>
    );
};

export default ClientPlayPage;
