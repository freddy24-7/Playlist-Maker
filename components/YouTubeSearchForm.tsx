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
        <form onSubmit={handleSearch} className="flex flex-col space-y-4 w-full max-w-md">
            <div className="flex">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Search Artist/Song..."
                    className="flex-grow p-4 text-lg border-2 border-blue-500 rounded-l-lg focus:outline-none focus:border-blue-700"
                />
                <Button
                    type="submit"
                    className="ml-3.5"
                >
                    Search
                </Button>
            </div>
        </form>
    );
};

export default YouTubeSearchForm;
