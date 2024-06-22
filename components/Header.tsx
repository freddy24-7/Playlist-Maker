'use client'

import Image from 'next/image';
import { MonitorPlayIcon, HomeIcon } from "lucide-react";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LightDarkToggle } from "@/components/ui/light-dark-toggle";

export const Header = () => {
    const router = useRouter();

    const handleHomeClick = () => {
        router.push('/');
    };

    return (
<<<<<<< HEAD
        <header className="bg-cover bg-center text-white p-4 sticky top-0 z-50 shadow-md flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
=======
        <header className="bg-cover bg-center text-white p-4 sm:p-6 md:p-8 sticky top-0 z-50 shadow-md flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
>>>>>>> origin/03-Refactoring
            <div className="absolute inset-0 z-[-1]">
                <Image
                    src="/audience.webp"
                    layout="fill"
                    objectFit="cover"
                    quality={75}
                    alt="Audience Background"
                    priority
                />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 cursor-pointer" onClick={handleHomeClick}>
                <div className="flex items-center gap-2">
<<<<<<< HEAD
                    <MonitorPlayIcon size={30} className="sm:size-50"/>
                    <h1 className="text-base sm:text-xl font-bold">Play-lister</h1>
                </div>
                <h2 className="text-xs sm:text-base">Create your own playlist</h2>
            </div>
            <Button
                onClick={handleHomeClick}
                className="mt-2 sm:mt-0 bg-transparent hover:bg-white hover:text-orange-400 text-white font-bold py-2 px-3 sm:px-4 rounded transition-colors duration-300 flex items-center"
=======
                    <MonitorPlayIcon size={40} className="sm:size-50"/>
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Play-lister</h1>
                </div>
                <h2 className="text-sm sm:text-base md:text-lg">Create your own playlist</h2>
            </div>
            <Button
                onClick={handleHomeClick}
                className="mt-2 sm:mt-0 bg-transparent hover:bg-white hover:text-orange-400 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center"
>>>>>>> origin/03-Refactoring
                aria-label="Home"
                role="button"
            >
                <HomeIcon size={20} className="sm:size-50 mr-3" aria-hidden="true"/>
                <span className="sr-only">Home</span>
            </Button>
<<<<<<< HEAD
            <LightDarkToggle className="fixed top-6 right-2"/>
=======
            <LightDarkToggle className="fixed top-2 right-2"/>
>>>>>>> origin/03-Refactoring
        </header>
    );
};
