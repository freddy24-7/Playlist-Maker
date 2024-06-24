'use client';

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Define the VideoContextProps interface within the same file
interface VideoContextProps {
    videoId: string;
    setVideoId: Dispatch<SetStateAction<string>>;
    showAddVideo: boolean;
    setShowAddVideo: Dispatch<SetStateAction<boolean>>;
}

// Create a context with an undefined initial value
const VideoContext = createContext<VideoContextProps | undefined>(undefined);

export const useVideo = (): VideoContextProps => {
    const context = useContext(VideoContext);
    if (!context) {
        throw new Error('useVideo must be used within a VideoProvider');
    }
    return context;
};

interface VideoProviderProps {
    children: ReactNode;
}

export const VideoProvider: React.FC<VideoProviderProps> = ({ children }) => {
    const [videoId, setVideoId] = useState<string>('');
    const [showAddVideo, setShowAddVideo] = useState<boolean>(false);

    const value: VideoContextProps = {
        videoId,
        setVideoId,
        showAddVideo,
        setShowAddVideo,
    };

    return (
        <VideoContext.Provider value={value}>
            {children}
        </VideoContext.Provider>
    );
};
