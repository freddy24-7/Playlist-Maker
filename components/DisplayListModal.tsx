import React, { useState, useRef } from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import YouTubePlainPlayer, { YouTubePlainPlayerRef } from './YouTubePlainPlayer'; // Adjust the import path as needed

interface MediaItem {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        description: string;
    };
}

interface DisplayListModalProps {
    isOpen: boolean;
    onClose: () => void;
    mediaList: MediaItem[];
    onDelete: (index: number) => void;
}

const DisplayListModal: React.FC<DisplayListModalProps> = ({ isOpen, onClose, mediaList, onDelete }) => {
    const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
    const playerRef = useRef<YouTubePlainPlayerRef>(null);

    const handlePlay = (videoId: string) => {
        setPlayingVideoId(videoId);
    };

    const handleVideoEnd = () => {
        setPlayingVideoId(null);
    };

    const handleCloseVideo = () => {
        setPlayingVideoId(null);
        if (playerRef.current) {
            playerRef.current.pauseVideo();
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{playingVideoId ? 'Now Playing' : 'Media List'}</AlertDialogTitle>
                </AlertDialogHeader>
                <div className="space-y-2">
                    {playingVideoId ? (
                        <div className="mt-4">
                            <YouTubePlainPlayer
                                ref={playerRef}
                                videoId={playingVideoId}
                                autoplay={true}
                                className="w-full"
                                onVideoEnd={handleVideoEnd}
                            />
                            <Button
                                onClick={handleCloseVideo}
                                className="bg-pink-700 hover:bg-pink-800 text-white font-bold py-2 px-4 rounded mt-4"
                            >
                                Close Video
                            </Button>
                        </div>
                    ) : (
                        mediaList.length > 0 ? (
                            mediaList.map((media, index) => (
                                <div key={index} className="border-b border-gray-200 pb-2 flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{media.snippet.title}</p>
                                        <p className="text-sm text-gray-500">{media.snippet.description}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            onClick={() => handlePlay(media.id.videoId)}
                                            className="bg-pink-700 hover:bg-pink-800 text-white font-bold py-1 px-2 rounded"
                                        >
                                            Play
                                        </Button>
                                        <Button
                                            onClick={() => onDelete(index)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No media files found.</p>
                        )
                    )}
                </div>
                {!playingVideoId && (
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={onClose}>Close</AlertDialogAction>
                    </AlertDialogFooter>
                )}
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DisplayListModal;
