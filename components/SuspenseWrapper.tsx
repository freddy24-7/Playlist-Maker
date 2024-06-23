'use client';
import React, { Suspense } from 'react';

interface SuspenseWrapperProps {
    children: React.ReactNode;
}

const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({ children }) => {
    return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default SuspenseWrapper;
