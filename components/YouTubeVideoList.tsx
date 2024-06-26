'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

interface YouTubeVideoListProps {
    videos: Video[];
}

const YouTubeVideoList: React.FC<YouTubeVideoListProps> = ({ videos }) => {
    const [videoId, setVideoId] = useState('');
    const [songList, setSongList] = useState<Video[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const storedSongs = localStorage.getItem('songList');
        if (storedSongs) {
            setSongList(JSON.parse(storedSongs));
        }
    }, []);

    const handleVideoSelect = (videoId: string) => {
        setVideoId(videoId);
    };

    const handleAddToList = (video: Video) => {
        const updatedList = [...songList, video];
        setSongList(updatedList);
        localStorage.setItem('songList', JSON.stringify(updatedList));
        alert(`Item added, list now has ${updatedList.length} items`);
    };

    const handlePlayList = () => {
        if (songList.length > 0 && !isPlaying) {
            setIsPlaying(true);
            playVideoAtIndex(0);
        }
    };

    const playVideoAtIndex = (index: number) => {
        setCurrentIndex(index);  // Set the current index to the new index
        const videoId = songList[index].id.videoId;
        setVideoId(videoId);     // Update the video ID to start playing
    };

    const onVideoEnd = () => {
        console.log('Current video ended, moving to next...');
        const nextIndex = currentIndex + 1;
        if (nextIndex < songList.length) {
            console.log(`Playing video at index ${nextIndex}`);
            playVideoAtIndex(nextIndex);
        } else {
            console.log('Reached end of playlist.');
            setIsPlaying(false);
        }
    };

    return (
        <div className="space-y-4 mb-4">
            <div className="video-player-container">
                {videoId && (
                    <YouTubePlainPlayer
                        key={videoId}
                        videoId={videoId}
                        autoplay={true}
                        onVideoEnd={onVideoEnd}
                    />
                )}
            </div>
            {videos.map((video) => (
                <Card key={video.id.videoId} className="cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <Image
                            src={video.snippet.thumbnails.default.url}
                            alt={video.snippet.title}
                            width={120}
                            height={90}
                        />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>{video.snippet.title}</CardTitle>
                        <CardDescription>{video.snippet.description || 'No description available.'}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex space-x-2">
                        <Button type="button" onClick={() => handleVideoSelect(video.id.videoId)}>
                            Play
                        </Button>
                        <Button type="button" onClick={() => handleAddToList(video)}>
                            Add to List
                        </Button>
                        <Button type="button" onClick={handlePlayList}>
                            Play List
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default YouTubeVideoList;
