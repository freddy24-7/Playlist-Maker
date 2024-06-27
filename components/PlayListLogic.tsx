import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import YouTubeVideoList from './YouTubeVideoList';
import { Header } from '@/components/ui/Header';

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

interface PlayListLogicProps {
    videos: Video[];
}

// Function to shuffle an array using Fisher-Yates (Knuth) Shuffle algorithm
function shuffle(array: any[]) {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Swap elements at currentIndex and randomIndex
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

const PlayListLogic: React.FC<PlayListLogicProps> = ({ videos }) => {
    const router = useRouter();
    const [videoId, setVideoId] = useState<string>('');
    const [songList, setSongList] = useState<Video[]>([]);
    const [shuffledList, setShuffledList] = useState<Video[]>([]);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [dialogMessage, setDialogMessage] = useState<string>('');
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isShuffle, setIsShuffle] = useState<boolean>(false);

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
            setIsShuffle(false);
            localStorage.setItem('shuffleActive', 'false'); // Store shuffle state
            playVideoAtIndex(songList, 0);
        }
    };

    const handlePlayShuffle = () => {
        if (songList.length > 0 && !isPlaying) {
            const shuffled = shuffle([...songList]);
            setShuffledList(shuffled);
            localStorage.setItem('shuffledList', JSON.stringify(shuffled));
            localStorage.setItem('shuffleActive', 'true'); // Store shuffle state
            setIsPlaying(true);
            setIsShuffle(true);
            playVideoAtIndex(shuffled, 0);
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
        const nextIndex = currentIndex + 1;
        const listToUse = isShuffle ? shuffledList : songList; // Use shuffled list if shuffle mode is on
        if (nextIndex < listToUse.length) {
            playVideoAtIndex(listToUse, nextIndex);
        } else {
            setIsPlaying(false);
        }
    };

    const showDialog = (message: string) => {
        setDialogMessage(message);
        setIsDialogOpen(true);
    };

    return (
        <div>
            <Header onPlayList={handlePlayList} onPlayShuffle={handlePlayShuffle} />
            <YouTubeVideoList
                videos={videos}
                handleAddToList={handleAddToList}
                handleClearList={handleClearList}
                handlePlayList={handlePlayList}
                handlePlayShuffle={handlePlayShuffle}
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                dialogMessage={dialogMessage}
                videoId={videoId}
                onVideoEnd={onVideoEnd}
            />
        </div>
    );
};

export default PlayListLogic;
