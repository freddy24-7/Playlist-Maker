import React from 'react';
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Metadata } from 'next'
import "./globals.css";

export const metadata: Metadata = {
    title: 'Create Your Own YouTube Playlist | Custom Video Collections',
    description: 'Discover how to create and manage your own YouTube playlists. Curate your favorite videos, organize them into collections, and share them with friends or the world!',
    keywords: 'YouTube, create playlist, video collection, organize videos, share videos',
}

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

type Props = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
        <body className={cn(poppins.className, "dark")}>
            <Header />
            <div className="flex flex-col gap-4 min-h-screen p-4 md:p-8 lg:p-12">
                {children}
            </div>
            <Footer />
        </body>
        </html>
    );
}