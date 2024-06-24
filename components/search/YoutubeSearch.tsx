'use client';

import React, { Suspense, useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import Spinner from '../ui/Spinner';

const YouTubeVideoList = React.lazy(() => import('../YouTubeVideoList'));
const YouTubeSearchForm = React.lazy(() => import('./YouTubeSearchForm'));
const YouTubeVideoInspiration = React.lazy(() => import('./YouTubeVideoInspiration'));

interface YoutubeSearchProps {
    searchResults: any[];
    searchTerm: string;
}

const YoutubeSearch: React.FC<YoutubeSearchProps> = ({ searchResults, searchTerm }) => {
    const router = useRouter();
    const { query } = router;

    const [currentSearchTerm, setCurrentSearchTerm] = useState<string>(searchTerm);
    const [searchInitiated, setSearchInitiated] = useState<boolean>(false);

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!currentSearchTerm) return;
        setSearchInitiated(true);
    };

    useEffect(() => {
        if (query.searchInitiated === 'true') {
            setSearchInitiated(true);
        }
    }, [query.searchInitiated]);

    useEffect(() => {
        console.log(searchInitiated);
    }, [searchInitiated]);

    return (
        <div className="flex flex-col w-full">
            <Suspense fallback={<Spinner loading={true} />}>
                <YouTubeSearchForm searchTerm={currentSearchTerm} setSearchTerm={setCurrentSearchTerm} handleSearch={handleSearch} />
                {!searchInitiated && (
                    <YouTubeVideoInspiration selectedVideoId="8N9PL3Iz3xc" />
                )}
                <YouTubeVideoList videos={searchResults} />
            </Suspense>
        </div>
    );
};

export default YoutubeSearch;
