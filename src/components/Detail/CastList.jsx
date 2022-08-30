import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

const CastList = ({ id }) => {

    const { urlCategory } = useParams();

    const [cast, setCast] = useState([]);

    useEffect(() => {
        const getCredits = async () => {
            const res = await tmdbApi.credits(urlCategory, id);
            setCast(res.cast.slice(0, 5));
        }
        getCredits();
    }, [urlCategory, id]);

    return (
        <div className="casts">
            {cast.map((item, index) => (
                <div key={index} className="casts_item">
                    <div
                        className="casts__item__img"
                        style={{ backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})` }}
                    >
                    </div>
                    <p className="casts__item__name">{item.name}</p>
                </div>
            ))}
        </div>
    );
}

export default CastList;