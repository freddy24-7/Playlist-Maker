import React, { Suspense } from 'react';

const YoutubeSearch = React.lazy(() => import('@/components/search/YoutubeSearch'));

interface SearchYouTubePageProps {
    searchParams: {
        searchTerm?: string;
    };
}

async function fetchYoutubeData(searchTerm: string): Promise<any[]> {
    if (!searchTerm) return [];
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&q=${searchTerm}&type=video`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data.items;
}

const SearchYouTubePage = async ({ searchParams }: SearchYouTubePageProps) => {
    const searchTerm = searchParams.searchTerm || '';
    const searchResults = await fetchYoutubeData(searchTerm);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen pt-10 px-4 sm:px-6 lg:px-8 bg-gray-100">
            <div className="w-full max-w-2xl overflow-x-auto">
                <Suspense fallback={<div>Loading...</div>}>
                    <YoutubeSearch searchResults={searchResults} searchTerm={searchTerm} />
                </Suspense>
            </div>
        </div>
    );
};

export default SearchYouTubePage;
