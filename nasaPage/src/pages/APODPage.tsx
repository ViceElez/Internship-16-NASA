import { useLocation } from 'react-router-dom';
import '../index.css';
import { useEffect, useState } from 'react';
import '../styles/ApodPageStyle.css';
import { getAPODData,getAdditionalAPODData } from '../services/index';
import { APOD } from '../components/index';
import {Loader} from '../components/index';

interface ApodData {
    copyright?: string;
    date: string;
    explanation: string;
    title: string;
    url: string;
}

export const APODPage = () => {
    const currentLocation = useLocation();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredData, setFilteredData] = useState<ApodData[]>([]);
    const [items, setItem] = useState(7);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const pageLocationsWithScroll = ["/apod", "/mars-rover", "/neo", "/earth-imagery"];
        document.body.style.overflow = pageLocationsWithScroll.includes(currentLocation.pathname) ? "auto" : "hidden";
    }, [currentLocation]);

    useEffect(() => {
        getAPODData();
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        
        return()=>{
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);
    
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop+1 >= document.documentElement.offsetHeight) {
            setLoading(true);   
            setItem(prevItems => {
                const newItems = prevItems + 7;
                getAdditionalAPODData(newItems); 
                return newItems;
            });
        }
    };

    useEffect(() => {
        let storedData = localStorage.getItem('apodData');
    
        if (!storedData) {
            storedData = '[]'; 
        }
    
        let parsedData;
        try {
            parsedData = JSON.parse(storedData);
            if (!Array.isArray(parsedData)) {
                parsedData = [parsedData];
            }
        } catch (error) {
            console.error("Error parsing APOD data:", error);
            parsedData = []; 
        }
    
        const filtered = parsedData.filter((data: ApodData) => {
            const dataDate = new Date(data.date).toISOString().split('T')[0];
            return (!startDate || dataDate >= startDate) && (!endDate || dataDate <= endDate);
        });
    
        setFilteredData(filtered);
        setLoading(false);
    }, [startDate, endDate, items]); 
    

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStartDate = e.target.value;
        setStartDate(newStartDate);

        if (endDate && newStartDate > endDate) {
            setEndDate(newStartDate);
        }
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEndDate = e.target.value;
        setEndDate(newEndDate);

        if (startDate && newEndDate < startDate) {
            setStartDate(newEndDate);
        }
    };

    const uniqueFilteredData = Array.from(new Map(filteredData.map(item => [item.date, item])).values());


    return (
       <div className="apod-page-content">
          <div className="circle-container">
                <div className='circle circle-1'></div>
                <div className='circle circle-2'></div>
                <div className='circle circle-3'></div>
                <div className='circle circle-4'></div>
            </div>
            <div className='date-search'>
                <label htmlFor="dateStart">From</label>
                <input 
                type="date" 
                id='dateStart' 
                value={startDate} 
                min="2020-01-01" 
                max={new Date().toISOString().split('T')[0]}  
                onChange={handleStartDateChange} />
                <label htmlFor="dateEnd">To</label>
                <input 
                type="date" 
                id='dateEnd' 
                value={endDate} 
                min="2020-01-01" 
                max={new Date().toISOString().split('T')[0]}  
                onChange={handleEndDateChange} />
            </div>
            {uniqueFilteredData.length === 0 && <p className='no-data'>No APOD found</p>}
            <div className='apod-container'>
                {uniqueFilteredData.map((data) => (
                    <APOD 
                        key={data.date} 
                        date={data.date}
                        title={data.title}
                        urlImage={data.url}
                    />
                ))}
            </div>
            {loading && <Loader/>}
       </div>
    );
}; 
