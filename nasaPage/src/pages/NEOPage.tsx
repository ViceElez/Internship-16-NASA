import { use, useEffect, useState } from 'react';
import '../index.css';
import { getNeoData } from '../services/index';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


type CalendarValue = Date | null | [Date | null, Date | null];

export const NEOPage = () => {
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([new Date(), new Date()]);
    const [hasSelectedDate, setHasSelectedDate] = useState(false);  
    const [neoData, setNeoData] = useState<any[]>([]);

    const onChange = (newDate: CalendarValue) => {
        if (Array.isArray(newDate)) {
            setDateRange(newDate);
            setHasSelectedDate(true); 
        } 
    };

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

    const chartData = [
        { name: "Hazardous", value: hazardousData.length },
        { name: "Non-Hazardous", value: nonHazardousData }
    ];

    const COLORS = ["#FF5733", "#28A745"];

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
            <br/>
            {neoData && neoData.length > 0 && (
            <div className='neo-page-chart'>
                <h3>Hazardous vs Non-Hazardous</h3>
                <ResponsiveContainer width={400} height={400}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            fill="#8884d8"
                            label
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            )}
        
            <div className="circle-container">
                <div className='circle circle-1'></div>
                <div className='circle circle-2'></div>
                <div className='circle circle-3'></div>
                <div className='circle circle-4'></div>
            </div>
        </div>
    );
};
// da se vidi koja boja ja sta