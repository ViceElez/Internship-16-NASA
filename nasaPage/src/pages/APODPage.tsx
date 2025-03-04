import { useLocation } from 'react-router-dom';
import '../index.css';
import { useEffect } from 'react';
import '../styles/ApodPageStyle.css';
import { getAPODData } from '../services/index';
import { APOD } from '../components/index';


interface ApodData {
    copyRight?: string;
    date: string;
    explanation: string;
    title: string;
    url: string;
}

export const APODPage = () => {
    const currentLocation = useLocation();

    useEffect(() => {
        const pageLocationsWithScroll=["/apod", "/mars-rover", "/neo", "/earth-imagery"];

        if (pageLocationsWithScroll.includes(currentLocation.pathname)) {
            document.body.style.overflow = "auto"; 
        } else {
            document.body.style.overflow = "hidden";
        }
    }, [currentLocation]);

    getAPODData();

    const apodData = JSON.parse(localStorage.getItem('apodData') || '{}');
    console.log(apodData);


    return (
       <div className="apod-page-content">
            <div className='apod-container'>
                {apodData.map((data: ApodData) => (
                    <APOD 
                    key={data.date} 
                    title={data.title}
                    urlImage={data.url}
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