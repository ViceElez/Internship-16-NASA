import { Link } from "react-router";
import { routes } from "../constants/routes";

export const Header = () => {
    return (
        <header>
            <h1>NASA EXPLORER</h1>
            <nav>
                <ul>
                    <li>
                        <Link to={routes.HOME}>Home</Link>
                    </li>
                    <li>
                        <Link to={routes.APOD}>APOD</Link>
                    </li>
                    <li>
                        <Link to={routes.MARS_ROVER}>Mars Rover</Link>
                    </li>
                    <li>
                        <Link to={routes.NEO}>Near Earth Objects</Link>
                    </li>
                    <li>
                        <Link to={routes.EARTH_IMAGERY}>Earth Imagery</Link>
                    </li>
                    <li>
                        <Link to={routes.DETAILS}>Details</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}