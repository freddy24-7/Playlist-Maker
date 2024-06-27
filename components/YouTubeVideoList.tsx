'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import YouTubePlainPlayer from '@/components/YouTubePlainPlayer';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogDescription,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';

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
    const router = useRouter();
    const [videoId, setVideoId] = useState('');
    const [songList, setSongList] = useState<Video[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dialogMessage, setDialogMessage] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [shuffleList, setShuffleList] = useState<Video[]>([]);

    const MAX_SONGS = 10;

    useEffect(() => {
        const storedSongs = localStorage.getItem('songList');
        if (storedSongs) {
            setSongList(JSON.parse(storedSongs));
        }
    }, []);

    const handleAddToList = (video: Video) => {
        if (songList.length < MAX_SONGS) {
            const updatedList = [...songList, video];
            setSongList(updatedList);
            localStorage.setItem('songList', JSON.stringify(updatedList));
            const message = `Item added, list now has ${updatedList.length} ${updatedList.length === 1 ? 'item' : 'items'}`;
            showDialog(updatedList.length === MAX_SONGS ? `${message}. This is the maximum number of items` : message);
        } else {
            showDialog(`Cannot add more items. The maximum number of items is ${MAX_SONGS}.`);
        }
    };

    const handlePlayList = () => {
        if (songList.length > 0 && !isPlaying) {
            setIsPlaying(true);
            playVideoAtIndex(0);
        }
    };

    const handlePlayShuffle = () => {
        if (songList.length > 0 && !isPlaying) {
            const shuffledList = [...songList].sort(() => Math.random() - 0.5);
            setShuffleList(shuffledList);
            setIsPlaying(true);
            playShuffledVideoAtIndex(0);
        }
    };

    const handleClearList = () => {
        localStorage.removeItem('songList');
        setSongList([]);
        showDialog('Playlist cleared');
    };

    const playVideoAtIndex = (index: number) => {
        setCurrentIndex(index);
        const videoId = songList[index].id.videoId;
        setVideoId(videoId);
        router.push(`/play/${videoId}`); // Navigate to the dynamic route
    };

    const playShuffledVideoAtIndex = (index: number) => {
        setCurrentIndex(index);
        const videoId = shuffleList[index].id.videoId;
        setVideoId(videoId);
        router.push(`/play/${videoId}`); // Navigate to the dynamic route
    };

    const onVideoEnd = () => {
        console.log('Current video ended, moving to next...');
        const nextIndex = currentIndex + 1;
        if (shuffleList.length > 0) {
            if (nextIndex < shuffleList.length) {
                console.log(`Playing shuffled video at index ${nextIndex}`);
                playShuffledVideoAtIndex(nextIndex);
            } else {
                console.log('Reached end of shuffled playlist.');
                setIsPlaying(false);
            }
        } else {
            if (nextIndex < songList.length) {
                console.log(`Playing video at index ${nextIndex}`);
                playVideoAtIndex(nextIndex);
            } else {
                console.log('Reached end of playlist.');
                setIsPlaying(false);
            }
        }
    };

    const showDialog = (message: string) => {
        setDialogMessage(message);
        setIsDialogOpen(true);
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
                    <CardFooter className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <Button type="button" onClick={() => handleAddToList(video)}>
                            Add to List
                        </Button>
                        <Button type="button" onClick={handleClearList}>
                            Clear List
                        </Button>
                        <Button type="button" onClick={handlePlayList}>
                            Play List
                        </Button>
                        <Button type="button" onClick={handlePlayShuffle}>
                            Play Shuffle
                        </Button>
                    </CardFooter>
                </Card>
            ))}

            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogDescription>{dialogMessage}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setIsDialogOpen(false)}>OK</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default YouTubeVideoList;
