import { useLocation, useParams } from "react-router-dom";
import '../index.css';
import { use, useEffect } from "react";

export const MarsRoverDetailPage = () => {
    const {id} = useParams();
    const currentLocation = useLocation();

    const existingMarsRovers = JSON.parse(localStorage.getItem('marsRoverData') || '[]');
    const marsRover = existingMarsRovers.find((m: { id: number; }) => m.id === Number(id));

    useEffect(() => {
        const pageLocationsWithScroll = ["/apod", "/mars-rover", "/neo", "/earth-imagery"];
        document.body.style.overflow = pageLocationsWithScroll.includes(currentLocation.pathname) ? "auto" : "hidden";
    }, [currentLocation]);

    return (
        <div className="mars-rover-detail-page">  
            <div className="mars-rover-detail-container">
                <div className="mars-rover-detail-image">
                    <img src={marsRover.img_src} alt={marsRover.rover.name} />
                    <h6 className="apod-date">Photo Taken: {marsRover.earth_date}</h6>
                </div>
                <div className="mars-rover-detail-info">
                    <h2>Rover Name: {marsRover.rover.name}</h2>
                    <h3>Rover Launch Date: {marsRover.rover.launch_date}</h3>
                    <h3>Rover Landing Date: {marsRover.rover.launch_date}</h3>
                    <h3>Rover Status: {marsRover.rover.status}</h3>
                    <h3>Full Camera Name: {marsRover.camera.full_name}</h3>
                </div>
            </div>

            <div className="circle-container">
                <div className='circle circle-1'></div>
                <div className='circle circle-2'></div>
                <div className='circle circle-3'></div>
                <div className='circle circle-4'></div>
            </div>
        </div>
    );
} //ako uvatis malo dizajn poboljsat