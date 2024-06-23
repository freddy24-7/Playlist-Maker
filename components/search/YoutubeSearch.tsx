'use client';

import React, { Suspense, useState } from 'react';
import axios from 'axios';
import Spinner from '../ui/Spinner';

const YouTubeVideoList = React.lazy(() => import('../YouTubeVideoList'));
const YouTubeSearchForm = React.lazy(() => import('./YouTubeSearchForm'));
const YouTubeVideoInspiration = React.lazy(() => import('./YouTubeVideoInspiration'));

const YoutubeSearch: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [selectedVideoId] = useState<string>('8N9PL3Iz3xc');
    const [searchInitiated, setSearchInitiated] = useState<boolean>(false);

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!searchTerm) return;
        setLoading(true);
        setSearchInitiated(true);
        try {
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    maxResults: 10,
                    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
                    q: searchTerm,
                    type: 'video',
                },
            });
            setSearchResults(response.data.items);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data: ', error);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full">
            <Suspense fallback={<Spinner loading={true} />}>
                <YouTubeSearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
                {!loading && !searchInitiated && (
                    <YouTubeVideoInspiration selectedVideoId={selectedVideoId} />
                )}
                {loading ? (
                    <Spinner loading={loading} />
                ) : (
                    <YouTubeVideoList videos={searchResults} />
                )}
            </Suspense>
        </div>
    );
};

export default YoutubeSearch;