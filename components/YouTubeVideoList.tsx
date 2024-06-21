'use client';

import React from 'react';
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
    const { setVideoId } = useVideo();
    const router = useRouter();

    const handleVideoSelect = (videoId: string) => {
        setVideoId(videoId);
        router.push('/play');
        console.log(videoId);
    };

    console.log(videos);

    return (
        <div className="space-y-4">
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
                        <Button type="button" onClick={() => handleVideoSelect(video.id.videoId)}>
                            Play
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default YouTubeVideoList;
