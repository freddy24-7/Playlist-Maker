'use client'

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useCallback, useMemo } from 'react';

interface VideoContextProps {
    videoId: string;
    setVideoId: Dispatch<SetStateAction<string>>;
    showAddVideo: boolean;
    setShowAddVideo: Dispatch<SetStateAction<boolean>>;
    onVideoEnd: () => void; // Callback function to handle the end of a video
    registerVideoEndCallback: (callback: () => void) => void; // Method to register the callback
}

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
    const [videoEndCallback, setVideoEndCallback] = useState<() => void>(() => {});

    // Use a useCallback to memoize the callback function
    const onVideoEnd = useCallback(() => {
        if (videoEndCallback) {
            videoEndCallback(); // Execute the registered callback when a video ends
        }
    }, [videoEndCallback]);

    const registerVideoEndCallback = useCallback((callback: () => void) => {
        setVideoEndCallback(() => callback); // Register the callback function
    }, []);

    // Memoize the context value to prevent unnecessary re-renders
    const value = useMemo(() => ({
        videoId,
        setVideoId,
        showAddVideo,
        setShowAddVideo,
        onVideoEnd,
        registerVideoEndCallback,
    }), [videoId, showAddVideo, videoEndCallback]);

    return (
        <VideoContext.Provider value={value}>
            {children}
        </VideoContext.Provider>
    );
};

export default VideoProvider;
