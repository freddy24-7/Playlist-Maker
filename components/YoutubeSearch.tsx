'use client';

import React, { useState } from 'react';
import axios from 'axios';
import YouTubeVideoList from './YouTubeVideoList';
import YouTubeSearchForm from './YouTubeSearchForm';
import YouTubeVideoInspiration from './YouTubeVideoInspiration';
import Spinner from './Spinner';

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
        <div className="flex flex-col items-center w-full">
            <YouTubeSearchForm
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
            />
            {loading ? (
                <Spinner loading={loading} />
            ) : (
                <div className="flex flex-col md:flex-row mt-4 w-full space-y-4 md:space-y-0 md:space-x-4">
                    {!searchInitiated && (
                        <div className="flex-grow md:w-2/3">
                            <YouTubeVideoInspiration selectedVideoId={selectedVideoId} />
                        </div>
                    )}
                    <div className={`w-full ${searchInitiated ? 'md:w-full' : 'md:w-1/3'} mt-4 md:mt-0`}>
                        <YouTubeVideoList videos={searchResults} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default YoutubeSearch;
