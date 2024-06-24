import React, { Suspense } from 'react';
import ClientPlayPage from '@/components/ClientPlayPage';
import Spinner from '@/components/ui/Spinner';

const PlayPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen pt-10 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
            <div className="w-full max-w-3xl bg-card text-card-foreground p-4 rounded-lg overflow-x-auto">
                <Suspense fallback={<Spinner loading={true} />}>
                    <ClientPlayPage />
                </Suspense>
            </div>
        </div>
    );
};

export default PlayPage;
