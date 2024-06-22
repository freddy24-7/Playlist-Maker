// YouTubePlainPlayerLazy.tsx
'use client';

import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState, lazy, Suspense } from 'react';
import Spinner from './Spinner';

const LazyYouTubePlainPlayer = lazy(() => import('./YouTubePlainPlayer'));

interface YouTubePlainPlayerProps {
    videoId?: string;
    autoplay?: boolean;
    className?: string;
}

export interface YouTubePlainPlayerRef {
    playVideo: () => void;
    pauseVideo: () => void;
}

const YouTubePlainPlayerFacade = forwardRef<YouTubePlainPlayerRef, YouTubePlainPlayerProps>((props, ref) => {
    const [isMounted, setIsMounted] = useState(false);
    const playerRef = useRef<YouTubePlainPlayerRef>(null);

    useImperativeHandle(ref, () => ({
        playVideo: () => {
            if (playerRef.current) {
                playerRef.current.playVideo();
            }
        },
        pauseVideo: () => {
            if (playerRef.current) {
                playerRef.current.pauseVideo();
            }
        },
    }));

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className={`relative ${props.className}`}>
            {isMounted ? (
                <Suspense
                    fallback={
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50">
                            <Spinner loading={true} />
                        </div>
                    }
                >
                    <LazyYouTubePlainPlayer ref={playerRef} {...props} />
                </Suspense>
            ) : (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50">
                    <Spinner loading={true} />
                </div>
            )}
        </div>
    );
});

YouTubePlainPlayerFacade.displayName = 'YouTubePlainPlayerFacade';

export default YouTubePlainPlayerFacade;
