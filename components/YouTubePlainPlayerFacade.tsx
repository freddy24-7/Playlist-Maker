// 'use client';
// import React, { forwardRef, useImperativeHandle, useRef, useState, lazy, Suspense } from 'react';
// import Spinner from '@/components/Spinner';
// import YouTubePlaceHolder from './YouTubePlaceHolder';
//
// const LazyYouTubePlainPlayer = lazy(() => import('./YouTubePlainPlayer'));
//
// interface YouTubePlainPlayerProps {
//     videoId?: string;
//     autoplay?: boolean;
//     className?: string;
// }
//
// export interface YouTubePlainPlayerRef {
//     playVideo: () => void;
//     pauseVideo: () => void;
// }
//
// const YouTubePlainPlayerFacade = forwardRef<YouTubePlainPlayerRef, YouTubePlainPlayerProps>((props, ref) => {
//     const [isPlayerVisible, setIsPlayerVisible] = useState(false);
//     const playerRef = useRef<YouTubePlainPlayerRef>(null);
//
//     useImperativeHandle(ref, () => ({
//         playVideo: () => {
//             if (playerRef.current) {
//                 playerRef.current.playVideo();
//             }
//         },
//         pauseVideo: () => {
//             if (playerRef.current) {
//                 playerRef.current.pauseVideo();
//             }
//         },
//     }));
//
//     const handlePlaceholderClick = () => {
//         setIsPlayerVisible(true);
//     };
//
//     return (
//         <div className={`relative ${props.className}`}>
//             {isPlayerVisible ? (
//                 <Suspense
//                     fallback={
//                         <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50">
//                             <Spinner loading={true} />
//                         </div>
//                     }
//                 >
//                     <LazyYouTubePlainPlayer ref={playerRef} {...props} />
//                 </Suspense>
//             ) : (
//                 <YouTubePlaceHolder
//                     onClick={handlePlaceholderClick}
//                     thumbnailUrl={`https://img.youtube.com/vi/${props.videoId}/hqdefault.jpg`}
//                     className={props.className}
//                 />
//             )}
//         </div>
//     );
// });
//
// YouTubePlainPlayerFacade.displayName = 'YouTubePlainPlayerFacade';
//
// export default YouTubePlainPlayerFacade;
// YouTubePlainPlayerFacade.tsx
import React, { forwardRef, useImperativeHandle, useRef, useState, lazy, Suspense } from 'react';
import Spinner from '@/components/Spinner';
import YouTubePlaceHolder from './YouTubePlaceHolder';

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
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);
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

    const handlePlaceholderClick = () => {
        setIsPlayerVisible(true);
    };

    return (
        <div className={`relative ${props.className}`}>
            {isPlayerVisible ? (
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
                <YouTubePlaceHolder
                    onClick={handlePlaceholderClick}
                    thumbnailUrl={`https://img.youtube.com/vi/${props.videoId}/hqdefault.jpg`}
                    className={props.className}
                />
            )}
        </div>
    );
});

YouTubePlainPlayerFacade.displayName = 'YouTubePlainPlayerFacade';

export default YouTubePlainPlayerFacade;
