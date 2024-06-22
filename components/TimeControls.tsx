import { useEffect, useState } from "react";
import { fetchVideo } from "@/utils/requests";

const useFetchVideo = (id) => {
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideoData = async () => {
            if (!id) return;
            try {
                const video = await fetchVideo(id);
                setVideo(video);
            } catch (error) {
                console.error('Error fetching video:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideoData();
    }, [id]);

    return { video, loading };
};

export default useFetchVideo;
