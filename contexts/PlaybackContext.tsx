'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PlaybackContextType {
    isPlaying: boolean;
    startPlaying: () => void;
    stopPlaying: () => void;
}

const PlaybackContext = createContext<PlaybackContextType>({
    isPlaying: false,
    startPlaying: () => {},
    stopPlaying: () => {}
});

export const usePlayback = () => useContext(PlaybackContext);

interface PlaybackProviderProps {
    children: ReactNode;
}

export const PlaybackProvider: React.FC<PlaybackProviderProps> = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const startPlaying = () => {
        console.log("Starting playback");
        setIsPlaying(true);
    };

    const stopPlaying = () => {
        console.log("Stopping playback");
        setIsPlaying(false);
    };

    return (
        <PlaybackContext.Provider value={{ isPlaying, startPlaying, stopPlaying }}>
            {children}
        </PlaybackContext.Provider>
    );
};
