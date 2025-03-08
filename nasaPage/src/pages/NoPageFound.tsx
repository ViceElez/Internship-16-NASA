import '../index.css';
import images from '../assets/images/images';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const NoPageFound = () => {
    const currentLocation = useLocation();

    useEffect(() => {
        const pageLocationsWithScroll = ["/apod", "/mars-rover", "/neo", "/earth-imagery"];
        document.body.style.overflow = pageLocationsWithScroll.includes(currentLocation.pathname) ? "auto" : "hidden";
    }, [currentLocation]);
    return (
        <div className="error-page">
            <h3>ERROR Page 404</h3>
             <div className="container">
                <div className="sun">
                    <img src={images.sun} alt="sun" /> 
                </div>
                <div className="mercury"></div>
                <div className="venus"></div>
                <div className="earth">
                    <div className="moon"></div>
                </div>
                <div className="mars"></div>
                <div className="jupiter"></div>
                <div className="saturn"></div>
                <div className="uranus"></div>
                <div className="neptune"></div>
                <div className="pluto"></div>
            </div>
        </div>
    )
}
