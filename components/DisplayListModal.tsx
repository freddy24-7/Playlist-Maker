import React from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface MediaItem {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        description: string;
    };
}

interface DisplayListModalProps {
    isOpen: boolean;
    onClose: () => void;
    mediaList: MediaItem[];
    onDelete: (index: number) => void;
}

const DisplayListModal: React.FC<DisplayListModalProps> = ({ isOpen, onClose, mediaList, onDelete }) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Media List</AlertDialogTitle>
                </AlertDialogHeader>
                <div className="space-y-2">
                    {mediaList.length > 0 ? (
                        mediaList.map((media, index) => (
                            <div key={index} className="border-b border-gray-200 pb-2 flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{media.snippet.title}</p>
                                    <p className="text-sm text-gray-500">{media.snippet.description}</p>
                                </div>
                                <Button
                                    onClick={() => onDelete(index)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                >
                                    Delete
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p>No media files found.</p>
                    )}
                </div>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={onClose}>Close</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DisplayListModal;
