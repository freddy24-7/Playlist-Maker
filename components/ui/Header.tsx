'use client';

import { useState, useEffect } from 'react';
import { MonitorPlayIcon, HomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LightDarkToggle } from '@/components/ui/light-dark-toggle';
import { CldImage } from 'next-cloudinary';
import { usePlaylistActions } from '@/hooks/usePlaylistActions';
import DisplayListModal from '@/components/DisplayListModal';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogDescription,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import AboutDialogue from '@/components/ui/AboutDialogue'; // Import AboutDialog component

interface MediaItem {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        description: string;
    };
}

export const Header = () => {
    const [isDesktopOrLaptop, setIsDesktopOrLaptop] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isDisplayListOpen, setIsDisplayListOpen] = useState(false); // State to manage display list modal visibility
    const [mediaList, setMediaList] = useState<MediaItem[]>([]); // State to store media list
    const { handlePlayList, handlePlayShuffle, isDialogOpen, setIsDialogOpen, dialogMessage } = usePlaylistActions();
    const [isAboutOpen, setIsAboutOpen] = useState(false); // State to manage the About modal visibility

    useEffect(() => {
        const handleResize = () => {
            setIsDesktopOrLaptop(window.innerWidth >= 640);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleHomeClick = () => {
        window.location.href = '/';
    };

    const startPlaying = (handlePlayFunction: () => void) => {
        setIsPlaying(true);
        try {
            handlePlayFunction();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDisplayList = () => {
        const storedMediaList = localStorage.getItem('songList');
        if (storedMediaList) {
            setMediaList(JSON.parse(storedMediaList));
            setIsDisplayListOpen(true); // Open the modal to display the list
        } else {
            console.log('No media files found in local storage');
        }
    };

    const handleDeleteMedia = (index: number) => {
        const updatedMediaList = [...mediaList];
        updatedMediaList.splice(index, 1);
        setMediaList(updatedMediaList);
        localStorage.setItem('songList', JSON.stringify(updatedMediaList));
    };

    return (
        <header className="bg-primary text-white p-4 sticky top-0 z-50 shadow-md flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            {isDesktopOrLaptop && (
                <div className="absolute inset-0 z-[-1]">
                    <CldImage
                        src="playlistapp/audience_tu"
                        fill
                        style={{ objectFit: 'cover' }}
                        quality={40}
                        alt="Audience Background"
                        priority
                    />
                </div>
            )}
            <div className="flex flex-col sm:flex-row items-center gap-2 cursor-pointer" onClick={handleHomeClick}>
                <div className="flex items-center gap-2">
                    <MonitorPlayIcon size={30} className="sm:size-50" />
                    <h1 className="text-base sm:text-xl font-bold">Play-lister</h1>
                </div>
                <h2 className="text-xs sm:text-base">Create your own playlist</h2>
            </div>
            <Button
                onClick={handleHomeClick}
                className="mt-2 sm:mt-0 bg-transparent hover:bg-white hover:text-pink-700 text-white font-bold py-2 px-3 sm:px-4 rounded transition-colors duration-300 flex items-center"
                aria-label="Home"
                role="button"
            >
                <HomeIcon size={20} className="sm:size-50 mr-3" aria-hidden="true" />
                <span className="sr-only">Home</span>
            </Button>
            {!isPlaying && (
                <div className="flex gap-2">
                    <Button onClick={() => startPlaying(handlePlayList)} className="bg-transparent hover:bg-white hover:text-pink-700 text-white font-bold py-2 px-3 sm:px-4 rounded transition-colors duration-300">
                        Play List
                    </Button>
                    <Button onClick={() => startPlaying(handlePlayShuffle)} className="bg-transparent hover:bg-white hover:text-pink-700 text-white font-bold py-2 px-3 sm:px-4 rounded transition-colors duration-300">
                        Play Shuffle
                    </Button>
                    <Button onClick={handleDisplayList} className="bg-transparent hover:bg-white hover:text-pink-700 text-white font-bold py-2 px-3 sm:px-4 rounded transition-colors duration-300 mr-4">
                        Display List
                    </Button>
                </div>
            )}
            <div className="flex gap-2">
                <AboutDialogue isOpen={isAboutOpen} onOpenChange={setIsAboutOpen} /> {/* Use AboutDialog component */}
            </div>
            <LightDarkToggle className="fixed top-6 right-2" />
            <DisplayListModal
                isOpen={isDisplayListOpen}
                onClose={() => setIsDisplayListOpen(false)}
                mediaList={mediaList}
                onDelete={handleDeleteMedia}
            />
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
        </header>
    );
};
