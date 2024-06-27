import React from 'react';
import Image from 'next/image';
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
    handleAddToList: (video: Video) => void;
    handleClearList: () => void;
    handlePlayList: () => void;
    handlePlayShuffle: () => void;
    isDialogOpen: boolean;
    setIsDialogOpen: (open: boolean) => void;
    dialogMessage: string;
    videoId: string;
    onVideoEnd: () => void;
}

const YouTubeVideoList: React.FC<YouTubeVideoListProps> = ({
                                                               videos,
                                                               handleAddToList,
                                                               handleClearList,
                                                               handlePlayList,
                                                               handlePlayShuffle,
                                                               isDialogOpen,
                                                               setIsDialogOpen,
                                                               dialogMessage,
                                                               videoId,
                                                               onVideoEnd,
                                                           }) => {
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
