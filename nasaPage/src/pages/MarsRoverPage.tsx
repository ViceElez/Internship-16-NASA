import { useLocation } from 'react-router-dom';
import '../index.css'
import { use, useEffect, useState } from 'react';
import { getMarsRoverData } from '../services/index';
import { MarsRover } from '../components';


interface MarsRoverData {
    id: number;
    img_src: string;
}

export const MarsRoverPage = () => {
    const currentLocation = useLocation();
    const [page,setPage] = useState(1);
    const [photos, setPhotos] = useState<MarsRoverData[]>([]);

    useEffect(() => {
        const pageLocationsWithScroll=["/apod", "/mars-rover", "/neo", "/earth-imagery"];

        if (pageLocationsWithScroll.includes(currentLocation.pathname)) {
            document.body.style.overflow = "auto"; 
        } else {
            document.body.style.overflow = "hidden";
        }
    }, [currentLocation]);

        useEffect(() => {
            const fetchData = async () => {
                const data = await getMarsRoverData(page);
                setPhotos(data); 
            };
            fetchData();
        }, [page]);


    return(
        <div className="mars-page-content">
            <div className='mars-rover-list'>
                {photos.map((data)=>(
                    <MarsRover
                        key={data.id}
                        image={data.img_src}
                    />
                ))}
            </div>
            <div className="circle-container">
                <div className='circle circle-1'></div>
                <div className='circle circle-2'></div>
                <div className='circle circle-3'></div>
                <div className='circle circle-4'></div>
            </div>
       </div>
    )
}