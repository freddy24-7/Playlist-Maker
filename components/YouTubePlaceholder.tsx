import React from 'react';
import Image from "next/image";

interface YouTubePlaceholderProps {
    onClick: () => void;
    thumbnailUrl: string;
    className?: string;
}

const YouTubePlaceholder: React.FC<YouTubePlaceholderProps> = ({ onClick, thumbnailUrl, className }) => {
    return (
        <div className={`relative ${className}`} onClick={onClick}>
            <Image width={1120} height={630} src={thumbnailUrl} alt="YouTube thumbnail" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <button className="bg-white text-black p-2 rounded-full">Watch this?</button>
            </div>
        </div>
    );
};

export default YouTubePlaceholder;