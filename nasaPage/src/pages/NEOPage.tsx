import { use, useEffect, useState } from 'react';
import '../index.css';
import { getNeoData } from '../services/index';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { PieChart, Pie, Cell, ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, Tooltip, YAxis, Scatter } from 'recharts';
import { useLocation } from 'react-router';
import { div } from 'framer-motion/client';
import { transform } from 'framer-motion';


type CalendarValue = Date | null | [Date | null, Date | null];

export const NEOPage = () => {
    const currentLocation = useLocation();
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null,null]);
    const [hasSelectedDate, setHasSelectedDate] = useState(false);  
    const [neoData, setNeoData] = useState<any[]>([]);

    const onChange = (newDate: CalendarValue) => {
        if (Array.isArray(newDate)) {
            setDateRange(newDate);
            setHasSelectedDate(true); 
        } 
    };

    const renderLabel = (entry: any) => `${entry.name}: ${entry.value}`;

    useEffect(() => {
        const pageLocationsWithScroll = ["/apod", "/mars-rover", "/neo", "/earth-imagery"];
        document.body.style.overflow = pageLocationsWithScroll.includes(currentLocation.pathname) ? "auto" : "hidden";
    }, [currentLocation]);

    useEffect(() => {
        if(!hasSelectedDate) return;

        const startDate = dateRange[0] as Date;
        const endDate = dateRange[1] as Date;
        const miliToDays = 1000 * 60 * 60 * 24;
    
        if (!startDate || !endDate) return; 
    
        if (startDate.getTime() >= endDate.getTime()) {
            alert("Start date should be before end date");
            return;
        }
    
        const differenceInDays = (endDate.getTime() - startDate.getTime()) / miliToDays;
        if (differenceInDays > 7) {
            alert("Date range should be less than 7 days");
            return;
        }
    
        if (endDate.getTime() > new Date().getTime()) {
            alert("End date should be before today's date");
            return;
        }
    
        getNeoData(startDate.toISOString().split("T")[0], endDate.toISOString().split("T")[0])
            .then((data) => {
                setNeoData(data|| []);  
            })
        .catch((error) => {
            console.error("Error fetching data:", error);
            setNeoData([]);  
        });
    
    }, [dateRange,hasSelectedDate]);

    const hazardousData = neoData.filter((neo: any) => neo.is_potentially_hazardous_asteroid);
    const nonHazardousData = neoData.length - hazardousData.length;

    const sentryData= neoData.filter((neo: any) => neo.is_sentry_object);
    const nonSentryData = neoData.length - sentryData.length;

    const chartDistanceSpeedData = neoData.map((neo: any) => ({ x:neo.close_approach_data[0].relative_velocity.kilometers_per_hour , y: neo.close_approach_data[0]. miss_distance.kilometers }));

    const minX = parseFloat(Math.min(...chartDistanceSpeedData.map(d => d.x)).toFixed(2));
    const maxX = parseFloat(Math.max(...chartDistanceSpeedData.map(d => d.x)).toFixed(2));
    const minY = parseFloat(Math.min(...chartDistanceSpeedData.map(d => d.y)).toFixed(2));
    const maxY = parseFloat(Math.max(...chartDistanceSpeedData.map(d => d.y)).toFixed(2));


    const chartHazardousData = [
        { name: "Hazardous", value: hazardousData.length },
        { name: "Non-Hazardous", value: nonHazardousData }
    ];

    const chartSentryData=[
        { name: "Sentry", value: sentryData.length },
        { name: "Non-Sentry", value: nonSentryData }
    ]

    const COLORS = ["#FF0000", "#0000FF"];

    return (
        <div className="neo-page">
            <div className='neo-page-calendar'>
                <h3>Select The Date From Which You Want To See Near Earth Objects</h3>
                <Calendar
                    onChange={onChange}
                    value={dateRange}
                    selectRange={true}
                    className={'neo-page-calendar-component'}
                />
            </div>
            <h2 >Date Picked:{dateRange[0]?.toDateString()}-{dateRange[1]?.toDateString()}</h2>
            <div className='neo-page-chart'>
            {neoData && neoData.length > 0 && (
                
                <div className='neo-page-chart-child'>
                    <h3>Hazardous vs Non-Hazardous</h3>
                    <ResponsiveContainer width="80%" height={400}>
                        <PieChart>
                            <Pie
                                data={chartHazardousData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
                                fill="#8884d8"
                                label={renderLabel}
                                className='neo-page-pie'
                            >
                                {chartHazardousData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}

                {neoData && neoData.length > 0 && (
                <div className='neo-page-chart-child'>
                    <h3>Sentry vs Non-Sentry</h3>
                    <ResponsiveContainer width="80%" height={400}>
                        <PieChart>
                            <Pie
                                data={chartSentryData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
                                fill="#8884d8"
                                label={renderLabel}
                                className='neo-page-pie'
                            >
                                {chartSentryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}

                {neoData && neoData.length > 0 && (
                    <div className='neo-page-chart-child'>
                        <h3 style={{ transform: 'translateY(20px)' }}>Distance and Speed</h3>
                     <ResponsiveContainer width="100%" height={400}>
                        <ScatterChart
                            margin={{
                                top: 20,
                                right: 100,
                                bottom: 20,
                                left: 100,   
                            }}
                            >
                            <CartesianGrid />
                            <XAxis 
                            type="number" 
                            dataKey="x" 
                            name="velocity" 
                            unit="km/h" 
                            domain={[minX * 0.9, maxX * 1.1]} 
                            tickFormatter={(value) => value.toFixed(2)} 
                            />
                            <YAxis 
                            type="number"
                            dataKey="y" 
                            name="distance" 
                            unit="km"  
                            domain={[minY * 0.9, maxY * 1.1]}
                            tickFormatter={(value) => value.toFixed(2)} 
                            />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter name="A school" data={chartDistanceSpeedData} fill="#8884d8" />
                        </ScatterChart>
                     </ResponsiveContainer>
                    </div>
                )}
            </div>
        
            <div className="circle-container">
                <div className='circle circle-1'></div>
                <div className='circle circle-2'></div>
                <div className='circle circle-3'></div>
                <div className='circle circle-4'></div>
            </div>
        </div>
    );
};