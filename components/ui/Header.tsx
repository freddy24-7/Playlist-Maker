'use client';

import { useState, useEffect } from 'react';
import { MonitorPlayIcon, HomeIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LightDarkToggle } from '@/components/ui/light-dark-toggle';
import { CldImage } from 'next-cloudinary';

export const Header = () => {
    const router = useRouter();
    const [isDesktopOrLaptop, setIsDesktopOrLaptop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktopOrLaptop(window.innerWidth >= 640);
        };

        // Set initial state
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleHomeClick = () => {
        router.push('/');
    };

    return (
        <header className="bg-primary text-white p-4 sticky top-0 z-50 shadow-md flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            {isDesktopOrLaptop && (
                <div className="absolute inset-0 z-[-1]">
                    <CldImage
                        src="playlistapp/audience_tu"
                        fill
                        style={{ objectFit: 'cover' }}
                        quality={40}
                        alt="Audience Background"
                        priority
                    />
                </div>
            )}
            <div className="flex flex-col sm:flex-row items-center gap-2 cursor-pointer" onClick={handleHomeClick}>
                <div className="flex items-center gap-2">
                    <MonitorPlayIcon size={30} className="sm:size-50" />
                    <h1 className="text-base sm:text-xl font-bold">Play-lister</h1>
                </div>
                <h2 className="text-xs sm:text-base">Create your own playlist</h2>
            </div>
            <Button
                onClick={handleHomeClick}
                className="mt-2 sm:mt-0 bg-transparent hover:bg-white hover:text-orange-400 text-white font-bold py-2 px-3 sm:px-4 rounded transition-colors duration-300 flex items-center"
                aria-label="Home"
                role="button"
            >
                <HomeIcon size={20} className="sm:size-50 mr-3" aria-hidden="true" />
                <span className="sr-only">Home</span>
            </Button>
            <LightDarkToggle className="fixed top-6 right-2" />
        </header>
    );
};
