import { routes } from "../constants/routes";
import "../index.css";
import VariantButtonGroup from "./GroupedButtons";

export const Header = () => {
    return (
        <header >
            <h1>NASA EXPLORER</h1>
            <nav>
            <VariantButtonGroup 
            path1={routes.HOME} buttonMessage1='Home'
            path2={routes.APOD} buttonMessage2='APOD' 
            path3={routes.MARS_ROVER} buttonMessage3='Mars Rover Photos' 
            path4={routes.NEO} buttonMessage4='NEO'
            path5={routes.EARTH_IMAGERY} buttonMessage5='Earth Imagery'
            />
            <button>Dark Theme</button>
            </nav>
        </header>
    );
}