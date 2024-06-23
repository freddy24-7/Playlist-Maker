'use client';

import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface SpinnerProps {
    loading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ loading }) => {
    return (
        <div className="flex justify-center items-center h-full">
            <ClipLoader
                color='#3b82f6'
                loading={loading}
                size={150}
                aria-label='Loading Spinner'
            />
        </div>
    );
};

export default Spinner;