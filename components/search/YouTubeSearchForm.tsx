'use client';

import React, { ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/button';

interface YouTubeSearchFormProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    handleSearch: (event: FormEvent<HTMLFormElement>) => void;
}

const YouTubeSearchForm: React.FC<YouTubeSearchFormProps> = ({ searchTerm, setSearchTerm, handleSearch }) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row space-y-4 md:space-y-0 w-full max-w-md">
            <div className="flex flex-col md:flex-row w-full">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Search Artist/Song..."
                    className="flex-grow p-4 text-lg border-2 border-blue-500 rounded-t-lg md:rounded-l-lg md:rounded-tr-none md:rounded-br-none focus:outline-none focus:border-blue-700 text-black"
                />
                <Button
                    type="submit"
                    className="mt-2 md:mt-0 md:ml-1.5"
                >
                    Search
                </Button>
            </div>
        </form>
    );
};

export default YouTubeSearchForm;
