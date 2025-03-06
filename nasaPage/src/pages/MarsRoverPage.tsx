import { useLocation } from 'react-router-dom';
import '../index.css'
import { use, useEffect, useState } from 'react';
import { getMarsRoverData } from '../services/index';
import { MarsRover } from '../components';
import {handlerFilterChange} from '../types/handleFilterChange';


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

        useEffect(() => {
            handlerFilterChange(); 
        }, []);


    return(
        <div className='mars-page'>
             <div className="circle-container">
                 <div className='circle circle-1'></div>
                 <div className='circle circle-2'></div>
                 <div className='circle circle-3'></div>
                <div className='circle circle-4'></div>
            </div>
            <nav>
                <span>Sort</span>
                <select id="select-filter" onChange={handlerFilterChange}>
                    <option value="Default">Default</option>
                    <option value="Camera">Camera</option>
                    <option value="Rover">Rover</option>
                </select>
                <select  id="rover-dropdown" className='hidden'>
                   <option value="Curiosity">Curiosity</option>
                   <option value="Opportunity">Opportunity</option>
                   <option value="Spirit">Spirit</option>
                </select>
                <select id="camera-dropdown" className='hidden'>
                    <option value="FHAZ">FHAZ</option>
                    <option value="RHAZ">RHAZ</option>
                    <option value="MAST">MAST</option>
                    <option value="CHEMCAM">CHEMCAM</option>
                    <option value="MAHLI">MAHLI</option>
                    <option value="MARDI">MARDI</option>
                    <option value="NAVCAM">NAVCAM</option>
                    <option value="PANCAM">PANCAM</option>
                    <option value="MINITES">MINITES</option>
                </select>

            </nav>
            <div className="mars-page-content">
                <div className='mars-rover-list'>
                    {photos.map((data)=>(
                        <MarsRover
                            key={data.id}
                            id={data.id}
                            image={data.img_src}
                        />
                    ))}
                </div>
            </div>
            <footer>
                    <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                    <button onClick={() => setPage(page + 1)}>Next</button>
            </footer>
           
        </div>
    )
}//risi dizajn s link i dodaj ove filtere