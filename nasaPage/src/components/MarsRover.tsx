import { Link } from 'react-router'
import '../index.css'

export const MarsRover = ({id,image}:{id:number,image:string}) => {
    return (
        <div className='mars-rover-card'>
            <Link to={`/mars-rover-details/${id}`} className='mars-rover-link'>
                <img src={image} alt="Mars Rover"/>
           </Link>
        </div>
    );
}   