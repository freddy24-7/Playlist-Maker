import React from 'react';
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Head from 'next/head';
import "./globals.css";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: 'Create Your Own YouTube Playlist | Custom Video Collections',
    description: 'Discover how to create and manage your own YouTube playlists. Curate your favorite videos, organize them into collections, and share them with friends or the world!',
    keywords: 'YouTube, create playlist, video collection, organize videos, share videos',
};

type Props = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
        <Head>
            <link rel="preload" href="/audience.webp" as="image" />
        </Head>
        <body className={cn(poppins.className, "dark")}>
        <Header />
        <div className="flex flex-col gap-4 min-h-screen p-4 sm:p-6 md:p-8 lg:p-12">
            {children}
        </div>
        <Footer />
        </body>
        </html>
    );
}
