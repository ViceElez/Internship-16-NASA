import { div, h1 } from "framer-motion/client";
import { useLocation, useParams } from "react-router-dom";
import '../index.css';
import { useEffect } from "react";

export const APODDetailPage = () => {
    const {date} = useParams();
    const currentLocation = useLocation();

    const existingAPODs = JSON.parse(localStorage.getItem('apodData') || '[]');
    const apod = existingAPODs.find((a: { date: string; }) => a.date === date);

    useEffect(() => {
        const pageLocationsWithScroll = ["/apod", "/mars-rover", "/neo", "/earth-imagery"];
        document.body.style.overflow = pageLocationsWithScroll.includes(currentLocation.pathname) ? "auto" : "hidden";
    }, [currentLocation]);
    
    return (
        <>    
            <div className='apod-detail-container'>
                <div className="apod-detail-image">
                    <img src={apod.url} alt={apod.title} />
                    {apod.copyright!==undefined && <h6 className="credit">Image Credit: {apod.copyright}</h6>}
                    <h6 className="apod-date">Photo Taken: {apod.date}</h6>
                </div>
                <div className="apod-detail-info">
                    <h1>{apod.title}</h1>
                    <p>{apod.explanation}</p>
                </div>
            </div>
            
            <div className="circle-container">
                    <div className='circle circle-1'></div>
                    <div className='circle circle-2'></div>
                    <div className='circle circle-3'></div>
                    <div className='circle circle-4'></div>
            </div>
        </>
   
    );
}