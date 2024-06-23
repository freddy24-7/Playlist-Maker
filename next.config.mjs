/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
                pathname: '**',
            },
        ],
    },
    async headers() {
        return [
            {
                // Match all image files
                source: '/:all*(jpg|jpeg|gif|png|svg|webp|avif)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;