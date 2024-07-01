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
import { usePlaylistActions } from '@/hooks/usePlaylistActions';
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerClose,
} from '@/components/ui/drawer'; // Import drawer components

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
    const [shuffledList, setShuffledList] = useState<Video[]>([]);
    const [, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const {
        handlePlayList,
        handlePlayShuffle,
        shuffle,
        isShuffle,
        isDialogOpen,
        setIsDialogOpen,
        dialogMessage,
        setDialogMessage, // Ensure setDialogMessage is used correctly
    } = usePlaylistActions();

    const MAX_SONGS = 10;

    useEffect(() => {
        const storedSongs = localStorage.getItem('songList');
        const storedShuffledList = localStorage.getItem('shuffledList');

        if (storedSongs) {
            const parsedList = JSON.parse(storedSongs);
            setSongList(parsedList);
            const shuffledState = storedShuffledList ? JSON.parse(storedShuffledList) : shuffle([...parsedList]);
            setShuffledList(shuffledState);
        }
    }, [shuffle]);

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

    const handleClearList = () => {
        localStorage.removeItem('songList');
        localStorage.removeItem('shuffledList'); // Clear shuffled list from localStorage
        setSongList([]);
        setShuffledList([]);
        showDialog('Playlist cleared');
    };

    const playVideoAtIndex = (list: Video[], index: number) => {
        if (list.length > 0) {
            setCurrentIndex(index);
            const videoId = list[index].id.videoId;
            setVideoId(videoId); // Update videoId state
            router.push(`/play/${videoId}`); // Navigate to the dynamic route
        }
    };

    const onVideoEnd = () => {
        console.log('Current video ended, moving to next...');
        const nextIndex = currentIndex + 1;
        const listToUse = isShuffle ? shuffledList : songList; // Use shuffled list if shuffle mode is on
        if (nextIndex < listToUse.length) {
            console.log(`Playing video at index ${nextIndex}`);
            playVideoAtIndex(listToUse, nextIndex);
        } else {
            console.log('Reached end of playlist.');
            setIsPlaying(false);
        }
    };

    const showDialog = (message: string) => {
        setDialogMessage(message);
        setIsDialogOpen(true);
        setTimeout(() => {
            setIsDialogOpen(false);
            setIsDrawerOpen(false); // Close the drawer as well
        }, 300); // Close the dialog after 300ms
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
                    <CardFooter>
                        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                            <DrawerTrigger>
                                <Button type="button" size="sm" className="w-full">
                                    Options
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Video Options</DrawerTitle>
                                </DrawerHeader>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4">
                                    <Button type="button" size="sm" className="w-full" onClick={() => handleAddToList(video)}>
                                        Add to List
                                    </Button>
                                    <Button type="button" size="sm" className="w-full" onClick={handleClearList}>
                                        Clear List
                                    </Button>
                                    <Button type="button" size="sm" className="w-full" onClick={handlePlayList}>
                                        Play List
                                    </Button>
                                    <Button type="button" size="sm" className="w-full" onClick={handlePlayShuffle}>
                                        Play Shuffle
                                    </Button>
                                    <DrawerClose>
                                        <Button type="button" size="sm" className="w-full">
                                            Close
                                        </Button>
                                    </DrawerClose>
                                </div>
                            </DrawerContent>
                        </Drawer>
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