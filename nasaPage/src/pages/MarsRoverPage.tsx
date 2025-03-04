import { useLocation } from 'react-router-dom';
import '../index.css'
import { useEffect } from 'react';

export const MarsRoverPage = () => {
    const currentLocation = useLocation();

    useEffect(() => {
        const pageLocationsWithScroll=["/apod", "/mars-rover", "/neo", "/earth-imagery"];

        if (pageLocationsWithScroll.includes(currentLocation.pathname)) {
            document.body.style.overflow = "auto"; 
        } else {
            document.body.style.overflow = "hidden";
        }
    }, [currentLocation]);

    return(
        <div className="mars-page-content">
            <p className='mars-page-info'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium, explicabo sed repellat perspiciatis sit ducimus dolores nostrum ut aliquam quaerat quos eaque soluta magnam itaque recusandae laborum perferendis fuga sint?
            </p>
            <div className="circle-container">
                <div className='circle circle-1'></div>
                <div className='circle circle-2'></div>
                <div className='circle circle-3'></div>
                <div className='circle circle-4'></div>
            </div>
       </div>
    )
}