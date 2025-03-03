import '../index.css';
import images from '../assets/images/images.ts';

export const HomePage = () => {
    return (    
        <div>
            <div className="home-page-content">
                <p className='home-page-info'>
                    Welcome to NASA Explorer, your gateway to the wonders of space! Using cutting-edge data from NASA’s open APIs, this app brings you the latest astronomical discoveries, breathtaking space imagery, and real-time insights from the cosmos. Whether you're a space enthusiast, a student, or just curious about the universe, NASA Explorer offers a front-row seat to the mysteries of space—right at your fingertips.
                    NASA Explorer is designed to provide seamless access to publicly available NASA data, including:<br/>

                    🌌 Astronomy Picture of the Day (APOD) – Discover a new awe-inspiring image from space every day.<br/>
                    🪐 Mars Rover Photos – View the latest images captured by NASA’s rovers on the Red Planet.<br/>
                    🌍 Earth Observation Data – Get a unique perspective of our planet from satellites.<br/>
                    🚀 Mission Updates & Space Weather – Stay informed about ongoing NASA missions and space conditions.<br/>
                    🌑 Near-Earth Objects (NEO) – Learn about asteroids and comets passing near Earth, and explore potential impact risks.<br/>

                    With a simple and intuitive interface, NASA Explorer makes it easy to explore the cosmos, learn about celestial objects, and stay up to date with the latest NASA discoveries. Dive in and start your journey through space today!
                </p>
                <div className='orbit'>
                    <div className='planet'>
                        <img src={images.earth} alt='planet' />
                    </div>
                    <div className='rocket'>
                     <div className="window"></div>
                    </div>
                </div>
            </div>
            <div className="home-page-container">
                <div className='circle circle-1'></div>
                <div className='circle circle-2'></div>
                <div className='circle circle-3'></div>
                <div className='circle circle-4'></div>
            </div>
        </div>
    )
}
