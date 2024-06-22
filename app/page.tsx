import React from 'react';
import SuspenseWrapper from '@/components/SuspenseWrapper';
const YoutubeSearch = React.lazy(() => import('@/components/YouTubeSearch/YoutubeSearch'));

const SearchYouTubePage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen pt-10 px-4 sm:px-6 lg:px-8 bg-gray-100">
            <div className="w-full max-w-2xl">
                <SuspenseWrapper>
                    <YoutubeSearch />
                </SuspenseWrapper>
            </div>
        </div>
    );
};

export default SearchYouTubePage;
