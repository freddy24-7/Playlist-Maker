import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

export const usePlaylistActions = () => {
    const router = useRouter();
    const [songList, setSongList] = useState<Video[]>([]);
    const [, setShuffledList] = useState<Video[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [, setCurrentIndex] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog
    const [dialogMessage, setDialogMessage] = useState(''); // State for dialog message

    const initializeState = () => {
        const storedSongs = localStorage.getItem('songList');
        const storedShuffledList = localStorage.getItem('shuffledList');
        const shuffleActive = localStorage.getItem('shuffleActive');

        if (storedSongs) {
            const parsedList = JSON.parse(storedSongs);
            setSongList(parsedList);
            const shuffledState = storedShuffledList ? JSON.parse(storedShuffledList) : shuffle([...parsedList]);
            setShuffledList(shuffledState);
            setIsShuffle(shuffleActive === 'true');
        }
    };

    useEffect(() => {
        initializeState();

        const handleStorageChange = () => {
            initializeState();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const shuffle = (array: any[]) => {
        let currentIndex = array.length;
        while (currentIndex !== 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    };

    const playVideoAtIndex = (list: Video[], index: number) => {
        if (list.length > 0) {
            setCurrentIndex(index);
            const videoId = list[index].id.videoId;
            router.push(`/play/${videoId}`);
        }
    };

    const handlePlayList = () => {
        if (songList.length > 0 && !isPlaying) {
            setIsPlaying(true);
            setIsShuffle(false);
            localStorage.setItem('shuffleActive', 'false');
            playVideoAtIndex(songList, 0);
        } else {
            setDialogMessage('Playlist is empty');
            setIsDialogOpen(true); // Show dialog if playlist is empty
        }
    };

    const handlePlayShuffle = () => {
        if (songList.length > 0 && !isPlaying) {
            const shuffled = shuffle([...songList]);
            setShuffledList(shuffled);
            localStorage.setItem('shuffledList', JSON.stringify(shuffled));
            localStorage.setItem('shuffleActive', 'true');
            setIsPlaying(true);
            setIsShuffle(true);
            playVideoAtIndex(shuffled, 0);
        } else {
            setDialogMessage('Playlist is empty');
            setIsDialogOpen(true); // Show dialog if playlist is empty
        }
    };

    return {
        handlePlayList,
        handlePlayShuffle,
        shuffle,
        isShuffle,
        isDialogOpen,
        setIsDialogOpen,
        dialogMessage,
        setDialogMessage, // Ensure setDialogMessage is returned
    };
};