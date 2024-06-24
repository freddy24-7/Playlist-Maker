import React, { useState, useEffect } from 'react';
import { useVideo } from '@/context/VideoContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    const { setVideoId, registerVideoEndCallback } = useVideo();
    const router = useRouter();
    const [songList, setSongList] = useState<Video[]>([]);  // Properly type the state
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const storedSongs = localStorage.getItem('songList');
        if (storedSongs) {
            setSongList(JSON.parse(storedSongs) as Video[]);  // Ensure proper type when parsing
        }
    }, []);

    const handleVideoSelect = (videoId: string) => {
        setVideoId(videoId);
        router.push('/play');
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
            setCurrentIndex(0);
            setVideoId(songList[0].id.videoId);
            router.push('/play');

            registerVideoEndCallback(() => {
                const nextIndex = currentIndex + 1;
                if (nextIndex < songList.length) {
                    setCurrentIndex(nextIndex);
                    setVideoId(songList[nextIndex].id.videoId);
                } else {
                    setIsPlaying(false);
                }
            });
        }
    };

    return (
        <div className="space-y-4 mb-4">
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
