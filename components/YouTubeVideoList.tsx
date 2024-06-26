// 'use client';
//
// import React from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
//
// interface Video {
//     id: {
//         videoId: string;
//     };
//     snippet: {
//         title: string;
//         description: string;
//         thumbnails: {
//             default: {
//                 url: string;
//             };
//         };
//     };
// }
//
// interface YouTubeVideoListProps {
//     videos: Video[];
// }
//
// const YouTubeVideoList: React.FC<YouTubeVideoListProps> = ({ videos }) => {
//     const [videoId, setVideoId] = React.useState<string>('');
//     const router = useRouter();
//
//     const handleVideoSelect = (videoId: string) => {
//         setVideoId(videoId);
//         router.push(`/play?videoId=${videoId}`);
//         console.log(videoId);
//     };
//
//     console.log(videos);
//
//     return (
//         <div className="space-y-4 mb-4">
//             {videos.map((video) => (
//                 <Card key={video.id.videoId} className="cursor-pointer hover:shadow-lg transition-shadow">
//                     <CardHeader>
//                         <Image
//                             src={video.snippet.thumbnails.default.url}
//                             alt={video.snippet.title}
//                             width={120}
//                             height={90}
//                         />
//                     </CardHeader>
//                     <CardContent>
//                         <CardTitle>{video.snippet.title}</CardTitle>
//                         <CardDescription>{video.snippet.description || 'No description available.'}</CardDescription>
//                     </CardContent>
//                     <CardFooter>
//                         <Button type="button" onClick={() => handleVideoSelect(video.id.videoId)}>
//                             Play
//                         </Button>
//                     </CardFooter>
//                 </Card>
//             ))}
//         </div>
//     );
// };
//
// export default YouTubeVideoList;
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
    const [displayList, setDisplayList] = useState(true);  // State to control display of the list

    useEffect(() => {
        const storedSongs = localStorage.getItem('songList');
        if (storedSongs) {
            setSongList(JSON.parse(storedSongs));
        }
    }, []);

    const handleVideoSelect = (videoId: string) => {
        setVideoId(videoId);
        setDisplayList(false);  // Hide the list when playing a video
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
            setDisplayList(false);  // Hide the list when playing the playlist
        }
    };

    const handleClearList = () => {
        localStorage.removeItem('songList');
        setSongList([]);
        alert('Playlist cleared');
    };

    const playVideoAtIndex = (index: number) => {
        setCurrentIndex(index);
        const videoId = songList[index].id.videoId;
        setVideoId(videoId);
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
            setDisplayList(true);  // Optionally show the list again when playlist ends
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
            {displayList && videos.map((video) => (
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
                        <Button type="button" onClick={() => handleVideoSelect(video.id.videoId)}>
                            Play
                        </Button>
                        <Button type="button" onClick={() => handleAddToList(video)}>
                            Add to List
                        </Button>
                        <Button type="button" onClick={handleClearList}>
                            Clear List
                        </Button>
                        <Button type="button" onClick={handlePlayList}>
                            Play List
                        </Button>
                    </CardFooter>
                </Card>
            ))}
            <Button type="button" onClick={() => setDisplayList(!displayList)} className="mt-4">
                {displayList ? "Hide List" : "Show List"}
            </Button>
        </div>
    );
};

export default YouTubeVideoList;