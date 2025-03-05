import '../index.css'

export const MarsRover = ({image}:{image:string}) => {
    return (
        <div className='mars-rover-card'>
            <img src={image} alt="Mars Rover"/>
        </div>
    );
}