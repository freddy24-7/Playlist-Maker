import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogCancel
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface AboutDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const AboutDialog: React.FC<AboutDialogProps> = ({ isOpen, onOpenChange }) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogTrigger asChild>
                <Button className="bg-transparent hover:bg-white hover:text-pink-700 text-white font-bold py-2 px-3 sm:px-4 rounded transition-colors duration-300 mr-3">
                    About
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Make your own playlist!</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    <p className="mb-3">Your playlist is stored only on your own device.</p>
                    <p className="mb-3">On iPhone or iPad unmute may be required between songs given iOS restrictions on
                        autoplay.</p>
                    <p className="mb-3">You can move the list player around on touchscreens to shift its location.</p>
                    <p>Hold your phone horizontally for best experience.</p>
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AboutDialog;
