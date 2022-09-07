import { useState, useEffect } from 'react';

import tmdbApi from '../../api/tmdbApi';
import Video from './Video';

const VideoList = ({ id, urlCategory }) => {


    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const res = await tmdbApi.getVideos(urlCategory, id);
            setVideos(res.results.slice(0, 5));
        }
        getVideos();
    }, [urlCategory, id]);

    return (
        <>
            {videos.map((item, index) => (
                    <Video key={index} item={item} />
                ))
            }
        </>
    );
}


export default VideoList;